import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import ExportReservations from './ExportReservations';
import CreateEvent from '../Events/CreateEvent';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState('guest');

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

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event', error);
      alert('Failed to delete event');
    }
  };

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', { username, password, email, firstName, lastName, phone, birthDate, role });
      setUsername('');
      setPassword('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setBirthDate('');
      setRole('guest');
      alert('User registered successfully');
    } catch (error) {
      console.error('Failed to register user', error);
      alert('Failed to register user');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-section">
        <h2>Manage Events</h2>
        {events.map(event => (
          <div key={event.id}>
            <p>{event.name}</p>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="admin-section">
        <h2>Create Event</h2>
        <CreateEvent />
      </div>

      <div className="admin-section">
        <h2>Register User</h2>
        <form onSubmit={handleRegisterUser}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Birth Date:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
              <option value="promoter">Promoter</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="admin-section full-width">
        <h2>Export Reservations</h2>
        <ExportReservations />
      </div>
    </div>
  );
};

export default AdminPanel;
