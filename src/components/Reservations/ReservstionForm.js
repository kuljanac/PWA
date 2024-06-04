import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './ReservationForm.css';
import Confetti from 'react-confetti';

const ReservationForm = ({ eventId }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [event, setEvent] = useState(null);
  const { user } = useContext(AuthContext);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event:', error.message);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventId: parseInt(eventId),
      tableNumber: parseInt(tableNumber),
      numberOfGuests: parseInt(numberOfGuests),
      email,
      lastName,
      userId: user ? user.id : null
    };
    try {
      console.log('Submitting payload:', payload);
      await axios.post('http://localhost:5000/api/reservations', payload);
      alert('Reservation created successfully');
      setTableNumber('');
      setNumberOfGuests('');
      setLastName('');
      setEmail('');
      setShowConfetti(true); // Show confetti
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    } catch (error) {
      console.error('Failed to create reservation:', error.message);
      alert('Failed to create reservation');
    }
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <form onSubmit={handleSubmit} className="reservation-form">
        <label>
          Table Number:
          {event && event.name.includes('Secret') ? (
            <select value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required>
              <option value="">Select a table</option>
              {[...Array(40).keys()].map(num => (
                <option key={num + 20} value={num + 20}>{num + 20}</option>
              ))}
            </select>
          ) : (
            <input type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
          )}
        </label>
        <label>
          Number of Guests:
          <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} required />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;
