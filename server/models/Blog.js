import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    register: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Blog  = mongoose.model("Blog", blogSchema);

export default Blog;
