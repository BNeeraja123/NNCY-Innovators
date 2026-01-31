import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventsRoutes } from './routes/events.js';
import { clubRoutes } from './routes/club.js';
import { db } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Event Management Routes
eventsRoutes(app);

// Club Management Routes
app.use('/api/clubs', clubRoutes);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  db.close((err) => {
    if (err) console.error('Error closing database:', err);
    else console.log('Database connection closed');
    process.exit(0);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Event Management APIs available at http://localhost:${PORT}/api/events`);
  console.log(`Club Management APIs available at http://localhost:${PORT}/api/clubs`);
  console.log(`Database initialized`);
});

