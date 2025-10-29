const db = require('../db');

const fetchInventory = async () => {
  const result = await db.query('SELECT * FROM inventory ORDER BY product_name ASC');
  return result.rows;
};

const insertProduct = async ({ product_name, stock_quantity, price, category }) => {
  const result = await db.query(
    'INSERT INTO inventory (product_name, stock_quantity, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
    [product_name, stock_quantity, price, category]
  );
  return result.rows[0];
};

const updateStock = async (product_id, quantityChange) => {
  const result = await db.query(
    'UPDATE inventory SET stock_quantity = stock_quantity + $1, last_updated = NOW() WHERE product_id = $2 RETURNING *',
    [quantityChange, product_id]
  );
  return result.rows[0];
};

module.exports = { fetchInventory, insertProduct, updateStock };
