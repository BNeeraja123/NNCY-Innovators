/**
 * Analytics & Achievements Module Data
 * Contains: Rankings, Awards, Achievements, Media Mentions, and Reports
 */

// Institutional Rankings Data
export const rankingsData = [
  {
    id: 1,
    organization: 'NIRF (National Institutional Ranking Framework)',
    category: 'Overall',
    year: 2024,
    rank: 45,
    country: 'India',
    type: 'national',
    link: 'https://www.nirfindia.org/',
    improvedFrom: 52,
    badge: '🏆'
  },
  {
    id: 2,
    organization: 'NIRF',
    category: 'Engineering',
    year: 2024,
    rank: 38,
    country: 'India',
    type: 'national',
    link: 'https://www.nirfindia.org/',
    improvedFrom: 45,
    badge: '🏆'
  },
  {
    id: 3,
    organization: 'QS World University Rankings',
    category: 'Asia University Rankings',
    year: 2024,
    rank: 287,
    country: 'World',
    type: 'international',
    link: 'https://www.topuniversities.com/',
    improvedFrom: 312,
    badge: '🌍'
  },
  {
    id: 4,
    organization: 'Times Higher Education',
    category: 'THE Asia University Rankings',
    year: 2024,
    rank: 156,
    country: 'World',
    type: 'international',
    link: 'https://www.timeshighereducation.com/',
    improvedFrom: 178,
    badge: '🌍'
  },
  {
    id: 5,
    organization: 'India Today',
    category: 'Best Engineering Colleges',
    year: 2023,
    rank: 18,
    country: 'India',
    type: 'national',
    link: 'https://www.indiatoday.in/',
    improvedFrom: 22,
    badge: '⭐'
  },
  {
    id: 6,
    organization: 'Outlook India',
    category: 'Engineering Excellence',
    year: 2023,
    rank: 15,
    country: 'India',
    type: 'national',
    link: 'https://www.outlookindia.com/',
    improvedFrom: 19,
    badge: '⭐'
  },
  {
    id: 7,
    organization: 'Business Today',
    category: 'Best Management Institutes',
    year: 2024,
    rank: 25,
    country: 'India',
    type: 'national',
    link: 'https://www.businesstoday.in/',
    improvedFrom: 31,
    badge: '⭐'
  }
];

