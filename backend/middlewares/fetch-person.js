var jwt = require("jsonwebtoken");
const statusText = require("../utilities/status-text.js");
// const JWT_SECRET = "Harryisagoodb$oy";

const fetchPerson = (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res.status(400).send({ error: statusText.TOKEN_NOT_FOUND });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    req.mongoId = data.person.mongoId;
    req.role = data.person.role;
    next();
  } catch (error) {
    console.log("hereeee", error);
    res.status(400).send({ error: statusText.INVALID_TOKEN });
  }
};

module.exports = fetchPerson;
