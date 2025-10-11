import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTodo({ title, dueDate, priority, completed: false });
    setTitle(''); setDueDate(''); setPriority('Low');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input type="text" placeholder="Todo..." value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
