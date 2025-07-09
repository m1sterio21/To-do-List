import React, { memo } from 'react';
import {
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED
} from '../themes';

const FilterButtons = memo(({ filter, setFilter, activeTodosCount, clearCompleted, theme }) => {
  return (
    <div className="filter-buttons">
      <span>{activeTodosCount} задач осталось</span>
      <button
        className={`ghost-button ${filter === FILTER_ALL ? 'active' : ''}`}
        onClick={() => setFilter(FILTER_ALL)}
      >
        Все
      </button>
      <button
        className={`ghost-button ${filter === FILTER_ACTIVE ? 'active' : ''}`}
        onClick={() => setFilter(FILTER_ACTIVE)}
      >
        Активные
      </button>
      <button
        className={`ghost-button ${filter === FILTER_COMPLETED ? 'active' : ''}`}
        onClick={() => setFilter(FILTER_COMPLETED)}
      >
        Завершённые
      </button>
      <button 
        className="clear-completed-button"
        onClick={clearCompleted}
      >
        Очистить выполненные
      </button>
    </div>
  );
});

export default FilterButtons;