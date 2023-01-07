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
const statusText = require("../utilities/status-text.js");

// ! Dont bind data to req, bind them to res, change this at all routes and middlewares reference: https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js

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
  console.log(req.originalUrl);

  console.log(req.body);

  const userId = req.body.userId;
  const enteredPassword = req.body.password;
  try {
    // match creds
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ statusText: statusText.INVALID_CREDS });
    }

    const hashedPassword = user.password;

    const passwordCompare = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!passwordCompare) {
      return res.status(401).json({ error: statusText.INVALID_CREDS });
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
    console.error(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

router.post("/register", fetchPerson, isUser, async (req, res) => {
  // console.log(req.originalUrl);
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

      res
        .status(200)
        .json({ statusText: statusText.SUCCESS, allUnits: courseDoc.unitArr });
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
    console.log(req.originalUrl);

    const { courseId, unitId } = req.params;

    try {
      const proj = {
        _id: 0,
        unitArr: 1,
      };

      const courseDoc = await Course.findById(courseId, proj);
      console.log(courseDoc.unitArr.length);

      let unit = null;
      courseDoc.unitArr.forEach((singleUnit) => {
        if (singleUnit._id == unitId) {
          unit = singleUnit;
        }
      });

      res.status(200).json({ error: statusText.SUCCESS, unit: unit });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
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
    console.log(req.originalUrl);

    const { courseId, unitId } = req.params;

    try {
      const proj = {
        _id: 0,
        unitArr: 1,
      };

      const courseDoc = await Course.findById(courseId, proj);
      console.log(courseDoc.unitArr.length);

      let unit = null;
      courseDoc.unitArr.forEach((singleUnit) => {
        if (singleUnit._id == unitId) {
          unit = singleUnit;
        }
      });

      res.status(200).json({ error: statusText.SUCCESS, quiz: unit.quiz });
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
    const { percent } = req.body;

    try {
      const proj = {
        _id: 0,
        activity: 1,
      };

      const userDoc = await User.findById(req.mongoId);

      if (userDoc.activity === undefined) {
        /* Impossible Case: by this point we are sure that userDoc.activity contains the key for this particular unit's activity
      because a user can visit the quiz page only if the watch time of video of that particular unit is high enough */

        console.log("null");
        let newActivityObj = {};
        newActivityObj[`unit${unitId}`] = {
          video: 0,
          activities: [],
          quizPercent: percent,
        };

        userDoc.activity = newActivityObj;
      } else {
        // todo: check whether the quizPercent is already >= 75
        userDoc.activity[`unit${unitId}`].quizPercent = percent;

        console.log("not null");
      }

      userDoc.markModified["activity"];

      //! always use a callback with save method
      userDoc.save((err, savedDoc) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(savedDoc.activity);
        }
      });

      const savedDoc = await User.findById(req.mongoId);
      console.log(savedDoc.activity);

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
    // todo:
    console.log(req.originalUrl);

    const { courseId, unitId } = req.params;
    const { watchTimeInPercent } = req.body;
    console.log(typeof watchTimeInPercent);

    try {
      const proj = {
        _id: 0,
        activities: 1,
      };

      const userDoc = await User.findById(req.mongoId);

      if (userDoc.activity === undefined) {
        /* Impossible Case: by this point we are sure that userDoc.activity contains the key for this particular unit's activity
        because a user can visit the quiz page only if the watch time of video of that particular unit is high enough */

        console.log("null");
        let newActivityObj = {};
        newActivityObj[`unit${unitId}`] = {
          video: {
            watchTimeInPercent: watchTimeInPercent,
          },
          activities: [],
          quizPercent: 0,
        };

        userDoc.activity = newActivityObj;
      } else {
        // todo: check whether the quizPercent is already >= 75
        userDoc.activity[`unit${unitId}`].video.watchTimeInPercent +=
          watchTimeInPercent;

        console.log("not null");
      }

      //! always use a callback with save method
      userDoc.markModified["activity"];
      userDoc.save((err, savedDoc) => {
        if (err) {
          console.log(err);
        } else {
          console.log("kajndkjnad");
          // console.log(savedDoc.activity);
        }
      });

      const savedDoc = await User.findById(req.mongoId);
      console.log(savedDoc.activity);

      res.status(200).json({ statusText: statusText.SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

module.exports = router;
