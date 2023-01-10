import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VideoPlayer from "../../components/user/VideoPlayer";
import Instructions from "../../components/Instructions";

import UnitText from "../../components/user/UnitText";
import { SERVER_ORIGIN } from "../../utilities/constants";
import UnitActivities from "../../components/user/UnitActivities";

const UserSingleUnit = () => {
  const [unit, setUnit] = useState({
    video: null,
    text: "",
    activities: [],
  });
  const [isGetCertBtnDisabled, setIsGetCertBtnDisabled] = useState(true);
  const [isQuizButtonEnable, setIsQuizButtonEnable] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(false);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function getUnit() {
      const { verticalId, courseId, unitId } = params;
      setIsLoading(true);

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const result = await response.json();
        // console.log(response);
        console.log(result);
        setVideoInfo(result.unit.video);
        setIsQuizButtonEnable(result.isEligibleToTakeQuiz);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
              console.log("go to login");
            }
          } else if (response.status === 403) {
            if (result.userDoc)
              if (result.userDoc.isPassReset === false) {
                console.log("go to reset password");
              } else if (result.userDoc.isRegistered === false) {
                console.log("go to registration page");
              }
          } else {
            alert("Internal server error"); // todo: toast notify
          }
        } else if (response.ok && response.status === 200) {
          setUnit(result.unit);

          console.log(result.quizPercent);
          const CERTIFICATE_GENERATION_CUT_OFF_IN_PERCENT = 65;
          if (result.quizPercent >= CERTIFICATE_GENERATION_CUT_OFF_IN_PERCENT) {
            setIsGetCertBtnDisabled(false);
          }

          // we also have userDoc here
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getUnit();
  }, []);

  function handleOpenQuizClick() {
    const { verticalId, courseId, unitId } = params;
    // asdfasdfasdf

    navigate(
      `/user/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz`
    );
  }
  function handleGetCertificate() {
    console.log("kjfnkwejnefkjwfkjnwkjfnwek");
  }
  return (
    <div style={{ margin: "3%" }}>
      <div
        style={{ textAlign: "center", fontFamily: "Montserrat", margin: "5%" }}
      >
        <h3>Title: </h3>
        <h1 style={{ color: "#0A2647" }}>{videoInfo.title}</h1>
      </div>
      <div style={{ marginBottom: "150px" }}>
        {unit.video !== null ? <VideoPlayer video={unit.video} /> : null}
        <div
          style={{ textAlign: "left", fontFamily: "Montserrat", margin: "5%" }}
        >
          <h3>Description: </h3>
          <h2 style={{ color: "#0A2647" }}>{videoInfo.desc}</h2>
        </div>
        <hr />
        <div
          style={{ textAlign: "left", fontFamily: "Montserrat", margin: "5%" }}
        >
          <h2>Text to read: </h2>
        </div>
        <UnitText text={unit.text} />
        <hr />
        <div
          style={{ textAlign: "left", fontFamily: "Montserrat", margin: "5%" }}
        >
          <h2>Fun activities: </h2>
        </div>
        {unit.activities !== null ? (
          <UnitActivities activities={unit.activities} />
        ) : null}

        <hr />

        <div className="quiz">
          <div
            style={{
              textAlign: "left",
              fontFamily: "Montserrat",
              margin: "5%",
            }}
          >
            <h2>Quiz: </h2>
          </div>
          {!isQuizButtonEnable ? (
            <h5>
              Note: Watch atleast 50% of the video to unlock the quiz. <br />
              (Kindly refresh the page after watching video to unlock the quiz.)
            </h5>
          ) : (
            <h5>Quiz has been unlocked click the button below to take quiz</h5>
          )}
          {/* ``Quiz has been unlocked click the button below to take quiz */}

          <button
            className="btn my-5 btn-success"
            onClick={handleOpenQuizClick}
            disabled={!isQuizButtonEnable}
          >
            Open Quiz
          </button>
        </div>

        <div className="certificate">
          <div
            style={{
              textAlign: "left",
              fontFamily: "Montserrat",
              margin: "5%",
            }}
          >
            <h2>Get certificate: </h2>
          </div>
          {isGetCertBtnDisabled ? (
            <h5>
              Note: To get the certificate you have to score atleast 65% in the
              quiz.
            </h5>
          ) : (
            <h5>
              ***Congratulations! your certificate has been generated. Click on
              below button to download your certificate.***
            </h5>
          )}

          <button
            className="btn my-5 btn-success"
            onClick={handleGetCertificate}
            disabled={isGetCertBtnDisabled === true ? true : false}
          >
            Get Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSingleUnit;
