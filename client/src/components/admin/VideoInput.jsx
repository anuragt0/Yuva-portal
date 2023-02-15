import React from "react";

import "../../css/admin/a-add-unit-page.css";

function VideoInput(props) {
  return (
    <div
      className="form-group row profile"
      style={{ margin: 0, marginBottom: "0.8rem" }}
    >
      <label
        for={props.id}
        className="col-sm-2 col-form-label text-ff2"
        style={{ paddingLeft: "0" }}
      >
        {props.label}
      </label>
      <div className="col-sm-10 text-ff2" style={{ padding: 0 }}>
        <input
          type="text"
          className="form-control"
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
}

export default VideoInput;
