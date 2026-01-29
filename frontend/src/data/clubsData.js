/**
 * Clubs & Societies Data
 * Contains data for all technical clubs, cultural groups, and sports teams
 */

// Technical Clubs Data
export const technicalClubsData = [
  {
    id: 'tech-1',
    name: 'Code Hub',
    category: 'technical',
    type: 'Programming',
    description: 'Dedicated to competitive programming and software development excellence',
    fullDescription: 'Code Hub is our flagship technical club focused on mastering competitive programming, data structures, algorithms, and building real-world applications. We organize weekly coding contests, workshops on advanced topics, and collaborate with industry experts.',
    logo: '💻',
    memberCount: 250,
    founded: 2019,
    coordinators: [
      { name: 'Rahul Kumar', position: 'President', email: 'rahul.cs@college.edu' },
      { name: 'Priya Sharma', position: 'Vice President', email: 'priya.cs@college.edu' }
    ],
    focusAreas: ['Competitive Programming', 'Web Development', 'Data Structures', 'Algorithms'],
    achievements: [
      { title: 'National Coding Championship 2024', year: 2024, description: 'Team won 2nd position nationwide' },
      { title: 'Google Code Jam Finalists', year: 2023, description: '5 members qualified for finals' },
      { title: 'ACM ICPC Regional 2023', year: 2023, description: 'Ranked in top 10 nationwide' }
    ],
    events: [
      { name: 'Weekly Contest', date: 'Every Friday', participants: 50 },
      { name: 'Workshop: DSA Basics', date: 'Jan 15, 2024', participants: 120 },
      { name: 'Tech Hackathon', date: 'Feb 10-12, 2024', participants: 200 }
    ],
    galleryImages: [
      { url: '/images/codehub1.jpg', caption: 'Team at National Championship' },
      { url: '/images/codehub2.jpg', caption: 'Weekly coding session' },
      { url: '/images/codehub3.jpg', caption: 'Workshop participants' }
    ],
    membershipFee: 'Free',
    meetingSchedule: 'Friday evenings, 4:00 PM - 6:00 PM',
    joinLink: '#join-codehub'
  },
  {
    id: 'tech-2',
    name: 'Innovation Lab',
    category: 'technical',
    type: 'Innovation & IoT',
    description: 'Building innovative projects using IoT, embedded systems, and cutting-edge technologies',
    fullDescription: 'Innovation Lab drives students to think outside the box and build hardware projects. We focus on IoT applications, robotics, embedded systems, and emerging technologies. Our members participate in international robotics competitions.',
    logo: '🔧',
    memberCount: 180,
    founded: 2020,
    coordinators: [
      { name: 'Aditya Singh', position: 'President', email: 'aditya.ece@college.edu' },
      { name: 'Neha Gupta', position: 'Technical Lead', email: 'neha.ece@college.edu' }
    ],
    focusAreas: ['Robotics', 'IoT', 'Embedded Systems', '3D Design'],
    achievements: [
      { title: 'International Robotics Competition 2024', year: 2024, description: 'Robot won innovation award' },
      { title: 'Smart City Project Exhibition', year: 2023, description: 'Displayed 5 IoT solutions' },
      { title: 'Best Innovation Award', year: 2022, description: 'College-level recognition' }
    ],
    events: [
      { name: 'Arduino Workshop', date: 'Monthly', participants: 80 },
      { name: 'Robotics Challenge', date: 'Mar 2024', participants: 100 },
      { name: 'IoT Design Session', date: 'Bi-weekly', participants: 40 }
    ],
    galleryImages: [
      { url: '/images/innovlab1.jpg', caption: 'Robot prototype' },
      { url: '/images/innovlab2.jpg', caption: 'IoT project demo' },
      { url: '/images/innovlab3.jpg', caption: 'Team workshop' }
    ],
    membershipFee: '₹200/year',
    meetingSchedule: 'Wednesday & Saturday, 3:00 PM - 5:00 PM',
    joinLink: '#join-innovlab'
  },
  {
    id: 'tech-3',
    name: 'Web Wizards',
    category: 'technical',
    type: 'Web Development',
    description: 'Modern web development community focusing on frontend and full-stack technologies',
    fullDescription: 'Web Wizards is dedicated to exploring the latest web technologies including React, Vue, Node.js, and cloud platforms. We build real-world projects and help junior members learn web development from scratch.',
    logo: '🌐',
    memberCount: 220,
    founded: 2021,
    coordinators: [
      { name: 'Vikram Patel', position: 'President', email: 'vikram.web@college.edu' },
      { name: 'Swati Desai', position: 'Co-President', email: 'swati.web@college.edu' }
    ],
    focusAreas: ['Frontend', 'Backend', 'Full Stack', 'Web Design'],
    achievements: [
      { title: 'Built 10 Live Projects', year: 2024, description: 'Deployed on production servers' },
      { title: 'Web Dev Bootcamp', year: 2023, description: '150+ students trained' },
      { title: 'Hackathon Winners', year: 2023, description: 'Won web development category' }
    ],
    events: [
      { name: 'React Workshop', date: 'Monthly', participants: 100 },
      { name: 'Project Showcase', date: 'Quarterly', participants: 150 },
      { name: 'Web Dev Discussion', date: 'Weekly', participants: 60 }
    ],
    galleryImages: [
      { url: '/images/webwizards1.jpg', caption: 'Workshop in progress' },
      { url: '/images/webwizards2.jpg', caption: 'Project presentation' },
      { url: '/images/webwizards3.jpg', caption: 'Team collaboration' }
    ],
    membershipFee: 'Free',
    meetingSchedule: 'Tuesday & Thursday, 5:00 PM - 7:00 PM',
    joinLink: '#join-webwizards'
  },
  {
    id: 'tech-4',
    name: 'AI & ML Club',
    category: 'technical',
    type: 'AI & Machine Learning',
    description: 'Exploring artificial intelligence and machine learning for real-world applications',
    fullDescription: 'AI & ML Club focuses on deep learning, neural networks, NLP, and computer vision. Members work on cutting-edge projects and compete in ML competitions nationally.',
    logo: '🤖',
    memberCount: 160,
    founded: 2022,
    coordinators: [
      { name: 'Dr. Anup Kumar', position: 'Faculty Advisor', email: 'anup.ai@college.edu' },
      { name: 'Isha Verma', position: 'Student President', email: 'isha.ml@college.edu' }
    ],
    focusAreas: ['Deep Learning', 'NLP', 'Computer Vision', 'Data Science'],
    achievements: [
      { title: 'ML Competition 2024', year: 2024, description: 'Ranked top 5 nationally' },
      { title: 'Published Research Paper', year: 2023, description: '3 papers in international journals' },
      { title: 'Kaggle Champion', year: 2023, description: '2 members in top 100 worldwide' }
    ],
    events: [
      { name: 'TensorFlow Workshop', date: 'Monthly', participants: 90 },
      { name: 'Data Science Seminar', date: 'Bi-weekly', participants: 70 },
      { name: 'Project Presentation', date: 'Quarterly', participants: 120 }
    ],
    galleryImages: [
      { url: '/images/aiml1.jpg', caption: 'Research presentation' },
      { url: '/images/aiml2.jpg', caption: 'Workshop participants' },
      { url: '/images/aiml3.jpg', caption: 'Project showcase' }
    ],
    membershipFee: 'Free',
    meetingSchedule: 'Wednesday & Saturday, 4:00 PM - 6:00 PM',
    joinLink: '#join-aiml'
  }
];

