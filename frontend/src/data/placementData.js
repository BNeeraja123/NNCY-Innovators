// Placement Cell Data - Companies, Placements, and Eligibility

export const placementDatabase = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://i.pravatar.cc/150?img=1',
    roles: [
      { title: 'Software Engineer', package: '18-22 LPA', internship: '3 LPA' },
      { title: 'Data Analyst', package: '16-18 LPA', internship: '2.5 LPA' },
      { title: 'Cloud Engineer', package: '17-20 LPA', internship: '2.8 LPA' }
    ],
    minPackage: '16 LPA',
    maxPackage: '22 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022, 2021],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      minCGPA: 7.0,
      backlogAllowed: false,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Online Assessment (90 minutes)',
      'Technical Interview (60 minutes)',
      'HR Interview (30 minutes)'
    ],
    location: 'Mountain View, USA',
    website: 'google.com',
    contactEmail: 'recruiter@google.com'
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://i.pravatar.cc/150?img=2',
    roles: [
      { title: 'Software Engineer', package: '17-21 LPA', internship: '2.8 LPA' },
      { title: 'Data Scientist', package: '18-22 LPA', internship: '3 LPA' },
      { title: 'Business Analyst', package: '15-18 LPA', internship: '2.2 LPA' }
    ],
    minPackage: '15 LPA',
    maxPackage: '22 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE'],
      minCGPA: 6.5,
      backlogAllowed: false,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Online Assessment',
      'Technical Interview',
      'HR Round'
    ],
    location: 'Seattle, USA',
    website: 'microsoft.com',
    contactEmail: 'hiring@microsoft.com'
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'https://i.pravatar.cc/150?img=3',
    roles: [
      { title: 'SDE-1', package: '16-20 LPA', internship: '2.5 LPA' },
      { title: 'Operations Manager', package: '14-17 LPA', internship: '2 LPA' }
    ],
    minPackage: '14 LPA',
    maxPackage: '20 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022, 2021],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE', 'MECH', 'CIVIL'],
      minCGPA: 6.0,
      backlogAllowed: true,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Online Test',
      'Round 1: Problem Solving',
      'Round 2: System Design',
      'HR Round'
    ],
    location: 'Seattle, USA',
    website: 'amazon.com',
    contactEmail: 'campus@amazon.com'
  },
  {
    id: 4,
    name: 'TCS',
    logo: 'https://i.pravatar.cc/150?img=4',
    roles: [
      { title: 'Systems Engineer', package: '3.6-4.2 LPA', internship: '1 LPA' },
      { title: 'Programmer Analyst', package: '4.0-4.8 LPA', internship: '1.2 LPA' }
    ],
    minPackage: '3.6 LPA',
    maxPackage: '4.8 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022, 2021, 2020],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'],
      minCGPA: 5.5,
      backlogAllowed: true,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Online Assessment',
      'Technical Round',
      'HR Round'
    ],
    location: 'Bangalore, India',
    website: 'tcs.com',
    contactEmail: 'campus@tcs.com'
  },
  {
    id: 5,
    name: 'Infosys',
    logo: 'https://i.pravatar.cc/150?img=5',
    roles: [
      { title: 'Power Programmer', package: '5.0-5.5 LPA', internship: '1.2 LPA' },
      { title: 'Systems Engineer', package: '3.6-4.2 LPA', internship: '1 LPA' }
    ],
    minPackage: '3.6 LPA',
    maxPackage: '5.5 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022, 2021, 2020],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      minCGPA: 6.0,
      backlogAllowed: true,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Aptitude Test',
      'Technical Round',
      'HR Interview'
    ],
    location: 'Bangalore, India',
    website: 'infosys.com',
    contactEmail: 'recruit@infosys.com'
  },
  {
    id: 6,
    name: 'Wipro',
    logo: 'https://i.pravatar.cc/150?img=6',
    roles: [
      { title: 'Project Engineer', package: '3.8-4.5 LPA', internship: '1.1 LPA' }
    ],
    minPackage: '3.8 LPA',
    maxPackage: '4.5 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022, 2021],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE'],
      minCGPA: 5.8,
      backlogAllowed: true,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Coding Test',
      'Technical Interview',
      'HR Round'
    ],
    location: 'Bangalore, India',
    website: 'wipro.com',
    contactEmail: 'campus@wipro.com'
  },
  {
    id: 7,
    name: 'Accenture',
    logo: 'https://i.pravatar.cc/150?img=7',
    roles: [
      { title: 'Associate Software Engineer', package: '4.2-4.8 LPA', internship: '1.1 LPA' }
    ],
    minPackage: '4.2 LPA',
    maxPackage: '4.8 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      minCGPA: 6.0,
      backlogAllowed: false,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Online Assessment',
      'Technical Interview',
      'HR Interview'
    ],
    location: 'Bangalore, India',
    website: 'accenture.com',
    contactEmail: 'careers@accenture.com'
  },
  {
    id: 8,
    name: 'Capgemini',
    logo: 'https://i.pravatar.cc/150?img=8',
    roles: [
      { title: 'Technology Analyst', package: '4.0-4.6 LPA', internship: '1 LPA' }
    ],
    minPackage: '4.0 LPA',
    maxPackage: '4.6 LPA',
    visitYear: 2024,
    previousYears: [2023, 2022, 2021],
    eligibility: {
      branches: ['CSE', 'IT', 'ECE'],
      minCGPA: 6.0,
      backlogAllowed: true,
      yearOfPassing: [2024, 2025]
    },
    selectionProcess: [
      'Online Test',
      'Technical Round',
      'HR Round'
    ],
    location: 'Bangalore, India',
    website: 'capgemini.com',
    contactEmail: 'recruitment@capgemini.com'
  }
];

