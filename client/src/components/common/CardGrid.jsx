import React from "react";

export const CardGrid = (props) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="row">{props.children}</div>
    </div>
  );
};
