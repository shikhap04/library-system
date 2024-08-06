import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CheckoutCard from './CheckoutCard';

const UserAccount = () => {
  const [checkouts, setcheckouts] = useState([]);
  const [error, setError] = useState(null);
  const userid = sessionStorage.getItem('id');
  
  // Dummy data for user
    const levels = ['Member', 'Employee', 'Administrator'];
  

  const user = {
    name: sessionStorage.getItem('username'),
    accountLevel: sessionStorage.getItem('accountLevel'),
    title: levels[sessionStorage.getItem('accountLevel') - 1]
  };

  //console.log("its here!!");
  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.post('http://localhost:3001/account/checkouts', {userid});
        //console.log('AXIOS', response);
        setcheckouts(response.data);
      }
      catch (error) {
        setError(error.message);
        console.log('Issue with fetching');
      }
    };
    fetchCheckouts();
  }, []);
  if (error) {
    return<div>Error: {error}</div>
  }
  //console.log(typeof(resources));

  return (
    <div>
      <h1>{user.name}'s Account</h1>
      <p>Account Status: {user.title}</p>
      <h2>Borrowed Books</h2>
      {Array.isArray(checkouts) && checkouts.length > 0 ? (
        checkouts.map(checkout => (
          <CheckoutCard key={checkout.resource_id} checkout={checkout} />
        ))
      ) : (
        <p>No current checkouts</p>
      )}
    </div>
  );
}

export default UserAccount;
