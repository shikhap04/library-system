import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Event = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState('');
    const [RSVP, setRVSP] = useState({
      event_id: event_id,
      user_id: sessionStorage.getItem('id'),
      numSpots: 0,
    });
    const[RSVPSpots, setRSVPSpots] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

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

        const checkRSVP = async() => {
          try {
            const response = await axios.post('http://localhost:3001/calendar/RSVP/check', {event_id, user_id: RSVP.user_id});
            setRSVPSpots(response.data)
          } catch (error) {
            console.log('error checking rsvp', error);
          }
        }

        getEvent();
        checkRSVP();
      }, [event_id, RSVP.user_id]);

    const handleRSVP = async (e) => {
      e.preventDefault();
      if (RSVP.numSpots < 0) {
        setError('Invalid RSVP count');
        setSuccess(null);
        return;
      } else if (RSVP.numSpots > event.spotsLeft) {
        setError('Not enough spots available please try again!');
        setSuccess(null);
        return;
      }

      try {
        const response = await axios.post('/calendar/RSVP/add', RSVP);
        if (response.status === 201) {
          setSuccess('Successfully added RSVP');
          setError(null);
          //navigate(0);
        } else {
          setError('Failed to adding RSVP');
          setSuccess(null);
        }
      } catch (error) {
        console.error('Error adding rsvp:', error);
        setError('RSVP already exists!');
        setSuccess(null);
      }
    };

    const handleChange = (e) => {
      setRVSP({ ...RSVP, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Event Title: {event.event_name}</h1>
            <p>Description: {event.event_desc}</p>
            <p>Date: {new Date(event.startTime).toLocaleDateString()}</p>
            <p>Time: {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
            <p>Total spots: {event.spotsTotal}</p>
            <p>Spots Left: {event.spotsLeft}</p>
            {loggedIn && RSVPSpots && 
              <p>You already have RSVP'd for {RSVPSpots.numSpots}</p>
            }
            {loggedIn && !RSVPSpots &&
              <form
               onSubmit={handleRSVP}>
                <p>
                    How many spots would you like to reserve?
                    <input type="text" name="numSpots" value={RSVP.numSpots} onChange={handleChange} required></input>
                </p>
                <button type="submit">RSVP</button>
              </form>
            }
            {error && <p style={{ color: 'red'}}>Error: {error}</p>}
            {success && <p style={{ color: 'green'}}>Success: {success}</p>}
        </div>
    )
};

export default Event;
