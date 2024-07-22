import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

const NavBar = () => {
  logged = sessionStorage.getItem('loggedIn')
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/catalog">Catalog</Link>
      <Link to="/login">My Account</Link>
    </div>
  );
}

export default NavBar;
