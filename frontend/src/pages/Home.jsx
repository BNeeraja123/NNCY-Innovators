import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/eventsFullData';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Contact Bar */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex space-x-6">
            <a href="tel:+919515011111" className="hover:text-gray-200">📞 91-951 501 1111</a>
            <a href="mailto:hr@srit.ac.in" className="hover:text-gray-200">📧 hr@srit.ac.in</a>
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-gray-200">Faculty Login</button>
            <button className="hover:text-gray-200">Student Login</button>
            <button className="hover:text-gray-200">Alumni</button>
          </div>
        </div>
      </div>

      {/* Header/Logo Section */}
      <header className="bg-white border-b-4 border-red-600 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/images/logo.png" 
              alt="Campus Logo"
              className="h-32 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-gray-100 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 flex-wrap">
            <a href="/" className="py-3 text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600">Home</a>
            <a href="#about" className="py-3 text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600">About</a>
            <a href="#features" className="py-3 text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600">Features</a>
            <a href="/events" className="py-3 text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600">Events</a>
            <a href="/my-events" className="py-3 text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600">My Events</a>
            <a href="#contact" className="py-3 text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Banner Section */}
      <section className="bg-red-600 text-white py-4 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="scrolling-text text-xl font-semibold">
            📢 Campus Events Portal • 📅 Browse upcoming events and register easily
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="bg-gray-200 h-96 flex items-center justify-center overflow-hidden">
        <img 
          src="/images/clg.png" 
          alt="Educational Institution"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Quick Access removed per request */}

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Event Management</h3>
              <p className="text-gray-600">Create and manage events, schedules, and participant lists with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics & Insights</h3>
              <p className="text-gray-600">Dashboards with attendee trends and event performance metrics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Generate Reports</h3>
              <p className="text-gray-600">Export event summaries and participant lists for records and sharing.</p>
            </div>
          </div>
        </section>

        {/* FAQ Chatbot Section */}
        <section className="mb-16 bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue rounded-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">💬 Need Help?</h2>
              <p className="text-lg mb-4 text-white/90">
                Our AI-powered FAQ Chatbot is available 24/7 to answer your questions about admissions, events, exams, counseling, and more.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Instant answers to common questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Browse FAQs by category</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Available on every page</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>No registration required</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/chatbot')}
                className="bg-white text-festival-magenta font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
              >
                Learn More About the Chatbot →
              </button>
            </div>
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Assistant</h3>
              <p className="text-gray-600 mb-6">
                Our chatbot handles questions about:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-semibold text-festival-blue">📚 Admissions</p>
                </div>
                <div className="bg-pink-50 p-4 rounded">
                  <p className="font-semibold text-festival-magenta">🎉 Events</p>
                </div>
                <div className="bg-orange-50 p-4 rounded">
                  <p className="font-semibold text-festival-orange">📝 Exams</p>
                </div>
                <div className="bg-teal-50 p-4 rounded">
                  <p className="font-semibold text-festival-cyan">💬 Counseling</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                👉 Click the chat button on the bottom right to get started!
              </p>
            </div>
          </div>
        </section>

        {/* Alumni Success Stories Section */}
        <section className="mb-16 bg-gradient-to-r from-festival-cyan to-festival-blue rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">👥 Alumni Success Stories</h2>
            <p className="text-xl text-white/90">Inspiring journeys from our talented graduates making an impact globally</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl mb-4">🎓</div>
              <p className="text-3xl font-bold text-festival-blue mb-2">8+</p>
              <p className="text-gray-600 font-semibold">Profiles Showcased</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl mb-4">🌍</div>
              <p className="text-3xl font-bold text-festival-magenta mb-2">4+</p>
              <p className="text-gray-600 font-semibold">Countries Represented</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl mb-4">⭐</div>
              <p className="text-3xl font-bold text-festival-cyan mb-2">FAANG</p>
              <p className="text-gray-600 font-semibold">Top Companies</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/alumni')}
              className="bg-white text-festival-blue font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Explore Alumni Network →
            </button>
          </div>
        </section>

        {/* Placement Cell Section */}
        <section className="mb-16 bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">📊 Placement Cell</h2>
            <p className="text-xl text-white/90">Your gateway to top companies and career success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Placement Cell?</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <span>Partnerships with 50+ leading companies</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span>Average package: 12-22 LPA</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <span>95%+ placement success rate</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <span>Internship opportunities available</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <span>Both domestic and international placements</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/placement')}
                className="bg-white text-festival-orange font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 mt-6"
              >
                Explore Placements →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-5xl mb-3">🏢</div>
                <p className="text-2xl font-bold text-festival-orange mb-1">50+</p>
                <p className="text-gray-600 font-semibold text-sm">Recruiting Companies</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-5xl mb-3">👨‍💼</div>
                <p className="text-2xl font-bold text-festival-magenta mb-1">500+</p>
                <p className="text-gray-600 font-semibold text-sm">Students Placed</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-5xl mb-3">💰</div>
                <p className="text-2xl font-bold text-green-600 mb-1">22 LPA</p>
                <p className="text-gray-600 font-semibold text-sm">Highest Package</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-5xl mb-3">📈</div>
                <p className="text-2xl font-bold text-festival-blue mb-1">95%+</p>
                <p className="text-gray-600 font-semibold text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics & Achievements Section */}
        <section className="mb-16 bg-gradient-to-r from-festival-blue via-festival-cyan to-festival-magenta rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">📊 Analytics & Achievements</h2>
            <p className="text-xl text-white/90">Celebrating institutional excellence and transparency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-5xl mb-3">🏆</div>
                  <p className="text-2xl font-bold text-festival-blue mb-1">7</p>
                  <p className="text-gray-600 font-semibold text-sm">National Rankings</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-5xl mb-3">🌍</div>
                  <p className="text-2xl font-bold text-festival-cyan mb-1">3</p>
                  <p className="text-gray-600 font-semibold text-sm">International Rankings</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-5xl mb-3">🏅</div>
                  <p className="text-2xl font-bold text-festival-magenta mb-1">14</p>
                  <p className="text-gray-600 font-semibold text-sm">Major Awards</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-5xl mb-3">⭐</div>
                  <p className="text-2xl font-bold text-festival-orange mb-1">10</p>
                  <p className="text-gray-600 font-semibold text-sm">Key Achievements</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-white mb-4">Why Review Our Analytics?</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <span>Comprehensive rankings from top agencies</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <span>Student, faculty, and institutional awards</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <span>Continuous improvement in key metrics</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📰</span>
                  <span>Featured in major national media</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <span>Downloadable annual reports & credentials</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/analytics')}
                className="bg-white text-festival-blue font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 mt-6"
              >
                Explore Analytics →
              </button>
            </div>
          </div>
        </section>

        {/* Clubs & Societies Section */}
        <section className="mb-16 bg-gradient-to-r from-blue-600 via-cyan-500 to-magenta-600 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">🎭 Clubs & Societies</h2>
            <p className="text-xl text-white/90">Join 12+ active clubs across technical, cultural, and sports domains</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer" onClick={() => navigate('/clubs/technical')}>
                <div className="text-5xl mb-3">🔧</div>
                <p className="text-2xl font-bold text-blue-600 mb-1">4</p>
                <p className="text-gray-600 font-semibold text-sm">Technical Clubs</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer" onClick={() => navigate('/clubs/cultural')}>
                <div className="text-5xl mb-3">🎭</div>
                <p className="text-2xl font-bold text-magenta-600 mb-1">4</p>
                <p className="text-gray-600 font-semibold text-sm">Cultural Groups</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer" onClick={() => navigate('/clubs/sports')}>
                <div className="text-5xl mb-3">⚽</div>
                <p className="text-2xl font-bold text-orange-600 mb-1">4</p>
                <p className="text-gray-600 font-semibold text-sm">Sports Teams</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-5xl mb-3">👥</div>
                <p className="text-2xl font-bold text-cyan-600 mb-1">1K+</p>
                <p className="text-gray-600 font-semibold text-sm">Active Members</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Why Join Our Clubs?</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Develop skills in diverse fields</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🤝</span>
                  <span>Network with like-minded students</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <span>Participate in competitions & events</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span>Earn achievements and recognition</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🌟</span>
                  <span>Enhance your resume & profile</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/clubs')}
                className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 mt-6"
              >
                Explore Clubs →
              </button>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
            <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
              View All Events →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventsData.slice(0, 4).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                compact={true}
              />
            ))}
          </div>
          
          {/* View All Events Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/events')}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:shadow-xl transition-all"
            >
              View All Events →
            </button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gray-50 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">System Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">1,250</div>
              <p className="text-gray-600">Total Students</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">45</div>
              <p className="text-gray-600">Active Classes</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">87.5%</div>
              <p className="text-gray-600">Avg Participation</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">24/7</div>
              <p className="text-gray-600">System Uptime</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-red-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-red-100">Choose your role and login to access your personalized dashboard</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Go to Login
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Campus Portal</h4>
              <p className="text-gray-400">Events and campus services for students, faculty, and staff.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-gray-400">Email: support@campusportal.example</p>
              <p className="text-gray-400">Phone: +1 (800) 123-4567</p>
              <p className="text-gray-400">Address: Tech Campus, India</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="block text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="block text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="block text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campus Portal. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
