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
const fetchPerson = require("../middlewares/fetch-person");

// My utilities
const statusText = require("../utilities/status-text.js");
const { removeListener } = require("../models/User");

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

  console.log(req.body);

  const userId = req.body.userId;
  const enteredPassword = req.body.password;
  try {
    // match creds
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(400).json({ error: statusText.INVALID_CREDS });
    }

    const hashedPassword = user.password;

    const passwordCompare = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!passwordCompare) {
      return res.status(400).json({ error: statusText.INVALID_CREDS });
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

router.post("/update-user", fetchPerson, async (req, res) => {
  const mongoId = req.mongoId;

  // todo: validation
  const regForm = req.body;
  try {
    await User.findByIdAndUpdate(mongoId, regForm, { overwrite: false });
    res.status(200).json({ statusText: statusText.REGISTERED_SUCCESS });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

router.post("/reset-password", fetchPerson, async (req, res) => {
  // user is already logged in, so we dont need userId

  console.log(req.body);
  const { newPassword, currPassword } = req.body;
  const mongoId = req.mongoId;

  try {
    const user = await User.findById(mongoId);

    const hashedPassword = user.password;
    const passwordCompare = await bcrypt.compare(currPassword, hashedPassword);

    if (!passwordCompare) {
      return res.status(400).json({ error: statusText.INVALID_CREDS });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(
      req.mongoId,
      { password: newHashedPassword },
      { overwrite: false }
    );

    res.status(200).json({ error: statusText.PASS_RESET_SUCCESS });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/verify-token", fetchPerson, async (req, res) => {
  try {
    const user = await User.findById(req.mongoId);
    return res
      .status(200)
      .json({ userDoc: user, statusText: statusText.VERIFIED_TOKEN });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

/////////////////////////////////////// All ///////////////////////////////////////////////

router.get("/verticals/all", fetchPerson, async (req, res) => {
  // todo: verify role, reason: a student can paste the url on browser and potray himself as an admin
  // same route for both admin and user

  if (req.role != "user") {
    return res.status(400).json({ error: statusText.INVALID_TOKEN });
  }

  try {
    const allVerticals = await Vertical.find();
    console.log(allVerticals);
    res
      .status(200)
      .json({ statusText: statusText.SUCCESS, allVerticals: allVerticals });
  } catch (error) {
    console.log(error);
    res.status(400).json({ statusText: statusText.FAIL });
  }
});

router.get(
  "/verticals/:verticalId/courses/all",
  fetchPerson,
  async (req, res) => {
    if (req.role != "user") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

    const { verticalId } = req.params;

    try {
      const vertical = await Vertical.findById(verticalId);
      // console.log(vertical);

      const allCourses = await Course.find({
        _id: { $in: vertical.courseIds },
      });
      // console.log(allCourses.length);

      res
        .status(200)
        .json({ statusText: statusText.SUCCESS, allCourses: allCourses });
    } catch (error) {
      // console.log(error);
      res.status(400).json({ statusText: statusText.FAIL });
    }
  }
);

router.get(
  "/verticals/:verticalId/courses/:courseId/units/all",
  fetchPerson,
  async (req, res) => {
    // todo : validation
    console.log("skdfn");

    if (req.role != "user") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

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

module.exports = router;
