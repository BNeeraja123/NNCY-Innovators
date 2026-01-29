import React from 'react';

export const RankingCard = ({ ranking, featured = false }) => {
  const improvementPercentage = ranking.improvedFrom
    ? Math.round(((ranking.improvedFrom - ranking.rank) / ranking.improvedFrom) * 100)
    : 0;

  return (
    <div className={`rounded-lg shadow-lg p-6 transition ${featured ? 'border-4 border-festival-orange' : 'border border-gray-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600 font-semibold">{ranking.organization}</p>
          <h3 className="text-lg font-bold text-gray-900">{ranking.category}</h3>
        </div>
        <span className="text-3xl">{ranking.badge}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-r from-festival-blue to-festival-cyan p-3 rounded-lg text-white text-center">
          <p className="text-xs text-white/80">Rank</p>
          <p className="text-2xl font-bold">#{ranking.rank}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-600">Year</p>
          <p className="text-2xl font-bold text-gray-800">{ranking.year}</p>
        </div>
      </div>

      {ranking.improvedFrom && (
        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded mb-4">
          <p className="text-xs text-green-700 font-semibold">Improvement</p>
          <p className="text-sm text-green-800">
            ↑ {ranking.improvedFrom - ranking.rank} positions ({improvementPercentage}% improvement)
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500">{ranking.country}</p>
      {ranking.link && (
        <a
          href={ranking.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-festival-blue text-sm font-semibold hover:underline inline-block"
        >
          Learn More →
        </a>
      )}
    </div>
  );
};

export const AwardCard = ({ award }) => {
  const typeColors = {
    institutional: 'bg-orange-100 text-orange-800 border-orange-300',
    student: 'bg-blue-100 text-blue-800 border-blue-300',
    faculty: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  return (
    <div className="rounded-lg shadow-lg p-6 border-l-4 border-festival-magenta hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${typeColors[award.type]}`}>
            {award.type.charAt(0).toUpperCase() + award.type.slice(1)}
          </p>
        </div>
        <span className="text-3xl">{award.icon}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{award.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{award.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs font-semibold">Awardee</p>
          <p className="font-semibold text-gray-800">{award.awardee}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold">Awarded By</p>
          <p className="font-semibold text-gray-800">{award.giver}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{award.category}</span>
          <span className="font-bold text-festival-magenta">{award.year}</span>
        </div>
      </div>

      {award.validity && (
        <p className="text-xs text-green-600 font-semibold">Valid: {award.validity}</p>
      )}
      {award.count && (
        <p className="text-xs text-blue-600 font-semibold">Count: {award.count} recipients/instances</p>
      )}
    </div>
  );
};

export const AchievementCard = ({ achievement }) => {
  const impactColors = {
    Major: 'text-red-600 bg-red-50',
    High: 'text-orange-600 bg-orange-50',
    Medium: 'text-blue-600 bg-blue-50'
  };

  return (
    <div className="rounded-lg shadow-lg p-6 hover:shadow-xl transition bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600 font-semibold">{achievement.category}</p>
          <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
        </div>
        <span className="text-3xl">{achievement.icon}</span>
      </div>

      <p className="text-gray-700 mb-4">{achievement.description}</p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-festival-cyan">
        <p className="text-sm text-gray-600">{achievement.details}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${impactColors[achievement.impact]}`}>
          {achievement.impact} Impact
        </span>
        <span className="text-sm font-semibold text-gray-600">{achievement.year}</span>
      </div>
    </div>
  );
};

export const MediaMentionCard = ({ mention, featured = false }) => {
  const formattedDate = new Date(mention.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={`rounded-lg shadow-lg p-6 transition ${featured ? 'border-4 border-festival-orange bg-orange-50' : 'border border-gray-200'}`}>
      {featured && (
        <div className="mb-3 inline-block bg-festival-orange text-white px-3 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}

      <div className="mb-4">
        <p className="text-xs font-bold text-festival-magenta uppercase tracking-wider">{mention.publication}</p>
        <h3 className="text-lg font-bold text-gray-900 mt-2">{mention.headline}</h3>
      </div>

      <p className="text-gray-700 mb-4 text-sm">{mention.excerpt}</p>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
            {mention.category}
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
            {formattedDate}
          </span>
        </div>
        {mention.url && (
          <a
            href={mention.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-festival-blue hover:text-festival-magenta font-semibold text-sm"
          >
            Read →
          </a>
        )}
      </div>
    </div>
  );
};

export const ReportCard = ({ report }) => {
  return (
    <div className="rounded-lg shadow-lg p-6 hover:shadow-xl transition border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600 font-semibold">Annual Report</p>
          <h3 className="text-xl font-bold text-gray-900">{report.year}</h3>
        </div>
        <span className="text-4xl">📄</span>
      </div>

      <p className="text-gray-600 text-sm mb-4 font-semibold">{report.fileName}</p>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <p className="text-xs text-gray-600 font-semibold mb-2">Key Highlights:</p>
        <ul className="space-y-2">
          {report.highlights.slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-festival-orange">✓</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        {report.highlights.length > 3 && (
          <p className="text-xs text-gray-600 mt-2">+{report.highlights.length - 3} more highlights</p>
        )}
      </div>

      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="text-gray-600">
          <span className="font-semibold">{report.fileSize}</span> PDF
        </span>
        <span className="text-gray-600">Updated {report.downloadDate}</span>
      </div>

      <a
        href={report.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-gradient-to-r from-festival-orange to-festival-magenta hover:from-orange-600 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition text-center"
      >
        Download Report
      </a>
    </div>
  );
};

export const DepartmentRankingCard = ({ department }) => {
  const improvement = department.nirf2023 - department.nirf2024;
  const isImproved = improvement > 0;

  return (
    <div className="rounded-lg shadow-lg p-6 border-l-4 border-festival-blue hover:shadow-xl transition">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{department.name}</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-600 font-semibold mb-1">NIRF 2024</p>
          <p className="text-2xl font-bold text-festival-blue">#{department.nirf2024}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 font-semibold mb-1">Change</p>
          <p className={`text-lg font-bold ${isImproved ? 'text-green-600' : 'text-red-600'}`}>
            {isImproved ? '↑' : '↓'} {Math.abs(improvement)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 font-semibold mb-1">Students</p>
          <p className="text-2xl font-bold text-festival-magenta">{department.students}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg text-center">
        <p className="text-xs text-gray-600 font-semibold mb-1">Avg Package</p>
        <p className="text-lg font-bold text-green-700">{department.avgPackage}</p>
      </div>
    </div>
  );
};
