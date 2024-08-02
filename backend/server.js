const express = require("express");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/groups");
const { GridFSBucket } = require("mongodb");
const { initializeGridFSBucket } = require("./config/gridFs");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const requireAuth = require("./middleware/requireAuth");

//Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", requireAuth, tasksRoutes);
app.use("/api/users", requireAuth, userRoutes);
app.use("/api/groups", requireAuth, groupRoutes);

// Scheduled Task
cron.schedule("0 0 * * *", async () => {
  try {
    const users = await User.find({});
    users.forEach(async (user) => {
      await axios.put(
        `http://localhost:4060/api/tasks/reset-status/${user._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
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
