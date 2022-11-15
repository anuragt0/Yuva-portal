const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const QuizSchema = mongoose.Schema({
    videoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video'
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    questions : {
        type : Array ,
        default : [] 
    },
    options: [
        {
            type: String
        }
    ],
    

        
    
})

const Quiz = mongoose.model("quiz", CourseSchema);
// User.createIndexes();
module.exports = Quiz;

