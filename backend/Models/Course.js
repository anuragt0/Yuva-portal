const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdBy: {
        type: String,
    },
    totalVideos: {
        type: Number,
        default: 0
    }
        
    
})

const Course = mongoose.model("course", CourseSchema);
// User.createIndexes();
module.exports = Course;

