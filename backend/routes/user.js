const express = require("express");
const router = express.Router();
require("dotenv").config();

// My models
const User = require("../models/User");
const Vertical = require("../models/Vertical");
const Course = require("../models/Course");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// My middlewares
const {
  fetchPerson,
  isUser,
  isAdmin,
  arePrereqSatisfied,
  isEligibleToTakeQuiz,
} = require("../middlewares/fetch-person");

// My utilities
const statusText = require("../utilities/status_text.js");
const vars = require("../utilities/constants.js");

// ! Dont bind data to req, bind them to res, change this at all routes and middlewares reference: https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
// todo: only send statusText and not error field in response

/////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/dummy", async (req, res) => {
  console.log(req);
  console.log("skfjnksnsf");
  try {
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = newHashedPassword;

    await User.create(req.body);
    res.status(200).json({ statusText: statusText.LOGIN_IN_SUCCESS });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

///////////////////////////////////////////// Auth //////////////////////////////////////////////////////

router.post("/login", async (req, res) => {
  // todo : validation
  // console.log(req.originalUrl);
  // console.log(req.body);

  const userId = req.body.userId;
  const enteredPassword = req.body.password;
  try {
    // match creds
    const user = await User.findOne({ userId: userId });

    if (!user) {
      // wrong userId
      return res
        .status(401)
        .json({ statusText: statusText.INVALID_CREDS, areCredsInvalid: true });
    }

    const hashedPassword = user.password;

    const passwordCompare = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!passwordCompare) {
      // wrong password
      return res
        .status(401)
        .json({ statusText: statusText.INVALID_CREDS, areCredsInvalid: true });
    }

    // generate token
    const data = {
      person: {
        mongoId: user._id,
        role: "user",
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    res
      .status(200)
      .json({ statusText: statusText.LOGIN_IN_SUCCESS, token: token });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ statusText: statusText.INTERNAL_SERVER_ERROR });
  }
});

