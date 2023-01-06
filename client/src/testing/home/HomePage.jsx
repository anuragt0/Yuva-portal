import img from "../../yuva_logo2.png";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_ORIGIN } from "../../utilities/constants";

import "./HomePage.css";

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
      <section id="landing-page">
        <div class="grid-container">
          <div class="grid-child">
            <div className="container">
              <div className="row">
                <div style={{ fontSize: "300%", color: "#0A2647" }}>
                  <h1>
                    <b style={{ fontSize: "120%" }}> WELCOME TO YUVA </b>
                  </h1>
                  <h2 className="heading2">
                    {" "}
                    We Are The Voice Of Young Indians Globally
                  </h2>
                </div>
                <p style={{ fontSize: "190%" }}>
                  YUVA is one of the most active focus areas within Young
                  Indians by which Yi members engage students from across the
                  country in various initiatives that the students
                  conceptualize, plan and execute.
                </p>
                <div>
                  <button className="btn btn-success mx-5 my-5">
                    {" "}
                    <p style={{ fontSize: "150%", margin: "0 20px" }}>
                      {" "}
                      More about Yuva
                    </p>{" "}
                  </button>
                  <br />
                  <a href="#verticles">
                    <button className="btn btn-success mx-5">
                      {" "}
                      <p style={{ fontSize: "160%", margin: "0 20px" }}>
                        {" "}
                        Explore verticals{" "}
                      </p>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-child">
            <img
              className="img"
              src={img}
              alt="img"
              style={{ height: "350px", marginLeft: "25%" }}
            />
          </div>
        </div>
      </section>

      <hr />

      {/* SECTION 2 */}
      <section id="verticles">
        <div id="verticleHeading" style={{textAlign:"center"}}>
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
                    style={{ margin: "10px"}}
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
