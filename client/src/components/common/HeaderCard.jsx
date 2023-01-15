import React from "react";

const HeaderCard = (props) => {
  const style = {
    backgroundImage: " linear-gradient(to right, #c2dcfe, #cf4b8d)",
    boxShadow: "var(--box-shadow-1)",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "var(--font-family-1)",
    width: "100%",
    padding: "70px",
    color: "var(--yuva-dark-blue)",
  };

  return <div style={style}>{props.children}</div>;
};

export default HeaderCard;
