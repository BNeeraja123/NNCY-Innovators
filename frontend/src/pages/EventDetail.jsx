import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI, registrationAPI } from '../services/api';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    ticketType: '',
    registrationType: 'individual',
    teamName: '',
    participantNames: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await eventAPI.getById(id);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load event');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!registrationForm.ticketType) {
      alert('Please select a ticket type');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        eventId: event.id,
        ticketTypeId: registrationForm.ticketType,
        registrationType: registrationForm.registrationType,
        teamName: registrationForm.registrationType === 'team' ? registrationForm.teamName : null,
        participantNames: registrationForm.registrationType === 'team' ? registrationForm.participantNames : null
      };

      await registrationAPI.register(payload);
      alert('Registration successful!');
      setShowRegistrationModal(false);
      navigate('/my-events');
    } catch (err) {
      alert('Registration failed: ' + (err.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  const shareEvent = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Event URL copied to clipboard!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canRegister = event && event.status !== 'completed' && event.status !== 'cancelled';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-festival-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This event could not be loaded'}</p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-2 bg-festival-orange text-white rounded-lg hover:bg-festival-orange/90 transition"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: `url(${event.image || 'https://via.placeholder.com/1200x400'})`}}>
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${getStatusColor(event.status)}`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
              <p className="text-white/90">{event.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-900">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🕐</div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-gray-900">{event.time || 'TBA'}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <p className="text-sm text-gray-600">Venue</p>
                <p className="font-semibold text-gray-900">{event.venue}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">👥</div>
                <p className="text-sm text-gray-600">Capacity</p>
                <p className="font-semibold text-gray-900">{event.capacity}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Event</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>

            {/* Rules & Eligibility */}
            {event.rules && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rules & Eligibility</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{event.rules}</p>
                </div>
              </div>
            )}

            {/* Gallery Section for Completed Events */}
            {event.status === 'completed' && event.gallery && event.gallery.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                      <img 
                        src={img.image} 
                        alt={img.caption || 'Event photo'} 
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      />
                      {img.caption && (
                        <p className="text-xs text-gray-600 mt-2">{img.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Register Now</h3>
              
              {canRegister ? (
                <>
                  {event.tickets && event.tickets.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {event.tickets.map((ticket) => (
                        <div key={ticket.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{ticket.type}</h4>
                            {ticket.price > 0 ? (
                              <span className="font-bold text-festival-orange">₹{ticket.price}</span>
                            ) : (
                              <span className="font-bold text-green-600">Free</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {ticket.available} / {ticket.total} available
                          </p>
                          <button
                            onClick={() => {
                              setRegistrationForm({ ...registrationForm, ticketType: ticket.id });
                              setShowRegistrationModal(true);
                            }}
                            disabled={ticket.available === 0}
                            className="w-full px-4 py-2 bg-festival-orange text-white rounded-lg hover:bg-festival-orange/90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            {ticket.available > 0 ? 'Register' : 'Sold Out'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t pt-4">
                    {event.registrationDeadline && (
                      <p className="text-xs text-gray-600 mb-3">
                        Registration closes: {new Date(event.registrationDeadline).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      onClick={shareEvent}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
                    >
                      🔗 Share Event
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">Registration closed for this event</p>
                  <button
                    onClick={shareEvent}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Share Event
                  </button>
                </div>
              )}
            </div>

            {/* Organizer Info */}
            {event.coordinator && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Coordinator</h3>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-festival-orange to-festival-magenta rounded-full mx-auto mb-3"></div>
                  <h4 className="font-semibold text-gray-900">{event.coordinator}</h4>
                  {event.coordinatorEmail && (
                    <p className="text-sm text-gray-600 break-all">{event.coordinatorEmail}</p>
                  )}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="space-y-2">
              <button
                onClick={() => navigate('/events')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                ← Back to Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Register for Event</h3>
            
            <form onSubmit={handleRegistration} className="space-y-4">
              {/* Registration Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="regType"
                      value="individual"
                      checked={registrationForm.registrationType === 'individual'}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, registrationType: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Individual</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="regType"
                      value="team"
                      checked={registrationForm.registrationType === 'team'}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, registrationType: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Team</span>
                  </label>
                </div>
              </div>

              {/* Team Name (if team registration) */}
              {registrationForm.registrationType === 'team' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                  <input
                    type="text"
                    value={registrationForm.teamName}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, teamName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    placeholder="Enter team name"
                  />
                </div>
              )}

              {/* Participant Names (if team) */}
              {registrationForm.registrationType === 'team' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                  <textarea
                    value={registrationForm.participantNames}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, participantNames: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-festival-orange"
                    placeholder="Enter member names (one per line)"
                    rows="3"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-festival-orange text-white rounded-lg hover:bg-festival-orange/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Registering...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
