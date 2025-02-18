import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Remplacer useHistory par useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  // Charger l'utilisateur au montage et écouter les mises à jour
  useEffect(() => {
    updateUser();

    // Écouter les changements avec un événement personnalisé
    const handleUserUpdate = () => updateUser();
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", handleUserUpdate);
    };
  }, []);

  // Fonction pour déconnecter l'utilisateur
  const handleSignOut = (e) => {
    e.preventDefault();  // Empêche la redirection
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userUpdated")); // Notifier le changement
    navigate("/");  // Utiliser navigate pour rediriger vers la page d'accueil
  };

  return (
    <div id="header" className="bg-white text-dark py-3 shadow-lg">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo me-auto text-light">
          <Link to="/" className="text-light text-decoration-none">
            <span className="logo-text">HACKAHOLICS</span>
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
            {user && user.typeUser === "user" ? (
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
