import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company, onEdit, onDelete, isAdmin = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {/* Header with gradient and logo */}
      <div className="relative h-32 bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
        <div className="text-6xl">🏢</div>
      </div>

      {/* Content */}
      <div className="pt-4 px-6 pb-6 flex-1 flex flex-col">
        {/* Company name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-4">📍 {company.location}</p>

        {/* Package range */}
        <div className="bg-primary-light/10 rounded-lg p-3 mb-4">
          <p className="text-sm font-bold text-primary">Package Range</p>
          <p className="text-lg font-bold text-gray-900">{company.minPackage} - {company.maxPackage}</p>
          {company.roles[0]?.internship && (
            <p className="text-xs text-gray-600 mt-1">Internship: {company.roles[0].internship}</p>
          )}
        </div>

        {/* Roles count */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-primary font-bold">{company.roles.length}</span>
          <span className="text-gray-600">Job Role{company.roles.length !== 1 ? 's' : ''} Offered</span>
        </div>

        {/* Eligibility highlight */}
        <div className="text-sm text-gray-600 mb-4">
          <p className="font-semibold text-gray-700 mb-1">Eligibility</p>
          <p>CGPA: {company.eligibility.minCGPA}+</p>
          <p>Branches: {company.eligibility.branches.slice(0, 2).join(', ')}...</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => navigate(`/placement/company/${company.id}`)}
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:opacity-90 transition text-sm font-semibold"
          >
            View Details
          </button>
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(company)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(company.id)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm"
                title="Delete"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
