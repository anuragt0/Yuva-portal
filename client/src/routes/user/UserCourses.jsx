import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";

// My components
import Loader from "../../components/common/Loader";
import Card from "../../components/common/Card";

// My css

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check
//! make handleAddView Courses/Verticals/Units functions non async

const UserCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verticalInfo, setVerticalInfo] = useState({ name: "", desc: "" });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllCourses() {
      const { verticalId } = params;
      setIsLoading(true);

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/all`,
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
        // console.log(result);
        setVerticalInfo(result.verticalDoc);

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
          setAllCourses(result.allCourses);
          // we also have userDoc here
          console.log("UserDoc from all courses", result.userDoc);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getAllCourses();
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleViewUnits(courseId) {
    const { verticalId } = params;

    console.log(courseId);

    navigate(`/user/verticals/${verticalId}/courses/${courseId}/units/all`);
  }

  const loader = <Loader />;

  const element = (
    <>
      <div
        style={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          textAlign: "center",
          fontFamily: "Montserrat",
          // margin: "5%",
          width: "100%",
          padding: "20px",
          marginBottom: "10px",
          backgroundColor: "#C2DCFE",
          color: "#253858",
        }}
      >
        <h1 style={{ fontWeight: "700" }}>{verticalInfo.name}</h1>
        <h2 style={{ fontFamily: "Merriweather" }}>{verticalInfo.desc}</h2>
      </div>
      <section id="courses">
        <div className="user-course-grid-div">
          <div className="row">
            {allCourses.map((course) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ padding: "10px" }}
                key={course._id}
              >
                <Card data={course} type="course" onClick={handleViewUnits} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  return <>{isLoading ? loader : element}</>;
};

export default UserCourses;
