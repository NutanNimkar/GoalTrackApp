const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/groups");
const cron = require('node-cron');
const axios = require('axios');

//middleware
app.use(express.json());
// app.use(cors());

app.use((req, res, next)=>{
    console.log(req.path,req.method);
    next();
})

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/tasks',tasksRoutes);
app.use('/api/users',userRoutes);
// app.use('/api/auth',authRoutes);
app.use('/api/groups',groupRoutes);


// cron.schedule('0 0 * * *', async () => {
//   try {
//     const response = await axios.put('http://localhost:4060/api/tasks/due', {}, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     console.log('Due tasks updated successfully', response.data);
//   } catch (error) {
//     console.error('Error updating due tasks:', error);
//   }
// });

mongoose
.connect(process.env.MONG_URI)
.then(() => {app.listen(process.env.PORT, () => {
    console.log(`connected to db and listening on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});