// Cultural Groups Data
export const culturalGroupsData = [
  {
    id: 'cult-1',
    name: 'Music Society',
    category: 'cultural',
    type: 'Music & Performing Arts',
    description: 'Celebrating Indian classical, contemporary, and fusion music',
    fullDescription: 'Our Music Society is a vibrant community of musicians exploring classical Indian ragas, contemporary music production, and fusion genres. We organize concerts, jam sessions, and collaborate with renowned artists.',
    logo: '🎵',
    memberCount: 180,
    founded: 2015,
    coordinators: [
      { name: 'Arjun Nair', position: 'President', email: 'arjun.music@college.edu' },
      { name: 'Anjali Singh', position: 'Secretary', email: 'anjali.music@college.edu' }
    ],
    focusAreas: ['Classical Music', 'Contemporary', 'Fusion', 'Music Production'],
    achievements: [
      { title: 'Inter-College Music Fest', year: 2024, description: 'Won Best Performance Award' },
      { title: 'National Music Competition', year: 2023, description: '3 members in finals' },
      { title: 'Annual Concert', year: 2024, description: '500+ attendees' }
    ],
    events: [
      { name: 'Jam Session', date: 'Every Friday', participants: 60 },
      { name: 'Classical Raga Workshop', date: 'Monthly', participants: 100 },
      { name: 'College Cultural Fest', date: 'Mar 2024', participants: 500 }
    ],
    galleryImages: [
      { url: '/images/music1.jpg', caption: 'Annual concert' },
      { url: '/images/music2.jpg', caption: 'Jam session' },
      { url: '/images/music3.jpg', caption: 'Performance at fest' }
    ],
    membershipFee: '₹150/year',
    meetingSchedule: 'Friday evenings, 6:00 PM - 8:00 PM',
    joinLink: '#join-music'
  },
  {
    id: 'cult-2',
    name: 'Drama & Theatre',
    category: 'cultural',
    type: 'Theater & Performing Arts',
    description: 'Bringing stories to life through theater and dramatic performances',
    fullDescription: 'Drama & Theatre club produces plays, experimental theater, and interactive performances. Members develop acting, direction, and production skills while entertaining audiences.',
    logo: '🎭',
    memberCount: 140,
    founded: 2016,
    coordinators: [
      { name: 'Vivek Sharma', position: 'Director', email: 'vivek.drama@college.edu' },
      { name: 'Disha Kapoor', position: 'Producer', email: 'disha.drama@college.edu' }
    ],
    focusAreas: ['Acting', 'Direction', 'Scriptwriting', 'Stage Production'],
    achievements: [
      { title: 'State Level Drama Competition', year: 2024, description: 'Won Best Production Award' },
      { title: 'Original Play Production', year: 2023, description: 'Performed 10+ shows' },
      { title: 'Best Actor Award', year: 2023, description: 'National competition' }
    ],
    events: [
      { name: 'Acting Workshop', date: 'Monthly', participants: 80 },
      { name: 'Play Auditions', date: 'Quarterly', participants: 100 },
      { name: 'College Drama Fest', date: 'Apr 2024', participants: 400 }
    ],
    galleryImages: [
      { url: '/images/drama1.jpg', caption: 'Stage performance' },
      { url: '/images/drama2.jpg', caption: 'Cast rehearsal' },
      { url: '/images/drama3.jpg', caption: 'Behind the scenes' }
    ],
    membershipFee: '₹200/year',
    meetingSchedule: 'Tuesday & Thursday, 6:00 PM - 8:00 PM',
    joinLink: '#join-drama'
  },
  {
    id: 'cult-3',
    name: 'Dance Collective',
    category: 'cultural',
    type: 'Dance & Movement',
    description: 'Exploring contemporary, classical, and street dance forms',
    fullDescription: 'Dance Collective is a space for dancers of all levels to learn, create, and perform. We explore Indian classical dance, contemporary choreography, hip-hop, and fusion styles.',
    logo: '💃',
    memberCount: 200,
    founded: 2017,
    coordinators: [
      { name: 'Priya Reddy', position: 'President', email: 'priya.dance@college.edu' },
      { name: 'Rohit Sharma', position: 'Choreographer', email: 'rohit.dance@college.edu' }
    ],
    focusAreas: ['Classical Dance', 'Contemporary', 'Hip Hop', 'Fusion'],
    achievements: [
      { title: 'National Dance Championship', year: 2024, description: 'Group in top 10' },
      { title: 'Dance Festival Winner', year: 2023, description: 'Best Choreography Award' },
      { title: 'Cultural Ambassadors', year: 2024, description: 'Represented college nationally' }
    ],
    events: [
      { name: 'Dance Class', date: '3x per week', participants: 80 },
      { name: 'Choreography Workshop', date: 'Monthly', participants: 100 },
      { name: 'College Dance Festival', date: 'Feb 2024', participants: 600 }
    ],
    galleryImages: [
      { url: '/images/dance1.jpg', caption: 'Performance at fest' },
      { url: '/images/dance2.jpg', caption: 'Rehearsal session' },
      { url: '/images/dance3.jpg', caption: 'Group dance' }
    ],
    membershipFee: '₹250/year',
    meetingSchedule: 'Monday, Wednesday, Friday, 5:30 PM - 7:00 PM',
    joinLink: '#join-dance'
  },
  {
    id: 'cult-4',
    name: 'Debating Society',
    category: 'cultural',
    type: 'Debate & Public Speaking',
    description: 'Developing eloquence, critical thinking, and public speaking skills',
    fullDescription: 'Debating Society hones argumentation skills through parliamentary debates, extempore speeches, and public forum discussions. Members compete at state and national levels.',
    logo: '🎤',
    memberCount: 120,
    founded: 2014,
    coordinators: [
      { name: 'Sameer Khan', position: 'President', email: 'sameer.debate@college.edu' },
      { name: 'Neha Patel', position: 'Coach', email: 'neha.debate@college.edu' }
    ],
    focusAreas: ['Parliamentary Debate', 'Public Speaking', 'Extempore', 'Quizzing'],
    achievements: [
      { title: 'National Debate Championship', year: 2024, description: 'Runners-up nationwide' },
      { title: 'State Level Winners', year: 2023, description: '3 consecutive championships' },
      { title: 'Best Speaker Awards', year: 2024, description: '5 members recognized' }
    ],
    events: [
      { name: 'Weekly Debate', date: 'Friday', participants: 50 },
      { name: 'Public Speaking Workshop', date: 'Monthly', participants: 80 },
      { name: 'Inter-College Debate', date: 'Quarterly', participants: 100 }
    ],
    galleryImages: [
      { url: '/images/debate1.jpg', caption: 'National competition' },
      { url: '/images/debate2.jpg', caption: 'Debate practice' },
      { url: '/images/debate3.jpg', caption: 'Winner celebration' }
    ],
    membershipFee: 'Free',
    meetingSchedule: 'Friday, 4:00 PM - 6:00 PM',
    joinLink: '#join-debate'
  }
];

