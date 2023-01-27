import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VideoPlayer from "../../components/user/VideoPlayer";
import UnitText from "../../components/user/UnitText";
import SecCard from "../../components/user/SecCard";
import Cert from "../../components/user/Cert";
import UnitActivities from "../../components/user/UnitActivities";

// My css
import "../../css/user/u-single-unit-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { downloadCertificate } from "../../utilities/helper_functions";
import HeaderCard from "../../components/common/HeaderCard";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";

///////////////////////////////////////////////////////////////////////////////////////////////////

const UserSingleUnit = () => {
  const [unit, setUnit] = useState({
    video: null,
    text: "",
    activities: [],
  });
  const [isCertBtnDisabled, setIsCertBtnDisabled] = useState(true);
  const [isQuizBtnDisabled, setIsQuizBtnDisabled] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(false);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function getUnit() {
      setIsLoading(true);
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
        // console.log(result);

        setIsLoading(false);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
              navigate("/user/login");
            }
          } else if (response.status === 403) {
            if (result.userDoc) {
              if (result.userDoc.isPassReset === false) {
                toast.error("go to reset password");
              } else if (result.userDoc.isRegistered === false) {
                toast.error("go to registration page");
              }
            } else {
            }
          } else {
            toast.error(result.statusText);
          }
        } else if (response.ok && response.status === 200) {
          setUnit(result.unit);
          setVideoInfo(result.unit.video);
          setIsQuizBtnDisabled(result.isEligibleToTakeQuiz);
          setCourseInfo(result.courseInfo);
          setUserInfo(result.userInfo);

          // console.log(result.quizPercent);
          const CERTIFICATE_GENERATION_CUT_OFF_IN_PERCENT = 65;
          if (result.quizPercent >= CERTIFICATE_GENERATION_CUT_OFF_IN_PERCENT) {
            setIsCertBtnDisabled(false);
          }

          // we also have userDoc here
        } else {
          // for future
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getUnit();
  }, []);

  function handleOpenQuizClick() {
    const { verticalId, courseId, unitId } = params;

    navigate(
      `/user/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz`
    );
  }

  function handleGetCertificate() {
    console.log("downloading cert ...");
    downloadCertificate();
  }

  const certificate = !isCertBtnDisabled ? (
    <Cert
      courseName={courseInfo.name}
      unitId={unit._id}
      courseId={courseInfo._id}
      userMongoId={userInfo.mongoId}
      userName={userInfo.name}
    />
  ) : null;

  const element = (
    <div className="u-single-unit-page-outer-div">
      {/* <section style={{ display: "none" }}> */}
      <section>
        <div id="cert">{certificate}</div>
      </section>

      {unit.video !== null ? <VideoPlayer video={unit.video} /> : null}

      <div className="u-single-unit-page-common">
        <HeaderCard>
          <h1 className="u-single-unit-page-vdo-title">
            Title: {videoInfo.title}
          </h1>

          <h5 className="u-single-unit-page-vdo-desc">
            Description: {videoInfo.desc}
          </h5>
        </HeaderCard>
      </div>

      <div className="u-single-unit-page-common">
        <SecCard>
          <h2 className="u-single-unit-page-sec-heading">Text to read</h2>
          <UnitText text={unit.text} />
        </SecCard>
      </div>

      <div className="u-single-unit-page-common">
        {unit.activities !== null ? (
          <SecCard>
            <h2 className="u-single-unit-page-sec-heading">Activities</h2>
            <UnitActivities activities={unit.activities} />
          </SecCard>
        ) : null}
      </div>

      <div className="u-single-unit-page-quiz-cert-outer-div u-single-unit-page-common">
        <div style={{ paddingRight: "1.5rem" }}>
          <SecCard>
            <div className="user-single-unit-quiz-div">
              <h2 className="u-single-unit-page-sec-heading">Quiz</h2>

              <p className="u-single-unit-page-sec-text">
                {isQuizBtnDisabled
                  ? "Note: You need to watch atleast 50% of the video to unlock the quiz. (Kindly refresh the page after watching video to unlock the quiz.)"
                  : "Quiz has been unlocked, click the button below to take quiz."}
              </p>

              <button
                className="u-single-unit-page-sec-btn btn btn-primary"
                onClick={handleOpenQuizClick}
                disabled={isQuizBtnDisabled}
              >
                {isQuizBtnDisabled ? "Quiz Locked" : "Open Quiz"}
              </button>
            </div>
          </SecCard>
        </div>

        <div style={{ paddingLeft: "1.5rem" }}>
          <SecCard>
            <div className="user-single-unit-quiz-div">
              <h2 className="u-single-unit-page-sec-heading">Certificate</h2>

              <p className="u-single-unit-page-sec-text">
                {isCertBtnDisabled
                  ? "Note: To get the certificate you have to score atleast 65% in the quiz."
                  : "Congratulations! Your certificate has been generated. Click on the button below to download your certificate."}
              </p>
              <button
                className="u-single-unit-page-sec-btn btn btn-primary"
                onClick={handleGetCertificate}
                disabled={isCertBtnDisabled}
              >
                {isCertBtnDisabled ? "Certificate Locked" : "Get Certificate"}
              </button>
            </div>
          </SecCard>
        </div>
      </div>
    </div>
  );

  return <>{isLoading ? <Loader /> : element}</>;
};

export default UserSingleUnit;
