import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'events.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database at', dbPath);
    initializeDatabase();
  }
});

const initializeDatabase = () => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Events table
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      date DATE NOT NULL,
      endDate DATE,
      time TEXT NOT NULL,
      endTime TEXT,
      venue TEXT NOT NULL,
      venueCapacity INTEGER,
      organizerId INTEGER,
      status TEXT DEFAULT 'upcoming',
      registrationDeadline DATE,
      registrationStatus TEXT DEFAULT 'open',
      totalRegistrations INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organizerId) REFERENCES users(id)
    )
  `);

  // Event Details table (for extended info)
  db.run(`
    CREATE TABLE IF NOT EXISTS event_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER NOT NULL UNIQUE,
      fullDescription TEXT,
      rules TEXT,
      eligibility TEXT,
      coordinatorName TEXT,
      coordinatorEmail TEXT,
      coordinatorPhone TEXT,
      prizes TEXT,
      requirements TEXT,
      schedule TEXT,
      tags TEXT,
      certificateProvided BOOLEAN DEFAULT 0,
      featured BOOLEAN DEFAULT 0,
      FOREIGN KEY (eventId) REFERENCES events(id)
    )
  `);

  // Ticket Types table
  db.run(`
    CREATE TABLE IF NOT EXISTS ticket_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL DEFAULT 0,
      available INTEGER,
      total INTEGER,
      FOREIGN KEY (eventId) REFERENCES events(id)
    )
  `);

  // Registrations table
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      ticketTypeId INTEGER,
      registrationType TEXT DEFAULT 'individual',
      teamName TEXT,
      teamMembers TEXT,
      status TEXT DEFAULT 'confirmed',
      registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eventId) REFERENCES events(id),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (ticketTypeId) REFERENCES ticket_types(id)
    )
  `);

  // Gallery Images table
  db.run(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER NOT NULL,
      image TEXT NOT NULL,
      title TEXT NOT NULL,
      type TEXT DEFAULT 'memory',
      caption TEXT,
      uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eventId) REFERENCES events(id)
    )
  `);

  // Notifications table
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      eventId INTEGER,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info',
      read BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (eventId) REFERENCES events(id)
    )
  `);

  console.log('Database tables initialized');
};

// Promisify database operations
const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export { db, dbGet, dbAll, dbRun };
