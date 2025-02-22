import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Package, BarChart2, Bell, Settings, 
  Search, LogOut, Sun, Menu
} from 'lucide-react';
import Cookies from 'js-cookie';
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
          <li><Link to="/admin/Points"><Package size={20} /> <span>Points Of Intrste</span></Link></li>
          <li><Link to="/admin/products"><Package size={20} /> <span>Products</span></Link></li>
          <li><Link to="/admin/analytics"><BarChart2 size={20} /> <span>Analytics</span></Link></li>
          <li><Link to="/admin/notifications"><Bell size={20} /> <span>Notifications</span></Link></li>
          <li><Link to="/admin/settings"><Settings size={20} /> <span>Settings</span></Link></li>
        </ul>
      </nav>
    </div>
  );
};

const TopBar = ({ userName, userImage, onLogout }) => {
  return (
    <div className="topbar">
      <div className="search-box">
        <Search size={20} />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="topbar-right">
        <button className="theme-toggle">
          <Sun size={20} />
        </button>
        <div className="user-menu">
          <img src={userImage} alt="User" className="user-avatar" />
          <span>{userName}</span>
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
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('/uploads/avatar7.png'); // Image par défaut
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('user'); 
    if (user) {
      const parsedUser = JSON.parse(user);
      const fullName = `${parsedUser.name} ${parsedUser.lastName}`;
      setUserName(fullName);
      setUserImage(parsedUser.image ? `http://localhost:5000/${parsedUser.image.replace(/\\/g, "/")}` : '/uploads/avatar7.png');
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token'); 
    navigate('/'); 
  };

  return (
    <div className="admin-layout">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="main-content">
        <TopBar userName={userName} userImage={userImage} onLogout={handleLogout} />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
