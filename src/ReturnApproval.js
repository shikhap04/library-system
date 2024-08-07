import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CheckoutCard from './CheckoutCard';

const ReturnApproval = () => {
  
  const [checkouts, setcheckouts] = useState([]);
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem('username');
  
  //console.log("its here!!");
  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employee/returns');
        //console.log('AXIOS', response);
        setcheckouts(response.data);
      }
      catch (error) {
        setError(error.message);
        console.log('Issue with fetching');
      }
    };
    fetchReturns();
  }, []);
  if (error) {
    return<div>Error: {error}</div>
  }

   return (
    <div>
      <h1>Ongoing Returns</h1>
      {Array.isArray(checkouts) && checkouts.length > 0 ? (
        checkouts.map(checkout => (
          <CheckoutCard key={checkout.resource_id} checkout={checkout} />
        ))
      ) : (
        <p>No current returns</p>
      )}
    </div>
  );
}

export default ReturnApproval;