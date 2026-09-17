const pool = require('../config/db');
const userModel = require('../models/userModel');

const findByEmail =async (email) => {
    const [rows] = awit pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}