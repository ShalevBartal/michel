import React, { useState } from 'react';
import './ManageCoordinator.css'; // Make sure to create and style ManageCoordinator.css accordingly

function ManageCoordinator() {
  const [coordinator, setCoordinator] = useState({
    id: '',
    house_id: '',
    name: '',
    phoneNumber: '',
    email: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setCoordinator({ ...coordinator, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/manage-coordinator', { // Replace with your actual backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coordinator),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage('Coordinator details updated successfully.');
      setCoordinator({
        id: '',
        house_id: '',
        name: '',
        phoneNumber: '',
        email: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setSuccessMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div className="manage-coordinator-container">
      <h2>Add or Update Coordinator</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          value={coordinator.id}
          onChange={handleChange}
          placeholder="Coordinator ID"
          type="number"
          required
        />
        <input
          name="house_id"
          value={coordinator.house_id}
          onChange={handleChange}
          placeholder="House ID"
          type="number"
          required
        />
        <input
          name="name"
          value={coordinator.name}
          onChange={handleChange}
          placeholder="Name"
          type="text"
          required
        />
        <input
          name="phoneNumber"
          value={coordinator.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          type="tel"
          required
        />
        <input
          name="email"
          value={coordinator.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ManageCoordinator;
