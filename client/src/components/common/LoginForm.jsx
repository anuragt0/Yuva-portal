import React from "react";

// My css
import "../../css/common/login-form.css";
// ! Disable login button when loading by creating isLoading state, so user cannot press it again and again

export const LoginForm = (props) => {
  const handleChange = (e) => {
    props.onChange(e); // Need to pass the whole event, passing updatedField just gives the last entered character of the input
  };

  const handleLogInClick = () => {
    props.onClick();
  };

  return (
    <div className="login-form-outer-div">
      <p className="login-form-heading">Login</p>
      <input
        className="login-form-input"
        type="text"
        placeholder={props.role === "user" ? "User Id" : "Admin Id"}
        name={props.role === "user" ? "userId" : "adminId"}
        value={props.role === "user" ? props.userId : props.adminId}
        onChange={handleChange}
      />
      <input
        className="login-form-input"
        type="text"
        placeholder="Password"
        name="password"
        value={props.password}
        onChange={handleChange}
      />
      <button
        className="login-form-btn"
        onClick={handleLogInClick}
        disabled={props.isBtnDisabled}
      >
        Login
      </button>
      <p className="login-form-forgot-pass-text">Forgot your password ?</p>
    </div>
  );
};
