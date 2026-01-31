import { alumniDatabase, domains, companies } from '../data/alumniData';

/**
 * Search and filter alumni
 */
export const searchAndFilterAlumni = (
  query = '',
  filterDomain = 'All',
  filterCompany = 'All',
  filterYear = 'All',
  sortBy = 'name'
) => {
  let results = [...alumniDatabase];

  // Search by name, company, or role
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(alumni =>
      alumni.name.toLowerCase().includes(searchTerm) ||
      alumni.company.toLowerCase().includes(searchTerm) ||
      alumni.role.toLowerCase().includes(searchTerm) ||
      alumni.location.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by domain
  if (filterDomain !== 'All') {
    results = results.filter(alumni => alumni.domain === filterDomain);
  }

  // Filter by company
  if (filterCompany !== 'All') {
    results = results.filter(alumni => alumni.company === filterCompany);
  }

  // Filter by graduation year
  if (filterYear !== 'All') {
    results = results.filter(alumni => alumni.graduationYear === parseInt(filterYear));
  }

  // Sort results
  switch (sortBy) {
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'year':
      results.sort((a, b) => b.graduationYear - a.graduationYear);
      break;
    case 'yearsInIndustry':
      results.sort((a, b) => b.stats.yearsInIndustry - a.stats.yearsInIndustry);
      break;
    default:
      break;
  }

  return results;
};

/**
 * Get alumni by ID
 */
export const getAlumniById = (id) => {
  return alumniDatabase.find(alumni => alumni.id === parseInt(id));
};

/**
 * Get all unique graduation years
 */
export const getGraduationYears = () => {
  const years = [...new Set(alumniDatabase.map(a => a.graduationYear))];
  return years.sort((a, b) => b - a);
};

/**
 * Get statistics
 */
export const getAlumniStats = () => {
  return {
    totalAlumni: alumniDatabase.length,
    totalDomains: new Set(alumniDatabase.map(a => a.domain)).size,
    totalCompanies: new Set(alumniDatabase.map(a => a.company)).size,
    avgYearsInIndustry: (
      alumniDatabase.reduce((sum, a) => sum + a.stats.yearsInIndustry, 0) / 
      alumniDatabase.length
    ).toFixed(1)
  };
};

/**
 * Get domain distribution
 */
export const getDomainDistribution = () => {
  const distribution = {};
  domains.forEach(domain => {
    distribution[domain] = alumniDatabase.filter(a => a.domain === domain).length;
  });
  return distribution;
};

/**
 * Get company distribution
 */
export const getCompanyDistribution = () => {
  const distribution = {};
  companies.forEach(company => {
    distribution[company] = alumniDatabase.filter(a => a.company === company).length;
  });
  return distribution;
};

/**
 * Get trending success metrics
 */
export const getTrendingMetrics = () => {
  const sorted = [...alumniDatabase].sort((a, b) => {
    const scoreA = a.stats.yearsInIndustry * 10 + (a.achievements?.length || 0) * 5;
    const scoreB = b.stats.yearsInIndustry * 10 + (b.achievements?.length || 0) * 5;
    return scoreB - scoreA;
  });
  return sorted.slice(0, 5); // Top 5 alumni
};
