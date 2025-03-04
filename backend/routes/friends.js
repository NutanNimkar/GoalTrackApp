const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {
  friendsLookup,
  sendFriendRequest,
  getFriendRequest,
  acceptFriendRequest,
  removeFriend,
  // friendNamesLookup,
  // deleteFriendRequest,
  removeFriendRequest,
  declineFriendRequest,
  getSentFriendRequest,
} = require("../controllers/friendsController");

// look up users current friends
router.get("/:id", friendsLookup);

// sending friend request
router.post("/send-req/:id", sendFriendRequest);

// available friend requests for reciever
router.get("/friend-requests/:id", getFriendRequest);

// accepting friend request
router.post("/accept-req/:id", acceptFriendRequest);

//declining friend request
router.delete("/decline-req/:id/:requestId", declineFriendRequest);

//remove a friend
router.delete("/remove/:id/:friendName", removeFriend);

//remove a friend from a friend request
router.delete("/request/remove/:id/:friendname", removeFriendRequest);

// available friend requests for sender
router.get("/sentfriend-requests/:id", getSentFriendRequest);

// get friend names for sent requests
// router.get("/sentfriend-request-names/:id", friendNamesLookup);




module.exports = router;
