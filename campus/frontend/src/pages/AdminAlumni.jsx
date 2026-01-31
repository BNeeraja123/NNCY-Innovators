import React, { useState } from 'react';
import { alumniDatabase, domains, companies } from '../data/alumniData';

const AdminAlumni = () => {
  const [alumni, setAlumni] = useState(alumniDatabase);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: new Date().getFullYear(),
    domain: 'Software Engineering',
    company: '',
    role: '',
    location: '',
    image: 'https://i.pravatar.cc/150?u=alumni@college.com',
    email: '',
    linkedin: '',
    achievements: [],
    testimonial: '',
    stats: {
      yearsInIndustry: 0,
      projectsLed: 0,
      teamSize: 0
    }
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('stats.') 
        ? { ...formData.stats, [name.split('.')[1]]: parseInt(value) || 0 }
        : value
    });
  };

  // Handle achievements (comma-separated)
  const handleAchievementsChange = (e) => {
    const achievements = e.target.value.split('\n').filter(a => a.trim());
    setFormData({ ...formData, achievements });
  };

  // Handle stats changes
  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    const key = name.split('stats.')[1];
    setFormData({
      ...formData,
      stats: {
        ...formData.stats,
        [key]: parseInt(value) || 0
      }
    });
  };

  // Add or update alumni
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.company || !formData.role) {
      alert('Please fill in required fields: Name, Company, Role');
      return;
    }

    if (editingId) {
      // Update existing
      setAlumni(alumni.map(a => 
        a.id === editingId 
          ? { ...formData, id: editingId }
          : a
      ));
      setEditingId(null);
    } else {
      // Add new
      const newAlumni = {
        ...formData,
        id: Math.max(...alumni.map(a => a.id), 0) + 1
      };
      setAlumni([...alumni, newAlumni]);
    }

    // Reset form
    setFormData({
      name: '',
      graduationYear: new Date().getFullYear(),
      domain: 'Software Engineering',
      company: '',
      role: '',
      location: '',
      image: 'https://i.pravatar.cc/150?u=alumni@college.com',
      email: '',
      linkedin: '',
      achievements: [],
      testimonial: '',
      stats: {
        yearsInIndustry: 0,
        projectsLed: 0,
        teamSize: 0
      }
    });
    setShowForm(false);
  };

  // Edit alumni
  const handleEdit = (alumnus) => {
    setFormData(alumnus);
    setEditingId(alumnus.id);
    setShowForm(true);
  };

  // Delete alumni
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this alumni?')) {
      setAlumni(alumni.filter(a => a.id !== id));
    }
  };

  // Filter alumni
  const filteredAlumni = alumni.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-festival-orange to-festival-magenta py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Alumni Management</h1>
          <p className="text-white opacity-90">Add, edit, and manage alumni success stories</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Control Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Alumni
              </label>
              <input
                type="text"
                placeholder="Search by name, company, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
              />
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  name: '',
                  graduationYear: new Date().getFullYear(),
                  domain: 'Software Engineering',
                  company: '',
                  role: '',
                  location: '',
                  image: 'https://i.pravatar.cc/150?u=alumni@college.com',
                  email: '',
                  linkedin: '',
                  achievements: [],
                  testimonial: '',
                  stats: {
                    yearsInIndustry: 0,
                    projectsLed: 0,
                    teamSize: 0
                  }
                });
              }}
              className="bg-gradient-to-r from-festival-orange to-festival-magenta text-white px-6 py-2 rounded-lg hover:opacity-90 font-semibold whitespace-nowrap"
            >
              {showForm ? '✕ Close' : '+ Add Alumni'}
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{alumni.length}</p>
              <p className="text-sm text-gray-600">Total Alumni</p>
            </div>
            <div className="bg-green-50 rounded p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{new Set(alumni.map(a => a.domain)).size}</p>
              <p className="text-sm text-gray-600">Domains</p>
            </div>
            <div className="bg-purple-50 rounded p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">{new Set(alumni.map(a => a.company)).size}</p>
              <p className="text-sm text-gray-600">Companies</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Alumni' : 'Add New Alumni'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Domain/Specialization
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  >
                    {domains.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Google, Microsoft, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, USA"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="e.g., linkedin.com/in/name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  />
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Career Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years in Industry
                    </label>
                    <input
                      type="number"
                      name="stats.yearsInIndustry"
                      value={formData.stats.yearsInIndustry}
                      onChange={handleStatsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Projects Led
                    </label>
                    <input
                      type="number"
                      name="stats.projectsLed"
                      value={formData.stats.projectsLed}
                      onChange={handleStatsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Team Size
                    </label>
                    <input
                      type="number"
                      name="stats.teamSize"
                      value={formData.stats.teamSize}
                      onChange={handleStatsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    />
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Achievements (one per line)
                </label>
                <textarea
                  value={formData.achievements.join('\n')}
                  onChange={handleAchievementsChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                />
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Testimonial/Quote
                </label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                  placeholder="Share what makes your experience at the college special..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-festival-orange to-festival-magenta text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
                >
                  {editingId ? '✓ Update Alumni' : '+ Add Alumni'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Alumni Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-festival-orange to-festival-magenta text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Domain</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Year</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumni.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-600">
                      No alumni found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredAlumni.map((alumnus) => (
                    <tr key={alumnus.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">{alumnus.name}</td>
                      <td className="px-6 py-4 text-gray-700">{alumnus.company}</td>
                      <td className="px-6 py-4 text-gray-700">{alumnus.role}</td>
                      <td className="px-6 py-4 text-gray-700">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {alumnus.domain}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{alumnus.graduationYear}</td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(alumnus)}
                          className="inline-block bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(alumnus.id)}
                          className="inline-block bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm font-semibold"
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
        </div>
      </div>
    </div>
  );
};

export default AdminAlumni;
