import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: 20, textAlign: 'center' }}>
          <Link to="/" style={{ marginRight: 15 }}>Home</Link>
          <Link to="/stats">Stats</Link>
        </nav>

        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
