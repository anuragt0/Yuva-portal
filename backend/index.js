const express = require('express');
const app = express();
const connectToMongo = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
app.use(cors());

// to use req.body
app.use(express.json());

connectToMongo();

app.use('/api/auth', require('./routes/auth.js'));

app.use('/api', require('./routes/others.js'));


app.listen(5000, ()=>{
    console.log("Server is listening at port 5000");
})
