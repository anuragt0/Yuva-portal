import React from "react";

import "../../css/admin/a-add-unit-page.css";

const ActivityInput = (props) => {
  return (
    <div style={{ marginBottom: "1.5rem" }} className="text-ff2">
      <input
        className="a-add-unit-page-input text-ff2"
        type="text"
        id={props.id}
        placeholder="Enter activity"
        value={props.value || ""}
        onChange={(e) => props.handleActivityChange(props.index, e)}
      />

      <div style={{ textAlign: "right" }}>
        <button
          className="a-add-unit-page-activity-remove-btn"
          onClick={() => props.handleDeleteActivity(props.index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ActivityInput;
