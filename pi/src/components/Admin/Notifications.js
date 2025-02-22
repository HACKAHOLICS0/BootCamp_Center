import React from 'react';
import { Bell } from 'lucide-react';
import './AdminStyle.css'
const Notifications = () => (
  <div className="content-section">
    <h2>Notifications</h2>
    <div className="notification-list">
      {[1, 2, 3].map((i) => (
        <div key={i} className="notification-item">
          <Bell size={20} />
          <div className="notification-content">
            <h4>Notification Title {i}</h4>
            <p>This is a notification message that provides some important information.</p>
            <span className="notification-time">2 hours ago</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Notifications;