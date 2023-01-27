import React from "react";

const UnitActivities = (props) => {
  return (
    <>
      {props.activities.map((activity, index) => {
        return (
          <div className="u-single-unit-page-activity-div" key={index}>
            <p className="u-single-unit-page-sec-text">
              {index + 1}. {activity}
            </p>

            <input type="file" className="u-single-unit-page-activity-input" />
            <button
              className="u-single-unit-page-sec-btn btn btn-primary "
              type="button"
            >
              Submit
            </button>
          </div>
        );
      })}
    </>
  );
};

export default UnitActivities;
