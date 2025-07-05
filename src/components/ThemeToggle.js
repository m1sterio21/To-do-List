import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      title={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
      style={{
        fontSize: '20px',
        padding: '8px 12px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: theme === 'dark' ? '#fff' : '#000'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
