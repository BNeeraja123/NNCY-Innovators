/**
 * Club Detail Page
 * Comprehensive view of a single club with all details
 */

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CoordinatorCard,
  AchievementCard,
  EventCard,
  GalleryCard,
  StatsCard
} from '../components/ClubCards';
import { getClubDashboardData } from '../utils/clubsLogic';

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const clubData = useMemo(() => getClubDashboardData(clubId), [clubId]);

  if (!clubData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Club Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The club you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/clubs')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            ← Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  const categoryColors = {
    technical: 'from-blue-600 to-blue-700 border-blue-500',
    cultural: 'from-magenta-600 to-pink-600 border-magenta-500',
    sports: 'from-orange-600 to-yellow-600 border-orange-500'
  };

  const categoryBgColors = {
    technical: 'bg-blue-50 dark:bg-blue-900/20',
    cultural: 'bg-magenta-50 dark:bg-magenta-900/20',
    sports: 'bg-orange-50 dark:bg-orange-900/20'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 pb-12">
      {/* Header with Hero Image */}
      <div className={`bg-gradient-to-r ${categoryColors[clubData.category]} text-white py-12 px-6 border-b-4 ${categoryColors[clubData.category].split(' ').pop()}`}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/clubs')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-all"
          >
            ← Back to Clubs
          </button>
          <div className="flex items-center gap-6">
            <div className="text-7xl">{clubData.logo}</div>
            <div>
              <p className="text-white/80 text-sm uppercase tracking-wide mb-2">{clubData.type}</p>
              <h1 className="text-5xl font-bold mb-2">{clubData.name}</h1>
              <p className="text-lg text-white/90">Founded in {clubData.founded}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard icon="👥" label="Members" value={clubData.memberCount} color={clubData.category === 'technical' ? 'blue' : clubData.category === 'cultural' ? 'magenta' : 'orange'} />
          <StatsCard icon="🏆" label="Achievements" value={clubData.achievements.length} color={clubData.category === 'technical' ? 'blue' : clubData.category === 'cultural' ? 'magenta' : 'orange'} />
          <StatsCard icon="📅" label="Events" value={clubData.events.length} color={clubData.category === 'technical' ? 'blue' : clubData.category === 'cultural' ? 'magenta' : 'orange'} />
          <StatsCard icon="📸" label="Gallery" value={clubData.gallery.length} color={clubData.category === 'technical' ? 'blue' : clubData.category === 'cultural' ? 'magenta' : 'orange'} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className={`rounded-lg p-8 border-l-4 border-gray-300 ${categoryBgColors[clubData.category]} border border-gray-200 dark:border-gray-700`}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About {clubData.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{clubData.fullDescription}</p>
              <div className="flex flex-wrap gap-3">
                {clubData.focusAreas.map((area, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Meeting Schedule & Membership */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🗓️ Membership Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Meeting Schedule</h3>
                  <p className="text-lg text-gray-800 dark:text-white font-medium">{clubData.meetingSchedule}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Membership Fee</h3>
                  <p className="text-lg text-gray-800 dark:text-white font-medium">{clubData.membershipFee}</p>
                </div>
              </div>
              <a
                href={clubData.joinLink}
                className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Join {clubData.name}
              </a>
            </div>

            {/* Achievements Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏆 Achievements</h2>
              {clubData.achievements.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {clubData.achievements.map((achievement, idx) => (
                    <AchievementCard key={idx} achievement={achievement} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No achievements recorded yet.</p>
              )}
            </div>

            {/* Events Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📅 Past Events</h2>
              {clubData.events.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {clubData.events.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No events recorded yet.</p>
              )}
            </div>

            {/* Gallery Section */}
            {clubData.gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📸 Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {clubData.gallery.map((image, idx) => (
                    <GalleryCard key={idx} image={image} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Coordinators & Quick Info */}
          <div className="space-y-8">
            {/* Coordinators */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">👥 Coordinators</h2>
              {clubData.coordinators.length > 0 ? (
                <div className="space-y-4">
                  {clubData.coordinators.map((coordinator, idx) => (
                    <CoordinatorCard key={idx} coordinator={coordinator} showEmail={true} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No coordinators listed.</p>
              )}
            </div>

            {/* Quick Facts */}
            <div className={`rounded-lg p-8 border border-gray-200 dark:border-gray-700 ${categoryBgColors[clubData.category]}`}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">ℹ️ Quick Facts</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Category</p>
                  <p className="text-gray-800 dark:text-white font-medium capitalize">{clubData.category}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Type</p>
                  <p className="text-gray-800 dark:text-white font-medium">{clubData.type}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Founded Year</p>
                  <p className="text-gray-800 dark:text-white font-medium">{clubData.founded}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Current Members</p>
                  <p className="text-gray-800 dark:text-white font-medium">{clubData.memberCount}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Total Achievements</p>
                  <p className="text-gray-800 dark:text-white font-medium">{clubData.achievements.length}</p>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">📢 Share This Club</h3>
              <div className="flex gap-3 justify-center">
                <button className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all flex items-center justify-center">f</button>
                <button className="w-10 h-10 bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition-all flex items-center justify-center">𝕏</button>
                <button className="w-10 h-10 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all flex items-center justify-center">📷</button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Clubs Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔗 Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate(`/clubs?category=${clubData.category}`)}
              className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all text-left"
            >
              <p className="font-bold text-gray-800 dark:text-white">More in {clubData.category}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browse other clubs in this category</p>
            </button>
            <button
              onClick={() => navigate('/clubs')}
              className="p-4 bg-gradient-to-br from-magenta-50 to-magenta-100 dark:from-magenta-900/20 dark:to-magenta-900/10 rounded-lg border border-magenta-200 dark:border-magenta-800 hover:shadow-md transition-all text-left"
            >
              <p className="font-bold text-gray-800 dark:text-white">All Clubs</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">View complete clubs directory</p>
            </button>
            <button
              onClick={() => navigate('/clubs')}
              className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all text-left"
            >
              <p className="font-bold text-gray-800 dark:text-white">Contact Us</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get in touch with club coordinators</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailPage;
