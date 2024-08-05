import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
    const [event, setEvent] = useState({
        event_name: '',
        event_desc: '',
        startTime: '',
        endTime: '',
        spotsTotal: 0,
        spotsLeft: 0,
        approved: "0",
    });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleAddingEvent = async (e) => {
    e.preventDefault();
    if (event.spotsTotal <= 0) {
      setError('Needs to have at least 1 spot. ');
      setSuccess(null);
      return;
    }
    try {
      const response = await axios.post('/calendar/event/add', {
        ...event,
        spotsLeft: event.spotsTotal,
      });
      if (response.status === 201) {
        setSuccess('Successfully added event');
        setError(null);
      } else {
        setError('Failed to adding event');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      setError('Failed to adding event');
      setSuccess(null);
    }
  };


  return (
    <div>
      <h1>Add New Event </h1>
      <form onSubmit={handleAddingEvent}>
        <div>
            <p>
                Title:
                <input type="text" name="event_name" value={event.event_name} onChange={handleChange} required></input>
            </p>
            <p>
                Description:
                <textarea name="event_desc" value={event.event_desc} onChange={handleChange} required></textarea>
            </p>
            <p>
                Start Time:
                <input type="datetime-local" name="startTime" value={event.startTime} onChange={handleChange} required></input>
            </p>
            <p>
                End Time:
                <input type="datetime-local" name="endTime" value={event.endTime} onChange={handleChange} required></input>
            </p>
            <p>
                Spots Total
                <input type="text" name="spotsTotal" value={event.spotsTotal} onChange={handleChange} required></input>
            </p>
        </div>
        <button type="submit">Add Event</button>
      </form>
      {error && <p style={{ color: 'red'}}>Error: {error}</p>}
      {success && <p style={{ color: 'green'}}>Success: {success}</p>}
    </div>
  );
};

export default CreateEvent;
