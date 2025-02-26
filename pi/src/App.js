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
import Quizs from './components/Admin/Quizs/QuizAdmin';
import Points from './components/Admin/PointsOfIntrest';
import VerifyEmailPage from './components/user/VerifyEmailPage';

function App() {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showTemplate = location.pathname === "/" || location.pathname === "/home";

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        {/* Afficher Navbar uniquement si ce n'est pas une route admin */}
        {!isAdminRoute && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Template />} />
          <Route path="/home" element={<Template />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />   
          <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />      
          <Route path="/verifycodeEmail" element={<VerifyCodeEmail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/google/:token" element={<GoogleRedirectHandler />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

          {/* Routes Admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="points" element={<Points />} />
            <Route path="products" element={<Products />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="quizs" element={<Quizs />} />
          </Route>
        </Routes>

        {/* Afficher Template uniquement sur les routes '/' et '/home' */}
        {showTemplate && <Template />}
        
        {/* Ne pas afficher le Footer si c'est une route Admin */}
        {!isAdminRoute && <Footer />}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;