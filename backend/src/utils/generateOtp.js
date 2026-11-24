const crypto = require('crypto');

/**
 * Menghasilkan kode OTP 6 digit (contoh: "048291", "719384")
 * 
 * Kenapa pakai crypto, bukan Math.random()?
 * - Math.random() itu PSEUDORANDOM (bisa diprediksi polanya)
 * - crypto.randomInt() itu CRYPTOGRAPHICALLY SECURE (jauh lebih aman)
 */
const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
};

module.exports = generateOtp;
