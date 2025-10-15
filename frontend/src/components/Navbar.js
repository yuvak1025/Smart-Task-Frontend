import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={handleLogout} style={{ cursor: "pointer" }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
