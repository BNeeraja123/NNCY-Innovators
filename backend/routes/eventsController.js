import { dbGet, dbAll, dbRun } from '../database.js';

// Get all events with pagination and filters
const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, search, sortBy = 'date' } = req.query;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM events WHERE 1=1';
    let countSql = 'SELECT COUNT(*) as total FROM events WHERE 1=1';
    const params = [];

    // Filters
    if (category && category !== 'all') {
      sql += ' AND category = ?';
      countSql += ' AND category = ?';
      params.push(category);
    }

    if (status && status !== 'all') {
      sql += ' AND status = ?';
      countSql += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      countSql += ' AND (title LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Sorting
    if (sortBy === 'date') {
      sql += ' ORDER BY date ASC';
    } else if (sortBy === 'popularity') {
      sql += ' ORDER BY totalRegistrations DESC';
    } else if (sortBy === 'name') {
      sql += ' ORDER BY title ASC';
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const events = await dbAll(sql, params);
    const countResult = await dbGet(countSql, params.slice(0, -2));
    const total = countResult.total;

    res.json({
      success: true,
      data: events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single event with details
const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await dbGet('SELECT * FROM events WHERE slug = ?', [slug]);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    const details = await dbGet('SELECT * FROM event_details WHERE eventId = ?', [event.id]);
    const tickets = await dbAll('SELECT * FROM ticket_types WHERE eventId = ?', [event.id]);
    const gallery = await dbAll('SELECT * FROM gallery_images WHERE eventId = ?', [event.id]);
    const registrationCount = await dbGet(
      'SELECT COUNT(*) as count FROM registrations WHERE eventId = ?',
      [event.id]
    );

    res.json({
      success: true,
      data: {
        ...event,
        details,
        tickets,
        gallery,
        registrations: registrationCount.count
      }
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await dbGet('SELECT * FROM events WHERE id = ?', [id]);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    const details = await dbGet('SELECT * FROM event_details WHERE eventId = ?', [event.id]);
    const tickets = await dbAll('SELECT * FROM ticket_types WHERE eventId = ?', [event.id]);
    const gallery = await dbAll('SELECT * FROM gallery_images WHERE eventId = ?', [event.id]);

    res.json({
      success: true,
      data: {
        ...event,
        details,
        tickets,
        gallery
      }
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create event (organizer/admin)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      image,
      date,
      endDate,
      time,
      endTime,
      venue,
      venueCapacity,
      registrationDeadline,
      details
    } = req.body;

    const userId = req.userId; // From auth middleware

    const result = await dbRun(
      `INSERT INTO events (title, slug, description, category, image, date, endDate, time, endTime, venue, venueCapacity, organizerId, registrationDeadline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, description, category, image, date, endDate, time, endTime, venue, venueCapacity, userId, registrationDeadline]
    );

    if (details) {
      await dbRun(
        `INSERT INTO event_details (eventId, fullDescription, rules, eligibility, coordinatorName, coordinatorEmail, coordinatorPhone, prizes, requirements, schedule, tags, certificateProvided, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          result.id,
          details.fullDescription,
          details.rules,
          details.eligibility,
          details.coordinatorName,
          details.coordinatorEmail,
          details.coordinatorPhone,
          JSON.stringify(details.prizes),
          JSON.stringify(details.requirements),
          JSON.stringify(details.schedule),
          JSON.stringify(details.tags),
          details.certificateProvided ? 1 : 0,
          details.featured ? 1 : 0
        ]
      );
    }

    res.json({ success: true, data: { id: result.id } });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, date, time, venue, status, registrationStatus, details } = req.body;

    await dbRun(
      `UPDATE events SET title = ?, description = ?, category = ?, date = ?, time = ?, venue = ?, status = ?, registrationStatus = ? WHERE id = ?`,
      [title, description, category, date, time, venue, status, registrationStatus, id]
    );

    if (details) {
      await dbRun(
        `UPDATE event_details SET fullDescription = ?, rules = ?, eligibility = ?, coordinatorName = ?, coordinatorEmail = ?, coordinatorPhone = ? WHERE eventId = ?`,
        [details.fullDescription, details.rules, details.eligibility, details.coordinatorName, details.coordinatorEmail, details.coordinatorPhone, id]
      );
    }

    res.json({ success: true, message: 'Event updated' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await dbRun('DELETE FROM registrations WHERE eventId = ?', [id]);
    await dbRun('DELETE FROM gallery_images WHERE eventId = ?', [id]);
    await dbRun('DELETE FROM ticket_types WHERE eventId = ?', [id]);
    await dbRun('DELETE FROM event_details WHERE eventId = ?', [id]);
    await dbRun('DELETE FROM events WHERE id = ?', [id]);

    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get event statistics
const getEventStats = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await dbGet('SELECT * FROM events WHERE id = ?', [id]);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    const registrations = await dbAll(
      'SELECT * FROM registrations WHERE eventId = ?',
      [id]
    );

    const stats = {
      totalRegistrations: registrations.length,
      registrationsByType: {},
      participantList: registrations
    };

    registrations.forEach(reg => {
      const type = reg.registrationType;
      stats.registrationsByType[type] = (stats.registrationsByType[type] || 0) + 1;
    });

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching event stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getEvents, getEventBySlug, getEventById, createEvent, updateEvent, deleteEvent, getEventStats };
