// const express = require("express");
// const User = require("../models/User");
// const Video = require("../models/Video");
// const Course = require("../models/Course");
// const Quiz = require("../models/Quiz");
// const fetchuser = require('../middleware/fetchuser');
// const { findOne } = require("../models/User");

// const router = express.Router();

// router.get('/getcourses', async (req,res)=>{
//     const allCourses = await Course.find();
//     res.json(allCourses);
// })

// router.post('/getvideos' , async (req,res)=>{
//     // console.log(req.body.courseID);
//     const allVideos = await Video.find({course_id: req.body.courseID});
//     res.json(allVideos);

// })

// //User must be loggedin to play the video
// router.post('/getvideobyid', fetchuser, async(req,res)=>{
//     const userID = req.user.id;
//     // const loggedInUser = await User.findOne({_id: userID});

//     const videoID = req.body.videoID;
//     const video = await Video.findOne({_id: videoID});
//     res.json(video);
// })

// router.post('/auth/uploadcourse', fetchuser, async(req,res)=>{
//     const userID = req.user.id;
//     // console.log(userID);
//     // const name = req.body.name;
//     // const description = req.body.description;
//     // const totalVideos = req.body.totalVideos;

//     const loggedInUser = await User.findOne({_id: userID});

//     if(loggedInUser.role==='user'){
//         res.status(401).send({ error: "Access denied, please login with correct credentials" });
//     }
//     else{
//         // Check whether the course with this name exists already
//         try {
//             let course = await Course.findOne({ name: req.body.name });
//             if (course) {
//                 return res
//                 .status(400)
//                 .json({ error: "Sorry a course with this name already exists" });
//             }
//             const newCourse = await Course.create({
//                 name: req.body.name,
//                 description: req.body.description,
//                 createdBy: loggedInUser.name
//             })
//             res.json(newCourse);
//         } catch (error) {
//             console.log(error);
//         }
//     }

// })

// router.post('/auth/uploadvideo', fetchuser, async (req,res)=>{
//     const userID = req.user.id;
//     const courseID = req.body.courseID;
//     const title = req.body.title;
//     const description = req.body.description;
//     const source = req.body.source;

//     const loggedInUser = await User.findOne({_id: userID});
//     if(loggedInUser.role==='user'){
//         res.status(401).send({ error: "Access denied, please login with correct credentials" });
//     }
//     else{
//         const duplicate = await Video.findOne({course_id: courseID, title: title});
//         const currCourse = await Course.findOne({_id: courseID});
//         let currVideos = currCourse.totalVideos;
//         currVideos++;
//         // console.log(currCourse);
//         if (duplicate) {
//             return res
//             .status(400)
//             .json({ error: "Sorry video with same title is already been uploaded in this course" });
//         }
//         const newVideo = await Video.create({
//             course_id: courseID,
//             title: title,
//             description: description,
//             source: source
//         })
//         // console.log("here: ",courseID);

//         const updatedCourse = await Course.findOneAndUpdate({_id:courseID}, {totalVideos: currVideos}, {new:true});
//         res.json({newVideo, updatedCourse});
//     }
// })

// // router.get('/getquiz', async (req,res)=>{

// // })

// router.post("/increasewatchtime", async(req,res)=>{
//     const userID = req.body.userID;
//     const videoID = req.body.videoID;
//     const incrTime = Number(req.body.time);
//     // const videoLength = Number(req.body.videoLength);

//     // console.log("here: ", incrTime);
//     const user = await User.findById(userID);
//     // console.log(user);
//     let currentWatchStatus = user.watchStatus;

//     if(isNaN(currentWatchStatus[videoID])){
//         currentWatchStatus[videoID] = 0;
//     }
//     currentWatchStatus[videoID]+=incrTime;

//     const newUser = await User.findOneAndUpdate({_id: userID}, {watchStatus: currentWatchStatus}, {new:true})
//     // console.log("Updated user: ", newUser);
//     res.json({"success": true, user: newUser});

// })

// router.post('/getcourse', async(req,res)=>{
//     const courseID = req.body.courseID;
//     const course = await Course.findOne({_id: courseID});
//     res.json(course);
// })

