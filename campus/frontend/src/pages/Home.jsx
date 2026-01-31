import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/eventsFullData';

export default function Home() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const aboutImages = ['/images/srit_banner.jpg', '/images/srit_1.jpg', '/images/srit_2.jpg', '/images/srit_3.jpg', '/images/srit_4.jpg'];

  const nextSlide = () => setSlideIndex((i) => (i + 1) % aboutImages.length);
  const prevSlide = () => setSlideIndex((i) => (i - 1 + aboutImages.length) % aboutImages.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Contact Bar */}
      <div className="bg-primary text-white py-2 px-4">
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

      {/* Header/Logo Section - ALIGNED */}
      <header className="bg-white border-b-4 border-primary py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Campus Logo"
              className="h-32 w-auto"
              onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
            />
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-gray-100 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 flex-wrap">
              <a href="/" className="py-3 text-gray-700 hover:text-primary-dark hover:border-b-2 hover:border-primary">Home</a>
              <a href="#about" className="py-3 text-gray-700 hover:text-primary-dark hover:border-b-2 hover:border-primary">About</a>
              <a href="#features" className="py-3 text-gray-700 hover:text-primary-dark hover:border-b-2 hover:border-primary">Features</a>
              <a href="/events" className="py-3 text-gray-700 hover:text-primary-dark hover:border-b-2 hover:border-primary">Events</a>
              <a href="/my-events" className="py-3 text-gray-700 hover:text-primary-dark hover:border-b-2 hover:border-primary">My Events</a>
              <a href="#contact" className="py-3 text-gray-700 hover:text-primary-dark hover:border-b-2 hover:border-primary">Contact</a>
            </div>
        </div>
      </nav>

      {/* Banner Section */}
<section className="bg-primary text-white py-4 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="scrolling-container">
      <div className="scrolling-text text-xl font-semibold">
        <span className="px-10">📢 Campus Events Portal</span>
        <span className="px-10">📅 Browse upcoming events and register easily</span>
        <span className="px-10">🫸 Don't miss out! Register for upcoming technical workshops and cultural fests today</span>
        <span className="px-10">🎓 Empowering rural talent with world-class opportunities. View our placement achievements</span>
        <span className="px-10">🏫 From Code to Culture: There's a place for every passion at SRIT.</span>
      </div>
    </div>
  </div>
