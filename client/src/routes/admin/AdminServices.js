import React from "react";
import { useNavigate } from "react-router-dom";

const AdminServices = () => {
  const navigate = useNavigate();

  function handleClick(e) {
    console.log(e.target.name);
    navigate("/admin/" + e.target.name);
  }

  return (
    <button onClick={handleClick} name="verticals">
      Verticals
    </button>
  );
};

export default AdminServices;
