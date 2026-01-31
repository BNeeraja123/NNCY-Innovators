// Event Management API Routes
import * as eventController from './eventsController.js';
import * as registrationController from './registrationController.js';
import * as authController from './authController.js';
import * as notificationController from './notificationController.js';
import { authMiddleware } from './middleware.js';

export const eventsRoutes = (app) => {
  // ============= EVENT ROUTES =============
  // Get all events with filters and pagination
  app.get('/api/events', eventController.getEvents);

  // Get event by ID
  app.get('/api/events/id/:id', eventController.getEventById);

  // Get event by slug
  app.get('/api/events/:slug', eventController.getEventBySlug);

  // Get event statistics (for organizers/admins)
  app.get('/api/events/:id/stats', authMiddleware, eventController.getEventStats);

  // Create event (organizer/admin)
  app.post('/api/events', authMiddleware, eventController.createEvent);

  // Update event (organizer/admin)
  app.put('/api/events/:id', authMiddleware, eventController.updateEvent);

  // Delete event (organizer/admin)
  app.delete('/api/events/:id', authMiddleware, eventController.deleteEvent);

  // ============= REGISTRATION ROUTES =============
  // Register for event
  app.post('/api/register', authMiddleware, registrationController.registerEvent);

  // Get user registrations
  app.get('/api/my-registrations', authMiddleware, registrationController.getUserRegistrations);

  // Get event registrations (organizer/admin)
  app.get('/api/events/:eventId/registrations', authMiddleware, registrationController.getEventRegistrations);

  // Cancel registration
  app.delete('/api/registrations/:registrationId', authMiddleware, registrationController.cancelRegistration);

  // Export participant list as CSV
  app.get('/api/events/:eventId/export-participants', authMiddleware, registrationController.exportParticipantList);

  // ============= AUTH ROUTES =============
  // Login
  app.post('/api/auth/login', authController.loginUser);

  // Register
  app.post('/api/auth/register', authController.registerUser);

  // Get user profile
  app.get('/api/auth/profile', authMiddleware, authController.getUserProfile);

  // Update user profile
  app.put('/api/auth/profile', authMiddleware, authController.updateUserProfile);

  // ============= NOTIFICATION ROUTES =============
  // Get user notifications
  app.get('/api/notifications', authMiddleware, notificationController.getNotifications);

  // Mark notification as read
  app.put('/api/notifications/:notificationId/read', authMiddleware, notificationController.markNotificationRead);

  // Get unread count
  app.get('/api/notifications/unread-count', authMiddleware, notificationController.getUnreadCount);

  // ============= GALLERY ROUTES =============
  // Get event gallery
  app.get('/api/events/:eventId/gallery', notificationController.getEventGallery);

  // Upload gallery image
  app.post('/api/events/:eventId/gallery', authMiddleware, notificationController.uploadGalleryImage);


  // Delete gallery image
  app.delete('/api/gallery/:imageId', authMiddleware, notificationController.deleteGalleryImage);

  console.log('Event Management API routes loaded');
};
