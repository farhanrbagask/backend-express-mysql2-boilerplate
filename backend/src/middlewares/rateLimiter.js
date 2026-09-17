// src/middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

// Membuat aturan limit khusus untuk halaman login dan register
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Waktu tunggu: 15 menit
    max: 5, // Batas maksimal: 5 kali request per IP dalam 15 menit
    message: { 
        success: false, 
        message: "Terlalu banyak percobaan akses, silakan coba lagi setelah 15 menit" 
    }, // Format error mengikuti standar API kita
    standardHeaders: true, // Mengembalikan info limit di headers `RateLimit-*`
    legacyHeaders: false, // Menonaktifkan headers `X-RateLimit-*` yang sudah usang
});

module.exports = { authLimiter };