import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const userid = sessionStorage.getItem('id');
  const resourceid = id;
  const resource_id = id;
  const [resource, setResource] = useState({
    id: '',
    resource_name: '',
    author: '',
    location: 0,
    resource_description: '',
    genre: '',
    total_copies: '',
    copies_available: '',
    resource_version: '',
    resource_type: '',
  })

  useEffect(() => {
    const getResource = async () => {
      try {
        const field = "resource_id";
        const query = resource_id;
        console.log('use effect checking ', field, query);
        console.log(query, typeof(query));
        const response = await axios.post('http://localhost:3001/resources/search', { field, query });
        console.log(response.data);
        setResource(response.data[0]);
        console.log(resource);
      }
      catch (error) {
        console.log('error in use effect', error);
      }
    };
    getResource();
  }, [resource_id]);


  // Dummy data for book details
  const book = {
    bookid: resource_id,
    title: `Book ${resource_id}`,
    author: `Author ${resource_id}`,
    description: `This is the description for book ${id}.`
  };

  // Handles checking out selected book
  const handleCheckout = async() => {
    console.log('handling checkout');
    try {
      const response = await axios.post('http://localhost:3001/resources/checkout', { userid, resourceid });
      if (response.status === 200) {
        setSuccess('Checkout completed successfully!')
        setError(null)
      }
      else {
        setError('No availabilty')
        setSuccess(null)
      }
    } catch(error) {
      console.log('ERROR in checking out', error);
    }
  };

  // Handles returning selected book
  const handleReturn = async() => {
    try {
      const response = await axios.post('http://localhost:3001/resources/return', { userid, resourceid });
      if (response.status === 200) {
        setSuccess('Return completed successfully!')
        setError(null)
      }
      else {
        setError('No availabilty')
        setSuccess(null)
      }
    } catch(error) {
      console.log('ERROR in returning', error);
    }
  };
  return (
    <div>
      <h1>{resource.resource_name}</h1>
      <h2>by {resource.author}</h2>
      <p>{resource.description}</p>
      <form onSubmit={handleCheckout}>
        <button
        type="submit"
        className='inputsubmit'
        >Request Check Out</button>
      </form>
      <form onSubmit={handleReturn}>
        <button 
        type="submit"
        className='inputsubmit'
        >Request Return</button>
      </form>
    </div>
  );
}

export default BookDetails;