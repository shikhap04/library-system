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
import CreateAccount from './CreateAccount';
import CheckoutApproval from './CheckoutApproval';
import ReturnApproval from './ReturnApproval';
import CheckoutApprovalPage from './CheckoutApprovalPage'
import ReturnApprovalPage from './ReturnApprovalPage'

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
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/checkouts" element={<CheckoutApproval />} />
          <Route path="/returns" element={<ReturnApproval />} />
          <Route path="/checkoutapproval/:user/:id/:checkdate" element={<CheckoutApprovalPage />} />
          <Route path="/returnapproval/:user/:id/:checkdate" element={<ReturnApprovalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;