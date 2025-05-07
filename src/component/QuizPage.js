import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:9090/api';

const QuizPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_URL}/questions/quiz/${id}`);
        console.log("Données reçues:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setQuizName(response.data[0].quiz?.nom || 'Quiz Inconnu');
          setQuestions(response.data);
        } else {
          setError("Aucune question trouvée pour ce quiz.");
        }
      } catch (err) {
        console.error("Erreur réseau ou API:", err);
        setError("Erreur lors du chargement des questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="quiz-container">
      <h2>{quizName}</h2>
      {questions.map((question, index) => (
        <div key={question.id} className="question-card">
          <p><strong>Q{index + 1}:</strong> {question.enonce}</p>
          <ul>
            {question.options.map((option, idx) => (
              <li key={idx}>
                {option.texte} 
                {option.correcte && " ✔️"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizPage;