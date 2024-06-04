import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './EventList.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event', error);
      alert('Failed to delete event');
    }
  };

  return (
    <div className="event-list">
      <h2>Latest Events</h2>
      <div className="events">
        {events.map(event => (
          <div key={event.id} className={`event ${event.isHot ? 'hot-event' : ''}`} style={{ backgroundImage: `url(${event.imageUrl})` }}>
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <Link to={`/event/${event.id}`}>Reservation</Link>
            {user && user.role === 'admin' && (
              <>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
                <Link to={`/edit-event/${event.id}`}>Edit</Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
