import React from 'react';
import {Link} from 'react-router-dom'

const ResourceCard = ({resource}) => {
    return (
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
    )
}

export default ResourceCard;