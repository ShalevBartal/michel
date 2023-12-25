import React, { useEffect, useState } from 'react';
import './VacantRoomsReport.css'; // Make sure to create and style your component

function VacantRoomsReport() {
  const [vacantRooms, setVacantRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/vacant-rooms-report') // Replace with your actual endpoint
      .then(response => response.json())
      .then(data => setVacantRooms(data.data))
      .catch(error => console.error('Error fetching vacant rooms data:', error));
  }, []);

  return (
    <div className="vacant-rooms-report-container">
      <h2>Vacant Rooms Report</h2>
      <table>
        <thead>
          <tr>
            <th>House ID</th>
            <th>Coordinator ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Room Number</th>
            <th>Available Beds</th>
          </tr>
        </thead>
        <tbody>
          {vacantRooms.map((room, index) => (
            <tr key={index}>
              <td>{room.house_id}</td>
              <td>{room.COORDINATOR_id}</td>
              <td>{room.name}</td>
              <td>{room.address}</td>
              <td>{room.room_number}</td>
              <td>{room.available_beds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VacantRoomsReport;
