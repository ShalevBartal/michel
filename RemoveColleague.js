import React, { useState } from 'react';
import './RemoveColleague.css'; // Ensure you have a corresponding CSS file for styling

function RemoveColleague() {
  const [removalInfo, setRemovalInfo] = useState({
    soldier_id: '',
    reasonForLeaving: '',
    dateOfLeaving: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setRemovalInfo({ ...removalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setSuccessMessage(''); // Clear any previous success messages

    fetch('http://localhost:5000/remove-colleague', { // Replace with your actual backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(removalInfo),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage('Colleague removed successfully.');
      setRemovalInfo({
        soldier_id: '',
        reasonForLeaving: '',
        dateOfLeaving: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(error.message);
    });
  };

  return (
    <div className="remove-colleague-container">
      <h2>Remove Colleague</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="soldier_id"
          value={removalInfo.soldier_id}
          onChange={handleChange}
          placeholder="Colleague ID"
          type="number"
          required
        />
        <textarea
          name="reasonForLeaving"
          value={removalInfo.reasonForLeaving}
          onChange={handleChange}
          placeholder="Reason for Leaving"
          required
        />
        <input
          name="dateOfLeaving"
          value={removalInfo.dateOfLeaving}
          onChange={handleChange}
          placeholder="Date of Leaving"
          type="date"
          required
        />
        <button type="submit">Remove Colleague</button>
      </form>
    </div>
  );
}

export default RemoveColleague;
