const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    coursename: {
    type: String,
    required: true,
    unique: true
  },
  coursesection: {
    type: String,
    required: true
  },
  coursetime: {
    type: String,
    required: true
  },
  coursefee: {
    type: String,
    required: true
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;