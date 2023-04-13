const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
    unique:false
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  
  coursename: {
    type: String,
    required: false
  },
  studentno: {
    type: String,
    required: true,
    unique:true
  },
  isTutor: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;