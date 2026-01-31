/**
 * Club Routes
 * API endpoints for club management with role-based access control
 */

const express = require('express');
const router = express.Router();
const {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  getClubMembers,
  updateMembers,
  getActivities,
  updateActivities,
  updateAnnouncements,
  getClubStats
} = require('./clubController');
const { authMiddleware } = require('./middleware');

// ============================================
// PUBLIC ROUTES
// ============================================

// Get all clubs with optional filters
router.get('/', getAllClubs);

// Get specific club
router.get('/:clubId', getClubById);

// Get club statistics
router.get('/stats/overview', getClubStats);

// ============================================
// COORDINATOR PROTECTED ROUTES
// ============================================

// Create new club
router.post('/', authMiddleware, createClub);

// Update club
router.put('/:clubId', authMiddleware, updateClub);

// Delete club
router.delete('/:clubId', authMiddleware, deleteClub);

// ============================================
// MEMBER MANAGEMENT
// ============================================

// Get club members
router.get('/:clubId/members', getClubMembers);

// Update members
router.put('/:clubId/members', authMiddleware, updateMembers);

// ============================================
// ACTIVITIES & GALLERY
// ============================================

// Get club activities
router.get('/:clubId/activities', getActivities);

// Update activities
router.put('/:clubId/activities', authMiddleware, updateActivities);

// ============================================
// ANNOUNCEMENTS & ACHIEVEMENTS
// ============================================

// Update announcements and achievements
router.put('/:clubId/announcements', authMiddleware, updateAnnouncements);

module.exports = router;
