import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//QUIZDETAILS
const QuizDetail = () => {
  const { id } = useParams(); // Récupère l'ID du quiz depuis l'URL
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9090/api/quizzes/${id}`)
      .then(res => setQuiz(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!quiz) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{quiz.nom}</h1>
      <p><strong>Description :</strong> {quiz.description}</p>
      <p><strong>Difficulté :</strong> {quiz.difficulte}</p>

      <h2>Questions</h2>
      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((q, index) => (
          <div key={q.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h4>Question {index + 1} :</h4>
            <p><strong>Énoncé :</strong> {q.enonce}</p>
            <p><strong>Type :</strong> {q.type}</p>
            <p><strong>Points :</strong> {q.points}</p>
            <p><strong>Explication :</strong> {q.explication}</p>
          </div>
        ))
      ) : (
        <p>Aucune question pour ce quiz.</p>
      )}
    </div>
  );
};

export default QuizDetail;
