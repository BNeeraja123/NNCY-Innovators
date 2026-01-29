import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlumniCard = ({ alumni, onEdit, onDelete, isAdmin = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {/* Header with image and basic info */}
      <div className="relative h-32 bg-gradient-to-r from-festival-orange to-festival-magenta">
        <img
          src={alumni.image}
          alt={alumni.name}
          className="w-24 h-24 rounded-full border-4 border-white absolute bottom-0 left-4 transform translate-y-1/2"
        />
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6 flex-1 flex flex-col">
        {/* Name and title */}
        <h3 className="text-xl font-bold text-gray-900">{alumni.name}</h3>
        <p className="text-sm text-festival-orange font-semibold">{alumni.role}</p>
        <p className="text-sm text-gray-600 mb-2">{alumni.company}</p>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-festival-magenta font-semibold">Domain:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {alumni.domain}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-festival-magenta font-semibold">Grad Year:</span>
            <span>{alumni.graduationYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-festival-magenta font-semibold">Experience:</span>
            <span>{alumni.stats.yearsInIndustry} years</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-festival-magenta font-semibold">Location:</span>
            <span>{alumni.location}</span>
          </div>
        </div>

        {/* Achievements count */}
        <div className="bg-gradient-to-r from-festival-cyan to-blue-400 bg-opacity-10 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-festival-magenta">{alumni.achievements.length}</span> Key Achievement{alumni.achievements.length !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
            {alumni.achievements[0]}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => navigate(`/alumni/${alumni.id}`)}
            className="flex-1 bg-gradient-to-r from-festival-orange to-festival-magenta text-white py-2 rounded-lg hover:opacity-90 transition text-sm font-semibold"
          >
            View Profile
          </button>
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(alumni)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(alumni.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
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

export default AlumniCard;
