import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie';

import Footer from './components/Footer';
import Navbar from './components/navbar';
import Template from './template';
import Signin from './components/user/signin';
import Signup from './components/user/signup';
import VerifyCode from './components/user/VerifyCode';
import ResetPassword from './components/user/ResetPassword';
import ForgotPassword from './components/user/forgetPassword';
import ResetPasswordEmail from './components/user/ResetPasswordEmail';
import VerifyCodeEmail from './components/user/VerifyCodeEmail';
import GoogleRedirectHandler from './components/user/GoogleRedirectHandler';
import UserProfile from './components/user/UserProfile';
import Contact from './components/contact';

// Import Admin components
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import Users from './components/Admin/Users';
import Products from './components/Admin/Products';
import Analytics from './components/Admin/Analytics';
import Notifications from './components/Admin/Notifications';
import Settings from './components/Admin/Settings';

// Function to check if user is authenticated
const isAuthenticated = () => {
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  return user && Cookies.get('token'); 
};

// Function to check if user is an admin
const isAdmin = () => {
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  return user && user.typeUser === 'admin';
};

// Protected route for authenticated users
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return isAuthenticated() ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};

// Protected route for admin-only access
const AdminProtectedRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/" replace />;
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        <Routes>
          {/* Non-admin routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />
          <Route path="/verifycodeEmail" element={<VerifyCodeEmail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/google/:token" element={<GoogleRedirectHandler />} />

          {/* Admin routes - protected */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>

        {/* Render main layout only if NOT on admin pages */}
        {!isAdminRoute && (
          <>
            <Navbar />
            {!["/signin", "/signup", "/forget-password", "/profile"].includes(location.pathname) && <Template />}
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
