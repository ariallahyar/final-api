import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    nameOfPlace: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      match: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
