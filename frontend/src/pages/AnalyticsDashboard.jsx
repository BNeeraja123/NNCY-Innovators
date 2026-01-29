import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RankingCard,
  AwardCard,
  AchievementCard,
  MediaMentionCard,
  ReportCard,
  DepartmentRankingCard
} from '../components/AnalyticsCard';
import {
  getAllRankings,
  getNationalRankings,
  getInternationalRankings,
  getTopAchievements,
  getFeaturedMentions,
  getYearlyReports,
  getInstitutionalStats,
  getMilestoneTimeline,
  getDepartmentRankings,
  getRankingImprovementStats
} from '../utils/analyticsLogic';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [filterType, setFilterType] = useState('all');

  // Get all data
  const stats = useMemo(() => getInstitutionalStats(), []);
  const allRankings = useMemo(() => getAllRankings(), []);
  const nationalRankings = useMemo(() => getNationalRankings(), []);
  const internationalRankings = useMemo(() => getInternationalRankings(), []);
  const topAchievements = useMemo(() => getTopAchievements(6), []);
  const featuredMentions = useMemo(() => getFeaturedMentions(), []);
  const reports = useMemo(() => getYearlyReports(), []);
  const milestones = useMemo(() => getMilestoneTimeline(), []);
  const departmentRankings = useMemo(() => getDepartmentRankings(), []);
  const improvementStats = useMemo(() => getRankingImprovementStats(), []);

  // Filtered rankings for Rankings tab
  const filteredRankings = useMemo(() => {
    if (filterType === 'all') return allRankings;
    if (filterType === 'national') return nationalRankings;
    if (filterType === 'international') return internationalRankings;
    return allRankings;
  }, [filterType, allRankings, nationalRankings, internationalRankings]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📊 Analytics & Achievements
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Showcasing our institutional excellence through rankings, awards, and achievements
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Total Rankings</p>
            <p className="text-4xl font-bold text-festival-orange">{stats.totalRankings}</p>
            <p className="text-xs text-gray-500 mt-2">National & International</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Total Awards</p>
            <p className="text-4xl font-bold text-festival-magenta">{stats.totalAwards}</p>
            <p className="text-xs text-gray-500 mt-2">Institution, Faculty, Student</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Achievements</p>
            <p className="text-4xl font-bold text-festival-blue">{stats.totalAchievements}</p>
            <p className="text-xs text-gray-500 mt-2">Major & High Impact</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 font-semibold mb-2">Best Ranking</p>
            <p className="text-4xl font-bold text-festival-cyan">#{stats.topRanking}</p>
            <p className="text-xs text-gray-500 mt-2">Overall NIRF Ranking</p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-8">
            {[
              { id: 'overview', label: '🎯 Overview', icon: '🎯' },
              { id: 'rankings', label: '🏆 Rankings', icon: '🏆' },
              { id: 'awards', label: '🏅 Awards', icon: '🏅' },
              { id: 'achievements', label: '⭐ Achievements', icon: '⭐' },
              { id: 'media', label: '📰 Media', icon: '📰' },
              { id: 'reports', label: '📄 Reports', icon: '📄' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-semibold border-b-4 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-festival-magenta text-festival-magenta'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Top Rankings */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏆 Top Rankings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRankings.slice(0, 3).map((ranking) => (
                  <RankingCard key={ranking.id} ranking={ranking} featured={true} />
                ))}
              </div>
            </div>

            {/* Ranking Improvement */}
            {improvementStats.totalImprovements > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Ranking Improvements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Best Improvement</p>
                    <p className="text-xl font-bold text-green-700">
                      +{improvementStats.bestImprovement.improvement} positions
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{improvementStats.bestImprovement.organization}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Average Improvement</p>
                    <p className="text-xl font-bold text-green-700">
                      +{improvementStats.averageImprovement} positions
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Across all rankings</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Total Improvements</p>
                    <p className="text-xl font-bold text-green-700">
                      {improvementStats.totalImprovements}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Ranking bodies</p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Achievements */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">⭐ Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>

            {/* Featured Media Mentions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📰 Featured in Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredMentions.slice(0, 4).map((mention) => (
                  <MediaMentionCard key={mention.id} mention={mention} featured={true} />
                ))}
              </div>
            </div>

            {/* Milestone Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📅 Milestone Timeline</h2>
              <div className="space-y-4">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-festival-orange to-festival-magenta flex items-center justify-center text-white text-xl">
                        {milestone.icon}
                      </div>
                      {idx < milestones.length - 1 && (
                        <div className="w-1 h-16 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="pt-2 pb-8">
                      <p className="text-lg font-bold text-gray-900">{milestone.year}</p>
                      <h4 className="text-lg font-semibold text-gray-900 mt-1">{milestone.title}</h4>
                      <p className="text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RANKINGS TAB */}
        {activeTab === 'rankings' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">🏆 Rankings</h2>
              <div className="flex gap-2">
                {['all', 'national', 'international'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      filterType === type
                        ? 'bg-festival-orange text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {type === 'all' ? 'All' : type === 'national' ? 'National' : 'International'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRankings.map((ranking) => (
                <RankingCard key={ranking.id} ranking={ranking} />
              ))}
            </div>

            {filteredRankings.length === 0 && (
              <p className="text-center text-gray-600 py-12">No rankings found</p>
            )}
          </div>
        )}

        {/* AWARDS TAB */}
        {activeTab === 'awards' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🏅 Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                const awardsModule = require('../utils/analyticsLogic');
                return awardsModule.getAllAwards().map((award) => (
                  <AwardCard key={award.id} award={award} />
                ));
              })()}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">⭐ Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                const analyticsModule = require('../utils/analyticsLogic');
                return analyticsModule.getAllAchievements().map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ));
              })()}
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📰 Media Mentions</h2>
            <div className="space-y-6">
              {(() => {
                const analyticsModule = require('../utils/analyticsLogic');
                return analyticsModule.getAllMentions().map((mention) => (
                  <MediaMentionCard key={mention.id} mention={mention} featured={mention.featured} />
                ));
              })()}
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📄 Yearly Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>

            {/* Department Rankings Bonus */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎓 Department-wise Rankings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentRankings.map((dept) => (
                  <DepartmentRankingCard key={dept.id} department={dept} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-festival-blue to-festival-cyan py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore Our Excellence</h2>
          <p className="text-white text-lg opacity-90 mb-8">
            Our rankings, awards, and achievements reflect our commitment to academic excellence
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-festival-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Home
          </button>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
