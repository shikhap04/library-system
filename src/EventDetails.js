import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Event = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const loggedIn = (sessionStorage.getItem('loggedIn'));

    useEffect(() => {
        const getEvent = async () => {
          try {
            const response = await axios.post('http://localhost:3001/calendar/event/ID', { event_id });
            console.log(response.data);
            setEvent(response.data[0]);
          }
          catch (error) {
            console.log('error in use effect', error);
          }
        };
        getEvent();
      }, [event]);

    return (
        <div>
            <h1>Event Title: {event.event_name}</h1>
            <p>Description: {event.event_desc}</p>
            <p>Date: {new Date(event.startTime).toLocaleDateString()}</p>
            <p>Time: {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
            <p>Total spots: {event.spotsTotal}</p>
            <p>Spots Left: {event.spotsLeft}</p>
        </div>
    )
};

export default Event;


// if logged in, you can RSVP
// else view details