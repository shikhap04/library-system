import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';


const EventsCalendar = () => {
  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const loggedIn = sessionStorage.getItem('loggedIn');
  const currAccountLevel = sessionStorage.getItem('accountLevel');
  var isAdmin = false;
  if (loggedIn && currAccountLevel == 3) {
    isAdmin = true;
  }


  useEffect(() => {
    const getEvents = async () => {
      try {
        console.log(isAdmin);
        const response = await axios.post('http://localhost:3001/calendar/events', {isAdmin});
        const eventsData = response.data;
        if (Array.isArray(eventsData)) {
          const formattedEvents = eventsData.map(event => ({
            ...event,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
          }))
          setEvents(formattedEvents);
        } else {
          console.log('error getting eventsData')
          setError('No Events!')
        }
      }
      catch (error) {
        setError(error.message);
        console.log('Issue with fetching');
      }
    };
    getEvents();
  }, []);

  const EventComponent = ({ event }) => {
    return (
      <div style={{ padding: '3px', color: 'white', borderRadius: '5px' }}>
        <strong>{event.event_name}</strong>
      </div>
    );
  };  

  const eventStyleGetter = (event) => {
    let backgroundColor = event.approved ? '#124E66' : '#dc3545'; // Green for approved, red for not approved
    let style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };


  const handleRedirect = (event) => {
    if (sessionStorage.getItem('accountLevel') != 3) {
      navigate(`/calendar/event/${event.event_id}`);
    }
    else {
      navigate(`/calendar/event/update/${event.event_id}`);
    }
  }


  return (
      <div>
          <h1>Library Events Calendar</h1>
          <Calendar
              localizer={localizer}
              events = {events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              components={{ event: EventComponent }}
              onSelectEvent={handleRedirect}
              eventPropGetter={eventStyleGetter}
          />
          {error && <p style={{ color: 'red'}}>Error: {error}</p>}
      </div>
  );
}

export default EventsCalendar;