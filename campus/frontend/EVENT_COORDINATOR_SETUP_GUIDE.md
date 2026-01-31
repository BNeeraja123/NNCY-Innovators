# EVENT COORDINATOR SYSTEM - SETUP & CONFIGURATION GUIDE

## System Requirements

- **Node.js**: v14+ 
- **React**: v18+
- **TailwindCSS**: Latest
- **Express**: v4.18+
- **Browser**: Chrome, Firefox, Safari (latest versions)

## Installation Steps

### Step 1: Frontend Setup

1. **Verify Components Exist**:
   ```bash
   src/components/EventCoordinatorLogin.jsx
   src/components/EventEditModal.jsx
   src/components/EventRegistrationsModal.jsx
   ```

2. **Update EventCard.jsx**:
   - Already enhanced with coordinator props
   - Shows edit/delete/manage buttons for coordinators

3. **Update EventsListing.jsx**:
   - Already enhanced with coordinator features
   - Import all three new components
   - Includes event management handlers

4. **Update api.js**:
   - New event coordinator endpoints added
   - getEventRegistrations()
   - updateRegistrationStatus()
   - toggleRegistrationStatus()

### Step 2: Backend Setup

1. **Copy Backend Files**:
   ```bash
   backend/routes/eventController.js
   backend/routes/event-routes.js
   ```

2. **Update server.js** to import routes:
   ```javascript
   import eventRoutes from './routes/event-routes.js';
   app.use('/api', eventRoutes);
   ```

3. **Install Dependencies** (if needed):
   ```bash
   npm install express cors body-parser
   ```

### Step 3: Authentication Setup

1. **Verify AuthContext.jsx** includes:
   - `useAuth()` hook
   - `login()` function
   - `logout()` function
   - `user.role` property

2. **Supported Roles**:
   ```javascript
   'student'           // Default user
   'event_coordinator' // Can manage events
   'admin'            // Can manage all
   'placement_coordinator' // (existing)
   'organizer'        // Event organizer
   ```

### Step 4: Database Configuration (Optional)

Currently uses in-memory data. To use SQLite:

1. **Update eventController.js**:
   ```javascript
   // Replace in-memory arrays with database queries
   const getAllEvents = async (req, res) => {
     const events = await db.all('SELECT * FROM events');
     res.json(events);
   };
   ```

2. **Database Schema** (already in database.js):
   ```sql
   CREATE TABLE events (
     id INTEGER PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     category TEXT,
     date DATE,
     venue TEXT,
     venueCapacity INTEGER,
     organizerId INTEGER,
     status TEXT,
     createdAt TIMESTAMP,
     updatedAt TIMESTAMP
   );
   
   CREATE TABLE registrations (
     id INTEGER PRIMARY KEY,
     eventId INTEGER,
     userId INTEGER,
     status TEXT,
     createdAt TIMESTAMP
   );
   ```

### Step 5: Environment Variables

Create `.env` file:
```
API_BASE=http://localhost:5000/api
REACT_APP_API_URL=http://localhost:5000/api
NODE_ENV=development
PORT=3000
```

### Step 6: CORS Configuration

In backend `server.js`:
```javascript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Configuration Options

### API Configuration

**File**: `frontend/src/services/api.js`

```javascript
// Change base URL
const API_BASE = 'http://your-api-domain.com/api';

// Update timeout (if needed)
const timeout = 30000; // 30 seconds
```

### Theme Configuration

Already inherits from existing theme. Colors used:
- Primary: Orange
- Secondary: White
- Accent: Primary-light
- Text: Gray shades

### Component Configuration

**EventEditModal.jsx** - Add/remove categories:
```javascript
const categories = [
  'Academic',
  'Cultural', 
  'Sports',
  'Tech',
  'Placement',
  'Other'
];
```

**EventCoordinatorLogin.jsx** - Change demo credentials:
```javascript
const DEMO_COORDINATORS = [
  { 
    email: 'your-email@college.edu', 
    password: 'your-password',
    name: 'Your Name',
    role: 'event_coordinator' 
  }
];
```

## Running the System

### Development Mode

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   # Backend running on http://localhost:5000
   ```

2. **Start Frontend** (in new terminal):
   ```bash
   cd frontend
   npm run dev
   # Frontend running on http://localhost:3000
   ```

