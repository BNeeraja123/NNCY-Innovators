export const eventCategories = [
  { id: 'technical', name: 'Technical', color: 'event-technical', icon: '💻' },
  { id: 'cultural', name: 'Cultural', color: 'event-cultural', icon: '🎭' },
  { id: 'sports', name: 'Sports', color: 'event-sports', icon: '⚽' },
  { id: 'academic', name: 'Academic', color: 'event-academic', icon: '📚' },
  { id: 'workshop', name: 'Workshop', color: 'event-workshop', icon: '🔧' },
  { id: 'social', name: 'Social', color: 'event-social', icon: '🤝' },
];

export const eventsData = [
  {
    id: 1,
    title: 'Tarang 2k25',
    slug: 'Tarang 2k25',
    category: 'technical',
    shortDescription: '48-hour coding hackathon with exciting prizes and mentorship from industry experts.',
    fullDescription: 'Join us for the biggest coding event of the year! Mohana Mantra Code Sprint is a 48-hour hackathon where teams compete to build innovative solutions. Expert mentors from top tech companies will guide you through the journey. Amazing prizes worth ₹5 lakhs await the winners!',
    date: '2024-03-15',
    endDate: '2024-03-17',
    time: '9:00 AM',
    endTime: '5:00 PM',
    venue: 'Computer Science Block - Labs 1-5',
    venueCapacity: 200,
    image: 'https://picsum.photos/800/400?random=1',
    organizer: {
      name: 'Tech Club',
      contact: 'techclub@college.edu',
      phone: '+91-9876543210'
    },
    ticketTypes: [
      { id: 1, name: 'Individual', price: 0, available: 50, total: 100 },
      { id: 2, name: 'Team (4 members)', price: 0, available: 30, total: 50 },
    ],
    registrationDeadline: '2024-03-10',
    registrationStatus: 'open',
    totalRegistrations: 120,
    requirements: ['Laptop', 'Student ID', 'Team of 2-4 members'],
    schedule: [
      { day: 'Day 1', time: '9:00 AM', activity: 'Opening Ceremony & Problem Statement Release' },
      { day: 'Day 1', time: '10:00 AM', activity: 'Coding Begins' },
      { day: 'Day 2', time: '9:00 AM', activity: 'Mentor Interactions' },
      { day: 'Day 3', time: '2:00 PM', activity: 'Final Presentations' },
      { day: 'Day 3', time: '5:00 PM', activity: 'Prize Distribution' },
    ],
    prizes: ['1st Prize: ₹2,00,000', '2nd Prize: ₹1,00,000', '3rd Prize: ₹50,000', 'Best Innovation Award: ₹25,000'],
    tags: ['Coding', 'Hackathon', 'Competition', 'Innovation'],
    featured: true,
    certificateProvided: true,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Robo Wars Championship 2024',
    slug: 'robo-wars-championship-2024',
    category: 'technical',
    shortDescription: 'Build and battle with your custom robots in this thrilling combat robotics competition.',
    fullDescription: 'Experience the ultimate battle of machines! Teams will design, build, and compete with custom-built combat robots. Witness epic battles in the arena as robots clash for supremacy. Categories for both lightweight and heavyweight divisions.',
    date: '2024-03-20',
    endDate: '2024-03-21',
    time: '10:00 AM',
    endTime: '6:00 PM',
    venue: 'Main Sports Arena',
    venueCapacity: 500,
    image: 'https://picsum.photos/800/400?random=2',
    organizer: {
      name: 'Robotics Club',
      contact: 'robotics@college.edu',
      phone: '+91-9876543211'
    },
    ticketTypes: [
      { id: 1, name: 'Participant', price: 500, available: 40, total: 60 },
      { id: 2, name: 'Spectator', price: 100, available: 350, total: 400 },
    ],
    registrationDeadline: '2024-03-15',
    registrationStatus: 'open',
    totalRegistrations: 85,
    requirements: ['Robot specifications compliance', 'Safety gear', 'Team registration'],
    schedule: [
      { day: 'Day 1', time: '10:00 AM', activity: 'Bot Verification & Weighing' },
      { day: 'Day 1', time: '12:00 PM', activity: 'Lightweight Category Battles' },
      { day: 'Day 1', time: '4:00 PM', activity: 'Heavyweight Category Battles' },
      { day: 'Day 2', time: '11:00 AM', activity: 'Semi Finals' },
      { day: 'Day 2', time: '4:00 PM', activity: 'Grand Finale' },
    ],
    prizes: ['Lightweight Winner: ₹75,000', 'Heavyweight Winner: ₹1,50,000', 'Best Design: ₹25,000'],
    tags: ['Robotics', 'Competition', 'Engineering', 'Battle'],
    featured: true,
    certificateProvided: true,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Cultural Night - Band Battle',
    slug: 'cultural-night-band-battle',
    category: 'cultural',
    shortDescription: 'Live music performances featuring college bands and special guest performances.',
    fullDescription: 'Get ready for an electrifying night of music! College bands will compete for the title of Best Band. Featuring performances across genres - rock, pop, indie, and fusion. Special guest performance by a renowned band to close the night!',
    date: '2024-03-25',
    time: '6:00 PM',
    endTime: '11:00 PM',
    venue: 'Open Air Auditorium',
    venueCapacity: 2000,
    image: 'https://picsum.photos/800/400?random=3',
    organizer: {
      name: 'Cultural Committee',
      contact: 'cultural@college.edu',
      phone: '+91-9876543212'
    },
    ticketTypes: [
      { id: 1, name: 'Participant Band', price: 0, available: 5, total: 10 },
      { id: 2, name: 'General Entry', price: 0, available: 1800, total: 2000 },
    ],
    registrationDeadline: '2024-03-20',
    registrationStatus: 'open',
    totalRegistrations: 450,
    requirements: ['Student ID for entry', 'Band registration (for participants)'],
    schedule: [
      { day: 'Day 1', time: '6:00 PM', activity: 'Opening Act' },
      { day: 'Day 1', time: '6:30 PM', activity: 'Band Performances Begin' },
      { day: 'Day 1', time: '9:30 PM', activity: 'Guest Band Performance' },
      { day: 'Day 1', time: '10:30 PM', activity: 'Results & Prize Distribution' },
    ],
    prizes: ['Best Band: ₹50,000', 'Best Vocalist: ₹15,000', 'Best Instrumentalist: ₹10,000'],
    tags: ['Music', 'Live Performance', 'Competition', 'Entertainment'],
    featured: true,
    certificateProvided: false,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'College Sports Meet 2024',
    slug: 'College-sports-meet-2024',
    category: 'sports',
    shortDescription: 'Annual sports championship featuring cricket, football, basketball, and athletics.',
    fullDescription: 'The most anticipated sports event of the year! Teams from 20+ colleges will compete across multiple sports. Show your athletic prowess and represent your college. Includes cricket, football, basketball, volleyball, badminton, and track & field events.',
    date: '2024-04-01',
    endDate: '2024-04-05',
    time: '7:00 AM',
    endTime: '7:00 PM',
    venue: 'College Sports Complex',
    venueCapacity: 3000,
    image: 'https://picsum.photos/800/400?random=4',
    organizer: {
      name: 'Sports Department',
      contact: 'sports@college.edu',
      phone: '+91-9876543213'
    },
    ticketTypes: [
      { id: 1, name: 'Athlete Registration', price: 200, available: 450, total: 500 },
      { id: 2, name: 'Spectator Pass (5 Days)', price: 150, available: 2200, total: 2500 },
    ],
    registrationDeadline: '2024-03-25',
    registrationStatus: 'open',
    totalRegistrations: 380,
    requirements: ['Medical fitness certificate', 'Sports gear', 'College ID'],
    schedule: [
      { day: 'Day 1', time: '8:00 AM', activity: 'Opening Ceremony' },
      { day: 'Day 1', time: '9:00 AM', activity: 'Athletics & Cricket Prelims' },
      { day: 'Day 2', time: '8:00 AM', activity: 'Football & Basketball Prelims' },
      { day: 'Day 3', time: '8:00 AM', activity: 'Volleyball & Badminton' },
      { day: 'Day 4', time: '9:00 AM', activity: 'Semi Finals - All Sports' },
      { day: 'Day 5', time: '10:00 AM', activity: 'Finals & Closing Ceremony' },
    ],
    prizes: ['Overall Championship Trophy', 'Individual Gold/Silver/Bronze Medals', 'Cash prizes for top 3 in each sport'],
    tags: ['Sports', 'Competition', 'Athletics', 'Championship'],
    featured: true,
    certificateProvided: true,
    status: 'completed',
  },
  {
    id: 5,
    title: 'AI & Machine Learning Workshop',
    slug: 'ai-ml-workshop',
    category: 'workshop',
    shortDescription: 'Hands-on workshop covering fundamentals of AI/ML with real-world applications.',
    fullDescription: 'Dive deep into the world of Artificial Intelligence and Machine Learning. This intensive 2-day workshop covers everything from basics to advanced topics. Includes hands-on projects, real-world case studies, and certification from our industry partners. Perfect for beginners and intermediate learners.',
    date: '2024-03-10',
    endDate: '2024-03-11',
    time: '10:00 AM',
    endTime: '5:00 PM',
    venue: 'Computer Lab 3 & Conference Hall',
    venueCapacity: 80,
    image: 'https://picsum.photos/800/400?random=5',
    organizer: {
      name: 'CS Department & AI Club',
      contact: 'aiclub@college.edu',
      phone: '+91-9876543214'
    },
    ticketTypes: [
      { id: 1, name: 'Student Pass', price: 500, available: 15, total: 60 },
      { id: 2, name: 'Faculty Pass', price: 1000, available: 18, total: 20 },
    ],
    registrationDeadline: '2024-03-07',
    registrationStatus: 'open',
    totalRegistrations: 47,
    requirements: ['Laptop with Python installed', 'Basic programming knowledge', 'Notebook'],
    schedule: [
      { day: 'Day 1', time: '10:00 AM', activity: 'Introduction to AI/ML' },
      { day: 'Day 1', time: '12:00 PM', activity: 'Python for Data Science' },
      { day: 'Day 1', time: '2:00 PM', activity: 'Supervised Learning Algorithms' },
      { day: 'Day 2', time: '10:00 AM', activity: 'Neural Networks & Deep Learning' },
      { day: 'Day 2', time: '2:00 PM', activity: 'Real-world Project Implementation' },
      { day: 'Day 2', time: '4:30 PM', activity: 'Certificate Distribution' },
    ],
    prizes: [],
    tags: ['Workshop', 'AI', 'Machine Learning', 'Technology', 'Certification'],
    featured: true,
    certificateProvided: true,
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Career Fair 2024',
    slug: 'career-fair-2024',
    category: 'academic',
    shortDescription: 'Meet top recruiters and explore placement opportunities from leading companies.',
    fullDescription: 'The biggest career opportunity of the year! Meet recruiters from 50+ top companies across IT, Finance, Consulting, and more. On-the-spot interviews, resume reviews, career counseling, and networking opportunities. Dress professionally and bring multiple copies of your resume.',
    date: '2024-03-18',
    time: '9:00 AM',
    endTime: '6:00 PM',
    venue: 'Convention Center',
    venueCapacity: 1500,
    image: 'https://picsum.photos/800/400?random=6',
    organizer: {
      name: 'Training & Placement Cell',
      contact: 'placement@college.edu',
      phone: '+91-9876543215'
    },
    ticketTypes: [
      { id: 1, name: 'Student Entry', price: 0, available: 1300, total: 1500 },
    ],
    registrationDeadline: '2024-03-15',
    registrationStatus: 'open',
    totalRegistrations: 850,
    requirements: ['Updated resume (10 copies)', 'Professional attire', 'Student ID', 'Certificates'],
    schedule: [
      { day: 'Day 1', time: '9:00 AM', activity: 'Registration & Welcome' },
      { day: 'Day 1', time: '10:00 AM', activity: 'Company Presentations' },
      { day: 'Day 1', time: '12:00 PM', activity: 'Interview Rounds Begin' },
      { day: 'Day 1', time: '2:00 PM', activity: 'Resume Review Sessions' },
      { day: 'Day 1', time: '4:00 PM', activity: 'Career Counseling' },
    ],
    prizes: [],
    tags: ['Career', 'Placement', 'Recruitment', 'Professional'],
    featured: true,
    certificateProvided: false,
    status: 'upcoming'
  },
  {
    id: 7,
    title: 'Photography Workshop & Exhibition',
    slug: 'photography-workshop-exhibition',
    category: 'workshop',
    shortDescription: 'Learn photography techniques and exhibit your best shots in our gallery.',
    fullDescription: 'For all photography enthusiasts! Learn from professional photographers about composition, lighting, editing, and storytelling. Workshop followed by an open photography exhibition where you can display your best work. All skill levels welcome.',
    date: '2024-04-08',
    endDate: '2024-04-10',
    time: '11:00 AM',
    endTime: '4:00 PM',
    venue: 'Art Gallery & Outdoor Campus',
    venueCapacity: 60,
    image: 'https://picsum.photos/800/400?random=7',
    organizer: {
      name: 'Photography Club',
      contact: 'photoclub@college.edu',
      phone: '+91-9876543216'
    },
    ticketTypes: [
      { id: 1, name: 'Workshop + Exhibition', price: 300, available: 35, total: 50 },
      { id: 2, name: 'Exhibition Only', price: 0, available: 200, total: 500 },
    ],
    registrationDeadline: '2024-04-05',
    registrationStatus: 'open',
    totalRegistrations: 28,
    requirements: ['Camera (DSLR/Mirrorless/Phone)', '5 photos for exhibition'],
    schedule: [
      { day: 'Day 1', time: '11:00 AM', activity: 'Photography Basics & Composition' },
      { day: 'Day 1', time: '2:00 PM', activity: 'Outdoor Photo Walk' },
      { day: 'Day 2', time: '11:00 AM', activity: 'Photo Editing Workshop' },
      { day: 'Day 2', time: '2:00 PM', activity: 'Exhibition Setup' },
      { day: 'Day 3', time: '11:00 AM', activity: 'Exhibition Opening & Awards' },
    ],
    prizes: ['Best Photo: ₹5,000', 'Peoples Choice: ₹3,000'],
    tags: ['Photography', 'Workshop', 'Exhibition', 'Art'],
    featured: false,
    certificateProvided: true,
    status: 'upcoming'
  },
  {
    id: 8,
    title: 'Entrepreneurship Summit',
    slug: 'entrepreneurship-summit',
    category: 'academic',
    shortDescription: 'Learn from successful entrepreneurs and pitch your startup ideas for seed funding.',
    fullDescription: 'Calling all aspiring entrepreneurs! A full day summit with inspiring talks from successful founders, interactive workshops on startup fundamentals, and a pitch competition where you can win seed funding for your ideas. Network with investors, mentors, and fellow entrepreneurs.',
    date: '2024-04-15',
    time: '9:00 AM',
    endTime: '7:00 PM',
    venue: 'Auditorium & Seminar Halls',
    venueCapacity: 400,
    image: 'https://picsum.photos/800/400?random=8',
    organizer: {
      name: 'E-Cell (Entrepreneurship Cell)',
      contact: 'ecell@college.edu',
      phone: '+91-9876543217'
    },
    ticketTypes: [
      { id: 1, name: 'Attendee Pass', price: 200, available: 320, total: 350 },
      { id: 2, name: 'Startup Pitch Entry', price: 500, available: 38, total: 50 },
    ],
    registrationDeadline: '2024-04-10',
    registrationStatus: 'open',
    totalRegistrations: 185,
    requirements: ['Business plan (for pitch participants)', 'Student ID'],
    schedule: [
      { day: 'Day 1', time: '9:00 AM', activity: 'Keynote: Journey of Successful Founders' },
      { day: 'Day 1', time: '11:00 AM', activity: 'Workshop: From Idea to MVP' },
      { day: 'Day 1', time: '2:00 PM', activity: 'Panel Discussion: Funding & Growth' },
      { day: 'Day 1', time: '4:00 PM', activity: 'Startup Pitch Competition' },
      { day: 'Day 1', time: '6:30 PM', activity: 'Networking Dinner & Awards' },
    ],
    prizes: ['Best Startup Idea: ₹1,00,000 seed funding', '2nd Prize: ₹50,000', '3rd Prize: ₹25,000'],
    tags: ['Entrepreneurship', 'Startup', 'Business', 'Innovation'],
    featured: false,
    certificateProvided: true,
    status: 'upcoming'
  },
  {
    id: 9,
    title: 'Dance Competition - Groove Fest',
    slug: 'dance-competition-groove-fest',
    category: 'cultural',
    shortDescription: 'Showcase your dance talent in solo, duet, and group categories.',
    fullDescription: 'The stage is set for the ultimate dance battle! Compete in various styles - hip-hop, contemporary, classical, folk, and fusion. Categories for solo, duet, and group performances. Judged by renowned choreographers and dance professionals.',
    date: '2024-04-20',
    time: '5:00 PM',
    endTime: '10:00 PM',
    venue: 'Main Auditorium',
    venueCapacity: 800,
    image: 'https://picsum.photos/800/400?random=9',
    organizer: {
      name: 'Dance Club',
      contact: 'danceclub@college.edu',
      phone: '+91-9876543218'
    },
    ticketTypes: [
      { id: 1, name: 'Participant', price: 150, available: 85, total: 100 },
      { id: 2, name: 'Audience', price: 50, available: 550, total: 700 },
    ],
    registrationDeadline: '2024-04-17',
    registrationStatus: 'open',
    totalRegistrations: 142,
    requirements: ['Music track (for participants)', 'Costume', 'Student ID'],
    schedule: [
      { day: 'Day 1', time: '5:00 PM', activity: 'Solo Performances' },
      { day: 'Day 1', time: '6:30 PM', activity: 'Duet Performances' },
      { day: 'Day 1', time: '8:00 PM', activity: 'Group Performances' },
      { day: 'Day 1', time: '9:30 PM', activity: 'Results & Prize Distribution' },
    ],
    prizes: ['Best Solo: ₹15,000', 'Best Duet: ₹20,000', 'Best Group: ₹30,000', 'Best Choreography: ₹10,000'],
    tags: ['Dance', 'Performance', 'Competition', 'Cultural'],
    featured: false,
    certificateProvided: true,
    status: 'upcoming'
  },
  {
    id: 10,
    title: 'Gaming Tournament - Esports Arena',
    slug: 'gaming-tournament-esports-arena',
    category: 'social',
    shortDescription: 'Compete in popular games like Valorant, FIFA, and mobile gaming championships.',
    fullDescription: 'Gamers assemble! Multi-game tournament featuring PC games (Valorant, CS:GO), console games (FIFA, Tekken), and mobile games (BGMI, COD Mobile). Solo and team tournaments with live streaming and commentary. Prizes worth ₹2 lakhs!',
    date: '2024-04-22',
    endDate: '2024-04-23',
    time: '10:00 AM',
    endTime: '8:00 PM',
    venue: 'Gaming Zone & Computer Labs',
    venueCapacity: 150,
    image: 'https://picsum.photos/800/400?random=10',
    organizer: {
      name: 'Gaming Club',
      contact: 'gamingclub@college.edu',
      phone: '+91-9876543219'
    },
    ticketTypes: [
      { id: 1, name: 'PC Gaming Entry', price: 300, available: 35, total: 50 },
      { id: 2, name: 'Console Gaming Entry', price: 250, available: 28, total: 40 },
      { id: 3, name: 'Mobile Gaming Entry', price: 100, available: 48, total: 60 },
    ],
    registrationDeadline: '2024-04-19',
    registrationStatus: 'open',
    totalRegistrations: 98,
    requirements: ['Gaming device (for mobile gaming)', 'Student ID', 'Team formation (for team games)'],
    schedule: [
      { day: 'Day 1', time: '10:00 AM', activity: 'PC Gaming Qualifiers' },
      { day: 'Day 1', time: '2:00 PM', activity: 'Mobile Gaming Tournament' },
      { day: 'Day 1', time: '6:00 PM', activity: 'Console Gaming Begins' },
      { day: 'Day 2', time: '11:00 AM', activity: 'Semi Finals - All Categories' },
      { day: 'Day 2', time: '5:00 PM', activity: 'Grand Finals & Prize Distribution' },
    ],
    prizes: ['Valorant Winner: ₹60,000', 'FIFA Winner: ₹40,000', 'BGMI Winner: ₹30,000', 'Other games: ₹15,000 each'],
    tags: ['Gaming', 'Esports', 'Competition', 'Tournament'],
    featured: false,
    certificateProvided: false,
    status: 'upcoming'
  },
];

