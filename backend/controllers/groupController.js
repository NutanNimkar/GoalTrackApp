const Group = require("../models/Group");
const { checkIdIsValid, checkAuthorization } = require("../middleware/validators");

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ createdAt: -1 });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const getGroupMembers = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;
  try {
    const group = await Group.findById(id).populate("members");
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const getGroup = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;
  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const createGroup = async (req, res) => {
  const { name, description, members, punishment } = req.body;
  try {
    const group = await Group.create({ name, description, members, punishment });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const updateGroup = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;
  try {
    const group = await Group.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;
  try {
    const group = await Group.findByIdAndDelete(id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(200).json({ id: group._id });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const addGroupMember = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!checkIdIsValid(id, res)) return;
  if (!checkIdIsValid(userId, res)) return;
  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    if (group.members.includes(userId)) {
      return res.status(400).json({ msg: "User already in group" });
    }
    group.members.push(userId);
    await group.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

const removeGroupMember = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!checkIdIsValid(id, res)) return;
  if (!checkIdIsValid(userId, res)) return;
  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    if (!group.members.some((m) => m.toString() === userId)) {
      return res.status(400).json({ msg: "User not in group" });
    }
    group.members = group.members.filter((m) => m.toString() !== userId);
    await group.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
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
