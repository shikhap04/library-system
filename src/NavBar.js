import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/navbar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const loggedIn = sessionStorage.getItem('loggedIn')
  const currAccountLevel = sessionStorage.getItem('accountLevel')
  var isAdmin = false;
  var isEmployee = false;
  if (currAccountLevel == 3) {
    isAdmin = true;
    isEmployee = true;
  } else if (currAccountLevel == 2) {
    isEmployee = true;
  }

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
      {isEmployee && 
        <Link to="/createaccount"> Create Account</Link>
      }
      {isEmployee &&
        <Link to="/checkouts">Checkouts</Link>
      }
      {isEmployee &&
        <Link to="/returns">Returns</Link>
      }
      {loggedIn ? (
        <>
        <Link to="/account">My Account</Link>
        <button 
          onClick={handleLogOut}
          className="logout"> Log Out </button>
        </>
        ) : (
          <Link to="/login">Log In</Link>
        )
      }
    </div>
  );
}

export default NavBar;
