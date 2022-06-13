import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  google_place_id: {
    type: String,
    required: [true, "please enter a Google PlaceId"],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "please enter a city"],
  },
  description: {
    type: String,
    required: [true, "please enter a description"],
  },
  tags: [
    {
      type: String,
      enum: {
        values: ["Casual", "Fine dining", "Drinks", "Cafe", "Sweets", "Market"],
        message: "{VALUE} is not supported",
      },
    },
  ],
});

module.exports = mongoose.model("Place", placeSchema);
