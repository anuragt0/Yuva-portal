import React, { useState } from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-18-pdf/renderer";

/* 
Install @react-18-pdf/renderer instead of @react-pdf/rendered as it throws an error while npm install:
https://stackoverflow.com/questions/72152690/react-pdf-renderer-not-working-on-react-18
*/

// My css
import "../../css/user/cert.css";

// My assets
import yi_logo from "../../assets/images/yi_logo.png";
import yuva_logo from "../../assets/images/yuva_logo.png";
import cii_logo from "../../assets/images/cii_logo.jpg";
import trophy_logo from "../../assets/images/trophy_logo.jpg";
import sign from "../../assets/images/sign.png";
import all_logo from "../../assets/images/all_logo_5.png";

const Cert = (props) => {
  const { certInfo } = props;
  const certificate = (
    <div id="cert" className="cert-page-cert-outer-div">
      <div className="cert-page-cert-inner-div">
        <img src={all_logo} style={{ width: "100%" }} alt="all-logo" />

        <h2
          style={{
            // fontFamily: "var(--font-family-1)",
            margin: "0",
            letterSpacing: "0.00px",
          }}
        >
          Certificate
        </h2>
        <h6
          style={{
            // fontFamily: "var(--font-family-1)",
            fontSize: "0.8rem",
            letterSpacing: "0.00px",
          }}
        >
          OF COMPLETION
        </h6>
        <h2 className="cert-page-cert-name-text">{certInfo.holderName}</h2>
        <p
          style={{
            // fontFamily: "var(--font-family-2)",
            // fontSize: "0.8rem",
            // letterSpacing: "0.001px",
            marginTop: "0.4rem",
            fontSize: "0.8rem",
            // padding: "0 4rem 0 4rem",
          }}
        >
          has successfully completed the course on {certInfo.courseName} (
          {certInfo.unitId}) <br /> on {certInfo.passingDate}
        </p>
        <img
          className="cert-page-trophy-img"
          src={trophy_logo}
          alt="trophy-logo"
        />

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <img className="cert-page-sign-img" src={sign} alt="yi-logo"></img>
            <p
              className="cert-page-cert-desig-text"
              style={{ letterSpacing: "0.01px" }}
            >
              NATIONAL <br /> YUVA CHAIR
            </p>
            <p className="cert-page-cert-ciyi-text">CIYI</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <img className="cert-page-sign-img" src={sign} alt="yi-logo"></img>
            <p
              className="cert-page-cert-desig-text"
              style={{ letterSpacing: "0.01px" }}
            >
              NATIONAL <br /> YUVA CO-CHAIR
            </p>
            <p className="cert-page-cert-ciyi-text">CIYI</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <img className="cert-page-sign-img" src={sign} alt="yi-logo"></img>
            <p
              className="cert-page-cert-desig-text"
              style={{ letterSpacing: "0.01px" }}
            >
              CHAIR <br /> YUVA
            </p>
            <p className="cert-page-cert-ciyi-text">CIYI</p>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{certificate}</>;
};

export default Cert;
