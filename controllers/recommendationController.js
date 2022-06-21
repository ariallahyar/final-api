import Recommendation from "../models/recommendation";

const getRecommendations = async (req, res) => {
  const recommendations = await Recommendation.find().sort({ createdAt: "desc" });

  res.status(200).json({
    success: true,
    results: recommendations,
  });
};

const submitRecommendation = async (req, res) => {
  const user_id = req.header("UserID");
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
};

const deleteRecommendation = async (req, res) => {
  const user_id = req.header("UserID");
  const { _id } = req.body;

  const recommendation = await Recommendation.findOne({ _id });

  if (user_id !== recommendation.user_id) {
    res.status(404);
    throw new Error("User not authorized to delete");
  }

  await recommendation.remove();
  res.status(200).json({ success: true });
};

module.exports = {
  getRecommendations,
  submitRecommendation,
  deleteRecommendation,
};
