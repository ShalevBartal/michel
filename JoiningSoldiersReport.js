import React, { useEffect, useState } from 'react';
import './JoiningSoldiersReport.css'; // Ensure the CSS file is properly linked

function JoiningSoldiersReport() {
  const [soldiers, setSoldiers] = useState([]);
  const [filteredSoldiers, setFilteredSoldiers] = useState([]);
  const [joinDateFilter, setJoinDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/joining-soldiers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch soldiers.');
        }
        return response.json();
      })
      .then(data => {
        setSoldiers(data.data); // Assumes your backend returns data in a 'data' key
        setFilteredSoldiers(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = soldiers.filter(soldier => {
      const soldierJoinDate = new Date(soldier.JoinDate);
      const filterDate = joinDateFilter ? new Date(joinDateFilter) : null;
      return filterDate ? soldierJoinDate >= filterDate : true;
    });

    setFilteredSoldiers(filtered);
  }, [joinDateFilter, soldiers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="joining-soldiers-report-container">
      <h2>Joining Soldiers Report</h2>
      <div className="filters">
        <label htmlFor="joinDate">Join Date From:</label>
        <input
          type="date"
          id="joinDate"
          value={joinDateFilter}
          onChange={(e) => setJoinDateFilter(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ColleagueID</th>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>EmergencyContact</th>
            <th>Address</th>
            <th>Sensitivity</th>
            <th>RoomNumber</th>
            <th>Status</th>
            <th>JoinDate</th>
          </tr>
        </thead>
        <tbody>
          {filteredSoldiers.map((soldier, index) => (
            <tr key={index}>
              <td>{soldier.ColleagueID}</td>
              <td>{soldier.Name}</td>
              <td>{soldier.Email}</td>
              <td>{soldier.PhoneNumber}</td>
              <td>{soldier.EmergencyContact}</td>
              <td>{soldier.Address}</td>
              <td>{soldier.Sensitivity}</td>
              <td>{soldier.RoomNumber}</td>
              <td>{soldier.Status}</td>
              <td>{soldier.JoinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JoiningSoldiersReport;
