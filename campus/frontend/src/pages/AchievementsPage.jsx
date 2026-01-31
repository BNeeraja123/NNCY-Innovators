import React, { useState, useMemo } from 'react';
import { AchievementCard } from '../components/AnalyticsCard';
import {
  getAllAchievements,
  getAchievementsByCategory,
  getAchievementsByImpact,
  getAchievementCategories,
  searchAchievements
} from '../utils/analyticsLogic';

const AchievementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');

  const allAchievements = useMemo(() => getAllAchievements(), []);
  const categories = useMemo(() => getAchievementCategories(), []);

  // Filtered achievements
  const filteredAchievements = useMemo(() => {
    let result = allAchievements;

    // Search filter
    if (searchQuery) {
      result = searchAchievements(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(ach => ach.category === selectedCategory);
    }

    // Impact filter
    if (selectedImpact !== 'all') {
      result = result.filter(ach => ach.impact === selectedImpact);
    }

    return result.sort((a, b) => {
      // Sort by impact first (Major > High > Medium)
      const impactOrder = { Major: 0, High: 1, Medium: 2 };
      return impactOrder[a.impact] - impactOrder[b.impact];
    });
  }, [searchQuery, selectedCategory, selectedImpact, allAchievements]);

  // Group by category for alternative view
  const groupedByCategory = useMemo(() => {
    const grouped = {};
    filteredAchievements.forEach(ach => {
      if (!grouped[ach.category]) {
        grouped[ach.category] = [];
      }
      grouped[ach.category].push(ach);
    });
    return grouped;
  }, [filteredAchievements]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: allAchievements.length,
      major: allAchievements.filter(a => a.impact === 'Major').length,
      high: allAchievements.filter(a => a.impact === 'High').length,
      medium: allAchievements.filter(a => a.impact === 'Medium').length
    };
  }, [allAchievements]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-festival-magenta via-festival-orange to-festival-red py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⭐ Achievements
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Celebrating our institutional excellence across academic, research, and social dimensions
          </p>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Total Achievements</p>
            <p className="text-4xl font-bold text-festival-orange">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Major Impact</p>
            <p className="text-4xl font-bold text-red-600">{stats.major}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">High Impact</p>
            <p className="text-4xl font-bold text-festival-magenta">{stats.high}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Medium Impact</p>
            <p className="text-4xl font-bold text-festival-blue">{stats.medium}</p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search Achievements
              </label>
              <input
                type="text"
                placeholder="Search by title, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-magenta focus:border-transparent"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📂 Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-magenta focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Impact Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎯 Filter by Impact Level
                </label>
                <select
                  value={selectedImpact}
                  onChange={(e) => setSelectedImpact(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-magenta focus:border-transparent"
                >
                  <option value="all">All Impact Levels</option>
                  <option value="Major">🔴 Major Impact</option>
                  <option value="High">🟠 High Impact</option>
                  <option value="Medium">🔵 Medium Impact</option>
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="bg-orange-50 border-l-4 border-festival-orange p-4 rounded">
              <p className="text-sm font-semibold text-gray-900">
                Showing <span className="text-festival-orange">{filteredAchievements.length}</span> achievement{filteredAchievements.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAchievements.length > 0 ? (
          <div className="space-y-16">
            {/* Group by impact level */}
            {['Major', 'High', 'Medium'].map((impactLevel) => {
              const items = filteredAchievements.filter(a => a.impact === impactLevel);
              if (items.length === 0) return null;

              const impactEmoji = {
                Major: '🔴',
                High: '🟠',
                Medium: '🔵'
              }[impactLevel];

              const impactColor = {
                Major: 'from-red-50 to-red-100',
                High: 'from-orange-50 to-orange-100',
                Medium: 'from-blue-50 to-blue-100'
              }[impactLevel];

              return (
                <div key={impactLevel}>
                  <div className={`bg-gradient-to-r ${impactColor} rounded-lg p-6 mb-6 border-l-4 ${
                    impactLevel === 'Major' ? 'border-red-600' :
                    impactLevel === 'High' ? 'border-festival-orange' :
                    'border-festival-blue'
                  }`}>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {impactEmoji} {impactLevel} Impact Achievements
                      <span className="ml-auto bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {items.length}
                      </span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">🔍 No achievements found</p>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedImpact('all');
              }}
              className="mt-6 bg-festival-magenta text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Timeline View Section */}
      <section className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">📅 Achievements Timeline</h2>
          
          {/* Group by year */}
          {(() => {
            const yearGroups = {};
            filteredAchievements.forEach(ach => {
              if (!yearGroups[ach.year]) yearGroups[ach.year] = [];
              yearGroups[ach.year].push(ach);
            });
            
            return Object.keys(yearGroups)
              .sort((a, b) => b - a)
              .map(year => (
                <div key={year} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-festival-orange to-festival-magenta flex items-center justify-center text-white font-bold text-lg">
                      {year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{year}</h3>
                    <span className="ml-auto bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {yearGroups[year].length} achievements
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-8">
                    {yearGroups[year].map(ach => (
                      <div key={ach.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-festival-blue">
                        <h4 className="font-bold text-gray-900 mb-2">{ach.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{ach.description}</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          ach.impact === 'Major' ? 'bg-red-100 text-red-800' :
                          ach.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {ach.impact} Impact
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ));
          })()}
        </div>
      </section>

      {/* Summary Section */}
      <section className="bg-gradient-to-r from-festival-magenta to-festival-orange py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🎉 Our Achievement Journey</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            From academic excellence to research innovation, we continue to set benchmarks in higher education
          </p>
          <div className="flex justify-center gap-8 text-white">
            <div>
              <p className="text-4xl font-bold">{stats.total}</p>
              <p className="text-sm opacity-80">Documented Achievements</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{categories.length}</p>
              <p className="text-sm opacity-80">Different Categories</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;
