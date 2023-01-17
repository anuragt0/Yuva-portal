import React from "react";
import { useNavigate } from "react-router-dom";

const AdminServices = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="my-3">Welcome to the platform analysis</h1>

      <div className="card w-75 my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Verticals</h5>
          <p className="card-text">
            Get all the information about each vertical available on this
            platform.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/admin/verticals/all");
            }}
          >
            Verticals
          </button>
        </div>
      </div>

      <div className="card w-75 my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Verticals</h5>
          <p className="card-text">
            Add a csv/excel file and add new users' credentials on the go!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/admin/add-users");
            }}
          >
            Add Users
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminServices;
