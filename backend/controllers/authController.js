const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
require("dotenv").config();


const createToken = (_id) => {
    const privatekey = process.env.SECRET;
    if (!privatekey) {
        console.error("Secret key is not defined in environment variables.");
    } else {
    }
    return jwt.sign({_id}, privatekey, {expiresIn: '3d'});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token, id: user._id});
    }
    catch(err){
        return res.status(400).json({err: err.message});
    }
}
const signup = async(req, res) => {
    const {username, email, password } = req.body;
    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);

        res.status(200).json({email, token, id: user._id});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

const forgotPassword = async(req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.send("User does not exist");
        }
        const token = createToken(user._id);
        const tokenExpiry = Date.now() +  15 * 60 * 1000;

        user.resetToken = token;
        user.resetTokenExpiry = tokenExpiry;
        await user.save();
        const resetLink = `http://localhost:3000/reset-password/${token}`;
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
    }catch(error) {
        res.status(500).json({ error: 'Internal server error', error: error.message });
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
        res.status(500).json({ error: error + 'Internal server error' });
    }
}

module.exports = {
    login,
    signup,
    forgotPassword,
    resetPassword
};