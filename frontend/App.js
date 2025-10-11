import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    const res = await axios.post('http://localhost:5000/api/todos', todo);
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(t => t._id === id);
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      completed: !todo.completed
    });
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 700, margin: '50px auto', textAlign: 'center' }}>
      <h1>Todo Manager</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <TodoForm addTodo={addTodo} />
      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