// Awards Data
export const awardsData = [
  // Institution Awards
  {
    id: 1,
    name: 'National Board of Accreditation (NBA) Accreditation',
    awardee: 'Institution',
    giver: 'NBA - AICTE',
    year: 2023,
    category: 'Accreditation',
    description: 'All engineering programs accredited by NBA',
    icon: '🏅',
    type: 'institutional',
    validity: '2023-2027'
  },
  {
    id: 2,
    name: 'NAAC Accreditation (A Grade)',
    awardee: 'Institution',
    giver: 'NAAC',
    year: 2022,
    category: 'Accreditation',
    description: 'Grade A in NAAC assessment',
    icon: '🏅',
    type: 'institutional',
    validity: '2022-2027'
  },
  {
    id: 3,
    name: 'Green Campus Award',
    awardee: 'Institution',
    giver: 'Ministry of Education',
    year: 2023,
    category: 'Sustainability',
    description: 'Recognition for environmental initiatives',
    icon: '🌱',
    type: 'institutional'
  },
  {
    id: 4,
    name: 'ISO 9001:2015 Certification',
    awardee: 'Institution',
    giver: 'International Standards Organization',
    year: 2022,
    category: 'Quality Management',
    description: 'Quality management system certification',
    icon: '✅',
    type: 'institutional'
  },
  {
    id: 5,
    name: 'Innovation Excellence Award',
    awardee: 'Institution',
    giver: 'National Innovation Council',
    year: 2023,
    category: 'Innovation',
    description: 'Excellence in research and innovation',
    icon: '💡',
    type: 'institutional'
  },

  // Student Awards
  {
    id: 6,
    name: 'National Talent Search Exam (NTSE) Scholars',
    awardee: 'Students',
    giver: 'NCERT',
    year: 2023,
    category: 'National Scholarship',
    description: '25 students awarded NTSE scholarship',
    icon: '🎓',
    type: 'student',
    count: 25
  },
  {
    id: 7,
    name: 'JEE Advanced All India Rank 1',
    awardee: 'Student - Raj Kumar',
    giver: 'NTA',
    year: 2023,
    category: 'National Exam',
    description: 'All India Rank 1 in JEE Advanced',
    icon: '🥇',
    type: 'student'
  },
  {
    id: 8,
    name: 'GATE Topper Award',
    awardee: 'Alumni - Priya Singh',
    giver: 'IIT',
    year: 2023,
    category: 'Postgraduate Exam',
    description: 'Topped GATE examination',
    icon: '🥇',
    type: 'student'
  },
  {
    id: 9,
    name: 'National Science Olympiad Winners',
    awardee: 'Student Teams',
    giver: 'Indian Science Olympiad',
    year: 2023,
    category: 'Science Competition',
    description: '3 teams won in national competitions',
    icon: '🔬',
    type: 'student',
    count: 3
  },
  {
    id: 10,
    name: 'Young Scientist Award',
    awardee: 'Students - Research Wing',
    giver: 'Department of Science & Technology',
    year: 2023,
    category: 'Research',
    description: '5 students received young scientist awards',
    icon: '🔭',
    type: 'student',
    count: 5
  },

  // Faculty Awards
  {
    id: 11,
    name: 'Padma Shri Award',
    awardee: 'Prof. Dr. Raj Patel',
    giver: 'Government of India',
    year: 2022,
    category: 'National Honor',
    description: 'Padma Shri for contribution to education',
    icon: '👑',
    type: 'faculty'
  },
  {
    id: 12,
    name: 'Best Faculty Award',
    awardee: 'Dr. Priya Sharma',
    giver: 'Ministry of Education',
    year: 2023,
    category: 'Teaching Excellence',
    description: 'Best faculty in engineering education',
    icon: '🎖️',
    type: 'faculty'
  },
  {
    id: 13,
    name: 'Research Excellence Award',
    awardee: '15 Faculty Members',
    giver: 'CSIR',
    year: 2023,
    category: 'Research',
    description: 'Faculty recognized for groundbreaking research',
    icon: '🔬',
    type: 'faculty',
    count: 15
  },
  {
    id: 14,
    name: 'Innovation Ambassador',
    awardee: 'Prof. Vikram Kumar',
    giver: 'Startup India',
    year: 2023,
    category: 'Entrepreneurship',
    description: 'Excellence in promoting innovation and startups',
    icon: '🚀',
    type: 'faculty'
  }
];

// Institutional Achievements
export const achievementsData = [
  {
    id: 1,
    title: 'Highest Placement Rate',
    description: 'Achieved 98% placement rate in 2023-24',
    year: 2024,
    details: '500+ students placed in top companies',
    category: 'Placement',
    impact: 'Major',
    icon: '📈'
  },
  {
    id: 2,
    title: 'Research Publications',
    description: 'Published 150+ research papers in national and international journals',
    year: 2023,
    details: 'In top-tier conferences like IEEE, ACM, Springer',
    category: 'Research',
    impact: 'High',
    icon: '📚'
  },
  {
    id: 3,
    title: 'Patents Filed',
    description: 'Filed 25 patents in the last 2 years',
    year: 2023,
    details: 'Covering AI, IoT, Renewable Energy domains',
    category: 'Innovation',
    impact: 'High',
    icon: '⚙️'
  },
  {
    id: 4,
    title: 'Industry Collaborations',
    description: 'Partnerships with 50+ Fortune 500 companies',
    year: 2024,
    details: 'Microsoft, Google, Amazon, TCS, Infosys',
    category: 'Partnerships',
    impact: 'High',
    icon: '🤝'
  },
  {
    id: 5,
    title: 'Startup Incubation',
    description: 'Incubated 30+ startups with 50 Crore+ combined valuation',
    year: 2023,
    details: 'Provided mentorship, funding, and infrastructure',
    category: 'Entrepreneurship',
    impact: 'Major',
    icon: '🚀'
  },
  {
    id: 6,
    title: 'International Collaborations',
    description: 'Partnership with 25+ international universities',
    year: 2024,
    details: 'Exchange programs, joint research, dual degrees',
    category: 'Global',
    impact: 'Medium',
    icon: '🌍'
  },
  {
    id: 7,
    title: 'Infrastructure Development',
    description: 'Investment of ₹50 Crore in campus modernization',
    year: 2023,
    details: 'AI Labs, IoT Centers, Innovation Hubs established',
    category: 'Infrastructure',
    impact: 'Major',
    icon: '🏗️'
  },
  {
    id: 8,
    title: 'Scholarship Disbursement',
    description: 'Distributed ₹5 Crore scholarships to 500+ students',
    year: 2023,
    details: 'Merit-based, need-based, and SC/ST scholarships',
    category: 'Social Impact',
    impact: 'High',
    icon: '🎓'
  },
  {
    id: 9,
    title: 'Alumni Network',
    description: 'Built network of 20,000+ successful alumni',
    year: 2024,
    details: 'Global presence across 50+ countries',
    category: 'Community',
    impact: 'Medium',
    icon: '👥'
  },
  {
    id: 10,
    title: 'Gender Diversity',
    description: 'Achieved 40% female student enrollment',
    year: 2023,
    details: 'Above national average of 30%',
    category: 'Diversity',
    impact: 'High',
    icon: '👩'
  }
];

