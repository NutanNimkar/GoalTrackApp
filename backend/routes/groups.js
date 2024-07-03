const express = require('express');
const Group = require('../models/Group');
const {createGroup, getAllGroups, getGroup, updateGroup, deleteGroup, getGroupMembers, addGroupMember} = require('../controllers/groupController');

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
//{group-id}/members
router.get('/:id/members', getGroupMembers)
//{group-id}/add-members
router.put('/:id/add-member', addGroupMember)

// tasks associated with a group
// router.get('/:id/tasks', ());
// group members of a group

module.exports = router
