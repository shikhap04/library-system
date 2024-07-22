import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/navbar.css';

import Home from './Home';
import Catalog from './Catalog';
import NavBar from './NavBar';
import UserAccount from './UserAccount';
import BookDetails from './BookDetails';
import SearchPage from './Search';
import LogIn from './LogIn';
import newAccount from './newAccount';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/logIn" element={<LogIn/>} />
          <Route path="/newAcount" element={<newAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;