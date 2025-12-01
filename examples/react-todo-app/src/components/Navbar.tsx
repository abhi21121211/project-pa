import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CheckSquare } from 'lucide-react';

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/settings', label: 'Settings' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav id="navbar" className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" id="navbar-logo" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
              <CheckSquare size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TaskPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div id="navbar-desktop-menu" className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`nav-${link.label.toLowerCase()}`}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="navbar-mobile-menu" className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`nav-mobile-${link.label.toLowerCase()}`}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
