const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validasi input dasar
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Data tidak valid: Semua field harus diisi" }); //
        }

        // Validasi konfirmasi password
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Data tidak valid: Password tidak cocok" }); //
        }

        // Aturan bisnis: Email user harus unik[cite: 1]
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email sudah terdaftar" });
        }

        // Aturan bisnis: Password disimpan dalam bentuk hash[cite: 1]
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.createUser(name, email, hashedPassword);
        
        res.status(201).json({ success: true, message: "Registrasi berhasil" , data : { name, email } }); //[cite: 1]
    } catch (error) {
        // Kesalahan database tidak boleh ditampilkan mentah kepada user[cite: 1]
        res.status(500).json({ success: false, message: "Internal server error" }); //[cite: 1]
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ success: false, message: "Email atau password salah" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Email atau password salah" });
        }

        // Backend menghasilkan JWT setelah login berhasil[cite: 1]
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            data: {
                user: { id: user.id, name: user.name, email: user.email },
                token: token
            }
        }); //[cite: 1]
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" }); //[cite: 1]
    }
};

module.exports = { register, login };