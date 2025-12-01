import { FC, useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { AddTodoForm } from '../components/AddTodoForm';
import { FilterBar } from '../components/FilterBar';
import { TodoList } from '../components/TodoList';
import { EditTodoModal } from '../components/EditTodoModal';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types';

export const HomePage: FC = () => {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    stats,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (updatedTodo: Todo) => {
    updateTodo(updatedTodo.id, updatedTodo);
    setEditingTodo(null);
  };

  return (
    <div id="home-page" className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section id="hero-section" className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-lg">
              <CheckSquare size={32} className="text-white" />
            </div>
            <h1 id="hero-title" className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              My Tasks
            </h1>
          </div>
          <p id="hero-subtitle" className="text-xl text-gray-300 mb-2">Stay organized and accomplish your goals</p>
          <p id="hero-description" className="text-gray-400">Create, manage, and track your tasks with ease</p>
        </section>

        {/* Stats Cards */}
        <section id="stats-section" className="grid grid-cols-3 gap-4 mb-8">
          <div id="stat-total" className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-lg p-4 text-center backdrop-blur">
            <p className="text-gray-400 text-sm mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
          </div>
          <div id="stat-active" className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 rounded-lg p-4 text-center backdrop-blur">
            <p className="text-gray-400 text-sm mb-2">Active</p>
            <p className="text-3xl font-bold text-green-400">{stats.active}</p>
          </div>
          <div id="stat-completed" className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 rounded-lg p-4 text-center backdrop-blur">
            <p className="text-gray-400 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-purple-400">{stats.completed}</p>
          </div>
        </section>

        {/* Main Content */}
        <div id="todo-section" className="space-y-6">
          {/* Add Todo Form */}
          <AddTodoForm onAdd={addTodo} />

          {/* Filter Bar */}
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearCompleted={clearCompleted}
            stats={stats}
          />

          {/* Todo List */}
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={handleEditTodo}
          />

          {/* Edit Modal */}
          <EditTodoModal
            todo={editingTodo}
            isOpen={editingTodo !== null}
            onClose={() => setEditingTodo(null)}
            onSave={handleSaveEdit}
          />
        </div>
      </div>
    </div>
  );
};
