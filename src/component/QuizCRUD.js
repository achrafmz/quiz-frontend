import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './QuizCRUD.css';

const API_URL = 'http://localhost:9090/api';

const QuizCRUD = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nom: '',
    description: '',
    difficulte: '',
    categorieId: '',
    photo: null
  });

  useEffect(() => {
    fetchQuizzes();
    fetchCategories();
  }, []);

  // Récupérer les quizzes depuis l'API
  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${API_URL}/quizzes`);
      console.log('Quizzes récupérés:', res.data); // Vérification des données
      setQuizzes(res.data);
    } catch (error) {
      console.error('Erreur de récupération des quizzes:', error);
    }
  };

  // Récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      console.log('Catégories récupérées:', res.data); // Vérification des catégories
      setCategories(res.data);
    } catch (error) {
      console.error('Erreur de récupération des catégories:', error);
    }
  };

  // Gérer le changement des champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gérer le changement du fichier (photo)
  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  // Soumettre le formulaire pour créer ou modifier un quiz
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', form.nom);
    formData.append('description', form.description);
    formData.append('difficulte', form.difficulte);
    formData.append('categorieId', form.categorieId);
    if (form.photo) {
      formData.append('photo', form.photo);
    }

    try {
      if (form.id) {
        await axios.put(`${API_URL}/quizzes/${form.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_URL}/quizzes`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setForm({ id: null, nom: '', description: '', difficulte: '', categorieId: '', photo: null });
      fetchQuizzes(); // Rafraîchir la liste des quizzes après soumission
    } catch (error) {
      console.error('Erreur lors de la soumission du quiz:', error);
    }
  };

  // Modifier un quiz
  const handleEdit = (quiz) => {
    setForm({
      id: quiz.id,
      nom: quiz.nom,
      description: quiz.description,
      difficulte: quiz.difficulte,
      categorieId: quiz.categorie.id,
      photo: null
    });
  };

  // Supprimer un quiz
  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await axios.delete(`${API_URL}/quizzes/${id}`);
        fetchQuizzes(); // Rafraîchir la liste après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du quiz:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="app-title">Quiz App</div>
        <nav className="nav-menu">
          {['Dashboard', 'Quiz', 'Questions', 'Users', 'Categorie', 'Settings'].map((item) => (
            <div key={item} className={`nav-item ${item === 'Quiz' ? 'active' : ''}`}>
              <div className="nav-icon"></div>
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h1 className="page-title">Gestion des Quiz</h1>
          <div className="user-controls">
            <button className="logout-btn">Logout</button>
            <div className="user-info">
              <span>Anasse Lekkioui</span>
              <div className="user-avatar-container">
                <div className="user-avatar"></div>
                <span className="dropdown-icon">▼</span>
              </div>
            </div>
          </div>
        </header>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-grid" encType="multipart/form-data">
            <div className="form-group">
              <label>Nom du Quiz</label>
              <input
                type="text"
                name="nom"
                placeholder="Nom du quiz"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Difficulté</label>
              <select
                name="difficulte"
                value={form.difficulte}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir la difficulté --</option>
                <option value="FACILE">FACILE</option>
                <option value="MOYENNE">MOYENNE</option>
                <option value="DIFFICILE">DIFFICILE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select
                name="categorieId"
                value={form.categorieId}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir une catégorie --</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                  ))
                ) : (
                  <option disabled>Aucune catégorie disponible</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label>Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="generate-btn">
              {form.id ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        </div>

        <div className="quiz-table-container">
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Difficulté</th>
                <th>Catégorie</th>
                <th>Image</th> {/* Nouvelle colonne pour l'image */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>{quiz.id}</td>
                    <td>{quiz.nom}</td>
                    <td>{quiz.description}</td>
                    <td>{quiz.difficulte}</td>
                    <td>{quiz.categorie ? quiz.categorie.nom : 'Aucune catégorie'}</td>
                    <td>
                      {quiz.photo ? (
                        <img src={quiz.photo} alt={quiz.nom} width="100" height="100" />
                      ) : (
                        'Pas d\'image'
                      )}
                    </td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleEdit(quiz)}>
                        <FaEdit />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(quiz.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    Aucun quiz trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizCRUD;