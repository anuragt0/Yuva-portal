import React from "react";

import "../../css/admin/a-add-unit-page.css";

const VideoInput = (props) => {
  return (
    <div style={{ marginBottom: "0.8rem" }} className="text-ff2">
      <label htmlFor={props.id}>{props.label}</label>
      <div>
        <input
          className="a-add-unit-page-input"
          type="text"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default VideoInput;
