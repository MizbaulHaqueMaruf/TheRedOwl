
import User from "../models/User.js";
import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { userId, description,title, picturePath } = req.body;
    const user = await User.findById(userId);
    const newBlog = new Blog({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      title,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      register: {},
    });
    await newBlog.save();
    const blog = await Blog.find();
    res.status(201).json(blog);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}, { title: 1, description: 1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getUserBlogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const blog = await Blog.find({ userId }).select('title description');
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const registerBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const blog = await Blog.findById(id);
    const isRegistered = blog.register.get(userId);

    if (isRegistered) {
      blog.register.delete(userId);
    } else {
      blog.register.set(userId, true);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { register: blog.register },
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
