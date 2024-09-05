import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  return (
    <nav>
       <h1 style={{ float: "left", font: "normal 38px Cookie, Arial, Helvetica, sans-serif", lineHeight: "40px", margin: "0" }}>
        <a href="/" className="logo">EZ<span style={{ color: "#5383d3" }}>REVIEW</span></a>
      </h1>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined}>
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
