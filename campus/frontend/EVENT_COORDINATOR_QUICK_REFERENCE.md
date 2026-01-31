# EVENT COORDINATOR SYSTEM - QUICK REFERENCE

## Login

**Navigate to Events Page** → Click "Coordinator Login" button

### Demo Credentials
```
Email: eventcoord@college.edu
Password: eventcoord123
```

## Coordinator Features (After Login)

### Create Event
1. Click "+ Create Event" button in header
2. Fill in event details:
   - Event title (required)
   - Category (Academic, Cultural, Sports, Tech, Placement, Other)
   - Description (required)
   - Start date & time (required)
   - End date & time (optional)
   - Venue (required)
   - Venue capacity (required)
   - Registration deadline (required)
   - Status (Upcoming, Ongoing, Completed, Cancelled)
   - Rules, eligibility, prizes
   - Coordinator info
3. Click "Create Event"

### Edit Event
1. Find event card
2. Click **✏️** (green pencil) button
3. Modify details
4. Click "Update Event"

### Delete Event
1. Find event card
2. Click **🗑️** (red trash) button
3. Confirm deletion

### Manage Registrations
1. Find event card
2. Click **👥** (users) button
3. View registrations table:
   - Search by name/email
   - Filter by status
   - Update registration status (Confirm/Cancel)
   - Download as CSV

## Component Files

| Component | Location | Purpose |
|-----------|----------|---------|
| EventCoordinatorLogin | `components/` | Login modal |
| EventEditModal | `components/` | Event CRUD form |
| EventRegistrationsModal | `components/` | Registration management |
| EventCard | `components/` (enhanced) | Event display with actions |
| EventsListing | `pages/` (enhanced) | Main events page |

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/events` | List all events |
| GET | `/api/events/:eventId` | Get single event |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:eventId` | Update event |
| DELETE | `/api/events/:eventId` | Delete event |
| GET | `/api/events/:eventId/registrations` | Get registrations |
| PUT | `/api/events/:eventId/registrations/:regId/status` | Update registration |

## Form Validation

### Event Creation
- ✓ Title required
- ✓ Description required
- ✓ Date required
- ✓ Time required
- ✓ Venue required
- ✓ Capacity > 0
- ✓ Registration deadline required
- ✓ Email format validation

### Registration Management
- ✓ Search by name/email
- ✓ Filter by status
- ✓ Update status
- ✓ Download CSV

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Cancel modal | Esc key (in form) |
| Submit form | Tab + Enter |
| Search | Ctrl+F (in registrations) |

## Responsive Design

- **Mobile**: Stack layouts, touch-friendly buttons
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid for events

## Error Handling

| Error | Solution |
|-------|----------|
| Login failed | Check credentials (case-sensitive) |
| Event not found | Refresh page or reload |
| Create failed | Check all required fields |
| No registrations | Event may not have any yet |
| Download failed | Try again or check permissions |

## Tips & Tricks

1. **Bulk Download**: Use "Download CSV" to get all registrations at once
2. **Quick Search**: Use search to find registrations quickly
3. **Status Tracking**: Color coding helps track registration status
4. **Undo Not Available**: No undo for deletions, use confirmation carefully
5. **Auto-Update**: Timestamps show when events were last modified

## Support Contact

For issues:
1. Check demo credentials
2. Verify network connection
3. Clear browser cache
4. Contact development team

---

Last Updated: 2024
Version: 1.0
