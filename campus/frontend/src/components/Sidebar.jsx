import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ open, role }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get registration count
  const registrationCount = (() => {
    try {
      const regs = JSON.parse(localStorage.getItem('studentRegistrations') || '[]');
      return regs.length;
    } catch {
      return 0;
    }
  })();

  const adminMenuItems = [
    { path: '/admin', label: 'Overview', icon: '📊' },
    { path: '/admin/students', label: 'Students', icon: '👥' },
    { path: '/admin/classes', label: 'Classes', icon: '📚' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
    { path: '/admin/registrations', label: 'New Registrations', icon: '📋' },
  ];

  const facultyMenuItems = [
    { path: '/faculty', label: 'Dashboard', icon: '📊' },
    { path: '/faculty/classes', label: 'My Classes', icon: '📚' },
    { path: '/faculty/mark-attendance', label: 'Mark Attendance', icon: '✅' },
    { path: '/faculty/reports', label: 'Reports', icon: '📈' },
    { path: '/faculty/registrations', label: 'New Registrations', icon: '📋' },
  ];

  const studentMenuItems = [
    { path: '/student', label: 'Dashboard', icon: '📊' },
    { path: '/student/attendance', label: 'Attendance', icon: '📅' },
    { path: '/student/reports', label: 'Reports', icon: '📄' },
  ];

  const menuItems = 
    role === 'admin' ? adminMenuItems :
    role === 'faculty' ? facultyMenuItems :
    studentMenuItems;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white shadow-lg z-30 transition-all duration-300 ${
          open ? 'w-64' : 'w-0 lg:w-20'
        } overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {open && (
              <div>
                <h2 className="text-lg font-bold text-gray-800">Attendance</h2>
                <p className="text-xs text-gray-600">Management System</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {open && (
                    <span className="font-bold whitespace-nowrap">{item.label}</span>
                  )}
                  {item.path.includes('registrations') && registrationCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {registrationCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
