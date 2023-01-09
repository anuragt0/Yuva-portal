import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Countdown from 'react-countdown';

import { SERVER_ORIGIN } from "../../utilities/constants";
import {
  roundOffDecimalPlaces,
  refreshScreen,
} from "../../utilities/helper_functions";

// todo: a user must not be able to leave any question unanswered in the quiz

const UserQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [storedResult, setStoredResult] = useState(-1);

  const [response, setResponse] = useState([]);
  const [result, setResult] = useState(0);
  const [isEligibleToTakeQuiz, setIsEligibleToTakeQuiz] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  // no need for loader, as instruction element is instantly visible on page visit

  const navigate = useNavigate();
  const params = useParams();
  const TEST_DURATION_IN_MINUTES = 10;

  //FOR COUNTDOWN COMPONENT
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      document.getElementById("quizSubmitButton").click();
    } else {
      // Render a countdown
      return <span>{minutes}:{seconds}</span>;
    }
  };

  useEffect(() => {
    async function getQuiz() {
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
        console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
              console.log("go to login");
            }
          } else if (response.status === 403) {
            if (result.isEligibleToTakeQuiz === false) {
              // console.log("flase");
              setIsEligibleToTakeQuiz(false);
            } else if (result.userDoc.isPassReset === false) {
              console.log("go to reset password");
            } else if (result.userDoc.isRegistered === false) {
              console.log("go to registration page");
            }
            // isPassReset and isRegistered 'if' statement wont ever hit because isEligibleToTakeQuiz is true only if video watch time is greater than a certain minimum and a user can watch vdo only if isPrerequisitesSatisfied
          } else {
            alert("Internal server error"); // todo: toast notify
          }
        } else if (response.ok && response.status === 200) {
          setQuiz(result.quiz);
          setStoredResult(result.quizPercent);
          setIsEligibleToTakeQuiz(true);

          // console.log(result.quiz);

          let initialResponse = [];
          for (var counter = 0; counter < result.quiz.length; counter++) {
            initialResponse.push({
              isOption1Checked: false,
              isOption2Checked: false,
              isOption3Checked: false,
              isOption4Checked: false,
            });
          }

          setResponse(initialResponse);
        } else {
          // for future
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getQuiz();
  }, []);

  async function handleSubmitQuiz() {
    // calculating the result
    let correctRespCnt = 0; // count of correct responses

    for (let quizIndex = 0; quizIndex < quiz.length; quizIndex++) {
      let isRespCorrect = true;
      /* if default value is true, then this handles all the cases including the edge case when the user doesnot enter
      any response for a question, then it would be correct only if all the options of that question are false */

      for (let optIndex = 0; optIndex < 4; optIndex++) {
        isRespCorrect =
          isRespCorrect &&
          quiz[quizIndex][`isOption${optIndex + 1}Checked`] ===
            response[quizIndex][`isOption${optIndex + 1}Checked`];
      }

      correctRespCnt += isRespCorrect;
    }

    let quizPercent = (correctRespCnt * 100) / quiz.length;

    quizPercent = roundOffDecimalPlaces(quizPercent, 2); // round off to two decimal places
    console.log(quizPercent);

    setResult(quizPercent);
    setShowQuiz(false);
    setShowResult(true);

    // submitting result to server
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
          body: JSON.stringify({ quizPercent: quizPercent }),
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
        console.log("go to unit page");
        const { verticalId, courseId, unitId } = params;

        // navigate(
        //   `/user/verticals/${verticalId}/courses/${courseId}/units/${unitId}`
        // );
      } else {
        // for future
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleResponseChange(isChecked, quizIndex, optIndex) {
    setResponse((prevResponse) => {
      let newResponse = prevResponse;
      newResponse[quizIndex][`isOption${optIndex + 1}Checked`] = isChecked;
      // console.log(newResponse);

      return newResponse;
    });
  }

  function handleStartQuizClick() {
    setShowQuiz(true);
  }

  const resultElement = (
    <>
    <div style={{textAlign:"center", marginTop:"10%"}}>
      <p style={{fontSize:"150%"}}>Quiz has been submitted successfully!</p>
      <p style={{fontSize:"150%", fontFamily:"Merriweather"}}>Your score: {result}%</p>

      <p style={{fontSize:"150%"}}>{result>65?`Congratulations! You have unlocked the certificate.`:`Note: You have to score atleast 65% to pass the test`}</p>
      <button className="btn btn-success" onClick={refreshScreen}>
        Retake quiz
      </button>
      </div>
    </>
  );

  const instructionsElement = (
    <>
    
      <div style={{margin:"4% 0"}}>
      <div style={{textAlign:"right"}}>
        <p style={{fontSize:"150%"}}>Total duration: {TEST_DURATION_IN_MINUTES} minutes</p>
      </div>
        <h3>Instructions:</h3>
        <ul style={{ fontSize: "1.2rem" }}>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            et repudiandae temporibus quos quo aspernatur debitis tempora
            consequuntur unde quia veritatis natus numquam eos repellendus vero
            quas, saepe expedita at eligendi fugiat sint culpa. Libero
            temporibus, voluptatem officia sed rem magnam! Delectus fuga nisi,
            aspernatur cupiditate officia asperiores maiores magnam.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, hic
            quibusdam repellat quisquam tempora nisi dolor sunt. Accusamus sed
            aliquam repudiandae magnam, soluta possimus consectetur, aut ad rem,
            optio maxime.
          </li>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
            voluptates doloribus sequi blanditiis nisi necessitatibus dolor
            aperiam? Laborum atque animi molestias voluptas amet enim sint.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquam nesciunt eum reprehenderit voluptate corrupti possimus, nobis rem quasi voluptatum quidem obcaecati officia illo at maxime laudantium, autem et modi quam quaerat fuga! Ducimus itaque hic nulla rerum ipsam voluptates ad rem ipsum qui iusto.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A consequatur esse fugiat cupiditate magni ab facilis dolorem porro molestiae beatae.
          </li>
        </ul>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          className="btn btn-primary"
          onClick={handleStartQuizClick}
          disabled={!isEligibleToTakeQuiz ? true : false}
        >
          Start
        </button>

        <p>
          {storedResult === -1
            ? "You never took this quiz before"
            : `Your latest quiz score is ${storedResult}%`}
        </p>
      </div>
    </>
  );

  const quizElement =
    quiz.length === 0 ? (
      <p>There are currently no questions in this quiz. Kindly revisit the page later.</p>
    ) : (
        <>
        <p style={{fontSize:"150%", fontFamily:"Merriweather", margin:"5% 0"}}><i class="fa-regular fa-clock"></i> All the best! Quiz has been started. Tick the correct answers before the timer runs out.</p>

        

      <div
        id="quiz"
        name="quiz"
        style={{
          marginTop: "5%",
          fontSize: "140%",
        }}
      >
      <div id="timer" style={{textAlign:"right"}}>
            Time remaining : 
            {/* 10 minute = 10000*6*10 miliseconds */}
            <span style={{marginLeft:"1%", fontFamily:"Merriweather"}}>
            <Countdown date={Date.now() + 10000*6*10}
                renderer={renderer}
             />
            </span>
        </div>
        {quiz.map((quizObject, quizIndex) => {
          let options = [];
          options.push(quizObject.option1);
          options.push(quizObject.option2);
          options.push(quizObject.option3);
          options.push(quizObject.option4);


          return (
            <div
              key={quizIndex}
              style={{ margin: "10px" }}
            >
              <p>
                {quizIndex + 1}. {quizObject.question}
              </p>

              {options.map((option, optIndex) => {
                return (
                  <div key={optIndex} style={{ display: "block" }}>
                    <span>{optIndex + 1} . </span>
                    <input
                      className="form-check-input mx-3"
                      type="checkbox"
                      id={quizIndex * 11 + optIndex + 1}
                      value={
                        response[quizIndex][`isOption${optIndex + 1}Checked`]
                      }
                      onChange={(e) => {
                        handleResponseChange(
                          e.target.checked,
                          quizIndex,
                          optIndex
                        );
                      }}
                    />
                    <label>{option}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div style={{textAlign:"center", margin:"5%"}}>
            <button id="quizSubmitButton" className="btn btn-success" onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>

      </div></>
    );

  return (
    <>
      {showQuiz
        ? quizElement
        : showResult
        ? resultElement
        : instructionsElement}
    </>
  );
};

export default UserQuiz;
