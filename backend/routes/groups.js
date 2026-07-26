const express = require('express');
const Group = require('../models/Group');
const {createGroup, getAllGroups, getGroup, updateGroup, deleteGroup, getGroupMembers, addGroupMember, removeGroupMember} = require('../controllers/groupController');

const router = express.Router();

//gets all the groups
router.get('/', getAllGroups);

//gets a single group by id
router.get('/:id', getGroup);

//creates a new group
router.post('/', createGroup);

//updates a group
router.put('/:id',updateGroup);

//deletes a group
router.delete('/:id', deleteGroup);

router.get('/:id/members', getGroupMembers)

router.put('/:id/add-member', addGroupMember)

router.put('/:id/remove-member', removeGroupMember)

// tasks associated with a group
// router.get('/:id/tasks', ());
// group members of a group

module.exports = router
