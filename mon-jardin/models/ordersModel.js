const db = require('../db');

const fetchOrders = async () => {
  const result = await db.query('SELECT * FROM orders ORDER BY order_id DESC');
  return result.rows;
};

const insertOrder = async ({ user_id, product_id, quantity, price, delivery_location }) => {
  const result = await db.query(
    'INSERT INTO orders (user_id, product_id, quantity, price, delivery_location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, product_id, quantity, price, delivery_location]
  );
  return result.rows[0];
};

module.exports = { fetchOrders, insertOrder };
