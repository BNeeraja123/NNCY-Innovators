import React, { useState, useEffect } from 'react';
import { convertTo24Hour, convertTo12Hour, safeValue } from '../utils/timeUtils';

const EventEditModal = ({ isOpen, onClose, onSubmit, event = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    description: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    venue: '',
    venueCapacity: '',
    registrationDeadline: '',
    status: 'Upcoming',
    fullDescription: '',
    rules: '',
    eligibility: '',
    prizes: '',
    requirements: '',
    coordinatorName: '',
    coordinatorEmail: '',
    coordinatorPhone: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        title: safeValue(event.title),
        category: safeValue(event.category) || 'Academic',
        description: safeValue(event.description),
        date: safeValue(event.date),
        time: convertTo24Hour(safeValue(event.time)),
        endDate: safeValue(event.endDate),
        endTime: convertTo24Hour(safeValue(event.endTime)),
        venue: safeValue(event.venue),
        venueCapacity: safeValue(event.venueCapacity),
        registrationDeadline: safeValue(event.registrationDeadline),
        status: safeValue(event.status) || 'Upcoming',
        fullDescription: safeValue(event.fullDescription),
        rules: safeValue(event.rules),
        eligibility: safeValue(event.eligibility),
        prizes: safeValue(event.prizes),
        requirements: safeValue(event.requirements),
        coordinatorName: safeValue(event.coordinatorName),
        coordinatorEmail: safeValue(event.coordinatorEmail),
        coordinatorPhone: safeValue(event.coordinatorPhone)
      });
    } else {
      setFormData({
        title: '',
        category: 'Academic',
        description: '',
        date: '',
        time: '',
        endDate: '',
        endTime: '',
        venue: '',
        venueCapacity: '',
        registrationDeadline: '',
        status: 'Upcoming',
        fullDescription: '',
        rules: '',
        eligibility: '',
        prizes: '',
        requirements: '',
        coordinatorName: '',
        coordinatorEmail: '',
        coordinatorPhone: ''
      });
      setErrors({});
    }
  }, [event, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Event description is required';
    if (!formData.date) newErrors.date = 'Event date is required';
    if (!formData.time) newErrors.time = 'Event time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.venueCapacity || formData.venueCapacity <= 0) {
      newErrors.venueCapacity = 'Venue capacity must be greater than 0';
    }
    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = 'Registration deadline is required';
    }
    if (!formData.coordinatorName.trim()) newErrors.coordinatorName = 'Coordinator name is required';
    if (!formData.coordinatorEmail.trim()) {
      newErrors.coordinatorEmail = 'Coordinator email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.coordinatorEmail)) {
      newErrors.coordinatorEmail = 'Please enter a valid email address';
    }
    if (!formData.coordinatorPhone.trim()) newErrors.coordinatorPhone = 'Coordinator phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert times back to 12-hour format for display
      const submitData = {
        ...formData,
        time: convertTo12Hour(formData.time) || formData.time,
        endTime: convertTo12Hour(formData.endTime) || formData.endTime
      };
      onSubmit(submitData);
    }
  };

  if (!isOpen) return null;

  const isEditing = !!event;
  const categories = ['Academic', 'Cultural', 'Sports', 'Tech', 'Placement', 'Other'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                rows="2"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Venue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Venue *
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="Enter venue location"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.venue ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue}</p>}
            </div>

            {/* Venue Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Venue Capacity *
              </label>
              <input
                type="number"
                name="venueCapacity"
                value={formData.venueCapacity}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.venueCapacity ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.venueCapacity && <p className="text-red-500 text-xs mt-1">{errors.venueCapacity}</p>}
            </div>

            {/* Registration Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Registration Deadline *
              </label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.registrationDeadline ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.registrationDeadline && <p className="text-red-500 text-xs mt-1">{errors.registrationDeadline}</p>}
            </div>

            {/* Eligibility */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Eligibility Criteria
              </label>
              <textarea
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                placeholder="Enter eligibility criteria"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Rules */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Rules & Regulations
              </label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleInputChange}
                placeholder="Enter event rules"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Prizes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Prizes & Awards
              </label>
              <textarea
                name="prizes"
                value={formData.prizes}
                onChange={handleInputChange}
                placeholder="Enter prize details"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Coordinator Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Coordinator Name *
              </label>
              <input
                type="text"
                name="coordinatorName"
                value={formData.coordinatorName}
                onChange={handleInputChange}
                placeholder="Enter coordinator name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.coordinatorName ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.coordinatorName && <p className="text-red-500 text-xs mt-1">{errors.coordinatorName}</p>}
            </div>

            {/* Coordinator Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Coordinator Email *
              </label>
              <input
                type="email"
                name="coordinatorEmail"
                value={formData.coordinatorEmail}
                onChange={handleInputChange}
                placeholder="coordinator@college.edu"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.coordinatorEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.coordinatorEmail && <p className="text-red-500 text-xs mt-1">{errors.coordinatorEmail}</p>}
            </div>

            {/* Coordinator Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Coordinator Phone *
              </label>
              <input
                type="tel"
                name="coordinatorPhone"
                value={formData.coordinatorPhone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.coordinatorPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.coordinatorPhone && <p className="text-red-500 text-xs mt-1">{errors.coordinatorPhone}</p>}
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
              className="px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEditModal;
