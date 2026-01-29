<<<<<<< HEAD
# Campus Event Management System - Implementation Guide

## Overview
This document outlines the comprehensive event management system transformation from a static application to a fully dynamic, database-driven platform.

## ✅ Completed Features

### 1. **Dynamic Event Listings with Pagination**
- Events fetched from SQLite database via REST API
- Pagination: 10 events per page (configurable)
- Grid and List view modes
- Loading and error states
- Responsive design for mobile and desktop

**Files Involved:**
- Frontend: `src/pages/EventsListing.jsx`
- Backend: `routes/eventsController.js` (getEvents function)

### 2. **Search, Filter & Sort Functionality**
- **Search**: Full-text search across event title, description, venue
- **Filters**:
  - By Category (Technical, Cultural, Sports, etc.)
  - By Status (Upcoming, Ongoing, Completed, Cancelled)
  - By Date Range (future implementation)
- **Sort Options**: By Date (ASC/DESC), Popularity, Name
- Real-time filter application with URL state preservation

**Files Involved:**
- Frontend: `src/components/EventFilterBar.jsx`, `src/pages/EventsListing.jsx`
- Backend: Query parameters in `/api/events` endpoint

### 3. **Event Detail Pages**
- Complete event information display
- Event image hero section
- Quick info cards (Date, Time, Venue, Capacity)
- Full description and Rules & Eligibility sections
- Gallery section for completed events (Winners & Memory photos)
- Organizer/Coordinator information card
- Responsive layout with sidebar registration card

**Files Involved:**
- Frontend: `src/pages/EventDetail.jsx`
- Backend: `routes/eventsController.js` (getEventById, getEventBySlug functions)

### 4. **Event Registration System (Foundation)**
- Registration modal in Event Detail page
- Support for Individual and Team registration
- Ticket type selection with availability tracking
- Team name and member names input for team registrations
- Registration form validation
- Loading states during submission

**Files Involved:**
- Frontend: `src/pages/EventDetail.jsx`
- Backend: `routes/registrationController.js` (registerEvent function)

### 5. **User Login & Authentication**
- Student-only login (removed organizer/admin login UI)
- JWT token-based authentication (24-hour expiration)
- Token stored in localStorage
- Auth middleware for protected routes
- Demo users for testing:
  - student1@college.edu / password123
  - student2@college.edu / password123
  - student3@college.edu / password123

**Files Involved:**
- Frontend: `src/pages/Login.jsx`, `src/services/api.js`
- Backend: `routes/authController.js`, `routes/middleware.js`

### 6. **API Service Layer**
- Centralized API client for all backend communication
- Automatic token injection in Authorization headers
- Methods for: Events, Registrations, Authentication, Notifications, Gallery
- Consistent error handling
- Support for all CRUD operations

**Files Involved:**
- Frontend: `src/services/api.js`

### 7. **Database Architecture**
- SQLite3 database (`events.db`) with 7 tables:
  - **users**: Student and organizer accounts
  - **events**: Event details, status, capacity, dates
  - **tickets**: Ticket types with pricing and availability
  - **registrations**: User event registrations with status tracking
  - **notifications**: Event-related notifications for users
  - **gallery_images**: Event photos (winners, memories) with captions
  - **certificates**: Digital certificates for event participation

**Files Involved:**
- Backend: `database.js` (Schema initialization)

### 8. **Backend API Endpoints** (27+ endpoints)

