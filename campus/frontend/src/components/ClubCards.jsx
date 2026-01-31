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
export const ClubCard = ({ club, detailed = false, isCoordinator = false, currentUserEmail = '', onEdit, onManageMembers, onManageActivities, onManageAnnouncements, onDelete }) => {
  const isClubCoordinator = isCoordinator && club?.coordinators?.some(c => c.email === currentUserEmail);
  const categoryColors = {
    technical: 'border-primary/20 bg-white',
    cultural: 'border-primary/20 bg-white',
    sports: 'border-primary/20 bg-white'
  };

  const categoryBgColors = {
    technical: 'bg-primary/10',
    cultural: 'bg-primary/10',
    sports: 'bg-primary/10'
  };

  const categoryTextColors = {
    technical: 'text-primary',
    cultural: 'text-primary',
    sports: 'text-primary'
  };

  return (
    <div className={`border-l-4 rounded-lg p-6 hover:shadow-lg transition-all ${categoryColors[club.category]} relative group`}>
      {/* Link Wrapper */}
      <Link to={`/clubs/${club.id}`} className="block">
        {/* Header with Logo and Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <span className={`text-4xl ${categoryBgColors[club.category]} rounded-lg p-2`}>
              {club.logo}
            </span>
            <div className="flex-1">
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
            <p className="text-lg font-bold text-gray-800 dark:text-white">{club.achievements?.length || 0}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Achievements</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{club.events?.length || 0}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Events</p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="flex flex-wrap gap-2 mb-4">
          {club.focusAreas?.slice(0, 2).map((area, idx) => (
            <span key={idx} className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
              {area}
            </span>
          ))}
        </div>

        {/* Coordinators */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <p className="font-medium mb-2">Coordinators</p>
          {club.coordinators?.slice(0, 2).map((coord, idx) => (
            <p key={idx} className="text-xs">{coord.name} - {coord.position}</p>
          ))}
        </div>

        {/* CTA Button */}
        <button className={`w-full py-2 rounded font-medium transition-all bg-primary hover:bg-primary-dark text-white`}>
          View Details
        </button>
      </Link>

      {/* Coordinator Action Buttons */}
      {isClubCoordinator && (
        <div className="absolute top-4 right-4 flex gap-2 bg-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.preventDefault(); onEdit?.(club); }}
            className="px-3 py-1 bg-white border border-gray-100 text-primary rounded hover:bg-primary hover:text-white transition text-sm font-semibold"
            title="Edit Club"
          >
            ✏️
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onManageMembers?.(club); }}
            className="px-3 py-1 bg-white border border-gray-100 text-primary rounded hover:bg-primary hover:text-white transition text-sm font-semibold"
            title="Manage Members"
          >
            👥
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onManageActivities?.(club); }}
            className="px-3 py-1 bg-white border border-gray-100 text-primary rounded hover:bg-primary hover:text-white transition text-sm font-semibold"
            title="Manage Activities"
          >
            🎬
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onManageAnnouncements?.(club); }}
            className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition text-sm font-semibold"
            title="Announcements"
          >
            📢
          </button>
          <button
            onClick={(e) => { e.preventDefault(); if (window.confirm('Are you sure you want to delete this club?')) { onDelete?.(club); } }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-semibold"
            title="Delete Club"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================
// COORDINATOR CARD
// ============================================

export const CoordinatorCard = ({ coordinator, showEmail = true }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-lg font-bold text-white">
            {coordinator.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h4 className="font-bold text-gray-800 text-sm">{coordinator.name}</h4>
        <p className="text-xs text-primary font-medium mb-2">{coordinator.position}</p>
        {showEmail && (
          <a href={`mailto:${coordinator.email}`} className="text-xs text-gray-600 hover:text-gray-800 break-all">
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
  const yearColor = achievement.year === new Date().getFullYear() ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg p-4 border-l-4 border-primary hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800 text-sm flex-1 pr-2">{achievement.title}</h4>
        <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${yearColor}`}>
          {achievement.year}
        </span>
      </div>
      {showClub && achievement.clubName && (
        <p className="text-xs text-gray-700 font-medium mb-2">{achievement.clubName}</p>
      )}
      <p className="text-xs text-gray-600">{achievement.description}</p>
    </div>
  );
};

// ============================================
// EVENT CARD
// ============================================

export const EventCard = ({ event, showClub = false }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-gray-800 text-sm flex-1">{event.name}</h4>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
          {event.date}
        </span>
      </div>
      {showClub && event.clubName && (
        <p className="text-xs text-gray-700 font-medium mb-2">{event.clubName}</p>
      )}
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
        <p className="text-xs text-gray-600">{event.participants} participants</p>
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
    blue: 'bg-white text-primary border-primary/10',
    magenta: 'bg-white text-primary border-primary/10',
    orange: 'bg-white text-primary border-primary/10',
    cyan: 'bg-white text-primary border-primary/10'
  };

  return (
    <div className={`rounded-lg p-6 border ${colorClasses[color]} hover:shadow-md transition-all`}>
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
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
          ? 'bg-primary text-white shadow-md'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
    'bg-gray-100 text-gray-800',
    'bg-primary/10 text-primary',
    'bg-gray-100 text-gray-800',
    'bg-primary/10 text-primary'
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
