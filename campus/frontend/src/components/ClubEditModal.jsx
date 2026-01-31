import React, { useState, useEffect } from 'react';

const ClubEditModal = ({ isOpen, onClose, onSubmit, club = null, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'technical',
    type: '',
    description: '',
    fullDescription: '',
    focusAreas: '',
    membershipFee: 'Free',
    meetingSchedule: '',
    joinLink: '',
    coordinators: '',
    facultyAdvisor: '',
    contactEmail: '',
    contactPhone: '',
    logo: '💻'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (club) {
      setFormData({
        name: club.name || '',
        category: club.category || 'technical',
        type: club.type || '',
        description: club.description || '',
        fullDescription: club.fullDescription || '',
        focusAreas: Array.isArray(club.focusAreas) ? club.focusAreas.join(', ') : '',
        membershipFee: club.membershipFee || 'Free',
        meetingSchedule: club.meetingSchedule || '',
        joinLink: club.joinLink || '',
        coordinators: club.coordinators?.map(c => `${c.name} (${c.position})`).join('; ') || '',
        facultyAdvisor: club.facultyAdvisor || '',
        contactEmail: club.contactEmail || '',
        contactPhone: club.contactPhone || '',
        logo: club.logo || '💻'
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        category: 'technical',
        type: '',
        description: '',
        fullDescription: '',
        focusAreas: '',
        membershipFee: 'Free',
        meetingSchedule: '',
        joinLink: '',
        coordinators: '',
        facultyAdvisor: '',
        contactEmail: '',
        contactPhone: '',
        logo: '💻'
      });
      setErrors({});
    }
  }, [club, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Club name is required';
    if (!formData.type.trim()) newErrors.type = 'Club type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        focusAreas: formData.focusAreas.split(',').map(area => area.trim()).filter(area => area),
        coordinators: formData.coordinators
      };
      onSubmit(submitData);
    }
  };

  if (!isOpen) return null;

  const isEditing = !!club;
  const categories = ['technical', 'cultural', 'sports'];
  const logoOptions = ['💻', '🎨', '⚽', '🎭', '🎸', '📚', '🔬', '🏆', '🎤', '🎬'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit Club' : 'Create New Club'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Club Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Club Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter club name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Club Logo
              </label>
              <div className="flex gap-2 flex-wrap">
                {logoOptions.map(logo => (
                  <button
                    key={logo}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, logo }))}
                    className={`text-2xl p-2 rounded ${
                      formData.logo === logo
                        ? 'bg-orange-100 border-2 border-orange-500'
                        : 'bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    {logo}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Club Type *
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="e.g., Programming, Sports"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter brief description"
                rows="2"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Full Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Enter detailed description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>

            {/* Focus Areas */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Focus Areas (comma-separated)
              </label>
              <input
                type="text"
                name="focusAreas"
                value={formData.focusAreas}
                onChange={handleInputChange}
                placeholder="e.g., Programming, Web Development, Algorithms"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>

            {/* Membership Fee */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Membership Fee
              </label>
              <input
                type="text"
                name="membershipFee"
                value={formData.membershipFee}
                onChange={handleInputChange}
                placeholder="e.g., Free or ₹200/year"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>

            {/* Meeting Schedule */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Meeting Schedule
              </label>
              <input
                type="text"
                name="meetingSchedule"
                value={formData.meetingSchedule}
                onChange={handleInputChange}
                placeholder="e.g., Friday 4:00 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>

            {/* Faculty Advisor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Faculty Advisor
              </label>
              <input
                type="text"
                name="facultyAdvisor"
                value={formData.facultyAdvisor}
                onChange={handleInputChange}
                placeholder="Advisor name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="club@college.edu"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="9876543210"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>

            {/* Coordinators Info */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Coordinators (name and position)
              </label>
              <textarea
                name="coordinators"
                value={formData.coordinators}
                onChange={handleInputChange}
                placeholder="e.g., John Doe (President); Jane Smith (Vice President)"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Club' : 'Create Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubEditModal;
