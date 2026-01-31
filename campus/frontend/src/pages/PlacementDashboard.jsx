import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';
import PlacementCoordinatorLogin from '../components/PlacementCoordinatorLogin';
import CompanyEditModal from '../components/CompanyEditModal';
import StudentEditModal from '../components/StudentEditModal';
import {
  searchAndFilterCompanies,
  getPlacementStats,
  getYearWisePlacement,
  getBranchWisePlacement,
  getCompanyWisePlacement,
  getTopStudents
} from '../utils/placementLogic';
import { useAuth } from '../context/AuthContext';

const PlacementDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isCoordinator = user?.role === 'placement_coordinator' || user?.role === 'admin';
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPackage, setMinPackage] = useState(0);
  const [maxPackage, setMaxPackage] = useState(30);
  const [sortBy, setSortBy] = useState('name');
  
  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Edit modals
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  
  // Local data state (coordinator can edit)
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);

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

  // Handler functions for coordinator actions
  const handleAddCompany = (formData) => {
    const newCompany = {
      id: Math.max(...(companies.length > 0 ? companies.map(c => c.id) : [0]), 0) + 1,
      ...formData,
      updatedAt: new Date().toISOString(),
      updatedBy: user?.name || 'Coordinator'
    };
    setCompanies([...companies, newCompany]);
    setShowCompanyModal(false);
    alert('✓ Company added successfully!');
  };

  const handleUpdateCompany = (formData) => {
    setCompanies(companies.map(c =>
      c.id === editingCompany.id
        ? {
            ...c,
            ...formData,
            updatedAt: new Date().toISOString(),
            updatedBy: user?.name || 'Coordinator'
          }
        : c
    ));
    setEditingCompany(null);
    setShowCompanyModal(false);
    alert('✓ Company updated successfully!');
  };

  const handleDeleteCompany = (id) => {
    if (window.confirm('Are you sure you want to delete this company? This action cannot be undone.')) {
      setCompanies(companies.filter(c => c.id !== id));
      alert('✓ Company deleted successfully!');
    }
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowCompanyModal(true);
  };

  const handleAddStudent = (formData) => {
    const newStudent = {
      id: Math.max(...(students.length > 0 ? students.map(s => s.id) : [0]), 0) + 1,
      ...formData,
      placeYear: new Date().getFullYear(),
      updatedAt: new Date().toISOString(),
      updatedBy: user?.name || 'Coordinator'
    };
    setStudents([...students, newStudent]);
    setShowStudentModal(false);
    alert('✓ Student record added successfully!');
  };

  const handleUpdateStudent = (formData) => {
    setStudents(students.map(s =>
      s.id === editingStudent.id
        ? {
            ...s,
            ...formData,
            updatedAt: new Date().toISOString(),
            updatedBy: user?.name || 'Coordinator'
          }
        : s
    ));
    setEditingStudent(null);
    setShowStudentModal(false);
    alert('✓ Student record updated successfully!');
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student record? This action cannot be undone.')) {
      setStudents(students.filter(s => s.id !== id));
      alert('✓ Student record deleted successfully!');
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowStudentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Placement Cell
              </h1>
              <p className="text-xl text-white opacity-90 max-w-2xl">
                Your gateway to top companies. Browse recruitment details, company information, and success stories of our placed students.
              </p>
            </div>
            
            {/* Coordinator Login Button */}
            {!isCoordinator ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition shadow-lg whitespace-nowrap"
              >
                🔐 Coordinator Login
              </button>
            ) : (
              <div className="bg-white bg-opacity-20 text-white rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold">Logged in as: <span className="text-yellow-200">{user?.name}</span></p>
                <button
                  onClick={() => logout()}
                  className="mt-2 bg-white text-primary font-bold py-1 px-4 rounded text-sm hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-primary">{stats.totalPlaced}</p>
            <p className="text-gray-600 mt-2">Students Placed</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-primary">{stats.totalCompanies}</p>
            <p className="text-gray-600 mt-2">Companies</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-primary">{stats.uniqueBranches}</p>
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
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'companies'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'students'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Placed Students
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
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
                <div key={student.id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">#{idx + 1}</div>
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
                      <span className="text-2xl font-bold text-primary">{year.count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average Package</span>
                      <span className="text-2xl font-bold text-secondary">{year.avgPackage} LPA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary to-primary-light rounded-lg p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-lg opacity-90 mb-8">Browse company details and understand eligibility criteria</p>
            <button
              onClick={() => setActiveTab('companies')}
              className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Explore Companies →
            </button>
          </section>
        </section>
      )}

      {/* COMPANIES TAB */}
      {activeTab === 'companies' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Coordinator Add Button */}
          {isCoordinator && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setEditingCompany(null);
                  setShowCompanyModal(true);
                }}
                className="bg-gradient-to-r from-primary to-primary-light text-white font-bold py-2 px-6 rounded-lg hover:shadow-lg transition flex items-center gap-2"
              >
                ➕ Add New Company
              </button>
            </div>
          )}
          
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
              Found <span className="font-bold text-primary">{filteredCompanies.length}</span> companies
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
                <div key={company.id} className="relative">
                  <CompanyCard company={company} />
                  
                  {/* Coordinator Edit/Delete Buttons */}
                  {isCoordinator && (
                    <div className="absolute top-4 right-4 flex gap-2 bg-white rounded-lg shadow-md p-1">
                      <button
                        onClick={() => handleEditCompany(company)}
                        title="Edit company"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
                        title="Delete company"
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                  
                  {/* Last Updated Info for Coordinators */}
                  {isCoordinator && company.updatedBy && (
                    <div className="absolute bottom-4 right-4 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      Updated by {company.updatedBy}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* STUDENTS TAB */}
      {activeTab === 'students' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Coordinator Add Button */}
          {isCoordinator && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setShowStudentModal(true);
                }}
                className="bg-gradient-to-r from-primary to-primary-light text-white font-bold py-2 px-6 rounded-lg hover:shadow-lg transition flex items-center gap-2"
              >
                ➕ Add Placed Student
              </button>
            </div>
          )}
          
          {/* Students Table for Coordinators */}
          {isCoordinator ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-primary-light text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Roll No</th>
                    <th className="px-6 py-4 text-left">Branch</th>
                    <th className="px-6 py-4 text-left">Company</th>
                    <th className="px-6 py-4 text-left">Package</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No placed students yet. <button onClick={() => setShowStudentModal(true)} className="text-primary font-semibold hover:underline">Add one now</button>
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">{student.name}</td>
                        <td className="px-6 py-4 text-gray-600">{student.rollNo}</td>
                        <td className="px-6 py-4 text-gray-600">{student.branch}</td>
                        <td className="px-6 py-4 text-gray-600">{student.company}</td>
                        <td className="px-6 py-4 font-semibold text-blue-600">{student.package}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <button
              onClick={() => navigate('/placement/students')}
              className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition"
            >
              View Full List →
            </button>
          )}
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
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
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

      {/* Placement Coordinator Login Modal */}
      <PlacementCoordinatorLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(userData) => {
          // User is now logged in via AuthContext
        }}
      />

      {/* Company Edit/Add Modal */}
      <CompanyEditModal
        isOpen={showCompanyModal}
        onClose={() => {
          setShowCompanyModal(false);
          setEditingCompany(null);
        }}
        company={editingCompany}
        onSave={editingCompany ? handleUpdateCompany : handleAddCompany}
      />

      {/* Student Edit/Add Modal */}
      <StudentEditModal
        isOpen={showStudentModal}
        onClose={() => {
          setShowStudentModal(false);
          setEditingStudent(null);
        }}
        student={editingStudent}
        onSave={editingStudent ? handleUpdateStudent : handleAddStudent}
      />
    </div>
  );
};

export default PlacementDashboard;
