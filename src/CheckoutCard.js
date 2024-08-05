import React from 'react';
import {Link} from 'react-router-dom';
import './css/card.css'

const CheckoutCard = ({checkout}) => {
    var isEmployee = false;
    const currAccountLevel = sessionStorage.getItem('accountLevel');
    if (currAccountLevel >= 2) {
        isEmployee = true;
    }
    const currUser = sessionStorage.getItem('id');

    return (
        <div key={checkout.resource_id} className="card">
            <h3>{checkout.resource_name}</h3>
            <p>Author: {checkout.author}</p>
            <p>Checkout Date: {(checkout.checkout_date).slice(0,10)}</p>
            <p>Due Date: {checkout.due_date.slice(0, 10)}</p>
            <p>Checkout Approved: {checkout.checkout_approved}</p>
            <p>Return Approved: {checkout.return_approved}</p>
            {isEmployee && <p>User ID: {checkout.user_id}</p>}
            {(currUser == checkout.user_id) && (checkout.checkout_approved == true) && (checkout.resource_returned == false) && <Link to={`/book/${checkout.resource_id}`}>Return</Link>}
            <p></p>
            {isEmployee && (checkout.checkout_approved == false) && <Link to={`/checkoutapproval/${checkout.user_id}/${checkout.resource_id}/${checkout.checkout_date}`}>Approve Checkout</Link>}
            <p></p>
            {isEmployee && (checkout.checkout_approved == true) && (checkout.resource_returned == true) && (checkout.return_approved == false) && <Link to={`/returnapproval/${checkout.user_id}/${checkout.resource_id}/${checkout.checkout_date}`}>Approve Return</Link>}
          </div>
    )
}

export default CheckoutCard;
