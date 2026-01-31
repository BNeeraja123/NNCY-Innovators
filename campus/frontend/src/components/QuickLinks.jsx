import React from 'react';
import Badge from './Badge';

const QuickLinks = ({ onNavigate = () => {} }) => {
  const links = [
    { id: 'overview', label: 'Overview', hint: 'Placement stats', badge: 'ERP' },
    { id: 'companies', label: 'Companies', hint: 'Manage employers', badge: 'Coordinator' },
    { id: 'students', label: 'Students', hint: 'Manage students', badge: 'Coordinator' },
    { id: 'add-company', label: 'Add Company', hint: 'Create new company' },
    { id: 'add-student', label: 'Add Student', hint: 'Create new student' },
    { id: 'reports', label: 'Reports', hint: 'Download CSV' }
  ];

  return (
    <nav aria-label="Quick links" className="sticky top-20">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Quick Links</h4>
        <p className="text-sm text-gray-600 mb-4">Jump to key placement functions</p>
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => onNavigate(l.id)}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={l.hint}
              >
                <span className="font-medium text-gray-900">{l.label}</span>
                <span className="ml-2">
                  {l.badge ? <Badge className="!bg-primary">{l.badge}</Badge> : <span className="text-xs text-gray-500">›</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default QuickLinks;
