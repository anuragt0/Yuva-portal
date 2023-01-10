import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../css/user/user-login.css";
import logo from "../../yuva_logo2.png";
import { SERVER_ORIGIN } from "../../utilities/constants";
import { LoginForm } from "../../components/common/LoginForm";

const UserLogin = () => {
  const [creds, setCreds] = useState({ userId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_ORIGIN}/api/user/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      const { statusText, token } = await response.json();
      //   console.log(statusText);
      console.log(token);

      setIsLoading(false);

      if (token) {
        localStorage.setItem("token", token);
        navigate("/user"); // redirect to Home Page
      } else {
        // throw some error
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

  const updateCreds = (e) => {
    setCreds((prevCreds) => {
      const newCreds = { ...prevCreds, [e.target.name]: e.target.value };
      console.log(newCreds);

      return newCreds;
    });
  };

  return (
    <div className="user-login-outer-div">
      {/* <ToastContainer /> */}
      <img src={logo} alt="yuva-big-logo" className="user-login-yuva-img"></img>
      <LoginForm
        userId={creds.userId}
        password={creds.password}
        onChange={updateCreds}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default UserLogin;
