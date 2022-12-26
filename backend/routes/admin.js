const express = require("express");
const router = express.Router();
require("dotenv").config();

// My models
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// My middlewares
// const fetchPerson = require("../middlewares/fetch-person");

// My utilities
const statusText = require("../utilities/status-text.js");
const fetchPerson = require("../middlewares/fetch-person");
const Vertical = require("../models/Vertical");

///////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/dummy", async (req, res) => {
  console.log(req);

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

router.post("/login", async (req, res) => {
  // todo : validation

  console.log(req.body);

  const adminId = req.body.adminId;
  const enteredPassword = req.body.password;

  console.log(adminId);

  try {
    // match creds
    const adminDoc = await Admin.findOne({ adminId: adminId });
    if (!adminDoc) {
      return res.status(401).json({ error: statusText.INVALID_CREDS });
    }

    const hashedPassword = adminDoc.password;

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
        mongoId: adminDoc._id,
        role: "admin",
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

module.exports = router;
