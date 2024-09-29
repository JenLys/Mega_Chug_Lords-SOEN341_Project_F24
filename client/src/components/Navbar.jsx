import React from 'react';
import logo from '../assets/reviewmatelogo.jpg';


const Navbar = () => {
  return(
    <nav className="navbar">
        <img src={logo} alt="ReviewMate Logo" className="logo" />
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li><a href="/how-to-use">HOW TO USE</a></li>
        </ul>
      </nav>
  );
};

  export default Navbar;