const { fetchOrders, insertOrder } = require('../models/ordersModel');

const getOrders = async (req, res) => {
  try {
    const orders = await fetchOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  console.log('POST /api/orders hit');
  console.log('Request body:', req.body);
  try {
    const order = await insertOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error('Insert error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getOrders, createOrder };

