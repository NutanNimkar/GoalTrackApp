const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks");

//middleware
app.use(express.json());

app.use((req, res, next)=>{
    console.log(req.path,req.method);
    next();
})

app.use('/api/tasks',tasksRoutes);

mongoose
.connect(process.env.MONG_URI)
.then(() => {app.listen(process.env.PORT, () => {
    console.log(`connected to db and listening on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});

//listen for requests
// app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}!!`));