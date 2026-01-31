# 🔐 Demo Credentials & Important Notes

## Demo Coordinator Accounts

Use these credentials to test the Placement Coordinator features:

### Primary Coordinator Account
```
Email:    coordinator@college.edu
Password: coordinator123
Role:     Placement Coordinator
```

### Admin Account
```
Email:    admin@college.edu
Password: admin123
Role:     Admin
```

## Quick Test Flow

1. **Open Placement Page**
   ```
   Navigate to: http://localhost:3000/placement (or your domain)
   ```

2. **Click Coordinator Login**
   ```
   Button: "🔐 Coordinator Login" (top right of hero section)
   ```

3. **Enter Credentials**
   ```
   Email:    coordinator@college.edu
   Password: coordinator123
   Click:    Login
   ```

4. **You should see**
   ```
   ✓ "Logged in as: Dr. Placement Coordinator" in header
   ✓ "Logout" button appears
   ✓ Edit/Delete buttons on company cards
   ✓ "Add New Company" button in Companies tab
   ✓ "Add Placed Student" button in Students tab
   ✓ Student management table appears
   ```

## Important Notes

### ⚠️ Current Limitations

1. **Data is NOT Persistent**
   - Data is stored in component state
   - Refreshing the page will clear all changes
   - ⚠️ Don't rely on this for production yet

2. **Backend Not Connected**
   - API routes exist but aren't being called
   - Demo uses in-memory data only
   - To use actual database, see integration guide

3. **Demo Credentials Only**
   - Credentials are hardcoded in component
   - Perfect for testing only
   - Should be removed/changed for production

### ✅ What Works

- ✅ Login/Logout functionality
- ✅ Role-based access control
- ✅ Add/Edit/Delete companies (in memory)
- ✅ Add/Edit/Delete students (in memory)
- ✅ Form validation with error messages
- ✅ Confirmation alerts for destructive actions
- ✅ Responsive design on all devices
- ✅ Orange-white theme compliance

---

## File Locations

### Components
```
frontend/src/components/
├── PlacementCoordinatorLogin.jsx      [Login modal]
├── CompanyEditModal.jsx               [Company form]
└── StudentEditModal.jsx               [Student form]
```

### Pages
```
frontend/src/pages/
└── PlacementDashboard.jsx             [Main page - ENHANCED]
```

### Backend
```
backend/routes/
├── placementController.js             [Business logic]
└── placement.js                       [API routes]
```

### Documentation
```
Root directory/
├── PLACEMENT_COORDINATOR_SYSTEM.md
├── PLACEMENT_COORDINATOR_SETUP.md
├── PLACEMENT_COORDINATOR_QUICKSTART.md
├── PLACEMENT_IMPLEMENTATION_SUMMARY.md
└── DEMO_CREDENTIALS_NOTES.md          [This file]
```

---

## Testing Scenarios

### Scenario 1: Add a New Company
```
1. Login with demo credentials
2. Go to Companies tab
3. Click "➕ Add New Company"
4. Fill in:
   - Company Name: "Meta"
   - Location: "Pune"
   - Min Package: "18 LPA"
   - Max Package: "25 LPA"
5. Click "Add Company"
6. Success! Company appears in grid

⚠️ Note: Refresh = Data lost (use backend for persistence)
```

### Scenario 2: Edit a Company
```
1. Stay logged in as coordinator
2. Hover over any company card
3. Click the ✏️ (edit) button
4. Modify details (e.g., change package)
5. Click "Update Company"
6. Success! Changes reflect immediately

⚠️ Note: Changes are in-memory only
```

### Scenario 3: Delete a Company
```
1. Hover over any company card
2. Click 🗑️ (delete) button
3. Confirmation dialog appears
4. Click "OK" to confirm
5. Success! Company removed from list

⚠️ Note: Confirmation prevents accidental deletes
```

### Scenario 4: Add a Placed Student
```
1. Go to Students tab
2. Click "➕ Add Placed Student"
3. Fill in:
   - Name: "Priya Singh"
   - Roll No: "IT002"
   - Branch: "IT"
   - Company: "Meta"
   - Package: "22 LPA"
4. Click "Add Student"
5. Success! Student appears in management table

⚠️ Note: Only coordinators see this table
```

### Scenario 5: Form Validation Error
```
1. Try to add company without name
2. See error: "Company name is required"
3. Type company name
4. Error disappears automatically
5. Now you can submit

✓ Real-time validation works!
```

### Scenario 6: Student View (Without Login)
```
1. Logout (or use incognito window)
2. Go to Placement page
3. You should see:
   ✓ Companies (view-only)
   ✓ Students list (view-only)
   ✓ Statistics
   ✓ "🔐 Coordinator Login" button
   ✗ NO edit buttons
   ✗ NO add buttons
   ✗ NO management table

✓ Students have view-only access!
```

---

## Customization Quick Tips

