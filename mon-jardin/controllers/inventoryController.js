const { fetchInventory, insertProduct, updateStock } = require('../models/inventoryModel');

const getInventory = async (req, res) => {
  try {
    const items = await fetchInventory();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await insertProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const modifyStock = async (req, res) => {
  const { product_id } = req.params;
  const { quantityChange } = req.body;
  try {
    const updated = await updateStock(product_id, quantityChange);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getInventory, addProduct, modifyStock };
