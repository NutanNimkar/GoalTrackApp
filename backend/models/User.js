const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  lastReset: { type: Date },
});

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  if(!validator.isEmail(email)){
    throw Errror('Email is not valid');
  }
  const user = await this.findOne({email});
  if(!user){
    throw Error('Incorrect email');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw Error('Incorrect password');
  }
  return user;
}

userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error('All fields must be filled');
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid');
  }
  if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough');
  }
  const email_exists = await this.findOne({ email });
  if (email_exists) {
    throw Error('Email already in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });

  return user;
}
const User = mongoose.model('User', userSchema);

module.exports = User;
