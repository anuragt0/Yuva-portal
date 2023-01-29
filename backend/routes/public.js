const express = require("express");
const { fetchPerson } = require("../middlewares/fetch-person");
const router = express.Router();

// My models
const User = require("../models/User");
const Course = require("../models/Course");

const statusText = require("../utilities/status_text.js");
const { vars } = require("../utilities/constants");

const { decodeCertificateId } = require("../utilities/helper_functions");

// ! what if the user's activity field is not present, and we include it in the projection

router.get("/certificate/:certId", async (req, res) => {
  const { certId } = req.params;
  // console.log(certId);
  // console.log(decodeCertificateId(certId));
  const { userMongId, courseId, unitId } = decodeCertificateId(certId);

  try {
    const userProj = {
      fName: 1,
      mName: 1,
      lName: 1,
      activity: 1,
    };

    const userDoc = await User.findById(userMongId, userProj);
    console.log(userDoc);

    if (
      !(
        userDoc &&
        userDoc.activity &&
        userDoc.activity[`unit${unitId}`] &&
        userDoc.activity[`unit${unitId}`].quiz &&
        userDoc.activity[`unit${unitId}`].quiz.scoreInPercent >=
          vars.CERTIFICATE_GENERATION_CUT_OFF_IN_PERCENT
      )
    ) {
      console.log("user doc not found");
      return res.status(404).json({ statusText: statusText.INVALID_CERT_ID });
    }

    const courseProj = {
      name: 1,
      unitArr: 1,
    };

    const courseDoc = await Course.findById(courseId, courseProj);

    if (!courseDoc) {
      console.log("course doc not found");
      return res.status(404).json({ statusText: statusText.INVALID_CERT_ID });
    }

    let unitDoc = null;

    for (let i = 0; i < courseDoc.unitArr.length; i++) {
      const currUnit = courseDoc.unitArr[i];
      if (currUnit._id == unitId) {
        unitDoc = currUnit;
        break;
      }
    }

    if (!unitDoc) {
      console.log("unit doc not found");
      return res.status(404).json({ statusText: statusText.INVALID_CERT_ID });
    }

    const holderName =
      userDoc.fName +
      " " +
      (!("mName" in userDoc) || userDoc.mName.length === 0
        ? ""
        : userDoc.mName + " ") +
      userDoc.lName;

    res.status(200).json({
      statusText: statusText.SUCCESS,
      certInfo: {
        holderName: holderName,
        passingDate: userDoc.activity[`unit${unitId}`].quiz.passingDate,
        courseName: courseDoc.name,
        unitId: unitId,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
