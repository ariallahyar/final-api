import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true,
    },
    token: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
