import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import { dummyData } from '../data/dummyData';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const studentEmail = localStorage.getItem('studentEmail');
  
  // Update active view when location changes
  useEffect(() => {
    if (location.pathname === '/student/attendance') setActiveView('attendance');
    else if (location.pathname === '/student/reports') setActiveView('reports');
    else setActiveView('dashboard');
  }, [location.pathname]);
  
  // Find student data by email
  const allStudents = dummyData.student;
  const currentStudent = allStudents.find(s => s.email === studentEmail) || allStudents[0];
  const data = currentStudent;

  if (!localStorage.getItem('userRole')) {
    navigate('/login');
    return null;
  }

  const downloadPDF = () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(16);
    pdf.text('Attendance Report', 20, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Name: ${data.name}`, 20, 40);
    pdf.text(`Roll No: ${data.rollNo}`, 20, 50);
    pdf.text(`Overall Attendance: ${data.overallAttendance}%`, 20, 60);
    pdf.text(`Status: ${data.status}`, 20, 70);
    
    pdf.setFontSize(12);
    pdf.text('Subject-wise Attendance:', 20, 90);
    
    let yPosition = 100;
    data.subjects.forEach((subject) => {
      pdf.text(`${subject.name}: ${subject.attendance}% (${subject.present}/${subject.classes})`, 20, yPosition);
      yPosition += 10;
    });
    
    pdf.save('attendance_report.pdf');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} role="student" />
      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 lg:p-8">
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <>
              {/* Header Card */}
              <div className="card mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.name}</h2>
                    <p className="text-gray-600">Roll No: {data.rollNo}</p>
                  </div>
                  <button
                    onClick={downloadPDF}
                    className="btn-primary"
                  >
                    📥 Download Report
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatCard title="Overall Attendance" value={`${data.overallAttendance}%`} icon="📊" color="bg-green-100" />
                <StatCard title="Status" value={data.status} icon="✅" color="bg-blue-100" />
              </div>

              {/* Attendance Trend Chart */}
              <div className="card mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance Trend</h3>
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

              {/* Notifications */}
              {data.notifications.length > 0 && (
                <div className="card mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    {data.notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-lg ${
                          notif.type === 'warning' ? 'bg-orange-50 border-l-4 border-secondary' : 'bg-blue-50 border-l-4 border-blue-500'
                        }`}
                      >
                        <p className="text-gray-800">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subject-wise Attendance */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subject-wise Attendance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Subject</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Attendance %</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Present/Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.subjects.map((subject, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-800">{subject.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-3 max-w-xs">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${subject.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-800 font-bold">{subject.attendance}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-800">{subject.present}/{subject.classes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Attendance View */}
          {activeView === 'attendance' && (
            <>
              {/* Header Card */}
              <div className="card mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.name}</h2>
                <p className="text-gray-600 mb-4">Roll No: {data.rollNo}</p>
                <p className="text-gray-700 font-bold">Overall Attendance: <span className="text-primary text-xl">{data.overallAttendance}%</span></p>
              </div>

              {/* Attendance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Status" value={data.status} icon="✅" color="bg-blue-100" />
                <StatCard title="Present Days" value={data.subjects.reduce((sum, s) => sum + s.present, 0)} icon="📅" color="bg-green-100" />
                <StatCard title="Total Classes" value={data.subjects.reduce((sum, s) => sum + s.classes, 0)} icon="📚" color="bg-purple-100" />
              </div>

              {/* Attendance Trend Chart */}
              <div className="card mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Attendance Trend</h3>
                <ResponsiveContainer width="100%" height={400}>
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

              {/* Subject-wise Attendance Details */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subject-wise Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Subject</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Attendance</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Present</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Total Classes</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.subjects.map((subject, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-800">{subject.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${subject.attendance}%` }}
                                ></div>
                              </div>
                              <span className="font-bold text-gray-800">{subject.attendance}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-800">{subject.present}</td>
                          <td className="px-4 py-3 text-gray-800">{subject.classes}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                              subject.attendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {subject.attendance >= 75 ? 'Good' : 'Low'}
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

          {/* Reports View */}
          {activeView === 'reports' && (
            <>
              {/* Header */}
              <div className="card mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.name} - Reports</h2>
                    <p className="text-gray-600">Roll No: {data.rollNo}</p>
                  </div>
                  <button
                    onClick={downloadPDF}
                    className="btn-primary"
                  >
                    📥 Download PDF Report
                  </button>
                </div>
              </div>

              {/* Report Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Overall Attendance" value={`${data.overallAttendance}%`} icon="📊" color="bg-green-100" />
                <StatCard title="Status" value={data.status} icon="✅" color="bg-blue-100" />
                <StatCard title="Total Subjects" value={data.subjects.length} icon="📚" color="bg-purple-100" />
                <StatCard title="Average Performance" value={`${Math.round(data.subjects.reduce((sum, s) => sum + s.attendance, 0) / data.subjects.length)}%`} icon="📈" color="bg-orange-100" />
              </div>

              {/* Attendance Summary Report */}
              <div className="card mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-gray-600 text-sm font-bold">Total Classes</p>
                    <p className="text-2xl font-bold text-blue-600">{data.subjects.reduce((sum, s) => sum + s.classes, 0)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                    <p className="text-gray-600 text-sm font-bold">Classes Attended</p>
                    <p className="text-2xl font-bold text-green-600">{data.subjects.reduce((sum, s) => sum + s.present, 0)}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                    <p className="text-gray-600 text-sm font-bold">Absent</p>
                    <p className="text-2xl font-bold text-orange-600">{data.subjects.reduce((sum, s) => sum + (s.classes - s.present), 0)}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                    <p className="text-gray-600 text-sm font-bold">Overall %</p>
                    <p className="text-2xl font-bold text-purple-600">{data.overallAttendance}%</p>
                  </div>
                </div>
              </div>

              {/* Subject-wise Report */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subject-wise Report</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Subject</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Attendance %</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Classes Present</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Total Classes</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-bold">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.subjects.map((subject, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-800">{subject.name}</td>
                          <td className="px-4 py-3 font-bold text-gray-800">{subject.attendance}%</td>
                          <td className="px-4 py-3 text-gray-800">{subject.present}</td>
                          <td className="px-4 py-3 text-gray-800">{subject.classes}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                              subject.attendance >= 75 ? 'bg-green-100 text-green-800' : subject.attendance >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {subject.attendance >= 75 ? 'Excellent' : subject.attendance >= 60 ? 'Satisfactory' : 'Needs Improvement'}
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
        </main>
      </div>
    </div>
  );
}
