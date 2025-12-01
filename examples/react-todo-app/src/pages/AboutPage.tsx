import { FC } from 'react';
import { Heart, Code2, Zap, Users } from 'lucide-react';

export const AboutPage: FC = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Built with Vite for instant loading and smooth interactions',
    },
    {
      icon: <Heart size={32} />,
      title: 'Beautiful Design',
      description: 'Modern UI with gradient effects and smooth animations',
    },
    {
      icon: <Users size={32} />,
      title: 'User Friendly',
      description: 'Intuitive interface that anyone can use instantly',
    },
    {
      icon: <Code2 size={32} />,
      title: 'Open Source',
      description: 'Built with modern technologies and best practices',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
            About TaskPro
          </h1>
          <p className="text-xl text-gray-300 mb-2">Your Perfect Task Management Companion</p>
          <p className="text-gray-400">Designed to help you stay organized and productive</p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-8 backdrop-blur">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              We believe that staying organized shouldn't be complicated. TaskPro is designed to be the simplest yet most powerful todo app available. Whether you're managing personal projects, work tasks, or life goals, our app provides the tools you need to succeed.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're committed to continuous improvement and user satisfaction. Your feedback helps us build the best todo app possible.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose TaskPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Built With Modern Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  React 18 - Latest UI library
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  TypeScript - Type safe code
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  Tailwind CSS - Utility-first styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  React Router - Client-side routing
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold text-pink-400 mb-4">Tools & Libraries</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full" />
                  Vite - Next generation build tool
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full" />
                  Lucide React - Beautiful icons
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full" />
                  Local Storage API - Data persistence
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full" />
                  Modern CSS - Animations & effects
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '✅ Create & Manage', desc: 'Easily create, edit, and delete tasks' },
              { title: '🎯 Priorities', desc: 'Set task priority levels (Low, Medium, High)' },
              { title: '📅 Due Dates', desc: 'Track deadlines with due date reminders' },
              { title: '🔍 Search & Filter', desc: 'Find tasks instantly with powerful search' },
              { title: '📊 Analytics', desc: 'Track your productivity with detailed stats' },
              { title: '💾 Local Storage', desc: 'All data persists in your browser safely' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-400/20 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-8 backdrop-blur">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Head to the home page and start creating your first task. Experience the power of organized productivity today!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Start Using TaskPro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
