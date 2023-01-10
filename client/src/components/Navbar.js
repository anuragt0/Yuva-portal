import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../yuva_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <div style={{ padding: "0 3%" }}>
      <nav className="navbar navbar-expand-lg">
        <img src={img} alt="" style={{ width: "5.5%", marginRight: "2%" }} />
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link active" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link active" to="/user/verticals/all">
                Verticals
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link active" to="/user/about">
                About
              </Link>
            </li>
          </ul>
          <ul
            className="nav navbar-nav navbar-right"
            style={{ position: "absolute", right: "0%" }}
          >
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <li className="nav-item active">
                  <Link className="nav-link active mx-3" to="/user/login">
                    Login
                  </Link>
                </li>
              </form>
            ) : (
              <>
                <li className="nav-item active">
                  <Link className="nav-link active" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
