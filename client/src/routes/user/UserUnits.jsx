import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import {
  youtubeParser,
  getVideoThumbnail,
} from "../../utilities/helper_functions";

// My components
import Loader from "../../components/common/Loader";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check
//! make handleAddView Courses/Verticals/Units functions non async

const UserUnits = () => {
  const [allUnits, setAllUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

        const { statusText, allUnits } = await response.json();

        console.log(statusText);
        console.log(allUnits);

        setAllUnits(allUnits);

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

    navigate(
      `/user/verticals/${verticalId}/courses/${courseId}/units/${unitId}`
    );
  }

  const loader = <Loader />;

  const element = (
    <>
      <div style={{ textAlign: "center", margin: "2%" }}></div>
      <section className="online">
        <div className="container">
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <div className="content grid2">
            {allUnits.map((unit) => {
              const vdoThumbnail = getVideoThumbnail(unit.video.vdoSrc);

              return (
                <div className="box" key={unit._id}>
                  <div className="img">
                    <img src={vdoThumbnail} alt="sjfn" />
                    {/* <img src={vertical.imgSrc} alt="" className="show" /> */}
                  </div>
                  <span>1 Video</span>
                  <span>1 Text</span>
                  <span>{unit.activities.length} Activities</span>
                  <span>{unit.quiz.length} Question</span>
                  <br />
                  <button
                    className="btn btn-primary"
                    style={{ margin: "10px" }}
                    id={unit._id}
                    onClick={handleViewUnit}
                  >
                    View unit
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );

  return <>{isLoading ? loader : element}</>;
};

export default UserUnits;
