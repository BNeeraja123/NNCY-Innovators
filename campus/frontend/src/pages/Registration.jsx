import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    year: '1st Year',
    section: 'Section A',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredStudent, setRegisteredStudent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.rollNo || !formData.password) {
      setError('Please fill all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing registrations from localStorage
    const existingRegistrations = JSON.parse(localStorage.getItem('studentRegistrations') || '[]');
    
    // Add new registration
    const newRegistration = {
      id: Date.now(),
      ...formData,
      registeredAt: new Date().toLocaleString(),
      status: 'Active'
    };

    existingRegistrations.push(newRegistration);
    localStorage.setItem('studentRegistrations', JSON.stringify(existingRegistrations));

    setRegisteredStudent({
      name: formData.name,
      rollNo: formData.rollNo
    });
    setSuccess(true);
    setTimeout(() => {
      navigate('/login', { state: { role: 'student' } });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-green-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">AttendanceHub</h1>
            <p className="text-gray-600">Student Registration</p>
          </div>

          {success && (
            <div className="mb-6 p-6 bg-green-100 border-l-4 border-green-600 rounded-lg text-center">
              <div className="text-3xl mb-3">✓</div>
              <h2 className="text-xl font-bold text-green-800 mb-4">Registration Successful!</h2>
              <div className="bg-white p-4 rounded-lg mb-4 border border-green-300">
                <p className="text-gray-600 text-sm mb-2">Student Information</p>
                <p className="text-2xl font-bold text-primary mb-2">{registeredStudent?.name}</p>
                <p className="text-lg font-bold text-gray-800">Roll No: {registeredStudent?.rollNo}</p>
              </div>
              <p className="text-green-700 text-sm">Your registration is complete! Redirecting to login...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-800 rounded">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Roll No *</label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="CS2021001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option>Section A</option>
                  <option>Section B</option>
                  <option>Section C</option>
                  <option>Section D</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91-XXXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-6"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already registered?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-bold"
              >
                Login here
              </button>
            </p>
          </div>

          {/* Back Link */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:underline text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
