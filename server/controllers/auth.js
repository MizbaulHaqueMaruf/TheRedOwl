import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/token.js";
import { sendEmail } from "../utils/sendEmail.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      role,
      studentId,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      role,
      studentId,
    });

    const savedUser = await newUser.save();

    const token = new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await token.save();

    const url = `${process.env.BASE_URL}/users/${savedUser.id}/verify/${token.token}`;
    await sendEmail(email, "Verify Email", url);

    res.status(201).send({ message: "An email has been sent to your account. Please verify." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
///////////////////

//////////////////

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password. " });
    if (!user.verified) return res.status(401).json({ msg: "User is not verified." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
