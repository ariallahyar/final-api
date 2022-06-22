import Subcriber from "../models/subscriber";
import asyncHandler from "express-async-handler";

// @desc		Get list of subscribers
// @route		GET /society
const getSubscriberList = asyncHandler(async (req, res) => {
  const subscribers = await Subcriber.find();

  res.status(200).json({
    success: true,
    total: subscribers.length,
    results: subscribers,
  });
});

// @desc		Post subcriber's email
// @route		POST /society
const submitEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const subscriber = await Subcriber.create({ email });

  res.status(200).json({
    success: true,
    response: subscriber,
  });
});

module.exports = {
  getSubscriberList,
  submitEmail,
};
