import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";

// My components
import Loader from "../../components/common/Loader";
import Card from "../../components/user/Card";
import HeaderCard from "../../components/common/HeaderCard";
import { CardGrid } from "../../components/common/CardGrid";

// My css
import "../../css/user/u-courses-page.css";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check
//! make handleAddView Courses/Verticals/Units functions non async

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const CoursesPage = () => {
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

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if ("isLoggedIn" in result && !result.isLoggedIn) {
              navigate("/user/login");
            } else if ("isUser" in result && !result.isUser) {
              navigate("/user/login");
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
          setVerticalInfo(result.verticalDoc);
          // we also have userDoc here
          // console.log("UserDoc from all courses", result.userDoc);
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

  function handleViewUnits(e) {
    const { verticalId } = params;
    const courseId = e.target.id;
    // console.log(courseId);

    navigate(`/user/verticals/${verticalId}/courses/${courseId}/units/all`);
  }

  const loader = <Loader />;

  const element = (
    <div className="courses-page-outer-div">
      <HeaderCard>
        <p className="user-courses-header-name-text">{verticalInfo.name}</p>
        <p className="user-courses-header-desc-text">{verticalInfo.desc}</p>
      </HeaderCard>

      <section id="courses">
        {allCourses.length > 0 ? (
          <CardGrid>
            {allCourses.map((course) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ padding: "10px" }}
                key={course._id}
              >
                <Card data={course} type="course" onClick={handleViewUnits} />
              </div>
            ))}
          </CardGrid>
        ) : (
          <h1>EMPTY</h1>
        )}
      </section>
    </div>
  );

  return <>{isLoading ? loader : element}</>;
};

export default CoursesPage;
