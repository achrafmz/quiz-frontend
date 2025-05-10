// src/Register.js
import React, { useState } from 'react';
import './Signup.css';
import { auth, googleProvider } from './firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
//REGISTER
const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailRegister = async () => {
    if (!fullname || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // On met à jour le profil avec le fullname
      await updateProfile(userCredential.user, {
        displayName: fullname,
      });

      alert('Compte créé avec succès !');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
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
        <h2>Créer un compte</h2>
        <p>Entrez vos informations pour vous inscrire</p>

        <input
          type="text"
          placeholder="Nom complet"
          className="email-input"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
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

        <button className="email-button" onClick={handleEmailRegister}>
          S'inscrire avec Email
        </button>

        <div className="divider">ou continuez avec</div>

        <button className="google-button" onClick={handleGoogleRegister}>
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

export default Register;
