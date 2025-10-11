import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleComplete }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;
