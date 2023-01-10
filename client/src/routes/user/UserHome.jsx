import img from "../../yuva_logo2.png";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_ORIGIN } from "../../utilities/constants";
import logo from "../../yuva_logo2.png";

import "../../css/user/user-home.css";

const HomePage = () => {
  const [allVerticals, setAllVerticals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllVerticals() {
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
          // console.log(allVerticals);
        } else {
          console.log("Internal server error");
        }
      } catch (error) {
        console.log(error.message);
        console.log("In catch");
      }
    }

    getAllVerticals();
  }, []);

  function handleViewCourses(e) {
    const verticalId = e.target.id;
    console.log(verticalId);
    navigate(`/user/verticals/${verticalId}/courses/all`);
  }

  return (
    <>
      <div className="user-home-outer-div">
        <div style={{ paddingRight: "10%" }}>
          <p className="user-home-landing-heading">Welcome to YUVA Portal</p>
          <p className="user-home-landing-subheading">
            We Are The Voice Of Young Indians Globally
          </p>
          <p className="user-home-landing-desc">
            YUVA is one of the most active focus areas within Young Indians by
            which Yi members engage students from across the country in various
            initiatives that the students conceptualize, plan and execute. The
            objective is to create a bridge, a platform for the students to work
            in cross functional teams with a broad objective of enhancing their
            leadership skills and giving back to the nation.
          </p>
          <button className="user-home-landing-btn-1">More about Yuva</button>
          <button className="user-home-landing-btn-2">Explore Verticals</button>
        </div>
        <div style={{ textAlign: "right" }}>
          <img
            src={logo}
            className="user-home-yuva-img"
            alt="yuva-big-logo"
          ></img>
        </div>
      </div>
      <hr />

      {/* SECTION 2 */}
      <section id="verticles">
        <div id="verticleHeading" style={{ textAlign: "center" }}>
          <h1>
            Curated <span style={{ color: "#0A2647" }}>verticles</span> designed
            specially for you!
          </h1>
        </div>

        <section className="online">
          <div className="container1">
            {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
            <div className="content grid2 row">
              {allVerticals.map((vertical) => (
                <div className="box col" key={vertical._id}>
                  <div className="img">
                    <img src={vertical.imgSrc} alt="sjfn" />
                    {/* <img src={vertical.imgSrc} alt="" className="show" /> */}
                  </div>
                  <h1>{vertical.name}</h1>
                  {/* {console.log( vertical.name)} */}
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
      </section>
    </>
  );
};

export default HomePage;
