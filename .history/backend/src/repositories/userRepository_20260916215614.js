const pool = require('../config/db');
const userModel = require('../models/userModel');

const findByEmail =async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] ? new userModel(rows[0]) : null;
}