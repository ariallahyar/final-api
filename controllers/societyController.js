import Subcriber from "../models/subscriber";

const getSubscriberList = async (req, res) => {
  const subscribers = await Subcriber.find();

  res.status(200).json({
    success: true,
    total: subscribers.length,
    results: subscribers,
  });
};

const submitEmail = async (req, res) => {
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
};

module.exports = {
  getSubscriberList,
  submitEmail,
};
