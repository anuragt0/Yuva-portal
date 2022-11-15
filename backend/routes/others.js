const express = require("express");
const User = require("../models/User");
const Video = require("../models/Video");
const Course = require("../models/Course");
const fetchuser = require('../middleware/fetchuser');
const { findOne } = require("../models/User");

const router = express.Router();


router.get('/getcourses', async (req,res)=>{
    const allCourses = await Course.find();
    res.json(allCourses);
})

router.post('/getvideos' , async (req,res)=>{
    // console.log(req.body.courseID);
    const allVideos = await Video.find({course_id: req.body.courseID});
    res.json(allVideos);

})

//User must be loggedin to play the video
router.post('/getvideobyid', fetchuser, async(req,res)=>{
    const userID = req.user.id;
    // const loggedInUser = await User.findOne({_id: userID});

    const videoID = req.body.videoID;
    const video = await Video.findOne({_id: videoID});
    res.json(video);
})

router.post('/auth/uploadcourse', fetchuser, async(req,res)=>{
    const userID = req.user.id;
    // console.log(userID);
    // const name = req.body.name;
    // const description = req.body.description;
    // const totalVideos = req.body.totalVideos;
    
    const loggedInUser = await User.findOne({_id: userID});
    
    if(loggedInUser.role==='user'){
        res.status(401).send({ error: "Access denied, please login with correct credentials" });
    }
    else{
        // Check whether the course with this name exists already
        try {
            let course = await Course.findOne({ name: req.body.name });
            if (course) {
                return res
                .status(400)
                .json({ error: "Sorry a course with this name already exists" });
            }
            const newCourse = await Course.create({
                name: req.body.name,
                description: req.body.description,
                createdBy: loggedInUser.name
            })
            res.json(newCourse);
        } catch (error) {
            console.log(error);
        }
    }

})

router.post('/auth/uploadvideo', fetchuser, async (req,res)=>{
    const userID = req.user.id;
    const courseID = req.body.courseID;
    const title = req.body.title;
    const description = req.body.description;
    const source = req.body.source;

    const loggedInUser = await User.findOne({_id: userID});
    if(loggedInUser.role==='user'){
        res.status(401).send({ error: "Access denied, please login with correct credentials" });
    }
    else{
        const duplicate = await Video.findOne({course_id: courseID, title: title});
        const currCourse = await Course.findOne({_id: courseID});
        let currVideos = currCourse.totalVideos;
        currVideos++;
        // console.log(currCourse);
        if (duplicate) {
            return res
            .status(400)
            .json({ error: "Sorry video with same title is already been uploaded in this course" });
        }
        const newVideo = await Video.create({
            course_id: courseID,
            title: title,
            description: description,
            source: source
        })
        // console.log("here: ",courseID);

        const updatedCourse = await Course.findOneAndUpdate({_id:courseID}, {totalVideos: currVideos}, {new:true});
        res.json({newVideo, updatedCourse});
    }
})

// router.get('/getquiz', async (req,res)=>{

// })

router.post("/increasewatchtime", async(req,res)=>{
    const userID = req.body.userID;
    const videoID = req.body.videoID;
    const incrTime = Number(req.body.time);
    // const videoLength = Number(req.body.videoLength);
    console.log("yaha tak to aa gayaa iska matlab");

    // console.log("here: ", incrTime);
    const user = await User.findById(userID);
    // console.log(user);
    let currentWatchStatus = user.watchStatus;

    if(isNaN(currentWatchStatus[videoID])){
        currentWatchStatus[videoID] = 0;
    }
    currentWatchStatus[videoID]+=incrTime;

    const newUser = await User.findOneAndUpdate({_id: userID}, {watchStatus: currentWatchStatus}, {new:true})
    console.log("Updated user: ", newUser);
    res.json({"success": true, user: newUser});

})

router.post('/getcourse', async(req,res)=>{
    const courseID = req.body.courseID;
    const course = await Course.findOne({_id: courseID});
    res.json(course);
})

// admin routes
router.post('/auth/deletecourse', fetchuser, async (req,res)=>{
    const userID = req.user.id;
    const courseID = req.body.courseID;
  
    const loggedInUser = await User.findOne({_id: userID});
    if(loggedInUser.role==='user'){
        res.status(401).send({ error: "Access denied, please login with correct credentials" });
    }
    else{
        await Video.deleteMany({course_id: courseID});
        await Course.deleteOne({_id: courseID});
        res.json({success: true, msg: "Area and its slots area deleted successfully"})
    }
})

router.post('/auth/deletevideo', fetchuser, async(req,res)=>{
    const userID = req.user.id;
    const videoID = req.body.videoID;
  
    //wrap in try catch

    const loggedInUser = await User.findOne({_id: userID});
    if(loggedInUser.role==='user'){
        res.send(401).send({ error: "Access denied, please login with correct credentials" });
    }
    else{
        const video = await Video.findOne({_id: videoID});
        await Course.findOneAndUpdate({_id: video.course_id}, { $inc: { totalVideos: -1 } });
        await Video.deleteOne({_id: videoID});
        res.json({success: true, msg: "Video deleted successfully"})
    }
})




module.exports = router;

