import React, { useState, useEffect } from 'react';

const StudentEditModal = ({ isOpen, onClose, student, onSave, isLoading = false }) => {
  const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'CIVIL'];
  const years = ['2023', '2024', '2025', '2026'];

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branch: 'CSE',
    batch: '2024',
    company: '',
    position: '',
    package: '',
    location: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        rollNo: student.rollNo || '',
        branch: student.branch || 'CSE',
        batch: student.batch || '2024',
        company: student.company || '',
        position: student.position || '',
        package: student.package || '',
        location: student.location || '',
        email: student.email || ''
      });
    } else {
      setFormData({
        name: '',
        rollNo: '',
        branch: 'CSE',
        batch: '2024',
        company: '',
        position: '',
        package: '',
        location: '',
        email: ''
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required';
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-6 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-white">
            {student ? 'Edit Student Record' : 'Add Placed Student'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Raj Kumar"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Roll Number *
              </label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="e.g., CSE001"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.rollNo ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Branch
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Batch Year
              </label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Package */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Package (LPA)
              </label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g., 20"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bangalore"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEditModal;
