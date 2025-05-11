import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizTestPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [questionPoints, setQuestionPoints] = useState(1);
  const [questionExplanation, setQuestionExplanation] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Fetch quizes from the backend
    axios
      .get("http://localhost:8080/api/quizzes")
      .then((response) => {
        setQuiz(response.data[0]); // Assuming we use the first quiz for testing
      })
      .catch((error) => {
        console.error("There was an error fetching the quiz data!", error);
      });
  }, []);

  const handleSubmitQuestion = () => {
    const question = {
      enonce: questionText,
      type: questionType,
      points: questionPoints,
      explication: questionExplanation,
      quiz: { id: quiz.id },
    };

    // Sending question data to the backend
    axios
      .post(`http://localhost:8080/api/questions`, question)
      .then((response) => {
        console.log("Question added successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error adding the question!", error);
      });
  };

  const handleSubmitResponse = (questionId) => {
    const response = {
      textReponse: responseText,
      estCorrect: isCorrect,
      question: { id: questionId },
    };

    // Sending response data to the backend
    axios
      .post(`http://localhost:8080/api/reponses`, response)
      .then((response) => {
        console.log("Response added successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error adding the response!", error);
      });
  };

  return (
    <div>
      <h1>Test Quiz</h1>

      {quiz ? (
        <div>
          <h2>Quiz: {quiz.nom}</h2>
          <p>{quiz.description}</p>

          {/* Question Form */}
          <div>
            <h3>Add Question</h3>
            <input
              type="text"
              placeholder="Question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
            </select>
            <input
              type="number"
              placeholder="Points"
              value={questionPoints}
              onChange={(e) => setQuestionPoints(e.target.value)}
            />
            <textarea
              placeholder="Explanation"
              value={questionExplanation}
              onChange={(e) => setQuestionExplanation(e.target.value)}
            />
            <button onClick={handleSubmitQuestion}>Add Question</button>
          </div>

          {/* Response Form */}
          <div>
            <h3>Add Response</h3>
            <input
              type="text"
              placeholder="Response text"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />
            <label>
              Correct:
              <input
                type="checkbox"
                checked={isCorrect}
                onChange={(e) => setIsCorrect(e.target.checked)}
              />
            </label>
            <button onClick={() => handleSubmitResponse(1)}>
              Add Response to Question
            </button>
          </div>
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizTestPage;
