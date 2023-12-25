import React, { useState } from 'react';
import './UpdateHousingStatus.css'; // Import the CSS file here

function UpdateHousingStatus() {
  const [updateInfo, setUpdateInfo] = useState({
    id: '',
    roomNumber: '',
    status: '',
    joinDate: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/update-housing-status', { // Adjust the URL to your server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInfo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage('Housing status updated successfully.');
      setUpdateInfo({
        id: '',
        roomNumber: '',
        status: '',
        joinDate: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setSuccessMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div className="update-housing-status-container">
      <h2>Update Housing Status - Soldier</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          value={updateInfo.id}
          onChange={handleChange}
          placeholder="Soldier ID"
          type="text"
        />
        <input
          name="roomNumber"
          value={updateInfo.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          type="text"
        />
        <input
          name="status"
          value={updateInfo.status}
          onChange={handleChange}
          placeholder="Status"
          type="text"
        />
        <input
          name="joinDate"
          value={updateInfo.joinDate}
          onChange={handleChange}
          placeholder="Join Date"
          type="date"
        />
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
}

export default UpdateHousingStatus;
