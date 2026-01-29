# Analytics Module - Quick Reference Guide

## 📍 File Locations

```
campus/
├── frontend/src/
│   ├── components/
│   │   └── AnalyticsCard.jsx (6 components, 300+ lines)
│   ├── pages/
│   │   ├── AnalyticsDashboard.jsx (Main dashboard, 400+ lines)
│   │   ├── RankingsPage.jsx (Rankings view, 350+ lines)
│   │   ├── AwardsPage.jsx (Awards showcase, 300+ lines)
│   │   ├── AchievementsPage.jsx (Achievements, 350+ lines)
│   │   └── ReportsPage.jsx (Reports archive, 300+ lines)
│   ├── data/
│   │   └── analyticsData.js (Data source, 500+ lines)
│   ├── utils/
│   │   └── analyticsLogic.js (30+ functions, 400+ lines)
│   └── App.jsx (5 new routes added)
├── ANALYTICS_ACHIEVEMENTS_GUIDE.md (Technical guide)
├── ANALYTICS_USER_GUIDE.md (User manual)
└── ANALYTICS_MODULE_README.md (Implementation summary)
```

---

## 🔗 Routes Quick Reference

| Route | Component | Purpose |
|-------|-----------|---------|
| `/analytics` | AnalyticsDashboard | Main dashboard with tabs |
| `/analytics/rankings` | RankingsPage | Detailed rankings view |
| `/analytics/awards` | AwardsPage | Awards showcase |
| `/analytics/achievements` | AchievementsPage | Achievements gallery |
| `/analytics/reports` | ReportsPage | Annual reports |

---

## 🧩 Component API Reference

### RankingCard
```javascript
import { RankingCard } from '../components/AnalyticsCard';

<RankingCard 
  ranking={rankingObject}
  featured={true}  // Optional, default: false
/>
```

### AwardCard
```javascript
import { AwardCard } from '../components/AnalyticsCard';

<AwardCard award={awardObject} />
```

### AchievementCard
```javascript
import { AchievementCard } from '../components/AnalyticsCard';

<AchievementCard achievement={achievementObject} />
```

### MediaMentionCard
```javascript
import { MediaMentionCard } from '../components/AnalyticsCard';

<MediaMentionCard 
  mention={mentionObject}
  featured={true}  // Optional, default: false
/>
```

### ReportCard
```javascript
import { ReportCard } from '../components/AnalyticsCard';

<ReportCard report={reportObject} />
```

### DepartmentRankingCard
```javascript
import { DepartmentRankingCard } from '../components/AnalyticsCard';

<DepartmentRankingCard department={departmentObject} />
```

---

## 🔧 Utility Functions Quick Reference

### Ranking Functions
```javascript
import { 
  getAllRankings,
  getNationalRankings,
  getInternationalRankings,
  getTopRankings,
  getRankingsByYear,
  searchRankings,
  getRankingImprovementStats
} from '../utils/analyticsLogic';

// Get all rankings
const rankings = getAllRankings();

// Get national only
const national = getNationalRankings();

// Get top 5
const top5 = getTopRankings(5);

// Search
const nirf = searchRankings("NIRF");

// Get improvements
const stats = getRankingImprovementStats();
```

### Award Functions
```javascript
import {
  getAllAwards,
  getAwardsByCategory,
  getAwardsByYear,
  searchAwards,
  getAwardCategories
} from '../utils/analyticsLogic';

// Get all awards
const awards = getAllAwards();

// Get by category
const accreditations = getAwardsByCategory('Accreditation');

// Get by year
const awards2023 = getAwardsByYear(2023);

// Search
const results = searchAwards("Padma");

// Get categories
const categories = getAwardCategories();
```

### Achievement Functions
```javascript
import {
  getAllAchievements,
  getAchievementsByCategory,
  getAchievementsByImpact,
  getTopAchievements,
  searchAchievements,
  getAchievementCategories
} from '../utils/analyticsLogic';

// Get all
const achievements = getAllAchievements();

// Get by impact
const major = getAchievementsByImpact('Major');

// Get top 5
const top5 = getTopAchievements(5);

// Search
const research = searchAchievements("research");

// Get categories
const categories = getAchievementCategories();
```

### Media Functions
```javascript
import {
  getAllMentions,
  getFeaturedMentions,
  getMentionsByYear,
  searchMentions,
  getMediaStatistics
} from '../utils/analyticsLogic';

// Get all mentions
const mentions = getAllMentions();

// Get featured only
const featured = getFeaturedMentions();

// Get by year
const mentions2024 = getMentionsByYear(2024);

// Search
const times = searchMentions("Times");

// Get statistics
const stats = getMediaStatistics();
```

