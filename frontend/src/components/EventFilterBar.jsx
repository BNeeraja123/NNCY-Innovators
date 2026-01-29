import React from 'react';
import { eventCategories } from '../data/eventsFullData';

export default function EventFilterBar({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectedStatus,
  onStatusChange
}) {
  const statusOptions = [
    { value: 'all', label: 'All Events', icon: '📅' },
    { value: 'upcoming', label: 'Upcoming', icon: '🚀' },
    { value: 'ongoing', label: 'Ongoing', icon: '⏱️' },
    { value: 'completed', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events by title, venue, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-festival-orange transition"
          />
          <span className="absolute left-4 top-3.5 text-xl">🔍</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-festival-orange to-festival-tangerine text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Events
          </button>
          {eventCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === category.id
                  ? `bg-${category.color} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedStatus === status.value
                  ? 'bg-festival-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{status.icon}</span>
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options and View Mode */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-festival-orange transition"
            >
              <option value="date">Date (Newest)</option>
              <option value="popularity">Popularity</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div>
          <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-2">
            View
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-festival-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-festival-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ≡ List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
