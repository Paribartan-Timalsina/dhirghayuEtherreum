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
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
