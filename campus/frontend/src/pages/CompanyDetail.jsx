import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../utils/placementLogic';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = getCompanyById(id);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Not Found</h1>
          <button
            onClick={() => navigate('/placement')}
            className="bg-festival-orange text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Back to Placement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/placement')}
            className="text-festival-orange hover:text-festival-magenta font-semibold flex items-center gap-2"
          >
            ← Back to Placement
          </button>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="text-7xl">🏢</div>
            <div className="text-white flex-1">
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-xl opacity-90">Recruiting Now!</p>
              <div className="mt-4 flex gap-4">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">📍 {company.location}</span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">📅 {company.visitYear}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Package Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Package Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Base Package</p>
                  <p className="text-2xl font-bold text-festival-magenta">{company.maxPackage}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 font-semibold">Minimum Package</p>
                  <p className="text-2xl font-bold text-festival-orange">{company.minPackage}</p>
                </div>
                {company.roles[0]?.internship && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 font-semibold">Internship Stipend</p>
                    <p className="text-2xl font-bold text-festival-cyan">{company.roles[0].internship}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${company.contactEmail}`}
                  className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm text-blue-600 font-semibold truncate">{company.contactEmail}</p>
                </a>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <p className="text-xs text-gray-600">Website</p>
                  <p className="text-sm text-blue-600 font-semibold truncate">{company.website}</p>
                </a>
              </div>
            </div>

            {/* Visit History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Visit History</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 font-semibold">{company.visitYear}</span>
                </div>
                {company.previousYears.map((year) => (
                  <div key={year} className="flex items-center gap-2">
                    <span className="text-blue-500 text-lg">✓</span>
                    <span className="text-gray-600">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Roles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Roles Available</h2>
              <div className="space-y-6">
                {company.roles.map((role, idx) => (
                  <div key={idx} className="border-l-4 border-festival-orange pl-4 pb-4 last:pb-0">
                    <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Full-time Package</p>
                        <p className="text-lg font-bold text-festival-magenta">{role.package}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Internship Stipend</p>
                        <p className="text-lg font-bold text-festival-cyan">{role.internship}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
              <div className="space-y-6">
                {/* CGPA */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">📊 CGPA Requirement</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600">{company.eligibility.minCGPA} and above</p>
                    <p className="text-sm text-gray-600 mt-1">Minimum CGPA required to be eligible</p>
                  </div>
                </div>

                {/* Branches */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🎓 Eligible Branches</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.eligibility.branches.map((branch) => (
                      <span
                        key={branch}
                        className="bg-gradient-to-r from-festival-orange to-festival-magenta text-white px-4 py-2 rounded-full font-semibold"
                      >
                        {branch}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Year of Passing */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">📅 Year of Passing</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.eligibility.yearOfPassing.map((year) => (
                      <span
                        key={year}
                        className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold"
                      >
                        {year}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backlogs */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">📋 Backlog Policy</h3>
                  <div className={`rounded-lg p-4 ${
                    company.eligibility.backlogAllowed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`text-lg font-bold ${
                      company.eligibility.backlogAllowed 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }`}>
                      {company.eligibility.backlogAllowed 
                        ? '✓ Backlogs Allowed' 
                        : '✗ No Backlogs Allowed'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {company.eligibility.backlogAllowed 
                        ? 'Students with backlogs are eligible to apply' 
                        : 'Students must be clear of all backlogs to be eligible'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Process */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Selection Process</h2>
              <div className="space-y-4">
                {company.selectionProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-festival-orange to-festival-magenta rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-gray-800">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-festival-blue to-festival-cyan py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Applying?</h2>
          <p className="text-white text-lg opacity-90 mb-8">
            Make sure you meet all eligibility criteria and start preparing for the selection process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-festival-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Visit Company Website
            </a>
            <a
              href={`mailto:${company.contactEmail}`}
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-festival-blue transition"
            >
              Contact HR
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyDetail;
