import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

// TODO

import { SERVER_ORIGIN } from "../../utilities/constants";
import { youtubeParser } from "../../utilities/helper_functions";

const AdminUnits = () => {
  const [allUnits, setAllUnits] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllUnits() {
      const { verticalId, courseId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/public/verticals/${verticalId}/courses/${courseId}/units/all`,
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
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllUnits();
  }, []);

  async function redirectToAddUnitPage(e) {
    const { verticalId, courseId } = params;
    // console.log(params);

    navigate(`/admin/verticals/${verticalId}/courses/${courseId}/units/add`);
  }

  return (
    <>
      <div style={{ textAlign: "center", margin: "2%" }}>
        <button
          onClick={redirectToAddUnitPage}
          className="btn btn-primary btn-lg"
        >
          + Unit
        </button>
      </div>
      <section className="online">
        <div className="container">
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <div className="content grid2">
            {allUnits.map((unit) => {
              const vdoCode = youtubeParser(unit.video.vdoSrc);
              const vdoThumbnail = `https://img.youtube.com/vi/${vdoCode}/hqdefault.jpg`;

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
                  <button className="btn btn-primary">- Delete</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminUnits;
