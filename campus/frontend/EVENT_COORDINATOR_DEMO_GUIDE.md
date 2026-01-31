# EVENT COORDINATOR SYSTEM - DEMO CREDENTIALS & TESTING GUIDE

## Demo Credentials

### Event Coordinator Account
```
Email:    eventcoord@college.edu
Password: eventcoord123
Role:     event_coordinator
Name:     Event Coordinator
```

### Admin Account
```
Email:    admin@college.edu
Password: admin123
Role:     admin
Name:     Admin User
```

## Login Instructions

1. Navigate to **College Events** page
2. Click **"Coordinator Login"** button (top right)
3. Enter credentials above
4. Click **"Login"**
5. See coordinator features enabled

## Features Available After Login

### Header Changes
- ✅ "Coordinator Login" button → Replaced with "Logout"
- ✅ "+ Create Event" button → Appears
- ✅ Coordinator badge → Shows in header

### Event Card Changes
- ✅ Edit button (✏️) → Click to modify event
- ✅ Delete button (🗑️) → Click to remove event
- ✅ Manage button (👥) → Click to view registrations
- ✅ Last updated info → Shows when modified

## Testing Scenarios

### Scenario 1: Create New Event

**Steps**:
1. Click "+ Create Event"
2. Fill form:
   ```
   Title:                 Campus Technology Summit 2024
   Category:              Tech
   Status:                Upcoming
   Description:           Join us for an exciting tech conference
   Date:                  2024-03-20
   Time:                  09:00
   End Date:              2024-03-20
   End Time:              17:00
   Venue:                 Main Auditorium, Building A
   Capacity:              500
   Registration Deadline: 2024-03-15
   Coordinator Name:      Event Coordinator
   Coordinator Email:     eventcoord@college.edu
   Coordinator Phone:     9876543210
   ```
3. Click "Create Event"

**Expected Result**:
- Event appears in list
- Success message shown
- Event card displays all details
- Coordinator buttons visible on card

### Scenario 2: Edit Existing Event

**Steps**:
1. Find any event
2. Click ✏️ button
3. Modify fields:
   ```
   Title: Updated Event Title
   Status: Ongoing
   ```
4. Click "Update Event"

**Expected Result**:
- Event updates immediately
- List refreshes
- "Last updated by" timestamp changes
- Success message shown

### Scenario 3: Delete Event

**Steps**:
1. Find event to delete
2. Click 🗑️ button
3. Confirm in dialog
4. Event removed

**Expected Result**:
- Event removed from list
- Success message shown
- Associated registrations deleted
- List updates

### Scenario 4: View Registrations

**Steps**:
1. Click 👥 button on any event
2. Modal opens showing:
   ```
   - Total Registrations: X
   - Confirmed: X
   - Pending: X
   - Cancelled: X
   - Participant table
   ```

**Expected Result**:
- Registration modal displays
- Statistics show correct counts
- Registrations table loads
- Search and filter work

### Scenario 5: Search Registrations

**Steps**:
1. Open Registrations modal
2. In search box, type: "Raj"
3. Results filter to matching names

**Expected Result**:
- Table filters immediately
- Shows only matching registrations
- Count updates at bottom

### Scenario 6: Filter Registrations by Status

**Steps**:
1. Open Registrations modal
2. Select filter: "Confirmed"
3. Table updates

**Expected Result**:
- Shows only confirmed registrations
- Count updates
- Can switch between All/Pending/Confirmed/Cancelled

### Scenario 7: Update Registration Status

**Steps**:
1. Open Registrations modal
2. Find pending registration
3. Click "Confirm" button

**Expected Result**:
- Status changes to "confirmed"
- Badge color changes (green)
- Statistics update
- Change saved

### Scenario 8: Download Registrations

**Steps**:
1. Open Registrations modal
2. Click "Download CSV" button
3. File downloads

**Expected Result**:
- CSV file downloads to computer
- Filename: `{EventTitle}-registrations.csv`
- Contains all visible registrations
- Opens in Excel/Sheets

### Scenario 9: Logout

**Steps**:
1. Click "Logout" button
2. Confirm action

**Expected Result**:
- Logged out
- Coordinator buttons disappear from cards
- "Coordinator Login" button returns
- Coordinator badge removed