// Media Mentions
export const mediaMentionsData = [
  {
    id: 1,
    publication: 'The Times of India',
    headline: 'Top-Ranked College Achieves 98% Placement',
    date: '2024-01-15',
    category: 'Placement',
    url: 'https://www.timesofindia.com/',
    excerpt: 'Our institution achieved remarkable placement success...',
    featured: true
  },
  {
    id: 2,
    publication: 'Hindu Business Line',
    headline: 'Innovation Hub Launches 30 Startups',
    date: '2024-01-10',
    category: 'Entrepreneurship',
    url: 'https://www.thehindubusinessline.com/',
    excerpt: 'The innovation center has successfully incubated...',
    featured: true
  },
  {
    id: 3,
    publication: 'India Today',
    headline: 'Engineering Excellence in Action',
    date: '2023-12-20',
    category: 'Innovation',
    url: 'https://www.indiatoday.in/',
    excerpt: 'Breaking new ground in engineering education...',
    featured: false
  },
  {
    id: 4,
    publication: 'CNBC-TV18',
    headline: 'Young Alumni Making Global Impact',
    date: '2023-12-10',
    category: 'Alumni Success',
    url: 'https://www.cnbctv18.com/',
    excerpt: 'Our graduates are leading innovation worldwide...',
    featured: false
  },
  {
    id: 5,
    publication: 'Economic Times',
    headline: 'NIRF Ranking Jump: 45 in Overall Rankings',
    date: '2023-10-15',
    category: 'Rankings',
    url: 'https://economictimes.indiatimes.com/',
    excerpt: 'Institution climbs 7 positions in NIRF rankings...',
    featured: true
  },
  {
    id: 6,
    publication: 'Mint',
    headline: 'Campus Green Initiative Wins National Award',
    date: '2023-09-20',
    category: 'Sustainability',
    url: 'https://www.livemint.com/',
    excerpt: 'Our sustainability initiatives recognized nationally...',
    featured: false
  },
  {
    id: 7,
    publication: 'Outlook India',
    headline: '25+ Patents Filed by Faculty and Students',
    date: '2023-08-15',
    category: 'Research',
    url: 'https://www.outlookindia.com/',
    excerpt: 'Record number of patent filings this year...',
    featured: false
  },
  {
    id: 8,
    publication: 'Indian Express',
    headline: 'International Partnerships Expand Horizons',
    date: '2023-07-10',
    category: 'Partnerships',
    url: 'https://www.indianexpress.com/',
    excerpt: 'Collaborations with top global universities...',
    featured: false
  }
];

