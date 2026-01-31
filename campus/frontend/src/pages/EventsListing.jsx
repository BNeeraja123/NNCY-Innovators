import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EventFilterBar from '../components/EventFilterBar';
import EventCoordinatorLogin from '../components/EventCoordinatorLogin';
import EventEditModal from '../components/EventEditModal';
import EventRegistrationsModal from '../components/EventRegistrationsModal';
import { eventAPI } from '../services/api';
import { eventCategories } from '../data/eventsFullData';
import { useAuth } from '../context/AuthContext';

export default function EventsListing() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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
  
  // Coordinator features
  const [showCoordinatorLogin, setShowCoordinatorLogin] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  
  const isCoordinator = user?.role === 'event_coordinator' || user?.role === 'admin';

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

  // Coordinator functions
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      setModalLoading(true);
      await eventAPI.deleteEvent(eventId);
      setEvents(events.filter(e => e.id !== eventId));
      alert('Event deleted successfully');
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      setModalLoading(true);
      if (selectedEvent) {
        const updated = await eventAPI.updateEvent(selectedEvent.id, eventData);
        setEvents(events.map(e => e.id === selectedEvent.id ? updated : e));
        alert('Event updated successfully');
      } else {
        const created = await eventAPI.createEvent(eventData);
        setEvents([...events, created]);
        alert('Event created successfully');
      }
      setShowEventModal(false);
      setSelectedEvent(null);
    } catch (err) {
      alert('Failed to save event: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleManageRegistrations = async (event) => {
    try {
      setModalLoading(true);
      setSelectedEvent(event);
      const registrations = await eventAPI.getEventRegistrations(event.id);
      setEventRegistrations(registrations || []);
      setShowRegistrationsModal(true);
    } catch (err) {
      alert('Failed to fetch registrations: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateRegistrationStatus = async (registrationId, status) => {
    try {
      setModalLoading(true);
      await eventAPI.updateRegistrationStatus(selectedEvent.id, registrationId, { status });
      const updated = eventRegistrations.map(r =>
        r.id === registrationId ? { ...r, status } : r
      );
      setEventRegistrations(updated);
    } catch (err) {
      alert('Failed to update registration: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDownloadRegistrations = (registrations) => {
    try {
      // Create CSV content
      const headers = ['Name', 'Email', 'Registration Type', 'Team Name', 'Status', 'Date'];
      const csvContent = [
        headers.join(','),
        ...registrations.map(r =>
          [r.userName, r.userEmail, r.registrationType, r.teamName || '', r.status, new Date(r.createdAt).toLocaleDateString()].join(',')
        )
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedEvent.title}-registrations.csv`;
      link.click();
    } catch (err) {
      alert('Failed to download registrations: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-primary-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-gray-200 transition flex items-center gap-2"
            >
              ← Back to Home
            </button>
            <div className="flex gap-3">
              {isCoordinator ? (
                <>
                  <button
                    onClick={handleCreateEvent}
                    className="px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    + Create Event
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      alert('Logged out successfully');
                    }}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowCoordinatorLogin(true)}
                  className="px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Coordinator Login
                </button>
              )}
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">College Events</h1>
          <p className="text-xl text-white/90">Discover, Register, and Participate in Amazing Events</p>
          
          {isCoordinator && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
              <p className="text-white text-sm">✓ Logged in as Event Coordinator</p>
            </div>
          )}
          
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
                  isCoordinator={isCoordinator}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                  onManageRegistrations={handleManageRegistrations}
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
                        ? 'bg-primary text-white' 
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
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Coordinator Login Modal */}
      <EventCoordinatorLogin
        isOpen={showCoordinatorLogin}
        onClose={() => setShowCoordinatorLogin(false)}
        onLoginSuccess={(userData) => {
          // Refresh events after login
          setShowCoordinatorLogin(false);
        }}
      />

      {/* Event Edit Modal */}
      <EventEditModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onSubmit={handleSaveEvent}
        loading={modalLoading}
      />

      {/* Event Registrations Modal */}
      <EventRegistrationsModal
        isOpen={showRegistrationsModal}
        onClose={() => {
          setShowRegistrationsModal(false);
          setSelectedEvent(null);
          setEventRegistrations([]);
        }}
        event={selectedEvent}
        registrations={eventRegistrations}
        loading={modalLoading}
        onUpdateStatus={handleUpdateRegistrationStatus}
        onDownloadData={handleDownloadRegistrations}
      />
    </div>
  );
}
