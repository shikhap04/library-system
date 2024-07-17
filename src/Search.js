import React, { useState } from 'react';
import axios from 'axios';
import ResourceCard from './ResourceCard';

const SearchCatalog = () => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('resource_name');
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  /** 
   * Handles search with API and checks that query is not empty and catches other errors
  */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      setError('Search bar cannot be empty. Please try again!');
      setSearched(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/search', { field, query });
      setResources(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResources([]);
    } finally {
      setSearched(true);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <p>Easy way to look up information about your upcoming book!</p>
      <form onSubmit={handleSearch}>
        <select 
          value={field}
          onInput={(e) => setField(e.target.value)}
          onChange={(e) => setQuery('')}
          className = "inputDropDown">
          <option value = "resource_name">Resource Title</option>
          <option value = "author">Author</option>
          <option value = "location">Location</option>
          <option value = "genre">Genre</option>
          <option value = "resource_type">Resource Type</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={query === '' ? 'Search resources...' : ''}
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Search resources...'}
          className = "inputSearch"/>
        <button 
          type="submit"
          className = "inputSubmit"
          onChange={(e) => setQuery('')}>Search</button>
      </form>

      {error && <p style={{ color: 'red'}}>Error: {error}</p>}

      {Array.isArray(resources) && resources.length > 0 && searched? (
        resources.map(resource => (
          <ResourceCard key={resource.resource_id} resource={resource} />
        ))
      ) : (
        searched && <p>No resources available matching description. Please try something else!</p>
      )}
    </div>
  );
};

export default SearchCatalog;
