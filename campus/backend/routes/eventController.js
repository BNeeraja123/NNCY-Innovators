// Backend Event Coordinator Controller
// Handles all CRUD operations for event management

// In-memory data storage (ready for database migration)
let eventsData = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    slug: 'tech-conference-2024',
    description: 'Annual technology conference for students',
    category: 'Tech',
    image: '/images/events/tech-conference.jpg',
    date: '2024-03-15',
    endDate: '2024-03-16',
    time: '09:00',
    endTime: '17:00',
    venue: 'Main Auditorium',
    venueCapacity: 500,
    organizerId: 1,
    status: 'Upcoming',
    registrationDeadline: '2024-03-10',
    registrationStatus: 'open',
    totalRegistrations: 245,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    updatedBy: 'Event Coordinator',
    fullDescription: 'A comprehensive conference featuring industry experts',
    rules: 'Be punctual, maintain decorum',
    eligibility: 'All students welcome',
    prizes: '1st Prize: Rs. 10,000',
    requirements: 'Valid college ID',
    coordinatorName: 'Event Coordinator',
    coordinatorEmail: 'eventcoord@college.edu',
    coordinatorPhone: '9876543210'
  }
];

let registrationsData = [
  {
    id: 1,
    eventId: 1,
    userId: 101,
    userName: 'Raj Kumar',
    userEmail: 'raj@college.edu',
    registrationType: 'Individual',
    teamName: '',
    teamMembers: [],
    status: 'confirmed',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    eventId: 1,
    userId: 102,
    userName: 'Priya Singh',
    userEmail: 'priya@college.edu',
    registrationType: 'Individual',
    teamName: '',
    teamMembers: [],
    status: 'pending',
    createdAt: '2024-01-11T10:00:00Z'
  }
];

// Get all events (with optional filters)
export const getAllEvents = (req, res) => {
  try {
    const { category, status, search, sortBy } = req.query;
    let filtered = [...eventsData];

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(e => e.category === category);
    }

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter(e => e.status === status);
    }

    // Search by title or description
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
};

// Get single event by ID
export const getEventById = (req, res) => {
  try {
    const { eventId } = req.params;
    const event = eventsData.find(e => e.id === parseInt(eventId));

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch event', error: error.message });
  }
};

// Create new event
export const createEvent = (req, res) => {
  try {
    const { title, category, description, date, time, endDate, endTime, venue, venueCapacity, registrationDeadline, status, fullDescription, rules, eligibility, prizes, requirements, coordinatorName, coordinatorEmail, coordinatorPhone } = req.body;

    // Validation
    if (!title || !description || !date || !time || !venue || !venueCapacity || !registrationDeadline) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    const newEvent = {
      id: Math.max(...eventsData.map(e => e.id), 0) + 1,
      title,
      slug,
      description,
      category: category || 'Other',
      image: '/images/events/default.jpg',
      date,
      endDate: endDate || date,
      time,
      endTime: endTime || time,
      venue,
      venueCapacity: parseInt(venueCapacity),
      organizerId: req.user?.id || 1,
      status: status || 'Upcoming',
      registrationDeadline,
      registrationStatus: 'open',
      totalRegistrations: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: coordinatorName || 'Event Coordinator',
      fullDescription: fullDescription || '',
      rules: rules || '',
      eligibility: eligibility || '',
      prizes: prizes || '',
      requirements: requirements || '',
      coordinatorName: coordinatorName || 'Event Coordinator',
      coordinatorEmail: coordinatorEmail || '',
      coordinatorPhone: coordinatorPhone || ''
    };

    eventsData.push(newEvent);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Failed to create event', error: error.message });
  }
};

// Update event
export const updateEvent = (req, res) => {
  try {
    const { eventId } = req.params;
    const updates = req.body;

    const eventIndex = eventsData.findIndex(e => e.id === parseInt(eventId));

    if (eventIndex === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if coordinator owns the event
    const event = eventsData[eventIndex];
    if (event.organizerId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    const updatedEvent = {
      ...eventsData[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: updates.coordinatorName || eventsData[eventIndex].updatedBy
    };

    eventsData[eventIndex] = updatedEvent;

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, message: 'Failed to update event', error: error.message });
  }
};

// Delete event
export const deleteEvent = (req, res) => {
  try {
    const { eventId } = req.params;

    const eventIndex = eventsData.findIndex(e => e.id === parseInt(eventId));

    if (eventIndex === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if coordinator owns the event
    const event = eventsData[eventIndex];
    if (event.organizerId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    const deletedEvent = eventsData.splice(eventIndex, 1)[0];

    // Also delete associated registrations
    registrationsData = registrationsData.filter(r => r.eventId !== parseInt(eventId));

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: deletedEvent
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, message: 'Failed to delete event', error: error.message });
  }
};

// Get registrations for an event
export const getEventRegistrations = (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.query;

    // Check if event exists and coordinator has access
    const event = eventsData.find(e => e.id === parseInt(eventId));
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizerId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view registrations' });
    }

    let registrations = registrationsData.filter(r => r.eventId === parseInt(eventId));

    // Filter by status if provided
    if (status && status !== 'all') {
      registrations = registrations.filter(r => r.status === status);
    }

    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registrations', error: error.message });
  }
};

// Update registration status
export const updateRegistrationStatus = (req, res) => {
  try {
    const { eventId, registrationId } = req.params;
    const { status } = req.body;

    // Check if event exists and coordinator has access
    const event = eventsData.find(e => e.id === parseInt(eventId));
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizerId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update registrations' });
    }

    const registration = registrationsData.find(r => r.id === parseInt(registrationId) && r.eventId === parseInt(eventId));

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    registration.status = status;

    res.status(200).json({
      success: true,
      message: 'Registration status updated',
      data: registration
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ success: false, message: 'Failed to update registration', error: error.message });
  }
};

// Get event statistics
export const getEventStats = (req, res) => {
  try {
    const { eventId } = req.params;

    const event = eventsData.find(e => e.id === parseInt(eventId));
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check authorization
    if (event.organizerId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const registrations = registrationsData.filter(r => r.eventId === parseInt(eventId));
    const stats = {
      totalRegistrations: registrations.length,
      confirmedRegistrations: registrations.filter(r => r.status === 'confirmed').length,
      pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
      cancelledRegistrations: registrations.filter(r => r.status === 'cancelled').length,
      venueCapacity: event.venueCapacity,
      availableSeats: event.venueCapacity - registrations.filter(r => r.status === 'confirmed').length
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching event stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics', error: error.message });
  }
};

// Close/reopen event registrations
export const toggleRegistrationStatus = (req, res) => {
  try {
    const { eventId } = req.params;
    const { registrationStatus } = req.body;

    const event = eventsData.find(e => e.id === parseInt(eventId));
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check authorization
    if (event.organizerId !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    event.registrationStatus = registrationStatus;
    event.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: `Registrations ${registrationStatus === 'open' ? 'opened' : 'closed'}`,
      data: event
    });
  } catch (error) {
    console.error('Error toggling registration status:', error);
    res.status(500).json({ success: false, message: 'Failed to update registration status', error: error.message });
  }
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
  updateRegistrationStatus,
  getEventStats,
  toggleRegistrationStatus
};
