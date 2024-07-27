import React, { useState } from 'react';
import axios from 'axios';
import './css/createResource.css';

const CreateResource = () => {

  const [resource, setResource] = useState({
    resource_name: '',
    author: '',
    location: 0,
    resource_description: '',
    genre: '',
    total_copies: '',
    copies_available: '',
    resource_version: '',
    resource_type: '',
  })
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    for (const key in resource) {
      if (resource.hasOwnProperty(key) && !resource[key]) {
        return false;
      }
    }
    return true;
  };

  const handleAddingResource = async (e) => {
    e.preventDefault();
    if(!validateFields()) {
        setError('Please fill out all fields');
        setSuccess(null);
        return;
    }
    try {
      const response = await axios.post('/resources/add', resource);
      if (response.status === 201) {
        setSuccess('Successfully added resource');
        setError(null);
      } else {
        setError('Failed to adding resource');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error adding resource:', error);
      setError('Failed to adding resource');
      setSuccess(null);
    }
  };


  return (
    <div>
      <h1>Add New Resources </h1>
      <form onSubmit={handleAddingResource}>
        <div>
          <p>
            Name:
            <input type="text" name="resource_name" value={resource.resource_name} onChange={handleChange}/>
          </p>
          <p>
            Author:
            <input type="text" name="author" value={resource.author} onChange={handleChange} />
          </p>
          <p>
            Location:
            <input type="text" name="location" value={resource.location} onChange={handleChange} />
          </p>
          <p>
            Description:
            <textarea name="resource_description" value={resource.resource_description} onChange={handleChange} />
          </p>
          <p>
            Genre:
            <input type="text" name="genre" value={resource.genre} onChange={handleChange} />
          </p>
          <p>
            Total Copies:
            <input type="number" name="total_copies" value={resource.total_copies} onChange={handleChange} />
          </p>
          <p>
            Copies Available:
            <input type="number" name="copies_available" value={resource.copies_available} onChange={handleChange} />
          </p>
          <p>
            Version:
            <input type="text" name="resource_version" value={resource.resource_version} onChange={handleChange} />
          </p>
          <p>
            Type:
            <input type="text" name="resource_type" value={resource.resource_type} onChange={handleChange} />
          </p>
        </div>
        <button type="submit">Add Resource</button>
      </form>
      {error && <p style={{ color: 'red'}}>Error: {error}</p>}
      {success && <p style={{ color: 'green'}}>Success: {success}</p>}
    </div>
  );
};

export default CreateResource;
