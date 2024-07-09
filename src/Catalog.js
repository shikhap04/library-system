import React from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
  // Dummy data for books
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ];

  return (
    <div>
      <h1>Catalog</h1>
      {books.map(book => (
        <div key={book.id} className="card">
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          <Link to={`/book/${book.id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Catalog;
