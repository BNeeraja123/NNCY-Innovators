# 🎉 College Event Management System

A comprehensive, modern event management platform for colleges featuring festival-inspired design, complete event lifecycle management, and event gallery for memorable moments.

## ✨ Features Implemented

### 🎯 Core Features

#### 1. **User Authentication - Student Role Only**
- Student-based authentication with email login
- Session management with localStorage
- Simple and streamlined login experience
- No admin or organizer roles

#### 2. **Event Dashboard (Browse & Explore)**
- **Browse**: Explore and view event details
- **Event categories**: Technical, Cultural, Sports, Academic, Workshop, Social
- **Advanced Filtering**: Search, category filters, and sorting options
- **Event Details**: Complete event information with dates, venues, and requirements

#### 3. **Event Listings & Advanced Filters**
- **Search**: Full-text search across titles, descriptions, venues, and tags
- **Category Filters**: Filter by event type with vibrant color-coded badges
- **Sorting Options**: 
  - Date (Upcoming/Latest first)
  - Popularity (by registrations)
  - Name (A-Z)
- **View Modes**: Grid view with images or compact list view
- **Featured Events**: Highlighted events with special badges

#### 4. **Registration & Ticketing System**
- Multiple ticket types per event (Free/Paid)
- Registration form with validation
- Ticket availability tracking
- Registration deadline management
- Confirmation system
- View registered events in "My Events" dashboard

#### 5. **Event Gallery & Media** ⭐ **NEW FEATURE**
- **Winners Gallery**: Showcase winners and achievements from completed events
- **Event Memories**: Curated photos from event moments
- **Photo Organization**: Separate sections for winners and memories
- **Gallery Filtering**: Filter by event or by photo type (Winners/Memories)
- **Lightbox Viewer**: Full-screen image viewing with navigation
- **Image Details**: Captions, event information, and photo metadata
- **Professional Display**: Organized showcase of event highlights

#### 6. **My Events Dashboard**
- Track registered and attended events
- View event details and registration status
- Access to certificates for completed events
- Personal event history

#### 7. **Design & UX**
- **Festival-Inspired Theme**: Vibrant colors (Orange, Magenta, Blue, Green)
- **Youth-Centric UI**: Modern, energetic, and engaging design
- **Mobile Responsive**: Fully responsive across all devices
- **Smooth Animations**: Hover effects, transitions, and interactions
- **Category Color Coding**: Each event category has unique colors

---

## 🎨 Design System

### Color Palette
```javascript
Festival Colors:
- Orange: #FFA500 (Energetic, Fun)
- Blue: #00BFFF (Dynamic, Modern)
- Tangerine: #FF8200 (Youthful, Exciting)
- Magenta: #FF00FF (Bold, Creative)
- Green: #00FF40 (Fresh, Innovative)

Event Categories:
- Technical: #8B5CF6 (Purple)
- Cultural: #FF8200 (Orange)
- Sports: #00FF40 (Green)
- Academic: #00BFFF (Blue)
- Workshop: #F59E0B (Amber)
- Social: #FF00FF (Magenta)
```

### Typography
- Primary: System fonts (Inter-style)
- Font Weights: 400 (Regular), 600 (Semibold), 700 (Bold)

---

## 📁 Project Structure

```
campus/
├── backend/
│   ├── server.js              # Express server setup
│   ├── routes/
│   │   └── events.js          # Event API endpoints
│   └── package.json           # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main app component with routing
    │   ├── main.jsx           # Entry point
    │   ├── index.css          # Global styles
    │   ├── App.css            # App-specific styles
    │   │
    │   ├── components/        # Reusable components
    │   │   ├── Navbar.jsx     # Navigation header
    │   │   ├── Sidebar.jsx    # Sidebar navigation
    │   │   ├── EventCard.jsx  # Event card component
    │   │   ├── EventFilterBar.jsx  # Filter controls
    │   │   └── StatCard.jsx   # Statistics display
    │   │
    │   ├── context/           # React Context for state management
    │   │   └── AuthContext.jsx # Authentication context
    │   │
    │   ├── data/              # Data files
    │   │   ├── eventsFullData.js # Complete events and gallery data
    │   │   ├── eventsData.js  # Event data
    │   │   └── dummyData.js   # Demo data
    │   │
    │   └── pages/             # Page components
    │       ├── Home.jsx       # Landing page
    │       ├── Login.jsx      # Student login
    │       ├── Registration.jsx # New student registration
    │       ├── EventsListing.jsx # Events browse page
    │       ├── EventDetail.jsx # Single event details
    │       ├── EventGallery.jsx # Event gallery with winners & memories ⭐
    │       └── MyEvents.jsx    # User's registered events
    │
    ├── package.json           # Frontend dependencies
    ├── vite.config.js         # Vite configuration
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── postcss.config.js      # PostCSS configuration
    └── public/
        └── images/            # Static images
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Backend Setup**
```bash
cd backend
npm install
node server.js
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### Running the Application

