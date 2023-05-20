import express from "express";
import {
  searchUsers
} from "../controllers/search.js";


const router = express.Router();
router.get("/", searchUsers);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

export default router;
