const express = require("express");
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateDueDate,
  resetTaskStatusForUser,
} = require("../controllers/taskController");

const router = express.Router();

// Static routes must come before /:id to avoid being shadowed
router.put("/due", updateDueDate);
router.put("/reset-status/:userId", resetTaskStatusForUser);

router.get("/", getAllTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/status", updateTaskStatus);

module.exports = router;
