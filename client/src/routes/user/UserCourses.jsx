import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";

// My components
import Loader from "../../components/common/Loader";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check
//! make handleAddView Courses/Verticals/Units functions non async

const UserCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verticalInfo, setVerticalInfo] = useState({name:"", desc:""});
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
          console.log("UserDoc from all courses",result.userDoc);
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
    // console.log("skjfnskf");
    const { verticalId } = params;
    const courseId = e.target.id;

    console.log(courseId);

    navigate(`/user/verticals/${verticalId}/courses/${courseId}/units/all`);
  }

  const loader = <Loader />;

  const element = (
    <>
    <div style={{textAlign:"center", fontFamily:"Montserrat", margin:"5%"}}>
        <h1>{verticalInfo.name}</h1>
        <h2>{verticalInfo.desc}</h2>
    </div>
    <section style={{fontFamily:"'Merriweather', serif"}} className="online">
      <div className="container">
        {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
        <div className="content grid2 row">
          {allCourses.map((course) => (
            <div className="box col" key={course._id}>
              <h2 style={{color:"#735F32"}} ><b> {course.name}</b></h2>
              <h5>{course.desc}</h5>
              <span>{course.unitArr.length} Units </span>
              <br />
              <button
                className="btn btn-primary"
                style={{ margin: "10px" }}
                id={course._id}
                onClick={handleViewUnits}
              >
                View units
              </button>
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
