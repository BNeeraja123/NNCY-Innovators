import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventGallery, eventsData } from '../data/eventsFullData';

export default function EventGallery() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFilter, setImageFilter] = useState('all'); // all, winner, memory

  const filteredGallery = selectedEvent === 'all'
    ? eventGallery
    : eventGallery.filter(item => item.eventId === parseInt(selectedEvent));

  const finalFiltered = imageFilter === 'all'
    ? filteredGallery
    : filteredGallery.filter(item => item.type === imageFilter);

  // Group images by type
  const winnerImages = finalFiltered.filter(img => img.type === 'winner');
  const memoryImages = finalFiltered.filter(img => img.type === 'memory');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-festival-magenta via-festival-orange to-festival-green text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:text-gray-200 transition flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-2">🎉 Event Gallery</h1>
          <p className="text-xl text-white/90">Memories from our amazing events - Winners & Celebrations</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Filter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Filter by Event</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-festival-orange transition"
            >
              <option value="all">All Events</option>
              {eventsData.map((event) => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>

          {/* Image Type Filter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Filter by Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setImageFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  imageFilter === 'all'
                    ? 'bg-festival-orange text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Photos
              </button>
              <button
                onClick={() => setImageFilter('winner')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  imageFilter === 'winner'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🏆 Winners
              </button>
              <button
                onClick={() => setImageFilter('memory')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  imageFilter === 'memory'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📸 Memories
              </button>
            </div>
          </div>
        </div>

        {finalFiltered.length > 0 ? (
          <div>
            {/* Winners Section */}
            {winnerImages.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">🏆 Winners</h2>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                    {winnerImages.length} photos
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {winnerImages.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                          🏆 Winner
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-semibold">{item.title}</p>
                          <p className="text-white/80 text-sm mt-1">{item.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memories Section */}
            {memoryImages.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">📸 Event Memories</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {memoryImages.length} photos
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {memoryImages.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-semibold text-sm">{item.title}</p>
                          <p className="text-white/80 text-xs mt-1">{item.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Photos Found</h3>
            <p className="text-gray-600">
              {selectedEvent === 'all' ? 'Gallery photos will appear here after events' : 'No photos available for this event'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            
            {/* Navigation buttons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = finalFiltered.findIndex(img => img.id === selectedImage.id);
                  if (currentIndex > 0) {
                    setSelectedImage(finalFiltered[currentIndex - 1]);
                  }
                }}
                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              >
                ‹
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = finalFiltered.findIndex(img => img.id === selectedImage.id);
                  if (currentIndex < finalFiltered.length - 1) {
                    setSelectedImage(finalFiltered[currentIndex + 1]);
                  }
                }}
                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              >
                ›
              </button>
            </div>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full rounded-lg"
            />
            <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-lg">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                {selectedImage.type === 'winner' && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🏆 Winner
                  </span>
                )}
              </div>
              <p className="text-white/90">{selectedImage.caption}</p>
              <p className="text-white/70 text-sm mt-3">
                Event: {eventsData.find(e => e.id === selectedImage.eventId)?.title || 'Unknown Event'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
