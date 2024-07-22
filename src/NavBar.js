import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/navbar.css';

const NavBar = () => {
  const loggedIn = sessionStorage.getItem('loggedIn')
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/');
    console.log('Logout successful!')
  }

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/catalog">Catalog</Link>
      {loggedIn ? (
        <>
        <Link to="/account">My Account</Link>
        <button 
          onClick={handleLogOut}
          className="logout"> Log Out </button>
        </>
      ) : (
        <Link to="/login">Log in</Link>
      )
      }
    </div>
  );
}

export default NavBar;
