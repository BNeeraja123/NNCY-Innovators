import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { dummyData } from '../data/dummyData';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  
  const data = dummyData.admin;
  
  // Update active view when location changes
  useEffect(() => {
    if (location.pathname === '/admin/students') setActiveView('students');
    else if (location.pathname === '/admin/classes') setActiveView('classes');
    else if (location.pathname === '/admin/reports') setActiveView('reports');
    else if (location.pathname === '/admin/registrations') setActiveView('registrations');
    else setActiveView('overview');
  }, [location.pathname]);
  
  // Get student registrations from localStorage
  const [registrations, setRegistrations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('studentRegistrations') || '[]');
    } catch {
      return [];
    }
  });

  if (!localStorage.getItem('userRole')) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} role="admin" />
      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 lg:p-8">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8 border-b border-gray-300 overflow-x-auto">
            <button
              onClick={() => navigate('/admin')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate('/admin/students')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'students'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => navigate('/admin/classes')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'classes'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Classes
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'reports'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => navigate('/admin/registrations')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap relative ${
                activeView === 'registrations'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              New Registrations
              {registrations.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {registrations.length}
                </span>
              )}
            </button>
          </div>

          {/* Overview Tab */}
          {activeView === 'overview' && (
            <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Students" value={data.totalStudents} icon="👥" color="bg-blue-100" />
            <StatCard title="Total Classes" value={data.totalClasses} icon="📚" color="bg-purple-100" />
            <StatCard title="Avg. Attendance" value={`${data.averageAttendance}%`} icon="📊" color="bg-green-100" />
            <StatCard title="Defaulters" value={data.defaulters} icon="⚠️" color="bg-orange-100" />
          </div>

          {/* New Registrations Alert */}
          {registrations.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">📋</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {registrations.length} New Student Registration{registrations.length > 1 ? 's' : ''}
                    </h3>
                    <p className="text-gray-600">Recently registered students</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/admin/registrations')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-lg transition"
                >
                  Review Now
                </button>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Attendance Trend Chart */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance Distribution Pie Chart */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.attendanceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.attendanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Students Table */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Student Attendance Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-bold">Student Name</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-bold">Attendance %</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.students.map((student, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{student.name}</td>
                      <td className="px-4 py-3 text-gray-800">{student.attendance}%</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          student.status === 'Good' ? 'bg-green-100 text-green-800' :
                          student.status === 'Warning' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </>
          )}

          {/* Registrations Tab */}
          {activeView === 'registrations' && (
            <div className="card mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 New Student Registrations</h2>
              {registrations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Name</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Email</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Roll No</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Year/Section</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Phone</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Registered At</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-800 font-bold">{reg.name}</td>
                          <td className="px-4 py-3 text-gray-800">{reg.email}</td>
                          <td className="px-4 py-3 text-gray-800">{reg.rollNo}</td>
                          <td className="px-4 py-3 text-gray-800">{reg.year} - {reg.section}</td>
                          <td className="px-4 py-3 text-gray-800">{reg.phone}</td>
                          <td className="px-4 py-3 text-gray-800 text-sm">{reg.registeredAt}</td>
                          <td className="px-4 py-3">
                            <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                              {reg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No new registrations yet</p>
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeView === 'students' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Students Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700 font-bold">Name</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-bold">Roll No</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-bold">Email</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-bold">Attendance</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.students.map((student, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-gray-800">{student.name}</td>
                        <td className="px-4 py-3 text-gray-800">{student.rollNo}</td>
                        <td className="px-4 py-3 text-gray-800">{student.email}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">{student.attendance}%</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            student.attendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {student.attendance >= 75 ? '✓ Good' : '⚠ Low'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeView === 'classes' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Classes Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.classes.map((cls, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{cls.name}</h3>
                    <p className="text-gray-600 mb-2">📅 Year: <span className="font-bold">{cls.year}</span></p>
                    <p className="text-gray-600 mb-3">🔤 Section: <span className="font-bold">{cls.section}</span></p>
                    <p className="text-gray-700 font-bold">👥 Students: <span className="text-primary text-lg">{cls.students}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeView === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Reports & Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Attendance Trend Chart */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance Trend (6 Months)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="attendance" stroke="#4CAF50" strokeWidth={2} name="Attendance %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Attendance Distribution Chart */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Student Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={data.statusDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {data.statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#4CAF50', '#FF9800', '#f44336'][index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
