# Placement Coordinator Management System - Implementation Guide

## Overview

The Placement section has been enhanced with a **Placement Coordinator Login and Management feature**. This allows authorized placement coordinators and admins to manage recruitment details, placed students information, and placement statistics directly within the placement page—without needing a separate admin dashboard.

## Key Features

### 1. **Secure Login System**
- **Login Button**: Visible in the Placement section header (🔐 Coordinator Login)
- **Role-Based Access**: 
  - Students: View-only access to placement information
  - Placement Coordinators: Full edit/manage permissions
  - Admin: Full edit/manage permissions
- **Demo Credentials** (for testing):
  - Email: `coordinator@college.edu`
  - Password: `coordinator123`

### 2. **Company Management**
Coordinators can:
- ➕ **Add New Companies**: Button visible in Companies tab
- ✏️ **Edit Companies**: Inline edit button on each company card
- 🗑️ **Delete Companies**: Inline delete button with confirmation
- **Track Updates**: Last updated timestamp and coordinator name displayed

**Editable Fields**:
- Company name
- Logo URL
- Location
- Website
- Contact email
- Min & Max package (LPA)
- Visit year
- Registration deadline
- Registration link/status

### 3. **Placed Students Management**
Coordinators can:
- ➕ **Add Placed Student**: Button in Students tab
- ✏️ **Edit Student Records**: Inline edit button in table
- 🗑️ **Delete Records**: Inline delete with confirmation
- **Table View**: Organized table with all student details

**Editable Fields**:
- Student name
- Roll number
- Branch
- Batch year
- Company
- Position
- Package (LPA)
- Location
- Email

### 4. **UI/UX Design**
- **Orange-White Theme**: Consistent with campus branding
- **Card-Based Layout**: For company listings
- **Responsive Tables**: For student records
- **Modal Forms**: Clean edit/add interfaces
- **Inline Actions**: Edit/Delete buttons on cards and rows
- **Confirmation Alerts**: Prevents accidental deletions

## File Structure

### New Components Created

```
frontend/src/components/
├── PlacementCoordinatorLogin.jsx       # Login modal with secure authentication
├── CompanyEditModal.jsx                # Form modal for adding/editing companies
└── StudentEditModal.jsx                # Form modal for adding/editing students

backend/routes/
├── placementController.js              # Backend logic for CRUD operations
└── placement.js                        # API routes and middleware

```

### Modified Files

```
frontend/src/pages/
└── PlacementDashboard.jsx             # Enhanced with coordinator features

frontend/src/context/
└── AuthContext.jsx                     # Already supports role-based access
```

## How It Works

### 1. **Login Flow**
```
User clicks "🔐 Coordinator Login" 
    ↓
PlacementCoordinatorLogin modal opens
    ↓
Enter credentials (coordinator@college.edu / coordinator123)
    ↓
Validate against demo coordinators list
    ↓
On success: Login to AuthContext, coordinator buttons appear
    ↓
Logout button appears in header
```

### 2. **Company Management Flow**
```
Coordinator clicks "➕ Add New Company"
    ↓
CompanyEditModal opens (empty form)
    ↓
Fill in company details
    ↓
Form validates required fields (name, location)
    ↓
Click "Add Company"
    ↓
Company added with timestamp and coordinator name
    ↓
Success alert shown
    ↓
New company appears in grid with Edit/Delete buttons
```

### 3. **Edit/Delete Flow**
```
Coordinator clicks ✏️ on a company card
    ↓
CompanyEditModal opens with pre-filled data
    ↓
Modify details as needed
    ↓
Click "Update Company"
    ↓
Record updated with new timestamp
    ↓
Success alert shown

OR

Coordinator clicks 🗑️ on a company card
    ↓
Confirmation dialog appears
    ↓
If confirmed: Record deleted permanently
    ↓
Success alert shown
```

## Form Validation

### Company Form
- ✅ **Name**: Required field
- ✅ **Location**: Required field
- ✅ **Email**: Valid email format (optional)
- ✅ **Package Range**: Numeric validation
- ✅ **Dates**: Valid date format

### Student Form
- ✅ **Name**: Required field
- ✅ **Roll Number**: Required field
- ✅ **Company**: Required field
- ✅ **Email**: Valid email format (optional)
- ✅ **Branch & Batch**: Dropdown selection

**Error Handling**:
- Real-time error clearing as user types
- Clear error messages below invalid fields
- Form submission blocked until all errors resolved

## Data Tracking

Each record automatically tracks:
```javascript
{
  updatedAt: "2026-01-31T10:30:45.123Z",   // ISO timestamp
  updatedBy: "Dr. Placement Coordinator"   // Coordinator name
}
```

This information is:
- ✅ Stored with each record
- ✅ Displayed below company cards (for coordinators only)
- ✅ Included in database entries
- ✅ Useful for audit trails and transparency

## Security Features

### 1. **Authentication**
- Email/password validation required
- Demo credentials for testing
- Can be connected to backend auth API

### 2. **Role-Based Access Control**
```javascript
// Only coordinators see these features:
- Edit/Delete buttons
- Add New buttons
- Updated-by information
- Management tables

// Students see:
- View-only information
- No edit capabilities
- Professional recruitment details
```

