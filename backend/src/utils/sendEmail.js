// src/utils/sendEmail.js

// Nodemailer = library untuk mengirim email dari Node.js
const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * TRANSPORTER = objek yang tahu CARA mengirim email
 * 
 * Analoginya: transporter itu seperti "akun kantor pos" kamu.
 * Kamu kasih tahu:
 *   - Kantor pos mana? → Gmail (smtp.gmail.com)
 *   - Port berapa? → 587 (standar untuk email dengan enkripsi TLS)
 *   - Siapa pengirimnya? → EMAIL_USER + EMAIL_PASS dari .env
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',    // Shortcut: Nodemailer sudah tahu config SMTP Gmail
    auth: {
        user: process.env.EMAIL_USER,  // Gmail kamu
        pass: process.env.EMAIL_PASS   // App Password (16 karakter)
    }
});

/**
 * Fungsi untuk mengirim email
 * @param {string} to - Email tujuan (email user yang akan terima OTP)
 * @param {string} subject - Judul email (contoh: "Kode OTP Anda")
 * @param {string} html - Isi email dalam format HTML (bisa dibikin cantik)
 */
const sendEmail = async (to, subject, html) => {
    // mailOptions = "surat" yang mau dikirim
    const mailOptions = {
        from: `"Boilerplate App" <${process.env.EMAIL_USER}>`, // Nama pengirim + alamat
        to: to,           // Email tujuan (email user)
        subject: subject, // Judul email
        html: html        // Isi email (format HTML biar bisa styling)
    };

    // Kirim email! 
    // Kalau gagal (misal: internet mati, password salah), akan throw error
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
