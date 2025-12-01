import { FC } from 'react';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500/30 text-red-200 border border-red-400/50';
    case 'medium':
      return 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50';
    case 'low':
      return 'bg-green-500/30 text-green-200 border border-green-400/50';
    default:
      return 'bg-gray-500/30 text-gray-200 border border-gray-400/50';
  }
};

const formatDate = (date: Date | undefined) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div
      className={`bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur rounded-xl p-5 mb-4 transition-all hover:border-white/40 hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-102 ${
        todo.completed ? 'opacity-60 bg-green-500/10 border-green-400/30' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-1 text-purple-400 hover:text-pink-400 transition-colors flex-shrink-0 hover:scale-110 transform"
        >
          {todo.completed ? (
            <CheckCircle size={24} className="text-green-400" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold ${
              todo.completed
                ? 'line-through text-gray-400'
                : 'text-white'
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p
              className={`text-sm mt-2 ${
                todo.completed ? 'text-gray-500' : 'text-gray-300'
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority}
            </span>

            {todo.dueDate && (
              <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                📅 {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(todo)}
            className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-white/10 rounded-lg transform hover:scale-110"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-white/10 rounded-lg transform hover:scale-110"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
