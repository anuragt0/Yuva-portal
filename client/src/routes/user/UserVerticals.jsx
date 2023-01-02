import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css"; // ! Uses a css file from admin folder, might need to create a common one later
import { useNavigate } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { refreshScreen } from "../../utilities/helper_functions";

// My components
import Loader from "../../components/common/Loader";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check

///////////////////////////////////////////////////////////////////////////////////////////

const UserVerticals = () => {
  const [allVerticals, setAllVerticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllVerticals() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { statusText, allVerticals } = await response.json();
        // console.log(response);

        if (response.ok && response.status === 200) {
          setAllVerticals(allVerticals);
        } else {
          console.log("Internal server error");
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log("In catch");
        setIsLoading(false);
      }
    }

    getAllVerticals();
  }, []);

  function handleViewCourses(e) {
    const verticalId = e.target.id;
    console.log(verticalId);
    navigate(`/user/verticals/${verticalId}/courses/all`);
  }

  const loader = <Loader />;
  const element = (
    <section className="online">
      <div className="container1">
        {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
        <div className="content grid2">
          {allVerticals.map((vertical) => (
            <div className="box" key={vertical._id}>
              <div className="img">
                <img src={vertical.imgSrc} alt="sjfn" />
                {/* <img src={vertical.imgSrc} alt="" className="show" /> */}
              </div>
              <h1>{vertical.name}</h1>
              <h1>{vertical.desc}</h1>
              <span>{vertical.courseIds.length} Courses </span>
              <br />
              <button
                className="btn btn-primary"
                style={{ margin: "10px" }}
                id={vertical._id}
                onClick={handleViewCourses}
              >
                View courses
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return <>{isLoading ? loader : element}</>;
};

export default UserVerticals;