// Sports Teams Data
export const sportsTeamsData = [
  {
    id: 'sports-1',
    name: 'Cricket Team',
    category: 'sports',
    type: 'Cricket',
    description: 'Competitive cricket team representing college at state and national level tournaments',
    fullDescription: 'Our cricket team competes in inter-college tournaments, state championships, and friendly matches. The team consists of skilled players with rigorous training schedules and professional coaching.',
    logo: '🏏',
    memberCount: 50,
    founded: 2010,
    coordinators: [
      { name: 'Arun Kumar', position: 'Captain', email: 'arun.cricket@college.edu' },
      { name: 'Coach Ramesh', position: 'Head Coach', email: 'ramesh.cricket@college.edu' }
    ],
    focusAreas: ['Batting', 'Bowling', 'Fielding', 'Team Strategy'],
    achievements: [
      { title: 'State Championship 2024', year: 2024, description: 'Winners of state tournament' },
      { title: 'College Festival Winners', year: 2024, description: 'Consecutive 3-year champions' },
      { title: 'Player Selection', year: 2023, description: '2 players selected for state team' }
    ],
    events: [
      { name: 'Practice Session', date: 'Daily', participants: 30 },
      { name: 'Friendly Match', date: 'Bi-weekly', participants: 50 },
      { name: 'State Championship', date: 'Mar 2024', participants: 20 }
    ],
    galleryImages: [
      { url: '/images/cricket1.jpg', caption: 'Match action' },
      { url: '/images/cricket2.jpg', caption: 'Team photo' },
      { url: '/images/cricket3.jpg', caption: 'Trophy celebration' }
    ],
    membershipFee: 'By selection',
    meetingSchedule: 'Daily practice, 4:00 PM - 6:00 PM',
    joinLink: '#join-cricket'
  },
  {
    id: 'sports-2',
    name: 'Football Team',
    category: 'sports',
    type: 'Football/Soccer',
    description: 'Professional soccer team competing in inter-college and national tournaments',
    fullDescription: 'Football Team represents our college with pride and skill. We participate in national tournaments, state leagues, and friendly matches with emphasis on technical development and teamwork.',
    logo: '⚽',
    memberCount: 45,
    founded: 2011,
    coordinators: [
      { name: 'Vikram Singh', position: 'Captain', email: 'vikram.football@college.edu' },
      { name: 'Coach Rajesh', position: 'Head Coach', email: 'rajesh.football@college.edu' }
    ],
    focusAreas: ['Offensive Play', 'Defensive Strategy', 'Conditioning', 'Team Tactics'],
    achievements: [
      { title: 'National Tournament 2024', year: 2024, description: 'Qualified for finals' },
      { title: 'State Champions', year: 2023, description: 'Won state championship' },
      { title: 'Best Team Award', year: 2023, description: 'Sportsmanship recognition' }
    ],
    events: [
      { name: 'Training Session', date: 'Daily', participants: 30 },
      { name: 'Practice Match', date: 'Bi-weekly', participants: 45 },
      { name: 'Tournament Matches', date: 'Feb-Mar 2024', participants: 20 }
    ],
    galleryImages: [
      { url: '/images/football1.jpg', caption: 'Match in progress' },
      { url: '/images/football2.jpg', caption: 'Team formation' },
      { url: '/images/football3.jpg', caption: 'Victory celebration' }
    ],
    membershipFee: 'By selection',
    meetingSchedule: 'Daily practice, 3:30 PM - 5:30 PM',
    joinLink: '#join-football'
  },
  {
    id: 'sports-3',
    name: 'Badminton Club',
    category: 'sports',
    type: 'Badminton',
    description: 'Competitive badminton club for singles and doubles tournaments',
    fullDescription: 'Badminton Club provides training and competition opportunities for badminton enthusiasts. Members compete in inter-college tournaments and state championships with professional coaching.',
    logo: '🏸',
    memberCount: 60,
    founded: 2013,
    coordinators: [
      { name: 'Anjali Mehta', position: 'President', email: 'anjali.badminton@college.edu' },
      { name: 'Coach Deepak', position: 'Coach', email: 'deepak.badminton@college.edu' }
    ],
    focusAreas: ['Singles', 'Doubles', 'Net Play', 'Conditioning'],
    achievements: [
      { title: 'Inter-College Championship', year: 2024, description: 'Mixed Doubles Winners' },
      { title: 'State Rankings', year: 2024, description: '5 players in top 20' },
      { title: 'Best Sportswoman Award', year: 2023, description: 'National tournament' }
    ],
    events: [
      { name: 'Coaching Session', date: 'Tri-weekly', participants: 40 },
      { name: 'Internal Tournament', date: 'Monthly', participants: 50 },
      { name: 'Inter-College Tournament', date: 'Quarterly', participants: 20 }
    ],
    galleryImages: [
      { url: '/images/badminton1.jpg', caption: 'Court action' },
      { url: '/images/badminton2.jpg', caption: 'Training session' },
      { url: '/images/badminton3.jpg', caption: 'Tournament winners' }
    ],
    membershipFee: '₹300/year',
    meetingSchedule: 'Mon, Wed, Fri, 4:00 PM - 6:00 PM',
    joinLink: '#join-badminton'
  },
  {
    id: 'sports-4',
    name: 'Athletic Club',
    category: 'sports',
    type: 'Track & Field',
    description: 'Training center for track and field athletes pursuing sporting excellence',
    fullDescription: 'Athletic Club develops track and field athletes with professional coaching and state-of-the-art facilities. Members compete in national championships and university tournaments.',
    logo: '🏃',
    memberCount: 70,
    founded: 2009,
    coordinators: [
      { name: 'Suresh Kumar', position: 'President', email: 'suresh.athletics@college.edu' },
      { name: 'Coach Mahesh', position: 'Head Coach', email: 'mahesh.athletics@college.edu' }
    ],
    focusAreas: ['Sprints', 'Middle Distance', 'Long Jump', 'Relay'],
    achievements: [
      { title: 'National Championships', year: 2024, description: '8 medals won' },
      { title: 'State Records', year: 2023, description: '3 new state records' },
      { title: 'University Games', year: 2024, description: '12 medals' }
    ],
    events: [
      { name: 'Daily Training', date: 'Every day', participants: 60 },
      { name: 'Practice Meet', date: 'Monthly', participants: 70 },
      { name: 'National Championship', date: 'Jun 2024', participants: 20 }
    ],
    galleryImages: [
      { url: '/images/athletics1.jpg', caption: 'Race in action' },
      { url: '/images/athletics2.jpg', caption: 'Training at track' },
      { url: '/images/athletics3.jpg', caption: 'Medal celebration' }
    ],
    membershipFee: 'By selection',
    meetingSchedule: 'Daily practice, 6:00 AM - 8:00 AM & 4:00 PM - 6:00 PM',
    joinLink: '#join-athletics'
  }
];

// Aggregate all clubs
export const allClubsData = [...technicalClubsData, ...culturalGroupsData, ...sportsTeamsData];

// Clubs Statistics
export const clubsStatsData = {
  totalClubs: allClubsData.length,
  technicalClubs: technicalClubsData.length,
  culturalGroups: culturalGroupsData.length,
  sportsTeams: sportsTeamsData.length,
  totalMembers: allClubsData.reduce((sum, club) => sum + club.memberCount, 0),
  totalAchievements: allClubsData.reduce((sum, club) => sum + club.achievements.length, 0),
  totalEvents: allClubsData.reduce((sum, club) => sum + club.events.length, 0)
};

// Club Categories for Filtering
export const clubCategories = [
  { id: 'technical', name: 'Technical Clubs', emoji: '💻', count: technicalClubsData.length },
  { id: 'cultural', name: 'Cultural Groups', emoji: '🎭', count: culturalGroupsData.length },
  { id: 'sports', name: 'Sports Teams', emoji: '⚽', count: sportsTeamsData.length }
];

export default {
  technicalClubsData,
  culturalGroupsData,
  sportsTeamsData,
  allClubsData,
  clubsStatsData,
  clubCategories
};
