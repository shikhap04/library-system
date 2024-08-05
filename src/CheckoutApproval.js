import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CheckoutCard from './CheckoutCard';

const CheckoutApproval = () => {
  
  const [checkouts, setcheckouts] = useState([]);
  const [error, setError] = useState(null);
  
  //console.log("its here!!");
  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employee/checkouts');
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

   return (
    <div>
      <h1>Ongoing Checkouts</h1>
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

export default CheckoutApproval;