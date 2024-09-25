const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {
  friendsLookup,
  sendFriendRequest,
  getFriendRequest,
  acceptFriendRequest,
  addFriends,
  removeFriend,
} = require("../controllers/friendsController");

// look up users current friends
router.get("/friends/:id", friendsLookup);

// adding friends
router.post("/add-friends/:id", addFriends);

// sending friend request
router.post("/send-req/:id", sendFriendRequest);

// available friend requests
router.get("/friend-requests/:id", getFriendRequest);

// accepting friend request
router.post("/accept-req/:id", acceptFriendRequest);

//remove a friend
router.delete("/friend/remove/:id", removeFriend);

//remove a friend request
router.delete("/request/remove/:id", removeFriend);

module.exports = router;
