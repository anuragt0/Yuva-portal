const express = require("express");
const fetchPerson = require("../middlewares/fetch-person");
const router = express.Router();

// My models
const Vertical = require("../models/Vertical");
const Course = require("../models/Course");
const statusText = require("../utilities/status-text.js");

router.get("/verticals/all", fetchPerson, async (req, res) => {
  // todo: verify role, reason: a student can paste the url on browser and potray himself as an admin
  // same route for both admin and user

  try {
    const allVerticals = await Vertical.find();
    console.log(allVerticals);
    res
      .status(200)
      .json({ statusText: statusText.SUCCESS, allVerticals: allVerticals });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ statusText: statusText.FAIL });
  }
});

router.get("/verticals/:verticalId/courses/all", async (req, res) => {
  const { verticalId } = req.params;

  try {
    const vertical = await Vertical.findById(verticalId);
    // console.log(vertical);

    const allCourses = await Course.find({ _id: { $in: vertical.courseIds } });
    // console.log(allCourses);

    res
      .status(200)
      .json({ statusText: statusText.SUCCESS, allCourses: allCourses });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ statusText: statusText.FAIL });
  }
});

module.exports = router;