router.post("/register", fetchPerson, isUser, async (req, res) => {
  const mongoId = req.mongoId;

  // todo: validation
  const regForm = req.body;

  try {
    const userDoc = await User.findById(mongoId);

    // ! you can also make a check for isPassReset here, but some checking is already being done at other places, to prevent someone to register before pass reset

    if (userDoc.isRegistered) {
      return res.status(403).json({
        statusText: statusText.REGISTERED_ALREADY,
        isRegistered: true,
      });
    }

    await User.findByIdAndUpdate(
      mongoId,
      { ...regForm, isRegistered: true },
      { overwrite: false }
    );
    res.status(200).json({ statusText: statusText.REGISTRATION_SUCCESS });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

router.post("/reset-password", fetchPerson, isUser, async (req, res) => {
  // user is already logged in, so we dont need userId
  // console.log(req.originalUrl);

  const { currPassword, newPassword } = req.body;
  const mongoId = req.mongoId;

  try {
    const userDoc = await User.findById(mongoId);

    if (userDoc.isPassReset) {
      return res
        .status(403)
        .json({ statusText: statusText.PASS_RESET_ALREADY, isPassReset: true });
    }

    const hashedPassword = userDoc.password;
    const passwordCompare = await bcrypt.compare(currPassword, hashedPassword);

    if (!passwordCompare) {
      return res.status(401).json({
        statusText: statusText.CURRENT_PASS_INCORRECT,
        isCurrPasswordIncorrect: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(
      mongoId,
      { password: newHashedPassword, isPassReset: true },
      { overwrite: false }
    );

    res.status(200).json({ statusText: statusText.PASS_RESET_SUCCESS });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ statusText: statusText.INTERNAL_SERVER_ERROR });
  }
});

router.post("/verify-token", fetchPerson, isUser, async (req, res) => {
  // console.log(req.originalUrl);

  try {
    const userDoc = await User.findById(req.mongoId);
    return res
      .status(200)
      .json({ statusText: statusText.VERIFIED_TOKEN, userDoc: userDoc });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ statusText: statusText.INTERNAL_SERVER_ERROR });
  }
});

/////////////////////////////////////// All ///////////////////////////////////////////////

router.get("/verticals/all", async (req, res) => {
  // todo: verify role, reason: a student can paste the url on browser and potray himself as an admin
  // console.log(req.originalUrl);

  try {
    const allVerticals = await Vertical.find();
    // console.log(allVerticals);

    res.status(200).json({
      statusText: statusText.SUCCESS,
      allVerticals: allVerticals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusText: statusText.FAIL });
  }
});

router.get(
  "/verticals/:verticalId/courses/all",
  fetchPerson,
  isUser,
  arePrereqSatisfied,
  async (req, res) => {
    console.log(req.originalUrl);

    const { verticalId } = req.params;

    try {
      const vertical = await Vertical.findById(verticalId);
      // console.log(vertical);

      const allCourses = await Course.find({
        _id: { $in: vertical.courseIds },
      });
      // console.log(allCourses.length);

      res.status(200).json({
        statusText: statusText.SUCCESS,
        allCourses: allCourses,
        userDoc: req.userDoc,
        verticalDoc: { name: vertical.name, desc: vertical.desc },
      });
    } catch (error) {
      // console.log(error);
      res.status(400).json({ statusText: statusText.FAIL });
    }
  }
);

router.get(
  "/verticals/:verticalId/courses/:courseId/units/all",
  fetchPerson,
  isUser,
  arePrereqSatisfied,
  async (req, res) => {
    // todo : validation

    const { courseId } = req.params;

    try {
      const courseDoc = await Course.findById(courseId);

      console.log(courseDoc);

      res.status(200).json({
        statusText: statusText.SUCCESS,
        allUnits: courseDoc.unitArr,
        courseDoc: { name: courseDoc.name, desc: courseDoc.desc },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.get(
  "/verticals/:verticalId/courses/:courseId/units/:unitId",
  fetchPerson,
  isUser,
  arePrereqSatisfied,
  async (req, res) => {
    // todo : validation
    // console.log(req.originalUrl);

    const { courseId, unitId } = req.params;
    const mongoId = req.mongoId;

    try {
      // find course and then the required unit from the unitArr of that course
      const courseProj = {
        name: 1,
        unitArr: 1,
      };

      const courseDoc = await Course.findById(courseId, courseProj);

      let unit = null;
      courseDoc.unitArr.forEach((singleUnit) => {
        if (singleUnit._id == unitId) {
          unit = singleUnit;
        }
      });

      const userProj = {
        fName: 1,
        mName: 1,
        lName: 1,
        activity: 1,
      };

      // find user doc and decide whether user is eligible to take quiz or get certificate
      let isEligibleToTakeQuiz = false;

      const userDoc = await User.findById(mongoId, userProj);
      if (
        userDoc.activity &&
        userDoc.activity[`unit${unitId}`] &&
        userDoc.activity[`unit${unitId}`].video.watchTimeInPercent >=
          vars.MIN_WATCH_TIME_IN_PERCENT
      ) {
        isEligibleToTakeQuiz = true;
      }

      let quizPercent = -1;
      if (
        userDoc.activity !== undefined &&
        userDoc.activity[`unit${unitId}`] !== undefined
      ) {
        quizPercent = userDoc.activity[`unit${unitId}`].quizPercent;
      }

      const courseInfo = { name: courseDoc.name, _id: courseDoc._id };

      const userInfo = {
        mongoId: userDoc._id,
        name:
          userDoc.fName +
          " " +
          (!("mName" in userDoc) || userDoc.mName.length === 0
            ? ""
            : userDoc.mName + " ") +
          userDoc.lName,
      };

      res.status(200).json({
        statusText: statusText.SUCCESS,
        courseInfo: courseInfo,
        unit: unit,
        userInfo: userInfo,
        quizPercent: quizPercent,
        isEligibleToTakeQuiz: isEligibleToTakeQuiz,
      });
    } catch (error) {
      res.status(500).json({ statusText: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.get(
  "/verticals/:verticalId/courses/:courseId/units/:unitId/quiz",
  fetchPerson,
  isUser,
  arePrereqSatisfied,
  isEligibleToTakeQuiz,
  async (req, res) => {
    // todo : validation, make a middleware isEligibleToTakeQuiz
    // console.log(req.originalUrl);

    const { courseId, unitId } = req.params;
    const mongoId = req.mongoId;

    try {
      const courseProj = {
        _id: 0,
        unitArr: 1,
      };

      const courseDoc = await Course.findById(courseId, courseProj);
      //   console.log(courseDoc.unitArr.length);

      let unit = null;
      courseDoc.unitArr.forEach((singleUnit) => {
        if (singleUnit._id == unitId) {
          unit = singleUnit;
        }
      });

      let userProj = {
        _id: 0,
        activity: 1,
      };

      const userDoc = await User.findById(mongoId, userProj);

      res.status(200).json({
        error: statusText.SUCCESS,
        quiz: unit.quiz,
        isEligibleToTakeQuiz: true,
        quizPercent: userDoc.activity[`unit${unitId}`].quizPercent,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.post(
  "/verticals/:verticalId/courses/:courseId/units/:unitId/quiz/submit",
  fetchPerson,
  isUser,
  arePrereqSatisfied,
  isEligibleToTakeQuiz,
  async (req, res) => {
    // todo : validation, make a middleware isEligibleToTakeQuiz
    // console.log(req.originalUrl);

    const { courseId, unitId } = req.params;
    const { quizPercent } = req.body;
    const mongoId = req.mongoId;

    try {
      const userDoc = await User.findById(mongoId);

      // use this method only to check a key in an object
      if (userDoc.activity === undefined) {
        userDoc["activity"] = {};
      }

      const unitKey = `unit${unitId}`;
      if (userDoc.activity[unitKey] === undefined) {
        userDoc.activity[unitKey] = {
          video: { watchTimeInPercent: 0 },
          activities: [],
          quizPercent: -1,
        };
      }

      // always update by creating a new doc for activity out of the previous one

      const QUIZ_CUT_OFF_IN_PERCENT = 75; // check cutoff on quiz submit only, the user can always see the quiz page (except watchtime criteria)
      if (userDoc.activity[unitKey].quizPercent < QUIZ_CUT_OFF_IN_PERCENT) {
        userDoc.activity[unitKey].quizPercent = quizPercent;

        const updatedDoc = await User.findByIdAndUpdate(mongoId, userDoc, {
          new: true,
        });
        console.log(updatedDoc);
      } else {
        console.log("No update in Quiz percent, as its already >=75");
      }

      res.status(200).json({ statusText: statusText.SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.post(
  "/verticals/:verticalId/courses/:courseId/units/:unitId/video/update-progress",
  fetchPerson,
  isUser,
  arePrereqSatisfied,
  async (req, res) => {
    const { courseId, unitId } = req.params;
    const { watchTimeInPercent } = req.body;
    const mongoId = req.mongoId;

    try {
      const userDoc = await User.findById(mongoId);

      if (userDoc.activity === undefined) {
        userDoc["activity"] = {};
      }

      const unitKey = `unit${unitId}`;
      if (userDoc.activity[unitKey] === undefined) {
        userDoc.activity[unitKey] = {
          video: { watchTimeInPercent: 0 },
          activities: [],
          quizPercent: -1,
        };
      }

      userDoc.activity[unitKey].video.watchTimeInPercent += watchTimeInPercent;

      const updatedDoc = await User.findByIdAndUpdate(mongoId, userDoc, {
        new: true,
      });
      console.log(updatedDoc);

      res.status(200).json({ statusText: statusText.SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

module.exports = router;
