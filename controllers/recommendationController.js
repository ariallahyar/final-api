import Recommendation from "../models/recommendation";

const getRecommendations = async (req, res) => {
  const recommendations = await Recommendation.find();

  res.status(200).json({
    success: true,
    results: recommendations,
  });
};

const submitRecommendation = async (req, res) => {
  const { user_id, city, nameOfPlace, comment, website } = req.body;

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

module.exports = {
  getRecommendations,
  submitRecommendation,
};
