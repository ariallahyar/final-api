import mongoose from "mongoose";

const subscriberSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "invalid email"],
  },
});

module.exports = mongoose.model("Subcriber", subscriberSchema);
