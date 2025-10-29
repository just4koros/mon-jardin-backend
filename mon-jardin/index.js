const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route (replace with your actual routes)
app.get('/api/orders', (req, res) => {
  res.json([
    { order_id: 1, product_id: 101, quantity: 2, price: 20, delivery_location: 'Kahawa Sukari' },
    { order_id: 2, product_id: 102, quantity: 1, price: 15, delivery_location: 'Ruiru' }
  ]);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mon Jardin backend running on port ${PORT}`);
});

