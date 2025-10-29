const cors = require('cors');
app.use(cors());

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const ordersRoutes = require('./routes/orders');
app.use('/api/orders', ordersRoutes);

app.get('/', (req, res) => res.send('Mon Jardin ERP is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


