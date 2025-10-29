const { insertDistribution, updateDistributionStatus, fetchDistributions } = require('../models/distributionModel');

const createDistribution = async (req, res) => {
  try {
    const distribution = await insertDistribution(req.body);
    res.status(201).json(distribution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeStatus = async (req, res) => {
  const { distribution_id } = req.params;
  const { status } = req.body;
  try {
    const updated = await updateDistributionStatus(distribution_id, status);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDistributions = async (req, res) => {
  try {
    const list = await fetchDistributions();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createDistribution, changeStatus, getDistributions };
