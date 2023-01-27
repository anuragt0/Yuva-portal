import React, { useState } from "react";

// My css
import "../../css/user/cert.css";

// My assets
import yi_logo from "../../assets/images/yi_logo.png";
import yuva_logo from "../../assets/images/yuva_logo.png";
import cii_logo from "../../assets/images/cii_logo.jpg";
import trophy_logo from "../../assets/images/trophy_logo.jpg";
import sign from "../../assets/images/sign.png";
import all_logo from "../../assets/images/all_logo.png";

const CertPage = () => {
  const [certInfo, setCertInfo] = useState({
    name: "asdad",
  });

  return (
    <div id="cert" className="cert-page-cert-outer-div">
      <div className="cert-page-cert-inner-div">
        <img src={all_logo} style={{ width: "100%" }} alt="all-logo" />
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <img
              className="cert-page-logo-img"
              src={yi_logo}
              alt="yi-logo"
            ></img>
          </div>
          <div className="col-lg-4 col-md-4">
            <img
              className="cert-page-logo-img"
              src={yuva_logo}
              alt="yuva-logo"
            ></img>
          </div>
          <div className="col-lg-4 col-md-4">
            <img
              className="cert-page-logo-img"
              style={{ width: "70%" }}
              src={cii_logo}
              alt="cii-logo"
            ></img>
          </div>
        </div>

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
            fontSize: "0.9rem",
            letterSpacing: "0.00px",
          }}
        >
          OF COMPLETION
        </h6>
        <h2 class="cert-page-cert-name-text">Apoorv Jain</h2>
        <p
        // style={
        // {
        // fontFamily: "var(--font-family-2)",
        // fontSize: "0.8rem",
        // letterSpacing: "0.001px",
        // margin: "0",
        // fontSize: "0.8rem",
        // }
        // }
        >
          has successfully completed the course on Water Management (1234444)
          {/* <br /> */}
          {certInfo.name} on 6th februrary 2023
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
};

export default CertPage;
