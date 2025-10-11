import React from 'react';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        background: '#f0f0f0',
        textDecoration: todo.completed ? 'line-through' : 'none',
        cursor: 'pointer'
      }}
    >
      <span onClick={() => toggleComplete(todo._id)}>{todo.title}</span>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