// // admin routes
// router.post('/auth/deletecourse', fetchuser, async (req,res)=>{
//     const userID = req.user.id;
//     const courseID = req.body.courseID;

//     const loggedInUser = await User.findOne({_id: userID});
//     if(loggedInUser.role==='user'){
//         res.status(401).send({ error: "Access denied, please login with correct credentials" });
//     }
//     else{
//         await Video.deleteMany({course_id: courseID});
//         await Course.deleteOne({_id: courseID});
//         res.json({success: true, msg: "Area and its slots area deleted successfully"})
//     }
// })

// router.post('/auth/deletevideo', fetchuser, async(req,res)=>{
//     const userID = req.user.id;
//     const videoID = req.body.videoID;

//     //wrap in try catch

//     const loggedInUser = await User.findOne({_id: userID});
//     if(loggedInUser.role==='user'){
//         res.send(401).send({ error: "Access denied, please login with correct credentials" });
//     }
//     else{
//         const video = await Video.findOne({_id: videoID});
//         await Course.findOneAndUpdate({_id: video.course_id}, { $inc: { totalVideos: -1 } });
//         await Video.deleteOne({_id: videoID});
//         res.json({success: true, msg: "Video deleted successfully"})
//     }
// })

// router.post('/auth/uploadquestion', fetchuser, async (req,res)=>{
//     const userID = req.user.id;
//     const videoID = req.body.videoID;
//     // console.log("here: ", videoID);
//     const question = req.body.question;
//     const option1 = req.body.option1;
//     const option2 = req.body.option2;
//     const option3 = req.body.option3;
//     const option4 = req.body.option4;
//     const correctOption = req.body.correctoption;

//     //wrap in try catch

//     const loggedInUser = await User.findOne({_id: userID});
//     if(loggedInUser.role==='user'){
//         res.send(401).send({ error: "Access denied, please login with correct credentials" });
//     }
//     else{
//         const video = await Video.findOne({_id: videoID});
//         // console.log(video);
//         if(video.quiz===undefined){
//             //Create a new quiz and update this new quiz id to video
//             const questionObj = {question, correctOption};
//             const optionssArr = [];
//             const questionsArr = [questionObj];
//             optionssArr.push(option1);
//             optionssArr.push(option2);
//             optionssArr.push(option3);
//             optionssArr.push(option4);
//             const newQuiz = await Quiz.create({
//                 videoid: videoID,
//                 questions: questionsArr,
//                 options: optionssArr,
//             })
//             const newVideo = await Video.findByIdAndUpdate({_id: videoID}, {quiz: newQuiz._id}, {new: true});
//             res.json({newQuiz, newVideo});
//         }
//         else{
//             //Find the quiz and just update it
//             // console.log("here");
//             const foundQuiz = await Quiz.findOne({videoid: videoID});
//             const questionObj = {question, correctOption};
//             // console.log("foundQuiz: ", foundQuiz);
//             foundQuiz.questions.push(questionObj);
//             foundQuiz.options.push(option1);
//             foundQuiz.options.push(option2);
//             foundQuiz.options.push(option3);
//             foundQuiz.options.push(option4);
//             // console.log("NEW QUIZ: ", foundQuiz);

//             const updatedQuiz = await Quiz.findByIdAndUpdate({_id: foundQuiz._id}, {questions: foundQuiz.questions, options: foundQuiz.options}, {new:true});
//             res.json({success:"true", updatedQuiz});
//         }
//     }
// })

// router.post('/getquiz',fetchuser, async (req,res)=>{
//     const videoid = req.body.videoID;
//     const userID = req.user.id;

//     try {
//         const quiz = await Quiz.findOne({videoid: videoid});
//         res.json(quiz);
//     } catch (error) {
//         console.log("Some error occured: ", error);
//         res.json({success: false});
//     }
// })

// router.post('/getvideobyid', async(req,res)=>{
//     const videoid = req.body.videoID;

//     const video = await Video.findById(videoid);
//     res.json(video);

// })

// module.exports = router;
