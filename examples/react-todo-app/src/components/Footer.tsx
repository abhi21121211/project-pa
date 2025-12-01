import { FC } from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-white/5 border-t border-white/20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div id="footer-brand">
            <h3 className="text-xl font-bold text-white mb-4">TaskPro</h3>
            <p className="text-gray-400">Stay organized and productive with our beautiful todo app.</p>
          </div>

          {/* Quick Links */}
          <nav id="footer-quicklinks">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" id="footer-link-home" className="hover:text-white transition">Home</a></li>
              <li><a href="/analytics" id="footer-link-analytics" className="hover:text-white transition">Analytics</a></li>
              <li><a href="/settings" id="footer-link-settings" className="hover:text-white transition">Settings</a></li>
              <li><a href="/about" id="footer-link-about" className="hover:text-white transition">About</a></li>
            </ul>
          </nav>

          {/* Features */}
          <nav id="footer-features">
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Create Tasks</a></li>
              <li><a href="#" className="hover:text-white transition">Track Progress</a></li>
              <li><a href="#" className="hover:text-white transition">Collaborate</a></li>
              <li><a href="#" className="hover:text-white transition">Analytics</a></li>
            </ul>
          </nav>

          {/* Social Links */}
          <div id="footer-social">
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a id="social-github" href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Github size={24} />
              </a>
              <a id="social-twitter" href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Twitter size={24} />
              </a>
              <a id="social-linkedin" href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Linkedin size={24} />
              </a>
              <a id="social-mail" href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p id="footer-copyright">&copy; {currentYear} TaskPro. All rights reserved.</p>
            <div id="footer-legal" className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
