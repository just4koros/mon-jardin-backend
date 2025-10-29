const db = require('../db');

const insertPayment = async ({ order_id, amount, method, status }) => {
  const result = await db.query(
    'INSERT INTO payments (order_id, amount, method, status, timestamp) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [order_id, amount, method, status]
  );
  return result.rows[0];
};

const fetchPayments = async () => {
  const result = await db.query('SELECT * FROM payments ORDER BY timestamp DESC');
  return result.rows;
};

module.exports = { insertPayment, fetchPayments };