### Report Functions
```javascript
import {
  getYearlyReports,
  getReportByYear,
  getLatestReport
} from '../utils/analyticsLogic';

// Get all reports
const reports = getYearlyReports();

// Get specific year
const report2023 = getReportByYear(2023);

// Get latest
const latest = getLatestReport();
```

### Analytics Functions
```javascript
import {
  getInstitutionalStats,
  getMilestoneTimeline,
  getDepartmentRankings,
  getCompleteDashboardData
} from '../utils/analyticsLogic';

// Get stats
const stats = getInstitutionalStats();

// Get timeline
const milestones = getMilestoneTimeline();

// Get departments
const depts = getDepartmentRankings();

// Get all data at once
const allData = getCompleteDashboardData();
```

---

## 📊 Data Objects Format

### Ranking Object
```javascript
{
  id: "ranking-1",
  organization: "NIRF",
  category: "Overall",
  rank: 45,
  year: 2024,
  type: "national",
  link: "https://...",
  improvedFrom: 52,
  badge: "📍"
}
```

### Award Object
```javascript
{
  id: "award-1",
  name: "NBA Accreditation",
  awardee: "Institution",
  giver: "National Board",
  year: 2023,
  category: "Accreditation",
  icon: "🏆",
  type: "institutional",
  validity: "2023-2026"
}
```

### Achievement Object
```javascript
{
  id: "achievement-1",
  title: "98% Placement Rate",
  description: "Highest placement rate",
  year: 2023,
  details: "All eligible students placed",
  category: "Placement",
  impact: "Major",
  icon: "📈"
}
```

### Media Mention Object
```javascript
{
  id: "mention-1",
  publication: "Times of India",
  headline: "Institution Sets New Standards",
  excerpt: "...",
  category: "Academic Excellence",
  date: "2024-01-15",
  featured: true,
  link: "https://..."
}
```

### Report Object
```javascript
{
  id: "report-1",
  year: 2023,
  title: "Annual Report 2023-24",
  fileName: "Annual_Report_2023-24.pdf",
  fileSize: "8.5 MB",
  highlights: ["Achievement 1", "Achievement 2"],
  downloadUrl: "..."
}
```

### Department Object
```javascript
{
  id: "dept-1",
  name: "CSE",
  nerfRank2024: 32,
  nerfRank2023: 35,
  students: 240,
  avgPackage: "18 LPA"
}
```

---

## 🎨 TailwindCSS Color System

```javascript
// Festival Colors Used
const colors = {
  'festival-orange': '#ff7f50',   // Orange
  'festival-magenta': '#ff1493',  // Magenta/Pink
  'festival-blue': '#1e40af',     // Blue
  'festival-cyan': '#00bcd4'      // Cyan
};

// Usage in components:
// className="bg-festival-orange"
// className="text-festival-magenta"
// className="border-festival-blue"
// className="hover:shadow-festival-cyan"
```

---

## 🔄 Common Patterns

### Display with Filter
```javascript
const [filter, setFilter] = useState('all');
const filtered = useMemo(() => {
  if (filter === 'all') return getAllRankings();
  return getRankingsByYear(filter);
}, [filter]);

return (
  <div>
    <select onChange={e => setFilter(e.target.value)}>
      {/* options */}
    </select>
    {filtered.map(item => <RankingCard key={item.id} {...item} />)}
  </div>
);
```

### Search Implementation
```javascript
const [query, setQuery] = useState('');
const results = useMemo(() => {
  return query ? searchRankings(query) : getAllRankings();
}, [query]);

return (
  <div>
    <input onChange={e => setQuery(e.target.value)} />
    {results.map(item => <RankingCard key={item.id} {...item} />)}
  </div>
);
```

### Multi-Filter Pattern
```javascript
const [category, setCategory] = useState('all');
const [year, setYear] = useState('all');

const filtered = useMemo(() => {
  let result = getAllAchievements();
  if (category !== 'all') {
    result = result.filter(a => a.category === category);
  }
  if (year !== 'all') {
    result = result.filter(a => a.year === parseInt(year));
  }
  return result;
}, [category, year]);
```

---

## 📈 Data Statistics

### Current Data
- **Rankings:** 10 (7 national + 3 international)
- **Awards:** 14 (5 institutional + 4 student + 5 faculty)
- **Achievements:** 10
- **Media Mentions:** 8 (3 featured)
- **Annual Reports:** 5 (2019-2023)
- **Departments:** 5 (CSE, ECE, MECH, CIVIL, EEE)
- **Milestones:** 6
- **Total Data Entries:** 50+

---

## 🚀 Common Development Tasks

### Add New Ranking
```javascript
// In analyticsData.js
rankingsData.push({
  id: "ranking-new",
  organization: "New Org",
  category: "Category",
  rank: 25,
  year: 2024,
  type: "national",
  link: "https://...",
  improvedFrom: 30,
  badge: "📍"
});

// Update stats
institutionalStatsData.totalRankings += 1;
```

