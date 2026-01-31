import { dbGet, dbAll, dbRun } from '../database.js';

// Register for an event
const registerEvent = async (req, res) => {
  try {
    const { eventId, ticketTypeId, registrationType, teamName, teamMembers } = req.body;
    const userId = req.userId; // From auth middleware

    // Check if user already registered
    const existing = await dbGet(
      'SELECT * FROM registrations WHERE eventId = ? AND userId = ?',
      [eventId, userId]
    );

    if (existing) {
      return res.status(400).json({ success: false, error: 'Already registered for this event' });
    }

    // Check ticket availability
    if (ticketTypeId) {
      const ticket = await dbGet('SELECT * FROM ticket_types WHERE id = ? AND eventId = ?', [ticketTypeId, eventId]);
      if (!ticket || ticket.available <= 0) {
        return res.status(400).json({ success: false, error: 'Ticket not available' });
      }

      // Update ticket availability
      await dbRun('UPDATE ticket_types SET available = available - 1 WHERE id = ?', [ticketTypeId]);
    }

    // Create registration
    const result = await dbRun(
      `INSERT INTO registrations (eventId, userId, ticketTypeId, registrationType, teamName, teamMembers)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [eventId, userId, ticketTypeId || null, registrationType, teamName, JSON.stringify(teamMembers || [])]
    );

    // Update event registration count
    await dbRun('UPDATE events SET totalRegistrations = totalRegistrations + 1 WHERE id = ?', [eventId]);

    // Create notification
    const event = await dbGet('SELECT title FROM events WHERE id = ?', [eventId]);
    await dbRun(
      `INSERT INTO notifications (userId, eventId, title, message, type)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, eventId, 'Registration Confirmed', `You have successfully registered for ${event.title}`, 'confirmation']
    );

    res.json({ success: true, data: { registrationId: result.id } });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user registrations
const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    const registrations = await dbAll(
      `SELECT r.*, e.title, e.date, e.time, e.venue, e.image, e.category, e.status
       FROM registrations r
       JOIN events e ON r.eventId = e.id
       WHERE r.userId = ?
       ORDER BY e.date DESC`,
      [userId]
    );

    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get event registrations (for organizers/admins)
const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await dbAll(
      `SELECT r.*, u.email, u.name
       FROM registrations r
       JOIN users u ON r.userId = u.id
       WHERE r.eventId = ?
       ORDER BY r.registeredAt DESC`,
      [eventId]
    );

    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await dbGet('SELECT * FROM registrations WHERE id = ?', [registrationId]);
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    // Delete registration
    await dbRun('DELETE FROM registrations WHERE id = ?', [registrationId]);

    // Return ticket to available pool
    if (registration.ticketTypeId) {
      await dbRun('UPDATE ticket_types SET available = available + 1 WHERE id = ?', [registration.ticketTypeId]);
    }

    // Update event count
    await dbRun('UPDATE events SET totalRegistrations = totalRegistrations - 1 WHERE id = ?', [registration.eventId]);

    res.json({ success: true, message: 'Registration cancelled' });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export participants as CSV
const exportParticipantList = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await dbAll(
      `SELECT r.*, u.email, u.name
       FROM registrations r
       JOIN users u ON r.userId = u.id
       WHERE r.eventId = ?`,
      [eventId]
    );

    // Create CSV
    let csv = 'Name,Email,Registration Type,Team Name,Registered Date\n';
    registrations.forEach(reg => {
      csv += `"${reg.name}","${reg.email}","${reg.registrationType}","${reg.teamName || ''}","${reg.registeredAt}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting registrations:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { registerEvent, getUserRegistrations, getEventRegistrations, cancelRegistration, exportParticipantList };
