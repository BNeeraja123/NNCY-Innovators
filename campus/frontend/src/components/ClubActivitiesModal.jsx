import React, { useState, useEffect } from 'react';

const ClubActivitiesModal = ({ isOpen, onClose, clubName = '', currentActivities = [], loading = false, onUpdateActivities }) => {
  const [activities, setActivities] = useState([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'event', // event, workshop, competition, social
    participants: '',
    photos: ''
  });
  const [selectedTab, setSelectedTab] = useState('events'); // events or gallery

  useEffect(() => {
    if (Array.isArray(currentActivities)) {
      setActivities(currentActivities);
    } else {
      setActivities([]);
    }
  }, [currentActivities, isOpen]);

  const handleAddActivity = () => {
    if (newActivity.title.trim() && newActivity.date) {
      const activity = {
        id: Date.now(),
        title: newActivity.title.trim(),
        date: newActivity.date,
        description: newActivity.description.trim(),
        type: newActivity.type,
        participants: parseInt(newActivity.participants) || 0,
        photos: newActivity.photos ? newActivity.photos.split(',').map(p => p.trim()) : [],
        createdAt: new Date().toLocaleDateString()
      };
      setActivities([...activities, activity]);
      setNewActivity({
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'event',
        participants: '',
        photos: ''
      });
      setShowAddActivity(false);
    }
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  const handleSaveActivities = () => {
    onUpdateActivities?.(activities);
    onClose();
  };

  const events = activities.filter(a => ['event', 'workshop', 'competition'].includes(a.type));
  const gallery = activities.filter(a => a.type === 'social' || a.photos?.length > 0);

  const typeLabels = {
    event: '📅 Event',
    workshop: '📚 Workshop',
    competition: '🏆 Competition',
    social: '📸 Photo Update'
  };

  const stats = {
    totalActivities: activities.length,
    events: events.length,
    photos: activities.reduce((sum, a) => sum + (a.photos?.length || 0), 0)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            🎬 Activities & Gallery - {clubName}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.totalActivities}</p>
              <p className="text-sm text-gray-600">Total Activities</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.events}</p>
              <p className="text-sm text-gray-600">Events</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{stats.photos}</p>
              <p className="text-sm text-gray-600">Photos</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setSelectedTab('events')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                selectedTab === 'events'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              📅 Events & Workshops
            </button>
            <button
              onClick={() => setSelectedTab('gallery')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                selectedTab === 'gallery'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              📸 Photo Gallery
            </button>
          </div>

          {/* Add Activity Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <button
              onClick={() => setShowAddActivity(!showAddActivity)}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {showAddActivity ? '✕ Cancel' : '+ Add Activity'}
            </button>

            {showAddActivity && (
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      placeholder="e.g., Annual Tech Fest 2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Type *
                      </label>
                      <select
                        value={newActivity.type}
                        onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="event">Event</option>
                        <option value="workshop">Workshop</option>
                        <option value="competition">Competition</option>
                        <option value="social">Photo Update</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={newActivity.date}
                        onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* Participants */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Participants
                      </label>
                      <input
                        type="number"
                        value={newActivity.participants}
                        onChange={(e) => setNewActivity({...newActivity, participants: e.target.value})}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                      placeholder="Enter activity details"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Photos */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Photo Links (comma-separated URLs)
                    </label>
                    <textarea
                      value={newActivity.photos}
                      onChange={(e) => setNewActivity({...newActivity, photos: e.target.value})}
                      placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    onClick={handleAddActivity}
                    disabled={!newActivity.title.trim()}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
                  >
                    Add Activity
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Activities List */}
          <div className="space-y-3 mb-6">
            {selectedTab === 'events' ? (
              events.length > 0 ? (
                events.map(activity => (
                  <div
                    key={activity.id}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{typeLabels[activity.type]}</span>
                          <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          📅 {activity.date} • 👥 {activity.participants} participants
                        </p>
                        {activity.description && (
                          <p className="text-sm text-gray-700 mt-2">{activity.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-semibold text-sm ml-4"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No events recorded yet</p>
                </div>
              )
            ) : (
              gallery.length > 0 ? (
                gallery.map(activity => (
                  <div
                    key={activity.id}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">📸</span>
                          <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{activity.date}</p>
                        {activity.description && (
                          <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                        )}
                        {activity.photos && activity.photos.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {activity.photos.map((photo, idx) => (
                              <a
                                key={idx}
                                href={photo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800 truncate"
                                title={photo}
                              >
                                Photo {idx + 1}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-semibold text-sm ml-4"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No photos in gallery yet</p>
                </div>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Close
            </button>
            <button
              onClick={handleSaveActivities}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubActivitiesModal;