3. **Access Application**:
   ```
   http://localhost:3000
   Navigate to Events page
   Click "Coordinator Login"
   Use demo credentials
   ```

### Production Mode

1. **Build Frontend**:
   ```bash
   npm run build
   # Creates optimized build in dist/
   ```

2. **Build Backend**:
   ```bash
   npm run build
   # If using TypeScript or build process
   ```

3. **Deploy**:
   - Upload `frontend/dist/` to CDN or web server
   - Deploy backend to server
   - Update `API_BASE` to production URL

## Testing

### Manual Testing

1. **Test Login**:
   - [ ] Click "Coordinator Login"
   - [ ] Enter demo credentials
   - [ ] Verify logged in status shows in header
   - [ ] Verify "Create Event" button appears

2. **Test Create Event**:
   - [ ] Click "+ Create Event"
   - [ ] Fill all required fields
   - [ ] Submit form
   - [ ] New event appears in list

3. **Test Edit Event**:
   - [ ] Click ✏️ on any event
   - [ ] Modify details
   - [ ] Save changes
   - [ ] Verify event updated

4. **Test Delete Event**:
   - [ ] Click 🗑️ on any event
   - [ ] Confirm deletion
   - [ ] Verify event removed from list

5. **Test Registrations**:
   - [ ] Click 👥 on any event
   - [ ] View registrations table
   - [ ] Search registrations
   - [ ] Update status
   - [ ] Download CSV

### Automated Testing (Optional)

Create `EventCoordinator.test.jsx`:
```javascript
import { render, screen } from '@testing-library/react';
import EventCoordinatorLogin from '../components/EventCoordinatorLogin';

test('renders login form', () => {
  render(<EventCoordinatorLogin isOpen={true} />);
  expect(screen.getByText('Event Coordinator')).toBeInTheDocument();
});
```

Run tests:
```bash
npm test
```

## Troubleshooting

### Issue: Login Not Working

**Solution**:
1. Check credentials exactly (case-sensitive)
2. Verify AuthContext is imported correctly
3. Check browser console for errors
4. Clear localStorage: `localStorage.clear()`

### Issue: Events Not Showing

**Solution**:
1. Verify backend is running
2. Check API_BASE URL in api.js
3. Check network tab in DevTools
4. Verify CORS is configured

### Issue: Modal Not Opening

**Solution**:
1. Check state management
2. Verify onClick handlers are firing
3. Check CSS z-index conflicts
4. Try refreshing page

### Issue: CSV Download Not Working

**Solution**:
1. Check browser download settings
2. Verify registrations exist
3. Check console for JavaScript errors
4. Try different browser

## Performance Optimization

### Frontend Optimization
1. **Lazy Load Components**:
   ```javascript
   const EventEditModal = lazy(() => import('./EventEditModal'));
   ```

2. **Memoize Components**:
   ```javascript
   export default memo(EventCard);
   ```

3. **Optimize Images**:
   - Use WebP format
   - Add lazy loading
   - Compress images

### Backend Optimization
1. **Add Database Indexes**:
   ```sql
   CREATE INDEX idx_event_organizer ON events(organizerId);
   CREATE INDEX idx_registration_event ON registrations(eventId);
   ```

2. **Add Caching**:
   - Cache event list
   - Cache event details
   - Invalidate on updates

3. **Add Pagination**:
   ```javascript
   const limit = 10;
   const offset = (page - 1) * limit;
   ```

## Security Checklist

- [ ] Input validation on all forms
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (escape output)
- [ ] CSRF tokens (if using sessions)
- [ ] CORS properly configured
- [ ] Environment variables not exposed
- [ ] Passwords hashed (bcrypt)
- [ ] Rate limiting on API

## Monitoring

### Frontend Monitoring
- Browser console for errors
- Network tab for API calls
- Performance tab for load times

### Backend Monitoring
- Console logs for requests
- Error logging with timestamps
- Request/response logging

## Support & Documentation

- **Main Docs**: EVENT_COORDINATOR_IMPLEMENTATION.md
- **Quick Reference**: EVENT_COORDINATOR_QUICK_REFERENCE.md
- **Demo Credentials**: See LOGIN section above

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: ✅ Ready for Development
