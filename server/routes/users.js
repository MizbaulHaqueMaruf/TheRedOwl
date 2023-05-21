import express from "express";
import {
  addRemoveFriend,
  confirmUser,
  deleteEducation,
  deleteExperience,
  getUser,
  getUserFriends,
  updateAddress,
  updateEducation,
  updateExperience,
  updateIntro,
  updateResearchInterests,
  updateSkills,
  updateSocialMedia
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();



/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/verify/:id/:token", confirmUser);
/* UPDATE */

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/updateIntro", verifyToken, updateIntro);
router.patch("/updateSocialMedia",verifyToken, updateSocialMedia);
router.patch("/updateEducation", verifyToken, updateEducation);
router.patch("/updateExperience",verifyToken, updateExperience);
router.patch("/deleteEducation", verifyToken, deleteEducation);
router.patch("/deleteExperience", verifyToken, deleteExperience);
router.patch("/updateResearchInterests", verifyToken, updateResearchInterests);
router.patch("/updateSkills", verifyToken, updateSkills);
router.patch("/updateAddress", verifyToken, updateAddress);
//user confirmation route

export default router;
