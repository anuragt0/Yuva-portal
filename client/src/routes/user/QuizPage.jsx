import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// My components
import SecCard from "../../components/user/SecCard";
import Loader from "../../components/common/Loader";
import Party from "../../components/user/Party";

// My css
import "../../css/user/u-quiz-page.css";

import { SERVER_ORIGIN, vars } from "../../utilities/constants";
import {
  roundOffDecimalPlaces,
  refreshScreen,
} from "../../utilities/helper_functions";

// todo: a user must not be able to leave any question unanswered in the quiz

const UserQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [storedQuizScore, setStoredQuizScore] = useState(-1);
  const [isEligibleToTakeQuiz, setIsEligibleToTakeQuiz] = useState(false);

  const [response, setResponse] = useState([]);
  const [currQuizScore, setCurrQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizScore, setShowQuizScore] = useState(false);
  const [hasPassedQuiz, setHasPassedQuiz] = useState(false);
  const [hasPassedQuizFirstTime, setHasPassedQuizFirstTime] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const TEST_DURATION_IN_MINUTES = 10;

  //FOR COUNTDOWN COMPONENT
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      document.getElementById("quiz-submit-btn").click(); // auto submit
      // ! error here, see console
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    async function getQuiz() {
      setIsLoading(true);

      const { verticalId, courseId, unitId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const result = await response.json();
        // console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if (!("isLoggedIn" in result) || !result.isLoggedIn) {
              console.log("go to login");
            }
          } else if (response.status === 403) {
            if (!result.isEligibleToTakeQuiz) {
              setIsEligibleToTakeQuiz(false);
            } else if (!result.userDoc.isPassReset) {
              toast.error("go to reset password");
            } else if (!result.userDoc.isRegistered) {
              toast.error("go to registration page");
            }
            // isPassReset and isRegistered 'if' statement wont ever hit because isEligibleToTakeQuiz is true only if video watch time is greater than a certain minimum and a user can watch vdo only if isPrerequisitesSatisfied
          } else {
            toast.error("Internal server error");
          }
        } else if (response.ok && response.status === 200) {
          setQuiz(result.quiz);
          setStoredQuizScore(result.quizScoreInPercent);
          setIsEligibleToTakeQuiz(result.isEligibleToTakeQuiz);

          // console.log(result.quiz);

          let initialResponse = [];
          for (var counter = 0; counter < result.quiz.length; counter++) {
            initialResponse.push([false, false, false, false]);
          }

          setResponse(initialResponse);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    }

    getQuiz();
  }, []);

  async function handleSubmitQuiz() {
    // calculating the result
    let correctRespCnt = 0; // count of correct responses
    // console.log(response);

    for (let quizItemIdx = 0; quizItemIdx < quiz.length; quizItemIdx++) {
      let isRespCorrect = true;
      /* if default value of isRespCorrect is true, then this handles all the cases including the edge case when the user doesnot enter
      any response for a question, then it would be correct only if all the options of that question are false */
      // quiz[quizIdx].options.length
      for (let optIdx = 0; optIdx < 4; optIdx++) {
        isRespCorrect =
          isRespCorrect &&
          quiz[quizItemIdx].options[optIdx].isChecked ===
            response[quizItemIdx][optIdx];
      }

      if (isRespCorrect) {
        correctRespCnt++;
      }
    }

    // console.log(correctRespCnt);

    let calculatedCurrQuizScore = (correctRespCnt * 100) / quiz.length;

    calculatedCurrQuizScore = roundOffDecimalPlaces(calculatedCurrQuizScore, 2); // round off to two decimal places
    console.log(calculatedCurrQuizScore);

    // submitting result to server
    setIsLoading(true);

    const { verticalId, courseId, unitId } = params;

    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ quizScoreInPercent: calculatedCurrQuizScore }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 401) {
          if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
            console.log("go to login");
          }
        } else {
          console.log("Internal server error"); // todo: toast notify, dont redirect, allow user to re-press submit button
        }
      } else if (response.ok && response.status === 200) {
        setCurrQuizScore(calculatedCurrQuizScore);
        setHasPassedQuiz(result.hasPassedQuiz);
        setHasPassedQuizFirstTime(result.hasPassedQuizFirstTime);
        setShowQuiz(false);
        setShowQuizScore(true);
      } else {
        // for future
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }

  function handleResponseChange(e, quizItemIdx, optIdx) {
    setResponse((prevResponse) => {
      let newResponse = prevResponse;
      const isChecked = e.target.checked;
      newResponse[quizItemIdx][optIdx] = isChecked;
      // console.log(newResponse);
      console.log(isChecked, quizItemIdx, optIdx);

      return newResponse;
    });
  }

  function handleStartQuizClick() {
    setShowQuiz(true);
  }

  const resultElement = (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <SecCard>
        <h1 className="u-quiz-page-result-text">
          Your score: {currQuizScore}%
        </h1>
        <h5 className="u-quiz-page-result-text">
          {hasPassedQuiz
            ? hasPassedQuizFirstTime
              ? "Congratulations! your certificate has been unlocked"
              : "Certificate has already been unlocked"
            : `Note: You need to score atleast 65% to pass the test`}
        </h5>

        <button
          className="u-quiz-page-btn btn btn-primary"
          onClick={refreshScreen}
        >
          Retake Quiz
        </button>
      </SecCard>

      {hasPassedQuizFirstTime ? <Party /> : null}
    </div>
  );

  const instructionsElement = (
    <div className="u-quiz-page-inst-outer-div">
      <SecCard>
        <div>
          <p className="u-quiz-page-inst-time-text">
            Total duration: {TEST_DURATION_IN_MINUTES} minutes
          </p>

          <h2 className="u-quiz-page-sec-heading">Instructions</h2>

          <ul className="u-quiz-page-inst-list-text">
            {vars.quizInstructions.map((instruction) => {
              return <li>{instruction}</li>;
            })}
          </ul>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="u-quiz-page-inst-start-btn btn btn-primary"
            onClick={handleStartQuizClick}
            disabled={!isEligibleToTakeQuiz ? true : false}
          >
            {isEligibleToTakeQuiz ? "Start Quiz" : "Quiz Locked"}
          </button>

          <p className="u-quiz-page-inst-score-text">
            {storedQuizScore === -1
              ? "You never took this quiz before"
              : `Your latest quiz score is ${storedQuizScore}%`}
          </p>
        </div>
      </SecCard>
    </div>
  );

  const quizElement = (
    <div className="u-quiz-page-quiz-outer-div">
      {quiz.length === 0 ? (
        <p>There are currently no questions in this quiz.</p>
      ) : (
        <>
          <div className="u-quiz-page-timer-div">
            <SecCard>
              <h4>
                All the best! Quiz has been started. Tick the correct answers
                before the timer runs out.
              </h4>
              <div style={{ textAlign: "right", fontSize: "2.4rem" }}>
                <i className="fa-regular fa-clock"></i>
                {/* 10 minute = 10000*6*10 miliseconds */}{" "}
                <Countdown
                  date={Date.now() + 10000 * 6 * 10}
                  renderer={renderer}
                />
              </div>
            </SecCard>
          </div>

          <div className="u-quiz-page-quiz-div">
            <SecCard>
              {quiz.map((quizItem, quizItemIdx) => {
                return (
                  <div key={quizItemIdx} style={{ margin: "10px" }}>
                    <p>
                      {quizItemIdx + 1}. {quizItem.question}
                    </p>

                    {quizItem.options.map((option, optIdx) => {
                      return (
                        <div
                          key={quizItemIdx * 11 + optIdx + 1}
                          // style={{ display: "block" }}
                        >
                          <input
                            className="form-check-input mx-3"
                            type="checkbox"
                            id={quizItemIdx * 11 + optIdx + 1}
                            // defaultChecked={response[quizItemIdx][optIdx]}
                            // checked={response[quizItemIdx][optIdx]}
                            value={response[quizItemIdx][optIdx]}
                            // checked={true}
                            onChange={(e) => {
                              handleResponseChange(e, quizItemIdx, optIdx);
                            }}
                          />
                          <label>{option.text}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div style={{ textAlign: "center" }}>
                <button
                  id="quiz-submit-btn"
                  className="u-quiz-page-submit-btn btn btn-primary"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              </div>
            </SecCard>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : showQuiz ? (
        quizElement
      ) : showQuizScore ? (
        resultElement
      ) : (
        instructionsElement
      )}
    </>
  );
};

export default UserQuiz;
