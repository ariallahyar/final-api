import Recommendation from "../models/recommendation";
import User from "../models/user";
import asyncHandler from "express-async-handler";

// @desc		Get list of recommendations
// @route		GET /recommendation
const getRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await Recommendation.find().sort({ createdAt: "desc" });

  const results = await Promise.all(
    recommendations.map(async (rec) => {
      const user = await User.findOne({ _id: rec.user_id });
      return { ...rec._doc, submittedBy: user.name };
    })
  );

  res.status(200).json({
    success: true,
    results: results,
  });
});

// @desc		Submit a recommendation
// @route		POST /recommendation
const submitRecommendation = asyncHandler(async (req, res) => {
  const user_id = req.header("UserId");
  const { city, nameOfPlace, comment, website } = req.body;

  if (!user_id || !city || !nameOfPlace || !comment || !website) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const recommendation = await Recommendation.create({
    user_id,
    city,
    nameOfPlace,
    comment,
    website,
  });

  res.status(201).json({
    success: true,
    result: recommendation,
  });
});

// @desc		Delete a recommendation
// @route		DELETE /recommendation
const deleteRecommendation = asyncHandler(async (req, res) => {
  const user_id = req.header("UserId");
  const { _id } = req.body;

  const recommendation = await Recommendation.findOne({ _id });

  if (user_id !== recommendation.user_id) {
    res.status(401);
    throw new Error("User not authorized to delete");
  }

  await recommendation.deleteOne();
  res.status(200).json({ success: true, deleted: recommendation });
});

module.exports = {
  getRecommendations,
  submitRecommendation,
  deleteRecommendation,
};
