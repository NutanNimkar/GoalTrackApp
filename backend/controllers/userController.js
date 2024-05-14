const User = require('../models/User');
const Task = require('../models/Task');
const mongoose = require('mongoose');

// get all Users

const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});//sort by most recent
    res.status(200).json(users);
}

// get a single User
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such user'})
    }
    const user = await User.findById(id);
}

//create a new User
const createUser = async (req, res) => {
    const {username, email, password} = req.body;
    // add doc to db
    try{
        const user = await User.create({username, email, password});
        res.status(200).json(user);
     }catch(err){
        res.status(400).json({err: err.message});
     }
}

//update a User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({_id: id},{...req.body});
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such user'})
    }
    if(!user){
        return res.status(404).json({msg: 'User not found'});
    }
}

//delete a User

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({_id: id});
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such user'})
    }
    if(!user){
        return res.status(404).json({msg: 'User not found'});
    }
    res.status(200).json({id: user._id});
}

// groups associated with a user
const getUsersGroups = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such user'})
    }
    try{
    const user = await User.findById(id).populate('groups');
    if(!user){
        return res.status(404).json({msg: 'User not found'});
    }
    }catch(err){
        console.log(err);
        res.status(400).json({err: err.message});
    }
}
const getUsersTasks = async (req, res) => {
    const { id } = req.params;

    try {
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ err: 'No such user' });
        }

        // Find all tasks assigned to the user
        const tasks = await Task.find({ assignedTo: id });

        // If no tasks found, return 404
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ msg: 'No tasks found for the user' });
        }

        // Populate tasks into the User object
        const user = await User.findById(id);
        user.tasks = tasks;

        // Return the user object with populated tasks
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: err.message });
    }
};



module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsersGroups,
    getUsersTasks
}