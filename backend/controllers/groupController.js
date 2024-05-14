const Group = require('../models/Group');
const mongoose = require('mongoose');

//gets all the groups
const getAllGroups = async (req, res) => {
    const groups = await Group.find({}).sort({createdAt: -1});//sort by most recent
    res.status(200).json(groups);
}

// get a single group
const getGroup = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such group'})
    }
    const group = await Group.findById(id);
    if(!group){
        return res.status(404).json({msg: 'Group not found'});
    }
    res.status(200).json(group);
}
//create a new group
const createGroup = async (req, res) => {
    const {name, description, members} = req.body;
    // add doc to db
    try{
        const group = await Group.create({name, description, members});
        res.status(200).json(group);
     }catch(err){
        res.status(400).json({err: err.message});
     }
}

// update a group
    const updateGroup = async (req, res) => {
        const { id } = req.params;
        const group = await Group.findOneAndUpdate({_id: id},{...req.body});
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({err: 'No such task'})
        }
        if(!task){
            return res.status(404).json({msg: 'Task not found'});
        }
    }
// delete a group
const deleteGroup = async (req, res) => {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete({_id: id});
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such group'})
    }
    if(!group){
        return res.status(404).json({msg: 'Group not found'});
    }
    res.status(200).json({id: group._id});
}

module.exports = {
    getAllGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup 
}