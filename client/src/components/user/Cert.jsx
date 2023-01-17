import React from "react";
import "../../css/user/cert.css";

const Cert = (props) => {
  return (
    <div className="cert-outer-div">
      <p>Course Name: {props.courseName} </p>
      <p>UnitId: {props.unitId} </p>
      <p>
        Certificate Id: {props.courseId + props.unitId + props.userMongoId}
        {"***"}
      </p>
      <p>Participant name: {props.userName} </p>
    </div>
  );
};

export default Cert;
