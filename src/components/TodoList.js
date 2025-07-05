import React, { useState } from 'react';
import TodoItem from './TodoItem';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './styles.css';

function SortableTodo({ todo, index, theme, isNew, ...props }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoItem todo={todo} index={index} theme={theme} isNew={isNew} {...props} />
    </div>
  );
}

const TodoList = ({ todos, toggleTodo, deleteTodo, updateTodo, reorderTodos, theme, lastAddedId }) => {
  const [editingId, setEditingId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    const newTodos = arrayMove(todos, oldIndex, newIndex);
    reorderTodos(newTodos);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="todos-container">
          {todos.length === 0 ? (
            <div className="empty-message">Нет задач</div>
          ) : (
            todos.map((todo, index) => (
              <SortableTodo
                key={todo.id}
                todo={todo}
                index={index}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                editingId={editingId}
                setEditingId={setEditingId}
                theme={theme}
                isNew={todo.id === lastAddedId}
              />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
