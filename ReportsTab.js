import React from 'react';
import { Link } from 'react-router-dom';
import './ReportsTab.css'; // Ensure this CSS file exists with your desired styles

function ReportsTab() {
  return (
    <div className="reports-tab-container">
      <h1>Reports</h1>
      <ul className="reports-list">
        {/* Existing links to specific reports */}
        <li><Link to="/open-debt-report" className="report-link">Open Debt Report</Link></li>
        <li><Link to="/vacant-rooms-report" className="report-link">Vacant Rooms Report</Link></li>
        <li><Link to="/purchase-report" className="report-link">Purchase Report</Link></li>
        <li><Link to="/joining-soldiers-report" className="report-link">Joining Soldiers Report</Link></li>
        {/* New link for the Leavings Report */}
        <li><Link to="/leavings-report" className="report-link">Leavings Report</Link></li>
      </ul>
    </div>
  );
}

export default ReportsTab;
