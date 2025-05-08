import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionCRUD.css"; // CSS modernisé ici

function QuestionCRUD() {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [form, setForm] = useState({
    enonce: "",
    type: "",
    points: 0,
    explication: "",
    quiz: { id: "" },
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuestions();
    fetchQuizzes();
  }, []);
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/questions");
      if (Array.isArray(res.data)) setQuestions(res.data);
      else setQuestions([]);
    } catch (error) {
      console.error("Erreur lors de la récupération des questions", error);
      setQuestions([]);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/quizzes");
      if (Array.isArray(res.data)) setQuizzes(res.data);
      else setQuizzes([]);
    } catch (error) {
      console.error("Erreur lors de la récupération des quizzes", error);
      setQuizzes([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quiz") {
      setForm({ ...form, quiz: { id: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:9090/api/questions/${editId}`, form);
      } else {
        await axios.post("http://localhost:9090/api/questions", form);
      }
      resetForm();
      fetchQuestions();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
    }
  };

  const resetForm = () => {
    setForm({
      enonce: "",
      type: "",
      points: 0,
      explication: "",
      quiz: { id: "" },
    });
    setEditId(null);
  };

  const handleEdit = (question) => {
    setForm({
      enonce: question.enonce,
      type: question.type,
      points: question.points,
      explication: question.explication,
      quiz: { id: question.quiz?.id || "" },
    });
    setEditId(question.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette question ?")) {
      try {
        await axios.delete(`http://localhost:9090/api/questions/${id}`);
        fetchQuestions();
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Header />
        <section className="content">
          <Card title={editId ? "Modifier une question" : "Ajouter une question"}>
            <Form onSubmit={handleSubmit}>
              <InputRow>
                <Input label="Énoncé" name="enonce" value={form.enonce} onChange={handleChange} required />
                <Input label="Points" name="points" type="number" value={form.points} onChange={handleChange} required />
              </InputRow>

              <InputRow>
                <Select
                  label="Type"
                  name="type"
                  value={form.type}
                  options={[
                    { value: "", label: "-- Sélectionner --" },
                    { value: "choix_multiple", label: "Choix multiple" },
                    { value: "unique", label: "Unique" },
                  ]}
                  onChange={handleChange}
                  required
                />

                <Select
                  label="Quiz"
                  name="quiz"
                  value={form.quiz.id}
                  options={[
                    { value: "", label: "-- Sélectionner un quiz --" },
                    ...quizzes.map(q => ({ value: q.id, label: q.nom })),
                  ]}
                  onChange={handleChange}
                  required
                />
              </InputRow>

              <Input label="Explication" name="explication" value={form.explication} onChange={handleChange} />

              <Button type="submit">{editId ? "Modifier" : "Enregistrer"}</Button>
            </Form>
          </Card>

          <Card title="Liste des Questions">
            <Table
              headers={["Énoncé", "Explication", "Points", "Type", "Quiz", "Actions"]}
              data={questions}
              renderRow={(q) => (
                <>
                  <td>{q.enonce}</td>
                  <td>{q.explication}</td>
                  <td>{q.points}</td>
                  <td>{q.type}</td>
                  <td>{q.quiz?.nom || "—"}</td>
                  <td>
                    <Btn onClick={() => handleEdit(q)}>Modifier</Btn>
                    <Btn variant="danger" onClick={() => handleDelete(q.id)}>Supprimer</Btn>
                  </td>
                </>
              )}
            />
          </Card>
        </section>
      </main>
    </div>
  );
}

// --- Composants réutilisables ------
const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="app-title">Quiz App</h2>
    <nav className="menu">
      {["Dashboard", "Quiz", "Questions", "Users", "Categorie", "Settings"].map((item) => (
        <div key={item} className={`menu-item ${item === "Questions" ? "active" : ""}`}>
          {item}
        </div>
      ))}
    </nav>
  </aside>
);

const Header = () => (
  <header className="header">
    <h2>Questions</h2>
    <div className="user-panel">
      <button className="logout-btn">Logout</button>
      <div className="profile">
        <span>Anasse Lekkioui</span>
        <img src="/api/placeholder/40/40" alt="Avatar" className="avatar" />
      </div>
    </div>
  </header>
);

const Card = ({ title, children }) => (
  <div className="card">
    <h3 className="card-header">{title}</h3>
    <div className="card-body">{children}</div>
  </div>
);

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="form">
    {children}
  </form>
);

const InputRow = ({ children }) => (
  <div className="input-row">{children}</div>
);

const Input = ({ label, ...props }) => (
  <div className="input-group">
    <label>{label}</label>
    <input {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="input-group">
    <label>{label}</label>
    <select {...props}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Button = ({ children, ...props }) => (
  <button className="btn primary" {...props}>
    {children}
  </button>
);

const Btn = ({ children, variant = "primary", onClick }) => (
  <button className={`btn ${variant}`} onClick={onClick}>
    {children}
  </button>
);

const Table = ({ headers, data, renderRow }) => (
  <table className="styled-table">
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((row, index) => (
          <tr key={index}>
            {renderRow(row)}
          </tr>
        ))
      ) : (
        <tr><td colSpan={headers.length}>Aucune donnée trouvée.</td></tr>
      )}
    </tbody>
  </table>
);

export default QuestionCRUD;