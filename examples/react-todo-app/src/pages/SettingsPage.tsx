import { FC, useState } from 'react';
import { Settings, Bell, Moon, Zap } from 'lucide-react';

export const SettingsPage: FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState(true);
  const [dueDateReminders, setDueDateReminders] = useState(true);
  const [completionNotifications, setCompletionNotifications] = useState(true);

  const handleExportData = () => {
    const todos = localStorage.getItem('todos');
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(todos || '')}`);
    element.setAttribute('download', 'todos-backup.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      localStorage.removeItem('todos');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="text-purple-400" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-400 text-lg">Customize your TaskPro experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="text-blue-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div>
                  <p className="text-white font-semibold">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Use dark theme for reduced eye strain</p>
                </div>
                <label className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                </label>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-pink-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-white font-semibold">Enable Notifications</p>
                  <p className="text-gray-400 text-sm">Receive notifications for your tasks</p>
                </div>
                <label className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600" />
                </label>
              </div>

              {notifications && (
                <>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div>
                      <p className="text-white font-semibold">Due Date Reminders</p>
                      <p className="text-gray-400 text-sm">Get reminded about upcoming due dates</p>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={dueDateReminders}
                        onChange={() => setDueDateReminders(!dueDateReminders)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div>
                      <p className="text-white font-semibold">Completion Notifications</p>
                      <p className="text-gray-400 text-sm">Celebrate when you complete tasks</p>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={completionNotifications}
                        onChange={() => setCompletionNotifications(!completionNotifications)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
                    </label>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Data Management */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Data Management</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleExportData}
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                📥 Export Data
              </button>
              <button
                onClick={handleClearAllData}
                className="w-full p-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                🗑️ Clear All Data
              </button>
              <p className="text-gray-400 text-sm text-center">
                Your data is stored locally in your browser. Export regularly for backup.
              </p>
            </div>
          </section>

          {/* About App */}
          <section className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-6 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-4">App Information</h2>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">Version:</span> 1.0.0</p>
              <p><span className="text-gray-400">Last Updated:</span> November 2025</p>
              <p><span className="text-gray-400">Built with:</span> React, TypeScript, Tailwind CSS</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
