import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">SIGMA</a>
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#faculty">Faculty</a></li>
          <li><a href="#events">Events</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