#### Event Management
- `GET /api/events` - List events with filters/pagination
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/:slug` - Get event by slug
- `GET /api/events/:id/stats` - Event statistics
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

#### Registration
- `POST /api/register` - Register for event (protected)
- `GET /api/my-registrations` - Get user's registrations (protected)
- `GET /api/events/:eventId/registrations` - Get event registrations (protected)
- `DELETE /api/registrations/:registrationId` - Cancel registration (protected)
- `GET /api/events/:eventId/export-participants` - Export CSV (protected)

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

#### Notifications
- `GET /api/notifications` - Get user notifications (protected)
- `PUT /api/notifications/:id` - Mark as read (protected)
- `GET /api/notifications/unread-count` - Unread count (protected)

#### Gallery
- `GET /api/events/:eventId/gallery` - Get event gallery
- `POST /api/events/:eventId/gallery` - Upload gallery image (protected)
- `DELETE /api/events/:eventId/gallery/:imageId` - Delete image (protected)

## 🚀 How to Run the Application

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- SQLite3 (included via npm)

### Setup Instructions

1. **Install Backend Dependencies**
   ```bash
   cd campus/backend
   npm install
   ```

2. **Seed Database with Sample Data**
   ```bash
   cd campus/backend
   node seed.js
   ```
   This creates `events.db` with 6 sample events and test users.

3. **Start Backend Server**
   ```bash
   cd campus/backend
   node server.js
   ```
   Backend will run on `http://localhost:5000`

4. **Install Frontend Dependencies** (in another terminal)
   ```bash
   cd campus/frontend
   npm install
   ```

5. **Start Frontend Dev Server**
   ```bash
   cd campus/frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

6. **Access the Application**
   - Open browser to `http://localhost:3000`
   - Use demo credentials to login (or skip login to browse events)

## 📋 Testing the System

### Test Login
1. Go to Login page
2. Enter credentials:
   - Email: `student1@college.edu`
   - Password: `password123`
3. Verify token is stored in localStorage (F12 → Application → Local Storage)

### Test Events Discovery
1. Go to Events page (`/events`)
2. Try filtering by category
3. Try searching for "code" or "robo"
4. Try different view modes (Grid/List)
5. Try status filters (Upcoming/Ongoing/Completed)

### Test Event Details
1. Click on any event card
2. Verify event information loads
3. Check gallery section for completed events
4. Click "Share Event" button to test sharing

### Test Registration (requires login)
1. Login with demo credentials
2. Open an upcoming event
3. Click "Register Now" on ticket type
4. Fill registration form
5. Select Individual or Team registration
6. Click Confirm (will show success alert once backend is running properly)

## 🔧 Environment Configuration

### Backend `.env` file (optional)
```
PORT=5000
NODE_ENV=development
```

### Frontend API Configuration
Update `src/services/api.js` if backend runs on different host/port:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📁 Project Structure

```
campus/
├── backend/
│   ├── database.js           # SQLite initialization and schema
│   ├── server.js             # Express server entry point
│   ├── seed.js               # Database seeding script
│   ├── package.json
│   ├── events.db             # SQLite database (auto-created)
│   └── routes/
│       ├── events.js         # Route definitions
│       ├── eventsController.js
│       ├── registrationController.js
│       ├── authController.js
│       ├── notificationController.js
│       └── middleware.js     # Auth middleware
│
└── frontend/
    ├── src/
    │   ├── services/api.js   # Centralized API client
    │   ├── pages/
    │   │   ├── EventDetail.jsx
    │   │   ├── EventsListing.jsx
    │   │   ├── Login.jsx
    │   │   ├── MyEvents.jsx
    │   │   ├── Home.jsx
    │   │   └── ...
    │   └── components/
    │       ├── EventCard.jsx
    │       ├── EventFilterBar.jsx
    │       ├── Navbar.jsx
    │       └── ...
    └── package.json
```

## 🔐 Security Features Implemented

1. **JWT Authentication**: 24-hour token expiration
2. **Password Hashing**: bcryptjs with salt rounds = 10
3. **Protected Routes**: `/api/*` endpoints require valid JWT
4. **CORS Enabled**: Cross-origin requests allowed for localhost:3000
5. **Input Validation**: Query parameters validated in controllers

## ⚠️ Known Limitations & Future Work

