import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const UpdateEvent = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState({
        event_id: event_id,
        event_name: '',
        event_desc: '',
        startTime: '',
        endTime: '',
        spotsTotal: 0,
        spotsLeft: 0,
        approved: "0",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    
    const loggedIn = (sessionStorage.getItem('loggedIn'));
    const currAccountLevel = sessionStorage.getItem('accountLevel');
    if (!loggedIn || currAccountLevel != 3) {
        navigate(`/calendar/event/${event_id}`);
    }
    
    useEffect(() => {
        const getEvent = async () => {
          try {
            const response = await axios.post('http://localhost:3001/calendar/event/ID', { event_id });
            console.log(response.data);
            setEvent({
                ...response.data[0],
                startTime: moment(response.data[0].startTime).format('YYYY-MM-DDTHH:mm'),
                endTime: moment(response.data[0].endTime).format('YYYY-MM-DDTHH:mm'),
              });
          }
          catch (error) {
            console.log('error in use effect', error);
          }
        };
        getEvent();
      }, [event_id]);


    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        if (event.spotsTotal < 1) {
            setError('Has to have at least 1 spot. Please try again!');
            setSuccess(null);
            return;
        }
        try {
            const response = await axios.put(`/calendar/event/update/${event_id}`, {
                ...event,
                spotsLeft: event.spotsTotal,
            });
            if (response.status === 200) {
                setSuccess('Successfully Updated');
                setError(null);
            } else {
                setError('Failed to update event');
                setSuccess(null);
            }
        } catch (error) {
            console.error('Error updating event:', error);
            setError('Failed to update event');
            setSuccess(null);
        }
    };
    
    const handleDeleteEvent = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.delete(`/calendar/event/delete/${event_id}`);
        if (response.status === 200) {
            console.log('deleted event')
            navigate('/calendar');
        } else {
            setError('Failed to delete event');
            setSuccess(null);
        }
        } catch (error) {
            console.error('Error deleting resource:', error);
            setError('Failed to delete resource');
            setSuccess(null);
        }
    };

    const handleRedirect = () => {
        navigate(`/calendar`);
    }

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
      };

    return (
        <div>
            <h1>Update event {event_id}</h1>
            <form
                onSubmit={handleUpdateInfo}>
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
                <p>
                    Approved:
                    <select
                        name ="approved"
                        value={event.approved}
                        onChange={handleChange}
                        className = "inputDropDown">
                            <option value = "1">Approved</option>
                            <option value = "0">Not Approved</option>
                    </select>
                </p>
                <button type="submit">Update</button>
                <button type="button" onClick={handleDeleteEvent}>Delete</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    )
}

export default UpdateEvent;

// if admin, you get to modify details, regardless of approved or not (approve update it)
// if admin, you get to delete it