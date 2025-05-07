// Quiz.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';

function Quiz() {
  const { id } = useParams(); // récupère l'ID du quiz depuis l'URL
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/quizzes/${id}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement du quiz :', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return <div className="quiz-container"><p>Chargement du quiz...</p></div>;
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="quiz-container"><p>Ce quiz n'a pas de questions.</p></div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{quiz.nom}</h2>

      {showResults ? (
        <div className="results">
          <h3>Résultats</h3>
          <p>Score : {score} / {quiz.questions.length}</p>
        </div>
      ) : (
        <>
          <div className="question-section">
            <h3>Question {currentQuestionIndex + 1} : {currentQuestion.intitule}</h3>
            <div className="options-section">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-button ${
                    selectedOption === option.id ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSelectedOption(option.id);
                    handleOptionClick(option.correct);
                  }}
                >
                  {option.intitule}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
