const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { login, signup, forgotPassword, resetPassword } = require('../controllers/authController');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: { err: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/login', authLimiter, login);
router.post('/signup', authLimiter, signup);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;