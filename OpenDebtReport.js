import React, { useEffect, useState } from 'react';
import './OpenDebtReport.css'; // Create and style your component accordingly

function OpenDebtReport() {
  const [openDebts, setOpenDebts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/open-debt-report') // Adjust the fetch URL to match your Flask server's
      .then(response => response.json())
      .then(data => setOpenDebts(data.data))
      .catch(error => console.error('Error fetching open debt data:', error));
  }, []);

  return (
    <div className="open-debt-report-container">
      <h2>Open Debt Report</h2>
      <table>
        <thead>
          <tr>
            <th>Colleague ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Debt</th>
            {/* Add more headers if needed */}
          </tr>
        </thead>
        <tbody>
          {openDebts.map((debt, index) => (
            <tr key={index}>
              <td>{debt.ColleagueID}</td>
              <td>{debt.Name}</td>
              <td>{debt.Email}</td>
              <td>{debt.PhoneNumber}</td>
              <td>{debt.debt}</td>
              {/* Add more data cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OpenDebtReport;
