// index.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all origins (for dev)
// For production, restrict to your frontend domain:
// app.use(cors({ origin: 'https://emmanuelkoros.github.io' }));

app.use(express.json()); // Parse JSON bodies

// Sample routes (replace with your actual logic)
app.get('/orders', (req, res) => {
  res.json({ message: 'Orders data loaded successfully' });
});

app.get('/inventory', (req, res) => {
  res.json({ message: 'Inventory data loaded successfully' });
});

app.get('/distribution', (req, res) => {
  res.json({ message: 'Distribution data loaded successfully' });
});

app.get('/payments', (req, res) => {
  res.json({ message: 'Payments data loaded successfully' });
});

app.get('/feedback', (req, res) => {
  res.json({ message: 'Feedback data loaded successfully' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Mon Jardin ERP Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
