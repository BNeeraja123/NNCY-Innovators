import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EventFilterBar from '../components/EventFilterBar';
import { eventAPI } from '../services/api';
import { eventCategories } from '../data/eventsFullData';

export default function EventsListing() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const limit = 10;

  // Fetch events with filters
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          limit,
        };

        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (selectedStatus !== 'all') params.status = selectedStatus;
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (sortBy !== 'date') params.sortBy = sortBy;

        const response = await eventAPI.getEvents(params);
        setEvents(response.data || response);
        setPagination(response.pagination || {});
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, searchQuery, sortBy, selectedStatus, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:text-gray-200 transition flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl font-bold mb-4">College Events</h1>
          <p className="text-xl text-white/90">Discover, Register, and Participate in Amazing Events</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              📅 {pagination.total || 0} Total Events
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              🎯 {eventCategories.length} Categories
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <EventFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error loading events: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-festival-orange"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        )}

        {/* Events Grid/List */}
        {!loading && events.length > 0 && (
          <div>
            <div className={`grid gap-6 mb-12 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  showImage={viewMode === 'grid'}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages && pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`px-3 py-2 rounded-lg ${
                      page === p 
                        ? 'bg-festival-orange text-white' 
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Events Message */}
        {!loading && events.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedStatus('all');
              }}
              className="px-6 py-2 bg-festival-orange text-white rounded-lg hover:bg-festival-orange/90 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
