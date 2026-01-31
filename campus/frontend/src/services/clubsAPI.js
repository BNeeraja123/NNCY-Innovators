/**
 * Club API Service
 * Helper functions to make API calls to club endpoints
 */

const API_BASE = 'http://localhost:5000/api';

// ============================================
// CLUBS RETRIEVAL
// ============================================

export const clubsAPI = {
  /**
   * Get all clubs with optional filters
   */
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE}/clubs?${params}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw error;
    }
  },

  /**
   * Get specific club by ID
   */
  getById: async (clubId) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching club:', error);
      throw error;
    }
  },

  /**
   * Get club statistics
   */
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE}/clubs/stats/overview`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // ============================================
  // CLUBS MANAGEMENT
  // ============================================

  /**
   * Create new club (Coordinator only)
   */
  create: async (clubData, token) => {
    try {
      const response = await fetch(`${API_BASE}/clubs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clubData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating club:', error);
      throw error;
    }
  },

  /**
   * Update club (Coordinator only)
   */
  update: async (clubId, clubData, token) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clubData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating club:', error);
      throw error;
    }
  },

  /**
   * Delete club (Coordinator only)
   */
  delete: async (clubId, token) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting club:', error);
      throw error;
    }
  },

  // ============================================
  // MEMBER MANAGEMENT
  // ============================================

  /**
   * Get club members
   */
  getMembers: async (clubId) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}/members`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  },

  /**
   * Update club members (Coordinator only)
   */
  updateMembers: async (clubId, members, token) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}/members`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ members })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating members:', error);
      throw error;
    }
  },

  // ============================================
  // ACTIVITIES & GALLERY
  // ============================================

  /**
   * Get club activities/events
   */
  getActivities: async (clubId) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}/activities`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },

  /**
   * Update club activities (Coordinator only)
   */
  updateActivities: async (clubId, activities, token) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}/activities`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ activities })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating activities:', error);
      throw error;
    }
  },

  // ============================================
  // ANNOUNCEMENTS & ACHIEVEMENTS
  // ============================================

  /**
   * Update announcements and achievements (Coordinator only)
   */
  updateAnnouncements: async (clubId, announcementsData, token) => {
    try {
      const response = await fetch(`${API_BASE}/clubs/${clubId}/announcements`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(announcementsData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating announcements:', error);
      throw error;
    }
  }
};
