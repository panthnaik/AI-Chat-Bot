import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatsPage() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.filter(t => !t.completed).length;
  const byPriority = {
    Low: todos.filter(t => t.priority === 'Low').length,
    Medium: todos.filter(t => t.priority === 'Medium').length,
    High: todos.filter(t => t.priority === 'High').length,
  };

  return (
    <div>
      <h1>Todo Stats</h1>
      <p><strong>Total Todos:</strong> {total}</p>
      <p><strong>Completed:</strong> {completed}</p>
      <p><strong>Pending:</strong> {pending}</p>
      <h3>By Priority</h3>
      <ul>
        <li>Low: {byPriority.Low}</li>
        <li>Medium: {byPriority.Medium}</li>
        <li>High: {byPriority.High}</li>
      </ul>
    </div>
  );
}

export default StatsPage;
