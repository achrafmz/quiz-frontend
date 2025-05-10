import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons pour actions
import './CategoryApp.css'; // Assurez-vous que ce fichier CSS contient les styles nécessaires

const API_URL = 'http://localhost:9090/api';

const CategoryApp = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, nom: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Récupérer toutes les catégories
  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/categories`);
    setCategories(res.data);
  };

  // Gérer les changements dans le  formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire pour ajoutter ou modifier une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { nom: form.nom };

    if (form.id) {
      await axios.put(`${API_URL}/categories/${form.id}`, categoryData);
    } else {
      await axios.post(`${API_URL}/categories`, categoryData);
    }

    setForm({ id: null, nom: '' });
    fetchCategories();
  };

  // Modifier une categorie
  const handleEdit = (category) => {
    setForm({ id: category.id, nom: category.nom });
  };

  // Supprimer une categorie
  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      await axios.delete(`${API_URL}/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="app-title">Gestion des Catégories</div>
        <nav className="nav-menu">
          {['Dashboard', 'Quiz', 'Questions', 'Users', 'Categorie', 'Settings'].map((item) => (
            <div key={item} className={`nav-item ${item === 'Categorie' ? 'active' : ''}`}>
              <div className="nav-icon"></div>
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h1 className="page-title">Gestion des Catégories</h1>
        </header>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nom de la Catégorie</label>
              <input
                type="text"
                name="nom"
                placeholder="Nom de la catégorie"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="generate-btn">
              {form.id ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        </div>

        <div className="category-table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.nom}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleEdit(category)}>
                        <FaEdit />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(category.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>
                    Aucune catégorie trouvée
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

export default CategoryApp;
