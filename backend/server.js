const express = require("express");
require("dotenv").config();
// const cors = require("cors");?

const app = express();
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/groups");

//middleware
app.use(express.json());
// app.use(cors());

app.use((req, res, next)=>{
    console.log(req.path,req.method);
    next();
})

app.use('/api/tasks',tasksRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/groups',groupRoutes);

mongoose
.connect(process.env.MONG_URI)
.then(() => {app.listen(process.env.PORT, () => {
    console.log(`connected to db and listening on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});
