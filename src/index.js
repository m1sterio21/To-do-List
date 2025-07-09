import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Установка начальной темы
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;

root.render(
    <App />
);