import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reservations.css';

const ReservationsList = ({ eventId }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}/reservations`);
        setReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations', error);
      }
    };

    fetchReservations();
  }, [eventId]);

  return (
    <div className="reservations">
      <h2>Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            Table {reservation.tableNumber}, Last Name: {reservation.lastName}, Guests: {reservation.numberOfGuests}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
