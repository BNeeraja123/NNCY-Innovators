# ⚡ Quick Start Guide

## 30-Second Setup

### Terminal 1: Start Backend
```bash
cd campus/backend
node server.js
```
You should see: `Server running on http://localhost:5000`

### Terminal 2: Start Frontend
```bash
cd campus/frontend
npm run dev
```
You should see: `Local: http://localhost:3000`

### Open Browser
Go to `http://localhost:3000` - App is ready!

---

## First Time Only: Database Setup

Before starting the application for the first time, seed the database:

```bash
cd campus/backend
node seed.js
```

This creates sample events and test users in `events.db`.

---

## Demo Login Credentials

**Student User:**
- Email: `student1@college.edu`
- Password: `password123`

---

## What to Try

1. **Browse Events** - Go to `/events` page
   - Try grid/list view toggle
   - Filter by category
   - Search for "code" or "robo"
   - Click an event to see details

2. **View Event Details**
   - Check gallery photos
   - See organizer info
   - Try the share button

3. **Register for Event** (requires login)
   - Login first with demo credentials
   - Open an upcoming event
   - Click on a ticket type
   - Fill registration form
   - Submit registration

---

## Key Files Modified

- `frontend/src/pages/EventDetail.jsx` - Event detail page with registration
- `frontend/src/pages/EventsListing.jsx` - Dynamic event list with filters
- `frontend/src/components/EventFilterBar.jsx` - Search & filter controls
- `frontend/src/services/api.js` - Centralized API client
- `backend/database.js` - SQLite schema
- `backend/server.js` - Express server with routes
- `backend/routes/eventsController.js` - Event API endpoints
- `backend/routes/registrationController.js` - Registration API endpoints
- `backend/seed.js` - Sample data generator

---

## Features Ready to Use

✅ Dynamic event listings with pagination
✅ Search, filter (category, status), sort events  
✅ Event detail pages with gallery
✅ Event registration form (foundation)
✅ User login with JWT authentication
✅ Responsive mobile design
✅ API-first architecture with 27+ endpoints

---

## Quick API Tests

Open your browser console and try:

```javascript
// Fetch all events
fetch('http://localhost:5000/api/events?limit=5')
  .then(r => r.json())
  .then(data => console.log(data))

// Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student1@college.edu',
    password: 'password123'
  })
}).then(r => r.json()).then(data => console.log(data))
```

---

## Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| Backend won't start | Check port 5000 not in use: `netstat -ano \| findstr :5000` |
| Events not loading | Run: `node seed.js` in backend directory |
| API errors in console | Check backend terminal for error messages |
| Login not working | Use exact credentials: `student1@college.edu` / `password123` |
| Fresh start needed | Delete backend/events.db and run `node seed.js` again |

---

## Next Steps

See `IMPLEMENTATION_GUIDE.md` for:
- Complete feature documentation
- Database schema details
- All API endpoint specifications
- Advanced configuration
- Deployment instructions

---

Happy testing! 🚀
