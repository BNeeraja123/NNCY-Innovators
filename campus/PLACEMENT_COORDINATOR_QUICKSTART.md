# Quick Integration Guide - Placement Coordinator Feature

## ⚡ Quick Start (5 Minutes)

### Step 1: Import New Components in PlacementDashboard
The components are already imported at the top of the file. No action needed!

### Step 2: Test the Feature
1. Open Placement page (`/placement`)
2. You should see a "🔐 Coordinator Login" button in the header
3. Click it and login with:
   - **Email**: `coordinator@college.edu`
   - **Password**: `coordinator123`

### Step 3: Try the Features
- **Add Company**: Go to Companies tab → Click "➕ Add New Company"
- **Edit Company**: Hover over company card → Click ✏️
- **Delete Company**: Hover over company card → Click 🗑️
- **Manage Students**: Go to Students tab → Add/Edit/Delete records

## 📁 Files Created

```
✅ Created:
  - frontend/src/components/PlacementCoordinatorLogin.jsx
  - frontend/src/components/CompanyEditModal.jsx
  - frontend/src/components/StudentEditModal.jsx
  - backend/routes/placementController.js
  - backend/routes/placement.js
  - PLACEMENT_COORDINATOR_SETUP.md (this guide)

✏️ Modified:
  - frontend/src/pages/PlacementDashboard.jsx
  - frontend/src/context/AuthContext.jsx (already supported)
```

## 🔌 Backend Integration (Optional)

To connect to your actual backend API:

### In PlacementDashboard.jsx
Replace the local state handlers with API calls:

```javascript
// Example: Create Company
const handleAddCompany = async (formData) => {
  try {
    const response = await fetch('/api/placement/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': user?.role
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const data = await response.json();
      setCompanies([...companies, data.data]);
      alert('✓ Company added successfully!');
    }
  } catch (error) {
    alert('Error adding company: ' + error.message);
  }
};
```

### In backend/routes/placement.js
Update `server.js` to include the routes:

```javascript
import placementRoutes from './routes/placement.js';

// Add this line in your express setup:
app.use('/api/placement', placementRoutes);
```

## 🎨 Customization

### Change Demo Credentials
**File**: `frontend/src/components/PlacementCoordinatorLogin.jsx`

```javascript
const DEMO_COORDINATORS = [
  { 
    email: 'your-email@college.edu', 
    password: 'your-password', 
    name: 'Your Name', 
    role: 'placement_coordinator' 
  },
];
```

### Add More Student Branches
**File**: `frontend/src/components/StudentEditModal.jsx`

```javascript
const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'CIVIL'];
// Modify this array to add/remove branches
```

### Change Button Text/Icons
Search for these in the components and modify:
- `🔐 Coordinator Login` → Customize emoji/text
- `➕ Add New Company` → Customize emoji/text
- `✏️` and `🗑️` → Change emojis

## 🔒 Security Notes

### Current State (Demo)
- Demo credentials stored in component
- No backend validation
- Perfect for testing and demonstration

### Production Implementation
You should:

1. **Remove Demo Credentials**
   - Delete `DEMO_COORDINATORS` array
   - Connect to actual backend authentication

2. **Add JWT Token Validation**
   ```javascript
   // In API calls:
   headers: {
     'Authorization': `Bearer ${localStorage.getItem('token')}`
   }
   ```

3. **Backend Middleware**
   - Validate token on every request
   - Check user role before allowing modifications
   - Log all changes for audit trail

## 🐛 Troubleshooting

### "Coordinator buttons not showing"
- [ ] Check if you're logged in (see "Logged in as" text in header)
- [ ] Try logout and login again
- [ ] Check browser console for errors (F12)

### "Add Company button not working"
- [ ] Make sure you're logged in as coordinator
- [ ] Check if modal opens when you click
- [ ] Fill all required fields (name, location)

### "Forms not validating"
- [ ] Required fields: name, location (companies) and name, rollNo, company (students)
- [ ] Email must have @ symbol if provided
- [ ] Check red error text below fields

### "Changes not persisting after refresh"
- This is expected! Data is stored in component state only.
- To persist: Connect to backend database (see Backend Integration section)

## 📊 State Management

### Current Architecture
```
PlacementDashboard (Parent)
├── companies (state)
├── students (state)
├── user (from AuthContext)
├── PlacementCoordinatorLogin
├── CompanyEditModal
└── StudentEditModal
```

### Data Flow
```
User action → Event handler → Update state → Component re-renders
                                    ↓
                            (Optionally) API call
```

## 🎯 Key Features Summary

| Feature | Student | Coordinator | Admin |
|---------|---------|-------------|-------|
| View Companies | ✅ | ✅ | ✅ |
| View Students | ✅ | ✅ | ✅ |
| Add Company | ❌ | ✅ | ✅ |
| Edit Company | ❌ | ✅ | ✅ |
| Delete Company | ❌ | ✅ | ✅ |
| Add Student | ❌ | ✅ | ✅ |
| Edit Student | ❌ | ✅ | ✅ |
| Delete Student | ❌ | ✅ | ✅ |

## 🚀 Next Steps

1. **Test Locally** ✅
   - Run your dev server
   - Test login and all features
   - Verify form validation

2. **Customize** 🎨
   - Update demo credentials
   - Customize branch list
   - Modify button text/colors if needed

3. **Connect Backend** 🔌
   - Update API endpoints in components
   - Implement actual authentication
   - Test with real data

4. **Deploy** 🌐
   - Push to production
   - Train coordinators on usage
   - Monitor for issues

## 📞 Support Scenarios

**Scenario: "I want to change the login email"**
→ Edit `DEMO_COORDINATORS` in `PlacementCoordinatorLogin.jsx`

**Scenario: "I want to add a new branch"**
→ Add to `branches` array in `StudentEditModal.jsx`

**Scenario: "I want to track who updated each record"**
→ Already implemented! Check `updatedBy` field in each record

**Scenario: "I want students to see coordinators in the UI"**
→ Currently only coordinators see management features. To show:
- Remove `isCoordinator` check from coordinator-only buttons
- Or show read-only coordinator info differently

## ✨ Advanced Features (Already Included)

- ✅ Form validation with error messages
- ✅ Confirmation alerts for deletions
- ✅ Updated-by tracking
- ✅ Timestamp on every change
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Orange-white theme
- ✅ Modal forms
- ✅ Inline actions

## 📝 Notes

- All data is currently stored in component state
- Page refresh will clear all changes (unless connected to backend)
- Demo credentials are `coordinator@college.edu` / `coordinator123`
- Coordinators see additional buttons and management features
- Students see view-only information

---

**Last Updated**: January 31, 2026
**Status**: ✅ Ready for Testing & Customization
