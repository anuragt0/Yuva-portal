import React from "react";
import { useNavigate } from "react-router-dom";

const AdminServices = () => {
  const navigate = useNavigate();

  function handleClick(e) {
    console.log(e.target.name);
    navigate("/admin/" + e.target.name);
  }

  return (
    <>
    <h1 className='my-3'>Welcome to the platform analysis</h1>

            <div className="card w-75 my-5 mx-3">
            <div className="card-body">
                <h5 className="card-title">Verticals</h5>
                <p className="card-text">Get all the information about each vertical available on this platform.</p>
                <button className="btn btn-primary" onClick={handleClick} name="verticals">Verticals</button>
            </div>
            </div>
    </>
  );
};

export default AdminServices;
