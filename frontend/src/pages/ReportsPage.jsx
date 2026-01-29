import React, { useState, useMemo } from 'react';
import { ReportCard } from '../components/AnalyticsCard';
import { getYearlyReports, getReportByYear, getLatestReport } from '../utils/analyticsLogic';

const ReportsPage = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const reports = useMemo(() => getYearlyReports(), []);
  const latestReport = useMemo(() => getLatestReport(), []);
  const years = useMemo(() => reports.map(r => r.year).sort((a, b) => b - a), [reports]);

  // Get current report details
  const currentReport = useMemo(() => {
    if (selectedYear) {
      return getReportByYear(selectedYear);
    }
    return latestReport;
  }, [selectedYear, latestReport]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-festival-cyan to-festival-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📄 Yearly Reports
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Comprehensive annual reports documenting our institutional growth and achievements
          </p>
        </div>
      </section>

      {/* Latest Report Highlight */}
      {latestReport && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-festival-orange to-festival-magenta rounded-2xl p-8 text-white mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <span className="inline-block bg-white bg-opacity-30 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Latest Report
                </span>
                <h2 className="text-3xl font-bold mb-4">{latestReport.title}</h2>
                <p className="text-white text-opacity-90 mb-6">
                  Academic Year {latestReport.year} - {latestReport.year + 1}
                </p>
                <div className="space-y-3 mb-8">
                  <p className="flex items-center gap-2">
                    <span>📊</span>
                    <strong>Key Highlights:</strong>
                  </p>
                  <ul className="space-y-2 ml-8">
                    {latestReport.highlights?.slice(0, 4).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-xl">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <a
                    href={latestReport.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-festival-orange font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    📥 Download PDF
                    <span className="text-xs">({latestReport.fileSize})</span>
                  </a>
                </div>
              </div>
              <div className="md:flex-1 flex items-center justify-center">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 text-center">
                  <p className="text-white text-opacity-80 text-sm mb-2">File Information</p>
                  <p className="text-4xl font-bold mb-2">📘</p>
                  <p className="text-white mb-2">{latestReport.fileName}</p>
                  <p className="text-white text-opacity-70 text-sm">{latestReport.fileSize}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and View Mode Section */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📅 Filter by Year
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedYear(null)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedYear === null
                      ? 'bg-festival-cyan text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Latest
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedYear === year
                        ? 'bg-festival-cyan text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                👁️ View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    viewMode === 'grid'
                      ? 'bg-festival-blue text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  📊 Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    viewMode === 'list'
                      ? 'bg-festival-blue text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  📋 List View
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-l-4 border-festival-cyan"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {report.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{report.fileName}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.highlights?.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          ✓ {highlight}
                        </span>
                      ))}
                      {report.highlights && report.highlights.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          +{report.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={report.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-festival-orange to-festival-magenta text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition whitespace-nowrap flex items-center gap-2"
                  >
                    📥 Download
                  </a>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  {report.fileSize} • {report.downloadUrl}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Report Details Panel */}
      {currentReport && (
        <section className="bg-white border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              📖 Detailed Highlights - {currentReport.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">📋 All Highlights</h3>
                <ul className="space-y-4">
                  {currentReport.highlights?.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-festival-blue font-bold text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-800">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Document Info</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex justify-between">
                      <span className="font-semibold">File Name:</span>
                      <span>{currentReport.fileName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold">File Size:</span>
                      <span>{currentReport.fileSize}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold">Academic Year:</span>
                      <span>{currentReport.year} - {currentReport.year + 1}</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={currentReport.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-festival-orange to-festival-magenta text-white font-bold py-4 px-6 rounded-lg text-center hover:opacity-90 transition text-lg"
                >
                  📥 Download Full Report
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Information Section */}
      <section className="bg-gradient-to-r from-festival-blue to-festival-cyan py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">📊 Report Archives</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Access comprehensive annual reports spanning {Math.min(...years)} to {Math.max(...years)}. Each report contains detailed information about our institutional performance, achievements, and strategic initiatives.
          </p>
          <p className="text-white text-opacity-80">
            Total Reports Available: <span className="font-bold text-2xl">{reports.length}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
