
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ResourceCard from './ResourceCard';

const Catalog = () => {
  
  const [resources, setresources] = useState([]);
  const [error, setError] = useState(null);
  
  //console.log("its here!!");
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3001/resources/all');
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
      {Array.isArray(resources) && resources.length > 0 ? (
        resources.map(resource => (
          <ResourceCard key={resource.resource_id} resource={resource} />
        ))
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
}

export default Catalog;
