import express from "express";
import {
  getUserBlogs,
} from "../controllers/blogs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/blogs", verifyToken, getUserBlogs);


export default router;