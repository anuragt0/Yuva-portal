const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  unitArr: {
    type: Array, // array of units
    default: [],
  },
});

const Course = mongoose.model("course", CourseSchema);
// User.createIndexes();
module.exports = Course;
