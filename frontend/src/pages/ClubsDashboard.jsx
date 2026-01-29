/**
 * Clubs Dashboard Page
 * Main hub for clubs and societies with category navigation
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubCard, StatsCard, FilterBadge } from '../components/ClubCards';
import {
  getCompleteDashboardData,
  getClubsByCategory,
  searchClubs,
  getTechnicalClubs,
  getCulturalGroups,
  getSportsTeams
} from '../utils/clubsLogic';

const ClubsDashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dashboardData = useMemo(() => getCompleteDashboardData(), []);

  const filteredClubs = useMemo(() => {
    let clubs = dashboardData.allClubs;

    // Filter by category
    if (activeCategory === 'technical') {
      clubs = getTechnicalClubs();
    } else if (activeCategory === 'cultural') {
      clubs = getCulturalGroups();
    } else if (activeCategory === 'sports') {
      clubs = getSportsTeams();
    }

    // Search filter
    if (searchQuery.trim()) {
      clubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return clubs;
  }, [activeCategory, searchQuery, dashboardData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-magenta-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Clubs & Societies</h1>
          <p className="text-blue-100 text-lg">Discover and join your passion. Explore {dashboardData.stats.totalClubs} active clubs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon="🏢"
            label="Total Clubs"
            value={dashboardData.stats.totalClubs}
            color="blue"
          />
          <StatsCard
            icon="👥"
            label="Total Members"
            value={dashboardData.stats.totalMembers.toLocaleString()}
            color="magenta"
          />
          <StatsCard
            icon="🏆"
            label="Achievements"
            value={dashboardData.stats.totalAchievements}
            color="orange"
          />
          <StatsCard
            icon="📅"
            label="Events Organized"
            value={dashboardData.stats.totalEvents}
            color="cyan"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clubs by name or focus area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-3.5 text-xl">🔍</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <FilterBadge
            label="All Clubs"
            isActive={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          <FilterBadge
            label="🔧 Technical (4)"
            isActive={activeCategory === 'technical'}
            onClick={() => setActiveCategory('technical')}
          />
          <FilterBadge
            label="🎭 Cultural (4)"
            isActive={activeCategory === 'cultural'}
            onClick={() => setActiveCategory('cultural')}
          />
          <FilterBadge
            label="⚽ Sports (4)"
            isActive={activeCategory === 'sports'}
            onClick={() => setActiveCategory('sports')}
          />
        </div>

        {/* Category Title */}
        {activeCategory !== 'all' && (
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 capitalize">
            {activeCategory === 'technical' ? '🔧 Technical Clubs' : 
             activeCategory === 'cultural' ? '🎭 Cultural Groups' :
             '⚽ Sports Teams'}
          </h2>
        )}

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {searchQuery ? `No clubs found matching "${searchQuery}"` : 'No clubs available in this category'}
            </p>
          </div>
        )}

        {/* Featured Clubs Section */}
        {activeCategory === 'all' && (
          <>
            <hr className="my-12 border-gray-300 dark:border-gray-700" />
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">⭐ Featured Clubs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.topClubs.slice(0, 6).map(club => (
                  <ClubCard key={club.id} club={club} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Recent Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏆 Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
            {dashboardData.recentAchievements.slice(0, 8).map((achievement, idx) => (
              <div key={idx} className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4 rounded">
                <p className="font-bold text-gray-800 dark:text-white text-sm mb-1">{achievement.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.clubName}</p>
                <p className="text-xs text-gray-700 dark:text-gray-300">{achievement.description}</p>
                <span className="inline-block mt-2 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-amber-700 dark:text-amber-300 font-medium">
                  {achievement.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/clubs/technical')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition-all hover:shadow-lg"
          >
            <div className="text-3xl mb-2">🔧</div>
            <p>Explore Technical Clubs</p>
          </button>
          <button
            onClick={() => navigate('/clubs/cultural')}
            className="bg-magenta-500 hover:bg-magenta-600 text-white font-bold py-4 rounded-lg transition-all hover:shadow-lg"
          >
            <div className="text-3xl mb-2">🎭</div>
            <p>Explore Cultural Groups</p>
          </button>
          <button
            onClick={() => navigate('/clubs/sports')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all hover:shadow-lg"
          >
            <div className="text-3xl mb-2">⚽</div>
            <p>Explore Sports Teams</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubsDashboard;
