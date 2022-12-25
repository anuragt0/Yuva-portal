const express = require("express");
const router = express.Router();

// My models
const Course = require("../models/Course");
const statusText = require("../utilities/status-text.js");

router.get("/courses/all", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res
      .status(200)
      .json({ statusText: statusText.SUCCESS, allCourses: allCourses });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ statusText: statusText.FAIL });
  }
});

module.exports = router;
