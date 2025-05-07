// src/components/Login.js
import React, { useState } from 'react';
import './Signup.css'; // On réutilise le même CSS
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert('Veuillez entrer un email et un mot de passe');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie !');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Connexion avec Google réussie !');
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
        <p>Connectez-vous à votre compte</p>
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
          Se connecter avec email
        </button>
        <div className="divider">ou continuez avec</div>
        <button className="google-button" onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Google
        </button>
        <p className="terms">
          En continuant, vous acceptez nos <span>Conditions d'utilisation</span> et notre <span>Politique de confidentialité</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
