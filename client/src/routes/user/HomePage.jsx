import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// My components
import Card from "../../components/user/Card";
import HeaderCard from "../../components/common/HeaderCard";
import Loader from "../../components/common/Loader";
import { CardGrid } from "../../components/common/CardGrid";

// My css
import "../../css/user/u-home-page.css";
import "../../css/user/u-verticals-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import logo from "../../assets/images/yuva_logo.png";

///////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {
  const [allVerticals, setAllVerticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllVerticals() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        // console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 500) {
            toast.error(result.statusText);
          }
        } else if (response.ok && response.status === 200) {
          setAllVerticals(result.allVerticals);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getAllVerticals();
  }, []);

  function handleViewCourses(e) {
    const verticalId = e.target.id;
    // console.log(verticalId);
    navigate(`/user/verticals/${verticalId}/courses/all`);
  }

  const element = (
    <>
      <HeaderCard>
        <p className="u-verticals-page-header-text">
          Here's what we have got for you !
        </p>
      </HeaderCard>
      <section id="verticals">
        {allVerticals.length > 0 ? (
          <CardGrid>
            {allVerticals.map((vertical) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ padding: "10px" }}
                key={vertical._id}
              >
                <Card
                  data={vertical}
                  type="vertical"
                  onClick={handleViewCourses}
                />
              </div>
            ))}
          </CardGrid>
        ) : (
          <h1>EMPTY</h1>
        )}
      </section>
    </>
  );

  return (
    <>
      <div className="u-home-page-outer-div">
        <div style={{ paddingRight: "10%" }}>
          <p className="u-home-page-landing-heading">Welcome to YUVA Portal</p>
          <p className="u-home-page-landing-subheading">
            We Are The Voice Of Young Indians Globally
          </p>
          <p className="u-home-page-landing-desc">
            YUVA is one of the most active focus areas within Young Indians by
            which Yi members engage students from across the country in various
            initiatives that the students conceptualize, plan and execute. The
            objective is to create a bridge, a platform for the students to work
            in cross functional teams with a broad objective of enhancing their
            leadership skills and giving back to the nation.
          </p>
          <button className="u-home-page-landing-btn-1">More about Yuva</button>
          <button className="u-home-page-landing-btn-2">
            Explore Verticals
          </button>
        </div>
        <div style={{ textAlign: "right" }}>
          <img
            src={logo}
            className="u-home-page-yuva-img"
            alt="yuva-big-logo"
          ></img>
        </div>
      </div>

      {isLoading ? Loader : element}
    </>
  );
};

export default HomePage;
