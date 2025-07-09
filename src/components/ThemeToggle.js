import React, { memo, useEffect } from 'react';
import { LIGHT_THEME, DARK_THEME } from '../themes';

const ThemeToggle = memo(({ theme, setTheme }) => {
  useEffect(() => {
    document.body.classList.remove(LIGHT_THEME, DARK_THEME);
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle" title="Сменить тему">
      {theme === LIGHT_THEME ? '🌙' : '🌞'}
    </button>
  );
});

export default ThemeToggle;