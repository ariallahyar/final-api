import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
  authorize,
  logoutUser,
  removeUser,
} from "../controllers/userController.js";

import { submitRecommendation } from "../controllers/recommendationController";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.delete("/", removeUser);
router.post("/auth", loginUser);
router.delete("/auth", logoutUser);
router.post("/auth/recommendation", authorize, submitRecommendation);

module.exports = router;
