/**
 * Club Sample Data
 * Exported as modifiable array for coordinator management
 */

export const clubsData = [
  {
    id: 1,
    name: 'Code Masters Club',
    category: 'technical',
    type: 'Programming',
    description: 'A club for passionate programmers to learn and collaborate on coding projects',
    fullDescription: 'Code Masters Club is dedicated to fostering a community of programmers. We organize coding contests, workshops, and collaborative projects.',
    logo: '💻',
    memberCount: 45,
    founded: 2019,
    focusAreas: ['Competitive Programming', 'Web Development', 'Data Structures'],
    coordinators: [
      { name: 'Arjun Kumar', email: 'clubcoord@college.edu', position: 'President' },
      { name: 'Priya Sharma', email: 'priya@college.edu', position: 'Vice President' }
    ],
    members: [
      { id: 1, name: 'Arjun Kumar', role: 'president', joinedDate: '2019-01-15', status: 'active' },
      { id: 2, name: 'Priya Sharma', role: 'officer', joinedDate: '2019-02-01', status: 'active' },
      { id: 3, name: 'Rajesh Patel', role: 'core_team', joinedDate: '2020-01-10', status: 'active' }
    ],
    membershipFee: 'Free',
    meetingSchedule: 'Friday 4:00 PM',
    joinLink: 'https://example.com/join/code-masters',
    facultyAdvisor: 'Dr. Vikram Singh',
    contactEmail: 'codemasters@college.edu',
    contactPhone: '9876543210',
    achievements: [
      { title: 'Won National Coding Contest 2023', year: 2023, description: 'Team represented college in national programming competition' },
      { title: 'Organized Hackathon 2022', year: 2022, description: 'Successfully conducted 24-hour hackathon with 200+ participants' }
    ],
    events: [
      { name: 'Weekly Coding Challenge', date: '2024-01-15', participants: 30, description: 'Weekly competitive programming session' },
      { name: 'Git Workshop', date: '2024-01-20', participants: 50, description: 'Introduction to version control systems' }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2019-01-15T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    updatedBy: 'Arjun Kumar'
  },
  {
    id: 2,
    name: 'AI & Machine Learning Society',
    category: 'technical',
    type: 'AI/ML',
    description: 'Exploring artificial intelligence and machine learning technologies',
    fullDescription: 'A dynamic club focused on AI and ML projects, research, and applications in real-world scenarios.',
    logo: '🤖',
    memberCount: 38,
    founded: 2020,
    focusAreas: ['Deep Learning', 'Natural Language Processing', 'Computer Vision'],
    coordinators: [
      { name: 'Ananya Gupta', email: 'ananya@college.edu', position: 'President' },
      { name: 'Vikram Patel', email: 'vikram@college.edu', position: 'Vice President' }
    ],
    members: [],
    membershipFee: 'Free',
    meetingSchedule: 'Wednesday 5:30 PM',
    joinLink: 'https://example.com/join/ai-ml',
    facultyAdvisor: 'Prof. Deepak Sharma',
    contactEmail: 'aiml@college.edu',
    contactPhone: '9876543211',
    achievements: [
      { title: 'Published Research Paper on NLP', year: 2023, description: 'Paper accepted at international conference' }
    ],
    events: [
      { name: 'TensorFlow Workshop', date: '2024-02-01', participants: 60, description: 'Hands-on session with TensorFlow framework' }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2020-03-10T00:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
    updatedBy: 'Ananya Gupta'
  },
  {
    id: 3,
    name: 'Web Development Club',
    category: 'technical',
    type: 'Web Development',
    description: 'Learn and build amazing web applications together',
    fullDescription: 'Web Dev Club is for students interested in frontend and backend development using modern technologies.',
    logo: '🌐',
    memberCount: 52,
    founded: 2021,
    focusAreas: ['React', 'Node.js', 'Full Stack Development'],
    coordinators: [
      { name: 'Neha Singh', email: 'neha@college.edu', position: 'President' }
    ],
    members: [],
    membershipFee: 'Free',
    meetingSchedule: 'Monday 6:00 PM',
    joinLink: 'https://example.com/join/webdev',
    facultyAdvisor: 'Dr. Ramesh Kumar',
    contactEmail: 'webdev@college.edu',
    contactPhone: '9876543212',
    achievements: [],
    events: [],
    announcements: [],
    galleryImages: [],
    createdAt: '2021-05-01T00:00:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    updatedBy: 'Neha Singh'
  },
  {
    id: 4,
    name: 'Cultural Forum',
    category: 'cultural',
    type: 'Culture',
    description: 'Celebrate diversity through arts, music, and cultural exchange',
    fullDescription: 'A vibrant platform for celebrating India\'s rich cultural heritage through performances and exhibitions.',
    logo: '🎭',
    memberCount: 67,
    founded: 2018,
    focusAreas: ['Indian Classical Arts', 'Contemporary Performance', 'Cultural Exchange'],
    coordinators: [
      { name: 'Divya Mehta', email: 'divya@college.edu', position: 'President' },
      { name: 'Aditya Desai', email: 'aditya@college.edu', position: 'Vice President' }
    ],
    members: [],
    membershipFee: 'Free',
    meetingSchedule: 'Tuesday 7:00 PM',
    joinLink: 'https://example.com/join/cultural-forum',
    facultyAdvisor: 'Ms. Anjali Sharma',
    contactEmail: 'cultureforum@college.edu',
    contactPhone: '9876543213',
    achievements: [
      { title: 'Annual Cultural Festival 2023', year: 2023, description: 'Organized college\'s biggest cultural event with 1000+ attendees' }
    ],
    events: [
      { name: 'Diwali Celebration', date: '2023-11-12', participants: 200 },
      { name: 'Folk Dance Workshop', date: '2024-02-10', participants: 80 }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2018-08-20T00:00:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    updatedBy: 'Divya Mehta'
  },
  {
    id: 5,
    name: 'Music Society',
    category: 'cultural',
    type: 'Music',
    description: 'Harmony and melody: where music lovers unite',
    fullDescription: 'Music Society brings together musicians of all genres to collaborate, perform, and celebrate the universal language of music.',
    logo: '🎸',
    memberCount: 54,
    founded: 2019,
    focusAreas: ['Classical', 'Contemporary', 'Band Performance'],
    coordinators: [
      { name: 'Rohan Verma', email: 'rohan@college.edu', position: 'President' }
    ],
    members: [],
    membershipFee: '₹100/semester',
    meetingSchedule: 'Thursday 6:00 PM',
    joinLink: 'https://example.com/join/music',
    facultyAdvisor: 'Mr. Suresh Nair',
    contactEmail: 'music@college.edu',
    contactPhone: '9876543214',
    achievements: [
      { title: 'College Band Championship 2023', year: 2023, description: 'Won inter-college music competition' }
    ],
    events: [
      { name: 'Open Mic Night', date: '2024-01-28', participants: 150 }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2019-02-15T00:00:00Z',
    updatedAt: '2024-01-16T11:20:00Z',
    updatedBy: 'Rohan Verma'
  },
  {
    id: 6,
    name: 'Literary Club',
    category: 'cultural',
    type: 'Literature',
    description: 'A haven for book lovers, writers, and storytellers',
    fullDescription: 'The Literary Club fosters a love for reading, writing, and creative expression through book clubs, poetry readings, and workshops.',
    logo: '📚',
    memberCount: 43,
    founded: 2017,
    focusAreas: ['Fiction', 'Poetry', 'Creative Writing'],
    coordinators: [
      { name: 'Shreya Iyer', email: 'shreya@college.edu', position: 'President' }
    ],
    members: [],
    membershipFee: 'Free',
    meetingSchedule: 'Wednesday 4:00 PM',
    joinLink: 'https://example.com/join/literary',
    facultyAdvisor: 'Dr. Kavya Prabhu',
    contactEmail: 'literary@college.edu',
    contactPhone: '9876543215',
    achievements: [],
    events: [
      { name: 'Annual Book Fair', date: '2024-03-15', participants: 300 }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2017-06-10T00:00:00Z',
    updatedAt: '2024-01-11T13:30:00Z',
    updatedBy: 'Shreya Iyer'
  },
  {
    id: 7,
    name: 'Football Club',
    category: 'sports',
    type: 'Football',
    description: 'Kick the ball, chase the dream',
    fullDescription: 'A competitive sports club dedicated to developing football players and organizing inter-college tournaments.',
    logo: '⚽',
    memberCount: 48,
    founded: 2016,
    focusAreas: ['11-a-side', 'Futsal', 'Coaching'],
    coordinators: [
      { name: 'Arjun Singh', email: 'arjun.sports@college.edu', position: 'Captain' },
      { name: 'Vikas Sharma', email: 'vikas@college.edu', position: 'Vice Captain' }
    ],
    members: [],
    membershipFee: '₹500/year',
    meetingSchedule: 'Daily 6:00 AM',
    joinLink: 'https://example.com/join/football',
    facultyAdvisor: 'Mr. Rajesh Kumar',
    contactEmail: 'football@college.edu',
    contactPhone: '9876543216',
    achievements: [
      { title: 'State Football Championship 2023', year: 2023, description: 'Won inter-college football tournament' }
    ],
    events: [
      { name: 'Football Tournament', date: '2024-02-20', participants: 120 }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2016-01-10T00:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z',
    updatedBy: 'Arjun Singh'
  },
  {
    id: 8,
    name: 'Basketball Club',
    category: 'sports',
    type: 'Basketball',
    description: 'Shoot, score, and dominate the court',
    fullDescription: 'Basketball Club is for athletes passionate about basketball, offering training and organizing matches.',
    logo: '🏀',
    memberCount: 35,
    founded: 2020,
    focusAreas: ['5-a-side', 'Coaching', 'Tournament'],
    coordinators: [
      { name: 'Priyank Nair', email: 'priyank@college.edu', position: 'Captain' }
    ],
    members: [],
    membershipFee: '₹300/year',
    meetingSchedule: 'Monday & Wednesday 5:00 PM',
    joinLink: 'https://example.com/join/basketball',
    facultyAdvisor: 'Dr. Santosh Rao',
    contactEmail: 'basketball@college.edu',
    contactPhone: '9876543217',
    achievements: [],
    events: [
      { name: 'Inter-college Basketball Match', date: '2024-03-05', participants: 25 }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2020-07-01T00:00:00Z',
    updatedAt: '2024-01-09T17:00:00Z',
    updatedBy: 'Priyank Nair'
  },
  {
    id: 9,
    name: 'Badminton Association',
    category: 'sports',
    type: 'Badminton',
    description: 'Smash it! Join our badminton community',
    fullDescription: 'Dedicated to promoting badminton skills and organizing tournaments among college students.',
    logo: '🏸',
    memberCount: 28,
    founded: 2019,
    focusAreas: ['Singles', 'Doubles', 'Training'],
    coordinators: [
      { name: 'Rhea Dutta', email: 'rhea@college.edu', position: 'President' }
    ],
    members: [],
    membershipFee: 'Free',
    meetingSchedule: 'Tuesday & Saturday 5:00 PM',
    joinLink: 'https://example.com/join/badminton',
    facultyAdvisor: 'Mrs. Neelam Singh',
    contactEmail: 'badminton@college.edu',
    contactPhone: '9876543218',
    achievements: [
      { title: 'College Badminton Champion 2023', year: 2023, description: 'Won college badminton singles championship' }
    ],
    events: [],
    announcements: [],
    galleryImages: [],
    createdAt: '2019-09-15T00:00:00Z',
    updatedAt: '2024-01-08T16:30:00Z',
    updatedBy: 'Rhea Dutta'
  },
  {
    id: 10,
    name: 'Fitness & Wellness Club',
    category: 'sports',
    type: 'Fitness',
    description: 'Strong body, strong mind - join us for fitness journey',
    fullDescription: 'Committed to promoting health and wellness through various fitness activities and gym sessions.',
    logo: '💪',
    memberCount: 72,
    founded: 2021,
    focusAreas: ['Gym Training', 'Yoga', 'Nutrition'],
    coordinators: [
      { name: 'Kavya Sharma', email: 'kavya.fit@college.edu', position: 'President' }
    ],
    members: [],
    membershipFee: '₹200/month',
    meetingSchedule: 'Daily 6:00 AM',
    joinLink: 'https://example.com/join/fitness',
    facultyAdvisor: 'Dr. Priya Menon',
    contactEmail: 'fitness@college.edu',
    contactPhone: '9876543219',
    achievements: [],
    events: [
      { name: 'Marathon 2024', date: '2024-02-25', participants: 200 }
    ],
    announcements: [],
    galleryImages: [],
    createdAt: '2021-03-01T00:00:00Z',
    updatedAt: '2024-01-17T06:00:00Z',
    updatedBy: 'Kavya Sharma'
  }
];
