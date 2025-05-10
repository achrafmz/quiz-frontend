import { useState } from 'react';
import { Eye } from 'lucide-react';
//quizAPP
export default function QuizApp() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const questions = [
    { 
      category: "Math", 
      text: "1+6X what is X" 
    },
    { 
      category: "Informatique", 
      text: "which syntaxe is correct for Python" 
    },
    { 
      category: "Math", 
      text: "1+4=?" 
    },
    { 
      category: "English", 
      text: "I (be) in the kitchen with the boys (past simple)" 
    }
  ];

  const menuItems = [
    { name: "Dashboard", active: false },
    { name: "Quiz", active: false },
    { name: "Questions", active: true },
    { name: "Users", active: false },
    { name: "Categorie", active: false },
    { name: "Settings", active: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200">
        <div className="p-4 font-bold border-b border-gray-200">Quiz app</div>
        <nav className="mt-2">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center p-3 ${item.active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 mr-2 rounded-full bg-gray-200`}></div>
              <span className={`${item.active ? 'font-medium' : ''}`}>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-lg font-medium">Questions</h1>
          <div className="flex items-center gap-4">
            <button className="px-3 py-1 bg-black text-white rounded">Logout</button>
            <div className="flex items-center gap-2">
              <span>Anasse lekkioui</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center">
                <span>A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-4 flex-1">
          <div className="mb-4">
            <button className="px-4 py-2 bg-black text-white rounded">Create a Question</button>
          </div>

          {/* Questions List */}
          <div className="bg-white border border-gray-200 rounded-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>All Questions</div>
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter By Categorie
                </button>
              </div>
            </div>

            {/* Questions */}
            {questions.map((question, index) => (
              <div key={index} className="border-b border-gray-200 p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{question.category}</div>
                  <div className="text-gray-600">{question.text}</div>
                </div>
                <div>
                  <Eye size={20} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button className="w-8 h-8 flex items-center justify-center bg-black text-white rounded">1</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">2</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">3</button>
            <span className="flex items-center">...</span>
            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">67</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">80</button>
          </div>
        </div>
      </div>
    </div>
  );
}