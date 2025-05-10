// src/Login.js
import React, { useState } from 'react';
import './Signup.css'; // On réutilise ton style Signup
import { auth, googleProvider } from './firebase'; // adapte si ton fichier firebase est ailleurs
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
//LOGIN
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie !');
      navigate('/'); // Redirige vers page d'accueil ou dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Connexion Google réussie !');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="title">Quiz App</h1>
      <div className="signup-box">
        <h2>Connexion</h2>
        <p>Connectez-vous pour accéder à l'application</p>

        <input
          type="email"
          placeholder="Email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="email-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className="email-button" onClick={handleEmailLogin}>
          Se connecter avec Email
        </button>

        <div className="divider">ou continuez avec</div>

        <button className="google-button" onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Google
        </button>

        <p className="terms">
          En continuant, vous acceptez nos <span>Conditions d'utilisation</span> et notre <span>Politique de confidentialité</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
