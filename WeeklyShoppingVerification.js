import React, { useState } from 'react';
import './WeeklyShoppingVerification.css'; // Make sure to create a corresponding CSS file

function WeeklyShoppingVerification() {
  const [shoppingInfo, setShoppingInfo] = useState({
    COORDINATOR_id: '',
    Date_of_purchase: '',
    category: '',
    product: '',
    quantity: '',
    price: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setShoppingInfo({ ...shoppingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success message
    setErrorMessage(''); // Clear previous error message

    fetch('http://localhost:5000/verify-shopping', { // Replace with your actual backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shoppingInfo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage('Shopping verified successfully.');
      setShoppingInfo({
        COORDINATOR_id: '',
        Date_of_purchase: '',
        category: '',
        product: '',
        quantity: '',
        price: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Error: Unable to verify shopping.');
    });
  };

  return (
    <div className="weekly-shopping-verification-container">
      <h2>Weekly Shopping Verification</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="COORDINATOR_id"
          value={shoppingInfo.COORDINATOR_id}
          onChange={handleChange}
          placeholder="Coordinator ID"
          type="number"
          required
        />
        <input
          name="Date_of_purchase"
          value={shoppingInfo.Date_of_purchase}
          onChange={handleChange}
          placeholder="Date of Purchase"
          type="date"
          required
        />
        <select
          name="category"
          value={shoppingInfo.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="one-time">One-Time</option>
          <option value="permanent">Permanent</option>
          <option value="completion">Completion</option>
        </select>
        <input
          name="product"
          value={shoppingInfo.product}
          onChange={handleChange}
          placeholder="Product"
          type="text"
          required
        />
        <input
          name="quantity"
          value={shoppingInfo.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          required
        />
        <input
          name="price"
          value={shoppingInfo.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          required
        />
        <button type="submit">Verify Shopping</button>
      </form>
    </div>
  );
}

export default WeeklyShoppingVerification;
