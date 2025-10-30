require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Railway/Render
});

// ======= ROUTES =======

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Mon Jardin API is running 🌿" });
});

// ---- ORDERS ----
app.post("/orders", async (req, res) => {
  const { farmer_id, product_id, quantity, price, delivery_location } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (farmer_id, product_id, quantity, price, delivery_location, status)
       VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *`,
      [farmer_id, product_id, quantity, price, delivery_location]
    );
    res.status(201).json({ success: true, order: result.rows[0] });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
});

app.get("/orders", async (req, res) => {
  const result = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
  res.json(result.rows);
});

// ---- INVENTORY ----
app.get("/inventory", async (req, res) => {
  const result = await pool.query("SELECT * FROM inventory ORDER BY id");
  res.json(result.rows);
});

// ---- PAYMENTS ----
app.post("/payments", async (req, res) => {
  const { order_id, amount, mode } = req.body;
  await pool.query(
    `INSERT INTO payments (order_id, amount, mode, status)
     VALUES ($1, $2, $3, 'Pending')`,
    [order_id, amount, mode]
  );
  res.status(201).json({ message: "Payment recorded" });
});

// ---- FEEDBACK ----
app.post("/feedback", async (req, res) => {
  const { order_id, rating, comments } = req.body;
  await pool.query(
    `INSERT INTO feedback (order_id, rating, comments)
     VALUES ($1, $2, $3)`,
    [order_id, rating, comments]
  );
  res.status(201).json({ message: "Feedback received" });
});

// ======= SERVER START =======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Mon Jardin backend running on port ${PORT}`));
