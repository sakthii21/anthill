const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true // Prevent duplicate emails
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: ["admin", "user"], // Only allow "admin" or "user"
    default: "user"
  }
});



const User = mongoose.model('User', userSchema);
module.exports = User;
