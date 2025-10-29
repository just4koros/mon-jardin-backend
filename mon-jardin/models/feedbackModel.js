const db = require('../db');

const insertFeedback = async ({ user_id, order_id, rating, comments }) => {
  const result = await db.query(
    'INSERT INTO feedback (user_id, order_id, rating, comments, timestamp) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [user_id, order_id, rating, comments]
  );
  return result.rows[0];
};

const fetchFeedback = async () => {
  const result = await db.query('SELECT * FROM feedback ORDER BY timestamp DESC');
  return result.rows;
};

module.exports = { insertFeedback, fetchFeedback };
