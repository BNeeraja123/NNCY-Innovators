import React, { useState, useMemo } from 'react';
import { AwardCard } from '../components/AnalyticsCard';
import {
  getAllAwards,
  getAwardsByCategory,
  getAwardsByYear,
  getAwardCategories,
  searchAwards
} from '../utils/analyticsLogic';

const AwardsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const allAwards = useMemo(() => getAllAwards(), []);
  const categories = useMemo(() => getAwardCategories(), []);
  const years = useMemo(() => {
    return [...new Set(allAwards.map(award => award.year))].sort((a, b) => b - a);
  }, [allAwards]);

  // Filtered awards
  const filteredAwards = useMemo(() => {
    let result = allAwards;

    // Search filter
    if (searchQuery) {
      result = searchAwards(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(award => award.category === selectedCategory);
    }

    // Year filter
    if (selectedYear !== 'all') {
      result = result.filter(award => award.year === parseInt(selectedYear));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedYear, allAwards]);

  // Group awards by type
  const awardsByType = useMemo(() => {
    return {
      institutional: filteredAwards.filter(a => a.type === 'institutional'),
      student: filteredAwards.filter(a => a.type === 'student'),
      faculty: filteredAwards.filter(a => a.type === 'faculty')
    };
  }, [filteredAwards]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-festival-magenta to-festival-orange py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🏅 Awards & Recognition
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Celebrating our institution, faculty, and student excellence
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search Awards
              </label>
              <input
                type="text"
                placeholder="Search by name, category, or giver..."
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

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Filter by Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-magenta focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="bg-blue-50 border-l-4 border-festival-blue p-4 rounded">
              <p className="text-sm font-semibold text-gray-900">
                Showing <span className="text-festival-blue">{filteredAwards.length}</span> award{filteredAwards.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAwards.length > 0 ? (
          <div className="space-y-16">
            {/* Institutional Awards */}
            {awardsByType.institutional.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🏛️</span>
                  <h2 className="text-3xl font-bold text-gray-900">Institutional Awards</h2>
                  <span className="ml-auto bg-festival-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {awardsByType.institutional.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awardsByType.institutional.map((award) => (
                    <AwardCard key={award.id} award={award} />
                  ))}
                </div>
              </div>
            )}

            {/* Student Awards */}
            {awardsByType.student.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👨‍🎓</span>
                  <h2 className="text-3xl font-bold text-gray-900">Student Awards</h2>
                  <span className="ml-auto bg-festival-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {awardsByType.student.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awardsByType.student.map((award) => (
                    <AwardCard key={award.id} award={award} />
                  ))}
                </div>
              </div>
            )}

            {/* Faculty Awards */}
            {awardsByType.faculty.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👨‍🏫</span>
                  <h2 className="text-3xl font-bold text-gray-900">Faculty Awards</h2>
                  <span className="ml-auto bg-festival-magenta text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {awardsByType.faculty.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awardsByType.faculty.map((award) => (
                    <AwardCard key={award.id} award={award} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">🔍 No awards found</p>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedYear('all');
              }}
              className="mt-6 bg-festival-magenta text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📊 Awards Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg text-center">
              <p className="text-gray-600 font-semibold mb-2">Total Awards</p>
              <p className="text-4xl font-bold text-festival-orange">{allAwards.length}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
              <p className="text-gray-600 font-semibold mb-2">Institutional Awards</p>
              <p className="text-4xl font-bold text-festival-blue">{awardsByType.institutional.length}</p>
            </div>
            <div className="bg-gradient-to-br from-magenta-50 to-pink-100 p-8 rounded-lg text-center">
              <p className="text-gray-600 font-semibold mb-2">Faculty & Student Awards</p>
              <p className="text-4xl font-bold text-festival-magenta">
                {awardsByType.faculty.length + awardsByType.student.length}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;