### Add New Achievement
```javascript
// In analyticsData.js
achievementsData.push({
  id: "achievement-new",
  title: "New Achievement",
  description: "Description",
  year: 2024,
  details: "Details",
  category: "Category",
  impact: "Major", // or "High" or "Medium"
  icon: "📊"
});

// Update stats
institutionalStatsData.totalAchievements += 1;
```

### Create Custom Filter
```javascript
function CustomFilter() {
  const [filter, setFilter] = useState('');
  const achievements = getAchievementsByCategory(filter);
  
  return (
    <div>
      <select onChange={e => setFilter(e.target.value)}>
        {getAchievementCategories().map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {achievements.map(a => <AchievementCard key={a.id} achievement={a} />)}
    </div>
  );
}
```

---

## ⚙️ Configuration

### Enable/Disable Features
Edit in pages or components:

```javascript
// Show/hide featured rankings
const showFeatured = true;

// Limit items displayed
const itemsPerPage = 6;

// Enable search
const enableSearch = true;

// Color scheme
const primaryColor = 'festival-blue';
```

### Update Statistics Display
Edit `institutionalStatsData` in `analyticsData.js`:

```javascript
const institutionalStatsData = {
  totalRankings: 10,
  totalAwards: 14,
  totalAchievements: 10,
  // ... update as data grows
};
```

---

## 🐛 Debugging Tips

### Check Data
```javascript
// In browser console
import { getAllRankings } from './src/utils/analyticsLogic';
console.log(getAllRankings());
```

### Test Search
```javascript
// In component
const results = searchRankings("NIRF");
console.log('Search results:', results);
```

### Verify Functions
```javascript
// Check all functions available
import * as analytics from './utils/analyticsLogic';
console.log(Object.keys(analytics));
```

---

## 📋 Checklist for New Developers

Before working on this module:

- [ ] Read ANALYTICS_ACHIEVEMENTS_GUIDE.md
- [ ] Understand data structure in analyticsData.js
- [ ] Review all utility functions in analyticsLogic.js
- [ ] Test component rendering locally
- [ ] Run search and filter tests
- [ ] Check mobile responsiveness
- [ ] Verify all routes work

---

## 📞 Quick Links

- **Technical Guide:** ANALYTICS_ACHIEVEMENTS_GUIDE.md
- **User Guide:** ANALYTICS_USER_GUIDE.md
- **Implementation Summary:** ANALYTICS_MODULE_README.md
- **Main Dashboard:** `/analytics`
- **Routes Config:** `src/App.jsx`
- **Data Source:** `src/data/analyticsData.js`
- **Logic Layer:** `src/utils/analyticsLogic.js`

---

## 🎯 Performance Notes

**Optimizations Used:**
- `useMemo` for expensive computations
- Efficient array filtering
- Memoized derived state
- Proper re-render prevention

**Recommendations:**
- Use virtual scrolling for 100+ items
- Implement pagination for large datasets
- Cache results on first load
- Lazy load images in cards

---

## ✅ Testing Essentials

### Unit Test Example
```javascript
import { getAllRankings, getTopRankings } from '../utils/analyticsLogic';

describe('Rankings', () => {
  test('getAllRankings returns array', () => {
    const rankings = getAllRankings();
    expect(Array.isArray(rankings)).toBe(true);
  });

  test('getTopRankings limits results', () => {
    const top5 = getTopRankings(5);
    expect(top5.length).toBeLessThanOrEqual(5);
  });
});
```

### Integration Test Example
```javascript
describe('RankingCard Component', () => {
  test('renders ranking card', () => {
    const ranking = getAllRankings()[0];
    render(<RankingCard ranking={ranking} />);
    expect(screen.getByText(ranking.organization)).toBeInTheDocument();
  });

  test('shows featured styling when featured prop is true', () => {
    const ranking = getAllRankings()[0];
    render(<RankingCard ranking={ranking} featured={true} />);
    expect(screen.getByRole('card')).toHaveClass('border-festival-orange');
  });
});
```

---

## 🔐 Security Checklist

- [ ] No hardcoded sensitive data
- [ ] External links use `rel="noopener noreferrer"`
- [ ] PDF URLs verified and validated
- [ ] Search input sanitized
- [ ] No SQL injection vectors
- [ ] No XSS vulnerabilities
- [ ] Content Security Policy headers set

---

## 🚀 Deployment Steps

1. **Test locally**
   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Verify routes**
   - Test all 5 analytics routes
   - Check navbar button
   - Verify home page section

4. **Check performance**
   - Lighthouse score check
   - Load time verification
   - Mobile responsiveness test

5. **Go live**
   - Deploy to production
   - Monitor error logs
   - Track user engagement

---

**Last Updated:** January 2024
**Version:** 1.0
**Quick Reference Stability:** ✅ Stable

