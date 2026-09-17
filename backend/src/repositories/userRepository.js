const pool = require('../config/db');
const userModel = require('../models/userModel');

const findByEmail =async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] ? new userModel(rows[0]) : null;
}

const createUser = async (name, email, hashedPassword) => {
    const [result] = await pool.execute(
        'INSERT INTO users (name, email, password) VALUES (?,?,?)',
        [name, email, hashedPassword]
    );
    return new userModel({ id: result.insertID, name, email});
};

module.exports = {findByEmail, createUser};