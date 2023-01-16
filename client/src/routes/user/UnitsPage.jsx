import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import {
  youtubeParser,
  getVideoThumbnail,
} from "../../utilities/helper_functions";

// My components
import Loader from "../../components/common/Loader";
import Card from "../../components/user/Card";

// My css
import "../../css/user/user-units.css";
import { CardGrid } from "../../components/common/CardGrid";
import HeaderCard from "../../components/common/HeaderCard";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check
//! make handleAddView Courses/Verticals/Units functions non async

const UserUnits = () => {
  const [allUnits, setAllUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseInfo, setCourseInfo] = useState({ name: "", desc: "" });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllUnits() {
      const { verticalId, courseId } = params;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/${courseId}/units/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // console.log(response);
        const result = await response.json();
        // console.log(response);
        console.log("From units/all:", result);
        setCourseInfo(result.courseDoc);

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
          setAllUnits(result.allUnits);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getAllUnits();
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleViewUnit(e) {
    const { verticalId, courseId } = params;
    const unitId = e.target.id;
    // console.log(unitId);

    navigate(
      `/user/verticals/${verticalId}/courses/${courseId}/units/${unitId}`
    );
  }

  const loader = <Loader />;

  const element = (
    <div className="units-page-outer-div">
      <HeaderCard>
        <p className="user-units-header-name-text">{courseInfo.name}</p>
        <p className="user-units-header-desc-text">{courseInfo.desc}</p>
      </HeaderCard>

      <section id="units">
        <CardGrid>
          {allUnits.map((unit) => {
            const vdoThumbnail = getVideoThumbnail(unit.video.vdoSrc);
            unit.vdoThumbnail = vdoThumbnail;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ padding: "10px" }}
                key={unit._id}
              >
                <Card data={unit} type="unit" onClick={handleViewUnit} />
              </div>
            );
          })}
        </CardGrid>
      </section>
    </div>
  );

  return <>{isLoading ? loader : element}</>;
};

export default UserUnits;
