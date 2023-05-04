import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  function handleMenuToggle() {
    setShowMenu(!showMenu);
  }

  return (
    <nav className="navbar">
   
      <div className="burger" onClick={handleMenuToggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className={`nav-links ${showMenu ? "show" : ""}`}>
        <li><a href="/getdetails">My details</a></li>
        <li><a href="/booking">My Booking</a></li>
        <li><a href="#">Patient Booking</a></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
