const User = require("../models/User");
const mongoose = require("mongoose");

// Check if ID is valid
const checkIdIsValid = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID" });
  }
  return true;
};

// Check if user is authorized
const checkAuthorization = (req, userId) => {
  if (req.user.id !== userId.toString()) {
    return false;
  }
  return true;
};

// Get all friends the user currently has
const friendsLookup = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id).populate("friends");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// Add a user to a friends list
const addFriends = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;
  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ err: "User already in friends list" });
    }
    user.friends.push(friendId);
    friend.friends.push(id);
    await user.save();
    await friend.save();
    res.status(200).json({ user, msg: "Friend added to friends list" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;
  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }
    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ err: "Friend request not sent" });
    }
    user.friends.push(friendId);
    friend.friends.push(id);

    user.friendRequests = user.friendRequests.filter(
      (requestId) => requestId.toString() !== friendId
    );

    await user.save();
    await friend.save();

    res.status(200).json({ msg: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// Send a friend request to another user
const sendFriendRequest = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;
  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }
    if (
      user.friendRequests.includes(friendId) ||
      friend.friendRequests.includes(user._id) ||
      user.friends.includes(friendId) ||
      friend.friends.includes(user._id)
    ) {
      return res
        .status(400)
        .json({
          err: "Friend request already sent or user already in friends list",
        });
    }

    friend.friendRequests.push(user._id);
    await friend.save();

    res.status(200).json({ msg: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// Get friend requests of the logged-in user
const getFriendRequest = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    res.status(200).json(user.friendRequests);
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

const removeFriend = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;
  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ err: "User not in friends list" });
    }
    user.friends = user.friends.filter(
      (friendId) => friendId.toString() !== friendId
    );
    friend.friends = friend.friends.filter(
      (friendId) => friendId.toString() !== id
    );
    await user.save();
    await friend.save();
    res.status(200).json({ msg: "Friend removed from friends list" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

const removeFriendRequest = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;
  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }
    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ err: "Friend request not sent" });
    }
    user.friendRequests = user.friendRequests.filter(
      (friendId) => friendId.toString() !== friendId
    );
    await user.save();
    res.status(200).json({ msg: "Friend request removed" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

module.exports = {
  friendsLookup,
  sendFriendRequest,
  acceptFriendRequest,
  addFriends,
  getFriendRequest,
  removeFriend,
  removeFriendRequest,
};
