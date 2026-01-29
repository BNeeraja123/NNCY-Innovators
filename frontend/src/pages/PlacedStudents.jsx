import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  searchAndFilterStudents,
  getUniqueCompanies,
  getTopStudents
} from '../utils/placementLogic';
import { branches, batches } from '../data/placementData';

const PlacedStudents = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterCompany, setFilterCompany] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('list');

  // Get unique companies
  const companies = useMemo(() => getUniqueCompanies(), []);

  // Filter students
  const filteredStudents = useMemo(
    () => searchAndFilterStudents(searchQuery, filterBranch, filterBatch, filterCompany, sortBy),
    [searchQuery, filterBranch, filterBatch, filterCompany, sortBy]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/placement')}
            className="mb-4 text-white hover:text-gray-200 transition flex items-center gap-2 font-semibold"
          >
            ← Back to Placement
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Placed Students
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Celebrating the success of our graduates placed in top companies
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Search & Filter</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, roll number, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="All">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Batch</label>
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="All">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="name">Name (A-Z)</option>
                <option value="package">Package (High to Low)</option>
                <option value="batch">Batch (Latest)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">View</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
              >
                <option value="list">List View</option>
                <option value="grid">Grid View</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterBranch('All');
                  setFilterBatch('All');
                  setFilterCompany('All');
                }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-600 mt-4">
            Found <span className="font-bold text-festival-magenta">{filteredStudents.length}</span> student{filteredStudents.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Students Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No students found matching your criteria.</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-festival-orange to-festival-magenta text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Roll No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Branch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Batch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Package</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 text-gray-700">{student.rollNo}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {student.branch}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{student.batch}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{student.company}</td>
                      <td className="px-6 py-4 text-gray-700">{student.position}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          {student.package}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.rollNo}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {student.branch}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 font-semibold">Placed at</p>
                  <p className="text-lg font-bold text-festival-magenta">{student.company}</p>
                  <p className="text-sm text-gray-700 mt-1">{student.position}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Package</p>
                    <p className="text-lg font-bold text-green-600">{student.package}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Batch</p>
                    <p className="text-lg font-bold text-festival-cyan">{student.batch}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-600">{student.location}</p>
                  <p className="text-xs text-gray-600 mt-1">Placed: {student.placeYear}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-festival-blue to-festival-cyan py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore Recruiting Companies</h2>
          <p className="text-white text-lg opacity-90 mb-8">
            Check company details, eligibility criteria, and job roles
          </p>
          <button
            onClick={() => navigate('/placement')}
            className="bg-white text-festival-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            View Companies →
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlacedStudents;
