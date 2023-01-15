import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VideoPlayer from "../../components/user/VideoPlayer";
// import Instructions from "../../components/Instructions";

import UnitText from "../../components/user/UnitText";
import { SERVER_ORIGIN } from "../../utilities/constants";
import UnitActivities from "../../components/user/UnitActivities";

// My css
import "../../css/user/user-single-unit.css";
import SecCard from "../../components/user/SecCard";

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
    <div style={{}}>
      {unit.video !== null ? <VideoPlayer video={unit.video} /> : null}
      <div
        className="user-single-unit-title-desc-div"
        style={{
          textAlign: "center",
          padding: "3rem 5rem",
          marginTop: "3rem",
          fontFamily: "var(--font-family-1)",
        }}
      >
        <h1 style={{ color: "#0A2647", fontWeight: "700" }}>Title: </h1>
        <h1 style={{ color: "#0A2647", fontWeight: "700" }}>
          {videoInfo.title}
        </h1>

        <h4
          style={{
            color: "#0A2647",
            fontFamily: "var(--font-family-2)",
            marginTop: "2.4rem",
          }}
        >
          Description: {videoInfo.desc}
        </h4>
      </div>

      <SecCard>
        <>
          <p
            style={{
              fontFamily: "var(--font-family-1)",
              fontWeight: "900",
              fontSize: "2.4rem",
            }}
          >
            Text to read
          </p>

          <UnitText text={unit.text} />
        </>
      </SecCard>

      {unit.activities !== null ? (
        <UnitActivities activities={unit.activities} />
      ) : null}

      <div className="user-single-unit-quiz-cert-outer-div">
        <div style={{ paddingRight: "1.5rem" }}>
          <SecCard>
            <div className="user-single-unit-quiz-div">
              <p
                style={{
                  fontFamily: "var(--font-family-1)",
                  fontWeight: "900",
                  fontSize: "2.4rem",
                  // marginTop: "1.6rem",
                }}
              >
                Quiz
              </p>

              <p
                style={{
                  fontFamily: "var(--font-family-2)",
                  // fontWeight: "600",
                }}
              >
                {!isQuizButtonEnable
                  ? "Note: You need to watch atleast 50% of the video to unlock the quiz. (Kindly refresh the page after watching video to unlock the quiz.)"
                  : "Quiz has been unlocked, click the button below to take quiz"}
              </p>

              <button
                className="btn btn-primary"
                onClick={handleOpenQuizClick}
                disabled={!isQuizButtonEnable}
                style={{
                  backgroundColor: "var(--yuva-green)",
                  borderRadius: "0.4rem",
                  height: "2.2rem",
                  border: "none",
                  color: "white",
                  padding: "0 1rem 0 1rem",
                  fontFamily: "var(--font-family-2)",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {!isQuizButtonEnable === true ? "Quiz Locked" : "Open Quiz"}
              </button>
            </div>
          </SecCard>
        </div>
        <div style={{ paddingLeft: "1.5rem" }}>
          <SecCard>
            <div className="user-single-unit-quiz-div">
              <p
                style={{
                  fontFamily: "var(--font-family-1)",
                  fontWeight: "900",
                  fontSize: "2.4rem",
                }}
              >
                Certificate
              </p>
              <p style={{ fontFamily: "var(--font-family-2)" }}>
                {isGetCertBtnDisabled
                  ? "Note: To get the certificate you have to score atleast 65% in the quiz"
                  : "Congratulations! Your certificate has been generated. Click on the button below to download your certificate."}
              </p>
              <button
                className="btn btn-primary"
                onClick={handleGetCertificate}
                disabled={isGetCertBtnDisabled === true ? true : false}
                style={{
                  backgroundColor: "var(--yuva-green)",
                  borderRadius: "0.4rem",
                  height: "2.2rem",
                  border: "none",
                  color: "white",
                  padding: "0 1rem 0 1rem",
                  fontFamily: "var(--font-family-2)",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {isGetCertBtnDisabled === true
                  ? "Certificate Locked"
                  : "Get Certificate"}
              </button>
            </div>
          </SecCard>
        </div>
      </div>
    </div>
  );
};

export default UserSingleUnit;
