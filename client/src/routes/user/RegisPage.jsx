import React, { useState } from "react";
import { toast } from "react-hot-toast";

// My components
import SecCard from "../../components/user/SecCard";

// My css
import regisCss from "../../css/user/regis-page.module.css";

import { SERVER_ORIGIN, vars } from "../../utilities/constants";
import { validateRegisForm } from "../../utilities/helper_functions";

const GreenMsg = (props) => {
  return (
    <>
      {" "}
      |{" "}
      <span style={{ color: "green", fontWeight: "600" }}>
        {props.children}
      </span>
    </>
  );
};

const RedMsg = (props) => {
  return (
    <>
      {" "}
      |{" "}
      <span style={{ color: "red", fontWeight: "600" }}>{props.children}</span>
    </>
  );
};

const UserRegis = (props) => {
  const [regisDetails, setRegisDetails] = useState({
    email: "a",
    userId: "a",
    password: "a",
    cnfrmPassword: "a",

    fName: "aa",
    // mName: "a",
    lName: "a",

    collegeName: "a",
    region: "a",
    branch: "a",

    phone: "a",
    addLine1: "a",
    addLine2: "a",
    city: "a",
    pincode: "a",
    country: "a",
  });

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [wasUserIdAvailabilityChecked, setWasUserIdAvailabilityChecked] =
    useState(false);
  let userIdAvailabilityCheckTimer = null;
  const userIdAvailabilityCheckDelayInMilliSec = 1000;

  const checkUserIdAvailability = async () => {
    // console.log("checking user id availability");
    if (regisDetails.userId === "") {
      return;
    }

    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/user/auth/check-userid-availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: regisDetails.userId }),
        }
      );
      const result = await response.json();
      // console.log(response);
      console.log(result);

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 500) {
          alert("Internal server error"); // todo: toast notify
        }
      } else if (response.ok && response.status === 200) {
        setWasUserIdAvailabilityChecked(true);
        setIsUserIdAvailable(result.isUserIdAvailable);
      } else {
        // for future
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRegisterClick = async () => {
    console.log("regis clicked");

    // todo: trim fields
    // const { isValid, desc } = validateRegisForm(regisDetails);
    // if (!isValid) {
    //   // show toast
    //   return;
    // }

    try {
      // setIsBtnDisabled(true);

      const response = await fetch(`${SERVER_ORIGIN}/api/user/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regisDetails),
      });

      const result = await response.json();
      // console.log(response);
      console.log(result);

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 500) {
          toast.error("Internal server error"); // todo: toast notify
          setIsBtnDisabled(false); // can reclick on register btn
        }
      } else if (response.ok && response.status === 200) {
        toast.success(result.statusText); // regis btn remains disabled
      } else {
        // for future
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setRegisDetails((prevRegisDetails) => {
      const newRegisDetails = {
        ...prevRegisDetails,
        [e.target.name]: e.target.value,
      };
      // console.log(newregisDetails);

      return newRegisDetails;
    });
  };

  const UserIdAvailabilityMsg = (props) => {
    return wasUserIdAvailabilityChecked ? (
      isUserIdAvailable ? (
        <GreenMsg>Available</GreenMsg>
      ) : (
        <RedMsg>Not available</RedMsg>
      )
    ) : null;
  };

  return (
    <div className={regisCss.outerDiv}>
      <SecCard>
        <h2 className="text-ff1">Registration</h2>

        <div className="text-ff2" autoComplete="off">
          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="userId">
              User ID <UserIdAvailabilityMsg />
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="userId"
              name="userId"
              placeholder="xyz@*123$"
              autoComplete="off"
              maxLength={vars.regisForm.userId.maxLen}
              value={regisDetails.userId}
              onChange={onChange}
              onKeyDown={() => {
                clearTimeout(userIdAvailabilityCheckTimer);
                setWasUserIdAvailabilityChecked(false);
              }}
              onKeyUp={() => {
                clearTimeout(userIdAvailabilityCheckTimer);
                userIdAvailabilityCheckTimer = setTimeout(
                  checkUserIdAvailability,
                  userIdAvailabilityCheckDelayInMilliSec
                );
              }}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="pass">
              Password
            </label>
            <input
              className={regisCss.regisInput}
              type="password"
              id="password"
              name="password"
              placeholder="@ddx*12fqa3$"
              autoComplete="off"
              maxLength={vars.regisForm.pass.maxLen}
              value={regisDetails.pass}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="cnfrmPass">
              Confirm Password
            </label>
            <input
              className={regisCss.regisInput}
              type="password"
              id="cnfrmPassword"
              name="cnfrmPassword"
              placeholder="@ddx*12fqa3$"
              autoComplete="off"
              maxLength={vars.regisForm.cnfrmPass.maxLen}
              value={regisDetails.cnfrmPass}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="email">
              Email
            </label>
            <input
              className={regisCss.regisInput}
              type="email"
              id="email"
              name="email"
              placeholder="xyz@gmail.com"
              value={regisDetails.email}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="fName">
              First name
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="fName"
              name="fName"
              placeholder="Apoorv"
              autoComplete="off"
              maxLength={vars.regisForm.fName.maxLen}
              value={regisDetails.fName}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="mName">
              Middle name (Optional)
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="mName"
              name="mName"
              placeholder="Jain"
              autoComplete="off"
              maxLength={vars.regisForm.mName.maxLen}
              value={regisDetails.mName}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="lName">
              Last name
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="lName"
              name="lName"
              placeholder="Jain"
              autoComplete="off"
              maxLength={vars.regisForm.lName.maxLen}
              value={regisDetails.lName}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="collegeName">
              College name
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="collegeName"
              name="collegeName"
              placeholder="Lakshmi Narain College of Technology"
              autoComplete="off"
              maxLength={vars.regisForm.collegeName.maxLen}
              value={regisDetails.collegeName}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="region">
              Region
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="region"
              name="region"
              placeholder="Region"
              autoComplete="off"
              maxLength={vars.regisForm.region.maxLen}
              value={regisDetails.region}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="branch">
              Branch
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="branch"
              name="branch"
              placeholder="Computer Science and Engineering"
              autoComplete="off"
              maxLength={vars.regisForm.branch.maxLen}
              value={regisDetails.branch}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="phone">
              Phone
            </label>
            <input
              className={regisCss.regisInput}
              type="tel"
              id="phone"
              name="phone"
              placeholder="9998887776"
              autoComplete="off"
              maxLength={vars.regisForm.phone.maxLen}
              pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              value={regisDetails.phone}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="addLine1">
              Address line 1
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="addLine1"
              name="addLine1"
              placeholder="Address line 1"
              autoComplete="off"
              maxLength={vars.regisForm.addLine1.maxLen}
              pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              value={regisDetails.addLine1}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="addLine2">
              Address line 2
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="addLine2"
              name="addLine2"
              placeholder="Address line 2"
              autoComplete="off"
              maxLength={vars.regisForm.addLine2.maxLen}
              value={regisDetails.addLine2}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="city">
              City
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="city"
              name="city"
              placeholder="Vidisha"
              autoComplete="off"
              maxLength={vars.regisForm.city.maxLen}
              value={regisDetails.city}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="pincode">
              Pincode
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="pincode"
              name="pincode"
              placeholder="464001"
              autoComplete="off"
              maxLength={vars.regisForm.pincode.maxLen}
              value={regisDetails.pincode}
              onChange={onChange}
            />
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label className={regisCss.regisLabel} htmlFor="country">
              Country
            </label>
            <input
              className={regisCss.regisInput}
              type="text"
              id="country"
              name="country"
              placeholder="India"
              autoComplete="off"
              maxLength={vars.regisForm.country.maxLen}
              value={regisDetails.country}
              onChange={onChange}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={handleRegisterClick}
              className={regisCss.regisBtn}
              disabled={isBtnDisabled}
            >
              Register
            </button>
          </div>
        </div>
      </SecCard>
    </div>
  );
};

export default UserRegis;
