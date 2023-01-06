import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VideoPlayer from "../../components/user/VideoPlayer";
import UnitText from "../../components/user/UnitText";
import { SERVER_ORIGIN } from "../../utilities/constants";
import UnitActivities from "../../components/user/UnitActivities";

const UserQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [response, setResponse] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getQuiz() {
      const { verticalId, courseId, unitId } = params;
      setIsLoading(true);

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
            if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
              console.log("go to login");
            }
          } else if (response.status === 403) {
            if (result.userDoc.isPassReset === false) {
              console.log("go to reset password");
            } else if (result.userDoc.isRegistered === false) {
              console.log("go to registration page");
            }
          } else {
            alert("Internal server error"); // todo: toast notify
          }
        } else if (response.ok && response.status === 200) {
          setQuiz(result.quiz);
          console.log(result.quiz);

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

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getQuiz();
  }, []);

  function handleSubmitQuiz() {}

  function handleResponseChange(isChecked, quizIndex, optIndex) {
    setResponse((prevResponse) => {
      console.log(prevResponse);

      let newResponse = prevResponse;
      //   console.log(quizIndex + 1, optIndex + 1);

      newResponse[quizIndex][`isOption${optIndex + 1}Checked`] = isChecked;

      console.log(newResponse);
      return newResponse;
    });
  }

  return (
    <div
      id="quiz"
      name="quiz"
      style={{ marginTop: "80px", fontSize: "20px", border: "2px solid blue" }}
    >
      {quiz.map((quizObject, quizIndex) => {
        let options = [];
        options.push(quizObject.option1);
        options.push(quizObject.option2);
        options.push(quizObject.option3);
        options.push(quizObject.option4);

        return (
          <div
            key={quizIndex}
            style={{ backgroundColor: "#90EE90", margin: "10px" }}
          >
            <p>
              {quizIndex + 1}. {quizObject.question}
            </p>

            {options.map((option, optIndex) => {
              return (
                <div key={optIndex} style={{ display: "block" }}>
                  <span>{optIndex + 1}</span>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => {
                      handleResponseChange(
                        e.target.checked,
                        quizIndex,
                        optIndex
                      );
                    }}
                    id={quizIndex * 99 + optIndex + 1}
                  />
                  <label>{option}</label>
                </div>
              );
            })}
          </div>
        );
      })}

      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default UserQuiz;
