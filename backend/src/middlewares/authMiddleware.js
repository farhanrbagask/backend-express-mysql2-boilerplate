const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" }); //[cite: 1]
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Unauthorized: Token tidak valid" }); //[cite: 1]
        }
        req.user = user; // Menyimpan data user ke request untuk dipakai di endpoint selanjutnya
        next();
    });
};

module.exports = authenticateToken;