const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { friendsLookup, sendFriendRequest, getFriendRequest, acceptFriendRequest, addFriends} = require('../controllers/authController');

// look up users current friends
router.get('/current-friends', friendsLookup);

// adding friends
router.post('/add-friends/:id', addFriends );

// sending friend request
router.post('/send-friend-req/:id/:id2', sendFriendRequest);

// avaiable friend request
router.get('/available-friends-req/:id', getFriendRequest);

// accepting friend request
router.post('/accepting-friends/:id/:id2', acceptFriendRequest);




module.exports = router;