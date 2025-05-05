import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Accueil.css';

function Accueil() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [categories, setCategories] = useState([]);
  const pages = [1, 2, 3, '...', 67, 80];

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

  // Fonction pour filtrer selon recherche + catégorie
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchSearch = quiz.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Toutes' || (quiz.categorie && quiz.categorie.nom === selectedCategory);
    return matchSearch && matchCategory;
  });

  return (
    <div className="quiz-app">
      {/* Header */}
      <header className="header">
        <h1 className="app-title">Quiz App</h1>
        <div className="header-right">
          <button className="logout-btn">Log Out</button>
          <div className="user-profile">
            <div className="profile-trigger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="user-name">Achraf Mazouz</span>
              <div className="avatar">AM</div>
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
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>Bonjour Achraf,</h2>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h2>Cours For You</h2>

          <div className="filters">
            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for Quiz"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Filter Dropdown */}
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

        {/* Course Grid */}
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
                  <button className="play-button">Play</button>
                </div>
                <h3 className="course-title">{quiz.nom}</h3>
                <p className="course-category">{quiz.categorie?.nom}</p>
              </div>
            ))
          ) : (
            <p>Aucun quiz trouvé.</p>
          )}
        </div>

        {/* Pagination */}
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
