const express = require('express');
const User = require('../models/User');
const {createUser, getAllUsers, getUser, updateUser, deleteUser, getUsersGroups, getUsersTasks} = require('../controllers/userController');

const router = express.Router();

//gets all the users
router.get('/', getAllUsers);

//gets a single user by id

router.get('/:id', getUser);

//creates a new user

router.post('/', createUser);

//updates a user

router.put('/:id',updateUser);

//deletes a user
router.delete('/:id', deleteUser);

// groups associated with a user
router.get('/:id/groups', getUsersGroups);

//tasks associated with a user
router.get('/:id/tasks', getUsersTasks);


module.exports = router