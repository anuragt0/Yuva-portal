import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/images/yuva_logo.png";
import { SERVER_ORIGIN } from "../../utilities/constants";
import { LoginForm } from "../../components/common/LoginForm";

// My css
import "../../css/admin/admin-login-form.css";

const UserLogin = () => {
  const [creds, setCreds] = useState({ adminId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_ORIGIN}/api/admin/auth/login`, {
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
        navigate("/admin/services"); // redirect to Home Page
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
      // console.log(newCreds);

      return newCreds;
    });
  };

  return (
    <div className="admin-login-outer-div">
      {/* <ToastContainer /> */}
      <img
        src={logo}
        alt="yuva-big-logo"
        className="admin-login-yuva-img"
      ></img>
      <LoginForm
        role="admin"
        adminId={creds.adminId}
        password={creds.password}
        onChange={updateCreds}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default UserLogin;
