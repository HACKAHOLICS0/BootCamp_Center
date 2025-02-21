import React from 'react';
import './AdminStyle.css'
const Dashboard = () => (
  <div className="dashboard-grid">
    <div className="stat-card">
      <h3>Total Users</h3>
      <p className="stat-number">1,234</p>
      <span className="stat-change positive">+12.5%</span>
    </div>
    <div className="stat-card">
      <h3>Revenue</h3>
      <p className="stat-number">$45,678</p>
      <span className="stat-change positive">+8.3%</span>
    </div>
    <div className="stat-card">
      <h3>Orders</h3>
      <p className="stat-number">892</p>
      <span className="stat-change negative">-3.2%</span>
    </div>
    <div className="stat-card">
      <h3>Products</h3>
      <p className="stat-number">156</p>
      <span className="stat-change positive">+5.7%</span>
    </div>
  </div>
);

export default Dashboard;