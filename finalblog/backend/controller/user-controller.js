import User from "../schema-model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../schema-model/token.js';
dotenv.config();

export const signupUser= async(request, response) =>{
    try{

        const hashPassword = await bcrypt.hash(request.body.password, 10);
        //const hashConfirmPassword= await bcrypt.hash(request.body.confirm_password, 10);        
        const user={firstname:request.body.firstname, lastname:request.body.lastname, email: request.body.email, password: hashPassword};
        if(request.body.password===request.body.confirm_password)
        {
         const check_mail = await User.findOne({email: request.body.email});
         if(!check_mail)
         {   
             const newUser= new User(user);
             await newUser.save();
             return response.status(200).json({ msg: 'User created successfull'})
             
         }
         else
         {
             return response
             .status(409)
             .send({msg: "User with given email already exist!"});
         }
      }
        else
        {
         return response
         .status(409)
         .send({msg: "Password aren't same!"});
        }
         
     } catch(error){
         return response.status(500).json({ msg: 'Error while signup the user'})
     }
 }
export const loginUser = async(request, response) => {
    let user = await User.findOne({email: request.body.email});
    if(!user){
        return response.status(400).json({msg: 'This user does not exist'});
    }

    try{
        let match= await bcrypt.compare(request.body.password, user.password);
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn: '7d'});
            const refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken= new Token({token: refreshToken})
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, firstname:user.firstname, email:user.email})
        }else{
            return response.status(400).json({msg: 'Password does not match'});
        }
    }
        catch(error){
            return response.status(500).json({msg:'Error while login'});
        }
    }
