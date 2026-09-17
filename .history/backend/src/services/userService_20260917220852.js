// src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const registerUser = async (data) => {
    const { name, email, password, confirmPassword } = data;

    // Validasi input dasar
    if (!name || !email || !password || !confirmPassword) {
        const error = new Error("Data tidak valid: Semua field harus diisi");
        error.statusCode = 400;
        throw error;
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
        const error = new Error("Data tidak valid: Password tidak cocok");
        error.statusCode = 400;
        throw error;
    }

    // Aturan bisnis: Email user harus unik[cite: 1]
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        const error = new Error("Email sudah terdaftar");
        error.statusCode = 400;
        throw error;
    }

    // Aturan bisnis: Password disimpan dalam bentuk hash[cite: 1]
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Memanggil Reposirory
    const newUser = await userRepository.createUser(name, email, hashedPassword);
    return newUser;
};

const loginUser = async (data) => {
    const { email, password } = data;

    const user = await userModel.findUserByEmail(email);
    if (!user) {
        const error = new Error("Email atau password salah");
        error.statusCode = 400;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error("Email atau password salah");
        error.statusCode = 400;
        throw error;
    }

    // Backend menghasilkan JWT setelah login berhasil[cite: 1]
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );

    return {
        user: { id: user.id, name: user.name, email: user.email },
        token: token
    };
};

module.exports = { registerUser, loginUser };