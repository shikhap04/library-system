
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Catalog = () => {
  
  const [resources, setresources] = useState([]);
  const [error, setError] = useState(null);
  
  console.log("its here!!");
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/resources');
        //console.log('AXIOS', response);
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
  //console.log(typeof(resources));

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
          </div>
        ))
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
}

export default Catalog;
