/**
 * Clubs & Societies Logic
 * Contains utility functions for clubs data operations
 */

import {
  technicalClubsData,
  culturalGroupsData,
  sportsTeamsData,
  allClubsData,
  clubsStatsData
} from '../data/clubsData';

// ============================================
// BASIC RETRIEVAL FUNCTIONS
// ============================================

/**
 * Get all clubs across all categories
 * @returns {Array} Array of all club objects
 */
export const getAllClubs = () => {
  return allClubsData;
};

/**
 * Get all technical clubs
 * @returns {Array} Array of technical club objects
 */
export const getTechnicalClubs = () => {
  return technicalClubsData;
};

/**
 * Get all cultural groups
 * @returns {Array} Array of cultural group objects
 */
export const getCulturalGroups = () => {
  return culturalGroupsData;
};

/**
 * Get all sports teams
 * @returns {Array} Array of sports team objects
 */
export const getSportsTeams = () => {
  return sportsTeamsData;
};

/**
 * Get club by ID
 * @param {string} clubId - The club ID to search for
 * @returns {Object|null} Club object or null if not found
 */
export const getClubById = (clubId) => {
  return allClubsData.find(club => club.id === clubId) || null;
};

/**
 * Get clubs by category
 * @param {string} category - Category to filter ('technical', 'cultural', 'sports')
 * @returns {Array} Array of clubs in specified category
 */
export const getClubsByCategory = (category) => {
  return allClubsData.filter(club => club.category === category);
};

// ============================================
// SEARCH & FILTER FUNCTIONS
// ============================================

/**
 * Search clubs by name, description, or type
 * @param {string} query - Search query string
 * @returns {Array} Array of matching club objects
 */
