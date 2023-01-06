import React from "react";

const UnitActivities = (props) => {
  console.log(props);
  return (
    <>
      <div style={{ border: "2px solid green" }}>
        {props.activities.map((activity, index) => {
          return (
            <div key={index}>
              <p>{activity}</p>
              <input type="file" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UnitActivities;
