import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
  authorize,
  logoutUser,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.delete("/", removeUser);
router.post("/auth", loginUser);
router.delete("/auth", logoutUser);

module.exports = router;
