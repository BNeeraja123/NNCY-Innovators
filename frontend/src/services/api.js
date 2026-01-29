const API_BASE = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove auth token
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// API helper function
const apiCall = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API Error');
    }

    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// ============ EVENT APIS ============

export const eventAPI = {
  // Get all events with filters
  getEvents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/events?${query}`);
  },

  // Get event by slug
  getEventBySlug: (slug) => apiCall(`/events/${slug}`),

  // Get event by ID
  getEventById: (id) => apiCall(`/events/id/${id}`),

  // Create event (organizer/admin)
  createEvent: (eventData) =>
    apiCall('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),

  // Update event
  updateEvent: (id, eventData) =>
    apiCall(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),

  // Delete event
  deleteEvent: (id) =>
    apiCall(`/events/${id}`, { method: 'DELETE' }),

  // Get event stats
  getEventStats: (id) => apiCall(`/events/${id}/stats`),
};

// ============ REGISTRATION APIS ============

export const registrationAPI = {
  // Register for event
  registerEvent: (registrationData) =>
    apiCall('/register', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    }),

  // Get user's registrations
  getUserRegistrations: () => apiCall('/my-registrations'),

  // Get event registrations (organizer/admin)
  getEventRegistrations: (eventId) =>
    apiCall(`/events/${eventId}/registrations`),

  // Cancel registration
  cancelRegistration: (registrationId) =>
    apiCall(`/registrations/${registrationId}`, { method: 'DELETE' }),

  // Export participant list
  exportParticipantList: (eventId) => apiCall(`/events/${eventId}/export-participants`),
};

// ============ AUTH APIS ============

export const authAPI = {
  // Login
  login: (credentials) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Register
  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Get profile
  getProfile: () => apiCall('/auth/profile'),

  // Update profile
  updateProfile: (userData) =>
    apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

// ============ NOTIFICATION APIS ============

export const notificationAPI = {
  // Get notifications
  getNotifications: () => apiCall('/notifications'),

  // Mark as read
  markAsRead: (notificationId) =>
    apiCall(`/notifications/${notificationId}/read`, { method: 'PUT' }),

  // Get unread count
  getUnreadCount: () => apiCall('/notifications/unread-count'),
};

// ============ GALLERY APIS ============

export const galleryAPI = {
  // Get event gallery
  getEventGallery: (eventId) => apiCall(`/events/${eventId}/gallery`),

  // Upload image
  uploadImage: (eventId, imageData) =>
    apiCall(`/events/${eventId}/gallery`, {
      method: 'POST',
      body: JSON.stringify(imageData),
    }),

  // Delete image
  deleteImage: (imageId) =>
    apiCall(`/gallery/${imageId}`, { method: 'DELETE' }),
};

// Export token management functions
export { getAuthToken, setAuthToken, removeAuthToken };
