import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
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
});

module.exports = mongoose.model("User", userSchema);
