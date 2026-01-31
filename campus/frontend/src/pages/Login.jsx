import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Store student credentials
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', email.split('@')[0]);
      
      // Redirect to home page
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-green-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">AttendanceHub</h1>
            <p className="text-gray-600">Smart Attendance Management</p>
          </div>



          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-6"
            >
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-bold text-gray-700 mb-2">Demo Student Emails:</p>
            <p className="text-sm text-gray-600">• student1@college.edu</p>
            <p className="text-sm text-gray-600">• student2@college.edu</p>
            <p className="text-sm text-gray-600">• student3@college.edu</p>
            <p className="text-sm text-gray-600 mt-2">Password: any password</p>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