### Change Demo Email
**File**: `frontend/src/components/PlacementCoordinatorLogin.jsx`

Find:
```javascript
const DEMO_COORDINATORS = [
  { email: 'coordinator@college.edu', ...
```

Change to:
```javascript
const DEMO_COORDINATORS = [
  { email: 'your-email@college.edu', ...
```

### Add Another Coordinator
**File**: `frontend/src/components/PlacementCoordinatorLogin.jsx`

Add to DEMO_COORDINATORS array:
```javascript
{ 
  email: 'another-coordinator@college.edu', 
  password: 'password123', 
  name: 'Another Coordinator', 
  role: 'placement_coordinator' 
},
```

### Add More Branches
**File**: `frontend/src/components/StudentEditModal.jsx`

Find:
```javascript
const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'CIVIL'];
```

Add your branches:
```javascript
const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'CIVIL', 'ARCH', 'BIO'];
```

---

## Troubleshooting

### Issue: Login button not showing
```
Solution: 
1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh page
3. Look for "🔐 Coordinator Login" button in page header
4. If still missing, check browser console (F12)
```

### Issue: Can't login with demo credentials
```
Verify:
- Email exactly: coordinator@college.edu
- Password exactly: coordinator123
- Check for CAPS LOCK
- Try in browser incognito mode
- Check console for error message
```

### Issue: Edit/Delete buttons not visible after login
```
Verify:
- See "Logged in as" text in header
- Check that role is "placement_coordinator" or "admin"
- If not showing, user might not be logged in properly
- Try logout and login again
```

### Issue: Added data disappeared after refresh
```
Expected behavior:
- Data is stored in component state ONLY
- Page refresh clears all changes
- This is normal for demo version
- To persist data: Connect to backend (see setup guide)
```

### Issue: Form shows error but field looks correct
```
Check requirements:
Company form:
  - Name: Required (cannot be empty)
  - Location: Required (cannot be empty)
  - Email: If provided, must be valid format (xxx@xxx.xxx)

Student form:
  - Name: Required
  - Roll Number: Required
  - Company: Required
  - Email: If provided, must be valid format
```

---

## Security Reminders

### ⚠️ For Testing/Demo Only
```
✓ Use these credentials only during development
✓ Change credentials before production
✓ Don't commit passwords to version control
✓ Use environment variables for sensitive data
```

### ⚠️ Before Production
```
❌ DO NOT hardcode credentials in component
❌ DO NOT ship demo credentials to production
❌ DO NOT trust frontend validation alone
✅ DO implement backend authentication
✅ DO use JWT tokens for sessions
✅ DO hash passwords with bcrypt
✅ DO validate on backend
```

---

## API Integration Notes

### Currently
```
✓ Frontend uses component state
✓ No API calls made
✓ Data lost on refresh
✓ Perfect for testing
```

### To Connect Backend
```
1. Update API endpoints in PlacementDashboard.jsx
2. Add to server.js: import placement routes
3. Connect to database
4. Replace in-memory data with DB queries
5. Implement JWT authentication
6. See PLACEMENT_COORDINATOR_SETUP.md for details
```

---

## Browser Compatibility

Tested and working on:
```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Chrome
✅ Mobile Safari
```

## Performance Notes

```
✓ Component loads instantly
✓ Forms render quickly
✓ No external API calls (yet)
✓ Smooth animations on all devices
✓ Responsive design works great
```

---

## Next Actions Checklist

- [ ] Test login with demo credentials
- [ ] Test adding a company
- [ ] Test editing a student record
- [ ] Test form validation
- [ ] Verify responsive design on mobile
- [ ] Change demo email to your coordinator's email
- [ ] Add additional coordinators if needed
- [ ] Read full setup guide for backend integration
- [ ] Plan database migration
- [ ] Plan production deployment

---

## Support Contacts

**For Issues**:
1. Check documentation files
2. Review code comments
3. Check browser console (F12)
4. Verify demo credentials exact match

**For Customization**:
1. See corresponding setup guide
2. Look for marked sections in code
3. Follow variable naming conventions
4. Test after each change

---

## Version Info

```
Version: 1.0
Status: ✅ Ready for Testing
Release Date: January 31, 2026
Last Updated: January 31, 2026
```

---

## Quick Reference

| Action | Demo Email | Password |
|--------|-----------|----------|
| Coordinator Login | coordinator@college.edu | coordinator123 |
| Admin Login | admin@college.edu | admin123 |

| Feature | Location | Button/Link |
|---------|----------|------------|
| Login | Top of page | "🔐 Coordinator Login" |
| Add Company | Companies tab | "➕ Add New Company" |
| Add Student | Students tab | "➕ Add Placed Student" |
| Edit | On cards/rows | "✏️" button |
| Delete | On cards/rows | "🗑️" button |
| Logout | Top of page | "Logout" button |

---

**Happy Testing! 🎉**

Remember to read the full documentation for production deployment and backend integration details.
