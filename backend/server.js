const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/groups");
const cron = require("node-cron");
const axios = require("axios");
const Task = require("./models/Task");
const User = require("./models/User");

//middleware
app.use(express.json());
// app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use("/api/tasks", tasksRoutes);
app.use("/api/users", userRoutes);
// app.use('/api/auth',authRoutes);
app.use("/api/groups", groupRoutes);

const updateTaskStatusandTotalMissed = async () => {
  try {
    const tasks = await Task.find({ status: false });
    
    if (tasks.length === 0) {
      console.log("No tasks with status 'false' found.");
    }

    // Update missed count for each task
    for (const task of tasks) {
      task.totalMissedCount += 1;
      await task.save();
      console.log(`Updated task ${task._id}: totalMissedCount is now ${task.totalMissedCount}`);
    }

    // Fetch all users from the database
    const users = await User.find({});

    // Reset task statuses for all users
    const promises = users.map(user =>
      axios.put(
        `http://localhost:4060/api/tasks/reset-status/${user._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );

    await Promise.all(promises);

    console.log("Task statuses reset successfully for all users and total missed were updated");
  } catch (error) {
    console.error("Error updating task statuses:", error);
  }
};

cron.schedule("0 0 * * *", async () => {
  await updateTaskStatusandTotalMissed();
});
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
