import { jsPDF } from "jspdf";

// My assets
import trophy_logo from "../assets/images/trophy_logo.jpg";
import sign from "../assets/images/all_signs.png";
import all_logo from "../assets/images/all_logo_5.png";

/////////////////////////////////////////////////////////////////////////////////////////////////

function youtubeParser(vdoSrc) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = vdoSrc.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function getVideoThumbnail(vdoSrc) {
  const vdoCode = youtubeParser(vdoSrc);
  const vdoThumbnail = `https://img.youtube.com/vi/${vdoCode}/hqdefault.jpg`;

  return vdoThumbnail;
}

function refreshScreen() {
  window.location.reload();
}

function roundOffDecimalPlaces(num, places) {
  let power = Math.pow(10, places);

  return Math.round(num * power) / power;
}

function downloadCertificateOld() {
  const opt = {
    //   orientation: "landscape",
    unit: "px",
    format: [4, 2],
  };

  const certElement = document.querySelector("#cert");
  const certElementWidth = certElement.offsetWidth;
  const certElementHeight = certElement.offsetHeight;

  // const doc = new jsPDF("l", "px", [404.1, 504]); // h,w (for h<w use landscape)

  const doc = new jsPDF("l", "px", [certElementHeight + 2, certElementWidth]); // h,w (for h<w use landscape)

  doc.html(document.querySelector("#cert"), {
    callback: function (pdf) {
      pdf.save("my.pdf");
    },
  });
}

const downloadCertificate = (certInfo) => {
  // console.log(certInfo);

  const doc = new jsPDF("l", "px", [350, 500]); // h,w (for h<w use landscape)

  var pageHeight =
    doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  let startYMargin = 100; // reference vertical margin

  doc
    // All Yuva logos
    .addImage(all_logo, "PNG", 0, 10, pageWidth, pageWidth / 8)

    // Title: Certificate of Completion
    .setFont("Helvetica", "normal", "normal")
    .setFontSize(30)
    .text("Certificate of completion", pageWidth / 2, startYMargin, {
      align: "center",
    })

    // Holder name
    .setFont("Times", "italic", "bold")
    .setFontSize(40)
    .text(certInfo.holderName, pageWidth / 2, (startYMargin += 40), {
      align: "center",
    })

    // Achievement description
    .setFont("Helvetica", "normal", "normal")
    .setFontSize(13)
    .text(
      `has successfully completed the course on ${certInfo.courseName} (Id: ${certInfo.unitId})`,
      pageWidth / 2,
      (startYMargin += 25),
      {
        align: "center",
      }
    )

    // Achievement date
    .text(`on ${certInfo.passingDate}`, pageWidth / 2, (startYMargin += 15), {
      align: "center",
    })

    // Trophy logo
    .addImage(trophy_logo, "JPG", 215, (startYMargin += 20), 70, 70)

    // All officials' signs
    .addImage(sign, "PNG", 0, (startYMargin += 70), pageWidth, pageWidth / 8)

    // Download
    .save(certInfo.fileName);
};

const convertBytesToMegaBytes = (bytes) => {
  return bytes / 1000000;
};

/////////////////////////////////////////// Registration Form Validation ///////////////////////////////////////////////////

const isRegisEmailValid = (email) => {
  if (email === "") {
    return false;
  }
  return true;
};

const isRegisPassValid = (pass) => {
  if (pass === "") {
    return false;
  }
  return true;
};

const isRegisCnfrmPassValid = (pass, cnfrmPass) => {
  if (cnfrmPass === "") {
    return false;
  } else if (cnfrmPass !== pass) {
    return false;
  }
  return true;
};

const isRegisFNameValid = (fName) => {
  if (fName === "") {
    return false;
  }
  return true;
};

const isRegisMNameValid = (mName) => {
  if (mName === "") {
    return false;
  }
  return true;
};

const isRegisLNameValid = (lName) => {
  if (lName === "") {
    return false;
  }
  return true;
};

const isRegisCollegeNameValid = (collegeName) => {
  if (collegeName === "") {
    return false;
  }
  return true;
};
const isRegisRegionValid = (region) => {
  if (region === "") {
    return false;
  }
  return true;
};

const isRegisBranchValid = (branch) => {
  if (branch === "") {
    return false;
  }
  return true;
};

const isRegisPhoneValid = (phone) => {
  if (phone === "") {
    return false;
  }
  return true;
};

const isRegisAddLine1Valid = (addLine1) => {
  if (addLine1 === "") {
    return false;
  }
  return true;
};

const isRegisAddLine2Valid = (addLine2) => {
  if (addLine2 === "") {
    return false;
  }
  return true;
};

const isRegisCityValid = (city) => {
  if (city === "") {
    return false;
  }
  return true;
};

const isRegisPincodeValid = (pincode) => {
  if (pincode === "") {
    return false;
  }
  return true;
};
const isRegisCountryValid = (country) => {
  if (country === "") {
    return false;
  }
  return true;
};

const isRegisFieldValid = (regisDetails, fieldName, fieldValue) => {
  switch (fieldName) {
    case "email":
      return isRegisEmailValid(fieldValue);
    case "pass":
      return isRegisPassValid(fieldValue);
    case "cnfrmPass":
      return isRegisCnfrmPassValid(regisDetails["pass"], fieldValue);
    case "fName":
      return isRegisFNameValid(fieldValue);
    case "mName":
      return isRegisMNameValid(fieldValue);
    case "lName":
      return isRegisLNameValid(fieldValue);
    case "collegeName":
      return isRegisCollegeNameValid(fieldValue);
    case "region":
      return isRegisRegionValid(fieldValue);
    case "branch":
      return isRegisBranchValid(fieldValue);
    case "phone":
      return isRegisPhoneValid(fieldValue);
    case "addLine1":
      return isRegisAddLine1Valid(fieldValue);
    case "addLine2":
      return isRegisAddLine2Valid(fieldValue);
    case "city":
      return isRegisCityValid(fieldValue);
    case "pincode":
      return isRegisPincodeValid(fieldValue);
    case "country":
      return isRegisCountryValid(fieldValue);
    default:
      return false;
  }
};

const validateRegisForm = (regisDetails) => {
  return { isValid: true, desc: "All good" };
};

export {
  youtubeParser,
  refreshScreen,
  getVideoThumbnail,
  roundOffDecimalPlaces,
  downloadCertificate,
  convertBytesToMegaBytes,
  validateRegisForm,
};
