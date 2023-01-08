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

  const [isLoading, setIsLoading] = useState(false);
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
        // console.log(result.unit.activities);

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
  function handleStartQuizClick() {
    console.log("kjfnkwejnefkjwfkjnwkjfnwek");
  }
  return (
    <div style={{ marginBottom: "150px" }}>
      {unit.video !== null ? <VideoPlayer video={unit.video} /> : null}
      <UnitText text={unit.text} />
      {unit.activities !== null ? (
        <UnitActivities activities={unit.activities} />
      ) : null}
      <button className="btn my-5 btn-success" onClick={handleOpenQuizClick}>
        Open Quiz
      </button>
      <button
        className="btn my-5 btn-success"
        onClick={handleStartQuizClick}
        disabled={isGetCertBtnDisabled === true ? true : false}
      >
        Get Certificate
      </button>
    </div>
  );
};

export default UserSingleUnit;
