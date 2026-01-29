import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { eventsData, myRegisteredEvents } from '../data/eventsFullData';

export default function MyEvents() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registered'); // registered, past, certificates

  const registeredEvents = eventsData.filter(event => 
    myRegisteredEvents.includes(event.id) && event.status === 'upcoming'
  );

  const pastEvents = eventsData.filter(event => 
    myRegisteredEvents.includes(event.id) && event.status === 'past'
  );

  const generateQRCode = (eventId) => {
    // Placeholder for QR code generation
    return `QR-${eventId}-${Date.now()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-festival-blue via-festival-magenta to-festival-orange text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:text-gray-200 transition flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-2">My Events</h1>
          <p className="text-xl text-white/90">Manage your event registrations and certificates</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">Registered</p>
                <p className="text-3xl font-bold text-festival-blue">{registeredEvents.length}</p>
              </div>
              <span className="text-4xl">📅</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">Attended</p>
                <p className="text-3xl font-bold text-festival-green">{pastEvents.length}</p>
              </div>
              <span className="text-4xl">✅</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">Certificates</p>
                <p className="text-3xl font-bold text-festival-orange">
                  {pastEvents.filter(e => e.certificateProvided).length}
                </p>
              </div>
              <span className="text-4xl">🏆</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('registered')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'registered'
                  ? 'border-b-4 border-festival-orange text-festival-orange'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Upcoming Events ({registeredEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'past'
                  ? 'border-b-4 border-festival-orange text-festival-orange'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'certificates'
                  ? 'border-b-4 border-festival-orange text-festival-orange'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Certificates ({pastEvents.filter(e => e.certificateProvided).length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'registered' && (
          <div>
            {registeredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registeredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ✓ Registered
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{event.shortDescription}</p>
                      
                      <div className="flex gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🕐</span>
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/events/${event.slug}`)}
                          className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => alert(`QR Code: ${generateQRCode(event.id)}`)}
                          className="flex-1 bg-festival-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
                        >
                          Show QR Code
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Registered Events</h3>
                <p className="text-gray-600 mb-6">Explore and register for upcoming events</p>
                <button
                  onClick={() => navigate('/events')}
                  className="bg-festival-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-festival-tangerine transition"
                >
                  Browse Events
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div>
            {pastEvents.length > 0 ? (
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} compact={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Past Events</h3>
                <p className="text-gray-600">Events you've attended will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div>
            {pastEvents.filter(e => e.certificateProvided).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.filter(e => e.certificateProvided).map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-festival-orange">
                    <div className="flex items-start gap-4">
                      <span className="text-5xl">🏆</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Attended on {new Date(event.date).toLocaleDateString()}
                        </p>
                        <button className="bg-festival-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-festival-tangerine transition">
                          Download Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Certificates Yet</h3>
                <p className="text-gray-600">Certificates will be available after event completion</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
