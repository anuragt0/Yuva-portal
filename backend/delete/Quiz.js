const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const QuizSchema = mongoose.Schema({
    videoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video'
    },
    questions : {
        type : Array ,
        default : [] 
    },
    options: {
        type: Array,
    }
    
})

const Quiz = mongoose.model("quiz", QuizSchema);
module.exports = Quiz;

