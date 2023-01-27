const express = require("express");
const router = express.Router();
require("dotenv").config();

const { parse } = require("csv-parse");

// My models
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// My middlewares

// My utilities
const statusText = require("../utilities/status_text.js");
const { fetchPerson, isAdmin } = require("../middlewares/fetch-person");
const Vertical = require("../models/Vertical");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

///////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/dummy", async (req, res) => {
  //   console.log(req);

  try {
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = newHashedPassword;

    await Admin.create(req.body);
    res.status(200).json({ statusText: statusText.LOGIN_IN_SUCCESS });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

//////////////////////////////////////// LOGIN ////////////////////////////////////////////////

router.post("/login", async (req, res) => {
  // todo : validation

  const adminId = req.body.adminId;
  const enteredPassword = req.body.password;

  try {
    // match creds
    const adminDoc = await Admin.findOne({ adminId: adminId });
    if (!adminDoc) {
      // wrong adminId
      return res
        .status(401)
        .json({ statusText: statusText.INVALID_CREDS, areCredsInvalid: true });
    }

    const hashedPassword = adminDoc.password;

    const passwordCompare = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!passwordCompare) {
      // wrong password
      return res
        .status(400)
        .json({ statusText: statusText.INVALID_CREDS, areCredsInvalid: true });
    }
    console.log(adminDoc);

    // generate token
    const data = {
      person: {
        mongoId: adminDoc._id,
        role: "admin",
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    res
      .status(200)
      .json({ statusText: statusText.LOGIN_IN_SUCCESS, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusText: statusText.INTERNAL_SERVER_ERROR });
  }
});

/////////////////////////////////////////// All //////////////////////////////////////////

router.get("/verticals/all", fetchPerson, isAdmin, async (req, res) => {
  // console.log(req.originalUrl);

  try {
    const allVerticals = await Vertical.find();
    // console.log(allVerticals);

    res
      .status(200)
      .json({ statusText: statusText.SUCCESS, allVerticals: allVerticals });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ statusText: statusText.FAIL });
  }
});

router.get(
  "/verticals/:verticalId/courses/all",
  fetchPerson,
  isAdmin,
  async (req, res) => {
    console.log(req.originalUrl);
    const { verticalId } = req.params;

    try {
      const vertical = await Vertical.findById(verticalId);
      // console.log(vertical);

      const allCourses = await Course.find({
        _id: { $in: vertical.courseIds },
      });
      // console.log(allCourses);

      res
        .status(200)
        .json({ statusText: statusText.SUCCESS, allCourses: allCourses });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ statusText: statusText.FAIL });
    }
  }
);

router.get(
  "/verticals/:verticalId/courses/:courseId/units/all",
  fetchPerson,
  isAdmin,
  async (req, res) => {
    // todo : validation
    // console.log(req.originalUrl);

    const { courseId } = req.params;

    try {
      const courseDoc = await Course.findById(courseId);

      // console.log(courseDoc);

      res
        .status(200)
        .json({ statusText: statusText.SUCCESS, allUnits: courseDoc.unitArr });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ statusText: statusText.FAIL });
    }
  }
);

/////////////////////////////////////////// ADD ///////////////////////////////////////////

router.post("/verticals/add", fetchPerson, async (req, res) => {
  // todo : validation

  console.log(req.body);

  if (req.role != "admin") {
    return res.status(400).json({ error: statusText.INVALID_TOKEN });
  }

  // const { name, desc, imgSrc } = req.body;

  try {
    await Vertical.create(req.body);
    res.status(200).json({ statusText: statusText.VERTICAL_CREATE_SUCCESS });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
  }
});

router.post(
  "/verticals/:verticalId/courses/add",
  fetchPerson,
  async (req, res) => {
    if (req.role != "admin") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

    // todo : validation
    const { name, desc } = req.body;
    const { verticalId } = req.params;

    try {
      const courseDoc = await Course.create(req.body);
      // console.log(courseDoc);

      const verticalDoc = await Vertical.findOneAndUpdate(
        { _id: verticalId },
        { $push: { courseIds: courseDoc._id } },
        { new: true }
      );

      // console.log(verticalDoc); // new = true to return the updated doc

      res.status(200).json({ statusText: statusText.COURSE_CREATE_SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.post(
  "/verticals/:verticalId/courses/:courseId/units/add",
  fetchPerson,
  async (req, res) => {
    if (req.role != "admin") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

    // todo : validation
    const unit = req.body;
    const { courseId } = req.params;

    try {
      const courseDoc = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { unitArr: unit } },
        { new: true }
      );

      // console.log(courseDoc); // new = true to return the updated doc

      res.status(200).json({ statusText: statusText.UNIT_ADD_SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

//////////////////////////////////////// DELETE //////////////////////////////////////////

router.delete(
  "/verticals/:verticalId/delete",
  fetchPerson,
  async (req, res) => {
    if (req.role != "admin") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

    // todo : validation
    const { verticalId } = req.params;

    try {
      const verticalDoc = await Vertical.findByIdAndDelete(verticalId); // returns the doc just before deletion
      // console.log(verticalDoc);

      await Course.deleteMany({
        _id: { $in: verticalDoc.courseIds },
      });

      res.status(200).json({ statusText: statusText.VERTICAL_DELETE_SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.delete(
  "/verticals/:verticalId/courses/:courseId/delete",
  fetchPerson,
  async (req, res) => {
    if (req.role != "admin") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

    // todo : validation
    const { verticalId, courseId } = req.params;
    console.log(courseId);
    const objectCourseId = mongoose.Types.ObjectId(courseId); // imp to convert to string to objectId
    console.log(objectCourseId);

    try {
      const courseDoc = await Course.findByIdAndDelete(courseId);
      // console.log(courseDoc);

      const verticalDoc = await Vertical.updateOne(
        { _id: verticalId },
        {
          $pull: {
            courseIds: { $in: [objectCourseId] },
          },
        }
      );

      console.log(verticalDoc);

      res.status(200).json({ statusText: statusText.COURSE_DELETE_SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.delete(
  "/verticals/:verticalId/courses/:courseId/units/:unitId/delete",
  fetchPerson,
  async (req, res) => {
    if (req.role != "admin") {
      return res.status(400).json({ error: statusText.INVALID_TOKEN });
    }

    // todo : validation
    const { verticalId, courseId, unitId } = req.params;
    const objectUnitId = mongoose.Types.ObjectId(unitId);

    try {
      const courseDoc = await Course.updateOne(
        { _id: courseId },
        {
          $pull: {
            unitArr: { _id: objectUnitId },
          },
        }
      );

      console.log(courseDoc);

      res.status(200).json({ statusText: statusText.UNIT_DELETE_SUCCESS });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: statusText.INTERNAL_SERVER_ERROR });
    }
  }
);

router.post("/add-users", async (req, res) => {
  const input = req.files.test.data;
  const options = {};

  parse(input, options, (err, records) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(records);
      // todo: check unique creds
    }
  });

  res.status(200).json({ statusText: statusText.SUCCESS });
});

module.exports = router;
