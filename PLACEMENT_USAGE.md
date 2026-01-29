# 📊 Placement Cell - User Guide

## Table of Contents
1. [Student Guide](#student-guide)
2. [Admin Guide](#admin-guide)
3. [Search & Filter Guide](#search--filter-guide)
4. [FAQ](#faq)

---

## Student Guide

### 🎯 Accessing the Placement Module

#### Method 1: Navbar Button
1. Look for "📊 Placement" button in the top navigation bar
2. Click it to go directly to the Placement Dashboard

#### Method 2: Home Page
1. Scroll to the "Placement Cell" section on the home page
2. Click "Explore Placements →" button
3. You'll be taken to the main dashboard

#### Method 3: Direct URL
- Type `/placement` in the address bar and press Enter

### 📊 Placement Dashboard

The dashboard has 4 main tabs. Here's what you'll find in each:

#### Tab 1: Overview
**Statistics at a Glance**
- Total placed students
- Number of recruiting companies
- Average salary package
- Highest package offered
- Number of departments covered

**Top Performers**
- View students with highest packages
- See their companies and packages
- Use as motivation and reference

**Year-wise Trends**
- See how many students were placed each year
- Compare average packages across years
- Understand placement growth

#### Tab 2: Companies
**Browse All Companies**
1. View cards for all recruiting companies
2. See package range, location, and roles
3. Quick eligibility preview on each card

**Search Companies**
1. Type company name or location in search box
2. Results filter instantly as you type
3. Examples: "Google", "Mumbai", "Software"

**Sort Companies**
1. Click "Sort By" dropdown
2. Choose: "Name (A-Z)" or "Package (High-Low)"
3. Companies reorder immediately

**Filter by Package Range**
1. Adjust minimum and maximum sliders
2. See packages from 0-30 LPA
3. Results update in real-time

**View Company Details**
1. Click "View Details" on any company card
2. See full company information page
3. Click back button to return to dashboard

#### Tab 3: Students
**View Placed Students**
1. Click this tab to go to student listing page
2. See all 500+ students who got placed
3. View their companies, packages, and branches

#### Tab 4: Analytics
**Understand Placement Trends**
- Left side: Branch-wise breakdown with progress bars
- Right side: Top companies by student count
- Use this to understand competition and opportunities

### 👥 Viewing Placed Students

#### Accessing Student Listing
1. Click "Students" tab on dashboard
2. Or go directly to `/placement/students`

#### Search for Students
1. Use the search box at the top
2. Search by: Student name, Roll number, or Email
3. Results appear instantly

#### Filter by Multiple Criteria
1. **Branch:** Select your branch from dropdown
2. **Batch:** Choose your batch year
3. **Company:** Filter by specific company
4. Mix and match filters for precise results

#### Sort Results
1. **Name (A-Z):** Alphabetical order
2. **Package (High-Low):** Highest paying first
3. **Batch (Latest):** Most recent placements first

#### Switch View Modes
1. **List View:** Table format with all details
2. **Grid View:** Card format, easier to browse

#### Reset Filters
1. Click "Reset" button to clear all filters
2. See all students again

### 🏢 Viewing Company Details

#### From Company Card
1. On Companies tab, click "View Details" button
2. Opens detailed company page

#### On Company Detail Page
**Left Sidebar Contains:**
1. **Package Details**
   - Base package
   - Minimum package
   - Internship stipend

2. **Contact Information**
   - HR email (clickable - opens email client)
   - Company website (clickable - opens in new tab)

3. **Visit History**
   - Current year with green checkmark
   - Previous years they visited

**Right Content Contains:**
1. **Job Roles Available**
   - All positions company is hiring for
   - Full-time and internship packages
   - Role descriptions if available

2. **Eligibility Criteria**
   - CGPA requirement
   - Eligible branches (all of them shown)
   - Years of passing they accept
   - Backlog policy (allowed or not)

3. **Selection Process**
   - Numbered steps (usually 1-4)
   - Type of rounds (written test, technical, HR)
   - What to expect in each round

4. **Call to Action**
   - "Visit Company Website" button
   - "Contact HR" button
   - Links to reach out or learn more

#### Back to Dashboard
1. Click "← Back to Placement" at the top
2. Returns to the dashboard

### ✅ How to Use This Information

**For Preparation:**
1. Check eligibility - are you qualified?
2. Review selection process - what tests to prepare for?
3. Visit company website - understand their business
4. Check student placements - what packages are realistic?

**For Decision Making:**
1. Compare multiple companies
2. Check eligibility for each
3. Research salary and benefits
4. Connect with alumni who got placed

**For Planning:**
1. Use analytics to understand competition
2. See which branches place most students
3. Understand package ranges
4. Plan your skill development accordingly

---

## Admin Guide

### 🔐 Accessing Admin Panel

1. Make sure you're logged in as an Admin user
2. Navigate to `/admin/placement`
3. Or look for admin section in navigation menu

### 📊 Admin Dashboard Overview

The admin panel has 3 main tabs:

#### Tab 1: Overview
**Statistics Dashboard**
- Total placed students
- Number of companies
- Number of branches
- Average package
- Highest package

**Year-wise Trends**
- Student count by year
- Average package by year
- Visual progress bars
- Historical data

**Branch-wise Placement**
- All 6 branches with percentages
- How many students placed per branch
- Visual breakdown with progress bars

### 🏢 Managing Companies

#### Add New Company
1. Click "+ Add Company" button
2. Fill in the form:
   - **Company Name:** Full official name
   - **Location:** Headquarters location
   - **Min Package:** Starting salary (e.g., "12 LPA")
   - **Max Package:** Highest offer (e.g., "20 LPA")
   - **Contact Email:** HR email address
   - **Website:** Company website URL
3. Click "Create" to add the company
4. Company appears in the companies grid

#### Edit Existing Company
1. Find the company in the grid
2. Click "Edit" button on its card
3. The form will populate with current data
4. Make changes as needed
5. Click "Update" to save changes
6. Click "Cancel" to discard changes

#### Delete Company
1. Find the company in the grid
2. Click "Delete" button
3. Confirmation dialog appears
4. Click "OK" to confirm deletion
5. Company is removed from the system

#### Search Companies
1. Use the search box at the top
2. Search by company name or location
3. Results filter instantly
4. Matches appear in real-time

### 👨‍🎓 Managing Students

#### Add New Student Placement
1. Click "+ Add Student" button
2. Fill in the form:
   - **Student Name:** Full name
   - **Roll Number:** Student ID
   - **Branch:** Select from dropdown (CSE, IT, etc.)
   - **Batch:** Graduation year
   - **Company:** Which company hired them
   - **Position:** Job title/role
   - **Package:** Salary offer
   - **Location:** Work location
   - **Email:** Student email address
3. Click "Create" to add the student
4. Student appears in the students table

#### Edit Student Record
1. Find the student in the table
2. Click "Edit" button in the last column
3. The form will populate with current data
4. Make changes as needed
5. Click "Update" to save
6. Click "Cancel" to discard

#### Delete Student Record
1. Find the student in the table
2. Click "Delete" button in the last column
3. Confirmation dialog appears
4. Click "OK" to confirm
5. Student record is removed

#### Search Students
1. Use the search box at the top
2. Search by name, roll number, or company
3. Results filter instantly

### 📈 Analyzing Data

#### View Overall Statistics
1. Go to "Overview" tab
2. See key metrics in colored cards
3. 5 main statistics displayed:
   - Total Placed
   - Companies
   - Branches
   - Avg Package
   - Highest

#### Analyze Trends
1. Check "Year-wise Placement" section
2. See placement progression over years
3. Compare average packages annually
4. Identify trends and patterns

#### Branch Analysis
1. Scroll down to "Branch-wise Placement"
2. See which branches place most students
3. Check percentage by branch
4. Use for targeted improvement strategies

---

## Search & Filter Guide

### 🔍 Search Capabilities

#### Company Search
- **Search Field:** Name, location
- **Case:** Insensitive (Google = google)
- **Partial Match:** Works with partial names
- **Examples:**
  - "Google" → finds Google
  - "Soft" → finds Microsoft
  - "Mumbai" → finds companies in Mumbai

#### Student Search
- **Search Fields:** Name, roll number, email
- **Case:** Insensitive
- **Examples:**
  - "Raj Kumar" → finds Raj Kumar's record
  - "CS001" → finds by roll number
  - "raj@email.com" → finds by email

### 🔎 Filter Combinations

#### Example 1: Find CSE Students Placed in 2023
1. Go to `/placement/students`
2. Select "CSE" in Branch filter
3. Select "2023" in Batch filter
4. See all CSE students graduating in 2023

#### Example 2: Find High-Paying Placements
1. On Companies tab
2. Set minimum package to 18 LPA
3. Set maximum to 30 LPA
4. Click "Package (High-Low)" sort
5. See highest paying companies first

#### Example 3: Find Students at Google
1. Go to Students page
2. Select "Google" in Company filter
3. See all students placed at Google
4. View their packages and branches

#### Example 4: Find Available Companies for IT Branch
1. Go to Company Details
2. Check Eligibility Criteria
3. See if "IT" is in eligible branches
4. Verify CGPA and other requirements

### 📊 Sorting Options

#### Company Sorting
1. **Name (A-Z):** Alphabetical by company name
2. **Package (High-Low):** Highest salary first

#### Student Sorting
1. **Name (A-Z):** Alphabetical by student name
2. **Package (High-Low):** Highest salary first
3. **Batch (Latest):** Most recent placements first

### 🎯 Advanced Filtering Tips

**Tip 1: Multi-Filter Search**
- Combine multiple filters for precise results
- Use search + filters together
- Results update instantly

**Tip 2: Package Range Filtering**
- Use slider to set range
- Drag handles to adjust
- See results in real-time

**Tip 3: Reset Filters**
- Use "Reset" button to clear all
- Starts fresh search
- Faster than clearing individually

**Tip 4: View Mode Toggle**
- Switch between list and grid
- List for details, grid for browsing
- Use whichever is easier for you

---

## FAQ

### Q: How do I check if I'm eligible for a company?
**A:** 
1. Go to the company's detail page
2. Scroll to "Eligibility Criteria"
3. Check CGPA requirement, branches, and years
4. You must meet ALL criteria to apply

### Q: Where can I find contact information for companies?
**A:**
1. Go to company detail page
2. Left sidebar has "Contact Information"
3. Click email to send message to HR
4. Click website to visit company website

### Q: How many students get placed on average?
**A:** Check the "Overview" tab on the dashboard. Current stats show 500+ students placed with 95%+ success rate.

### Q: What's the highest salary package offered?
**A:** 
1. Go to Companies tab
2. Sort by "Package (High-Low)"
3. Highest is at the top
4. Currently: 22 LPA from Google

### Q: How do I search for placements in a specific company?
**A:**
1. Go to `/placement/students`
2. Click "Company" filter dropdown
3. Select the company name
4. See all students placed there

### Q: Can I filter by multiple criteria at once?
**A:** Yes! Use any combination of:
- Branch + Batch + Company
- Search term + all filters
- All work together instantly

### Q: How do I prepare for the selection process?
**A:**
1. Find the company on dashboard
2. Click "View Details"
3. Scroll to "Selection Process"
4. See the steps and prepare accordingly

### Q: Is there any information about salaries?
**A:** Yes! Each company shows:
- Minimum and maximum package
- Base salary information
- Internship stipend (if available)

### Q: How can I view placements from my branch?
**A:**
1. Go to `/placement/students`
2. Select your branch in filter
3. See all students from your branch
4. Check their companies and packages

### Q: Where do I find information about previous years' placements?
**A:**
1. Go to company detail page
2. Check "Visit History" on left
3. See years company visited campus
4. Analytics tab shows historical trends

### Q: Can I export placement data?
**A:** Currently, you can:
1. Take screenshots of data
2. Copy from list view
3. Future versions will have export feature

### Q: Is the placement information updated regularly?
**A:** Yes, the admin team updates the system:
- New companies are added
- Student records updated
- Statistics refreshed regularly
- Check back often for updates

### Q: How do I contact someone who was placed?
**A:** 
1. Find student on `/placement/students`
2. See their email in the record
3. Send them a direct message
4. Network and ask for advice

### Q: What if my branch is not listed?
**A:** All branches are included:
- CSE (Computer Science)
- IT (Information Technology)
- ECE (Electronics & Communication)
- EEE (Electrical & Electronics)
- MECH (Mechanical)
- CIVIL (Civil Engineering)

### Q: How often are new placements added?
**A:** 
1. During placement season - daily
2. Off-season - weekly updates
3. Admin updates as placements occur
4. Check regularly for latest news

### Q: Can I suggest a new company?
**A:** 
1. Contact Placement Cell directly
2. Email: placement@srit.ac.in
3. Phone: +91-951-501-1111
4. Share company details with admin

### Q: What should I do if I see incorrect information?
**A:**
1. Note the error details
2. Contact admin immediately
3. Email: placement@srit.ac.in
4. Provide corrected information

### Q: Is this information confidential?
**A:** 
- Student names and placements are listed
- Privacy is maintained appropriately
- Contact info is provided by students
- All data is secure

### Q: When does the placement season start?
**A:** 
1. Check Placement Cell announcements
2. Visit placement cell office
3. Look for email notifications
4. Check website regularly

### Q: How do I prepare for interviews?
**A:**
1. Use selection process info
2. Research the company
3. Practice common questions
4. Consider coaching/resources

---

## Tips for Success 🎓

1. **Start Early:** Review companies from year 1
2. **Improve Skills:** Work on CGPA and technical skills
3. **Stay Updated:** Check placement module regularly
4. **Network:** Connect with placed students
5. **Prepare:** Know selection process before interviews
6. **Be Professional:** Good communication helps
7. **Research:** Understand company culture
8. **Polish Resume:** Have a strong CV ready

---

**For More Help:**
- Visit Placement Cell Office
- Email: placement@srit.ac.in
- Phone: +91-951-501-1111
- Website: www.srit.ac.in

**Last Updated:** 2024  
**Status:** ✅ Ready to Use
