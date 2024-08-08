const Group = require("../models/Group");
const mongoose = require("mongoose");

// checks if ID is valid
const checkIdisValid = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID" });
  }
  return true;
};

// checks if user is authorized
const checkAuthorization = (req, userId) => {
  if (req.user.id !== userId.toString()) {
    return false;
  }
  return true;
};

//gets all the groups
const getAllGroups = async (req, res) => {
  const groups = await Group.find({}).sort({ createdAt: -1 }); //sort by most recent
  try {
    if (!groups || groups.length === 0) {
      return res.status(404).json({ msg: "No groups found" });
    }
    res.status(200).json(groups);
  } catch (err) {
    console.error("Error fetching groups", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const getGroupMembers = async (req, res) => {
  const { id } = req.params;
  if (!checkIdisValid(id, res)) return;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such group" });
  }
  const members = await Group.findById(id).populate("members");
  if (!members) {
    return res.status(404).json({ msg: "Group not found" });
  }
  res.status(200).json(members);
};
// get a single group
const getGroup = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such group" });
  }
  const group = await Group.findById(id);
  if (!group) {
    return res.status(404).json({ msg: "Group not found" });
  }
  res.status(200).json(group);
};
//create a new group
const createGroup = async (req, res) => {
  const { name, description, members, punishment } = req.body;
  // add doc to db
  try {
    const group = await Group.create({
      name,
      description,
      members,
      punishment,
    });
    res.status(200).json(group);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// update a group
const updateGroup = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such task" });
  }
  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }
  res.status(200).json(group);
};
// delete a group
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByIdAndDelete({ _id: id });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such group" });
  }
  if (!group) {
    return res.status(404).json({ msg: "Group not found" });
  }
  res.status(200).json({ id: group._id });
};

const addGroupMember = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const group = await Group.findById(id);
  if (!group) {
    return res.status(404).json({ msg: "Group not found" });
  }
  if (group.members.includes(userId)) {
    return res.status(400).json({ msg: "User already in group" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ err: "No such user" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such group" });
  }
  group.members.push(userId);
  await group.save();
  res.status(200).json(group);
};

const removeGroupMember = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const group = await Group.findById(id);
  if (!group) {
    return res.status(404).json({ msg: "Group not found" });
  }
  if (!group.members.includes(userId)) {
    return res.status(400).json({ msg: "User not in group" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ err: "No such user" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such group" });
  }
  const index = group.members.indexOf(userId);
  group.members.splice(index, 1);
  await group.save();
  res.status(200).json(group);
};

module.exports = {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupMembers,
  addGroupMember,
  removeGroupMember,
};
