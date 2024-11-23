import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev); // Toggle the state of the menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">SIGMA</a>
        <div className="hamburger" onClick={toggleMenu}>
          {/* Hamburger Icon */}
          <div className={`line ${menuActive ? "open" : ""}`}></div>
          <div className={`line ${menuActive ? "open" : ""}`}></div>
          <div className={`line ${menuActive ? "open" : ""}`}></div>
        </div>
        <ul className={`navbar-links ${menuActive ? "active" : ""}`}>
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