### 3. **Confirmation Alerts**
- Delete operations require explicit confirmation
- Alert dialogs prevent accidental data loss
- Success alerts confirm all operations

## Database Schema (Backend Ready)

### Companies Table
```sql
id, name, logo, location, website, contactEmail, 
minPackage, maxPackage, visitYear, 
registrationDeadline, registrationLink, registrationStatus,
updatedAt, updatedBy, createdAt
```

### Placed Students Table
```sql
id, name, rollNo, branch, batch, company, position, package,
location, email, internship, placeYear,
updatedAt, updatedBy, createdAt
```

## Integration with Backend

### API Endpoints (Ready to Connect)

```javascript
// Company Management
GET    /api/placement/companies              // Get all companies
GET    /api/placement/companies/:id          // Get single company
POST   /api/placement/companies              // Create company (coordinator only)
PUT    /api/placement/companies/:id          // Update company (coordinator only)
DELETE /api/placement/companies/:id          // Delete company (coordinator only)

// Student Management
GET    /api/placement/students               // Get all students
POST   /api/placement/students               // Create student (coordinator only)
PUT    /api/placement/students/:id           // Update student (coordinator only)
DELETE /api/placement/students/:id           // Delete student (coordinator only)

// Statistics
GET    /api/placement/stats                  // Get placement statistics
```

**Middleware Protection**:
```javascript
// Only allows placement_coordinator or admin roles
isCoordinatorOrAdmin middleware validates:
- User role from auth token
- Returns 403 if unauthorized
```

## Usage Instructions

### For Students
1. Navigate to Placement section
2. View companies and recruitment details
3. Browse placed students information
4. No login required

### For Placement Coordinators
1. Click "🔐 Coordinator Login" button
2. Enter credentials: `coordinator@college.edu` / `coordinator123`
3. **Companies Tab**:
   - Click "➕ Add New Company" to add recruitment
   - Click ✏️ to edit company details
   - Click 🗑️ to delete companies
4. **Students Tab**:
   - Click "➕ Add Placed Student" to record placements
   - Use table rows to Edit or Delete records
5. Logout using the logout button in header

## Customization Guide

### Adding Demo Credentials
Edit `PlacementCoordinatorLogin.jsx`:
```javascript
const DEMO_COORDINATORS = [
  { 
    email: 'your-email@college.edu', 
    password: 'your-password', 
    name: 'Your Name', 
    role: 'placement_coordinator' 
  },
  // Add more coordinators here
];
```

### Changing Colors/Theme
All colors use Tailwind classes:
- `primary`: Main orange color (customizable in tailwind config)
- `primary-light`: Light orange
- `text-white`, `bg-white`: White elements

### Adding More Branches
Edit `StudentEditModal.jsx`:
```javascript
const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'CIVIL'];
// Add or modify branches as needed
```

### Extending Student Fields
Add new fields to `studentForm` state in both:
1. `StudentEditModal.jsx` (form component)
2. `PlacementDashboard.jsx` (state management)

## Testing Checklist

### As Student (Without Login)
- [ ] View Placement page
- [ ] See companies and students info
- [ ] No edit buttons visible
- [ ] "Coordinator Login" button visible

### As Coordinator (After Login)
- [ ] Edit/Delete buttons visible
- [ ] Can add new company via modal
- [ ] Can edit company details
- [ ] Can delete company (with confirmation)
- [ ] Can add student record
- [ ] Can edit student record
- [ ] Can delete student record
- [ ] Updated-by info displayed
- [ ] Form validation works
- [ ] Success alerts appear
- [ ] Logout button works

### Form Validation
- [ ] Empty name field shows error
- [ ] Empty location field shows error
- [ ] Invalid email shows error
- [ ] Errors clear when corrected
- [ ] Form won't submit with errors

## Future Enhancements

1. **Backend Database Integration**
   - Replace in-memory data with persistent storage
   - Add user authentication via JWT tokens
   - Implement audit logging

2. **Export Functionality**
   - Export companies to PDF/Excel
   - Export student records to CSV

3. **Analytics Dashboard**
   - Coordinator-specific statistics
   - Placement trends over time
   - Company visit history

4. **Bulk Operations**
   - Bulk upload student records
   - Bulk company import
   - Batch delete operations

5. **Email Notifications**
   - Notify students of new companies
   - Send registration reminders
   - Alert coordinators of important dates

6. **Advanced Filters**
   - Filter by registration status
   - Filter by eligibility criteria
   - Advanced search capabilities

## Support

For issues or questions:
1. Check the form validation messages
2. Use demo credentials: `coordinator@college.edu` / `coordinator123`
3. Verify coordinator is logged in before trying to edit
4. Check browser console for detailed error messages

## File Locations Summary

- **Login Component**: `frontend/src/components/PlacementCoordinatorLogin.jsx`
- **Company Modal**: `frontend/src/components/CompanyEditModal.jsx`
- **Student Modal**: `frontend/src/components/StudentEditModal.jsx`
- **Main Dashboard**: `frontend/src/pages/PlacementDashboard.jsx`
- **Backend Controller**: `backend/routes/placementController.js`
- **Backend Routes**: `backend/routes/placement.js`
- **Auth Context**: `frontend/src/context/AuthContext.jsx`
