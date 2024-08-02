import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from 'react-big-calendar';


const EventsCalendar = () => {
    const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
          try {
            const response = await axios.get('http://localhost:3001/events/all');
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
            />
            {error && <p style={{ color: 'red'}}>Error: {error}</p>}
        </div>
    );
}

export default EventsCalendar;