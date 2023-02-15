import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// My components
import SecCard from "../../components/user/SecCard";

// My css
import "../../css/user/u-regis-page.css";

// import "../../App.css";
import { SERVER_ORIGIN } from "../../utilities/constants";

const UserRegis = () => {
  const [info, setInfo] = useState({
    fName: "",
    mName: "",
    lName: "",
    region: "",
    collegeName: "",
    branch: "",
    phone: "",
    addLine1: "",
    addLine2: "",
    city: "",
    pincode: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canVisitPage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const result = await response.json();
        console.log(response);

        console.log(result);

        setIsLoading(false);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
              // redirect to login page, navigate("/user/login");
              console.log("go to login");
            }
          } else {
            alert("Internal server error"); // todo: toast notify
          }
        } else if (response.ok && response.status === 200) {
          if (!result.userDoc.isPassReset) {
            console.log("go to reset password");
          } else if (result.userDoc.isRegistered) {
            console.log("go to home");
          } else {
            console.log("you can visit this page");
          }
        } else {
          // for future
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    canVisitPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_ORIGIN}/api/user/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(info),
      });

      const result = await response.json();
      // console.log(response);

      console.log(result);

      setIsLoading(false);

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 401) {
          if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
            // redirect to login page, navigate("/user/login");
            console.log("go to login");
          }
        } else if (response.status === 403) {
          if (!("isRegistered" in result) || result.isRegistered === true) {
            console.log("go to home*");
          }
        } else {
          alert("Internal server error"); // todo: toast notify
        }
      } else if (response.ok && response.status === 200) {
        console.log("go to home**");
      } else {
        // for future
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setInfo((prevInfo) => {
      const newInfo = { ...prevInfo, [e.target.name]: e.target.value };
      console.log(newInfo);

      return newInfo;
    });
  };

  return (
    <div className="u-regis-page-outer-div">
      <SecCard>
        <h2 className="text-ff1">Registration</h2>

        <form>
          <div class="form-group row profile">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail"
                value="email@email.com"
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="staticUserId" class="col-sm-2 col-form-label">
              UserID
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticUserId"
                value="UserID"
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="fName" class="col-sm-2 col-form-label">
              First Name
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="fName"
                name="fName"
                placeholder="First Name"
                value={info.fName}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="mName" class="col-sm-2 col-form-label">
              Last Name
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="mName"
                name="mName"
                placeholder="Middle Name"
                value={info.mName}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="lName" class="col-sm-2 col-form-label">
              Last Name
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="lName"
                name="lName"
                placeholder="Last Name"
                value={info.lName}
                onChange={onChange}
              />
            </div>
          </div>

          <div class="form-group row profile">
            <label for="region" class="col-sm-2 col-form-label">
              Region
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="region"
                name="region"
                placeholder="Region"
                value={info.region}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="collegeName" class="col-sm-2 col-form-label">
              College name
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="collegeName"
                name="collegeName"
                placeholder="Enter your college name"
                value={info.collegeName}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="branch" class="col-sm-2 col-form-label">
              Branch
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="branch"
                name="branch"
                placeholder="Branch"
                value={info.branch}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="phone" class="col-sm-2 col-form-label">
              Phone
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={info.phone}
                onChange={onChange}
              />
            </div>
          </div>

          <div class="form-group row profile">
            <label for="addLine1" class="col-sm-2 col-form-label">
              Address line 1
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="addLine1"
                name="addLine1"
                placeholder="Address line 1"
                value={info.addLine1}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="addLine2" class="col-sm-2 col-form-label">
              Address line 2
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="addLine2"
                name="addLine2"
                placeholder="Address line 2"
                value={info.addLine2}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="city" class="col-sm-2 col-form-label">
              City
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={info.city}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="pincode" class="col-sm-2 col-form-label">
              Pincode
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="pincode"
                name="pincode"
                placeholder="Pincode"
                value={info.pincode}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row profile">
            <label for="country" class="col-sm-2 col-form-label">
              Country
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="country"
                name="country"
                placeholder="Country"
                value={info.country}
                onChange={onChange}
              />
            </div>
          </div>

          <div style={{ margin: "50px 0 0 44%" }}>
            <button
              onClick={handleSubmit}
              className="btn btn-success update"
              style={{}}
            >
              Update
            </button>
          </div>
        </form>
      </SecCard>
    </div>
  );
};

export default UserRegis;
