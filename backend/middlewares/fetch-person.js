var jwt = require("jsonwebtoken");
const statusText = require("../utilities/status-text.js");
// const JWT_SECRET = "Harryisagoodb$oy";

// My models
const User = require("../models/User");

////////////////////////////////////////////////////////////////////////////////////////

const fetchPerson = (req, res, next) => {
  const token = req.header("auth-token");
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .send({ statusText: statusText.TOKEN_NOT_FOUND, isLoggedIn: false });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.mongoId = data.person.mongoId;
    req.role = data.person.role;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ statusText: statusText.INVALID_TOKEN, isLoggedIn: false });
  }
};

const isUser = (req, res, next) => {
  // console.log(req.role);
  if (req.role !== "user") {
    return res
      .status(401)
      .send({ statusText: statusText.INVALID_TOKEN, isUser: false });
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(401)
      .send({ statusText: statusText.INVALID_TOKEN, isAdmin: false });
  }

  next();
};

const arePrereqSatisfied = async (req, res, next) => {
  const userDoc = await User.findById(req.mongoId);
  // console.log(userDoc);

  if (!userDoc.isPassReset || !userDoc.isRegistered) {
    return res
      .status(403)
      .json({ statusText: statusText.PREREQ_NOT_SATISFIED, userDoc: userDoc });
  }

  req.userDoc = userDoc;

  next();
};

module.exports = { fetchPerson, isUser, isAdmin, arePrereqSatisfied };
