import React from 'react';
import './styles.css';

const FilterButtons = ({ filter, setFilter, activeTodosCount, clearCompleted }) => {
  return (
    <div className="filter-buttons">
      <span className="filter-count">{activeTodosCount} задач осталось</span>

      <div className="filter-group">
        <button
          className={`ghost-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`ghost-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={`ghost-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Завершённые
        </button>
      </div>

      <button className="add-button secondary" onClick={clearCompleted}>
        Очистить выполненные
      </button>
    </div>
  );
};

export default FilterButtons;