import React from 'react';

const UserAccount = () => {
  // Dummy data for user
  const user = {
    name: 'John Doe',
    borrowedBooks: [
      { id: 1, title: 'Book 1', dueDate: '2024-07-10' },
      { id: 2, title: 'Book 2', dueDate: '2024-07-15' },
    ]
  };

  return (
    <div>
      <h1>{user.name}'s Account</h1>
      <h2>Borrowed Books</h2>
      {user.borrowedBooks.map(book => (
        <div key={book.id} className="card">
          <h3>{book.title}</h3>
          <p>Due Date: {book.dueDate}</p>
        </div>
      ))}
    </div>
  );
}

export default UserAccount;
