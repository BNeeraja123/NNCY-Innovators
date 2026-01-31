// Placement Management Controller
// Handles companies, placed students, and placement statistics

// Demo placement data (in-memory for now, can be moved to database)
let placementCompanies = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://i.pravatar.cc/150?img=1',
    roles: [
      { title: 'Software Engineer', package: '18-22 LPA', internship: '3 LPA' },
      { title: 'Data Analyst', package: '16-18 LPA', internship: '2.5 LPA' }
    ],
    minPackage: '16 LPA',
    maxPackage: '22 LPA',
    visitYear: 2024,
    location: 'Mountain View, USA',
    website: 'google.com',
    contactEmail: 'recruiter@google.com',
    eligibility: { branches: ['CSE', 'IT'], minCGPA: 7.0, backlogAllowed: false },
    selectionProcess: ['Online Assessment', 'Technical Interview', 'HR Interview'],
    registrationDeadline: '2024-12-15',
    registrationLink: 'https://google.com/careers',
    registrationStatus: 'open',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin@college.edu'
  }
];

let placedStudents = [
  {
    id: 1,
    name: 'Raj Kumar',
    rollNo: 'CSE001',
    branch: 'CSE',
    batch: '2024',
    company: 'Google',
    position: 'Software Engineer',
    package: '20 LPA',
    location: 'Bangalore',
    email: 'raj@college.edu',
    internship: 'Yes',
    placeYear: 2024,
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin@college.edu'
  }
];

// Get all companies
const getCompanies = (req, res) => {
  try {
    res.json({
      success: true,
      data: placementCompanies
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single company
const getCompanyById = (req, res) => {
  try {
    const { id } = req.params;
    const company = placementCompanies.find(c => c.id === parseInt(id));
    
    if (!company) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }
    
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new company
const createCompany = (req, res) => {
  try {
    const { name, logo, roles, minPackage, maxPackage, visitYear, location, website, contactEmail, eligibility, selectionProcess, registrationDeadline, registrationLink, registrationStatus } = req.body;
    
    // Validate required fields
    if (!name || !location) {
      return res.status(400).json({ success: false, error: 'Company name and location are required' });
    }
    
    const newCompany = {
      id: Math.max(...placementCompanies.map(c => c.id), 0) + 1,
      name,
      logo: logo || 'https://i.pravatar.cc/150?img=default',
      roles: roles || [],
      minPackage: minPackage || '',
      maxPackage: maxPackage || '',
      visitYear: visitYear || new Date().getFullYear(),
      location,
      website: website || '',
      contactEmail: contactEmail || '',
      eligibility: eligibility || {},
      selectionProcess: selectionProcess || [],
      registrationDeadline: registrationDeadline || '',
      registrationLink: registrationLink || '',
      registrationStatus: registrationStatus || 'open',
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'admin@college.edu'
    };
    
    placementCompanies.push(newCompany);
    
    res.json({
      success: true,
      message: 'Company added successfully',
      data: newCompany
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update company
const updateCompany = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const companyIndex = placementCompanies.findIndex(c => c.id === parseInt(id));
    
    if (companyIndex === -1) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }
    
    placementCompanies[companyIndex] = {
      ...placementCompanies[companyIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'admin@college.edu'
    };
    
    res.json({
      success: true,
      message: 'Company updated successfully',
      data: placementCompanies[companyIndex]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete company
const deleteCompany = (req, res) => {
  try {
    const { id } = req.params;
    
    const companyIndex = placementCompanies.findIndex(c => c.id === parseInt(id));
    
    if (companyIndex === -1) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }
    
    const deletedCompany = placementCompanies.splice(companyIndex, 1);
    
    res.json({
      success: true,
      message: 'Company deleted successfully',
      data: deletedCompany[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all placed students
const getPlacedStudents = (req, res) => {
  try {
    res.json({
      success: true,
      data: placedStudents
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create placed student record
const createPlacedStudent = (req, res) => {
  try {
    const { name, rollNo, branch, batch, company, position, package: pkg, location, email } = req.body;
    
    if (!name || !rollNo || !company) {
      return res.status(400).json({ success: false, error: 'Name, roll number, and company are required' });
    }
    
    const newStudent = {
      id: Math.max(...placedStudents.map(s => s.id), 0) + 1,
      name,
      rollNo,
      branch: branch || '',
      batch: batch || '',
      company,
      position: position || '',
      package: pkg || '',
      location: location || '',
      email: email || '',
      internship: 'Yes',
      placeYear: new Date().getFullYear(),
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'admin@college.edu'
    };
    
    placedStudents.push(newStudent);
    
    res.json({
      success: true,
      message: 'Student placed record created',
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update placed student
const updatePlacedStudent = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const studentIndex = placedStudents.findIndex(s => s.id === parseInt(id));
    
    if (studentIndex === -1) {
      return res.status(404).json({ success: false, error: 'Student record not found' });
    }
    
    placedStudents[studentIndex] = {
      ...placedStudents[studentIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'admin@college.edu'
    };
    
    res.json({
      success: true,
      message: 'Student record updated',
      data: placedStudents[studentIndex]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete placed student
const deletePlacedStudent = (req, res) => {
  try {
    const { id } = req.params;
    
    const studentIndex = placedStudents.findIndex(s => s.id === parseInt(id));
    
    if (studentIndex === -1) {
      return res.status(404).json({ success: false, error: 'Student record not found' });
    }
    
    const deletedStudent = placedStudents.splice(studentIndex, 1);
    
    res.json({
      success: true,
      message: 'Student record deleted',
      data: deletedStudent[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get placement statistics
const getPlacementStats = (req, res) => {
  try {
    const stats = {
      totalPlaced: placedStudents.length,
      totalCompanies: placementCompanies.length,
      avgPackage: placedStudents.length > 0 
        ? (placedStudents.reduce((sum, s) => {
            const pkg = parseFloat(s.package);
            return sum + (isNaN(pkg) ? 0 : pkg);
          }, 0) / placedStudents.length).toFixed(2)
        : 0,
      highestPackage: placedStudents.length > 0
        ? Math.max(...placedStudents.map(s => parseFloat(s.package) || 0)).toFixed(2)
        : 0
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getPlacedStudents,
  createPlacedStudent,
  updatePlacedStudent,
  deletePlacedStudent,
  getPlacementStats
};
