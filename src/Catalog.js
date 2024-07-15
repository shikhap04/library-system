// import React from 'react';
// import { Link } from 'react-router-dom';

// const Catalog = () => {
//   // Dummy data for books
//   const books = [
//     { id: 1, title: 'Book 1', author: 'Author 1' },
//     { id: 2, title: 'Book 2', author: 'Author 2' },
//   ];

//   return (
//     <div>
//       <h1>Catalog</h1>
//       {books.map(book => (
//         <div key={book.id} className="card">
//           <h3>{book.title}</h3>
//           <p>by {book.author}</p>
//           <Link to={`/book/${book.id}`}>Details</Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Catalog;


import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Catalog = () => {
  // Dummy data for books
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ];
  const [resources, setresources] = useState([]);
  const [error, setError] = useState(null);
  
  console.log("its here!!");
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/resources');
        console.log('AXIOS', response);
        setresources(response.data);
      }
      catch (error) {
        setError(error.message);
        console.log('Issue with fetching');
      }
    };
    fetchResources();
  }, []);
  if (error) {
    return<div>Error: {error}</div>
  }
  console.log(typeof(resources));

  return (
    <div>
      <h1>Catalog</h1>
      <input placeholder="Search resources" />
      {Array.isArray(resources) && resources.length > 0 ? (
        resources.map(resource => (
          <div key={resource.resource_id} className="card">
            <h3>{resource.resource_name}</h3>
            <p>Author: {resource.author}</p>
            <p>Location: {resource.location}</p>
            <p>Description: {resource.resource_description}</p>
            <p>Genre: {resource.genre}</p>
            <p>Total Copies: {resource.total_copies}</p>
            <p>Copies Available: {resource.copies_available}</p>
            <p>Version: {resource.resource_version}</p>
            <p>Type: {resource.resource_type}</p>
            <Link to={`/resource/${resource.resource_id}`}>Details</Link>
          </div>
        ))
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
}

export default Catalog;
