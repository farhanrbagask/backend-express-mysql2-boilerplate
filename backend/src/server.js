const express = require('express');
const helmet = require('helmet'); // 1. Import helmet
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;
app.set('trust proxy', 1);

// 2. Gunakan helmet sebagai global middleware
app.use(helmet()); 

// Middleware wajib untuk memproses JSON
app.use(express.json());

// Daftarkan route auth
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ success: true, message: "API Personal Finance Tracker Berjalan Aman!" });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});