import React, { useState } from "react";

//my modules
import "../../css/common/card.css";

function Card(props) {
  // console.log(props);
  return (
    <div className="card-div">
      {props.type === "course" ? null : (
        <img
          className="card-img"
          src={
            props.type === "vertical"
              ? props.data.imgSrc
              : props.data.vdoThumbnail
          }
          alt={props.data.name}
        />
      )}

      <p className="card-name">
        {props.type === "unit" ? props.data.video.title : props.data.name}
      </p>
      <p className="card-desc">
        {props.type === "unit" ? props.data.video.desc : props.data.desc}
      </p>

      <p className="card-count">
        {props.type === "vertical"
          ? props.data.courseIds.length + " Courses"
          : props.type === "course"
          ? props.data.unitArr.length + " Units"
          : props.data.activities.length +
            " Activities • " +
            props.data.quiz.length +
            " Questions"}
      </p>

      <button
        className="card-view-btn"
        id={props.data._id}
        onClick={(e) => {
          //   console.log(e.target.id);
          props.onClick(e);
        }}
      >
        View{" "}
        {props.type === "vertical"
          ? "courses"
          : props.type === "course"
          ? "units"
          : "unit"}
      </button>
    </div>
  );
}

export default Card;
