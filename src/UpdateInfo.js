import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/updateInfo.css';

const UpdateInfo = () => {
  const {resource_id} = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState({
    id: '',
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

  useEffect(() => {
    const getResource = async () => {
      try {
        const field = "resource_id";
        const query = resource_id;
        console.log('use effect checking ', field, query);
        console.log(query, typeof(query));
        const response = await axios.post('http://localhost:3001/resources/search', { field, query });
        console.log(response.data);
        setResource(response.data[0]);
        console.log(resource);
      }
      catch (error) {
        console.log('error in use effect', error);
      }
    };
    getResource();
  }, [resource_id]);

  const handleChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/resources/update/${resource_id}`, resource);
      if (response.status === 200) {
        navigate('/search'); 
      } else {
        setError('Failed to update resource');
      }
    } catch (error) {
      console.error('Error updating resource:', error);
      setError('Failed to update resource');
    }
  };

  return (
    <div>
      <h1>Update Resource {resource.resource_name}</h1>
      <form onSubmit={handleUpdateInfo}>
        <div>
          <p>
            Name:
            <input type="text" name="resource_name" value={resource.resource_name} onChange={handleChange} required />
          </p>
          <p>
            Author:
            <input type="text" name="author" value={resource.author} onChange={handleChange} required />
          </p>
          <p>
            Location:
            <input type="text" name="location" value={resource.location} onChange={handleChange} required />
          </p>
          <p>
            Description:
            <textarea name="resource_description" value={resource.resource_description} onChange={handleChange} required />
          </p>
          <p>
            Genre:
            <input type="text" name="genre" value={resource.genre} onChange={handleChange} required />
          </p>
          <p>
            Total Copies:
            <input type="number" name="total_copies" value={resource.total_copies} onChange={handleChange} required />
          </p>
          <p>
            Copies Available:
            <input type="number" name="copies_available" value={resource.copies_available} onChange={handleChange} required />
          </p>
          <p>
            Version:
            <input type="text" name="resource_version" value={resource.resource_version} onChange={handleChange} required />
          </p>
          <p>
            Type:
            <input type="text" name="resource_type" value={resource.resource_type} onChange={handleChange} required />
          </p>
        </div>
        <button type="submit">Update Resource</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateInfo;




