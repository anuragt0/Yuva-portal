const mongoose = require('mongoose');
const {Schema} = require('mongoose');

//One can either upload quiz when uploading video or can add it manually later

const VideoSchema = mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source:{
        type:String,
        required:true
    },
    quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz'
    }

    
})
const Video = mongoose.model("video", VideoSchema);
// User.createIndexes();
module.exports = Video;

