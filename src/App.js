import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

import {
  LIGHT_THEME,
  DARK_THEME,
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
  STORAGE_TODOS_KEY,
  STORAGE_THEME_KEY,
  TODO_ADDED_MESSAGE
} from './themes';

import Todo from './models/Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL);
  const [theme, setTheme] = useState(LIGHT_THEME);
  const [lastAddedId, setLastAddedId] = useState(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_TODOS_KEY);
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(todos));
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    document.body.className = theme === DARK_THEME ? 'dark' : '';
  }, [todos, theme]);

  const addTodo = (text, deadline) => {
    const newTodo = new Todo({ text, deadline });
    setTodos([...todos, newTodo]);
    setLastAddedId(newTodo.id);
    toast.success(TODO_ADDED_MESSAGE);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText, newDeadline) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, deadline: newDeadline } : todo
    ));
  };

  const reorderTodos = (newTodos) => {
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === FILTER_ACTIVE) return !todo.completed;
      if (filter === FILTER_COMPLETED) return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1>Todo List</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <TodoForm addTodo={addTodo} theme={theme} />
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        activeTodosCount={activeTodosCount}
        clearCompleted={clearCompleted}
        theme={theme}
      />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        reorderTodos={reorderTodos}
        theme={theme}
        lastAddedId={lastAddedId}
      />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </div>
  );
}

export default App;
