import { FC } from 'react';
import { Plus } from 'lucide-react';
import { Todo } from '../types';

interface AddTodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ onAdd }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as 'low' | 'medium' | 'high';
    const dueDate = formData.get('dueDate') as string;

    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      });
      e.currentTarget.reset();
    }
  };

  return (
    <form
      id="add-todo-form"
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur rounded-2xl p-6 mb-8 hover:border-white/40 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="todo-title" className="block text-sm font-semibold text-gray-200 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            id="todo-title"
            name="title"
            placeholder="Add a new task..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="todo-description" className="block text-sm font-semibold text-gray-200 mb-2">
            Description
          </label>
          <textarea
            id="todo-description"
            name="description"
            placeholder="Add task details (optional)"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none resize-none transition-all"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="todo-priority" className="block text-sm font-semibold text-gray-200 mb-2">
              Priority
            </label>
            <select
              id="todo-priority"
              name="priority"
              defaultValue="medium"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            >
              <option value="low" className="bg-slate-900">Low</option>
              <option value="medium" className="bg-slate-900">Medium</option>
              <option value="high" className="bg-slate-900">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="todo-duedate" className="block text-sm font-semibold text-gray-200 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="todo-duedate"
              name="dueDate"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          id="add-todo-btn"
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};