### Currently Limited (Placeholder/Foundation):
- Email notifications not yet implemented
- Gallery upload UI not fully connected to backend
- Admin controls for event creation/deletion
- PDF certificate generation
- QR code generation for attendance
- Real-time notifications
- Event date filtering by range
- Advanced search (combined filters)

### Next Priority Tasks:
1. Complete gallery upload UI integration
2. Create MyRegisteredEvents page with API integration
3. Build notification UI components
4. Implement event creation form for organizers
5. Add CSV participant export UI
6. Implement error toast notifications
7. Add event sharing with social media
8. Implement search suggestions

## 🐛 Troubleshooting

### Issue: Backend connection error
**Solution**: 
- Ensure backend is running: `node server.js` in backend directory
- Check if port 5000 is available: `netstat -ano | findstr :5000`
- Clear browser cache and reload

### Issue: Events not loading
**Solution**:
- Verify database was seeded: `node seed.js`
- Check browser console (F12) for API errors
- Verify backend logs for error messages
- Check network tab to see API responses

### Issue: Login not working
**Solution**:
- Verify demo credentials are correct
- Check localStorage for authToken (F12 → Storage → LocalStorage)
- Check network tab for 401 errors
- Clear localStorage and try again

### Issue: npm install fails
**Solution**:
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm cache clean --force`
- Run `npm install` again

## 📊 Database Queries

### View all events in database
```sql
SELECT * FROM events;
```

### View registered users
```sql
SELECT * FROM users;
```

### View registrations for an event
```sql
SELECT r.*, u.name, u.email FROM registrations r 
JOIN users u ON r.userId = u.id 
WHERE r.eventId = 1;
```

### View gallery images for an event
```sql
SELECT * FROM gallery_images WHERE eventId = 1;
```

## 📞 Support

For issues or questions:
1. Check browser console (F12 → Console tab) for errors
2. Check backend logs in terminal
3. Verify both servers are running
4. Try clearing browser cache and localStorage

---

**Last Updated**: January 2026
**System Status**: Development/Testing
**API Version**: 1.0
=======
# Campus Event Management System - Implementation Guide

## Overview
This document outlines the comprehensive event management system transformation from a static application to a fully dynamic, database-driven platform.

## ✅ Completed Features

### 1. **Dynamic Event Listings with Pagination**
- Events fetched from SQLite database via REST API
- Pagination: 10 events per page (configurable)
- Grid and List view modes
- Loading and error states
- Responsive design for mobile and desktop

**Files Involved:**
- Frontend: `src/pages/EventsListing.jsx`
- Backend: `routes/eventsController.js` (getEvents function)

### 2. **Search, Filter & Sort Functionality**
- **Search**: Full-text search across event title, description, venue
- **Filters**:
  - By Category (Technical, Cultural, Sports, etc.)
  - By Status (Upcoming, Ongoing, Completed, Cancelled)
  - By Date Range (future implementation)
- **Sort Options**: By Date (ASC/DESC), Popularity, Name
- Real-time filter application with URL state preservation

**Files Involved:**
- Frontend: `src/components/EventFilterBar.jsx`, `src/pages/EventsListing.jsx`
- Backend: Query parameters in `/api/events` endpoint

### 3. **Event Detail Pages**
- Complete event information display
- Event image hero section
- Quick info cards (Date, Time, Venue, Capacity)
- Full description and Rules & Eligibility sections
- Gallery section for completed events (Winners & Memory photos)
- Organizer/Coordinator information card
- Responsive layout with sidebar registration card

**Files Involved:**
- Frontend: `src/pages/EventDetail.jsx`
- Backend: `routes/eventsController.js` (getEventById, getEventBySlug functions)

### 4. **Event Registration System (Foundation)**
- Registration modal in Event Detail page
- Support for Individual and Team registration
- Ticket type selection with availability tracking
- Team name and member names input for team registrations
- Registration form validation
- Loading states during submission

**Files Involved:**
- Frontend: `src/pages/EventDetail.jsx`
- Backend: `routes/registrationController.js` (registerEvent function)

### 5. **User Login & Authentication**
- Student-only login (removed organizer/admin login UI)
- JWT token-based authentication (24-hour expiration)
- Token stored in localStorage
- Auth middleware for protected routes
- Demo users for testing:
  - student1@college.edu / password123
  - student2@college.edu / password123
  - student3@college.edu / password123

**Files Involved:**
- Frontend: `src/pages/Login.jsx`, `src/services/api.js`
- Backend: `routes/authController.js`, `routes/middleware.js`

### 6. **API Service Layer**
- Centralized API client for all backend communication
- Automatic token injection in Authorization headers
- Methods for: Events, Registrations, Authentication, Notifications, Gallery
- Consistent error handling
- Support for all CRUD operations

**Files Involved:**
- Frontend: `src/services/api.js`

### 7. **Database Architecture**
- SQLite3 database (`events.db`) with 7 tables:
  - **users**: Student and organizer accounts
  - **events**: Event details, status, capacity, dates
  - **tickets**: Ticket types with pricing and availability
  - **registrations**: User event registrations with status tracking
  - **notifications**: Event-related notifications for users
  - **gallery_images**: Event photos (winners, memories) with captions
  - **certificates**: Digital certificates for event participation

**Files Involved:**
- Backend: `database.js` (Schema initialization)

### 8. **Backend API Endpoints** (27+ endpoints)

#### Event Management
- `GET /api/events` - List events with filters/pagination
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/:slug` - Get event by slug
- `GET /api/events/:id/stats` - Event statistics
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

