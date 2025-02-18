import React, { useState } from 'react';
import { useNavigate , Link } from "react-router-dom";
import '../../assets/css/signin.css'; // Adds styles

export default function Signin() {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorDisplay, setErrorDisplay] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Call the backend API to authenticate the user
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, store the token (if needed) and redirect the user
        localStorage.setItem('token', data.token); // Assuming the API returns a JWT token
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event("userUpdated"));
        history('/profile'); // Redirect to the home page after successful login
      } else {
        setErrorDisplay(data.message || "Incorrect email or password");
      }
    } catch (err) {
      setErrorDisplay("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signin-container" style={{ marginTop: "100px", marginBottom: "100px" }}>
      <h1 className="signin-logo text-center">Sign In</h1>
      <form className="signin-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            placeholder="Enter Email" 
            onChange={onChange} 
            value={formData.email}
          />
        </div>
        <div className="form-group my-2">
          <input 
            type="password" 
            name="password" 
            className="form-control" 
            placeholder="Enter Password" 
            onChange={onChange} 
            value={formData.password}
          />
        </div>
        <Link to="/forget-password" className="forgot-password-link">Forgot Password?</Link>
        <div className="error-message" style={{ color: 'red', textAlign: 'center' }}>
          {errorDisplay}
        </div>
        <button type="submit" className="btn btn-submit">Submit</button>
      </form>
    </div>
  );
}
