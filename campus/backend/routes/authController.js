import { dbGet, dbRun } from '../database.js';
import bcryptjs from 'bcryptjs';

const DEMO_USERS = [
  { email: 'student1@college.edu', password: 'password123', name: 'Student One', role: 'student' },
  { email: 'student2@college.edu', password: 'password123', name: 'Student Two', role: 'student' },
  { email: 'organizer@college.edu', password: 'password123', name: 'Event Organizer', role: 'organizer' },
  { email: 'admin@college.edu', password: 'password123', name: 'Admin User', role: 'admin' }
];

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check demo users first (for testing)
    const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (demoUser) {
      return res.json({
        success: true,
        user: {
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role
        },
        token: 'demo-token-' + email
      });
    }

    // Check database
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: 'token-' + user.id
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { email, password, name, role = 'student' } = req.body;

    // Check if user exists
    const existing = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const result = await dbRun(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, role]
    );

    res.json({
      success: true,
      data: {
        id: result.id,
        email,
        name,
        role
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    const user = await dbGet('SELECT id, email, name, role, createdAt FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const { name } = req.body;

    await dbRun('UPDATE users SET name = ? WHERE id = ?', [name, userId]);

    res.json({ success: true, message: 'Profile updated' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { loginUser, registerUser, getUserProfile, updateUserProfile };
