const { insertFeedback, fetchFeedback } = require('../models/feedbackModel');

const createFeedback = async (req, res) => {
  try {
    const feedback = await insertFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedbackList = await fetchFeedback();
    res.status(200).json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createFeedback, getFeedback };
