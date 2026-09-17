// src/validations/authValidation.js
const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Nama tidak boleh kosong"),
        email: z.string().email("Format email tidak valid"),
        password: z.string().min(6, "Password minimal 6 karakter"),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Data tidak valid: Password tidak cocok",
        path: ["confirmPassword"]
    })
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Format email tidak valid"),
        password: z.string().min(1, "Password tidak boleh kosong")
    })
});

module.exports = { registerSchema, loginSchema };