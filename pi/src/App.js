import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import Users from './components/Admin/Users';
import Products from './components/Admin/Products';
import Analytics from './components/Admin/Analytics';
import Notifications from './components/Admin/Notifications';
import Settings from './components/Admin/Settings';

function App() {
  const location = useLocation();
  
  // Vérifier si la route actuelle correspond à une route admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />   
          <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />      
          <Route path="/verifycodeEmail" element={<VerifyCodeEmail />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* Route pour récupérer le token de Google après redirection */}
          <Route path="/google/:token" element={<GoogleRedirectHandler />} />
          
          {/* Routes Admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
      
        </Routes>

        {/* Ne pas afficher le Template ni le Footer si c'est une route Admin */}
        {!isAdminRoute && location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/forget-password" && location.pathname !== "/profile" && <Template />}
        
        {/* Ne pas afficher le Footer si c'est une route Admin */}
        {!isAdminRoute && <Footer />}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
