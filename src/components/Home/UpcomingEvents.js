import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); 
        const data = await response.json();
        const sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };
    fetchUpcomingEvents();
  }, []);
  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        {events.map(event => (
          <div key={event.id} className="event-card" style={{ backgroundImage: `url(${event.imageUrl || 'path/to/club-dark-image.jpg'})` }}>
            <img src={event.imageUrl || 'https://via.placeholder.com/150'} alt={event.name} />
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <button onClick={() => navigate(`/event/${event.id}`)}>Reserve</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UpcomingEvents;
