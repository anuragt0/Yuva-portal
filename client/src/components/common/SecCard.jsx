import React from "react";

const SecCard = (props) => {
  return (
    <div
      style={{
        borderRadius: "1.5rem",
        // marginTop: "3rem",
        padding: "2.4rem 2rem",
        boxShadow: "0 0 0.5rem 0 rgb(0, 0, 0, 0.9)",
      }}
    >
      {props.children}
    </div>
  );
};

export default SecCard;
