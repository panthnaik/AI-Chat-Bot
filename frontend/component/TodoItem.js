import React from 'react';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  const priorityColor = {
    Low: '#d0f0c0',
    Medium: '#fff4b3',
    High: '#f8b3b3',
  };

  return (
    <div
      className={`todo-card ${todo.completed ? 'completed' : ''}`}
      style={{ backgroundColor: todo.completed ? '#d3ffd3' : priorityColor[todo.priority] }}
    >
      <div className="info" onClick={() => toggleComplete(todo._id)}>
        <strong>{todo.title}</strong> <br />
        {todo.dueDate && <small>Due: {todo.dueDate}</small>} <br />
        <small>Priority: {todo.priority}</small>
      </div>
      <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
