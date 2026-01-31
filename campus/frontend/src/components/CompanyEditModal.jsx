import React, { useState, useEffect } from 'react';

const CompanyEditModal = ({ isOpen, onClose, company, onSave, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    location: '',
    website: '',
    contactEmail: '',
    minPackage: '',
    maxPackage: '',
    visitYear: new Date().getFullYear(),
    registrationDeadline: '',
    registrationLink: '',
    registrationStatus: 'open'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        logo: company.logo || '',
        location: company.location || '',
        website: company.website || '',
        contactEmail: company.contactEmail || '',
        minPackage: company.minPackage || '',
        maxPackage: company.maxPackage || '',
        visitYear: company.visitYear || new Date().getFullYear(),
        registrationDeadline: company.registrationDeadline || '',
        registrationLink: company.registrationLink || '',
        registrationStatus: company.registrationStatus || 'open'
      });
    } else {
      setFormData({
        name: '',
        logo: '',
        location: '',
        website: '',
        contactEmail: '',
        minPackage: '',
        maxPackage: '',
        visitYear: new Date().getFullYear(),
        registrationDeadline: '',
        registrationLink: '',
        registrationStatus: 'open'
      });
    }
    setErrors({});
  }, [company, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
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
            {company ? 'Edit Company' : 'Add New Company'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Google"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bangalore, India"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="recruiter@company.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
            </div>

            {/* Min Package */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min Package (LPA)
              </label>
              <input
                type="text"
                name="minPackage"
                value={formData.minPackage}
                onChange={handleChange}
                placeholder="e.g., 10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Max Package */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Package (LPA)
              </label>
              <input
                type="text"
                name="maxPackage"
                value={formData.maxPackage}
                onChange={handleChange}
                placeholder="e.g., 30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Visit Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visit Year
              </label>
              <input
                type="number"
                name="visitYear"
                value={formData.visitYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Registration Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Deadline
              </label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Link
              </label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Registration Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Status
              </label>
              <select
                name="registrationStatus"
                value={formData.registrationStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="upcoming">Upcoming</option>
              </select>
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
              {isLoading ? 'Saving...' : company ? 'Update Company' : 'Add Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyEditModal;
