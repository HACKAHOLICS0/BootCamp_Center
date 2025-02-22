import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Remplacer useHistory par useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar.css";
import Cookies from "js-cookie"; // Importer js-cookie

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = () => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Mettez à jour l'état avec les données utilisateur
    }
  };

  // Charger l'utilisateur au montage et écouter les mises à jour
  useEffect(() => {
    updateUser();  // Charger l'utilisateur initialement
    
    const handleUserUpdate = () => updateUser();  // Mettre à jour l'utilisateur lors d'un changement
    window.addEventListener("userUpdated", handleUserUpdate);  // Écoute l'événement 'userUpdated'

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);  // Nettoyez l'écouteur d'événements
    };
  }, []);  // Seulement au montage du composant

  // Fonction pour déconnecter l'utilisateur
  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("user");
    Cookies.remove("token");  // Supprime aussi le token
    setUser(null);  // Réinitialiser l'état utilisateur
    window.dispatchEvent(new Event("userUpdated"));  // Notifie le changement
    navigate("/signin");  // Redirige après la déconnexion
  };

  return (
    <div id="header" className="bg-white text-dark py-3 shadow-lg">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo me-auto text-light">
          <Link to="/" className="text-light text-decoration-none">
            <span className="logo-text">CAMP X</span>
          </Link>
        </h1>
        <nav id="navbar" className="navbar navbar-expand-lg">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark hover-effect">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/modules" className="nav-link text-dark hover-effect">
                Modules
              </Link>
            </li>
            {user ? (
              <li className="nav-item d-flex">
                <Link to="/profile" className="nav-link text-dark hover-effect">
                  Profile
                </Link>
              
                <button
                  onClick={handleSignOut}
                  className="nav-link btn btn-link text-dark hover-effect"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link text-dark hover-effect">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link text-dark hover-effect">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <i className="bi bi-list mobile-nav-toggle text-dark d-block d-lg-none"></i>
        </nav>
      </div>
    </div>
  );
}
