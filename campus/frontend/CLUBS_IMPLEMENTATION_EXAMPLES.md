# Clubs & Societies Module - Implementation Examples

## 🎯 Common Implementation Scenarios

### Scenario 1: Display All Technical Clubs

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getTechnicalClubs } from '../utils/clubsLogic';
import { ClubCard } from '../components/ClubCards';

function TechClubsList() {
  const technicalClubs = useMemo(() => getTechnicalClubs(), []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {technicalClubs.map(club => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}

export default TechClubsList;
```

---

### Scenario 2: Search with Real-Time Results

**Component Code:**
```jsx
import React, { useState, useMemo } from 'react';
import { searchClubs } from '../utils/clubsLogic';
import { ClubCard } from '../components/ClubCards';

function ClubSearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const results = useMemo(() => {
    return searchTerm ? searchClubs(searchTerm) : [];
  }, [searchTerm]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search clubs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded border"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {results.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
      
      {results.length === 0 && searchTerm && (
        <p className="text-gray-600 mt-4">No clubs found matching "{searchTerm}"</p>
      )}
    </div>
  );
}

export default ClubSearchComponent;
```

---

### Scenario 3: Multi-Level Filtering

**Component Code:**
```jsx
import React, { useState, useMemo } from 'react';
import {
  getClubsByCategory,
  getUniqueFocusAreas,
  getClubsByFocusArea
} from '../utils/clubsLogic';
import { ClubCard } from '../components/ClubCards';

function AdvancedFilterComponent() {
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [selectedFocusArea, setSelectedFocusArea] = useState(null);
  
  const clubsByCategory = useMemo(
    () => getClubsByCategory(selectedCategory),
    [selectedCategory]
  );
  
  const focusAreas = useMemo(
    () => getUniqueFocusAreas(),
    []
  );
  
  const filteredClubs = useMemo(() => {
    if (!selectedFocusArea) return clubsByCategory;
    return clubsByCategory.filter(club =>
      club.focusAreas.includes(selectedFocusArea)
    );
  }, [clubsByCategory, selectedFocusArea]);
  
  return (
    <div>
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedFocusArea(null);
        }}
        className="px-4 py-2 rounded border"
      >
        <option value="technical">Technical</option>
        <option value="cultural">Cultural</option>
        <option value="sports">Sports</option>
      </select>
      
      {/* Focus Area Filter (only for technical) */}
      {selectedCategory === 'technical' && (
        <select
          value={selectedFocusArea || ''}
          onChange={(e) => setSelectedFocusArea(e.target.value || null)}
          className="px-4 py-2 rounded border ml-4"
        >
          <option value="">All Areas</option>
          {focusAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      )}
      
      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredClubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
}

export default AdvancedFilterComponent;
```

---

### Scenario 4: Club Statistics Dashboard

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getClubsStats, getCategoryStats } from '../utils/clubsLogic';
import { StatsCard } from '../components/ClubCards';

function StatsDashboard() {
  const stats = useMemo(() => getClubsStats(), []);
  const categoryStats = useMemo(() => getCategoryStats(), []);
  
  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Overall Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard icon="🏢" label="Clubs" value={stats.totalClubs} color="blue" />
          <StatsCard icon="👥" label="Members" value={stats.totalMembers} color="magenta" />
          <StatsCard icon="🏆" label="Achievements" value={stats.totalAchievements} color="orange" />
          <StatsCard icon="📅" label="Events" value={stats.totalEvents} color="cyan" />
        </div>
      </div>
      
      {/* Category Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-4">By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(categoryStats).map(([category, data]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold capitalize mb-4">{category}</h3>
              <div className="space-y-2">
                <p>Clubs: <span className="font-bold">{data.count}</span></p>
                <p>Members: <span className="font-bold">{data.members}</span></p>
                <p>Achievements: <span className="font-bold">{data.achievements}</span></p>
                <p>Events: <span className="font-bold">{data.events}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;
```

---

### Scenario 5: Club Detail with All Information

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getClubDashboardData } from '../utils/clubsLogic';
import {
  CoordinatorCard,
  AchievementCard,
  EventCard,
  GalleryCard
} from '../components/ClubCards';

function ClubDetailView({ clubId }) {
  const clubData = useMemo(() => getClubDashboardData(clubId), [clubId]);
  
  if (!clubData) return <div>Club not found</div>;
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-6xl">{clubData.logo}</div>
          <div>
            <h1 className="text-4xl font-bold">{clubData.name}</h1>
            <p className="text-lg opacity-90">{clubData.type}</p>
            <p className="text-sm opacity-75">Founded {clubData.founded}</p>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-700 mb-4">{clubData.fullDescription}</p>
        <div className="flex flex-wrap gap-2">
          {clubData.focusAreas.map((area, idx) => (
            <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {area}
            </span>
          ))}
        </div>
      </section>
      
      {/* Coordinators */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Coordinators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubData.coordinators.map((coord, idx) => (
            <CoordinatorCard key={idx} coordinator={coord} />
          ))}
        </div>
      </section>
      
      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="space-y-4">
          {clubData.achievements.map((achievement, idx) => (
            <AchievementCard key={idx} achievement={achievement} />
          ))}
        </div>
      </section>
      
      {/* Events */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubData.events.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      </section>
      
      {/* Gallery */}
      {clubData.gallery.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clubData.gallery.map((image, idx) => (
              <GalleryCard key={idx} image={image} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ClubDetailView;
```

---

### Scenario 6: Achievement Timeline Across Clubs

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getAllAchievements } from '../utils/clubsLogic';
import { AchievementCard } from '../components/ClubCards';

function AchievementTimeline() {
  const achievements = useMemo(() => getAllAchievements(), []);
  
  // Group by year
  const byYear = useMemo(() => {
    const grouped = {};
    achievements.forEach(ach => {
      if (!grouped[ach.year]) grouped[ach.year] = [];
      grouped[ach.year].push(ach);
    });
    return grouped;
  }, [achievements]);
  
  return (
    <div className="space-y-8">
      {Object.entries(byYear)
        .sort(([yearA], [yearB]) => yearB - yearA)
        .map(([year, achList]) => (
          <div key={year}>
            <h2 className="text-2xl font-bold mb-4">{year}</h2>
            <div className="space-y-4">
              {achList.map((ach, idx) => (
                <AchievementCard
                  key={idx}
                  achievement={ach}
                  showClub={true}
                />
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default AchievementTimeline;
```

---

### Scenario 7: Popular Clubs Widget

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getTopClubs } from '../utils/clubsLogic';
import { useNavigate } from 'react-router-dom';

function PopularClubsWidget({ limit = 5 }) {
  const navigate = useNavigate();
  const topClubs = useMemo(() => getTopClubs(limit), [limit]);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⭐ Most Popular Clubs</h3>
      <div className="space-y-3">
        {topClubs.map((club, idx) => (
          <div
            key={club.id}
            onClick={() => navigate(`/clubs/${club.id}`)}
            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{club.logo}</span>
                <div>
                  <p className="font-bold">{club.name}</p>
                  <p className="text-xs text-gray-600">{club.memberCount} members</p>
                </div>
              </div>
              <span className="text-xl font-bold text-orange-500">#{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularClubsWidget;
```

---

### Scenario 8: Sorting and Pagination

**Component Code:**
```jsx
import React, { useState, useMemo } from 'react';
import { getAllClubs } from '../utils/clubsLogic';
import { ClubCard } from '../components/ClubCards';

function SortedClubsList() {
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  const allClubs = useMemo(() => getAllClubs(), []);
  
  const sorted = useMemo(() => {
    const clubs = [...allClubs];
    if (sortBy === 'name') {
      clubs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'members') {
      clubs.sort((a, b) => b.memberCount - a.memberCount);
    } else if (sortBy === 'founded') {
      clubs.sort((a, b) => a.founded - b.founded);
    }
    return clubs;
  }, [allClubs, sortBy]);
  
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, page]);
  
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  
  return (
    <div>
      {/* Sort Controls */}
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setPage(1);
        }}
        className="px-4 py-2 rounded border"
      >
        <option value="name">Sort by Name</option>
        <option value="members">Sort by Members</option>
        <option value="founded">Sort by Founded Year</option>
      </select>
      
      {/* Club Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {paginated.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${
              page === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SortedClubsList;
```

---

### Scenario 9: Coordinator Contact List

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getAllCoordinators } from '../utils/clubsLogic';

function CoordinatorDirectory() {
  const coordinators = useMemo(() => getAllCoordinators(), []);
  
  // Group by club
  const byClub = useMemo(() => {
    const grouped = {};
    coordinators.forEach(coord => {
      if (!grouped[coord.clubName]) grouped[coord.clubName] = [];
      grouped[coord.clubName].push(coord);
    });
    return grouped;
  }, [coordinators]);
  
  return (
    <div className="space-y-6">
      {Object.entries(byClub).map(([clubName, coords]) => (
        <div key={clubName} className="border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">{clubName}</h3>
          <div className="space-y-2">
            {coords.map((coord, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{coord.name}</p>
                  <p className="text-sm text-gray-600">{coord.position}</p>
                </div>
                <a
                  href={`mailto:${coord.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {coord.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CoordinatorDirectory;
```

---

### Scenario 10: Membership Statistics Chart

**Component Code:**
```jsx
import React, { useMemo } from 'react';
import { getMembershipBreakdown, allClubsData } from '../utils/clubsLogic';

function MembershipStats() {
  const breakdown = useMemo(() => getMembershipBreakdown(), []);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(breakdown).map(([category, data]) => (
          <div key={category} className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold capitalize mb-4">{category}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Clubs</p>
                <p className="text-3xl font-bold">{data.clubs}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Members</p>
                <p className="text-3xl font-bold">{data.members}</p>
              </div>
              <div>
                <p className="text-gray-600">Avg per Club</p>
                <p className="text-3xl font-bold">{Math.round(data.members / data.clubs)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Member Distribution */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-bold mb-6">Member Distribution</h3>
        <div className="space-y-3">
          {allClubsData.sort((a, b) => b.memberCount - a.memberCount).map(club => (
            <div key={club.id}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{club.name}</span>
                <span className="text-gray-600">{club.memberCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(club.memberCount / 250) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembershipStats;
```

---

## 📊 Integration with Backend API

When integrating with a backend API, replace static data imports:

```javascript
// Before (Static Data)
import { allClubsData } from '../data/clubsData';
const clubs = allClubsData;

// After (API Call)
const [clubs, setClubs] = useState([]);
useEffect(() => {
  fetch('/api/clubs')
    .then(res => res.json())
    .then(data => setClubs(data));
}, []);
```

---

## 🔗 API Endpoints (Future)

```
GET    /api/clubs                  // All clubs
GET    /api/clubs/:id              // Single club
GET    /api/clubs?category=tech    // Filtered clubs
GET    /api/achievements           // All achievements
GET    /api/events                 // All events
POST   /api/clubs/:id/join         // Join club
POST   /api/clubs/:id/upload-image // Upload images
```

---

**These examples cover 90% of typical use cases for the Clubs & Societies module.**
