const db = require('../db');

const insertDistribution = async ({ order_id, delivery_location, delivery_time, status, driver_name }) => {
  const result = await db.query(
    'INSERT INTO distribution (order_id, delivery_location, delivery_time, status, driver_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [order_id, delivery_location, delivery_time, status, driver_name]
  );
  return result.rows[0];
};

const updateDistributionStatus = async (distribution_id, status) => {
  const result = await db.query(
    'UPDATE distribution SET status = $1 WHERE distribution_id = $2 RETURNING *',
    [status, distribution_id]
  );
  return result.rows[0];
};

const fetchDistributions = async () => {
  const result = await db.query('SELECT * FROM distribution ORDER BY delivery_time ASC');
  return result.rows;
};

module.exports = { insertDistribution, updateDistributionStatus, fetchDistributions };
