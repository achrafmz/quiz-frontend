import React, { useState } from 'react';
import axios from 'axios';

const CreateQuizForm = () => {
  const [quizData, setQuizData] = useState({
    nom: '',
    description: '',
    difficulte: '',
    categorieId: '',
  });

  const [questions, setQuestions] = useState([
    { texte: '', options: [{ texte: '', correcte: false }] },
  ]);

  const handleChangeQuiz = (e) =>
    setQuizData({ ...quizData, [e.target.name]: e.target.value });

  const handleAddQuestion = () =>
    setQuestions([...questions, { texte: '', options: [{ texte: '', correcte: false }] }]);

  const handleChangeQuestion = (index, value) => {
    const updated = [...questions];
    updated[index].texte = value;
    setQuestions(updated);
  };

  const handleAddOption = (questionIndex) => {
    const newOption = { texte: '', correcte: false };
    const updated = [...questions];
    updated[questionIndex].options.push(newOption);
    setQuestions(updated);
  };

  const handleChangeOptionText = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex].texte = value;
    setQuestions(updated);
  };

  const handleChangeCorrectOption = (questionIndex, optionIndex) => {
    const updated = [...questions];
    updated[questionIndex].options.forEach((opt, i) => {
      opt.correcte = i === optionIndex;
    });
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Étape 1 : Créer le quiz
      const quizResponse = await axios.post('http://localhost:9090/api/quizzes', {
        nom: quizData.nom,
        description: quizData.description,
        difficulte: quizData.difficulte,
        categorieId: quizData.categorieId,
      });

      const quizId = quizResponse.data.id;

      for (const q of questions) {
        if (!q.texte.trim()) continue;

        // Étape 2 : Créer la question
        const questionResponse = await axios.post('http://localhost:9090/api/questions', {
          texte: q.texte,
          quiz: { id: quizId },
        });

        const questionId = questionResponse.data.id;

        // Étape 3 : Créer les options
        await axios.post(`http://localhost:9090/api/options/question/${questionId}`, q.options);
      }

      alert('Quiz créé avec succès !');
      window.location.href = '/quizzes';
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du quiz.");
    }
  };

  return (
    <div>
      <h2>Créer un quiz</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom du quiz" onChange={handleChangeQuiz} required />
        <input name="description" placeholder="Description" onChange={handleChangeQuiz} />
        <select name="difficulte" onChange={handleChangeQuiz} required>
          <option value="">-- Difficulté --</option>
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>
        <input name="categorieId" type="number" placeholder="ID Catégorie" onChange={handleChangeQuiz} />

        <hr />

        {questions.map((question, qIndex) => (
          <div key={qIndex} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <input
              placeholder="Texte de la question"
              value={question.texte}
              onChange={(e) => handleChangeQuestion(qIndex, e.target.value)}
              required
            />

            <h4>Options :</h4>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <input
                  type="text"
                  placeholder="Option"
                  value={option.texte}
                  onChange={(e) => handleChangeOptionText(qIndex, oIndex, e.target.value)}
                  required
                />
                <label style={{ marginLeft: '10px' }}>
                  <input
                    type="radio"
                    checked={option.correcte}
                    onChange={() => handleChangeCorrectOption(qIndex, oIndex)}
                  />
                  Bonne réponse
                </label>
              </div>
            ))}

            <button type="button" onClick={() => handleAddOption(qIndex)}>+ Ajouter option</button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>+ Ajouter une question</button>

        <hr />
        <button type="submit">Créer le quiz</button>
      </form>
    </div>
  );
};

export default CreateQuizForm;