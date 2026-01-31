import React, { useState, useEffect } from 'react';

const ClubAnnouncementsModal = ({ isOpen, onClose, clubName = '', currentAnnouncements = [], currentAchievements = [], loading = false, onUpdate }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [selectedTab, setSelectedTab] = useState('announcements');
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    content: '',
    year: new Date().getFullYear().toString()
  });

  useEffect(() => {
    setAnnouncements(Array.isArray(currentAnnouncements) ? currentAnnouncements : []);
    setAchievements(Array.isArray(currentAchievements) ? currentAchievements : []);
  }, [currentAnnouncements, currentAchievements, isOpen]);

  const handleAddAnnouncement = () => {
    if (newItem.title.trim() && newItem.content.trim()) {
      const announcement = {
        id: Date.now(),
        title: newItem.title.trim(),
        content: newItem.content.trim(),
        date: new Date().toLocaleDateString(),
        pinned: false
      };
      setAnnouncements([announcement, ...announcements]);
      setNewItem({ title: '', content: '', year: new Date().getFullYear().toString() });
      setShowAddItem(false);
    }
  };

  const handleAddAchievement = () => {
    if (newItem.title.trim() && newItem.content.trim() && newItem.year) {
      const achievement = {
        id: Date.now(),
        title: newItem.title.trim(),
        description: newItem.content.trim(),
        year: parseInt(newItem.year),
        category: 'award' // award, recognition, milestone
      };
      setAchievements([achievement, ...achievements]);
      setNewItem({ title: '', content: '', year: new Date().getFullYear().toString() });
      setShowAddItem(false);
    }
  };

  const handleDeleteItem = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'announcement') {
        setAnnouncements(announcements.filter(a => a.id !== id));
      } else {
        setAchievements(achievements.filter(a => a.id !== id));
      }
    }
  };

  const handleTogglePinned = (id) => {
    setAnnouncements(announcements.map(a =>
      a.id === id ? { ...a, pinned: !a.pinned } : a
    ));
  };

  const handleSaveUpdates = () => {
    onUpdate?.({
      announcements,
      achievements
    });
    onClose();
  };

  const pinnedAnnouncements = announcements.filter(a => a.pinned);
  const regularAnnouncements = announcements.filter(a => !a.pinned);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            📢 Announcements & Achievements - {clubName}
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
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-orange-600">{announcements.length}</p>
              <p className="text-sm text-gray-600">Announcements</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-purple-600">{achievements.length}</p>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => { setSelectedTab('announcements'); setShowAddItem(false); }}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                selectedTab === 'announcements'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              📢 Announcements
            </button>
            <button
              onClick={() => { setSelectedTab('achievements'); setShowAddItem(false); }}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                selectedTab === 'achievements'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              🏆 Achievements
            </button>
          </div>

          {/* Add Item Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <button
              onClick={() => setShowAddItem(!showAddItem)}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {showAddItem ? '✕ Cancel' : `+ Add ${selectedTab === 'announcements' ? 'Announcement' : 'Achievement'}`}
            </button>

            {showAddItem && (
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {selectedTab === 'announcements' ? 'Announcement Title' : 'Achievement Title'} *
                    </label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      placeholder={selectedTab === 'announcements' ? 'e.g., Club Recruitment Open' : 'e.g., Won Best Club Award'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {selectedTab === 'achievements' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Year *
                      </label>
                      <input
                        type="number"
                        min="2000"
                        max="2100"
                        value={newItem.year}
                        onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  {/* Content/Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {selectedTab === 'announcements' ? 'Announcement Content' : 'Description'} *
                    </label>
                    <textarea
                      value={newItem.content}
                      onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                      placeholder="Enter details here..."
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    onClick={selectedTab === 'announcements' ? handleAddAnnouncement : handleAddAchievement}
                    disabled={!newItem.title.trim() || !newItem.content.trim()}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
                  >
                    Add {selectedTab === 'announcements' ? 'Announcement' : 'Achievement'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Display */}
          {selectedTab === 'announcements' ? (
            <div className="space-y-3 mb-6">
              {/* Pinned Announcements */}
              {pinnedAnnouncements.length > 0 && (
                <>
                  <h3 className="font-semibold text-gray-700 px-2">📌 Pinned</h3>
                  {pinnedAnnouncements.map(announcement => (
                    <div
                      key={announcement.id}
                      className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{announcement.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleTogglePinned(announcement.id)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
                            title="Unpin"
                          >
                            📌
                          </button>
                          <button
                            onClick={() => handleDeleteItem(announcement.id, 'announcement')}
                            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700">{announcement.content}</p>
                    </div>
                  ))}
                </>
              )}

              {/* Regular Announcements */}
              {regularAnnouncements.length > 0 && (
                <>
                  {pinnedAnnouncements.length > 0 && <h3 className="font-semibold text-gray-700 px-2 mt-4">📋 Recent</h3>}
                  {regularAnnouncements.map(announcement => (
                    <div
                      key={announcement.id}
                      className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{announcement.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleTogglePinned(announcement.id)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
                            title="Pin"
                          >
                            📍
                          </button>
                          <button
                            onClick={() => handleDeleteItem(announcement.id, 'announcement')}
                            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700">{announcement.content}</p>
                    </div>
                  ))}
                </>
              )}

              {announcements.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No announcements yet</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {achievements.length > 0 ? (
                achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">🏆</span>
                          <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Year: {achievement.year}</p>
                        <p className="text-gray-700">{achievement.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(achievement.id, 'achievement')}
                        className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm ml-4"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No achievements yet</p>
                </div>
              )}
            </div>
          )}

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
              onClick={handleSaveUpdates}
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

export default ClubAnnouncementsModal;
