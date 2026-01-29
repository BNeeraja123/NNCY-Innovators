import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eventCategories } from '../data/eventsFullData';

export default function EventCard({ 
  event, 
  showImage = false,
  compact = false 
}) {
  const navigate = useNavigate();
  
  const getCategoryColor = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId);
    return category ? category.color : 'red-600';
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

  if (showImage) {
    return (
      <div 
        onClick={() => navigate(`/events/${event.slug}`)}
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
          <div className={`absolute top-4 left-4 bg-${categoryColor} text-white p-3 rounded-lg shadow-lg text-center`}>
            <div className="text-2xl font-bold">{dateInfo.day}</div>
            <div className="text-xs uppercase tracking-wide">{dateInfo.month}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1 bg-${categoryColor} bg-opacity-10 text-${categoryColor} text-xs font-semibold px-3 py-1 rounded-full`}>
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
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
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

          {/* Action Button */}
          <button className={`w-full bg-gradient-to-r from-${categoryColor} to-opacity-80 bg-${categoryColor} text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all`}>
            View Details & Register →
          </button>
        </div>
      </div>
    );
  }

  // Compact version (original design)
  return (
    <div 
      onClick={() => navigate(`/events/${event.slug}`)}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border-l-4 border-${categoryColor} cursor-pointer`}
    >
      <div className="flex">
        {/* Date Section */}
        <div className={`bg-${categoryColor} text-white p-4 flex flex-col items-center justify-center min-w-[80px]`}>
          <div className="text-3xl font-bold">{dateInfo.day}</div>
          <div className="text-sm uppercase tracking-wide">{dateInfo.month}</div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Category Badge */}
          <span className={`inline-block bg-${categoryColor} bg-opacity-10 text-${categoryColor} text-xs font-semibold px-3 py-1 rounded-full mb-2`}>
            {getCategoryIcon(event.category)} {getCategoryName(event.category)}
          </span>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-festival-orange transition-colors line-clamp-1">
            {event.title}
          </h3>
          
          {/* Description */}
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
          
          {/* Action Button */}
          <button className={`mt-4 text-${categoryColor} font-semibold hover:underline transition-colors`}>
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
