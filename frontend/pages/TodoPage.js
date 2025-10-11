import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (todo) => {
    const res = await axios.post('http://localhost:5000/api/todos', todo);
    setTodos([res.data, ...todos]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(t => t._id === id);
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed });
    setTodos(todos.map(t => t._id === id ? res.data : t));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo Manager</h1>

      <div className="filter-buttons">
        {['all','completed','pending'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TodoForm addTodo={addTodo} />
      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default TodoPage;
