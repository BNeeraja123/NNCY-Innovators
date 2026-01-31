import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PlacementCoordinatorLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Demo coordinator credentials
  const DEMO_COORDINATORS = [
    { email: 'coordinator@college.edu', password: 'coordinator123', name: 'Dr. Placement Coordinator', role: 'placement_coordinator' },
    { email: 'admin@college.edu', password: 'admin123', name: 'Admin User', role: 'admin' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check demo coordinators
      const demoCoordinator = DEMO_COORDINATORS.find(
        u => u.email === email && u.password === password
      );

      if (demoCoordinator) {
        // Simulate API call
        setTimeout(() => {
          const userData = {
            email: demoCoordinator.email,
            name: demoCoordinator.name,
            role: demoCoordinator.role
          };
          
          login(userData);
          onLoginSuccess?.(userData);
          
          // Reset form
          setEmail('');
          setPassword('');
          onClose();
        }, 500);
      } else {
        setError('Invalid email or password. Demo credentials: coordinator@college.edu / coordinator123');
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
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-6">
          <h2 className="text-2xl font-bold text-white">Placement Coordinator</h2>
          <p className="text-white text-opacity-90 mt-1">Secure Login</p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs font-semibold">Demo Credentials:</p>
            <p className="text-blue-600 text-xs mt-1">Email: coordinator@college.edu</p>
            <p className="text-blue-600 text-xs">Password: coordinator123</p>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coordinator@college.edu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          {/* Buttons */}
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Only authorized placement coordinators and admins can access this section.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PlacementCoordinatorLogin;
