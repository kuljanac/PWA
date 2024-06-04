import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './AdminPanel.css';

const ExportReservations = () => {
  const [eventId, setEventId] = useState('');

  const handleExport = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/export/${eventId}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `reservations-${eventId}.xlsx`);
    } catch (error) {
      console.error('Failed to export reservations:', error);
      alert('Failed to export reservations');
    }
  };

  return (
    <div className="export-reservations">
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <button onClick={handleExport}>Export</button>
    </div>
  );
};

export default ExportReservations;
