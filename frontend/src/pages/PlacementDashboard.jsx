import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';
import {
  searchAndFilterCompanies,
  getPlacementStats,
  getYearWisePlacement,
  getBranchWisePlacement,
  getCompanyWisePlacement,
  getTopStudents
} from '../utils/placementLogic';

const PlacementDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPackage, setMinPackage] = useState(0);
  const [maxPackage, setMaxPackage] = useState(30);
  const [sortBy, setSortBy] = useState('name');

  // Get statistics
  const stats = useMemo(() => getPlacementStats(), []);
  const yearWiseData = useMemo(() => getYearWisePlacement(), []);
  const branchWiseData = useMemo(() => getBranchWisePlacement(), []);
  const companyWiseData = useMemo(() => getCompanyWisePlacement(), []);
  const topStudents = useMemo(() => getTopStudents(5), []);

  // Filter companies
  const filteredCompanies = useMemo(
    () => searchAndFilterCompanies(searchQuery, minPackage, maxPackage, sortBy),
    [searchQuery, minPackage, maxPackage, sortBy]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Placement Cell
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Your gateway to top companies. Browse recruitment details, company information, and success stories of our placed students.
          </p>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-festival-orange">{stats.totalPlaced}</p>
            <p className="text-gray-600 mt-2">Students Placed</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-festival-magenta">{stats.totalCompanies}</p>
            <p className="text-gray-600 mt-2">Companies</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-festival-cyan">{stats.uniqueBranches}</p>
            <p className="text-gray-600 mt-2">Branches</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.avgPackage} LPA</p>
            <p className="text-gray-600 mt-2">Avg Package</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-green-600">{stats.highestPackage} LPA</p>
            <p className="text-gray-600 mt-2">Highest Package</p>
          </div>
        </div>
      </section>

      {/* Tabs for Navigation */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-festival-orange text-festival-orange'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'companies'
                  ? 'border-festival-orange text-festival-orange'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'students'
                  ? 'border-festival-orange text-festival-orange'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Placed Students
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'analytics'
                  ? 'border-festival-orange text-festival-orange'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </section>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Performers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🌟 Top Performers</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {topStudents.map((student, idx) => (
                <div key={student.id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-festival-orange">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-festival-magenta mb-2">#{idx + 1}</div>
                    <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{student.rollNo}</p>
                    <div className="bg-blue-50 rounded-lg p-3 mt-3">
                      <p className="text-2xl font-bold text-blue-600">{student.package}</p>
                      <p className="text-xs text-gray-600 mt-1">{student.company}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{student.branch} - {student.batch}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year-wise Placement */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📈 Year-wise Placement Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {yearWiseData.map((year) => (
                <div key={year.year} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{year.year}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Students Placed</span>
                      <span className="text-2xl font-bold text-festival-magenta">{year.count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average Package</span>
                      <span className="text-2xl font-bold text-festival-cyan">{year.avgPackage} LPA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-festival-blue to-festival-cyan rounded-lg p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-lg opacity-90 mb-8">Browse company details and understand eligibility criteria</p>
            <button
              onClick={() => setActiveTab('companies')}
              className="bg-white text-festival-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Explore Companies →
            </button>
          </section>
        </section>
      )}

      {/* COMPANIES TAB */}
      {activeTab === 'companies' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search & Filter Companies</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by company name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="package">Package (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Package Range Slider */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Package Range: {minPackage} - {maxPackage} LPA
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 block mb-2">Min LPA</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={minPackage}
                    onChange={(e) => setMinPackage(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600 block mb-2">Max LPA</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={maxPackage}
                    onChange={(e) => setMaxPackage(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Found <span className="font-bold text-festival-magenta">{filteredCompanies.length}</span> companies
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">No companies found matching your criteria.</p>
              </div>
            ) : (
              filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))
            )}
          </div>
        </section>
      )}

      {/* STUDENTS TAB */}
      {activeTab === 'students' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/placement/students')}
            className="bg-gradient-to-r from-festival-orange to-festival-magenta text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition"
          >
            View Full List →
          </button>
        </section>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Branch-wise */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Branch-wise Placement</h3>
              <div className="space-y-4">
                {Object.values(branchWiseData).map((branch) => (
                  <div key={branch.branch} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{branch.branch}</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                        {branch.count} placed
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Avg Package: {branch.avgPackage} LPA</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-festival-orange to-festival-magenta h-2 rounded-full"
                        style={{ width: `${(branch.count / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company-wise */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Companies by Students</h3>
              <div className="space-y-4">
                {companyWiseData.slice(0, 8).map((company) => (
                  <div key={company.company} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{company.company}</span>
                      <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-bold">
                        {company.count} students
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Avg Package: {company.avgPackage} LPA</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PlacementDashboard;
