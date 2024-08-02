import React from 'react';
import {Link} from 'react-router-dom';
import './css/card.css'

const ResourceCard = ({resource}) => {
    const loggedIn = sessionStorage.getItem('loggedIn')
    let isEmployee = false;
    if (loggedIn && sessionStorage.getItem('accountLevel') > 1) {
        isEmployee = true;
    }

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
            <div>
                {loggedIn && <Link to={`/resource/checkout/${resource.resource_id}`}>Check Out Details</Link>}
                <div></div>
                {isEmployee && <Link to={`/resource/update/${resource.resource_id}`}>Update Information</Link>}
            </div>
          </div>
    )
}

export default ResourceCard;
