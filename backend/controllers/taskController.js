const Tasks = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");

// get all Tasks
const getAllTasks = async (req, res) => {
  const tasks = await Tasks.find({}).sort({ createdAt: -1 }); //sort by most recent
  res.status(200).json(tasks);
};

// get a single Task
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such task" });
  }
  const task = await Tasks.findById(id);

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }
  res.status(200).json(task);
};

//create a new task
const createTask = async (req, res) => {
  const { name, description, dueDate, assignedTo, status } = req.body;

  // add doc to db
  try {
    const task = await Tasks.create({
      name,
      description,
      dueDate,
      assignedTo,
      status,
    });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such task" });
  }
  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }
  res.status(200).json(task);
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.findByIdAndDelete({ _id: id });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such task" });
  }
  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }
  res.status(200).json({ id: task._id });
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such task" });
  }

  const task = await Tasks.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }

  // Update the lastReset date of the user who owns the task
  const user = await User.findById(task.assignedTo);
  if (user) {
    user.lastReset = new Date();
    await user.save();
  }

  res.status(200).json(task);
};
const updateDueDate = async (req, res) => {
  const { dueDate } = req.body;

  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({ message: "Invalid due date" });
  }
  try {
    const tasks = await Tasks.find({});
    await Promise.all(
      tasks
        .map(async (task) => {
          task.dueDate = new Date(dueDate);
          await task.save();
        })
        .catch((err) => {
          return res.status(400).json({ err: err.message });
        })
    );

    res.status(200).json({ message: "Due dates updated successfully" });
  } catch (err) {
    console.error("Error updating due dates:", err);
    res
      .status(500)
      .json({ message: "Error updating due dates", error: err.message });
  }
};

const resetTaskStatusForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const now = new Date();

    // Check if the reset was done within the last 24 hours
    if (user.lastReset && now - user.lastReset < 24 * 60 * 60 * 1000) {
      const tasks = await Tasks.find({ assignedTo: userId });
      return res
        .status(200)
        .json({
          message: "Task statuses already reset today",
          tasks,
          lastReset: user.lastReset,
        });
    }

    await Tasks.updateMany({ assignedTo: userId }, { status: false });
    console.log();
    const updatedTasks = await Tasks.find({ assignedTo: userId });

    // Update the last reset time
    user.lastReset = now;
    await user.save();

    res
      .status(200)
      .json({
        message: "Task statuses reset successfully for user",
        tasks: updatedTasks,
        lastReset: user.lastReset,
      });
  } catch (err) {
    console.error("Error resetting task statuses for user:", err);
    res
      .status(500)
      .json({
        message: "Error resetting task statuses for user",
        error: err.message,
      });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateDueDate,
  resetTaskStatusForUser,
};
