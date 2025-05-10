import React, { useState } from 'react';
import './QuizList.css';
//QUIZ
const QuizList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 80;

  // Sample data - in a real app, this would come from an API
  const quizResults = [
    { id: 24, user: 'Yousef55', email: 'J@gmail.', score: '77/100', category: 'React' },
    { id: 26, user: 'KamalMazo', email: 'd@gmail.com', score: '67/100', category: 'Past Simple' },
    { id: 24, user: 'Yousef55', email: 'J@gmail.', score: '35/100', category: 'React' },
    { id: 26, user: 'KamalMazo', email: 'd@gmail.com', score: '13/100', category: 'Past Simple' },
    { id: 24, user: 'Yousef55', email: 'J@gmail.', score: '64/100', category: 'React' },
    { id: 26, user: 'KamalMazo', email: 'd@gmail.com', score: '40/100', category: 'Past Simple' },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In areeal app, you would fetch data for the new page here
  };

  return (
    <div className="quiz-dashboard">
      <header className="dashboard-header">
        <h1>Quiz app</h1>
        <h2>Quiz Management</h2>
        
        <div className="user-info">
          <button className="logout-btn">Logout</button>
          <span className="username">Anasse lekkioui</span>
        </div>
      </header>

      <nav className="sidebar">
        <ul>
          <li className="active">Users Quiz</li>
          <li>Users</li>
          <li>Categories</li>
        </ul>
      </nav>

      <main className="content">
        <div className="table-container">
          <table className="quiz-results-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Difficulty</th>
                <th>Quiz Name</th>
                <th>Categorie</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.id}</td>
                  <td>{result.user}</td>
                  <td>{result.email}</td>
                  <td>{result.score}</td>
                  <td>{result.category}</td>
                  <td>
                    <button className="action-btn">💶</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button 
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}
          >
            First
          </button>
          
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </button>
          )}
          
          <button className="current-page">{currentPage}</button>
          
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </button>
          )}
          
          <span>...</span>
          
          <button 
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizList;