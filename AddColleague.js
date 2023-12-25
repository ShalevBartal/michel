import React, { useState } from 'react';
import './AddColleague.css'; // Ensure you have corresponding CSS for styling

function AddColleague() {
  const [colleague, setColleague] = useState({
    ColleagueID: '',
    Name: '',
    Email: '',
    PhoneNumber: '',
    EmergencyContact: '',
    Address: '',
    Sensitivity: '',
    roomNumber: '',
    status: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setColleague({ ...colleague, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/add-colleague', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colleague),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage('The details were accepted successfully.');
      setColleague({
        ColleagueID: '',
        Name: '',
        Email: '',
        PhoneNumber: '',
        EmergencyContact: '',
        Address: '',
        Sensitivity: '',
        roomNumber: '',
        status: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setSuccessMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div className="add-colleague-container">
      <h2>Add or Update Colleague Details</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="ColleagueID"
          value={colleague.ColleagueID}
          onChange={handleChange}
          placeholder="Colleague ID"
          type="text"
          required
        />
        <input
          name="Name"
          value={colleague.Name}
          onChange={handleChange}
          placeholder="Name"
          type="text"
          required
        />
        <input
          name="Email"
          value={colleague.Email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="PhoneNumber"
          value={colleague.PhoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          type="tel"
          required
        />
        <input
          name="EmergencyContact"
          value={colleague.EmergencyContact}
          onChange={handleChange}
          placeholder="Emergency Contact"
          type="tel"
          required
        />
        <input
          name="Address"
          value={colleague.Address}
          onChange={handleChange}
          placeholder="Address"
          type="text"
          required
        />
        <input
          name="Sensitivity"
          value={colleague.Sensitivity}
          onChange={handleChange}
          placeholder="Sensitivity"
          type="text"
        />
        <input
          name="roomNumber"
          value={colleague.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          type="text"
        />
        <input
          name="status"
          value={colleague.status}
          onChange={handleChange}
          placeholder="Status"
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddColleague;
