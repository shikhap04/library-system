import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();

  // Dummy data for book details
  const book = {
    id: id,
    title: `Book ${id}`,
    author: `Author ${id}`,
    description: `This is the description for book ${id}.`
  };

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>{book.description}</p>
    </div>
  );
}

export default BookDetails;



