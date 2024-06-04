import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import UpcomingEvents from './UpcomingEvents';

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleReserveClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const hotEvents = events
    .filter(event => event.reservations && event.reservations.length > 5)
    .sort((a, b) => b.reservations.length - a.reservations.length)
    .slice(0, 3);

  const latestEvents = events
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
    .filter((event, index, self) => self.findIndex(e => e.id === event.id) === index) // Remove duplicates
    .sort((a, b) => {
      const distanceA = a.proximity || 0;
      const distanceB = b.proximity || 0;
      return distanceA - distanceB;
    });

  return (
    <div className="home">
      <h1>Hot Events</h1>
      <div className="events">
        {hotEvents.map(event => (
          <div key={event.id} className="event-card hot-event-card" style={{ backgroundImage: `url(${event.imageUrl || 'path/to/club-dark-image.jpg'})` }}>
            <h2>{event.name}</h2>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <div className="hot-event">Hot Event</div>
            <button onClick={() => handleReserveClick(event.id)}>Reserve</button>
          </div>
        ))}
      </div>
      <h1>Latest Events</h1>
      <div className="events">
        {latestEvents.map((event, index) => (
          <div key={event.id} className={`event-card ${index === 1 ? 'middle' : index === 2 ? 'right' : 'left'}`} style={{ backgroundImage: `url(${event.imageUrl || 'path/to/club-dark-image.jpg'})` }}>
            <h2>{event.name}</h2>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <button onClick={() => handleReserveClick(event.id)}>Reserve</button>
          </div>
        ))}
      </div>
      <UpcomingEvents />
    </div>
  );
};
export default Home;
