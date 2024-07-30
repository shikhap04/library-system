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

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>{book.description}</p>
      <form onSubmit={handleCheckout}>
        <button type="submit"
        className='inputsubmit'
        >Request Check Out</button>
      </form>
    </div>
  );
}

export default BookDetails;