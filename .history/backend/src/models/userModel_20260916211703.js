const pool = require('../config/database');

const findUserByEmail = async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (name, email, hashedPassword) => {
    const [result] = await pool.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );
    return {
        id: result.insertId, 
        name: name, 
        email: email
    };
};

module.exports = { findUserByEmail, createUser };