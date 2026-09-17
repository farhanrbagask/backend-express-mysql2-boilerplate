// src/middlewares/validate.js
const validate = (schema) => (req, res, next) => {
    // safeParse tidak akan melempar error (throw), jadi tidak perlu try-catch
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });

    if (!result.success) {
        // Ambil pesan error pertama
        const errorMessage = result.error.errors[0].message;
        return res.status(400).json({ 
            success: false, 
            message: errorMessage 
        });
    }

    // (Opsional) Timpa req.body dengan hasil validasi Zod 
    // agar data yang masuk ke controller sudah bersih (tersanitasi)
    req.body = result.data.body; 
    
    next(); // Lolos validasi
};

module.exports = validate;