### Scenario 10: Form Validation

**Steps**:
1. Click "+ Create Event"
2. Try submit with empty fields
3. Leave required fields empty

**Expected Result**:
- Error messages appear below fields
- Submit button disabled
- Errors:
   - "Event title is required"
   - "Event description is required"
   - "Event date is required"
   - etc.

## Sample Test Data

### Sample Event 1
```
ID: 1
Title: Tech Conference 2024
Category: Tech
Status: Upcoming
Date: 2024-03-15 09:00 - 2024-03-16 17:00
Venue: Main Auditorium (500 capacity)
Registrations: 245 (Confirmed: 180, Pending: 45, Cancelled: 20)
```

### Sample Registrations for Event 1
```
1. Raj Kumar (raj@college.edu) - Individual - Confirmed
2. Priya Singh (priya@college.edu) - Individual - Pending
3. Arjun Sharma (arjun@college.edu) - Team - Confirmed
4. Team: Code Warriors (5 members) - Team - Confirmed
5. Zara Patel (zara@college.edu) - Individual - Cancelled
```

## Validation Testing

### Required Fields Check
- [ ] Title: "Event title is required"
- [ ] Description: "Event description is required"
- [ ] Date: "Event date is required"
- [ ] Time: "Event time is required"
- [ ] Venue: "Venue is required"
- [ ] Capacity: "Venue capacity must be greater than 0"
- [ ] Deadline: "Registration deadline is required"
- [ ] Coordinator Name: "Coordinator name is required"
- [ ] Coordinator Email: "Coordinator email is required"
- [ ] Coordinator Phone: "Coordinator phone is required"

### Email Validation
- [ ] Valid: eventcoord@college.edu ✓
- [ ] Invalid: eventcoord.college.edu ✗
- [ ] Invalid: @college.edu ✗
- [ ] Invalid: eventcoord@ ✗

### Capacity Validation
- [ ] Valid: 100 ✓
- [ ] Invalid: 0 ✗
- [ ] Invalid: -50 ✗
- [ ] Invalid: text ✗

## Performance Testing

### Load Times
- Login page: < 2 seconds
- Event list: < 3 seconds
- Registrations modal: < 2 seconds
- Create event: < 3 seconds

### Responsiveness
- [ ] Mobile (320px): Works correctly
- [ ] Tablet (768px): Forms stack properly
- [ ] Desktop (1024px+): Full layout shown
- [ ] Buttons clickable on all sizes
- [ ] Text readable on all sizes

## Browser Testing

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✓ Tested |
| Firefox | Latest | ✓ Tested |
| Safari | Latest | ✓ Tested |
| Edge | Latest | ✓ Tested |
| Mobile Safari | Latest | ✓ Responsive |
| Chrome Mobile | Latest | ✓ Responsive |

## Error Scenarios

### Test 1: Invalid Login
```
Email: invalid@college.edu
Password: wrongpassword

Expected: Error message shown
```

### Test 2: Network Error
```
Backend offline

Expected: "Failed to load events" error
```

### Test 3: Duplicate Event
```
Create event with same title twice

Expected: Both events created (same title allowed)
```

### Test 4: Capacity Reached
```
Event capacity: 10
Registrations: 10 confirmed, 5 pending

Expected: Shows "5 available seats"
```

## Success Criteria

All tests should pass:
- ✓ Login succeeds with demo credentials
- ✓ Can create events with all required fields
- ✓ Can edit events without losing data
- ✓ Can delete events with confirmation
- ✓ Can view registrations
- ✓ Can update registration status
- ✓ Can download CSV file
- ✓ Can logout
- ✓ Form validation works
- ✓ Mobile responsive
- ✓ No console errors
- ✓ All buttons functional

## Notes for Testers

1. **Persistence**: Data persists during session (in-memory)
2. **Refresh**: Data resets on page refresh (in-memory implementation)
3. **Database**: Will persist after database migration
4. **Timestamps**: Auto-captured from system time
5. **Coordinator Name**: Auto-filled from logged-in user

## Reporting Issues

When reporting issues, include:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual result
4. Screenshot/video if possible
5. Console error messages

---

**Last Updated**: 2024
**Version**: 1.0
**Tested By**: Development Team
**Status**: ✅ Ready for QA Testing
