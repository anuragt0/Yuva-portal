import React from "react";
import "../../css/user/login.css";
import "../../css/vars.css";

export const LoginForm = (props) => {
  const handleChange = (e) => {
    props.onChange(e);
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
        placeholder="User Id"
        name="userId"
        value={props.userId}
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
