import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const quickLinksRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickLinksRef.current && !quickLinksRef.current.contains(event.target)) {
        setShowQuickLinks(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickLinkItems = [
    { label: 'Placement Cell', icon: '💼', path: '/placement' },
    { label: 'Clubs & Societies', icon: '🎭', path: '/clubs' },
    { label: 'Gallery', icon: '🖼️', path: '/gallery' },
    { label: 'Admissions', icon: '📝', path: '/admission' },
    { label: 'Alumni Success Stories', icon: '⭐', path: '/alumni' },
    { label: 'Key Achievements', icon: '🏆', path: '/analytics/achievements' },
  ];

  const handleQuickLinkClick = (path) => {
    navigate(path);
    setShowQuickLinks(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="text-gray-700 hover:text-primary transition text-2xl font-bold lg:hidden"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          🎉 Event Management
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-gray-700 font-bold">{userName}</span>
        </div>
        <button
          onClick={() => navigate('/alumni')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all shadow-sm"
          title="Alumni Showcase"
        >
          👥 Alumni
        </button>
        <button
          onClick={() => navigate('/analytics')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all shadow-sm"
          title="Analytics & Achievements"
        >
          📊 Analytics
        </button>
        <button
          onClick={() => navigate('/placement')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all shadow-sm"
          title="Placement Cell"
        >
          💼 Placement
        </button>
        <button
          onClick={() => navigate('/clubs')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all shadow-sm"
          title="Clubs & Societies"
        >
          🎭 Clubs
        </button>
        <button
          onClick={() => navigate('/chatbot')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all shadow-sm"
          title="FAQ Chatbot"
        >
          💬 Help
        </button>

        {/* Quick Links Dropdown */}
        <div ref={quickLinksRef} className="relative">
          <button
            onClick={() => setShowQuickLinks(!showQuickLinks)}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all shadow-sm flex items-center gap-2"
            title="Quick Links"
          >
            ⚡ Quick Links
            <svg
              className={`w-4 h-4 transition-transform ${showQuickLinks ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showQuickLinks && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border-2 border-primary z-50 animate-fadeIn">
              <div className="py-2">
                {quickLinkItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickLinkClick(item.path)}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-colors group border-b border-gray-100 last:border-0"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="font-medium text-gray-800 group-hover:text-white">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleHome}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          🏠 Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
