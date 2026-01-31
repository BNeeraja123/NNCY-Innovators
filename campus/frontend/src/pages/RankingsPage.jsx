import React, { useState, useMemo } from 'react';
import { RankingCard, DepartmentRankingCard } from '../components/AnalyticsCard';
import {
  getAllRankings,
  getNationalRankings,
  getInternationalRankings,
  getTopRankings,
  getRankingImprovementStats,
  getDepartmentRankings,
  searchRankings
} from '../utils/analyticsLogic';

const RankingsPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allRankings = useMemo(() => getAllRankings(), []);
  const nationalRankings = useMemo(() => getNationalRankings(), []);
  const internationalRankings = useMemo(() => getInternationalRankings(), []);
  const topRankings = useMemo(() => getTopRankings(5), []);
  const departmentRankings = useMemo(() => getDepartmentRankings(), []);
  const improvementStats = useMemo(() => getRankingImprovementStats(), []);

  // Filtered rankings
  const filteredRankings = useMemo(() => {
    let result;

    switch (selectedTab) {
      case 'national':
        result = nationalRankings;
        break;
      case 'international':
        result = internationalRankings;
        break;
      default:
        result = allRankings;
    }

    if (searchQuery) {
      return searchRankings(searchQuery);
    }

    return result;
  }, [selectedTab, searchQuery, allRankings, nationalRankings, internationalRankings]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🏆 Rankings
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Our institution's performance across national and international ranking agencies
          </p>
        </div>
      </section>

      {/* Top Rankings Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">⭐ Top Rankings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRankings.map((ranking) => (
            <RankingCard key={ranking.id} ranking={ranking} featured={true} />
          ))}
        </div>
      </section>

      {/* Improvement Statistics */}
      {improvementStats.totalImprovements > 0 && (
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 py-12 mx-4 rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📈 Ranking Improvements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 font-semibold mb-2">Total Rankings</p>
                <p className="text-3xl font-bold text-green-700">
                  {allRankings.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 font-semibold mb-2">With Improvements</p>
                <p className="text-3xl font-bold text-green-700">
                  {improvementStats.totalImprovements}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 font-semibold mb-2">Best Improvement</p>
                <p className="text-3xl font-bold text-green-700">
                  +{improvementStats.bestImprovement.improvement}
                </p>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {improvementStats.bestImprovement.organization}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 font-semibold mb-2">Average Improvement</p>
                <p className="text-3xl font-bold text-green-700">
                  +{improvementStats.averageImprovement}
                </p>
                <p className="text-xs text-gray-600 mt-1">Positions</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search Rankings
              </label>
              <input
                type="text"
                placeholder="Search by organization name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-3">
              {[
                { id: 'all', label: '📊 All Rankings', count: allRankings.length },
                { id: 'national', label: '🇮🇳 National', count: nationalRankings.length },
                { id: 'international', label: '🌍 International', count: internationalRankings.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    selectedTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="bg-white text-gray-800 px-2 py-0.5 rounded-full text-xs font-bold">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rankings Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredRankings.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRankings.map((ranking) => (
                <RankingCard key={ranking.id} ranking={ranking} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">🔍 No rankings found</p>
            <p className="text-gray-500">Try adjusting your search</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTab('all');
              }}
              className="mt-6 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Department Rankings Section */}
      <section className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🎓 Department-wise Rankings</h2>
          <p className="text-gray-600 mb-8">
            Performance metrics across academic departments based on NIRF 2024
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentRankings.map((dept) => (
              <DepartmentRankingCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">📊 Our Rankings at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white">
              <p className="text-lg opacity-90 mb-2">National Ranking Bodies</p>
              <p className="text-4xl font-bold">{nationalRankings.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white">
              <p className="text-lg opacity-90 mb-2">International Ranking Bodies</p>
              <p className="text-4xl font-bold">{internationalRankings.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white">
              <p className="text-lg opacity-90 mb-2">Departments Ranked</p>
              <p className="text-4xl font-bold">{departmentRankings.length}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RankingsPage;
