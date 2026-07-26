const User = require("../models/User");
const { checkIdIsValid, checkAuthorization } = require("../middleware/validators");

// Get all friends the user currently has
const friendsLookup = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
  const { id } = req.params; // The user accepting the request
  const { friendIdentifier } = req.body; // The friend who sent the request
  const friendId = await getUserIdByUsernameOrEmail(friendIdentifier);

  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId.friendId, res))
    return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    
    const friend = await User.findById(friendId.friendId);
    
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }

    // Check if a friend request from `friendId` exists in `user`
    if (user.friendsRequests.includes(friendId.username)) {
      return res.status(400).json({ err: "Friend request not sent" });
    }
    
    // Check if user is already friends with sender
    if (user.friends.includes(friendIdentifier)) {
      return res.status(400).json({err: `User already accepted request from ${friendId.username}` })
    }
    
    // Add each other to the friends list
    user.friends.push(friendIdentifier);
    friend.friends.push(user.username);

    // Remove the friend request from both users' `friendsRequests` and `sentFriendRequests` arrays
    user.friendsRequests = user.friendsRequests.filter(
      (requestId) => requestId !== friendIdentifier
    );
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (requestId) => requestId !== user.username
    );

    // Save both the user and the friend after modifications
    await user.save();
    await friend.save();

    res
      .status(200)
      .json({ msg: "Friend request accepted and added to friends list" });
  } catch (err) {
    res.status(500).json({ err: "Server error", msg: err.message });
  }
};

// Decline a friend request
const declineFriendRequest = async (req, res) => {
  const { id, requestId } = req.params; // The user declining the request
  // const { friendIdentifier } = req.body; // The friend who sent the request
  const friendId = await getUserIdByUsernameOrEmail(requestId);

  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId.friendId, res)) return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId.friendId);

    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }

    // Check if a friend request exists in `user`
    if (user.friendsRequests.includes(friendId.toString())) {
      return res.status(400).json({ err: "Friend request not sent" });
    }

    // Remove the friend request from both users' `friendsRequests` and `sentFriendRequests` arrays
    user.friendsRequests = user.friendsRequests.filter(
      (requestId) => requestId !== requestId
    );
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (requestId) => requestId.toString() !== user.username
    );

    // Save the changes
    await user.save();
    await friend.save();

    res
      .status(200)
      .json({ msg: "Friend request declined and removed from both users" });
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
  return { friendId: user._id.toString(), friendname: user.username };
  // return user._id;
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
    const friend = await User.findById(friendId.friendId);

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
      user.sentFriendRequests.includes(friendId.friendId) ||
      friend.friendsRequests.includes(id) ||
      user.friends.includes(friendId.friendId) ||
      friend.friends.includes(id)
    ) {
      return res.status(400).json({
        err: "Friend request already sent or user already in friends list",
      });
    }

    // Add the `friendId` to the user's `sentFriendRequests` list
    user.sentFriendRequests.push(friendId.friendname);

    // Add the `userId` to the friend's `friendsRequests` list
    // needs conversion from friendID to friend name when displaying in frontend list
    friend.friendsRequests.push(user.username ? user.username : "could not push name");
    console.log(user.username)
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
  const { id, friendName } = req.params;
  const friendId = await getUserIdByUsernameOrEmail(friendName);

  if (!checkIdIsValid(id, res)) return;
  if (!checkIdIsValid(friendId.friendId, res)) return;
  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId.friendId);
    

    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }

    if (user.friends.includes(friendId.username)) {
      return res.status(400).json({ err: "User not in friends list" });
    }

    // Remove each other from the friends list
    user.friends = user.friends.filter(
      (fid) => fid !== friendName
    );
    friend.friends = friend.friends.filter(
      (uid) => uid !== user.username
    );

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
  const { id, friendname } = req.params;
  // const { friendId } = req.body;

  const friendId = await getUserIdByUsernameOrEmail(friendname);

  if (!checkIdIsValid(id, res) || !checkIdIsValid(friendId.friendId, res))
    return;

  if (!checkAuthorization(req, id)) {
    return res.status(403).json({ msg: "User not authorized" });
  }

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId.friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User or friend not found" });
    }

    if (!user.sentFriendRequests.includes(friend.username)) {
      return res.status(400).json({ err: "Friend request not sent" });
    }

    user.sentFriendRequests = user.sentFriendRequests.filter(
      (requestId) => requestId !== friendname
    );
    friend.friendsRequests = friend.friendsRequests.filter(
      (requestId) => requestId !== user.username
    );
    await user.save();
    await friend.save();
    res.status(200).json({ msg: "Friend request removed" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

// List sent friend request (for the receiver)
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
};

// List sent friend requests (for the sender)
const getSentFriendRequest = async (req, res) => {
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
    res.status(200).json(user.sentFriendRequests);
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};
module.exports = {
  friendsLookup,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequest,
  removeFriend,
  removeFriendRequest,
  declineFriendRequest,
  getSentFriendRequest,
};
