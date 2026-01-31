/**
 * Technical Clubs Page
 * Displays all technical clubs with advanced filtering
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubCard, StatsCard, FilterBadge, FocusAreaTag } from '../components/ClubCards';
import {
  getTechnicalClubs,
  getUniqueFocusAreas,
  getCategoryStats,
  getClubsByMemberCount
} from '../utils/clubsLogic';

const TechnicalClubsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFocusArea, setSelectedFocusArea] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // name, members, founded

  const technicalClubs = useMemo(() => getTechnicalClubs(), []);
  const focusAreas = useMemo(() => getUniqueFocusAreas(), []);
  const categoryStats = useMemo(() => getCategoryStats(), []);

  const filteredClubs = useMemo(() => {
    let clubs = technicalClubs;

    // Search filter
    if (searchQuery.trim()) {
      clubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Focus area filter
    if (selectedFocusArea) {
      clubs = clubs.filter(club =>
        club.focusAreas.includes(selectedFocusArea)
      );
    }

    // Sorting
    if (sortBy === 'members') {
      clubs = [...clubs].sort((a, b) => b.memberCount - a.memberCount);
    } else if (sortBy === 'founded') {
      clubs = [...clubs].sort((a, b) => a.founded - b.founded);
    } else {
      clubs = [...clubs].sort((a, b) => a.name.localeCompare(b.name));
    }

    return clubs;
  }, [searchQuery, selectedFocusArea, sortBy, technicalClubs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/clubs')}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-all"
          >
            ← Back to Clubs
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">🔧 Technical Clubs</h1>
          <p className="text-blue-100 text-lg">Explore programming, innovation, and tech-focused groups</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon="🏢"
            label="Clubs"
            value={categoryStats.technical.count}
            color="blue"
          />
          <StatsCard
            icon="👥"
            label="Members"
            value={categoryStats.technical.members}
            color="blue"
          />
          <StatsCard
            icon="🏆"
            label="Achievements"
            value={categoryStats.technical.achievements}
            color="blue"
          />
          <StatsCard
            icon="📅"
            label="Events"
            value={categoryStats.technical.events}
            color="blue"
          />
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Clubs
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Focus Areas Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Filter by Focus Area
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFocusArea(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFocusArea === null
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All Areas
              </button>
              {focusAreas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedFocusArea(area)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFocusArea === area
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="members">Members (High to Low)</option>
              <option value="founded">Founded Year (Oldest First)</option>
            </select>
          </div>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {filteredClubs.length} Club{filteredClubs.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map(club => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No clubs found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFocusArea(null);
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">💡 About Technical Clubs</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our technical clubs are dedicated to fostering innovation, problem-solving, and collaboration in the fields of computer science, engineering, and technology. Whether you're interested in competitive programming, web development, AI/ML, or IoT/Robotics, we have a club for you!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">🎯 What You'll Learn</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Advanced programming techniques</li>
                <li>• Competitive coding strategies</li>
                <li>• Full-stack web development</li>
                <li>• AI/ML applications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">🌟 Member Benefits</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Mentorship from seniors</li>
                <li>• Hands-on projects</li>
                <li>• Competition participation</li>
                <li>• Industry connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalClubsPage;
