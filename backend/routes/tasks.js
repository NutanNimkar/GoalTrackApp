const expres = require('express');
const Task = require('../models/Task');
const {createTask, getAllTasks, getTask, updateTask, deleteTask} = require('../controllers/taskController');

// using express route to create routes
const router = expres.Router();

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


// //assigns a task to a user
// router.put('/:id/assign', (req, res) => {
    
// })
// //assigns a tasks to a user incomplete
// router.put('/:id/incomplete', (req, res) => {
    
// })

// //assigns a tasks to a user complete
// router.put('/:id/complete', (req, res) => {
    
// })
module.exports = router;
