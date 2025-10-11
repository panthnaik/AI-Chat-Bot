import React from 'react';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  const priorityColor = {
    Low: '#a0e7a0',
    Medium: '#fce77d',
    High: '#f28c8c',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        background: todo.completed ? '#d3ffd3' : priorityColor[todo.priority],
        textDecoration: todo.completed ? 'line-through' : 'none',
        borderRadius: 5,
        alignItems: 'center'
      }}
    >
      <div onClick={() => toggleComplete(todo._id)} style={{ cursor: 'pointer', flex: 1 }}>
        <strong>{todo.title}</strong> <br />
        {todo.dueDate && <small>Due: {todo.dueDate}</small>} <br />
        <small>Priority: {todo.priority}</small>
      </div>
      <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>Delete</button>
    </div>
  );
}

export default TodoItem;
