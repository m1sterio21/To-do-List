import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./styles.css";

const TodoItem = memo(({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  editingId,
  setEditingId,
  theme,
  isNew
}) => {
  const [editedText, setEditedText] = useState(todo.text);
  const [removing, setRemoving] = useState(false);

  const isEditing = editingId === todo.id;

  const handleEdit = () => setEditingId(todo.id);
  const handleSave = () => {
    updateTodo(todo.id, editedText);
    setEditingId(null);
  };
  const handleCancel = () => {
    setEditedText(todo.text);
    setEditingId(null);
  };
  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => deleteTodo(todo.id), 400);
  };

  return (
    <AnimatePresence>
      {!removing && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className={`todo-item-wrapper ${isNew ? 'appearing' : ''}`}
        >
          {isEditing ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                className="todo-input"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  } else if (e.key === 'Escape') {
                    handleCancel();
                  }
                }}
              />
              <button className="add-button" onClick={handleSave}>
                Сохранить
              </button>
              <button
                className="add-button secondary"
                onClick={handleCancel}
              >
                Отмена
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : 'inherit'
                  }}
                >
                  {todo.text}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="add-button" onClick={handleEdit}>
                  Редактировать
                </button>
                <button
                  className="add-button"
                  style={{ background: '#ef4444' }}
                  onClick={handleDelete}
                >
                  Удалить
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default memo(TodoItem);
