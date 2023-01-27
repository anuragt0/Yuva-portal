var jwt = require("jsonwebtoken");
const statusText = require("../utilities/status_text.js");
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

    // console.log(req.role);
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

// ! check whether the user is eligible to take quiz, this is imp in cases when user directly copy pastes the url of the quiz page and tries to submit it
const isEligibleToTakeQuiz = async (req, res, next) => {
  const { unitId } = req.params;
  const userDoc = await User.findById(req.mongoId);

  const unitKey = `unit${unitId}`;
  const MIN_WATCH_TIME_IN_PERCENT = 2;

  if (
    userDoc.activity === undefined ||
    userDoc.activity[unitKey] === undefined ||
    userDoc.activity[unitKey].video.watchTimeInPercent <
      MIN_WATCH_TIME_IN_PERCENT
  ) {
    return res.status(403).json({
      statusText: statusText.NOT_ELIGIBLE_TO_TAKE_QUIZ,
      isEligibleToTakeQuiz: false,
    });
  }

  next();
};

module.exports = {
  fetchPerson,
  isUser,
  isAdmin,
  arePrereqSatisfied,
  isEligibleToTakeQuiz,
};
