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

// Add a user to the friends list
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
    res.status(200).json({ msg: "Friend added to friends list" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
  const { id } = req.params; // The user accepting the request
  const { friendIdentifier } = req.body; // The friend who sent the request
  const friendId = await getUserIdByUsernameOrEmail(friendIdentifier);

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

    // Check if a friend request from `friendId` exists in `user`
    if (!user.friendsRequests.includes(friendId.toString())) {
      return res.status(400).json({ err: "Friend request not sent" });
    }

    // Add each other to the friends list
    user.friends.push(friendId);
    friend.friends.push(id);

    // Remove the friend request from both users' `friendsRequests` and `sentFriendRequests` arrays
    user.friendsRequests = user.friendsRequests.filter(
      (requestId) => requestId.toString() !== friendId.toString()
    );
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (requestId) => requestId.toString() !== id.toString()
    );

    // Save both the user and the friend after modifications
    await user.save();
    await friend.save();

    res.status(200).json({ msg: "Friend request accepted and added to friends list" });
  } catch (err) {
    res.status(500).json({ err: "Server error", msg: err.message });
  }
};

// Decline a friend request
const declineFriendRequest = async (req, res) => {
  const { id } = req.params; // The user declining the request
  const { friendIdentifier } = req.body; // The friend who sent the request
  const friendId = await getUserIdByUsernameOrEmail(friendIdentifier);

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

    // Check if a friend request exists in `user`
    if (!user.friendsRequests.includes(friendId.toString())) {
      return res.status(400).json({ err: "Friend request not sent" });
    }

    // Remove the friend request from both users' `friendsRequests` and `sentFriendRequests` arrays
    user.friendsRequests = user.friendsRequests.filter(
      (requestId) => requestId.toString() !== friendId.toString()
    );
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (requestId) => requestId.toString() !== id.toString()
    );

    // Save the changes
    await user.save();
    await friend.save();

    res.status(200).json({ msg: "Friend request declined and removed from both users" });
  } catch (err) {
    res.status(500).json({ err: "Server error", msg: err.message });
  }
};

// Get user id from username or email
const getUserIdByUsernameOrEmail = async (identifier) => {
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user._id;
};

// Delete a friend request (for the recipient)
const deleteFriendRequest = async (req, res) => {
  const { id } = req.params;
  const { friendIdentifier } = req.body;

  try {
    if (!checkIdIsValid(id, res)) return;

    const friendId = await getUserIdByUsernameOrEmail(friendIdentifier);

    if (!checkIdIsValid(friendId, res)) return;

    if (!checkAuthorization(req, id)) {
      return res.status(403).json({ msg: "User not authorized" });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }
    if (!user.friendsRequests.includes(friendId)) {
      return res.status(400).json({ err: "Friend request not sent" });
    }

    // Remove the friend request from both users
    user.friendsRequests = user.friendsRequests.filter(
      (requestId) => requestId.toString() !== friendId.toString()
    );
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (requestId) => requestId.toString() !== id.toString()
    );
    await user.save();
    await friend.save();

    res.status(200).json({ msg: "Friend request deleted" });
  } catch (err) {
    return res.status(500).json({ err: "Server error" });
  }
};

// Send a friend request
const sendFriendRequest = async (req, res) => {
  const { id } = req.params; // The user who is sending the request (userId)
  const { friendIdentifier } = req.body; // The friend to whom the request is being sent

  try {
    const friendId = await getUserIdByUsernameOrEmail(friendIdentifier);

    if (!checkAuthorization(req, id)) {
      return res.status(403).json({ msg: "User not authorized" });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }

    // Initialize arrays if not present
    user.sentFriendRequests = user.sentFriendRequests || [];
    friend.friendsRequests = friend.friendsRequests || [];
    user.friends = user.friends || [];
    friend.friends = friend.friends || [];

    // Check if a friend request or friendship already exists
    if (
      user.sentFriendRequests.includes(friendId) ||
      friend.friendsRequests.includes(id) ||
      user.friends.includes(friendId) ||
      friend.friends.includes(id)
    ) {
      return res.status(400).json({
        err: "Friend request already sent or user already in friends list",
      });
    }

    // Add the `friendId` to the user's `sentFriendRequests` list
    user.sentFriendRequests.push(friendId);

    // Add the `userId` to the friend's `friendsRequests` list
    friend.friendsRequests.push(id);

    // Save both the user and the friend
    await user.save();
    await friend.save();

    res.status(200).json({ msg: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Remove a friend from the list
const removeFriend = async (req, res) => {
  const { id } = req.params;
  const { friendIdentifier } = req.body;
  const friendId = await getUserIdByUsernameOrEmail(friendIdentifier);

  if (!checkIdIsValid(id, res)) return;
  if (!checkIdIsValid(friendId, res)) return;
  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }

    if (!user.friends.includes(friendId.toString())) {
      return res.status(400).json({ err: "User not in friends list" });
    }

    // Remove each other from the friends list
    user.friends = user.friends.filter((fid) => fid.toString() !== friendId.toString());
    friend.friends = friend.friends.filter((uid) => uid.toString() !== id.toString());

    // Save both users after the updates
    await user.save();
    await friend.save();

    return res.status(200).json({ msg: "Friend removed" });
  } catch (err) {
    return res.status(500).json({ err: "Server error" });
  }
};

// Remove a friend request (for the sender)
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

    if (!user.sentFriendRequests.includes(friendId)) {
      return res.status(400).json({ err: "Friend request not sent" });
    }

    user.sentFriendRequests = user.sentFriendRequests.filter(
      (requestId) => requestId.toString() !== friendId
    );
    friend.friendsRequests = friend.friendsRequests.filter(
      (requestId) => requestId.toString() !== id
    );
    await user.save();
    res.status(200).json({ msg: "Friend request removed" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};
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
      res.status(200).json(user.friendsRequests);
    } catch (err) {
      res.status(500).json({ err: "Server error" });
    }
}
module.exports = {
  friendsLookup,
  sendFriendRequest,
  acceptFriendRequest,
  addFriends,
  getFriendRequest,
  removeFriend,
  removeFriendRequest,
  deleteFriendRequest,
  declineFriendRequest,
};
