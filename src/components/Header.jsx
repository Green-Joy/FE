import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Header.css";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">LOGO</Link></li>
          <li><Link to="/feed">Feed</Link></li>
          <li><Link to="/event">Event</Link></li>
          <li><Link to="/challenge">Challenge</Link></li>
          <li><Link to="">Donation</Link></li>
          <li><Link to="/login">LogIn</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
