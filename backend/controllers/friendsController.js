const User = require("../models/User");

const mongoose = require("mongoose");


//get all friends the user currently has
const friendsLookup = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such user'})
    }
    const friends = await User.findById(id).populate('friends');
    if(!friends){
        return res.status(404).json({msg: 'User not found'});
    }
    res.status(200).json(friends);
}


// add a user to a friends list
const addFriends = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such user'})
    }
}



module.exports = {
    friendsLookup
}