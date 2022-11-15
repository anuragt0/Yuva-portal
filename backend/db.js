const mongoose = require('mongoose');
const env = require('dotenv');

const connectToMongo =  ()=>{
     mongoose.connect(process.env.DATABASE).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{console.log("Some error occured in database connection", err);})
}

module.exports = connectToMongo;
