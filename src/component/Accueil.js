// Accueil.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Accueil.css';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function Accueil() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const pages = [1, 2, 3, '...', 67, 80];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/quizzes');
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des quizzes :', error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    };

    fetchQuizzes();
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Déconnexion réussie');
      navigate('/');  // redirige vers page d'accueil ou login
    } catch (error) {
      console.error('Erreur de déconnexion :', error);
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchSearch = quiz.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Toutes' || (quiz.categorie && quiz.categorie.nom === selectedCategory);
    return matchSearch && matchCategory;
  });

  const handlePlayClick = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="quiz-app">
      <header className="header">
        <h1 className="app-title">Quiz App</h1>
        <div className="header-right">
          {currentUser && (
            <>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
              <div className="user-profile">
                <div className="profile-trigger" onClick={() => setMenuOpen(!menuOpen)}>
                  <span className="user-name">{currentUser.displayName}</span>
                  <div className="avatar">
                    {currentUser.displayName
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                </div>

                {menuOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li><span className="menu-dot"></span>Profil</li>
                      <li><span className="menu-dot"></span>My Quiz</li>
                      <li><span className="menu-dot"></span>Settings</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="welcome-banner">
        <h2>Bonjour {currentUser?.displayName},</h2>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h2>Cours For You</h2>
          <div className="filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for Quiz"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="filter-dropdown">
              <select
                className="filter-button"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Toutes">Toutes les catégories</option>
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.nom}>
                    {categorie.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="course-grid">
          {loading ? (
            <p>Chargement des quizzes...</p>
          ) : filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="course-card">
                <div className="card-image-container">
                  <img
                    src={`data:image/jpeg;base64,${quiz.photo}`}
                    alt={quiz.nom}
                    className="card-image"
                  />
                  <button className="play-button" onClick={() => handlePlayClick(quiz.id)}>Play</button>
                </div>
                <h3 className="course-title">{quiz.nom}</h3>
                <p className="course-category">{quiz.categorie?.nom}</p>
              </div>
            ))
          ) : (
            <p>Aucun quiz trouvé.</p>
          )}
        </div>

        <div className="pagination">
          {pages.map((page, index) => (
            <button
              key={index}
              className={`page-button ${activePage === page ? 'active' : ''}`}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accueil;
