import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
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
  commment: String,
  link: String,
});

module.exports = mongoose.model("Entry", entrySchema);
