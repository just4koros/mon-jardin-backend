const { insertPayment, fetchPayments } = require('../models/paymentsModel');

const createPayment = async (req, res) => {
  try {
    const payment = await insertPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await fetchPayments();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPayment, getPayments };
