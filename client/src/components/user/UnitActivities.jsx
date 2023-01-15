import React from "react";
import SecCard from "./SecCard";

const UnitActivities = (props) => {
  // console.log(props);
  const activities = (
    <>
      <p
        style={{
          fontFamily: "var(--font-family-1)",
          fontWeight: "900",
          fontSize: "2.4rem",
        }}
      >
        Activities
      </p>

      {props.activities.map((activity, index) => {
        return (
          <div
            style={{
              margin: "2rem 0 1.5rem 0",
            }}
            key={index}
          >
            <p
              style={{
                fontFamily: "var(--font-family-2)",
                fontWeight: "550",
              }}
            >
              {index + 1}: {activity}
            </p>

            <input
              type="file"
              style={{
                marginTop: "0.5rem",
                fontFamily: "var(--font-family-2)",
                fontWeight: "550",
                // border: "1px solid red",
              }}
            />
            <button
              style={{
                backgroundColor: "var(--yuva-green)",
                borderRadius: "0.4rem",
                height: "2.2rem",
                border: "none",
                color: "white",
                padding: "0 1rem 0 1rem",
                fontFamily: "var(--font-family-2)",
              }}
              type="button"
            >
              Submit
            </button>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <SecCard>{activities}</SecCard>
    </>
  );
};

export default UnitActivities;
