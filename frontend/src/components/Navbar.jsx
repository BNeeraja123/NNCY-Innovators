import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

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
          className="bg-gradient-to-r from-festival-cyan to-blue-400 hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition-all"
          title="Alumni Showcase"
        >
          👥 Alumni
        </button>
        <button
          onClick={() => navigate('/analytics')}
          className="bg-gradient-to-r from-festival-magenta to-festival-orange hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition-all"
          title="Analytics & Achievements"
        >
          📊 Analytics
        </button>
        <button
          onClick={() => navigate('/placement')}
          className="bg-gradient-to-r from-festival-orange to-festival-magenta hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition-all"
          title="Placement Cell"
        >
          💼 Placement
        </button>
        <button
          onClick={() => navigate('/clubs')}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition-all"
          title="Clubs & Societies"
        >
          🎭 Clubs
        </button>
        <button
          onClick={() => navigate('/chatbot')}
          className="bg-gradient-to-r from-festival-blue to-festival-cyan hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition-all"
          title="FAQ Chatbot"
        >
          💬 Help
        </button>
        <button
          onClick={handleHome}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          🏠 Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
