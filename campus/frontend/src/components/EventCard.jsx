import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eventCategories } from '../data/eventsFullData';

export default function EventCard({ 
  event, 
  showImage = false,
  compact = false,
  isCoordinator = false,
  onEdit = null,
  onDelete = null,
  onManageRegistrations = null
}) {
  const navigate = useNavigate();
  
  // Color mapping for event categories
  const colorMap = {
    'event-technical': { bg: '#8B5CF6', text: '#8B5CF6', light: '#DDD6FE' },
    'event-cultural': { bg: '#FF8200', text: '#FF8200', light: '#FED7AA' },
    'event-sports': { bg: '#00FF40', text: '#00FF40', light: '#D1FAE5' },
    'event-academic': { bg: '#00BFFF', text: '#00BFFF', light: '#DBEAFE' },
    'event-workshop': { bg: '#F59E0B', text: '#F59E0B', light: '#FEF3C7' },
    'event-social': { bg: '#FF00FF', text: '#FF00FF', light: '#FAE8FF' },
  };
  
  const getCategoryColor = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId);
    return category ? category.color : 'primary';
  };
  
  const getCategoryColorHex = (categoryId) => {
    const colorKey = getCategoryColor(categoryId);
    return colorMap[colorKey] || { bg: '#FF6A00', text: '#FF6A00', light: '#FFF7ED' };
  };

  const getCategoryIcon = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId);
    return category ? category.icon : '📅';
  };

  const getCategoryName = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    };
  };

  const dateInfo = formatDate(event.date);
  const categoryColor = getCategoryColor(event.category);
  const colors = getCategoryColorHex(event.category);

  const handleEventClick = (e) => {
    // Don't navigate if clicking on action buttons
    if (e.target.closest('button[data-action]')) {
      return;
    }
    navigate(`/events/${event.slug}`);
  };

  if (showImage) {
    return (
      <div 
        onClick={handleEventClick}
        className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
      >
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {event.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-festival-orange to-festival-magenta text-white px-3 py-1 rounded-full text-xs font-bold">
              ⭐ FEATURED
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-light text-white px-3 py-1 rounded-full text-xs font-bold">
            <div className="text-2xl font-bold">{dateInfo.day}</div>
            <div className="text-xs uppercase tracking-wide">{dateInfo.month}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span 
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: colors.light, color: colors.text }}
            >
              <span>{getCategoryIcon(event.category)}</span>
              {getCategoryName(event.category)}
            </span>
            {event.certificateProvided && (
              <span className="text-xs text-gray-500">🏆 Certificate</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-festival-orange transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors line-clamp-2">
            {event.shortDescription}
          </p>

          {/* Event Meta */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <span>🕐</span>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span className="line-clamp-1">{event.venue}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{event.totalRegistrations} registered</span>
            </div>
          </div>

          {/* Updated Info */}
          {isCoordinator && event.updatedBy && (
            <p className="text-xs text-gray-400 mb-3">Last updated by {event.updatedBy}</p>
          )}

          {/* Action Buttons */}
          <div className={`flex ${isCoordinator ? 'gap-2' : ''}`}>
            <button 
              className="flex-1 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.bg }}
              data-action="view"
            >
              View Details & Register →
            </button>
            
            {isCoordinator && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onManageRegistrations?.(event);
                  }}
                  data-action="registrations"
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold text-sm"
                  title="Manage registrations"
                >
                  👥
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(event);
                  }}
                  data-action="edit"
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold text-sm"
                  title="Edit event"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(event.id);
                  }}
                  data-action="delete"
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold text-sm"
                  title="Delete event"
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Compact version (original design)
  return (
    <div 
      onClick={handleEventClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border-l-4 cursor-pointer"
      style={{ borderLeftColor: colors.bg }}
    >
      <div className="flex">
        {/* Date Section */}
        <div 
          className="text-white p-4 flex flex-col items-center justify-center min-w-[80px]"
          style={{ backgroundColor: colors.bg }}
        >
          <div className="text-3xl font-bold">{dateInfo.day}</div>
          <div className="text-sm uppercase tracking-wide">{dateInfo.month}</div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Category Badge */}
          <span 
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2"
            style={{ backgroundColor: colors.light, color: colors.text }}
          >
            {getCategoryIcon(event.category)} {getCategoryName(event.category)}
          </span>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary-dark transition-colors line-clamp-1">
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {event.shortDescription}
          </p>
          
          {/* Event Details */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>🕐</span>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>

          {/* Updated Info */}
          {isCoordinator && event.updatedBy && (
            <p className="text-xs text-gray-400 mt-2">Last updated by {event.updatedBy}</p>
          )}
          
          {/* Action Buttons */}
          <div className={`mt-4 flex gap-2 ${isCoordinator ? 'flex-wrap' : ''}`}>
            <button 
              className="font-semibold hover:underline transition-colors"
              style={{ color: colors.text }}
              data-action="view"
            >
              View Details →
            </button>
            
            {isCoordinator && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onManageRegistrations?.(event);
                  }}
                  data-action="registrations"
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition font-semibold"
                  title="Manage registrations"
                >
                  👥
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(event);
                  }}
                  data-action="edit"
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition font-semibold"
                  title="Edit event"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(event.id);
                  }}
                  data-action="delete"
                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition font-semibold"
                  title="Delete event"
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
