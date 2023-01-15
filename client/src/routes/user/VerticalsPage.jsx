import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css"; // ! Uses a css file from admin folder, might need to create a common one later
import { useNavigate } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { refreshScreen } from "../../utilities/helper_functions";

// My components
import Loader from "../../components/common/Loader";
import Card from "../../components/user/Card";

// My css
import "../../css/user/user-verticals.css";
import { CardGrid } from "../../components/common/CardGrid";
import HeaderCard from "../../components/common/HeaderCard";

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
    // console.log(verticalId);
    navigate(`/user/verticals/${verticalId}/courses/all`);
  }

  const loader = <Loader />;

  const element = (
    <div className="verticals-page-outer-div">
      <HeaderCard>
        <p className="user-verticals-header-text">
          Here's what we have got for you !
        </p>
      </HeaderCard>

      <section id="verticals">
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
      </section>
    </div>
  );

  return <>{isLoading ? loader : element}</>;
};

export default UserVerticals;
