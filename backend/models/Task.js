const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: Boolean, default: false },
  totalMissedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Task", taskSchema);
