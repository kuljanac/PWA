import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../Reservations/ReservstionForm';
import InteractiveTable from '../InteractiveTable/InteractiveTable';
import './EventDetail.css';

const EventDetailWithReservation = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservedTables, setReservedTables] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event:', error.message);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservations?eventId=${id}`);
        const reserved = response.data.map(reservation => reservation.tableNumber);
        setReservedTables(reserved);
      } catch (error) {
        console.error('Failed to fetch reservations:', error.message);
      }
    };

    fetchEvent();
    fetchReservations();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      {event.name.toLowerCase().includes('secret') ? (
        <InteractiveTable selectedTable={selectedTable} setSelectedTable={setSelectedTable} reservedTables={reservedTables} />
      ) : null}
      <ReservationForm eventId={event.id} selectedTable={selectedTable} />
    </div>
  );
};

export default EventDetailWithReservation;
