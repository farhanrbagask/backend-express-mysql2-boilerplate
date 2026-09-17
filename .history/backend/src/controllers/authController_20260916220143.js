// src/controllers/authController.js
const authService = require('../services/userService');

const register = async (req, res) => {
    try {
        // Melempar data dari request ke service
        const newUser = await authService.registerUser(req.body);

        // Jika berhasil, kirim response 201[cite: 1]
        res.status(201).json({ 
            success: true, 
            message: "Registrasi berhasil", 
            data: newUser 
        });
    } catch (error) {
        // Menangkap error dari service
        const statusCode = error.statusCode || 500;
        
        // Kesalahan database tidak boleh ditampilkan mentah kepada user[cite: 1]
        const message = statusCode === 500 ? "Internal server error" : error.message;
        
        if (statusCode === 500) console.error("Detail Error:", error);

        res.status(statusCode).json({ success: false, message: message });
    }
};

const login = async (req, res) => {
    try {
        const loginData = await authService.loginUser(req.body);

        // Jika berhasil, kirim response 200 beserta data user dan token[cite: 1]
        res.status(200).json({
            success: true,
            data: loginData
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = statusCode === 500 ? "Internal server error" : error.message;
        
        if (statusCode === 500) console.error("Detail Error:", error);

        res.status(statusCode).json({ success: false, message: message });
    }
};

module.exports = { register, login };