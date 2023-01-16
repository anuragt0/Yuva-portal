import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// My components
import Loader from "../../components/common/Loader";
import Card from "../../components/user/Card";
import { CardGrid } from "../../components/common/CardGrid";
import HeaderCard from "../../components/common/HeaderCard";

// My css
import "../../css/user/u-verticals-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check

///////////////////////////////////////////////////////////////////////////////////////////

const VerticalsPage = () => {
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
    <div className="u-verticals-page-outer-div">
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
    </div>
  );

  return <>{isLoading ? loader : element}</>;
};

export default VerticalsPage;
