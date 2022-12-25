const express = require("express");
const router = express.Router();
require("dotenv").config();

// My models
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// My middlewares
const fetchUser = require("../middlewares/fetch-user");

// My utilities
const statusText = require("../utilities/status-text.js");

///////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/login", async (req, res) => {
  // todo : validation

  console.log(req.body);

  const adminId = req.body.adminId;
  const enteredPassword = req.body.password;
  try {
    // match creds
    const admin = await Admin.findOne({ adminId: adminId });
    if (!admin) {
      return res.status(400).json({ error: statusText.INVALID_CREDS });
    }

    const hashedPassword = admin.password;

    const passwordCompare = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!passwordCompare) {
      return res.status(400).json({ error: statusText.INVALID_CREDS });
    }

    // generate token
    const data = {
      admin: {
        mongoId: user._id,
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