- **Frontend**: Runs on `http://localhost:5173` (Vite default)
- **Backend**: Runs on `http://localhost:5000`

---

## 📝 Recent Updates (v2.0)

### Removed Features
- ❌ Admin Dashboard and admin login
- ❌ Faculty Dashboard and faculty login
- ❌ Attendance tracking system
- ❌ QR code attendance features
- ❌ Role-based access control (Admin/Faculty)
- ❌ Multiple user dashboards

### New Features Added
- ✅ **Enhanced Event Gallery**
  - Winners section highlighting achievements
  - Memories section with event moments
  - Filter by event or photo type
  - Improved lightbox viewer with navigation
  - Photo captions and detailed information
  - Professional image organization

- ✅ **Streamlined Authentication**
  - Student-only login system
  - Simple, focused user experience
  - Simplified session management

---

## 🎯 Gallery Feature Details

### Winners Gallery
Display championship-winning moments, award winners, and top achievements from completed events. Each winner photo includes:
- Trophy/award moment
- Team or individual celebration
- Event context and metadata

### Event Memories
Curate and showcase memorable moments from events including:
- Live performances and activities
- Participant engagement shots
- Crowd moments and celebrations
- Behind-the-scenes captures

### Gallery Features
- **Smart Filtering**: Filter by event or by photo type
- **Image Navigation**: Browse through photos with previous/next buttons
- **Responsive Grid**: Adapts to different screen sizes
- **Lightbox Display**: Full-screen viewing with details
- **Photo Metadata**: Captions, event information, and photo descriptions

---

## 🛠️ Technology Stack

### Frontend
- **React 18**: Component library
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Modern build tool and dev server
- **Context API**: State management

### Backend
- **Express.js**: Web framework
- **Node.js**: Runtime environment
- **CORS**: Cross-Origin Resource Sharing
- **dotenv**: Environment variable management

### Styling
- Tailwind CSS for responsive design
- Custom CSS for animations and effects
- PostCSS for CSS processing

---

## 📋 API Endpoints

### Event Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `GET /api/events/search?q=keyword` - Search events

