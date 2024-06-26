const User = require('../models/User');
const jwt = require('jsonwebtoken');

// const asyncHandler = require('express-async-handler');

const createToken = (_id) => {
    const privatekey = process.env.SECRET;
    if (!privatekey) {
        console.error("Secret key is not defined in environment variables.");
        // Handle the error or terminate gracefully
    } else {
        // Use the secret key in your application logic
        console.log("Secret key loaded successfully:", privatekey);
    }
    return jwt.sign({_id}, privatekey, {expiresIn: '3d'});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        //create a token
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }
    catch(err){
        return res.status(400).json({err: err.message});
    }
}
const signup = async(req, res) => {
    const {username, email, password } = req.body;
    try {
        const user = await User.signup(username, email, password);
        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

module.exports = {
    login,
    signup
};