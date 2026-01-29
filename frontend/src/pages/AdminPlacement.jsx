import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { placementDatabase, placedStudentsDatabase, branches } from '../data/placementData';
import {
  getPlacementStats,
  getYearWisePlacement,
  getBranchWisePlacement,
  getCompanyWisePlacement
} from '../utils/placementLogic';

const AdminPlacement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [companies, setCompanies] = useState(placementDatabase);
  const [students, setStudents] = useState(placedStudentsDatabase);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchCompany, setSearchCompany] = useState('');
  const [searchStudent, setSearchStudent] = useState('');

  // Form states
  const [companyForm, setCompanyForm] = useState({
    name: '',
    logo: '',
    location: '',
    website: '',
    contactEmail: '',
    minPackage: '',
    maxPackage: '',
    visitYear: new Date().getFullYear(),
    rolesCount: ''
  });

  const [studentForm, setStudentForm] = useState({
    name: '',
    rollNo: '',
    branch: branches[0],
    batch: '2023',
    company: '',
    position: '',
    package: '',
    location: '',
    email: ''
  });

  // Calculate stats
  const stats = useMemo(() => getPlacementStats(), []);
  const yearWiseData = useMemo(() => getYearWisePlacement(), []);
  const branchWiseData = useMemo(() => getBranchWisePlacement(), []);
  const companyWiseData = useMemo(() => getCompanyWisePlacement(), []);

  // Filter companies
  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchCompany.toLowerCase()) ||
    c.location.toLowerCase().includes(searchCompany.toLowerCase())
  );

  // Filter students
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchStudent.toLowerCase()) ||
    s.company.toLowerCase().includes(searchStudent.toLowerCase())
  );

  // Handle company form submit
  const handleCompanySubmit = (e) => {
    e.preventDefault();
    if (editingCompany) {
      // Update
      setCompanies(companies.map(c =>
        c.id === editingCompany.id ? { ...editingCompany, ...companyForm } : c
      ));
      setEditingCompany(null);
    } else {
      // Create
      const newCompany = {
        id: Math.max(...companies.map(c => c.id), 0) + 1,
        ...companyForm,
        roles: [{ title: 'Software Engineer', package: companyForm.maxPackage, internship: 'Yes' }],
        previousYears: [],
        eligibility: { branches: [], minCGPA: 7.0, backlogAllowed: false, yearOfPassing: [] },
        selectionProcess: ['Written Test', 'Technical Interview', 'HR Round']
      };
      setCompanies([...companies, newCompany]);
    }
    setCompanyForm({
      name: '',
      logo: '',
      location: '',
      website: '',
      contactEmail: '',
      minPackage: '',
      maxPackage: '',
      visitYear: new Date().getFullYear(),
      rolesCount: ''
    });
    setShowCompanyForm(false);
  };

  // Handle student form submit
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      // Update
      setStudents(students.map(s =>
        s.id === editingStudent.id ? { ...editingStudent, ...studentForm } : s
      ));
      setEditingStudent(null);
    } else {
      // Create
      const newStudent = {
        id: Math.max(...students.map(s => s.id), 0) + 1,
        ...studentForm,
        internship: 'Yes',
        placeYear: new Date().getFullYear()
      };
      setStudents([...students, newStudent]);
    }
    setStudentForm({
      name: '',
      rollNo: '',
      branch: branches[0],
      batch: '2023',
      company: '',
      position: '',
      package: '',
      location: '',
      email: ''
    });
    setShowStudentForm(false);
  };

  // Delete company
  const deleteCompany = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  // Delete student
  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  // Edit company
  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setCompanyForm({
      name: company.name,
      logo: company.logo,
      location: company.location,
      website: company.website,
      contactEmail: company.contactEmail,
      minPackage: company.minPackage,
      maxPackage: company.maxPackage,
      visitYear: company.visitYear,
      rolesCount: company.roles.length.toString()
    });
    setShowCompanyForm(true);
  };

  // Edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      rollNo: student.rollNo,
      branch: student.branch,
      batch: student.batch,
      company: student.company,
      position: student.position,
      package: student.package,
      location: student.location,
      email: student.email
    });
    setShowStudentForm(true);
  };

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
            Admin Panel - Placement Management
          </h1>
          <p className="text-xl text-white opacity-90">
            Manage companies, placements, and student records
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-8">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'companies', label: '🏢 Companies', icon: '🏢' },
              { id: 'students', label: '👨‍🎓 Students', icon: '👨‍🎓' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-semibold border-b-4 transition ${
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Placement Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 font-semibold mb-2">Total Placed</p>
                <p className="text-4xl font-bold text-festival-magenta">{stats.totalPlaced}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 font-semibold mb-2">Companies</p>
                <p className="text-4xl font-bold text-festival-orange">{stats.totalCompanies}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 font-semibold mb-2">Branches</p>
                <p className="text-4xl font-bold text-festival-blue">{stats.uniqueBranches}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 font-semibold mb-2">Avg Package</p>
                <p className="text-4xl font-bold text-festival-cyan">{stats.avgPackage}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 font-semibold mb-2">Highest</p>
                <p className="text-4xl font-bold text-green-600">{stats.highestPackage}</p>
              </div>
            </div>

            {/* Year-wise and Branch-wise charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Year-wise Placement</h3>
                <div className="space-y-4">
                  {yearWiseData.map((year, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-gray-900">{year.year}</span>
                        <span className="text-sm text-gray-600">
                          {year.count} students • Avg: {year.avgPackage}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-festival-orange to-festival-magenta h-3 rounded-full"
                          style={{ width: `${(year.count / (Math.max(...yearWiseData.map(y => y.count)) || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Branch-wise Placement</h3>
                <div className="space-y-4">
                  {Object.entries(branchWiseData).map(([branch, data], idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-gray-900">{branch}</span>
                        <span className="text-sm text-gray-600">{data.count} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-festival-blue to-festival-cyan h-3 rounded-full"
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPANIES TAB */}
        {activeTab === 'companies' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Companies Management</h2>
              <button
                onClick={() => {
                  setEditingCompany(null);
                  setShowCompanyForm(true);
                }}
                className="bg-festival-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                + Add Company
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search companies by name or location..."
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-festival-orange"
            />

            {/* Company Form */}
            {showCompanyForm && (
              <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border-l-4 border-festival-orange">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingCompany ? 'Edit Company' : 'Add New Company'}
                </h3>
                <form onSubmit={handleCompanySubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={companyForm.location}
                      onChange={(e) => setCompanyForm({ ...companyForm, location: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                    <input
                      type="text"
                      placeholder="Min Package (e.g., 12 LPA)"
                      value={companyForm.minPackage}
                      onChange={(e) => setCompanyForm({ ...companyForm, minPackage: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                    <input
                      type="text"
                      placeholder="Max Package (e.g., 20 LPA)"
                      value={companyForm.maxPackage}
                      onChange={(e) => setCompanyForm({ ...companyForm, maxPackage: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                    <input
                      type="email"
                      placeholder="Contact Email"
                      value={companyForm.contactEmail}
                      onChange={(e) => setCompanyForm({ ...companyForm, contactEmail: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                    <input
                      type="url"
                      placeholder="Website"
                      value={companyForm.website}
                      onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-festival-magenta hover:bg-pink-700 text-white font-bold py-2 px-8 rounded-lg transition"
                    >
                      {editingCompany ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCompanyForm(false);
                        setEditingCompany(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Companies List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{company.location}</p>
                  <div className="bg-gray-50 p-3 rounded mb-4">
                    <p className="text-xs text-gray-600 font-semibold">Package Range</p>
                    <p className="text-lg font-bold text-festival-magenta">
                      {company.minPackage} - {company.maxPackage}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    <strong>Roles:</strong> {company.roles.length} | <strong>Visited:</strong> {company.visitYear}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCompany(company)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCompany(company.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Students Management</h2>
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setShowStudentForm(true);
                }}
                className="bg-festival-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                + Add Student
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search students by name, roll no, or company..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-festival-blue"
            />

            {/* Student Form */}
            {showStudentForm && (
              <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border-l-4 border-festival-blue">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
                <form onSubmit={handleStudentSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <input
                      type="text"
                      placeholder="Roll Number"
                      value={studentForm.rollNo}
                      onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <select
                      value={studentForm.branch}
                      onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    >
                      {branches.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Batch (e.g., 2023)"
                      value={studentForm.batch}
                      onChange={(e) => setStudentForm({ ...studentForm, batch: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={studentForm.company}
                      onChange={(e) => setStudentForm({ ...studentForm, company: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <input
                      type="text"
                      placeholder="Position/Role"
                      value={studentForm.position}
                      onChange={(e) => setStudentForm({ ...studentForm, position: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <input
                      type="text"
                      placeholder="Package (e.g., 15 LPA)"
                      value={studentForm.package}
                      onChange={(e) => setStudentForm({ ...studentForm, package: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={studentForm.location}
                      onChange={(e) => setStudentForm({ ...studentForm, location: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-blue"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-festival-blue hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition"
                    >
                      {editingStudent ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowStudentForm(false);
                        setEditingStudent(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Students Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-festival-blue to-festival-cyan text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Roll No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Branch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Batch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Package</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
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
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                            {student.package}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded transition text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteStudent(student.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPlacement;
