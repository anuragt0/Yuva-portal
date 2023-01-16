import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/yi_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <div style={{ padding: "0 3%" }}>
      <nav
        style={{ backgroundColor: "white", padding: "0.7% 3%" }}
        className="navbar navbar-expand-lg fixed-top"
      >
        <img src={img} alt="" style={{ width: "5.5%", marginRight: "2%" }} />
        <button
          type="button"
          className="navbar-toggler"
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
            style={{ position: "absolute", right: "3%" }}
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
                  <button
                    style={{
                      backgroundColor: "var(--yuva-orange)",
                      color: "white",
                      borderRadius: "0.4rem",
                      height: "2.2rem",
                      width: "fit-content",
                      padding: "0 1rem 0 1rem",
                      fontWeight: "600",
                      border: "none",
                    }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
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
