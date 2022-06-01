import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "please add a username"],
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

module.exports = mongoose.model("User", userSchema);