</section>

      {/* Hero Image Section - ALIGNED */}
      <section className="bg-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src="/images/clg.png"
              alt="Educational Institution"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/images/clg.png'; }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About SRIT Section */}
        <section id="about" className="mb-16 bg-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">About SRIT</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to SRIT</h2>
              <p className="text-gray-700 mb-4">
                Founded with a vision for rural empowerment and academic excellence, SRIT has been
                nurturing talent since its establishment. Our founders envisioned an institution
                that combines strong values with modern education to uplift communities and prepare
                students for leadership and service.
              </p>
              <p className="text-gray-700 mb-4">
                We are committed to holistic development, high-quality teaching, and industry-aligned
                programs. Our legacy includes national certifications, notable rankings, and
                partnerships that strengthen learning outcomes for our students.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/about')}
                  className="bg-white border border-primary text-primary font-semibold px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Read More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg shadow-sm border border-primary/10">
                <img
                  src={aboutImages[slideIndex]}
                  alt={`SRIT highlight ${slideIndex + 1}`}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  onError={(e) => { e.currentTarget.src = '/images/clg.png'; }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-2 flex items-center justify-between px-4">
                <button onClick={prevSlide} aria-label="Previous" className="bg-white/90 text-primary rounded-full p-2 shadow">‹</button>
                <div className="space-x-2">
                  {aboutImages.map((_, idx) => (
                    <button key={idx} onClick={() => setSlideIndex(idx)} className={`w-2 h-2 rounded-full ${idx === slideIndex ? 'bg-primary' : 'bg-white/70'} inline-block`} />
                  ))}
                </div>
                <button onClick={nextSlide} aria-label="Next" className="bg-white/90 text-primary rounded-full p-2 shadow">›</button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 border border-primary/10">
              <div className="text-3xl font-bold text-primary">3K+</div>
              <div><p className="text-sm text-gray-600">Students</p><p className="text-xs text-gray-500">Enrolled across programs</p></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 border border-primary/10">
              <div className="text-3xl font-bold text-primary">80%+</div>
              <div><p className="text-sm text-gray-600">Placements</p><p className="text-xs text-gray-500">Successful placement rate</p></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 border border-primary/10">
              <div className="text-3xl font-bold text-primary">90%</div>
              <div><p className="text-sm text-gray-600">Graduates</p><p className="text-xs text-gray-500">Career-ready alumni</p></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Event Management</h3>
              <p className="text-gray-600">Create and manage events, schedules, and participant lists with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics & Insights</h3>
              <p className="text-gray-600">Dashboards with attendee trends and event performance metrics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Generate Reports</h3>
              <p className="text-gray-600">Export event summaries and participant lists for records and sharing.</p>
            </div>
          </div>
        </section>
        </div>

        {/* Chatbot Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">💬 Need Help?</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Our AI-powered FAQ Chatbot is available 24/7 to answer your questions about admissions, events, exams, counseling, and more.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <ul className="space-y-4 text-gray-700 mb-6">
                  <li className="flex items-start gap-3"><span className="text-orange-600 text-xl">✓</span><span>Instant answers to common questions</span></li>
                  <li className="flex items-start gap-3"><span className="text-orange-600 text-xl">📚</span><span>Browse FAQs by category</span></li>
                  <li className="flex items-start gap-3"><span className="text-orange-600 text-xl">⚡</span><span>Available on every page</span></li>
                  <li className="flex items-start gap-3"><span className="text-orange-600 text-xl">🔒</span><span>No registration required</span></li>
                </ul>
                <button onClick={() => navigate('/chatbot')} className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">Open Chatbot →</button>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">24/7 Assistant</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 font-semibold text-orange-600">📚 Admissions</div>
                  <div className="bg-white rounded p-3 font-semibold text-orange-600">🎉 Events</div>
                  <div className="bg-white rounded p-3 font-semibold text-orange-600">📝 Exams</div>
                  <div className="bg-white rounded p-3 font-semibold text-orange-600">💬 Counseling</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">👥 Alumni Success Stories</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Inspiring journeys from our talented graduates making an impact globally</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="text-4xl mb-3">🎓</div>
                <p className="text-3xl font-bold text-orange-600 mb-2">8+</p>
                <p className="text-gray-600 font-semibold">Profiles Showcased</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="text-4xl mb-3">🌍</div>
                <p className="text-3xl font-bold text-orange-600 mb-2">4+</p>
                <p className="text-gray-600 font-semibold">Countries Represented</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-3xl font-bold text-orange-600 mb-2">FAANG</p>
                <p className="text-gray-600 font-semibold">Top Companies</p>
              </div>
            </div>
            <div className="text-center">
              <button onClick={() => navigate('/alumni')} className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">Explore Alumni Network →</button>
            </div>
          </div>
        </section>

        {/* Placement Cell Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">📊 Placement Cell</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Your gateway to top companies and long-term career success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-5">Why Choose Our Placement Cell?</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3"><span>🏢</span><span>Partnerships with 50+ reputed companies</span></li>
                  <li className="flex items-start gap-3"><span>💰</span><span>Average package ranging from 12–22 LPA</span></li>
                  <li className="flex items-start gap-3"><span>📈</span><span>Consistent 95%+ placement success rate</span></li>
                  <li className="flex items-start gap-3"><span>🎓</span><span>Internship and pre-placement offers</span></li>
                  <li className="flex items-start gap-3"><span>🌍</span><span>Domestic and international opportunities</span></li>
                </ul>
                <button onClick={() => navigate('/placement')} className="mt-8 bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">Explore Placements →</button>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><p className="text-3xl font-bold text-orange-600">50+</p><p className="mt-1 text-gray-600">Recruiting Companies</p></div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><p className="text-3xl font-bold text-orange-600">500+</p><p className="mt-1 text-gray-600">Students Placed</p></div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><p className="text-3xl font-bold text-orange-600">22 LPA</p><p className="mt-1 text-gray-600">Highest Package</p></div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><p className="text-3xl font-bold text-orange-600">95%+</p><p className="mt-1 text-gray-600">Success Rate</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics & Achievements Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">📊 Analytics & Achievements</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Celebrating institutional excellence and transparent performance metrics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><div className="text-4xl mb-2">🏆</div><p className="text-2xl font-bold text-orange-600">7</p><p className="mt-1 text-gray-600">National Rankings</p></div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><div className="text-4xl mb-2">🌍</div><p className="text-2xl font-bold text-orange-600">3</p><p className="mt-1 text-gray-600">International Rankings</p></div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><div className="text-4xl mb-2">🏅</div><p className="text-2xl font-bold text-orange-600">14</p><p className="mt-1 text-gray-600">Major Awards</p></div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6"><div className="text-4xl mb-2">⭐</div><p className="text-2xl font-bold text-orange-600">10</p><p className="mt-1 text-gray-600">Key Achievements</p></div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-5">Why Review Our Analytics?</h3>
                <ul className="space-y-4 text-gray-700 mb-6">
                  <li className="flex items-start gap-3"><span>🏆</span><span>Comprehensive rankings from top agencies</span></li>
                  <li className="flex items-start gap-3"><span>🎓</span><span>Student, faculty, and institutional awards</span></li>
                  <li className="flex items-start gap-3"><span>📈</span><span>Continuous improvement in key metrics</span></li>
                  <li className="flex items-start gap-3"><span>📰</span><span>Featured in major national media</span></li>
                  <li className="flex items-start gap-3"><span>📄</span><span>Downloadable annual reports & credentials</span></li>
                </ul>
                <button onClick={() => navigate('/analytics')} className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">Explore Analytics →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Clubs & Societies Section */}
        <section className="mb-16 bg-white rounded-lg p-8 border border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-primary mb-4">🎭 Clubs & Societies</h2>
              <p className="text-xl text-gray-700">Join 12+ active clubs across technical, cultural, and sports domains</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div onClick={() => navigate('/clubs/technical')} className="bg-orange-50 border border-orange-200 rounded-xl p-6  border-primary/10 hover:shadow-md transition cursor-pointer">
                  <div className="text-5xl mb-3 text-primary">🔧</div>
                  <p className="text-2xl font-bold text-primary mb-1">4</p><p className="text-gray-700 font-semibold text-sm">Technical Clubs</p>
                </div>
                <div onClick={() => navigate('/clubs/cultural')} className="bg-orange-50 border border-orange-200 rounded-xl p-6  border-primary/10 hover:shadow-md transition cursor-pointer">
                  <div className="text-5xl mb-3 text-primary">🎭</div>
                  <p className="text-2xl font-bold text-primary mb-1">4</p><p className="text-gray-700 font-semibold text-sm">Cultural Groups</p>
                </div>
                <div onClick={() => navigate('/clubs/sports')} className="bg-orange-50 border border-orange-200 rounded-xl p-6  border-primary/10 hover:shadow-md transition cursor-pointer">
                  <div className="text-5xl mb-3 text-primary">⚽</div>
                  <p className="text-2xl font-bold text-primary mb-1">4</p><p className="text-gray-700 font-semibold text-sm">Sports Teams</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6  border-primary/10 hover:shadow-md transition cursor-pointer"><div className="text-5xl mb-3 text-primary">👥</div><p className="text-2xl font-bold text-primary mb-1">1K+</p><p className="text-gray-700 font-semibold text-sm">Active Members</p></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Join Our Clubs?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>🎯 Develop skills in diverse fields</li>
                  <li>🤝 Network with like-minded students</li>
                  <li>🏆 Participate in competitions & events</li>
                  <li>⭐ Earn achievements and recognition</li>
                  <li>🌟 Enhance your resume & profile</li>
                </ul>
                <button onClick={() => navigate('/clubs')} className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:shadow-lg transition mt-6">Explore Clubs →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
              <button onClick={() => navigate('/events')} className="text-red-600 font-semibold hover:text-red-700 transition-colors">View All Events →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventsData.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} compact={true} />
              ))}
            </div>
          </div>
        </section>

        
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div><h4 className="text-xl font-bold mb-4">Campus Portal</h4><p className="text-gray-400">Events and campus services for students, faculty, and staff.</p></div>
            <div><h4 className="text-xl font-bold mb-4">Quick Links</h4><ul className="space-y-2 text-gray-400"><li>About Us</li><li>Features</li><li>Pricing</li><li>Support</li></ul></div>
            <div><h4 className="text-xl font-bold mb-4">Contact</h4><p className="text-gray-400">Email: support@campusportal.example</p><p className="text-gray-400">Address: Tech Campus, India</p></div>
            <div><h4 className="text-xl font-bold mb-4">Follow Us</h4><p className="text-gray-400">Facebook • Twitter • LinkedIn • Instagram</p></div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Campus Portal. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}