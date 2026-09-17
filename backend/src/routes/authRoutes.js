const express = require('express');
const { register, login } = require('../controllers/authController');
const {authLimiter} = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validate'); // Import middleware validate
const { registerSchema, loginSchema } = require('../validations/authValidation'); // Import skema Zod
const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

module.exports = router;