### Gallery Endpoints (Ready for Integration)
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/event/:eventId` - Get gallery for specific event
- `POST /api/gallery/upload` - Upload event photos (for future implementation)

---

## 🎨 Customization

### Adding New Events
Edit `frontend/src/data/eventsFullData.js` and add event objects with required fields.

### Adding Gallery Photos
Add photo objects to the `eventGallery` array in `eventsFullData.js` with:
- `image`: Photo URL
- `title`: Photo title
- `type`: 'winner' or 'memory'
- `caption`: Photo description
- `eventId`: Associated event ID

### Modifying Colors
Update color values in Tailwind config or CSS variables for theme customization.

---

## 🔐 Security Notes
- Passwords are not validated (mock authentication)
- Authentication is localStorage-based (frontend only)
- For production: Implement proper backend authentication with JWT
- Add database integration for persistent user data

---

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Tablet (768px to 1024px)
- Mobile (320px to 767px)

---

## 🐛 Known Limitations
- Mock authentication (no real password validation)
- In-memory data storage (resets on page refresh)
- No actual email notifications
- No real payment processing
- Gallery uses placeholder images (picsum.photos)

---

## 🚀 Future Enhancements

Potential features for future versions:
- Backend authentication with JWT
- Database integration (MongoDB/PostgreSQL)
- Email notifications
- Payment gateway integration
- Admin panel for event management
- Advanced analytics
- Social media sharing
- Comments and ratings system
- Virtual event support
- QR code event check-in

---

## 📞 Support

For issues or feature requests, please contact the development team at `support@college.edu`
- Headings: Bold, large (text-4xl, text-5xl)
- Body: Clean, readable (text-base, text-lg)
- Labels: Uppercase, tracked-out for metadata

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── EventCard.jsx          # Reusable event card (grid/list views)
│   │   ├── EventFilterBar.jsx     # Search, category, and sort filters
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatCard.jsx
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication state management
│   ├── data/
│   │   ├── eventsData.js          # Original simple events
│   │   ├── eventsFullData.js      # Comprehensive event data with all fields
│   │   └── dummyData.js           # Attendance system data
│   ├── pages/
│   │   ├── Home.jsx               # Landing page with events section
│   │   ├── EventsListing.jsx      # All events with filters
│   │   ├── EventDetail.jsx        # Single event page with registration
│   │   ├── MyEvents.jsx           # User's registered events dashboard
│   │   ├── EventGallery.jsx       # Photo gallery
│   │   ├── Login.jsx
│   │   ├── Registration.jsx
│   │   ├── AdminDashboard.jsx     # Attendance management
│   │   ├── FacultyDashboard.jsx
│   │   └── StudentDashboard.jsx
│   ├── App.jsx                    # Routes with AuthProvider
│   └── index.css                  # Global styles

backend/
├── routes/
│   └── events.js                  # Event management API endpoints
├── server.js                      # Express server with event routes
└── package.json
```

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3 (festival color extensions)
- **State Management**: React Context API (AuthContext)
- **Charts**: Recharts (for analytics)
- **PDF Generation**: jsPDF (for certificates)

### Backend
- **Runtime**: Node.js with Express
- **API Architecture**: RESTful endpoints
- **Middleware**: CORS, express.json()

---

## 🔌 API Endpoints

### Events
- `GET /api/events` - Get all events with filters
- `GET /api/events/:slug` - Get single event
- `POST /api/events` - Create new event (Admin/Organizer)
- `PUT /api/events/:eventId` - Update event
- `DELETE /api/events/:eventId` - Delete event (Admin)

### Registration
- `POST /api/events/:eventId/register` - Register for event
- `GET /api/users/:userId/events` - Get user's events

### Attendance
- `POST /api/events/:eventId/attendance` - Mark attendance with QR

### Certificates
- `POST /api/events/:eventId/certificates` - Generate certificate

### Analytics
- `GET /api/events/:eventId/analytics` - Get event analytics

### Gallery
- `POST /api/events/:eventId/gallery` - Upload gallery images

---

## 🎯 Event Data Structure

