import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../yuva_logo.png";

import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  // const showUserProfile = ()=>{
  //     navigate('/profile')
  // }
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // if(localStorage.getItem('token')){
    //   fetch(`http://localhost:5000/api/auth/getuser`, {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'auth-token': localStorage.getItem('token')
    //       }
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //       // console.log('USER IS:', data);
    //       if(data.role==='admin'){
    //           setIsAdmin(true);
    //       }
    //       console.log(data);
    //   })
    //   .catch((error) => {
    //       console.error('Error:', error);
    //   });
    // }
  }, []);

  return (
    <div>
      <section class="abc" style={{ backgroundColor: "white", height: "58px" }}>
        <nav
          class="navbar navbar-expand-md navbar-dark"
          style={{ paddingTop: "3.5px" }}
        >
          <a class="navbar-brand p-0" href="/">
            <h1 class="h1">
              <img src={logo} width={"35%"} alt="err" />
            </h1>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ml-auto" style={{ paddingRight: "30px" }}>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/courses">
                  Courses
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contactus">
                  Contact Us
                </a>
              </li>
              {!localStorage.getItem("token") ? (
                <li
                  class="nav-item"
                  style={{ position: "absolute", right: "30px" }}
                >
                  <a class="nav-link" href="/user/login">
                    LogIn
                  </a>
                </li>
              ) : (
                <>
                  {/* CHECK IF USER IS ADMIN */}
                  {/* {console.log("ISADMIN: ", isAdmin)} */}
                  {isAdmin ? (
                    <>
                      <li className="nav-item active">
                        <Link className="nav-link active mx-3" to="/admin">
                          <button className="btn btn-success">
                            Admin panel
                          </button>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <p></p>
                  )}
                  <button
                    className="mx-3"
                    style={{
                      height: "50px",
                      position: "absolute",
                      right: "120px",
                    }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <i className="fa-solid fa-user "></i>
                  </button>
                  <li
                    class="nav-item"
                    onClick={handleLogout}
                    style={{ position: "absolute", right: "60px" }}
                  >
                    <a class="nav-link" href="/login" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </section>
      <section class="line">
        <div class="line1"></div>
      </section>

      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          By - Praveen Sir
        </a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link active"  to="/">
                Home 
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link active"  to="/courses">
                Courses 
              </Link>
            </li>
            
            <li className="nav-item active">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>

          </ul>
          <ul className="nav navbar-nav navbar-right">
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <li className="nav-item active">
                  <Link className="nav-link active mx-3" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link active mx-3" to="/signup">
                    Sign up
                  </Link>
                </li>
              </form>
            ) : (
                <>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
              </>
            )}
          </ul>
        </div>
      </nav> */}
    </div>
  );
};

export default Navbar;
