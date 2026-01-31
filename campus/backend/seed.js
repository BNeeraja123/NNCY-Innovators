import { dbRun, db } from './database.js';

const seedDatabase = async () => {
  try {
    console.log('Seeding database with sample data...');

    // Create sample users
    const users = [
      { email: 'student1@college.edu', password: 'password123', name: 'Aman Kumar', role: 'student' },
      { email: 'student2@college.edu', password: 'password123', name: 'Priya Singh', role: 'student' },
      { email: 'student3@college.edu', password: 'password123', name: 'Rajesh Kumar', role: 'student' },
      { email: 'organizer@college.edu', password: 'password123', name: 'Event Organizer', role: 'organizer' },
      { email: 'admin@college.edu', password: 'password123', name: 'Admin User', role: 'admin' }
    ];

    for (const user of users) {
      try {
        await dbRun(
          'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
          [user.email, user.password, user.name, user.role]
        );
      } catch (error) {
        // User might already exist
      }
    }

    // Sample events
    const events = [
      {
        title: 'Tarang 2k25',
        slug: 'Tarang 2k25',
        description: '48-hour coding hackathon with exciting prizes and mentorship from industry experts.',
        category: 'technical',
        image: 'https://picsum.photos/800/400?random=1',
        date: '2024-03-15',
        endDate: '2024-03-17',
        time: '9:00 AM',
        endTime: '5:00 PM',
        venue: 'Computer Science Block - Labs 1-5',
        venueCapacity: 200,
        registrationDeadline: '2024-03-10',
        status: 'upcoming'
      },
      {
        title: 'Robo Wars Championship 2024',
        slug: 'robo-wars-championship-2024',
        description: 'Build and battle with your custom robots in this thrilling combat robotics competition.',
        category: 'technical',
        image: 'https://picsum.photos/800/400?random=2',
        date: '2024-03-20',
        endDate: '2024-03-21',
        time: '10:00 AM',
        endTime: '6:00 PM',
        venue: 'Main Sports Arena',
        venueCapacity: 500,
        registrationDeadline: '2024-03-15',
        status: 'upcoming'
      },
      {
        title: 'Cultural Night - Band Battle',
        slug: 'cultural-night-band-battle',
        description: 'Live music performances featuring college bands and special guest performances.',
        category: 'cultural',
        image: 'https://picsum.photos/800/400?random=3',
        date: '2024-03-25',
        time: '6:00 PM',
        endTime: '11:00 PM',
        venue: 'Open Air Auditorium',
        venueCapacity: 2000,
        registrationDeadline: '2024-03-20',
        status: 'upcoming'
      },
      {
        title: 'College Sports Meet 2024',
        slug: 'college-sports-meet-2024',
        description: 'Annual sports championship featuring cricket, football, basketball, and athletics.',
        category: 'sports',
        image: 'https://picsum.photos/800/400?random=4',
        date: '2024-04-01',
        endDate: '2024-04-05',
        time: '7:00 AM',
        endTime: '7:00 PM',
        venue: 'College Sports Complex',
        venueCapacity: 3000,
        registrationDeadline: '2024-03-25',
        status: 'upcoming'
      },
      {
        title: 'AI & Machine Learning Workshop',
        slug: 'ai-ml-workshop',
        description: 'Hands-on workshop covering fundamentals of AI/ML with real-world applications.',
        category: 'workshop',
        image: 'https://picsum.photos/800/400?random=5',
        date: '2024-03-10',
        endDate: '2024-03-11',
        time: '10:00 AM',
        endTime: '5:00 PM',
        venue: 'Computer Lab 3 & Conference Hall',
        venueCapacity: 80,
        registrationDeadline: '2024-03-07',
        status: 'upcoming'
      },
      {
        title: 'Career Fair 2024',
        slug: 'career-fair-2024',
        description: 'Meet top recruiters and explore placement opportunities from leading companies.',
        category: 'academic',
        image: 'https://picsum.photos/800/400?random=6',
        date: '2024-03-18',
        time: '9:00 AM',
        endTime: '6:00 PM',
        venue: 'Convention Center',
        venueCapacity: 1500,
        registrationDeadline: '2024-03-15',
        status: 'upcoming'
      }
    ];

    for (const event of events) {
      try {
        const result = await dbRun(
          `INSERT INTO events (title, slug, description, category, image, date, endDate, time, endTime, venue, venueCapacity, registrationDeadline, status, organizerId)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            event.title, event.slug, event.description, event.category, event.image,
            event.date, event.endDate, event.time, event.endTime, event.venue,
            event.venueCapacity, event.registrationDeadline, event.status, 1
          ]
        );

        // Add event details
        await dbRun(
          `INSERT INTO event_details (eventId, fullDescription, rules, eligibility, coordinatorName, coordinatorEmail, coordinatorPhone, certificateProvided, featured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            result.id,
            event.description,
            'Follow event rules and guidelines',
            'College students only',
            'Event Team',
            'event@college.edu',
            '+91-9876543210',
            1,
            1
          ]
        );

        // Add ticket types
        await dbRun(
          `INSERT INTO ticket_types (eventId, name, price, available, total)
           VALUES (?, ?, ?, ?, ?)`,
          [result.id, 'General Entry', 0, 100, 100]
        );
      } catch (error) {
        // Event might already exist
      }
    }

    console.log('Database seeded successfully');
    db.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
