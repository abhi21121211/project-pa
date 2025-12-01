import { FC, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Todo } from '../types';

interface EditTodoModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}

export const EditTodoModal: FC<EditTodoModalProps> = ({
  todo,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Todo>>({});

  useEffect(() => {
    if (todo) {
      setFormData(todo);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title?.trim()) {
      onSave({
        ...formData,
        title: formData.title.trim(),
        description: formData.description?.trim(),
      } as Todo);
      onClose();
    }
  };

  if (!isOpen || !todo) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-2xl shadow-2xl shadow-purple-500/30 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-200 mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="edit-title"
              value={formData.title || ''}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-semibold text-gray-200 mb-2">
              Description
            </label>
            <textarea
              id="edit-description"
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none resize-none transition-all"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="edit-priority" className="block text-sm font-semibold text-gray-200 mb-2">
              Priority
            </label>
            <select
              id="edit-priority"
              value={formData.priority || 'medium'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as 'low' | 'medium' | 'high',
                })
              }
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            >
              <option value="low" className="bg-slate-900">Low</option>
              <option value="medium" className="bg-slate-900">Medium</option>
              <option value="high" className="bg-slate-900">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="edit-dueDate" className="block text-sm font-semibold text-gray-200 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="edit-dueDate"
              value={
                formData.dueDate
                  ? new Date(formData.dueDate).toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dueDate: e.target.value ? new Date(e.target.value) : undefined,
                })
              }
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
