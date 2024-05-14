const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
//profilePicture: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
