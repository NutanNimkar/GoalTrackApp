const express = require('express');
const Task = require('../models/Task');
const {createTask, getAllTasks, getTask, updateTask, deleteTask, updateTaskStatus, updateDueDate} = require('../controllers/taskController');

// using express route to create routes
const router = express.Router();

//gets all the tasks
router.get('/', getAllTasks);

//gets a single task by id
router.get('/:id', getTask);

//creates a new task
router.post('/', createTask);

//updates a task
router.put('/:id',updateTask);

//deletes a task
router.delete('/:id', deleteTask);

router.put('/:id/status', updateTaskStatus);

router.put('/due', updateDueDate);

module.exports = router;
