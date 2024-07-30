import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ResourceCard from './ResourceCard';

const UserAccount = () => {
  const [checkouts, setcheckouts] = useState([]);
  const [error, setError] = useState(null);
  const userid = sessionStorage.getItem('id');
  
  // Dummy data for user
    const levels = ['Member', 'Employee', 'Administrator'];
  

  const user = {
    name: sessionStorage.getItem('username'),
    accountLevel: sessionStorage.getItem('accountLevel'),
    title: levels[sessionStorage.getItem('accountLevel') - 1],
    borrowedBooks: [
      { id: 1, title: 'Book 1', dueDate: '2024-07-10' },
      { id: 2, title: 'Book 2', dueDate: '2024-07-15' },
    ]
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
        checkouts.map(resource => (
          <ResourceCard key={resource.resource_id} resource={resource} />
        ))
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
}

export default UserAccount;
