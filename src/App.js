import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [lastAddedId, setLastAddedId] = useState(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedTheme = localStorage.getItem('theme');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [todos, theme]);

  const addTodo = (text, deadline) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null
    };
    setTodos([...todos, newTodo]);
    setLastAddedId(newTodo.id);
    toast.success('Задача добавлена ✅');
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
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
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
