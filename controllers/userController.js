import User from "../models/user";
import Session from "../models/session";
import bcrypt from "bcrypt";
import crypto from "crypto";
import asyncHandler from "express-async-handler"; // instead of try-catch

// @desc		Get users
// @route		GET /user
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    total: users.length,
    results: users,
  });
});

// @desc		Register new user
// @route		POST /user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  next();
});

// @desc		Authenticate a user and create session
// @route		POST /user/auth
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = crypto.randomBytes(128).toString("hex");

    await Session.create({ user_id: user.id, token });

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).json({ message: "Invalid credentials. Username and password don't match" });
  }
});

// @desc		Logout a user by ending session
// @route		DELETE /user/auth
const logoutUser = asyncHandler(async (req, res) => {
  const session = await Session.findOne({ token: req.header("Token") });

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }
  await session.remove();

  res.status(200).json({ success: true });
});

// @desc		Remove a user
// @route		DELETE /user
const removeUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.header("UserId") });
  const session = await Session.findOne({ token: req.header("Token") });

  if (!user || !session) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.remove();
  await session.remove();

  res.status(200).json({ success: true });
});

// @desc		Authorize a request
const authorize = asyncHandler(async (req, res, next) => {
  const session = await Session.findOne({ user_id: req.header("UserId") });
  const authorizedUser = session.token === req.header("Token");

  if (authorizedUser) {
    next();
  } else {
    res.status(401).json({ message: "No active session found." });
  }
});

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  authorize,
  logoutUser,
  removeUser,
};
