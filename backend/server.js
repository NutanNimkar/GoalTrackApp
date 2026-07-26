const express = require("express");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const friendRoutes = require("./routes/friends");
const groupRoutes = require("./routes/groups");
const { GridFSBucket } = require("mongodb");
const { initializeGridFSBucket } = require("./config/gridFs");
const cron = require("node-cron");
const cors = require('cors');
const User = require("./models/User");
const Task = require("./models/Task");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const requireAuth = require("./middleware/requireAuth");

//Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
}));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", requireAuth, friendRoutes);
app.use("/api/tasks", requireAuth, tasksRoutes);
app.use("/api/users", requireAuth, userRoutes);
app.use("/api/groups", requireAuth, groupRoutes);

// Scheduled Task — reset all task statuses daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const users = await User.find({});
    await Promise.all(
      users.map(async (user) => {
        const now = new Date();
        if (user.lastReset && now - user.lastReset < 24 * 60 * 60 * 1000) return;
        await Task.updateMany({ assignedTo: user._id }, { status: false });
        user.lastReset = now;
        await user.save();
      })
    );
    console.log("Task statuses reset successfully for all users");
  } catch (error) {
    console.error("Error resetting task statuses:", error);
  }
});
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    initializeGridFSBucket();
    app.listen(port, () => {
      console.log(`connected to db and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
