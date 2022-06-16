import express from "express";
import {
  registerUser,
  loginUser,
  authorize,
  logoutUser,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

// router.get("/", getUsers);  // needs admin authorization
router.post("/", registerUser, loginUser);
router.delete("/", authorize, removeUser);
router.post("/auth", loginUser);
router.delete("/auth", authorize, logoutUser);

module.exports = router;
