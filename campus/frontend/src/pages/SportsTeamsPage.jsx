/**
 * Sports Teams Page
 * Displays all sports teams with filtering and statistics
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubCard, StatsCard } from '../components/ClubCards';
import { getSportsTeams, getCategoryStats } from '../utils/clubsLogic';

const SportsTeamsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const sportsTeams = useMemo(() => getSportsTeams(), []);
  const categoryStats = useMemo(() => getCategoryStats(), []);

  const filteredTeams = useMemo(() => {
    let teams = sportsTeams;

    if (searchQuery.trim()) {
      teams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'members') {
      teams = [...teams].sort((a, b) => b.memberCount - a.memberCount);
    } else if (sortBy === 'founded') {
      teams = [...teams].sort((a, b) => a.founded - b.founded);
    } else {
      teams = [...teams].sort((a, b) => a.name.localeCompare(b.name));
    }

    return teams;
  }, [searchQuery, sortBy, sportsTeams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/clubs')}
            className="flex items-center gap-2 text-orange-100 hover:text-white mb-4 transition-all"
          >
            ← Back to Clubs
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">⚽ Sports Teams</h1>
          <p className="text-orange-100 text-lg">Join our competitive and recreational sports teams</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon="⚽"
            label="Teams"
            value={categoryStats.sports.count}
            color="orange"
          />
          <StatsCard
            icon="👥"
            label="Players"
            value={categoryStats.sports.members}
            color="orange"
          />
          <StatsCard
            icon="🏆"
            label="Achievements"
            value={categoryStats.sports.achievements}
            color="orange"
          />
          <StatsCard
            icon="📅"
            label="Events"
            value={categoryStats.sports.events}
            color="orange"
          />
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Teams
            </label>
            <input
              type="text"
              placeholder="Search by team name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="members">Squad Size (Largest First)</option>
              <option value="founded">Founded Year (Oldest First)</option>
            </select>
          </div>
        </div>

        {/* Teams Grid */}
        {filteredTeams.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {filteredTeams.length} Team{filteredTeams.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map(team => (
                <ClubCard key={team.id} club={team} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No teams found matching your criteria
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Competition Calendar */}
        <div className="mt-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-8 border border-orange-200 dark:border-orange-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏟️ Upcoming Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">🏏 Cricket Tournament</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Inter-college championship</p>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Dates:</span> Feb-March 2024</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-bold">Registration Open</span></p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">⚽ Football Championship</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Zone-level football competition</p>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Dates:</span> March-April 2024</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-bold">Registration Open</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Recruitment Banner */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">🎯 Join Our Sports Community!</h2>
          <p className="text-lg mb-6 text-orange-50">
            Whether you're competitive or recreational, we have a team for everyone. No previous experience necessary!
          </p>
          <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all">
            Join a Team Today
          </button>
        </div>

        {/* About Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚡ About Our Sports Programs</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Our sports teams are dedicated to excellence, teamwork, and fitness. We compete at inter-college and national levels while maintaining a culture of inclusivity and healthy competition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">🏅 Our Teams:</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>✓ Cricket Team - State Championship Winners</li>
                <li>✓ Football Team - National Tournament Qualifiers</li>
                <li>✓ Badminton Club - Mixed Doubles Champions</li>
                <li>✓ Athletic Club - 8 National Medals</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">🌟 Joining Benefits:</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>✓ Professional coaching & training</li>
                <li>✓ Equipment & facility access</li>
                <li>✓ Sponsorship opportunities</li>
                <li>✓ National & international exposure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsTeamsPage;