#### Registration
- `POST /api/register` - Register for event (protected)
- `GET /api/my-registrations` - Get user's registrations (protected)
- `GET /api/events/:eventId/registrations` - Get event registrations (protected)
- `DELETE /api/registrations/:registrationId` - Cancel registration (protected)
- `GET /api/events/:eventId/export-participants` - Export CSV (protected)

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

#### Notifications
- `GET /api/notifications` - Get user notifications (protected)
- `PUT /api/notifications/:id` - Mark as read (protected)
- `GET /api/notifications/unread-count` - Unread count (protected)

#### Gallery
- `GET /api/events/:eventId/gallery` - Get event gallery
- `POST /api/events/:eventId/gallery` - Upload gallery image (protected)
- `DELETE /api/events/:eventId/gallery/:imageId` - Delete image (protected)

## 🚀 How to Run the Application

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- SQLite3 (included via npm)

### Setup Instructions

1. **Install Backend Dependencies**
   ```bash
   cd campus/backend
   npm install
   ```

2. **Seed Database with Sample Data**
   ```bash
   cd campus/backend
   node seed.js
   ```
   This creates `events.db` with 6 sample events and test users.

3. **Start Backend Server**
   ```bash
   cd campus/backend
   node server.js
   ```
   Backend will run on `http://localhost:5000`

4. **Install Frontend Dependencies** (in another terminal)
   ```bash
   cd campus/frontend
   npm install
   ```

5. **Start Frontend Dev Server**
   ```bash
   cd campus/frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

6. **Access the Application**
   - Open browser to `http://localhost:3000`
   - Use demo credentials to login (or skip login to browse events)

## 📋 Testing the System

### Test Login
1. Go to Login page
2. Enter credentials:
   - Email: `student1@college.edu`
   - Password: `password123`
3. Verify token is stored in localStorage (F12 → Application → Local Storage)

### Test Events Discovery
1. Go to Events page (`/events`)
2. Try filtering by category
3. Try searching for "code" or "robo"
4. Try different view modes (Grid/List)
5. Try status filters (Upcoming/Ongoing/Completed)

### Test Event Details
1. Click on any event card
2. Verify event information loads
3. Check gallery section for completed events
4. Click "Share Event" button to test sharing

### Test Registration (requires login)
1. Login with demo credentials
2. Open an upcoming event
3. Click "Register Now" on ticket type
4. Fill registration form
5. Select Individual or Team registration
6. Click Confirm (will show success alert once backend is running properly)