// Yearly Reports (PDF Links and Info)
export const yearlyReportsData = [
  {
    id: 1,
    year: 2023,
    title: 'Annual Report 2023-24',
    fileName: 'Annual_Report_2023-24.pdf',
    fileSize: '8.5 MB',
    downloadDate: '2024-01-15',
    highlights: [
      'Achieved 98% placement rate',
      'Published 150+ research papers',
      'Filed 25 new patents',
      'Launched 30 startups',
      'Enrolled 1,250 new students'
    ],
    url: '/reports/Annual_Report_2023-24.pdf'
  },
  {
    id: 2,
    year: 2022,
    title: 'Annual Report 2022-23',
    fileName: 'Annual_Report_2022-23.pdf',
    fileSize: '7.8 MB',
    downloadDate: '2023-01-10',
    highlights: [
      'NAAC A Grade accreditation received',
      'Invested ₹50 Crore in infrastructure',
      'Distributed ₹5 Crore scholarships',
      'Established 3 new research centers',
      '20,000 strong alumni network'
    ],
    url: '/reports/Annual_Report_2022-23.pdf'
  },
  {
    id: 3,
    year: 2021,
    title: 'Annual Report 2021-22',
    fileName: 'Annual_Report_2021-22.pdf',
    fileSize: '7.2 MB',
    downloadDate: '2022-01-15',
    highlights: [
      'Achieved NIRF Rank 45 overall',
      'Expanded international partnerships',
      'Launched hybrid learning model',
      'Increased research output by 40%',
      '40% female student enrollment'
    ],
    url: '/reports/Annual_Report_2021-22.pdf'
  },
  {
    id: 4,
    year: 2020,
    title: 'Annual Report 2020-21',
    fileName: 'Annual_Report_2020-21.pdf',
    fileSize: '6.9 MB',
    downloadDate: '2021-01-20',
    highlights: [
      'Transitioned to online learning',
      'Maintained 95% placement rate',
      'Launched digital transformation',
      'Enhanced cybersecurity measures',
      'Started alumni mentorship program'
    ],
    url: '/reports/Annual_Report_2020-21.pdf'
  },
  {
    id: 5,
    year: 2019,
    title: 'Annual Report 2019-20',
    fileName: 'Annual_Report_2019-20.pdf',
    fileSize: '6.5 MB',
    downloadDate: '2020-01-15',
    highlights: [
      'Opened new innovation center',
      'Partnered with 50+ companies',
      'Established mentorship program',
      'Enhanced campus infrastructure',
      'Increased faculty strength'
    ],
    url: '/reports/Annual_Report_2019-20.pdf'
  }
];

// Key Statistics for Dashboard
export const institutionalStatsData = {
  totalRankings: rankingsData.length,
  nationalRankings: rankingsData.filter(r => r.type === 'national').length,
  internationalRankings: rankingsData.filter(r => r.type === 'international').length,
  totalAwards: awardsData.length,
  institutionalAwards: awardsData.filter(a => a.type === 'institutional').length,
  studentAwards: awardsData.filter(a => a.type === 'student').length,
  facultyAwards: awardsData.filter(a => a.type === 'faculty').length,
  totalAchievements: achievementsData.length,
  mediaMentions: mediaMentionsData.length,
  featuredMentions: mediaMentionsData.filter(m => m.featured).length,
  yearlyReports: yearlyReportsData.length,
  topRanking: Math.min(...rankingsData.map(r => r.rank)),
  latestYear: 2024
};

// Timeline of Milestones
export const milestonesData = [
  {
    year: 2024,
    title: 'Achieved NIRF Rank 45 Overall',
    description: 'Improved from rank 52 in previous year',
    icon: '🏆'
  },
  {
    year: 2023,
    title: 'Received NAAC A Grade',
    description: 'National Assessment and Accreditation Council Grade A',
    icon: '⭐'
  },
  {
    year: 2022,
    title: 'ISO 9001:2015 Certified',
    description: 'Quality management system certification',
    icon: '✅'
  },
  {
    year: 2021,
    title: 'Expanded Global Presence',
    description: 'Partnerships with 25+ international universities',
    icon: '🌍'
  },
  {
    year: 2020,
    title: 'Digital Transformation',
    description: 'Successfully transitioned to online learning',
    icon: '💻'
  },
  {
    year: 2019,
    title: 'Innovation Hub Launched',
    description: 'Created space for student entrepreneurship',
    icon: '🚀'
  }
];

// Department-wise Rankings
export const departmentRankingsData = [
  {
    id: 1,
    name: 'Computer Science & Engineering',
    nirf2024: 32,
    nirf2023: 38,
    students: 450,
    avgPackage: '18 LPA'
  },
  {
    id: 2,
    name: 'Electronics & Communication',
    nirf2024: 42,
    nirf2023: 48,
    students: 180,
    avgPackage: '14 LPA'
  },
  {
    id: 3,
    name: 'Mechanical Engineering',
    nirf2024: 48,
    nirf2023: 54,
    students: 200,
    avgPackage: '12 LPA'
  },
  {
    id: 4,
    name: 'Civil Engineering',
    nirf2024: 52,
    nirf2023: 58,
    students: 150,
    avgPackage: '10 LPA'
  },
  {
    id: 5,
    name: 'Electrical Engineering',
    nirf2024: 45,
    nirf2023: 51,
    students: 120,
    avgPackage: '13 LPA'
  }
];
