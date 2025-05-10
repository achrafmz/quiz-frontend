// EditQuiz.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditQuiz.css';
//EdiQUIZ
function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    description: '',
    difficulty: '',
    quizName: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/quiz/${id}`);
        setQuiz(response.data);
        setError(null);
      } catch (error) {
        console.error('Erreur lors du chargement du quiz:', error);
        setError('Erreur lors du chargement du quiz');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:9090/quiz/update/${id}`, quiz);
      navigate('/quiz-management');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du quiz:', error);
      setError('Erreur lors de la mise à jour du quiz');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-quiz-container">
      <h1>Modifier Quiz</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={quiz.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            id="difficulty"
            name="difficulty"
            value={quiz.difficulty}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="quizName">Quiz Name</label>
          <input
            type="text"
            id="quizName"
            name="quizName"
            value={quiz.quizName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={quiz.category}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/quiz-management')} className="cancel-btn">
            Annuler
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditQuiz;