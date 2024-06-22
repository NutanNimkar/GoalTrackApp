const Tasks = require('../models/Task');
const mongoose = require('mongoose');

// get all Tasks
const getAllTasks = async (req, res) => {
    const tasks = await Tasks.find({}).sort({createdAt: -1});//sort by most recent
    res.status(200).json(tasks);
}

// get a single Task
const getTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such task'})
    }
    const task = await Tasks.findById(id);

    if(!task){
        return res.status(404).json({msg: 'Task not found'});
    }
    res.status(200).json(task);
}


//create a new task
const createTask = async (req, res) => {
    const {name, description, dueDate,assignedTo, status} = req.body;

    // add doc to db
    try{
        const task = await Tasks.create({name, description, dueDate, assignedTo, status});
        res.status(200).json(task);
     }catch(err){
        res.status(400).json({err: err.message});
     }
}


// update a task
    const updateTask = async (req, res) => {
        const { id } = req.params;
        const task = await Tasks.findOneAndUpdate({_id: id},{...req.body});
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({err: 'No such task'})
        }
        if(!task){
            return res.status(404).json({msg: 'Task not found'});
        }
        res.status(200).json(task);
    }


// delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete({_id: id});
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such task'})
    }
    if(!task){
        return res.status(404).json({msg: 'Task not found'});
    }
    res.status(200).json({id: task._id});
}

const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Tasks.findOneAndUpdate({_id: id},{status}, {new: true});

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such task'})
    }
    if(!task){
        return res.status(404).json({msg: 'Task not found'});
    }
    res.status(200).json(task);
}

const updateDueDate = async (req, res) => {
    const { dueDate } = req.body;

    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({ message: 'Invalid due date' });
    }
    try {
        const tasks = await Task.find({});
        await Promise.all(tasks.map(async (task) => {
            task.dueDate = new Date(dueDate);
            await task.save();
        }).catch(err => {
            return res.status(400).json({ err: err.message });
        }));

        res.status(200).json({ message: 'Due dates updated successfully' });
    } catch (err) {
        console.error('Error updating due dates:', err);
        res.status(500).json({ message: 'Error updating due dates', error: err.message });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateDueDate
}