## 🔧 Environment Configuration

### Backend `.env` file (optional)
```
PORT=5000
NODE_ENV=development
```

### Frontend API Configuration
Update `src/services/api.js` if backend runs on different host/port:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📁 Project Structure

```
campus/
├── backend/
│   ├── database.js           # SQLite initialization and schema
│   ├── server.js             # Express server entry point
│   ├── seed.js               # Database seeding script
│   ├── package.json
│   ├── events.db             # SQLite database (auto-created)
│   └── routes/
│       ├── events.js         # Route definitions
│       ├── eventsController.js
│       ├── registrationController.js
│       ├── authController.js
│       ├── notificationController.js
│       └── middleware.js     # Auth middleware
│
└── frontend/
    ├── src/
    │   ├── services/api.js   # Centralized API client
    │   ├── pages/
    │   │   ├── EventDetail.jsx
    │   │   ├── EventsListing.jsx
    │   │   ├── Login.jsx
    │   │   ├── MyEvents.jsx
    │   │   ├── Home.jsx
    │   │   └── ...
    │   └── components/
    │       ├── EventCard.jsx
    │       ├── EventFilterBar.jsx
    │       ├── Navbar.jsx
    │       └── ...
    └── package.json
```

## 🔐 Security Features Implemented

1. **JWT Authentication**: 24-hour token expiration
2. **Password Hashing**: bcryptjs with salt rounds = 10
3. **Protected Routes**: `/api/*` endpoints require valid JWT
4. **CORS Enabled**: Cross-origin requests allowed for localhost:3000
5. **Input Validation**: Query parameters validated in controllers

## ⚠️ Known Limitations & Future Work

### Currently Limited (Placeholder/Foundation):
- Email notifications not yet implemented
- Gallery upload UI not fully connected to backend
- Admin controls for event creation/deletion
- PDF certificate generation
- QR code generation for attendance
- Real-time notifications
- Event date filtering by range
- Advanced search (combined filters)

### Next Priority Tasks:
1. Complete gallery upload UI integration
2. Create MyRegisteredEvents page with API integration
3. Build notification UI components
4. Implement event creation form for organizers
5. Add CSV participant export UI
6. Implement error toast notifications
7. Add event sharing with social media
8. Implement search suggestions

## 🐛 Troubleshooting

### Issue: Backend connection error
**Solution**: 
- Ensure backend is running: `node server.js` in backend directory
- Check if port 5000 is available: `netstat -ano | findstr :5000`
- Clear browser cache and reload

### Issue: Events not loading
**Solution**:
- Verify database was seeded: `node seed.js`
- Check browser console (F12) for API errors
- Verify backend logs for error messages
- Check network tab to see API responses

### Issue: Login not working
**Solution**:
- Verify demo credentials are correct
- Check localStorage for authToken (F12 → Storage → LocalStorage)
- Check network tab for 401 errors
- Clear localStorage and try again

### Issue: npm install fails
**Solution**:
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm cache clean --force`
- Run `npm install` again

## 📊 Database Queries

### View all events in database
```sql
SELECT * FROM events;
```

### View registered users
```sql
SELECT * FROM users;
```

### View registrations for an event
```sql
SELECT r.*, u.name, u.email FROM registrations r 
JOIN users u ON r.userId = u.id 
WHERE r.eventId = 1;
```

### View gallery images for an event
```sql
SELECT * FROM gallery_images WHERE eventId = 1;
```

## 📞 Support

For issues or questions:
1. Check browser console (F12 → Console tab) for errors
2. Check backend logs in terminal
3. Verify both servers are running
4. Try clearing browser cache and localStorage

---

**Last Updated**: January 2026
**System Status**: Development/Testing
**API Version**: 1.0
>>>>>>> 5c0397ef669242f3c1e9e1d32aaad6735b02a3b0
