const Tasks = require("../models/Task");
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

// get all Tasks assigned to the logged-in user
const getAllTasks = async (req, res) => {
  const assignedTo = req.user._id;
  try {
    const tasks = await Tasks.find({ assignedTo }).sort({ createdAt: -1 });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ msg: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

// get a single Task
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;

  try {
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (!checkAuthorization(req, task.assignedTo)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

// create a new task
const createTask = async (req, res) => {
  const { name, description, dueDate, assignedTo, status } = req.body;

  // Authorization Check: Only allow the logged-in user to assign tasks to themselves
  if (!checkAuthorization(req, assignedTo)) {
    return res.status(403).json({ msg: 'User not authorized to assign task' });
  }

  try {
    const task = await Tasks.create({
      name,
      description,
      dueDate,
      assignedTo,
      status,
    });
    res.status(201).json(task); // 201 status for created resource
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(400).json({ err: err.message });
  }
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;

  try {
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (!checkAuthorization(req, task.assignedTo)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    const updatedTask = await Tasks.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!checkIdIsValid(id, res)) return;

  try {
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (!checkAuthorization(req, task.assignedTo)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    await Tasks.findByIdAndDelete(id);
    res.status(200).json({ id: task._id });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

// update a task's status
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!checkIdIsValid(id, res)) return;

  try {
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (!checkAuthorization(req, task.assignedTo)) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    const updatedTask = await Tasks.findOneAndUpdate({ _id: id }, { status }, { new: true });

    // Update the lastReset date of the user who owns the task
    const user = await User.findById(task.assignedTo);
    if (user) {
      user.lastReset = new Date();
      await user.save();
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

// update the due date of all tasks
const updateDueDate = async (req, res) => {
  const { dueDate } = req.body;

  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({ message: "Invalid due date" });
  }
  try {
    const tasks = await Tasks.find({ assignedTo: req.user._id });

    await Promise.all(
      tasks.map(async (task) => {
        task.dueDate = new Date(dueDate);
        await task.save();
      })
    );

    res.status(200).json({ message: "Due dates updated successfully" });
  } catch (err) {
    console.error("Error updating due dates:", err);
    res.status(500).json({ message: "Error updating due dates", error: err.message });
  }
};

// reset task status for a user
const resetTaskStatusForUser = async (req, res) => {
  const { userId } = req.params;

  if (!checkAuthorization(req, userId)) {
    return res.status(403).json({ msg: 'User not authorized' });
  }

  try {
    const user = await User.findById(userId);
    const now = new Date();

    // Check if the reset was done within the last 24 hours
    if (user.lastReset && now - user.lastReset < 24 * 60 * 60 * 1000) {
      const tasks = await Tasks.find({ assignedTo: userId });
      return res.status(200).json({
        message: "Task statuses already reset today",
        tasks,
        lastReset: user.lastReset,
      });
    }

    await Tasks.updateMany({ assignedTo: userId }, { status: false });
    const updatedTasks = await Tasks.find({ assignedTo: userId });

    // Update the last reset time
    user.lastReset = now;
    await user.save();

    res.status(200).json({
      message: "Task statuses reset successfully for user",
      tasks: updatedTasks,
      lastReset: user.lastReset,
    });
  } catch (err) {
    console.error("Error resetting task statuses for user:", err);
    res.status(500).json({
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
