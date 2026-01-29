/**
 * Analytics & Achievements Module - Utility Functions
 */

import {
  rankingsData,
  awardsData,
  achievementsData,
  mediaMentionsData,
  yearlyReportsData,
  departmentRankingsData,
  milestonesData,
  institutionalStatsData
} from '../data/analyticsData';

/**
 * Get all rankings sorted by rank
 * @returns {Array} Sorted rankings data
 */
export const getAllRankings = () => {
  return [...rankingsData].sort((a, b) => a.rank - b.rank);
};

/**
 * Get national rankings only
 * @returns {Array} National rankings
 */
export const getNationalRankings = () => {
  return rankingsData.filter(r => r.type === 'national').sort((a, b) => a.rank - b.rank);
};

/**
 * Get international rankings only
 * @returns {Array} International rankings
 */
export const getInternationalRankings = () => {
  return rankingsData.filter(r => r.type === 'international').sort((a, b) => a.rank - b.rank);
};

/**
 * Get top N rankings
 * @param {number} limit - Number of top rankings
 * @returns {Array} Top rankings
 */
export const getTopRankings = (limit = 5) => {
  return getAllRankings().slice(0, limit);
};

/**
 * Get ranking by year
 * @param {number} year - Ranking year
 * @returns {Array} Rankings for specific year
 */
export const getRankingsByYear = (year) => {
  return rankingsData.filter(r => r.year === year).sort((a, b) => a.rank - b.rank);
};

/**
 * Search rankings
 * @param {string} query - Search query
 * @returns {Array} Filtered rankings
 */
