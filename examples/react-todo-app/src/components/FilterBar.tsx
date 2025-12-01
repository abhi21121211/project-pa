import { FC } from 'react';
import { FilterType } from '../types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearCompleted: () => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export const FilterBar: FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onClearCompleted,
  stats,
}) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
      />

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize transform hover:scale-105 ${
              currentFilter === filter
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Stats and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/20 rounded-lg p-4 backdrop-blur">
        <div className="flex gap-6 text-sm font-semibold">
          <span className="text-gray-300">
            Total: <span className="text-purple-400">{stats.total}</span>
          </span>
          <span className="text-green-300">
            Active: <span className="font-bold">{stats.active}</span>
          </span>
          <span className="text-blue-300">
            Completed: <span className="font-bold">{stats.completed}</span>
          </span>
        </div>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-sm text-red-400 hover:text-red-300 font-semibold transition-colors hover:bg-red-500/20 px-3 py-1 rounded-lg"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};
