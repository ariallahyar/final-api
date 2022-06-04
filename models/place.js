import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  google_place_id: {
    type: String,
    required: [true, "please enter a Google PlaceId"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "please enter a name"],
  },
  city: {
    type: String,
    required: [true, "please enter a city"],
  },
  description: {
    type: String,
    required: [true, "please enter a description"],
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, "please enter a latitude"],
    },
    lng: {
      type: Number,
      required: [true, "please enter a longitude"],
    },
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
