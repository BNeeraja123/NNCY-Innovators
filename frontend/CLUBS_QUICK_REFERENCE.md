# Clubs & Societies Module - Quick Reference Guide

## 📦 File Inventory

| File | Lines | Purpose |
|------|-------|---------|
| `clubsData.js` | 600+ | Central data source (12 clubs) |
| `clubsLogic.js` | 400+ | 35+ utility functions |
| `ClubCards.jsx` | 300+ | 8 reusable components |
| `ClubsDashboard.jsx` | 250+ | Main hub page |
| `TechnicalClubsPage.jsx` | 200+ | Tech clubs category |
| `CulturalGroupsPage.jsx` | 200+ | Cultural groups category |
| `SportsTeamsPage.jsx` | 200+ | Sports teams category |
| `ClubDetailPage.jsx` | 350+ | Individual club details |
| **Total** | **2,500+** | Production-ready |

---

## 🔍 Quick Function Reference

### Data Retrieval
```javascript
getAllClubs()                    // → Array[12]
getClubById(clubId)             // → Club Object | null
getClubsByCategory(category)    // → Array[4]
getTechnicalClubs()             // → Array[4]
getCulturalGroups()             // → Array[4]
getSportsTeams()                // → Array[4]
```

### Search & Filter
```javascript
searchClubs(query)              // → Filtered Array
getClubsByType(type)            // → Array
getClubsByMemberCount(minCount) // → Sorted Array
getUniqueFocusAreas()           // → Array of areas
getClubsByFocusArea(area)       // → Array[clubs]
```

### Analytics
```javascript
getClubsStats()                 // → { totalClubs, totalMembers, ... }
getCategoryStats()              // → { technical, cultural, sports }
getTopClubs(5)                  // → Array[5] most popular
getMembershipBreakdown()        // → { category: { clubs, members } }
```

### Achievements & Events
```javascript
getAllAchievements()            // → Array[48]
getAchievementsByClub(id)       // → Array
getTopAchievements(5)           // → Array[5] recent
getAllEvents()                  // → Array[36+]
getEventsByClub(id)             // → Array
```

---

## 🎨 Component Usage

### Basic Club Display
```jsx
import { ClubCard } from '../components/ClubCards';
import { getClubById } from '../utils/clubsLogic';

const club = getClubById('tech-001');
<ClubCard club={club} detailed={false} />
```

### Coordinator Display
```jsx
import { CoordinatorCard } from '../components/ClubCards';

<CoordinatorCard coordinator={coordObj} showEmail={true} />
```

### Stats Card
```jsx
import { StatsCard } from '../components/ClubCards';

<StatsCard 
  icon="👥" 
  label="Members" 
  value={1065} 
  color="blue" 
/>
```

### Filter Badge
```jsx
import { FilterBadge } from '../components/ClubCards';

<FilterBadge 
  label="Technical" 
  isActive={isActive} 
  onClick={() => handleFilter('technical')}
/>
```

---

## 🛣️ Route Map

```
/clubs                    → ClubsDashboard (all clubs)
/clubs/technical          → TechnicalClubsPage (4 clubs)
/clubs/cultural           → CulturalGroupsPage (4 groups)
/clubs/sports             → SportsTeamsPage (4 teams)
/clubs/:clubId            → ClubDetailPage (details)
```

---

## 📊 Data Structure Shorthand

### Club Object
```javascript
{
  id, name, category, type,
  description, fullDescription, logo,
  memberCount, founded,
  coordinators: [{name, position, email}],
  focusAreas: [],
  achievements: [{title, year, description}],
  events: [{name, date, participants}],
  galleryImages: [{url, caption}],
  membershipFee, meetingSchedule, joinLink
}
```

### All Exports from clubsData.js
```javascript
technicalClubsData  // 4 clubs
culturalGroupsData  // 4 groups
sportsTeamsData     // 4 teams
allClubsData        // 12 combined
clubsStatsData      // aggregate stats
clubCategories      // 3 categories
```

---

## 💡 Common Use Cases

### Get all technical clubs sorted by members
```javascript
const clubs = getTechnicalClubs()
  .sort((a, b) => b.memberCount - a.memberCount);
```

### Find clubs matching search term
```javascript
const results = searchClubs("programming");
```

### Get achievements from last 2 years
```javascript
const recent = getAllAchievements()
  .filter(a => a.year >= 2023);
```

### Display club statistics
```javascript
const stats = getClubsStats();
console.log(`Total: ${stats.totalClubs}, Members: ${stats.totalMembers}`);
```

### Get all coordinators for an event
```javascript
const coordinators = getAllCoordinators()
  .filter(c => c.clubName === "Code Hub");
```