// Placed Students Data
export const placedStudentsDatabase = [
  {
    id: 1,
    name: 'Ravi Kumar',
    rollNo: '19CS001',
    branch: 'CSE',
    batch: 2023,
    company: 'Google',
    position: 'Software Engineer',
    package: '22 LPA',
    internship: '3 LPA',
    placeYear: 2023,
    location: 'Mountain View',
    email: 'ravi.kumar@google.com'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rollNo: '19CS002',
    branch: 'IT',
    batch: 2023,
    company: 'Microsoft',
    position: 'Data Scientist',
    package: '22 LPA',
    internship: '3 LPA',
    placeYear: 2023,
    location: 'Seattle',
    email: 'priya.sharma@microsoft.com'
  },
  {
    id: 3,
    name: 'Amit Patel',
    rollNo: '19CS003',
    branch: 'CSE',
    batch: 2023,
    company: 'Google',
    position: 'Software Engineer',
    package: '20 LPA',
    internship: '2.8 LPA',
    placeYear: 2023,
    location: 'Bangalore',
    email: 'amit.patel@google.com'
  },
  {
    id: 4,
    name: 'Neha Singh',
    rollNo: '19IT001',
    branch: 'IT',
    batch: 2023,
    company: 'Amazon',
    position: 'SDE-1',
    package: '20 LPA',
    internship: '2.5 LPA',
    placeYear: 2023,
    location: 'Bangalore',
    email: 'neha.singh@amazon.com'
  },
  {
    id: 5,
    name: 'Vikas Verma',
    rollNo: '19CS004',
    branch: 'CSE',
    batch: 2023,
    company: 'TCS',
    position: 'Systems Engineer',
    package: '4.2 LPA',
    internship: '1 LPA',
    placeYear: 2023,
    location: 'Bangalore',
    email: 'vikas.verma@tcs.com'
  },
  {
    id: 6,
    name: 'Anjali Desai',
    rollNo: '19IT002',
    branch: 'IT',
    batch: 2023,
    company: 'Infosys',
    position: 'Power Programmer',
    package: '5.5 LPA',
    internship: '1.2 LPA',
    placeYear: 2023,
    location: 'Bangalore',
    email: 'anjali.desai@infosys.com'
  },
  {
    id: 7,
    name: 'Rohit Malhotra',
    rollNo: '19CS005',
    branch: 'CSE',
    batch: 2022,
    company: 'Microsoft',
    position: 'Software Engineer',
    package: '21 LPA',
    internship: '2.8 LPA',
    placeYear: 2022,
    location: 'Bangalore',
    email: 'rohit.malhotra@microsoft.com'
  },
  {
    id: 8,
    name: 'Sneha Gupta',
    rollNo: '19IT003',
    branch: 'IT',
    batch: 2022,
    company: 'Amazon',
    position: 'SDE-1',
    package: '19 LPA',
    internship: '2.3 LPA',
    placeYear: 2022,
    location: 'Seattle',
    email: 'sneha.gupta@amazon.com'
  },
  {
    id: 9,
    name: 'Karan Agarwal',
    rollNo: '19CS006',
    branch: 'CSE',
    batch: 2022,
    company: 'Wipro',
    position: 'Project Engineer',
    package: '4.5 LPA',
    internship: '1.1 LPA',
    placeYear: 2022,
    location: 'Bangalore',
    email: 'karan.agarwal@wipro.com'
  },
  {
    id: 10,
    name: 'Divya Nair',
    rollNo: '19IT004',
    branch: 'IT',
    batch: 2022,
    company: 'Accenture',
    position: 'Associate Software Engineer',
    package: '4.8 LPA',
    internship: '1.1 LPA',
    placeYear: 2022,
    location: 'Bangalore',
    email: 'divya.nair@accenture.com'
  }
];

// Branches
export const branches = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

// Batches
export const batches = [2023, 2022, 2021, 2020];

export default { placementDatabase, placedStudentsDatabase, branches, batches };
