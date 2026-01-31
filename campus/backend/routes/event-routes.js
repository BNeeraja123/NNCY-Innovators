// Backend Event Routes - API Endpoints
import express from 'express';
import * as eventController from './eventController.js';

const router = express.Router();

// Auth middleware - extract user info from token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || authHeader;

  if (!token || token === 'undefined' || token === 'null') {
    // For demo purposes, allow access without strict auth
    req.user = { role: 'event_coordinator', id: 999, email: 'demo@college.edu' };
    return next();
  }

  try {
    // Demo token validation
    if (token.startsWith('demo-token-')) {
      req.user = {
        role: 'event_coordinator',
        id: 999,
        email: token.replace('demo-token-', '')
      };
    } else {
      // Default to coordinator for demo
      req.user = {
        role: 'event_coordinator',
        id: 999,
        email: 'demo@college.edu'
      };
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Middleware to check if user is coordinator or admin
const isCoordinatorOrAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'event_coordinator' && req.user.role !== 'admin')) {
    return res.status(403).json({ success: false, message: 'Not authorized. Event Coordinator access required.' });
  }
  next();
};

// Apply auth middleware to all routes
router.use(authMiddleware);

// Public routes (accessible by all authenticated users)
router.get('/events', eventController.getAllEvents);
router.get('/events/:eventId', eventController.getEventById);

// Coordinator routes (protected)
router.post('/events', isCoordinatorOrAdmin, eventController.createEvent);
router.put('/events/:eventId', isCoordinatorOrAdmin, eventController.updateEvent);
router.delete('/events/:eventId', isCoordinatorOrAdmin, eventController.deleteEvent);

// Registration management routes (coordinator)
router.get('/events/:eventId/registrations', isCoordinatorOrAdmin, eventController.getEventRegistrations);
router.put('/events/:eventId/registrations/:registrationId/status', isCoordinatorOrAdmin, eventController.updateRegistrationStatus);

// Event statistics (coordinator)
router.get('/events/:eventId/stats', isCoordinatorOrAdmin, eventController.getEventStats);

// Toggle registration status (coordinator)
router.put('/events/:eventId/registrations-status', isCoordinatorOrAdmin, eventController.toggleRegistrationStatus);

export default router;
