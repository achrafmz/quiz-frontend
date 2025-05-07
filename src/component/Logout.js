import React from 'react';
import { logout } from './authService';

function Logout() {
  const handleLogout = () => {
    logout();
    alert('Déconnexion réussie');
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
}

export default Logout;
