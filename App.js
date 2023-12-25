import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Importing App.css for styling
import HomePage from './HomePage';
import AddColleague from './AddColleague';
import UpdateHousingStatus from './UpdateHousingStatus';
import ManageCoordinator from './ManageCoordinator';
import RemoveColleague from './RemoveColleague';
import MonthlyPaymentVerification from './MonthlyPaymentVerification';
import WeeklyShoppingVerification from './WeeklyShoppingVerification';
import ReportsTab from './ReportsTab';
import OpenDebtReport from './OpenDebtReport';
import VacantRoomsReport from './VacantRoomsReport';
import PurchaseReport from './PurchaseReport';
import JoiningSoldiersReport from './JoiningSoldiersReport';
import LeavingsReport from './LeavingsReport';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-header">
          <ul className="App-nav">
            <li><Link to="/" className="App-link">Home</Link></li>
            <li><Link to="/add-or-update-colleague" className="App-link">Add/Update Colleague</Link></li>
            <li><Link to="/update-housing-status" className="App-link">Update Housing Status</Link></li>
            <li><Link to="/manage-coordinator" className="App-link">Manage Coordinator</Link></li>
            <li><Link to="/remove-colleague" className="App-link">Remove Colleague</Link></li>
            <li><Link to="/monthly-payment-verification" className="App-link">Monthly Payment Verification</Link></li>
            <li><Link to="/weekly-shopping-verification" className="App-link">Weekly Shopping Verification</Link></li>
            <li><Link to="/reports" className="App-link">Reports</Link></li>
            {/* Additional links as needed */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-or-update-colleague" element={<AddColleague />} />
          <Route path="/update-housing-status" element={<UpdateHousingStatus />} />
          <Route path="/manage-coordinator" element={<ManageCoordinator />} />
          <Route path="/remove-colleague" element={<RemoveColleague />} />
          <Route path="/monthly-payment-verification" element={<MonthlyPaymentVerification />} />
          <Route path="/weekly-shopping-verification" element={<WeeklyShoppingVerification />} />
          <Route path="/reports" element={<ReportsTab />} />
          <Route path="/open-debt-report" element={<OpenDebtReport />} />
          <Route path="/vacant-rooms-report" element={<VacantRoomsReport />} />
          <Route path="/purchase-report" element={<PurchaseReport />} />
          <Route path="/joining-soldiers-report" element={<JoiningSoldiersReport />} />
          <Route path="/leavings-report" element={<LeavingsReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
