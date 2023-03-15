const SERVER_ORIGIN = "http://localhost:5000";
// const SERVER_ORIGIN = "https://yuva-backend.onrender.com";

const vars = {
  quizInstructions: [
    "Quiz will contain 10 questions.",
    "The duration of quiz is 5 min.",
    "The type of questions are Multiple Choice Questions(MCQs).",
    "Each question carries equal marks.",
    "There is only 1 possible answer on every question. ",
    "Only those participants will be given certificates who appear and submit the response within stipulated time with the score of above 65%.",
    "If you are not able to pass the quiz watch the content again and retake the quiz.",
  ],

  IMAGE_SIZE_LIMIT_IN_BYTES: 3 * 1000 * 1000, // 1MB = 10^3KB = 10^6 Bytes
  IMAGE_MIME_TYPES_WHITE_LIST: ["image/jpeg", "image/png"],

  regisForm: {
    fName: { minLen: 1, maxLen: 50 },
    mName: { minLen: 0, maxLen: 50 },
    lName: { minLen: 1, maxLen: 50 },
    pass: { minLen: 1, maxLen: 30 },
    cnfrmPass: { minLen: 1, maxLen: 30 },
    collegeName: { minLen: 1, maxLen: 120 },
    region: { minLen: 1, maxLen: 50 },
    branch: { minLen: 1, maxLen: 50 },
    phone: { minLen: 1, maxLen: 12 },
    addLine1: { minLen: 1, maxLen: 120 },
    addLine2: { minLen: 1, maxLen: 120 },
    city: { minLen: 1, maxLen: 50 },
    pincode: { minLen: 1, maxLen: 10 },
    country: { minLen: 1, maxLen: 50 },
    userId: { minLen: 1, maxLen: 30 },
  },
};

export { SERVER_ORIGIN, vars };

/*
Reference:
Mime types: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types

*/
