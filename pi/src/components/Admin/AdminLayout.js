import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Package, BarChart2, Bell, Settings, 
  Search, LogOut, Sun, Moon, Menu
} from 'lucide-react';
import Cookies from 'js-cookie';
import './AdminStyle.css';

const Sidebar = ({ isCollapsed, toggleSidebar, user }) => {
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

const TopBar = ({ toggleTheme, isDarkMode, onLogout }) => {
  const user = JSON.parse(Cookies.get("user")); // Retrieve user data from Cookies

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
          <img
            src={user?.image || "https://via.placeholder.com/100"}
            alt="User"
          />
          <span>{user?.name} {user?.lastName}</span>
          <button className="logout-icon-btn" onClick={onLogout}>
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', isDarkMode);
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Fetch user data only from cookies
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/signin'); // Redirect to sign-in if no user data is found
    }
  }, [isDarkMode, navigate]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const onLogout = async () => {
    // Optional: Call the backend to invalidate the session (JWT token)
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  
    // Clear user-related data from Cookies
    Cookies.remove('token');
    Cookies.remove('user');
  
    // Redirect to the login page
    navigate('/signin');
  };

  return (
    <div className={`admin-layout ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} user={user} />
      <div className="main-content">
        <TopBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} user={user} onLogout={onLogout} />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
