/**
 * Cultural Groups Page
 * Displays all cultural groups with filtering and advanced search
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubCard, StatsCard, FilterBadge } from '../components/ClubCards';
import { getCulturalGroups, getCategoryStats } from '../utils/clubsLogic';

const CulturalGroupsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const culturalGroups = useMemo(() => getCulturalGroups(), []);
  const categoryStats = useMemo(() => getCategoryStats(), []);

  const filteredClubs = useMemo(() => {
    let clubs = culturalGroups;

    if (searchQuery.trim()) {
      clubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'members') {
      clubs = [...clubs].sort((a, b) => b.memberCount - a.memberCount);
    } else if (sortBy === 'founded') {
      clubs = [...clubs].sort((a, b) => a.founded - b.founded);
    } else {
      clubs = [...clubs].sort((a, b) => a.name.localeCompare(b.name));
    }

    return clubs;
  }, [searchQuery, sortBy, culturalGroups]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-magenta-600 to-pink-600 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/clubs')}
            className="flex items-center gap-2 text-magenta-100 hover:text-white mb-4 transition-all"
          >
            ← Back to Clubs
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">🎭 Cultural Groups</h1>
          <p className="text-magenta-100 text-lg">Experience art, music, theater, and cultural expression</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon="🎭"
            label="Groups"
            value={categoryStats.cultural.count}
            color="magenta"
          />
          <StatsCard
            icon="👥"
            label="Members"
            value={categoryStats.cultural.members}
            color="magenta"
          />
          <StatsCard
            icon="🏆"
            label="Achievements"
            value={categoryStats.cultural.achievements}
            color="magenta"
          />
          <StatsCard
            icon="📅"
            label="Events"
            value={categoryStats.cultural.events}
            color="magenta"
          />
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Groups
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-magenta-500"
            />
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-magenta-500"
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
              {filteredClubs.length} Group{filteredClubs.length !== 1 ? 's' : ''} Found
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
              No groups found matching your criteria
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-magenta-500 text-white rounded-lg hover:bg-magenta-600 transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Featured Groups Showcase */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🌟 Featured Performances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-magenta-50 dark:bg-magenta-900/20 rounded-lg p-8 border border-magenta-200 dark:border-magenta-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">🎵 Music Society Annual Gala</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Experience a spectacular showcase of classical and contemporary music performances featuring talented musicians from our society.
              </p>
              <button className="text-magenta-600 dark:text-magenta-400 font-medium hover:underline">
                Learn More →
              </button>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-8 border border-pink-200 dark:border-pink-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">🎬 Annual Theater Production</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Join us for a thrilling theatrical experience with original scripts, professional staging, and award-winning performances.
              </p>
              <button className="text-pink-600 dark:text-pink-400 font-medium hover:underline">
                Learn More →
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 bg-magenta-50 dark:bg-magenta-900/20 rounded-lg p-8 border border-magenta-200 dark:border-magenta-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎨 About Cultural Groups</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Our cultural groups celebrate diversity and artistic expression through music, dance, drama, and debate. Whether you're a seasoned performer or just looking to explore your creative side, there's a perfect group for you!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">🎪 Our Groups Include:</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>✦ Music Society - Classical & Contemporary</li>
                <li>✦ Drama & Theatre - Stage Productions</li>
                <li>✦ Dance Collective - Multiple Dance Forms</li>
                <li>✦ Debating Society - Public Speaking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">🌟 What Awaits You:</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>✦ Talent development and mentorship</li>
                <li>✦ Performance opportunities</li>
                <li>✦ Competitions & exhibitions</li>
                <li>✦ Community connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalGroupsPage;
