import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: [true, "please enter a Google PlaceId"],
  },
  name: {
    type: String,
    required: [true, "please enter a name"],
  },
  city: {
    type: String,
    required: [true, "please enter a city"],
  },
  location: {
    type: Object,
    required: [true, "please enter latitude and longitude coordinates"],
  },
  categories: [
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
