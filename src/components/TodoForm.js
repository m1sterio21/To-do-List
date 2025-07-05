import React, { useState } from 'react';
import './styles.css';

const TodoForm = ({ addTodo, theme }) => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text, deadline);
    setText('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
      />
      <input
        className="deadline-input"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="add-button primary" type="submit">
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;