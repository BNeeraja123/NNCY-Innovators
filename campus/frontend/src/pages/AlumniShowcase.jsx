import React, { useState, useMemo } from 'react';
import AlumniCard from '../components/AlumniCard';
import {
  searchAndFilterAlumni,
  getAlumniStats,
  getDomainDistribution,
  getCompanyDistribution,
  getTrendingMetrics,
  getGraduationYears
} from '../utils/alumniLogic';
import { domains, companies } from '../data/alumniData';

const AlumniShowcase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterCompany, setFilterCompany] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Get statistics
  const stats = useMemo(() => getAlumniStats(), []);
  const trendingAlumni = useMemo(() => getTrendingMetrics(), []);
  const graduationYears = useMemo(() => getGraduationYears(), []);

  // Search and filter alumni
  const filteredAlumni = useMemo(
    () => searchAndFilterAlumni(searchQuery, filterDomain, filterCompany, filterYear, sortBy),
    [searchQuery, filterDomain, filterCompany, filterYear, sortBy]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Alumni Success Stories
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Discover how our alumni are making an impact across the globe. Inspiring stories of innovation, leadership, and achievement.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-festival-orange">{stats.totalAlumni}</p>
            <p className="text-gray-600 mt-2">Total Alumni</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-festival-magenta">{stats.totalDomains}</p>
            <p className="text-gray-600 mt-2">Domains</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-festival-cyan">{stats.totalCompanies}</p>
            <p className="text-gray-600 mt-2">Top Companies</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.avgYearsInIndustry}</p>
            <p className="text-gray-600 mt-2">Avg. Experience</p>
          </div>
        </div>
      </section>

      {/* Trending Alumni Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingAlumni.map((alumni) => (
            <AlumniCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-t border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Alumni Network</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, company, role, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="All">All Domains</option>
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="All">All Companies</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year</label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="All">All Years</option>
                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="name">Name (A-Z)</option>
                <option value="year">Graduation Year</option>
                <option value="yearsInIndustry">Years in Industry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">View Mode</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="grid">Grid View</option>
                <option value="list">List View</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-600 mt-4">
            Found <span className="font-bold text-festival-magenta">{filteredAlumni.length}</span> alumni
          </p>
        </div>
      </section>

      {/* Alumni Grid/List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No alumni found matching your criteria.</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-festival-blue to-festival-cyan py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Share Your Success Story</h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Have you achieved great heights? We'd love to feature your story and inspire current students.
          </p>
          <button className="bg-white text-festival-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
            Submit Your Story
          </button>
        </div>
      </section>
    </div>
  );
};

export default AlumniShowcase;
