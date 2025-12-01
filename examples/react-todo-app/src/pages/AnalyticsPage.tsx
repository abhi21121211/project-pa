import { FC } from 'react';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';

export const AnalyticsPage: FC = () => {
  const { allTodos, stats } = useTodos();

  const completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  const highPriorityTodos = allTodos.filter((t) => t.priority === 'high').length;
  const mediumPriorityTodos = allTodos.filter((t) => t.priority === 'medium').length;
  const lowPriorityTodos = allTodos.filter((t) => t.priority === 'low').length;

  const getStreakDays = () => {
    // Simple calculation: consecutive completed tasks in last 7 days
    return Math.min(stats.completed, 7);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Analytics
          </h1>
          <p className="text-gray-400 text-lg">Track your productivity and progress</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Completion Rate */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-6 backdrop-blur hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-semibold">Completion Rate</h3>
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {completionRate}%
            </p>
            <p className="text-gray-400 text-sm mt-2">{stats.completed} of {stats.total} tasks</p>
          </div>

          {/* Current Streak */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-semibold">Current Streak</h3>
              <Target className="text-blue-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {getStreakDays()}
            </p>
            <p className="text-gray-400 text-sm mt-2">Days active</p>
          </div>

          {/* Active Tasks */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-6 backdrop-blur hover:shadow-lg hover:shadow-green-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-semibold">Active Tasks</h3>
              <Calendar className="text-green-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              {stats.active}
            </p>
            <p className="text-gray-400 text-sm mt-2">In progress</p>
          </div>

          {/* Total Tasks */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 rounded-xl p-6 backdrop-blur hover:shadow-lg hover:shadow-orange-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-semibold">Total Tasks</h3>
              <BarChart3 className="text-orange-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              {stats.total}
            </p>
            <p className="text-gray-400 text-sm mt-2">All time</p>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Priority Breakdown */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-6">Priority Distribution</h2>
            <div className="space-y-4">
              {/* High Priority */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">High Priority</span>
                  <span className="text-red-400 font-semibold">{highPriorityTodos}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-full transition-all"
                    style={{
                      width: `${stats.total === 0 ? 0 : (highPriorityTodos / stats.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium Priority */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Medium Priority</span>
                  <span className="text-yellow-400 font-semibold">{mediumPriorityTodos}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full transition-all"
                    style={{
                      width: `${stats.total === 0 ? 0 : (mediumPriorityTodos / stats.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Low Priority */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Low Priority</span>
                  <span className="text-green-400 font-semibold">{lowPriorityTodos}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all"
                    style={{
                      width: `${stats.total === 0 ? 0 : (lowPriorityTodos / stats.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-6">Productivity Tips</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Focus on high-priority tasks first to maximize impact</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Break down complex tasks into smaller, manageable steps</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Review completed tasks regularly for motivation</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Set realistic due dates to maintain consistency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
