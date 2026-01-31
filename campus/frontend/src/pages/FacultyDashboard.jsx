import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { dummyData } from '../data/dummyData';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState('1st Year');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedClass, setSelectedClass] = useState(null);
  const [markAttendanceOpen, setMarkAttendanceOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [studentAttendance, setStudentAttendance] = useState({});
  const [markMessage, setMarkMessage] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  
  const data = dummyData.faculty;
  const periods = dummyData.periods;

  // Update active view when location changes
  useEffect(() => {
    if (location.pathname === '/faculty/classes') setActiveView('classes');
    else if (location.pathname === '/faculty/mark-attendance') setActiveView('attendance');
    else if (location.pathname === '/faculty/reports') setActiveView('reports');
    else if (location.pathname === '/faculty/registrations') setActiveView('registrations');
    else setActiveView('dashboard');
  }, [location.pathname]);
  
  // Get student registrations from localStorage
  const [registrations] = useState(() => {
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

  // Generate dummy students for a class
  const getStudentsForClass = (classObj) => {
    const studentNames = [
      'Aman Kumar', 'Priya Singh', 'Rajesh Patel', 'Neha Sharma', 'Vikram Das',
      'Pooja Verma', 'Arjun Gupta', 'Anjali Nair', 'Rohan Joshi', 'Divya Kapoor',
      'Akshay Singh', 'Bhavna Desai', 'Chetan Kulkarni', 'Deepak Iyer', 'Esha Gupta',
    ];
    const classStudents = [];
    for (let i = 0; i < Math.min(classObj.students, studentNames.length); i++) {
      classStudents.push({ id: i + 1, name: studentNames[i], present: true });
    }
    return classStudents;
  };

  const handleMarkAttendance = () => {
    if (!attendanceDate || !selectedPeriod) {
      alert('Please select both date and period');
      return;
    }
    
    setMarkMessage(`✓ Attendance marked for ${selectedClass.name} on ${attendanceDate} during ${selectedPeriod.name}`);
    
    // Reset form
    setTimeout(() => {
      setMarkAttendanceOpen(false);
      setStudentAttendance({});
      setAttendanceDate('');
      setSelectedPeriod(null);
      setMarkMessage('');
    }, 2000);
  };

  const toggleStudentAttendance = (studentId) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  // Filter classes by selected year and section
  const filteredClasses = data.classes.filter(
    cls => cls.year === selectedYear && cls.section === selectedSection
  );

  // Get unique years
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const sections = ['Section A', 'Section B', 'Section C', 'Section D'];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} role="faculty" />
      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 lg:p-8">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8 border-b border-gray-300 overflow-x-auto">
            <button
              onClick={() => navigate('/faculty')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'dashboard'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/faculty/classes')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'classes'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              My Classes
            </button>
            <button
              onClick={() => navigate('/faculty/mark-attendance')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'attendance'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Mark Attendance
            </button>
            <button
              onClick={() => navigate('/faculty/reports')}
              className={`pb-3 px-4 font-bold transition whitespace-nowrap ${
                activeView === 'reports'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => navigate('/faculty/registrations')}
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

          {/* Dashboard Tab */}
          {activeView === 'dashboard' && (
            <>

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
                    <p className="text-gray-600">Review pending student registrations</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/faculty/registrations')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-lg transition"
                >
                  View All
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Classes" value={data.totalClasses} icon="📚" color="bg-blue-100" />
            <StatCard title="Total Students" value={data.totalStudents} icon="👥" color="bg-purple-100" />
            <StatCard title="Avg. Attendance" value={`${data.averageAttendance}%`} icon="📊" color="bg-green-100" />
          </div>

          {/* Weekly Attendance Chart */}
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#FF6A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Year and Section Selection */}
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Select Year & Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Year Selection */}
              <div>
                <label className="block text-gray-700 font-bold mb-3">Academic Year</label>
                <div className="grid grid-cols-2 gap-3">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedYear(year);
                      }}
                      className={`p-3 rounded-lg font-bold transition ${
                        selectedYear === year
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Selection */}
              <div>
                <label className="block text-gray-700 font-bold mb-3">Section</label>
                <div className="grid grid-cols-2 gap-3">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSection(section);
                      }}
                      className={`p-3 rounded-lg font-bold transition ${
                        selectedSection === section
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Classes for Selected Year and Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Classes - {selectedYear} {selectedSection}
            </h2>
            {filteredClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((cls, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClass(cls);
                    }}
                    className={`card cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                      selectedClass?.id === cls.id ? 'ring-2 ring-primary bg-green-50' : ''
                    }`}
                  >
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{cls.name}</h4>
                    <p className="text-gray-600 mb-3">Students: {cls.students}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Attendance</span>
                      <span className="text-2xl font-bold text-primary">{cls.attendance}%</span>
                    </div>
                    <p className="text-xs text-gray-500 border-t pt-2">Click to view periods</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 text-lg">No classes assigned for this section</p>
              </div>
            )}
          </div>

          {/* Selected Class Details with Periods */}
          {selectedClass && (
            <div className="card mb-8 border-l-4 border-primary">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedClass.name}</h3>
                  <p className="text-gray-600">Total Students: <span className="font-bold">{selectedClass.students}</span></p>
                </div>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-gray-500 hover:text-red-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Class Schedule/Periods</h4>
                  <div className="space-y-3">
                    {selectedClass.periods.map((period, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg border-l-4 border-primary">
                        <p className="text-gray-800 font-semibold">📅 {period}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Statistics</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-gray-600">Attendance Rate</p>
                      <p className="text-3xl font-bold text-primary">{selectedClass.attendance}%</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-gray-600">Year</p>
                      <p className="text-2xl font-bold text-purple-600">{selectedClass.year}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-gray-600">Section</p>
                      <p className="text-2xl font-bold text-orange-600">{selectedClass.section}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Mark Attendance</h3>
                
                {markMessage && (
                  <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-800 rounded">
                    {markMessage}
                  </div>
                )}

                {!markAttendanceOpen ? (
                  <button
                    onClick={() => setMarkAttendanceOpen(true)}
                    className="btn-primary"
                  >
                    Mark Attendance
                  </button>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Select Date</label>
                      <input
                        type="date"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-3">Select Period</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {periods.map((period) => (
                          <button
                            key={period.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPeriod(period);
                            }}
                            className={`p-3 rounded-lg font-bold transition text-sm ${
                              selectedPeriod?.id === period.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                          >
                            <div>{period.name}</div>
                            <div className="text-xs font-normal">{period.time}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedPeriod && attendanceDate && (
                      <div>
                        <label className="block text-gray-700 font-bold mb-3">Mark Students (Click to toggle)</label>
                        <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                          <div className="space-y-2">
                            {getStudentsForClass(selectedClass).map((student) => (
                              <div
                                key={student.id}
                                onClick={() => toggleStudentAttendance(student.id)}
                                className={`p-3 rounded-lg cursor-pointer transition flex items-center justify-between ${
                                  studentAttendance[student.id] !== false
                                    ? 'bg-green-100 border-l-4 border-green-600'
                                    : 'bg-red-100 border-l-4 border-red-600'
                                }`}
                              >
                                <span className="font-bold text-gray-800">{student.id}. {student.name}</span>
                                <span className="text-lg font-bold">
                                  {studentAttendance[student.id] !== false ? '✓ Present' : '✗ Absent'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          Total Students: {getStudentsForClass(selectedClass).length} | 
                          Present: {getStudentsForClass(selectedClass).filter(s => studentAttendance[s.id] !== false).length}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <button
                        onClick={handleMarkAttendance}
                        className="btn-primary flex-1"
                      >
                        Submit Attendance
                      </button>
                      <button
                        onClick={() => {
                          setMarkAttendanceOpen(false);
                          setStudentAttendance({});
                          setAttendanceDate('');
                          setSelectedPeriod(null);
                        }}
                        className="btn-outline flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
            </>
          )}

          {/* Registrations Tab */}
          {activeView === 'registrations' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 New Student Registrations</h2>
              {registrations.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                      <p className="text-gray-600 text-sm font-bold">Total Registrations</p>
                      <p className="text-3xl font-bold text-blue-600">{registrations.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                      <p className="text-gray-600 text-sm font-bold">Active Students</p>
                      <p className="text-3xl font-bold text-green-600">{registrations.filter(r => r.status === 'Active').length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                      <p className="text-gray-600 text-sm font-bold">Most Recent</p>
                      <p className="text-lg font-bold text-purple-600">{registrations.length > 0 ? registrations[0].registeredAt : 'N/A'}</p>
                    </div>
                  </div>

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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-800">
                      ℹ️ <strong>Note:</strong> All students are automatically registered and active in the system
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No new registrations yet</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
