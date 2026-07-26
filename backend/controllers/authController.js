const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require("dotenv").config();


const createToken = (_id) => {
    const privatekey = process.env.SECRET;
    return jwt.sign({ _id }, privatekey, { expiresIn: '3d' });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token, id: user._id });
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token, id: user._id });
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ err: "User does not exist" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetLink = `${process.env.CLIENT_ORIGIN || 'http://localhost:3000'}/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const mailOptions = {
            to: email,
            from: process.env.APP_EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `${resetLink}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user.password = hash;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login,
    signup,
    forgotPassword,
    resetPassword
};
