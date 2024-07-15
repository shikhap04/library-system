import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/search">Search Page</Link>
      <Link to="/catalog">Catalog</Link>
      <Link to="/account">My Account</Link>
    </div>
  );
}

export default NavBar;
