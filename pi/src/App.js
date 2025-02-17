import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Template from './template';
import Signin from './components/user/signin';
import Signup from './components/user/signup';
import ForgetPassword from './components/user/forgetPassword'; // Ajout de l'import pour ForgetPassword
import Profile from './components/user/profile'; // Ajout de l'import pour ForgetPassword

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Affichage de la Navbar */}
      <Navbar />

      <Routes>
        {/* Définition des routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} /> {/* Ajout de la route pour ForgetPassword */}
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* N'affiche Template que si on n'est pas sur la page signin, signup ou forget-password */}
      {location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/forget-password" && location.pathname !== "/profile" && <Template />}
      
      {/* Affichage du Footer */}
      <Footer />
    </div>
  );
}

export default App;
