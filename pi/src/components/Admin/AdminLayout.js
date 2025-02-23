import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  Home, Users, Package, BarChart2, Bell, Settings, 
  Search, LogOut, Sun, Moon, Menu
} from 'lucide-react';
import './AdminStyle.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/admin"><Home size={20} /> <span>Dashboard</span></Link></li>
          <li><Link to="/admin/users"><Users size={20} /> <span>Users</span></Link></li>
          <li><Link to="/admin/products"><Package size={20} /> <span>Products</span></Link></li>
          <li><Link to="/admin/analytics"><BarChart2 size={20} /> <span>Analytics</span></Link></li>
          <li><Link to="/admin/notifications"><Bell size={20} /> <span>Notifications</span></Link></li>
          <li><Link to="/admin/settings"><Settings size={20} /> <span>Settings</span></Link></li>
        </ul>
      </nav>
    </div>
  );
};

const TopBar = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="topbar">
      <div className="search-box">
        <Search size={20} />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="topbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="user-menu">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" />
          <span>John Doe</span>
          <button className="logout-icon-btn">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', isDarkMode);
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`admin-layout ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="main-content">
        <TopBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;