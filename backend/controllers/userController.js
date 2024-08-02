const User = require("../models/User");
const Task = require("../models/Task");
const Group = require("../models/Group");
const mongoose = require("mongoose");
const Image = require("../models/Image");
const { getGridFSBucket } = require("../config/gridFs");

// Check if ID is valid
const checkIdisValid = (id, res) => {
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

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const groups = await Group.find({ members: user._id });
        const tasks = await Task.find({ assignedTo: user._id });

        return {
          ...user.toObject(),
          groups,
          tasks,
        };
      })
    );

    res.status(200).json(usersWithDetails);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Get a single User
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!checkIdisValid(id, res)) return;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!checkAuthorization(req, user._id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Create a new User
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  // Add document to db
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user); // 201 status for created resource
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ err: err.message });
  }
};

// Update a User
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!checkIdisValid(id, res)) return;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Authorization Check
    if (!checkAuthorization(req, user._id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Delete a User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!checkIdisValid(id, res)) return;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!checkAuthorization(req, user._id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ id: user._id });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Get groups associated with a user
const getUsersGroups = async (req, res) => {
  const { id } = req.params;
  if (!checkIdisValid(id, res)) return;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!checkAuthorization(req, user._id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    const groups = await Group.find({ members: id });

    if (!groups || groups.length === 0) {
      return res.status(404).json({ msg: "No groups found for the user" });
    }
    res.status(200).json(groups);
  } catch (err) {
    console.error("Error fetching user groups:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Get tasks associated with a user
const getUsersTasks = async (req, res) => {
  const { id } = req.params;
  if (!checkIdisValid(id, res)) return;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!checkAuthorization(req, user._id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    const tasks = await Task.find({ assignedTo: id });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ msg: "No tasks found for the user" });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching user tasks:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Get evidence images
const getEvidenceImages = async (req, res) => {
  try {
    const { id } = req.params;
    if (!checkIdisValid(id, res)) return;

    if(!checkAuthorization(req, id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    console.error("Error fetching evidence images:", err);
    return res.status(500).json({ err: err.message });
  }
};

// Middleware to ensure GridFS Bucket is available
const ensureGridFSBucket = (req, res, next) => {
  try {
    req.gridfsBucket = getGridFSBucket();
    next();
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// Upload evidence image
const uploadEvidence = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!checkIdisValid(id, res)) return;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!checkAuthorization(req, user._id)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    const newImage = new Image({
      url: `/evidenceImages/${req.file.filename}`,
      description: description,
      uploadedAt: new Date(),
      user: req._id,
    });

    await newImage.save();
    console.log("Uploaded evidence image:", newImage.description);

    user.evidenceImages.push(newImage._id);
    await user.save();

    res.status(200).json({
      msg: "Evidence image uploaded successfully",
      imageId: newImage._id,
    });
  } catch (error) {
    console.error("Error uploading evidence image:", error);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

// Display an image
const displayImage = async (req, res) => {
  const { filename } = req.params;

  try {
    const gridfsBucket = req.gridfsBucket;

    // Find the file by filename
    const files = await gridfsBucket.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ err: "File not found" });
    }

    const file = files[0];

    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readStream = gridfsBucket.openDownloadStreamByName(filename);
      res.setHeader("Content-Type", file.contentType);
      readStream.pipe(res);
    } else {
      return res.status(400).json({ err: "Not an image file" });
    }
  } catch (err) {
    console.error("Error serving image:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersGroups,
  getUsersTasks,
  uploadEvidence,
  ensureGridFSBucket,
  displayImage,
  getEvidenceImages,
};
