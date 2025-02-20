import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Composant pour les routes privées (protégées)
const PrivateRoute = ({ element }) => {
  // Vérifier si l'utilisateur est connecté (si le cookie "user" existe)
  const user = Cookies.get('user');

  // Si l'utilisateur est connecté, rendre l'élément, sinon rediriger vers la page de connexion
  return user ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
