import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const SearchCatalog = () => {
  const [query, setQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/search', { query });
      setResources(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResources([]);
    }
  };

  var buttonPressed = false;

  return (
    <div>
      <h1>Search</h1>
      <p>Easy way to look up information about your upcoming book!</p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <div>Error: {error}</div>}
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
            <Link to={`/resources/${resource.resource_id}`}>Details</Link>
          </div>
        ))
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
};

export default SearchCatalog;
