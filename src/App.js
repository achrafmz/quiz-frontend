import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import CreateQuizForm from './component/CreateQuizForm';
import QuizManagement from './component/QuizManagement';
import QuizApp from './component/QuizApp'; // Import my component
import CategoryApp from './component/CategoryApp'; // Import my component
import QuestionCRUD from './component/QuestionCRUD';
import CreateQuestion from './component/CreateQuestion';
import Accueil from './component/Accueil.js';
import Quiz from './component/Quiz.js';
import QuizCRUD from './component/QuizCRUD.js'; // Import my component
import Login from './component/Login.js';
import Register from './component/Register.js';
import Logout from './component/Logout.js';



 // Import my component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<CreateQuizForm />} />
        <Route path="/create-quiz" element={<QuizApp />} />
        <Route path="/categories" element={<CategoryApp />} />

        <Route path="/" element={<Accueil />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/questions" element={<QuestionCRUD />} />
        <Route path="/que" element={<CreateQuestion />} />
        <Route path="/quiz" element={<QuizCRUD />} />

        <Route path="/quiz-management" element={<QuizManagement />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;