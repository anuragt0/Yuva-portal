import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css";
import logo from "../yuva_logo2.png";
import { SERVER_ORIGIN } from "../utilities/constants";

const Login = (props) => {
  // const navigate = useNavigate();
  console.log(SERVER_ORIGIN);

  const [creds, setCreds] = useState({ userId: "", password: "" });
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_ORIGIN}/api/user/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      const { statusText, token } = await response.json();
      console.log(statusText);
      console.log(token);

      if (token) {
        // Save the auth token and redirect
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setCreds((prevCreds) => {
      return { ...prevCreds, [e.target.name]: e.target.value };
    });

    // console.log(creds);
  };

  return (
    <div>
      <section>
        {/* <div className="container-fluid h-custom my-5"> */}
        <div className=" pv " style={{ display: "flex", marginTop: "100px" }}>
          <div className="col-md-9 col-lg-6 col-xl-5 left">
            <img
              src={logo}
              style={{ borderRadius: "45px" }}
              className="img-fluid"
              alt="Sample image"
            />
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 logindiv right">
            <form
              className="my-4"
              style={{ padding: "20px", paddingTop: "70px" }}
            >
              <h3 style={{ marginBottom: "27px", fontSize: "1.5em" }}>
                Sign in
              </h3>

              <div className="form-outline mb-4">
                <input
                  style={{ borderRadius: "0px", fontSize: "25px" }}
                  className="form-control form-control-lg"
                  id="floatingInput"
                  name="userId"
                  placeholder="Username"
                  value={creds.userId}
                  onChange={onChange}
                />
                {/* <label className="form-label" htmlFor="floatingInput">Email</label> */}
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  style={{ borderRadius: "0px", fontSize: "25px" }}
                  className="form-control form-control-lg"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={creds.password}
                  onChange={onChange}
                />
                {/* <label className="form-label" htmlFor="floatingPassword">Password</label> */}
              </div>

              {/* <div className="d-flex justify-content-between align-items-center">
            
            <Link  className="text-body" to="/signup">Forgot password?</Link>
          </div> */}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  style={{
                    borderRadius: "0px",
                    width: "150px",
                    fontSize: "25px",
                  }}
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                {/* <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                className="link-danger">Register</Link></p> */}
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