---

## 🎯 Component Props Reference

### ClubCard Props
```javascript
{
  club: ClubObject,        // Required
  detailed?: boolean       // Optional, default: false
}
```

### CoordinatorCard Props
```javascript
{
  coordinator: CoordinatorObject,  // Required
  showEmail?: boolean              // Optional, default: true
}
```

### AchievementCard Props
```javascript
{
  achievement: AchievementObject,  // Required
  showClub?: boolean               // Optional, default: false
}
```

### StatsCard Props
```javascript
{
  icon: string,                    // Required (emoji)
  label: string,                   // Required
  value: number | string,          // Required
  color?: 'blue' | 'magenta' | 'orange' | 'cyan'  // Optional
}
```

---

## 🎨 Available Colors

For StatsCard and styling:
- `blue` - Technical
- `magenta` - Cultural
- `orange` - Sports
- `cyan` - Accent

---

## 📱 Responsive Breakpoints

```javascript
// Mobile: < 768px
// Tablet: 768px - 1024px
// Desktop: > 1024px
```

---

## 🔑 Club IDs Reference

### Technical
- `tech-001` → Code Hub
- `tech-002` → Innovation Lab
- `tech-003` → Web Wizards
- `tech-004` → AI & ML Club

### Cultural
- `cult-001` → Music Society
- `cult-002` → Drama & Theatre
- `cult-003` → Dance Collective
- `cult-004` → Debating Society

### Sports
- `sport-001` → Cricket Team
- `sport-002` → Football Team
- `sport-003` → Badminton Club
- `sport-004` → Athletic Club

---

## 💾 Data Statistics

| Metric | Count |
|--------|-------|
| Total Clubs | 12 |
| Total Members | 1,065 |
| Total Achievements | 48 |
| Total Events | 36+ |
| Total Gallery Images | 36+ |
| Total Coordinators | 24 |

---

## 🚀 Performance Tips

1. **Use Memoization**
   ```jsx
   const clubs = useMemo(() => getClubsByCategory('technical'), []);
   ```

2. **Cache Search Results**
   ```jsx
   const [results, setResults] = useState([]);
   ```

3. **Lazy Load Images**
   ```jsx
   <img src={image} loading="lazy" />
   ```

4. **Optimize Renders**
   - Use `useMemo` for expensive computations
   - Use `React.memo` for pure components
   - Avoid inline functions in props

---

## 🧪 Testing Quick Checks

```javascript
// Test data retrieval
console.log(getAllClubs()); // Should return 12 clubs

// Test search
console.log(searchClubs("programming")); // Should return matching clubs

// Test filters
console.log(getClubsByCategory("technical")); // Should return 4

// Test stats
console.log(getClubsStats()); // Should show correct totals
```

---

## 📝 Modification Checklist

- [ ] Add new club to appropriate array in `clubsData.js`
- [ ] Update `clubsStatsData` with new totals
- [ ] Test retrieval with `getClubById()`
- [ ] Verify display in category pages
- [ ] Check detail page rendering
- [ ] Test search functionality
- [ ] Verify responsive design

---

## 🔄 Common Patterns

### Filter Multiple Conditions
```javascript
const filtered = allClubsData.filter(club => 
  club.category === 'technical' && 
  club.memberCount > 200
);
```

### Sort Descending
```javascript
const sorted = [...clubs].sort((a, b) => 
  b.memberCount - a.memberCount
);
```

### Map with Index
```javascript
clubs.map((club, idx) => (
  <ClubCard key={club.id} club={club} index={idx} />
))
```

### Conditional Rendering
```jsx
{clubs.length > 0 ? (
  <ClubCard club={clubs[0]} />
) : (
  <p>No clubs found</p>
)}
```

---

## 🐛 Debug Commands

```javascript
// Check all club IDs
console.log(allClubsData.map(c => c.id));

// Check data completeness
allClubsData.forEach(club => {
  console.log(`${club.name}: ${club.coordinators.length} coordinators`);
});

// Verify statistics
console.log(clubsStatsData);
```

---

## ⚡ Quick Performance Checks

- Page load time: < 500ms
- Search response: < 100ms
- Filter updates: < 50ms
- Image load: < 2s (with lazy loading)
- Smooth scrolling: 60fps

---

## 📞 Support Commands

```bash
# View all imports in a component
grep "import.*from" src/pages/ClubsDashboard.jsx

# Find all utility function calls
grep "get\|search\|filter" src/pages/*.jsx

# Count total lines in module
wc -l src/{pages,components,utils,data}/{Clubs*,clubs*}.js*
```

---

**Last Updated:** 2024  
**Module Version:** 1.0.0  
**Status:** ✅ Production Ready
