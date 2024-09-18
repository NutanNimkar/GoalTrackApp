const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { login, signup, forgotPassword, resetPassword } = require('../controllers/authController');


router.post('/login', login);

router.post('/signup', signup);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

module.exports = router;