/**
 * Club Routes
 * API endpoints for club management with role-based access control
 */

import express from 'express';

// Import mock data
import { clubsData } from '../data/clubsData.js';

const router = express.Router();

// Auth middleware - extract user info from token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || authHeader;

  if (!token || token === 'undefined' || token === 'null') {
    // For demo purposes, allow access without strict auth
    req.user = { role: 'club_coordinator', id: 999, email: 'clubcoord@college.edu', name: 'Club Coordinator' };
    return next();
  }

  try {
    // Demo token validation
    if (token.startsWith('demo-token-')) {
      req.user = {
        role: 'club_coordinator',
        id: 999,
        email: token.replace('demo-token-', ''),
        name: 'Club Coordinator'
      };
    } else {
      // Default to coordinator for demo
      req.user = {
        role: 'club_coordinator',
        id: 999,
        email: 'clubcoord@college.edu',
        name: 'Club Coordinator'
      };
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ============================================
// PUBLIC ROUTES - Get Clubs
// ============================================

// Apply auth middleware to all routes
router.use((req, res, next) => {
  if (!req.user) {
    authMiddleware(req, res, next);
  } else {
    next();
  }
});

router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    
    let clubs = [...clubsData];

    // Filter by category
    if (category && category !== 'all') {
      clubs = clubs.filter(club => club.category === category);
    }

    // Search filter
    if (search) {
      clubs = clubs.filter(club =>
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        club.description.toLowerCase().includes(search.toLowerCase()) ||
        club.focusAreas?.some(area => area.toLowerCase().includes(search.toLowerCase()))
      );
    }

    res.json({
      success: true,
      count: clubs.length,
      data: clubs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get specific club
router.get('/:clubId', (req, res) => {
  try {
    const { clubId } = req.params;
    const club = clubsData.find(c => c.id === parseInt(clubId));

    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    res.json({ success: true, data: club });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get club statistics
router.get('/stats/overview', (req, res) => {
  try {
    const stats = {
      totalClubs: clubsData.length,
      totalMembers: clubsData.reduce((sum, club) => sum + (club.memberCount || 0), 0),
      totalAchievements: clubsData.reduce((sum, club) => sum + (club.achievements?.length || 0), 0),
      totalEvents: clubsData.reduce((sum, club) => sum + (club.events?.length || 0), 0),
      clubs: {
        technical: clubsData.filter(c => c.category === 'technical').length,
        cultural: clubsData.filter(c => c.category === 'cultural').length,
        sports: clubsData.filter(c => c.category === 'sports').length
      }
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// COORDINATOR PROTECTED ROUTES
// ============================================

// Create new club
router.post('/', authMiddleware, (req, res) => {
  try {
    if (!req.user || !['club_coordinator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const {
      name,
      category,
      type,
      description,
      fullDescription,
      focusAreas,
      membershipFee,
      meetingSchedule,
      joinLink,
      facultyAdvisor,
      contactEmail,
      contactPhone,
      logo
    } = req.body;

    if (!name || !category || !type || !description) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newClub = {
      id: Math.max(...clubsData.map(c => c.id), 0) + 1,
      name,
      category,
      type,
      description,
      fullDescription: fullDescription || '',
      logo: logo || '💻',
      memberCount: 0,
      founded: new Date().getFullYear(),
      focusAreas: Array.isArray(focusAreas) ? focusAreas : [],
      coordinators: [
        {
          name: req.user.name,
          email: req.user.email,
          position: 'Coordinator'
        }
      ],
      members: [],
      membershipFee: membershipFee || 'Free',
      meetingSchedule: meetingSchedule || '',
      joinLink: joinLink || '',
      facultyAdvisor: facultyAdvisor || '',
      contactEmail: contactEmail || '',
      contactPhone: contactPhone || '',
      achievements: [],
      events: [],
      announcements: [],
      galleryImages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.name
    };

    clubsData.push(newClub);
    res.status(201).json({ success: true, data: newClub, message: 'Club created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update club
router.put('/:clubId', authMiddleware, (req, res) => {
  try {
    if (!req.user || !['club_coordinator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { clubId } = req.params;
    const clubIndex = clubsData.findIndex(c => c.id === parseInt(clubId));

    if (clubIndex === -1) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    const club = clubsData[clubIndex];
    
    // Check if user is coordinator or admin
    const isCoordinator = req.user.role === 'admin' || 
                          club.coordinators?.some(c => c.email === req.user.email);

    if (!isCoordinator) {
      return res.status(403).json({ success: false, message: 'You can only edit your own clubs' });
    }

    // Update club fields
    const allowedFields = [
      'name', 'category', 'type', 'description', 'fullDescription', 'logo',
      'focusAreas', 'membershipFee', 'meetingSchedule', 'joinLink',
      'facultyAdvisor', 'contactEmail', 'contactPhone'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        club[field] = req.body[field];
      }
    });

    club.updatedAt = new Date().toISOString();
    club.updatedBy = req.user.name;

    clubsData[clubIndex] = club;
    res.json({ success: true, data: club, message: 'Club updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete club
router.delete('/:clubId', authMiddleware, (req, res) => {
  try {
    if (!req.user || !['club_coordinator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { clubId } = req.params;
    const clubIndex = clubsData.findIndex(c => c.id === parseInt(clubId));

    if (clubIndex === -1) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    const club = clubsData[clubIndex];
    const isCoordinator = req.user.role === 'admin' || 
                          club.coordinators?.some(c => c.email === req.user.email);

    if (!isCoordinator) {
      return res.status(403).json({ success: false, message: 'You can only delete your own clubs' });
    }

    clubsData.splice(clubIndex, 1);
    res.json({ success: true, message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// MEMBER MANAGEMENT
// ============================================

router.get('/:clubId/members', (req, res) => {
  try {
    const { clubId } = req.params;
    const club = clubsData.find(c => c.id === parseInt(clubId));

    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    res.json({ success: true, data: club.members || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:clubId/members', authMiddleware, (req, res) => {
  try {
    if (!req.user || !['club_coordinator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { clubId } = req.params;
    const { members } = req.body;

    const clubIndex = clubsData.findIndex(c => c.id === parseInt(clubId));
    if (clubIndex === -1) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    const club = clubsData[clubIndex];
    const isCoordinator = req.user.role === 'admin' || 
                          club.coordinators?.some(c => c.email === req.user.email);

    if (!isCoordinator) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    club.members = members;
    club.memberCount = members?.length || 0;
    club.updatedAt = new Date().toISOString();
    club.updatedBy = req.user.name;

    clubsData[clubIndex] = club;
    res.json({ success: true, data: club, message: 'Members updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// ACTIVITIES & GALLERY
// ============================================

router.get('/:clubId/activities', (req, res) => {
  try {
    const { clubId } = req.params;
    const club = clubsData.find(c => c.id === parseInt(clubId));

    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    res.json({ success: true, data: club.events || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:clubId/activities', authMiddleware, (req, res) => {
  try {
    if (!req.user || !['club_coordinator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { clubId } = req.params;
    const { activities } = req.body;

    const clubIndex = clubsData.findIndex(c => c.id === parseInt(clubId));
    if (clubIndex === -1) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    const club = clubsData[clubIndex];
    const isCoordinator = req.user.role === 'admin' || 
                          club.coordinators?.some(c => c.email === req.user.email);

    if (!isCoordinator) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    club.events = activities;
    club.updatedAt = new Date().toISOString();
    club.updatedBy = req.user.name;

    clubsData[clubIndex] = club;
    res.json({ success: true, data: club, message: 'Activities updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// ANNOUNCEMENTS & ACHIEVEMENTS
// ============================================

router.put('/:clubId/announcements', authMiddleware, (req, res) => {
  try {
    if (!req.user || !['club_coordinator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { clubId } = req.params;
    const { announcements, achievements } = req.body;

    const clubIndex = clubsData.findIndex(c => c.id === parseInt(clubId));
    if (clubIndex === -1) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    const club = clubsData[clubIndex];
    const isCoordinator = req.user.role === 'admin' || 
                          club.coordinators?.some(c => c.email === req.user.email);

    if (!isCoordinator) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (announcements !== undefined) club.announcements = announcements;
    if (achievements !== undefined) club.achievements = achievements;
    
    club.updatedAt = new Date().toISOString();
    club.updatedBy = req.user.name;

    clubsData[clubIndex] = club;
    res.json({ success: true, data: club, message: 'Announcements updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export { router as clubRoutes };