// Mock registered events for a user
export const myRegisteredEvents = [1, 5, 6]; // Event IDs

// Mock event gallery images with winners and memories
export const eventGallery = [
  // Code Sprint 2024 - Winners & Memories
  { 
    id: 1, 
    eventId: 1, 
    image: 'https://picsum.photos/400/300?random=11', 
    title: 'Code Sprint 2024 - Winners Trophy Lift',
    type: 'winner',
    caption: 'Team Alpha celebrates their victory in Code Sprint 2024'
  },
  { 
    id: 2, 
    eventId: 1, 
    image: 'https://picsum.photos/400/300?random=12', 
    title: 'Teams Collaborating on Projects',
    type: 'memory',
    caption: 'Developers working together during the 48-hour hackathon'
  },
  { 
    id: 3, 
    eventId: 1, 
    image: 'https://picsum.photos/400/300?random=20', 
    title: 'Final Presentations',
    type: 'memory',
    caption: 'Teams presenting their innovative solutions to judges'
  },
  { 
    id: 4, 
    eventId: 1, 
    image: 'https://picsum.photos/400/300?random=21', 
    title: 'Mentorship Session',
    type: 'memory',
    caption: 'Industry experts guiding participants through coding challenges'
  },
  
  // Robo Wars - Winners & Memories
  { 
    id: 5, 
    eventId: 2, 
    image: 'https://picsum.photos/400/300?random=13', 
    title: 'Robo Wars 2024 - Champion Bot',
    type: 'winner',
    caption: 'Winning robot in the heavyweight division'
  },
  { 
    id: 6, 
    eventId: 2, 
    image: 'https://picsum.photos/400/300?random=22', 
    title: 'Robots in Battle Arena',
    type: 'memory',
    caption: 'Intense robot combat during the championship rounds'
  },
  { 
    id: 7, 
    eventId: 2, 
    image: 'https://picsum.photos/400/300?random=23', 
    title: 'Bot Verification',
    type: 'memory',
    caption: 'Teams showcasing their robots during inspection'
  },
  { 
    id: 8, 
    eventId: 2, 
    image: 'https://picsum.photos/400/300?random=24', 
    title: 'Crowd Excitement',
    type: 'memory',
    caption: 'Excited spectators watching the robotic battles'
  },
  
  // Cultural Night - Winners & Memories
  { 
    id: 9, 
    eventId: 3, 
    image: 'https://picsum.photos/400/300?random=14', 
    title: 'Best Band Performance',
    type: 'winner',
    caption: 'Winning band receiving their trophy'
  },
  { 
    id: 10, 
    eventId: 3, 
    image: 'https://picsum.photos/400/300?random=25', 
    title: 'Live Band Performance',
    type: 'memory',
    caption: 'Energetic rock band performing on stage'
  },
  { 
    id: 11, 
    eventId: 3, 
    image: 'https://picsum.photos/400/300?random=26', 
    title: 'Crowd Dancing',
    type: 'memory',
    caption: 'Audience enjoying the music and dancing'
  },
  { 
    id: 12, 
    eventId: 3, 
    image: 'https://picsum.photos/400/300?random=27', 
    title: 'Guest Performance',
    type: 'memory',
    caption: 'Special guest artist performing for the college'
  },
  
  // Sports Meet - Winners & Memories
  { 
    id: 13, 
    eventId: 4, 
    image: 'https://picsum.photos/400/300?random=15', 
    title: 'Cricket Championship Winners',
    type: 'winner',
    caption: 'Winning team posing with the championship trophy'
  },
  { 
    id: 14, 
    eventId: 4, 
    image: 'https://picsum.photos/400/300?random=28', 
    title: 'Football Match Action',
    type: 'memory',
    caption: 'Intense moment during the football finals'
  },
  { 
    id: 15, 
    eventId: 4, 
    image: 'https://picsum.photos/400/300?random=29', 
    title: 'Athletics Medal Winners',
    type: 'winner',
    caption: 'Medal winners standing on the podium'
  },
  { 
    id: 16, 
    eventId: 4, 
    image: 'https://picsum.photos/400/300?random=30', 
    title: 'Basketball Game',
    type: 'memory',
    caption: 'Dynamic basketball match between teams'
  },
  { 
    id: 17, 
    eventId: 4, 
    image: 'https://picsum.photos/400/300?random=31', 
    title: 'Opening Ceremony',
    type: 'memory',
    caption: 'Grand opening ceremony of the sports meet'
  },
  
  // AI/ML Workshop - Memories
  { 
    id: 18, 
    eventId: 5, 
    image: 'https://picsum.photos/400/300?random=16', 
    title: 'AI Workshop Participants',
    type: 'memory',
    caption: 'Participants engaged in the AI and ML workshop'
  },
  { 
    id: 19, 
    eventId: 5, 
    image: 'https://picsum.photos/400/300?random=32', 
    title: 'Hands-on Coding Session',
    type: 'memory',
    caption: 'Students coding projects using Python and TensorFlow'
  },
  { 
    id: 20, 
    eventId: 5, 
    image: 'https://picsum.photos/400/300?random=33', 
    title: 'Certificate Distribution',
    type: 'memory',
    caption: 'Participants receiving workshop completion certificates'
  },
  
  // Photography Workshop - Winners & Memories
  { 
    id: 21, 
    eventId: 7, 
    image: 'https://picsum.photos/400/300?random=34', 
    title: 'Best Photo Winner',
    type: 'winner',
    caption: 'Award-winning photograph from the exhibition'
  },
  { 
    id: 22, 
    eventId: 7, 
    image: 'https://picsum.photos/400/300?random=35', 
    title: 'Photography Exhibition',
    type: 'memory',
    caption: 'Photographs displayed in the gallery exhibition'
  },
  { 
    id: 23, 
    eventId: 7, 
    image: 'https://picsum.photos/400/300?random=36', 
    title: 'Photo Walk Session',
    type: 'memory',
    caption: 'Photographers capturing moments around campus'
  },
  
  // Dance Competition - Winners & Memories
  { 
    id: 24, 
    eventId: 9, 
    image: 'https://picsum.photos/400/300?random=37', 
    title: 'Best Dance Group Performance',
    type: 'winner',
    caption: 'Winning dance group celebrating on stage'
  },
  { 
    id: 25, 
    eventId: 9, 
    image: 'https://picsum.photos/400/300?random=38', 
    title: 'Solo Dance Performance',
    type: 'memory',
    caption: 'Talented dancer performing solo on stage'
  },
  { 
    id: 26, 
    eventId: 9, 
    image: 'https://picsum.photos/400/300?random=39', 
    title: 'Group Dance Choreography',
    type: 'memory',
    caption: 'Synchronized group dance performance'
  },
  { 
    id: 27, 
    eventId: 9, 
    image: 'https://picsum.photos/400/300?random=40', 
    title: 'Dance Competition Crowd',
    type: 'memory',
    caption: 'Excited audience cheering for dancers'
  },
  
  // Gaming Tournament - Winners & Memories
  { 
    id: 28, 
    eventId: 10, 
    image: 'https://picsum.photos/400/300?random=41', 
    title: 'Valorant Champion',
    type: 'winner',
    caption: 'Winning team celebrating their Valorant championship'
  },
  { 
    id: 29, 
    eventId: 10, 
    image: 'https://picsum.photos/400/300?random=42', 
    title: 'PC Gaming Tournament',
    type: 'memory',
    caption: 'Competitive gamers in intense matches'
  },
  { 
    id: 30, 
    eventId: 10, 
    image: 'https://picsum.photos/400/300?random=43', 
    title: 'Mobile Gaming Arena',
    type: 'memory',
    caption: 'Participants competing in mobile gaming tournament'
  },
  { 
    id: 31, 
    eventId: 10, 
    image: 'https://picsum.photos/400/300?random=44', 
    title: 'Gaming Tournament Setup',
    type: 'memory',
    caption: 'Gaming zone with multiple gaming stations'
  },
];
