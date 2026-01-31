import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ClubCoordinatorLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Demo club coordinator credentials
  const DEMO_COORDINATORS = [
    { email: 'clubcoord@college.edu', password: 'clubcoord123', name: 'Club Coordinator', role: 'club_coordinator' },
    { email: 'admin@college.edu', password: 'admin123', name: 'Admin User', role: 'admin' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const demoCoordinator = DEMO_COORDINATORS.find(
        u => u.email === email && u.password === password
      );

      if (demoCoordinator) {
        setTimeout(() => {
          const userData = {
            email: demoCoordinator.email,
            name: demoCoordinator.name,
            role: demoCoordinator.role
          };
          
          login(userData);
          onLoginSuccess?.(userData);
          
          setEmail('');
          setPassword('');
          onClose();
        }, 500);
      } else {
        setError('Invalid email or password. Demo credentials: clubcoord@college.edu / clubcoord123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6">
          <h2 className="text-2xl font-bold text-white">Club Coordinator</h2>
          <p className="text-white text-opacity-90 mt-1">Secure Login</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}

          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs font-semibold">Demo Credentials:</p>
            <p className="text-blue-600 text-xs mt-1">Email: clubcoord@college.edu</p>
            <p className="text-blue-600 text-xs">Password: clubcoord123</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="clubcoord@college.edu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Only authorized club coordinators and admins can access this section.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClubCoordinatorLogin;
