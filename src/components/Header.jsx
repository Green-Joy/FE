import React, { useState, useEffect } from "react";
import { IoLeaf } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import axios from "axios";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const randomId = localStorage.getItem("randomId");
    if (randomId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("randomId");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <IoLeaf />
              Green Joy
            </Link>
          </li>
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
          <li>
            <Link to="/challenge">Challenge</Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link to="/login">LogIn</Link>
            </li>
          ) : (
            <li onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </li>
          )}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
