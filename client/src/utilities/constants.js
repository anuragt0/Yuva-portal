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
  IMAGE_SIZE_LIMIT_IN_BYTES: 1000 * 1000, // 1MB = 10^3KB = 10^6 Bytes
  IMAGE_MIME_TYPES_WHITE_LIST: ["image/jpeg", "image/png"],
};

export { SERVER_ORIGIN, vars };

/*
Reference:
Mime types: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types

*/
