import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar.css";
import Cookies from "js-cookie"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user"); // Si ton backend envoie l'user sous forme de chaîne JSON
    
    if (token && user) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", user, { expires: 7 });
  
      setUser(JSON.parse(user)); // Met à jour l'état avec les données utilisateur
      navigate("/"); // Redirige vers la page d'accueil après login
    }
  }, []);
  
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
  
    if (token) {
      // Stocker le token dans le localStorage ou dans les cookies
      localStorage.setItem("token", token);
      Cookies.set("token", token, { expires: 7 });
  
      // Vous pouvez aussi récupérer le profil utilisateur si nécessaire
      fetchUserProfile(token);
    }
  }, []);
  
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      if (data.user) {
        setUser(data.user); // Mettre à jour l'état utilisateur
      }
    } catch (err) {
      console.error("Error fetching user profile", err);
    }
  };
  
  // Fonction pour récupérer l'utilisateur stocké dans les cookies
  const updateUser = () => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  // Charger l'utilisateur au montage et écouter les mises à jour
  useEffect(() => {
    updateUser();
  
    const handleUserUpdate = () => {
      updateUser();
    };
  
    window.addEventListener("userUpdated", handleUserUpdate);
  
    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);
  
  

  // Fonction pour déconnecter l'utilisateur
  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("user");
    Cookies.remove("token"); 
    setUser(null);
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/signin"); 
  };

  console.log("Utilisateur actuel :", user); // 🔍 Vérification

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
