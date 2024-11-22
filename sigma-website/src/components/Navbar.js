import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">SIGMA</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/faculty">Faculty</Link></li>
        <li><Link to="/achievements">Achievements</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