```javascript
{
  id: 1,
  title: 'Mohana Mantra 2024 - Code Sprint',
  slug: 'mohana-mantra-2024-code-sprint',
  category: 'technical', // technical, cultural, sports, academic, workshop, social
  shortDescription: '48-hour coding hackathon...',
  fullDescription: 'Detailed description...',
  date: '2024-03-15',
  endDate: '2024-03-17',
  time: '9:00 AM',
  endTime: '5:00 PM',
  venue: 'Computer Science Block - Labs 1-5',
  venueCapacity: 200,
  image: 'https://...',
  organizer: {
    name: 'Tech Club',
    contact: 'techclub@college.edu',
    phone: '+91-9876543210'
  },
  ticketTypes: [
    { id: 1, name: 'Individual', price: 0, available: 50, total: 100 },
    { id: 2, name: 'Team (4 members)', price: 0, available: 30, total: 50 }
  ],
  registrationDeadline: '2024-03-10',
  registrationStatus: 'open', // open, closed, full
  totalRegistrations: 120,
  requirements: ['Laptop', 'Student ID', 'Team of 2-4 members'],
  schedule: [
    { day: 'Day 1', time: '9:00 AM', activity: 'Opening Ceremony' }
  ],
  prizes: ['1st Prize: ₹2,00,000', '2nd Prize: ₹1,00,000'],
  tags: ['Coding', 'Hackathon', 'Competition', 'Innovation'],
  featured: true,
  certificateProvided: true,
  status: 'upcoming' // upcoming, ongoing, past
}
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v18+ (or v20/v22)
- npm or yarn or pnpm

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

---

## 📱 Key Pages

### 1. Home Page (`/`)
- Hero section with college branding
- Featured events carousel
- Quick access buttons
- Event highlights section
- Call-to-action for event discovery

### 2. Events Listing (`/events`)
- Featured events showcase
- Advanced filter sidebar
- Search functionality
- Category chips with vibrant colors
- Grid/List view toggle
- Sort options

### 3. Event Detail (`/events/:slug`)
- Full event information
- Registration form modal
- Event schedule timeline
- Prizes & requirements
- Organizer contact details
- Ticket selection
- Social sharing (ready)

### 4. My Events (`/my-events`)
- Registered events with QR codes
- Past events history
- Certificates download
- Attendance tracking
- Event calendar view

### 5. Event Gallery (`/gallery`)
- Photo grid from past events
- Filter by event
- Lightbox image viewer
- Upload interface (for organizers)

---

## 🔐 Authentication Flow

1. User logs in with role (student/organizer/admin)
2. Auth state stored in Context + localStorage
3. Protected routes check authentication
4. Role-based access to features:
   - **Student**: Browse, register, view "My Events"
   - **Organizer**: Create/edit events, view analytics
   - **Admin**: Full control + delete events

---

## 🎓 Integration with Existing Attendance System

The event management system works **alongside** the existing attendance management:
- Shared navigation and branding
- Same user authentication system
- Events can be linked to classes for automatic attendance tracking
- QR code system can be unified
- Combined admin dashboard showing both attendance and event analytics

---

## 🔮 Future Enhancements (Ready for Implementation)

### Phase 1: Core Improvements
- [ ] Connect to real database (MongoDB/PostgreSQL)
- [ ] Email/SMS notification service integration
- [ ] Payment gateway for paid events (Razorpay/Stripe)
- [ ] Real QR code generation library (qrcode.react)
- [ ] PDF certificate generation (jsPDF-autotable)

### Phase 2: Advanced Features
- [ ] Live event streaming integration
- [ ] Real-time chat/discussion per event
- [ ] Social media sharing
- [ ] Calendar export (Google/Outlook)
- [ ] Event feedback & ratings
- [ ] Photo upload with moderation

### Phase 3: Analytics & Insights
- [ ] Advanced analytics dashboard
- [ ] Registration trends visualization
- [ ] Demographics reports
- [ ] Revenue tracking (for paid events)
- [ ] Email campaign analytics

### Phase 4: Mobile Enhancement
- [ ] Progressive Web App (PWA)
- [ ] Push notifications
- [ ] Offline mode for tickets/QR codes
- [ ] Mobile-optimized camera QR scanner

---

## 🎨 Design Inspiration

This system is inspired by:
- **Mohana Mantra**: Festival vibe, cultural warmth
- **Modern SaaS**: Linear-esque precision, clean UI
- **Youth Marketing**: Vibrant colors, energetic feel
- **University Platforms**: Institutional trust, accessibility

---

## 📄 License & Credits

Built for college event management with ❤️ by Neeraja

Festival color palette curated from:
- Kombai Color API
- Modern design systems (Linear, Figma, etc.)

---

## 💡 Developer Notes

### Extending Event Categories
Edit `frontend/src/data/eventsFullData.js`:
```javascript
export const eventCategories = [
  { id: 'newCategory', name: 'New Type', color: 'event-newCategory', icon: '🎪' }
];
```

Then add color in `tailwind.config.js`:
```javascript
event: {
  newCategory: '#HEXCOLOR'
}
```

### Adding New Features
1. Create component in `components/`
2. Add route in `App.jsx`
3. Connect backend API in `backend/routes/events.js`
4. Update documentation

---

## 🐛 Known Issues & Fixes

### Tailwind Dynamic Classes
- Issue: Dynamic `bg-${color}` may not work with purging
- Fix: Use safelist in tailwind.config.js or predefined class mapping

### Image Loading
- Use lazy loading for event images
- Implement skeleton loaders for better UX

### Mobile Responsiveness
- Test on multiple devices
- Ensure touch-friendly tap targets (min 44x44px)

---

## 📞 Support & Contact

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Check documentation at `/docs`

---

**Happy Event Management! 🎉**
