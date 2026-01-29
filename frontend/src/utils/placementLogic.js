import { placementDatabase, placedStudentsDatabase, branches, batches } from '../data/placementData';

/**
 * Search and filter companies
 */
export const searchAndFilterCompanies = (
  query = '',
  minPackage = 0,
  maxPackage = 30,
  sortBy = 'name'
) => {
  let results = [...placementDatabase];

  // Search by company name
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.location.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by package range
  results = results.filter(company => {
    const maxPkg = parseInt(company.maxPackage.split(' ')[0]);
    return maxPkg >= minPackage && maxPkg <= maxPackage;
  });

  // Sort
  switch (sortBy) {
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'package':
      results.sort((a, b) => 
        parseInt(b.maxPackage) - parseInt(a.maxPackage)
      );
      break;
    default:
      break;
  }

  return results;
};

/**
 * Get company by ID
 */
export const getCompanyById = (id) => {
  return placementDatabase.find(company => company.id === parseInt(id));
};

/**
 * Search and filter placed students
 */
export const searchAndFilterStudents = (
  query = '',
  filterBranch = 'All',
  filterBatch = 'All',
  filterCompany = 'All',
  sortBy = 'name'
) => {
  let results = [...placedStudentsDatabase];

  // Search by name, roll number, or email
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.rollNo.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by branch
  if (filterBranch !== 'All') {
    results = results.filter(student => student.branch === filterBranch);
  }

  // Filter by batch
  if (filterBatch !== 'All') {
    results = results.filter(student => student.batch === parseInt(filterBatch));
  }

  // Filter by company
  if (filterCompany !== 'All') {
    results = results.filter(student => student.company === filterCompany);
  }

  // Sort
  switch (sortBy) {
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'package':
      results.sort((a, b) => 
        parseInt(b.package) - parseInt(a.package)
      );
      break;
    case 'batch':
      results.sort((a, b) => b.batch - a.batch);
      break;
    default:
      break;
  }

  return results;
};

/**
 * Get student by ID
 */
export const getStudentById = (id) => {
  return placedStudentsDatabase.find(student => student.id === parseInt(id));
};

/**
 * Get placement statistics
 */
export const getPlacementStats = () => {
  const totalStudents = placedStudentsDatabase.length;
  const uniqueCompanies = new Set(placedStudentsDatabase.map(s => s.company)).size;
  const uniqueBranches = new Set(placedStudentsDatabase.map(s => s.branch)).size;
  
  const avgPackage = (
    placedStudentsDatabase.reduce((sum, s) => sum + parseInt(s.package), 0) / totalStudents
  ).toFixed(2);

  const highestPackage = Math.max(
    ...placedStudentsDatabase.map(s => parseInt(s.package))
  );

  return {
    totalPlaced: totalStudents,
    totalCompanies: uniqueCompanies,
    uniqueBranches,
    avgPackage,
    highestPackage
  };
};

/**
 * Get year-wise placement data
 */
export const getYearWisePlacement = () => {
  const yearData = {};
  
  placedStudentsDatabase.forEach(student => {
    if (!yearData[student.placeYear]) {
      yearData[student.placeYear] = {
        year: student.placeYear,
        count: 0,
        avgPackage: 0,
        totalPackage: 0
      };
    }
    yearData[student.placeYear].count++;
    yearData[student.placeYear].totalPackage += parseInt(student.package);
  });

  // Calculate averages
  Object.keys(yearData).forEach(year => {
    yearData[year].avgPackage = (
      yearData[year].totalPackage / yearData[year].count
    ).toFixed(2);
  });

  return Object.values(yearData).sort((a, b) => b.year - a.year);
};

/**
 * Get branch-wise placement
 */
export const getBranchWisePlacement = () => {
  const branchData = {};

  branches.forEach(branch => {
    const branchStudents = placedStudentsDatabase.filter(s => s.branch === branch);
    branchData[branch] = {
      branch,
      count: branchStudents.length,
      avgPackage: branchStudents.length > 0 
        ? (branchStudents.reduce((sum, s) => sum + parseInt(s.package), 0) / branchStudents.length).toFixed(2)
        : 0
    };
  });

  return branchData;
};

/**
 * Get company-wise placement
 */
export const getCompanyWisePlacement = () => {
  const companyData = {};

  placementDatabase.forEach(company => {
    const companyStudents = placedStudentsDatabase.filter(s => s.company === company.name);
    companyData[company.name] = {
      company: company.name,
      count: companyStudents.length,
      avgPackage: companyStudents.length > 0
        ? (companyStudents.reduce((sum, s) => sum + parseInt(s.package), 0) / companyStudents.length).toFixed(2)
        : 0
    };
  });

  return Object.values(companyData).sort((a, b) => b.count - a.count);
};

/**
 * Get top performing students
 */
export const getTopStudents = (limit = 5) => {
  return [...placedStudentsDatabase]
    .sort((a, b) => parseInt(b.package) - parseInt(a.package))
    .slice(0, limit);
};

/**
 * Get unique companies list
 */
export const getUniqueCompanies = () => {
  return [...new Set(placedStudentsDatabase.map(s => s.company))].sort();
};
