import React, { useEffect, useState } from 'react';
import './LeavingsReport.css'; // Ensure this CSS file is properly linked

function LeavingsReport() {
  const [leavings, setLeavings] = useState([]);
  const [filteredLeavings, setFilteredLeavings] = useState([]);
  const [dateOfLeavingFilter, setDateOfLeavingFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/leavings')  // Replace with your actual backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leavings data.');
        }
        return response.json();
      })
      .then(data => {
        setLeavings(data.data);
        setFilteredLeavings(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = leavings.filter(leave => {
      const leaveDate = new Date(leave.date_of_leaving);
      const filterDate = dateOfLeavingFilter ? new Date(dateOfLeavingFilter) : null;
      return filterDate ? leaveDate >= filterDate : true;
    });

    setFilteredLeavings(filtered);
  }, [dateOfLeavingFilter, leavings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="leavings-report-container">
      <h2>Leavings Report</h2>
      <div className="filters">
        <label htmlFor="dateOfLeaving">Date of Leaving From:</label>
        <input
          type="date"
          id="dateOfLeaving"
          value={dateOfLeavingFilter}
          onChange={(e) => setDateOfLeavingFilter(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Soldier ID</th>
            <th>Reason for Leaving</th>
            <th>Date of Leaving</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeavings.map((leave, index) => (
            <tr key={index}>
              <td>{leave.soldier_id}</td>
              <td>{leave.reason_for_leaving}</td>
              <td>{leave.date_of_leaving}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeavingsReport;
