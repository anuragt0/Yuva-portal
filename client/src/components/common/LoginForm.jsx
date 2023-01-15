import React from "react";
import "../../css/common/login-form.css";

export const LoginForm = (props) => {
  const handleChange = (e) => {
    props.onChange(e); // Need to pass the whole event, passing updatedField just gives the last entered character of the input
  };

  const handleLogInClick = () => {
    props.onClick();
  };

  return (
    <div className="outer-div">
      <p className="heading">Log In</p>
      <input
        className="form-input"
        type="text"
        placeholder={props.role === "user" ? "User Id" : "Admin Id"}
        name={props.role === "user" ? "userId" : "adminId"}
        value={props.role === "user" ? props.userId : props.adminId}
        onChange={handleChange}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Password"
        name="password"
        value={props.password}
        onChange={handleChange}
      />
      <button className="form-btn" onClick={handleLogInClick}>
        Log In
      </button>
      <p className="forgot-pass-text">Forgot your password</p>
    </div>
  );
};
