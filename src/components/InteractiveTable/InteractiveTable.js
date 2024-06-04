import React, { useState, useEffect } from 'react';
import './InteractiveTable.css';

const InteractiveTable = ({ selectedTable, setSelectedTable, reservedTables }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchedTables = [
      { id: 1, type: 'VIP', position: { top: '460px', left: '380px' } },
      { id: 2, type: 'VIP', position: { top: '460px', left: '330px' } },
      { id: 3, type: 'VIP', position: { top: '460px', left: '280px' } },
      { id: 4, type: 'VIP', position: { top: '460px', left: '230px' } },
      { id: 5, type: 'VIP', position: { top: '410px', left: '200px' } },
      { id: 6, type: 'VIP', position: { top: '360px', left: '200px' } },
      { id: 7, type: 'VIP', position: { top: '310px', left: '200px' } },
      { id: 8, type: 'VIP', position: { top: '260px', left: '200px' } },
      { id: 9, type: 'VIP', position: { top: '210px', left: '200px' } },
      { id: 10, type: 'Regular', position: { top: '170px', left: '200px' } },
      { id: 11, type: 'Regular', position: { top: '120px', left: '250px' } },
      { id: 12, type: 'Regular', position: { top: '120px', left: '300px' } },
      { id: 13, type: 'Regular', position: { top: '120px', left: '350px' } },
      { id: 14, type: 'Standing', position: { top: '120px', left: '400px' } },
      { id: 15, type: 'Standing', position: { top: '120px', left: '450px' } },
      { id: 16, type: 'Standing', position: { top: '120px', left: '500px' } },
      { id: 17, type: 'Standing', position: { top: '120px', left: '550px' } },
      { id: 18, type: 'Standing', position: { top: '120px', left: '600px' } },
      { id: 19, type: 'Standing', position: { top: '120px', left: '650px' } }
    ];
    setTables(fetchedTables);
  }, []);

  return (
    <div className="interactive-map">
      {tables.map((table) => (
        <div
          key={table.id}
          id={`table-${table.id}`}
          className={`table ${table.type.toLowerCase()} ${reservedTables.includes(table.id) ? 'reserved' : ''} ${selectedTable === table.id ? 'selected' : ''}`}
          style={table.position}
          onClick={() => !reservedTables.includes(table.id) && setSelectedTable(table.id)}
        >
          {table.id}
        </div>
      ))}
    </div>
  );
};

export default InteractiveTable;
