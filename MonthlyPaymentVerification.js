import React, { useState } from 'react';
import './MonthlyPaymentVerification.css'; // Make sure to create a corresponding CSS file

function MonthlyPaymentVerification() {
  const [paymentInfo, setPaymentInfo] = useState({
    soldier_id: '',
    date: '',
    amount: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success message
    setErrorMessage(''); // Clear previous error message

    fetch('http://localhost:5000/verify-payment', { // Replace with your actual backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentInfo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage('Payment verified successfully.');
      setPaymentInfo({
        soldier_id: '',
        date: '',
        amount: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Error: Unable to verify payment.');
    });
  };

  return (
    <div className="monthly-payment-verification-container">
      <h2>Monthly Payment Verification</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="soldier_id"
          value={paymentInfo.soldier_id}
          onChange={handleChange}
          placeholder="Soldier ID"
          type="number"
          required
        />
        <input
          name="date"
          value={paymentInfo.date}
          onChange={handleChange}
          placeholder="Date (YYYY-MM-DD)"
          type="date"
          required
        />
        <input
          name="amount"
          value={paymentInfo.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          step="0.01"
          required
        />
        <button type="submit">Verify Payment</button>
      </form>
    </div>
  );
}

export default MonthlyPaymentVerification;
