import React, { useState } from "react";

//my modules
import "../../css/common/card.css";

function Card(props) {
  return (
    <div className="card-div">
      <img
        className="card-img"
        src={props.vertical.imgSrc}
        alt={props.vertical.name}
      />
      <p className="card-name">{props.vertical.name}</p>
      <p className="card-desc">{props.vertical.desc}</p>
      <p className="card-count">
        <span style={{ fontSize: "1rem" }}>
          {props.vertical.courseIds.length}
        </span>{" "}
        courses
      </p>
      <button className="card-view-btn">View</button>
    </div>
  );
}

export default Card;
