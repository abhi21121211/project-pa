import { FC } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block mb-4 text-6xl">📭</div>
        <p className="text-gray-400 text-lg font-semibold">No tasks found</p>
        <p className="text-gray-500 text-sm mt-2">Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
