/**
 * Clubs Card Components
 * Reusable components for displaying club information
 */

import React from 'react';
import { Link } from 'react-router-dom';

// ============================================
// CLUB CARD
// ============================================

/**
 * Main club card component for displaying club overview
 */
export const ClubCard = ({ club, detailed = false }) => {
  const categoryColors = {
    technical: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    cultural: 'border-magenta-500 bg-magenta-50 dark:bg-magenta-900/20',
    sports: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
  };

  const categoryBgColors = {
    technical: 'bg-blue-100 dark:bg-blue-900',
    cultural: 'bg-magenta-100 dark:bg-magenta-900',
    sports: 'bg-orange-100 dark:bg-orange-900'
  };

  const categoryTextColors = {
    technical: 'text-blue-700 dark:text-blue-300',
    cultural: 'text-magenta-700 dark:text-magenta-300',
    sports: 'text-orange-700 dark:text-orange-300'
  };

  return (
    <Link to={`/clubs/${club.id}`}>
      <div className={`border-l-4 rounded-lg p-6 hover:shadow-lg transition-all ${categoryColors[club.category]}`}>
        {/* Header with Logo and Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className={`text-4xl ${categoryBgColors[club.category]} rounded-lg p-2`}>
              {club.logo}
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{club.name}</h3>
              <p className={`text-sm ${categoryTextColors[club.category]} font-medium`}>{club.type}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{club.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{club.memberCount}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Members</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{club.achievements.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Achievements</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{club.events.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Events</p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="flex flex-wrap gap-2 mb-4">
          {club.focusAreas.slice(0, 2).map((area, idx) => (
            <span key={idx} className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
              {area}
            </span>
          ))}
        </div>

        {/* Coordinators */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <p className="font-medium mb-2">Coordinators</p>
          {club.coordinators.slice(0, 2).map((coord, idx) => (
            <p key={idx} className="text-xs">{coord.name} - {coord.position}</p>
          ))}
        </div>

        {/* CTA Button */}
        <button className={`w-full py-2 rounded font-medium transition-all ${
          club.category === 'technical' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
          club.category === 'cultural' ? 'bg-magenta-500 hover:bg-magenta-600 text-white' :
          'bg-orange-500 hover:bg-orange-600 text-white'
        }`}>
          View Details
        </button>
      </div>
    </Link>
  );
};

// ============================================
// COORDINATOR CARD
// ============================================

export const CoordinatorCard = ({ coordinator, showEmail = true }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-magenta-400 rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-lg font-bold text-white">
            {coordinator.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h4 className="font-bold text-gray-800 dark:text-white text-sm">{coordinator.name}</h4>
        <p className="text-xs text-orange-500 font-medium mb-2">{coordinator.position}</p>
        {showEmail && (
          <a href={`mailto:${coordinator.email}`} className="text-xs text-blue-500 hover:text-blue-600 break-all">
            {coordinator.email}
          </a>
        )}
      </div>
    </div>
  );
};

// ============================================
// ACHIEVEMENT CARD
// ============================================

export const AchievementCard = ({ achievement, showClub = false }) => {
  const yearColor = achievement.year === new Date().getFullYear() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white dark:bg-gray-800 border-l-4 border-amber-500 rounded-lg p-4 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800 dark:text-white text-sm flex-1 pr-2">{achievement.title}</h4>
        <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${yearColor} dark:bg-gray-700 dark:text-gray-300`}>
          {achievement.year}
        </span>
      </div>
      {showClub && achievement.clubName && (
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{achievement.clubName}</p>
      )}
      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
    </div>
  );
};

// ============================================
// EVENT CARD
// ============================================

export const EventCard = ({ event, showClub = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-gray-800 dark:text-white text-sm flex-1">{event.name}</h4>
        <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded whitespace-nowrap">
          {event.date}
        </span>
      </div>
      {showClub && event.clubName && (
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{event.clubName}</p>
      )}
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full"></span>
        <p className="text-xs text-gray-600 dark:text-gray-400">{event.participants} participants</p>
      </div>
    </div>
  );
};

// ============================================
// GALLERY CARD
// ============================================

export const GalleryCard = ({ image, showCaption = true }) => {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-square hover:shadow-lg transition-all">
      <img
        src={image.url}
        alt={image.caption}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      {showCaption && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
          <p className="text-white text-sm font-medium p-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
            {image.caption}
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================
// STATS CARD
// ============================================

export const StatsCard = ({ icon, label, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    magenta: 'bg-magenta-50 dark:bg-magenta-900/20 text-magenta-600 dark:text-magenta-400 border-magenta-200 dark:border-magenta-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800'
  };

  return (
    <div className={`rounded-lg p-6 border ${colorClasses[color]} hover:shadow-md transition-all`}>
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILTER BADGE
// ============================================

export const FilterBadge = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive
          ? 'bg-blue-500 text-white shadow-md'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );
};

// ============================================
// FOCUS AREA TAG
// ============================================

export const FocusAreaTag = ({ area }) => {
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'bg-magenta-100 text-magenta-800 dark:bg-magenta-900 dark:text-magenta-300',
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  ];

  const colorClass = colors[area.length % colors.length];

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {area}
    </span>
  );
};

export default {
  ClubCard,
  CoordinatorCard,
  AchievementCard,
  EventCard,
  GalleryCard,
  StatsCard,
  FilterBadge,
  FocusAreaTag
};