export const searchRankings = (query) => {
  const lowerQuery = query.toLowerCase();
  return rankingsData.filter(r =>
    r.organization.toLowerCase().includes(lowerQuery) ||
    r.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get all awards
 * @param {string} type - Optional filter ('institutional', 'student', 'faculty')
 * @returns {Array} Awards
 */
export const getAllAwards = (type = null) => {
  if (type) {
    return awardsData.filter(a => a.type === type);
  }
  return [...awardsData].sort((a, b) => b.year - a.year);
};

/**
 * Get awards by category
 * @param {string} category - Award category
 * @returns {Array} Awards in category
 */
export const getAwardsByCategory = (category) => {
  return awardsData.filter(a => a.category === category);
};

/**
 * Get awards by year
 * @param {number} year - Award year
 * @returns {Array} Awards for year
 */
export const getAwardsByYear = (year) => {
  return awardsData.filter(a => a.year === year);
};

/**
 * Search awards
 * @param {string} query - Search query
 * @returns {Array} Filtered awards
 */
export const searchAwards = (query) => {
  const lowerQuery = query.toLowerCase();
  return awardsData.filter(a =>
    a.name.toLowerCase().includes(lowerQuery) ||
    a.description.toLowerCase().includes(lowerQuery) ||
    a.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get all achievements
 * @returns {Array} Achievements
 */
export const getAllAchievements = () => {
  return [...achievementsData].sort((a, b) => b.year - a.year);
};

/**
 * Get achievements by category
 * @param {string} category - Achievement category
 * @returns {Array} Achievements in category
 */
export const getAchievementsByCategory = (category) => {
  return achievementsData.filter(a => a.category === category);
};

/**
 * Get achievements by impact level
 * @param {string} impact - Impact level ('High', 'Major', 'Medium')
 * @returns {Array} Achievements with impact level
 */
export const getAchievementsByImpact = (impact) => {
  return achievementsData.filter(a => a.impact === impact);
};

/**
 * Get top achievements
 * @param {number} limit - Number of achievements
 * @returns {Array} Top achievements
 */
export const getTopAchievements = (limit = 5) => {
  const impactOrder = { Major: 0, High: 1, Medium: 2 };
  return [...achievementsData]
    .sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact] || b.year - a.year)
    .slice(0, limit);
};

/**
 * Search achievements
 * @param {string} query - Search query
 * @returns {Array} Filtered achievements
 */
export const searchAchievements = (query) => {
  const lowerQuery = query.toLowerCase();
  return achievementsData.filter(a =>
    a.title.toLowerCase().includes(lowerQuery) ||
    a.description.toLowerCase().includes(lowerQuery) ||
    a.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get all media mentions
 * @returns {Array} Media mentions
 */
export const getAllMentions = () => {
  return [...mediaMentionsData].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get featured media mentions
 * @returns {Array} Featured mentions
 */
export const getFeaturedMentions = () => {
  return mediaMentionsData.filter(m => m.featured);
};

/**
 * Get media mentions by year
 * @param {number} year - Year
 * @returns {Array} Mentions for year
 */
export const getMentionsByYear = (year) => {
  return mediaMentionsData.filter(m => new Date(m.date).getFullYear() === year);
};

/**
 * Get media mentions by category
 * @param {string} category - Category
 * @returns {Array} Mentions in category
 */
export const getMentionsByCategory = (category) => {
  return mediaMentionsData.filter(m => m.category === category);
};

/**
 * Search media mentions
 * @param {string} query - Search query
 * @returns {Array} Filtered mentions
 */
export const searchMentions = (query) => {
  const lowerQuery = query.toLowerCase();
  return mediaMentionsData.filter(m =>
    m.headline.toLowerCase().includes(lowerQuery) ||
    m.publication.toLowerCase().includes(lowerQuery) ||
    m.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get yearly reports
 * @returns {Array} Yearly reports sorted by year descending
 */
export const getYearlyReports = () => {
  return [...yearlyReportsData].sort((a, b) => b.year - a.year);
};

/**
 * Get report by year
 * @param {number} year - Year
 * @returns {Object} Report for year
 */
export const getReportByYear = (year) => {
  return yearlyReportsData.find(r => r.year === year);
};

/**
 * Get latest report
 * @returns {Object} Latest report
 */
export const getLatestReport = () => {
  return yearlyReportsData[0];
};

/**
 * Get institutional statistics
 * @returns {Object} Statistics
 */
export const getInstitutionalStats = () => {
  return { ...institutionalStatsData };
};

/**
 * Get milestone timeline
 * @returns {Array} Milestones sorted by year
 */
export const getMilestoneTimeline = () => {
  return [...milestonesData].sort((a, b) => b.year - a.year);
};

/**
 * Get department rankings
 * @returns {Array} Department rankings
 */
export const getDepartmentRankings = () => {
  return [...departmentRankingsData].sort((a, b) => a.nirf2024 - b.nirf2024);
};

/**
 * Get department by name
 * @param {string} name - Department name
 * @returns {Object} Department data
 */
export const getDepartmentByName = (name) => {
  return departmentRankingsData.find(d => d.name === d.name);
};

/**
 * Get ranking improvement stats
 * @returns {Object} Improvement statistics
 */
export const getRankingImprovementStats = () => {
  const improvements = rankingsData
    .filter(r => r.improvedFrom !== undefined)
    .map(r => ({
      organization: r.organization,
      category: r.category,
      improvement: r.improvedFrom - r.rank,
      previousRank: r.improvedFrom,
      currentRank: r.rank
    }))
    .sort((a, b) => b.improvement - a.improvement);

  return {
    totalImprovements: improvements.length,
    bestImprovement: improvements[0],
    averageImprovement: improvements.length > 0
      ? Math.round(improvements.reduce((sum, i) => sum + i.improvement, 0) / improvements.length)
      : 0,
    improvements
  };
};

/**
 * Get achievements by year
 * @param {number} year - Year
 * @returns {Array} Achievements for year
 */
export const getAchievementsByYear = (year) => {
  return achievementsData.filter(a => a.year === year);
};

/**
 * Get unique categories
 * @returns {Array} Unique award categories
 */
export const getAwardCategories = () => {
  return [...new Set(awardsData.map(a => a.category))];
};

/**
 * Get unique achievement categories
 * @returns {Array} Unique achievement categories
 */
export const getAchievementCategories = () => {
  return [...new Set(achievementsData.map(a => a.category))];
};

/**
 * Get unique media mentions categories
 * @returns {Array} Unique mention categories
 */
export const getMentionCategories = () => {
  return [...new Set(mediaMentionsData.map(m => m.category))];
};

/**
 * Get complete dashboard data
 * @returns {Object} All dashboard data
 */
export const getCompleteDashboardData = () => {
  return {
    stats: getInstitutionalStats(),
    topRankings: getTopRankings(5),
    topAchievements: getTopAchievements(5),
    featuredMentions: getFeaturedMentions(),
    latestReport: getLatestReport(),
    milestones: getMilestoneTimeline(),
    improvementStats: getRankingImprovementStats()
  };
};

/**
 * Count awards by type and year
 * @param {number} year - Year
 * @returns {Object} Award counts
 */
export const getAwardCountsByYear = (year) => {
  const yearAwards = awardsData.filter(a => a.year === year);
  return {
    year,
    total: yearAwards.length,
    institutional: yearAwards.filter(a => a.type === 'institutional').length,
    student: yearAwards.filter(a => a.type === 'student').length,
    faculty: yearAwards.filter(a => a.type === 'faculty').length
  };
};

/**
 * Get media mentions statistics
 * @returns {Object} Media statistics
 */
export const getMediaStatistics = () => {
  const byYear = {};
  mediaMentionsData.forEach(m => {
    const year = new Date(m.date).getFullYear();
    byYear[year] = (byYear[year] || 0) + 1;
  });

  const byCategory = {};
  mediaMentionsData.forEach(m => {
    byCategory[m.category] = (byCategory[m.category] || 0) + 1;
  });

  return {
    totalMentions: mediaMentionsData.length,
    featuredMentions: mediaMentionsData.filter(m => m.featured).length,
    byYear,
    byCategory,
    topPublications: [...new Set(mediaMentionsData.map(m => m.publication))].slice(0, 5)
  };
};
