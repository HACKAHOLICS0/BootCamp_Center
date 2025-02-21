import React from 'react';
import './AdminStyle.css'
const Users = () => (
  <div className="content-section">
    <h2>User Management</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#001</td>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>Admin</td>
          <td>
            <button className="action-btn edit">Edit</button>
            <button className="action-btn delete">Delete</button>
          </td>
        </tr>
        <tr>
          <td>#002</td>
          <td>Jane Smith</td>
          <td>jane@example.com</td>
          <td>User</td>
          <td>
            <button className="action-btn edit">Edit</button>
            <button className="action-btn delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Users;