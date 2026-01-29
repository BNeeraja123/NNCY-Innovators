import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlumniById } from '../utils/alumniLogic';

const AlumniProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alumni = getAlumniById(id);
  const [copied, setCopied] = useState(false);

  if (!alumni) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Alumni Not Found</h1>
          <button
            onClick={() => navigate('/alumni')}
            className="bg-festival-orange text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Back to Alumni Network
          </button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/alumni')}
            className="text-festival-orange hover:text-festival-magenta font-semibold flex items-center gap-2"
          >
            ← Back to Alumni
          </button>
        </div>
      </div>

      {/* Header with Image and Basic Info */}
      <section className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={alumni.image}
              alt={alumni.name}
              className="w-48 h-48 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-white flex-1">
              <h1 className="text-4xl font-bold mb-2">{alumni.name}</h1>
              <p className="text-2xl opacity-90">{alumni.role}</p>
              <p className="text-xl opacity-80 mb-4">{alumni.company}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  📍 {alumni.location}
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎓 {alumni.graduationYear}
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  ⏱️ {alumni.stats.yearsInIndustry} years experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Quick Info */}
          <div className="lg:col-span-1">
            {/* Domain Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Domain/Specialization</p>
                  <p className="text-lg text-festival-magenta font-bold mt-1">{alumni.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Company</p>
                  <p className="text-lg font-bold mt-1">{alumni.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Role</p>
                  <p className="text-lg font-bold mt-1">{alumni.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Location</p>
                  <p className="text-lg font-bold mt-1">{alumni.location}</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-festival-cyan to-blue-400 rounded-lg shadow p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Career Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Years in Industry</span>
                  <span className="text-2xl font-bold">{alumni.stats.yearsInIndustry}</span>
                </div>
                {alumni.stats.projectsLed && (
                  <div className="flex justify-between items-center">
                    <span>Projects Led</span>
                    <span className="text-2xl font-bold">{alumni.stats.projectsLed}</span>
                  </div>
                )}
                {alumni.stats.teamSize && (
                  <div className="flex justify-between items-center">
                    <span>Team Size</span>
                    <span className="text-2xl font-bold">{alumni.stats.teamSize}</span>
                  </div>
                )}
                {alumni.stats.productsLaunched && (
                  <div className="flex justify-between items-center">
                    <span>Products Launched</span>
                    <span className="text-2xl font-bold">{alumni.stats.productsLaunched}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${alumni.email}`}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <span>📧</span>
                  <span className="text-sm text-blue-600 truncate">{alumni.email}</span>
                </a>
                <a
                  href={`https://${alumni.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <span>💼</span>
                  <span className="text-sm text-blue-600 truncate">LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Testimonial */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Testimonial</h2>
              <div className="bg-gradient-to-r from-festival-orange to-festival-magenta bg-opacity-5 border-l-4 border-festival-orange p-6 rounded">
                <p className="text-lg text-gray-700 italic">"{alumni.testimonial}"</p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Achievements</h2>
              <div className="space-y-4">
                {alumni.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-festival-orange to-festival-magenta rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-gray-800">{achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Journey Timeline */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Journey</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-festival-orange text-white">
                      🎓
                    </div>
                  </div>
                  <div className="flex-1 pb-4 border-b border-gray-200">
                    <p className="font-bold text-gray-900">Graduation</p>
                    <p className="text-sm text-gray-600">Graduated in {alumni.graduationYear}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-festival-magenta text-white">
                      💼
                    </div>
                  </div>
                  <div className="flex-1 pb-4 border-b border-gray-200">
                    <p className="font-bold text-gray-900">Started Career</p>
                    <p className="text-sm text-gray-600">Began professional journey in {alumni.graduationYear + 1}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-festival-cyan text-white">
                      ⭐
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Current Position</p>
                    <p className="text-sm text-gray-600">{alumni.role} at {alumni.company}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {alumni.stats.yearsInIndustry} years of experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-festival-blue to-festival-cyan py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Connecting?</h2>
          <p className="text-white text-lg opacity-90 mb-8">
            Check out {alumni.name}'s profile on LinkedIn or send an email to learn more about their journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://${alumni.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-festival-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Visit LinkedIn Profile
            </a>
            <a
              href={`mailto:${alumni.email}`}
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-festival-blue transition"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlumniProfile;
