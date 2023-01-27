import React, { useState } from "react";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

// My components
import Cert from "../../components/user/Cert";
import SecCard from "../../components/user/SecCard";

// My css
import "../../css/user/u-cert-page.css";

// My assets
import yi_logo from "../../assets/images/yi_logo.png";
import yuva_logo from "../../assets/images/yuva_logo.png";
import cii_logo from "../../assets/images/cii_logo.jpg";
import trophy_logo from "../../assets/images/trophy_logo.jpg";
import sign from "../../assets/images/sign.png";
import { downloadCertificate } from "../../utilities/helper_functions";

const CertPage = () => {
  const [certInfo, setCertInfo] = useState({
    name: "",
  });

  const handleCertPDFDownload = () => {
    // console.log("downloading");

    downloadCertificate();
  };

  return (
    <div className="cert-page-outer-div">
      <div className="row">
        <div className="col-lg-8">
          <div>
            <Cert />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <SecCard>
              <p className="text-ff2">
                This certificate above verifies that Apoorv Jain successfully
                completed the course The Complete 2023 Web Development Bootcamp
                on 06/10/2022 as taught by Dr. Angela Yu on Udemy. The
                certificate indicates the entire course was completed as
                validated by the student. The course duration represents the
                total video hours of the course at time of most recent
                completion.
              </p>
            </SecCard>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cert-page-cert-info-div">
            <p className="cert-page-holder-text">Certificate holder name:</p>
            <h3 className="cert-page-holder-name">Apoorv Jain</h3>

            <p className="cert-page-holder-text">Course name:</p>
            <h3 className="cert-page-holder-name">
              Water Management and resources
            </h3>

            <hr></hr>

            <button
              className="cert-page-cert-download-btn"
              onClick={handleCertPDFDownload}
            >
              Download PDF
            </button>
            <p className="cert-page-share-text text-ff2 text-center">
              Or share on
            </p>
            <div className="cert-page-share-btns-div">
              <LinkedinShareButton url="skdnj">
                <LinkedinIcon
                  className="cert-page-share-icon"
                  size={55}
                  round={true}
                />
              </LinkedinShareButton>

              <FacebookShareButton url="skdnj">
                <FacebookIcon
                  className="cert-page-share-icon"
                  size={55}
                  round={true}
                />
              </FacebookShareButton>

              <TwitterShareButton url="skdnj">
                <TwitterIcon
                  className="cert-page-share-icon"
                  size={55}
                  round={true}
                />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertPage;