export const searchClubs = (query) => {
  const lowerQuery = query.toLowerCase();
  return allClubsData.filter(club =>
    club.name.toLowerCase().includes(lowerQuery) ||
    club.description.toLowerCase().includes(lowerQuery) ||
    club.type.toLowerCase().includes(lowerQuery) ||
    club.focusAreas.some(area => area.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get clubs by type within category
 * @param {string} type - Club type (e.g., 'Programming', 'Music')
 * @returns {Array} Array of clubs matching the type
 */
export const getClubsByType = (type) => {
  return allClubsData.filter(club => club.type === type);
};

/**
 * Get clubs by coordinator name
 * @param {string} coordinatorName - Name of coordinator
 * @returns {Array} Array of clubs with this coordinator
 */
export const getClubsByCoordinator = (coordinatorName) => {
  const lowerName = coordinatorName.toLowerCase();
  return allClubsData.filter(club =>
    club.coordinators.some(coord => coord.name.toLowerCase().includes(lowerName))
  );
};

/**
 * Filter clubs by member count
 * @param {number} minMembers - Minimum member count
 * @returns {Array} Array of clubs with at least minMembers
 */
export const getClubsByMemberCount = (minMembers) => {
  return allClubsData.filter(club => club.memberCount >= minMembers).sort((a, b) => b.memberCount - a.memberCount);
};

// ============================================
// ACHIEVEMENT FUNCTIONS
// ============================================

/**
 * Get all achievements across all clubs
 * @returns {Array} Array of all achievement objects with club reference
 */
export const getAllAchievements = () => {
  const achievements = [];
  allClubsData.forEach(club => {
    club.achievements.forEach(achievement => {
      achievements.push({
        ...achievement,
        clubId: club.id,
        clubName: club.name,
        clubCategory: club.category
      });
    });
  });
  return achievements.sort((a, b) => b.year - a.year);
};

/**
 * Get achievements by club ID
 * @param {string} clubId - Club ID
 * @returns {Array} Array of achievement objects for club
 */
export const getAchievementsByClub = (clubId) => {
  const club = getClubById(clubId);
  return club ? club.achievements : [];
};

/**
 * Get achievements by year
 * @param {number} year - Year to filter
 * @returns {Array} Array of achievements from specified year
 */
export const getAchievementsByYear = (year) => {
  return getAllAchievements().filter(achievement => achievement.year === year);
};

/**
 * Get top achievements (most recent and significant)
 * @param {number} limit - Number of achievements to return
 * @returns {Array} Array of top achievements
 */
export const getTopAchievements = (limit = 5) => {
  return getAllAchievements().slice(0, limit);
};

/**
 * Search achievements by title
 * @param {string} query - Search query
 * @returns {Array} Array of matching achievements
 */
export const searchAchievements = (query) => {
  const lowerQuery = query.toLowerCase();
  return getAllAchievements().filter(achievement =>
    achievement.title.toLowerCase().includes(lowerQuery) ||
    achievement.description.toLowerCase().includes(lowerQuery)
  );
};

// ============================================
// EVENT FUNCTIONS
// ============================================

/**
 * Get all events across all clubs
 * @returns {Array} Array of all event objects with club reference
 */
export const getAllEvents = () => {
  const events = [];
  allClubsData.forEach(club => {
    club.events.forEach(event => {
      events.push({
        ...event,
        clubId: club.id,
        clubName: club.name,
        clubCategory: club.category
      });
    });
  });
  return events;
};

/**
 * Get events by club ID
 * @param {string} clubId - Club ID
 * @returns {Array} Array of event objects for club
 */
export const getEventsByClub = (clubId) => {
  const club = getClubById(clubId);
  return club ? club.events : [];
};

/**
 * Get upcoming events (future or current)
 * @returns {Array} Array of upcoming event objects
 */
export const getUpcomingEvents = () => {
  return getAllEvents();
};

/**
 * Search events by name
 * @param {string} query - Search query
 * @returns {Array} Array of matching events
 */
export const searchEvents = (query) => {
  const lowerQuery = query.toLowerCase();
  return getAllEvents().filter(event =>
    event.name.toLowerCase().includes(lowerQuery)
  );
};

// ============================================
// GALLERY FUNCTIONS
// ============================================

/**
 * Get gallery images by club ID
 * @param {string} clubId - Club ID
 * @returns {Array} Array of gallery image objects
 */
export const getClubGallery = (clubId) => {
  const club = getClubById(clubId);
  return club ? club.galleryImages : [];
};

/**
 * Get all gallery images across clubs
 * @returns {Array} Array of all gallery images with club reference
 */
export const getAllGalleryImages = () => {
  const images = [];
  allClubsData.forEach(club => {
    club.galleryImages.forEach(image => {
      images.push({
        ...image,
        clubId: club.id,
        clubName: club.name
      });
    });
  });
  return images;
};

// ============================================
// COORDINATOR FUNCTIONS
// ============================================

/**
 * Get coordinators of a club
 * @param {string} clubId - Club ID
 * @returns {Array} Array of coordinator objects
 */
export const getClubCoordinators = (clubId) => {
  const club = getClubById(clubId);
  return club ? club.coordinators : [];
};

/**
 * Get all coordinators across clubs
 * @returns {Array} Array of all coordinator objects with club reference
 */
export const getAllCoordinators = () => {
  const coordinators = [];
  allClubsData.forEach(club => {
    club.coordinators.forEach(coordinator => {
      coordinators.push({
        ...coordinator,
        clubId: club.id,
        clubName: club.name
      });
    });
  });
  return coordinators;
};

// ============================================
// STATISTICS FUNCTIONS
// ============================================

/**
 * Get overall club statistics
 * @returns {Object} Statistics object
 */
export const getClubsStats = () => {
  return clubsStatsData;
};

/**
 * Get category statistics
 * @returns {Object} Statistics for each category
 */
export const getCategoryStats = () => {
  return {
    technical: {
      count: technicalClubsData.length,
      members: technicalClubsData.reduce((sum, club) => sum + club.memberCount, 0),
      achievements: technicalClubsData.reduce((sum, club) => sum + club.achievements.length, 0),
      events: technicalClubsData.reduce((sum, club) => sum + club.events.length, 0)
    },
    cultural: {
      count: culturalGroupsData.length,
      members: culturalGroupsData.reduce((sum, club) => sum + club.memberCount, 0),
      achievements: culturalGroupsData.reduce((sum, club) => sum + club.achievements.length, 0),
      events: culturalGroupsData.reduce((sum, club) => sum + club.events.length, 0)
    },
    sports: {
      count: sportsTeamsData.length,
      members: sportsTeamsData.reduce((sum, club) => sum + club.memberCount, 0),
      achievements: sportsTeamsData.reduce((sum, club) => sum + club.achievements.length, 0),
      events: sportsTeamsData.reduce((sum, club) => sum + club.events.length, 0)
    }
  };
};

/**
 * Get most popular clubs by member count
 * @param {number} limit - Number of clubs to return
 * @returns {Array} Array of top clubs
 */
export const getTopClubs = (limit = 5) => {
  return [...allClubsData].sort((a, b) => b.memberCount - a.memberCount).slice(0, limit);
};

/**
 * Get club membership breakdown
 * @returns {Object} Object with category and member counts
 */
export const getMembershipBreakdown = () => {
  const breakdown = {};
  allClubsData.forEach(club => {
    if (!breakdown[club.category]) {
      breakdown[club.category] = {
        clubs: 0,
        members: 0
      };
    }
    breakdown[club.category].clubs += 1;
    breakdown[club.category].members += club.memberCount;
  });
  return breakdown;
};

/**
 * Get clubs founded in a specific year
 * @param {number} year - Year of founding
 * @returns {Array} Array of clubs founded in that year
 */
export const getClubsByFoundingYear = (year) => {
  return allClubsData.filter(club => club.founded === year);
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get unique focus areas across all clubs
 * @returns {Array} Array of unique focus areas
 */
export const getUniqueFocusAreas = () => {
  const areas = new Set();
  allClubsData.forEach(club => {
    club.focusAreas.forEach(area => areas.add(area));
  });
  return Array.from(areas).sort();
};

/**
 * Get clubs offering specific focus area
 * @param {string} focusArea - Focus area to filter
 * @returns {Array} Array of clubs with this focus area
 */
export const getClubsByFocusArea = (focusArea) => {
  return allClubsData.filter(club =>
    club.focusAreas.some(area => area.toLowerCase() === focusArea.toLowerCase())
  );
};

/**
 * Get complete dashboard data
 * @returns {Object} Object containing all data for dashboard
 */
export const getCompleteDashboardData = () => {
  return {
    stats: getClubsStats(),
    categoryStats: getCategoryStats(),
    topClubs: getTopClubs(6),
    recentAchievements: getTopAchievements(8),
    allClubs: allClubsData,
    categories: {
      technical: getTechnicalClubs(),
      cultural: getCulturalGroups(),
      sports: getSportsTeams()
    }
  };
};

/**
 * Get club-wise dashboard data for a specific club
 * @param {string} clubId - Club ID
 * @returns {Object} Comprehensive club data
 */
export const getClubDashboardData = (clubId) => {
  const club = getClubById(clubId);
  if (!club) return null;

  return {
    ...club,
    achievements: getAchievementsByClub(clubId),
    events: getEventsByClub(clubId),
    gallery: getClubGallery(clubId),
    coordinators: getClubCoordinators(clubId)
  };
};

/**
 * Get clubs founded before a specific year
 * @param {number} year - Year threshold
 * @returns {Array} Array of established clubs
 */
export const getEstablishedClubs = (year) => {
  return allClubsData.filter(club => club.founded <= year).sort((a, b) => a.founded - b.founded);
};

export default {
  getAllClubs,
  getTechnicalClubs,
  getCulturalGroups,
  getSportsTeams,
  getClubById,
  getClubsByCategory,
  searchClubs,
  getClubsByType,
  getClubsByCoordinator,
  getClubsByMemberCount,
  getAllAchievements,
  getAchievementsByClub,
  getAchievementsByYear,
  getTopAchievements,
  searchAchievements,
  getAllEvents,
  getEventsByClub,
  getUpcomingEvents,
  searchEvents,
  getClubGallery,
  getAllGalleryImages,
  getClubCoordinators,
  getAllCoordinators,
  getClubsStats,
  getCategoryStats,
  getTopClubs,
  getMembershipBreakdown,
  getClubsByFoundingYear,
  getUniqueFocusAreas,
  getClubsByFocusArea,
  getCompleteDashboardData,
  getClubDashboardData,
  getEstablishedClubs
};
