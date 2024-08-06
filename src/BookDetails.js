import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const userid = sessionStorage.getItem('id');
  const resourceid = id;

  // Dummy data for book details
  const book = {
    bookid: id,
    title: `Book ${id}`,
    author: `Author ${id}`,
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
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>{book.description}</p>
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