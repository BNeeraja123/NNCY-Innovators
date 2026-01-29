# Analytics Module - Developer Quick Start

## 🚀 Getting Started in 5 Minutes

### 1. **Access the Dashboard**
Navigate to `/analytics` in your browser to see the live module.

### 2. **Explore the Code**

#### Main Files to Know
```
src/
├── data/analyticsData.js          # All data (rankings, awards, etc.)
├── utils/analyticsLogic.js        # 30+ helper functions
├── components/AnalyticsCard.jsx   # 6 reusable card components
└── pages/
    ├── AnalyticsDashboard.jsx     # Main hub with 6 tabs
    ├── RankingsPage.jsx           # Rankings showcase
    ├── AwardsPage.jsx             # Awards display
    ├── AchievementsPage.jsx       # Achievements gallery
    └── ReportsPage.jsx            # Reports archive
```

#### Routes
```javascript
// In App.jsx
<Route path="/analytics" element={<AnalyticsDashboard />} />
<Route path="/analytics/rankings" element={<RankingsPage />} />
<Route path="/analytics/awards" element={<AwardsPage />} />
<Route path="/analytics/achievements" element={<AchievementsPage />} />
<Route path="/analytics/reports" element={<ReportsPage />} />
```

### 3. **Import & Use Components**

#### Import a Card Component
```javascript
import { RankingCard } from '../components/AnalyticsCard';

// Use in your component
<RankingCard ranking={rankingObject} featured={true} />
```

#### Use a Utility Function
```javascript
import { getAllRankings, searchRankings } from '../utils/analyticsLogic';

// Get all rankings
const rankings = getAllRankings();

// Search rankings
const results = searchRankings("NIRF");
```

### 4. **Modify Data**

#### Add New Ranking
```javascript
// In src/data/analyticsData.js
rankingsData.push({
  id: "new-ranking",
  organization: "New Org",
  category: "Overall",
  rank: 25,
  year: 2024,
  type: "national",
  link: "https://example.com",
  improvedFrom: 30,
  badge: "📍"
});
```

#### Add New Achievement
```javascript
// In src/data/analyticsData.js
achievementsData.push({
  id: "new-achievement",
  title: "Achievement Title",
  description: "Description",
  year: 2024,
  details: "Details",
  category: "Category",
  impact: "Major",
  icon: "📊"
});
```

### 5. **Test Your Changes**
```bash
# Run dev server
npm run dev

# Navigate to http://localhost:5173/analytics
# Test your changes
```

---

## 📚 Documentation Map

| Document | Purpose | Audience |
|----------|---------|----------|
| **ANALYTICS_QUICK_REFERENCE.md** | Quick lookups, API reference | Developers |
| **ANALYTICS_ACHIEVEMENTS_GUIDE.md** | Comprehensive technical guide | Developers, Architects |
| **ANALYTICS_USER_GUIDE.md** | Feature navigation, usage | End Users, Support |
| **ANALYTICS_MODULE_README.md** | Project overview, metrics | Project Managers |
| **ANALYTICS_COMPLETION_REPORT.md** | Final delivery summary | Stakeholders |

---

## 🎯 Common Tasks

### Display All Rankings
```javascript
import { RankingCard } from '../components/AnalyticsCard';
import { getAllRankings } from '../utils/analyticsLogic';

function AllRankings() {
  const rankings = getAllRankings();
  
  return (
    <div className="grid grid-cols-3 gap-6">
      {rankings.map(ranking => (
        <RankingCard key={ranking.id} ranking={ranking} />
      ))}
    </div>
  );
}
```

### Search with Filter
```javascript
import { useState, useMemo } from 'react';
import { searchRankings } from '../utils/analyticsLogic';
import { RankingCard } from '../components/AnalyticsCard';

function SearchRankings() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    return query ? searchRankings(query) : [];
  }, [query]);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search rankings..."
      />
      <div className="grid grid-cols-3 gap-6">
        {results.map(ranking => (
          <RankingCard key={ranking.id} ranking={ranking} />
        ))}
      </div>
    </div>
  );
}
```

### Filter and Sort
```javascript
import { useState, useMemo } from 'react';
import { getAllAwards, getAwardsByYear } from '../utils/analyticsLogic';
import { AwardCard } from '../components/AnalyticsCard';

function FilteredAwards() {
  const [year, setYear] = useState(null);
  const awards = useMemo(() => {
    if (!year) return getAllAwards();
    return getAwardsByYear(year);
  }, [year]);
  
  return (
    <div>
      <select onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : null)}>
        <option value="">All Years</option>
        {[2024, 2023, 2022, 2021].map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <div className="grid grid-cols-3 gap-6">
        {awards.map(award => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🔍 Finding Things

### Where to Find...

**Analytics Data**
→ `src/data/analyticsData.js`

**Search/Filter Functions**
→ `src/utils/analyticsLogic.js`

**Card Components**
→ `src/components/AnalyticsCard.jsx`

**Main Dashboard**
→ `src/pages/AnalyticsDashboard.jsx`

**Rankings Page**
→ `src/pages/RankingsPage.jsx`

**Navigation Integration**
→ `src/components/Navbar.jsx` (button)
→ `src/pages/Home.jsx` (section)

**Routes**
→ `src/App.jsx`

---

## 🐛 Debugging Guide

### Check Data in Console
```javascript
// Open browser console (F12)
// In any page with module loaded:

import { getAllRankings } from './src/utils/analyticsLogic';
console.log(getAllRankings());

import { getAllAwards } from './src/utils/analyticsLogic';
console.log(getAllAwards());
```

### Test Search Function
```javascript
import { searchRankings } from './src/utils/analyticsLogic';
console.log(searchRankings("NIRF"));
```

### Verify Component Props
```javascript
// Check what props a component received:
import { RankingCard } from './src/components/AnalyticsCard';
// Look at component's prop validation
```

### Check CSS Classes
```javascript
// View element in DevTools (F12)
// Look at className for TailwindCSS classes
// Verify colors are applied correctly
```

---

## 📊 Data Structure Quick Look

### Ranking
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

### Award
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

### Achievement
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

---

## 🎨 Color Reference

```javascript
// Use these color classes in TailwindCSS
'bg-festival-orange'     // Orange background
'text-festival-magenta'  // Magenta text
'border-festival-blue'   // Blue border
'hover:text-festival-cyan'  // Cyan on hover

// Full color codes
#ff7f50    // Orange
#ff1493    // Magenta
#1e40af    // Blue
#00bcd4    // Cyan
```

---

## ✅ Pre-Deployment Checklist

- [ ] Tested all 5 pages
- [ ] Verified search works
- [ ] Tested all filters
- [ ] Mobile responsive check
- [ ] External links verified
- [ ] No console errors
- [ ] Navigation working
- [ ] Home page section visible
- [ ] Navbar button visible
- [ ] PDF downloads functional

---

## 📞 Help & Resources

### Quick Help
1. **Can't find a function?**
   → Check `analyticsLogic.js`

2. **Component not rendering?**
   → Check props in `AnalyticsCard.jsx`

3. **Data not showing?**
   → Check `analyticsData.js`

4. **Route not working?**
   → Check `App.jsx`

5. **Styling issues?**
   → Check TailwindCSS classes, verify color names

### Read These First
1. **ANALYTICS_QUICK_REFERENCE.md** - Quick lookups
2. **ANALYTICS_ACHIEVEMENTS_GUIDE.md** - Deep dive

### Check Existing Code
- Look at `RankingsPage.jsx` for filtering example
- Look at `AchievementsPage.jsx` for multi-filter example
- Look at `ReportsPage.jsx` for view toggle example

---

## 🚀 Running Locally

```bash
# 1. Navigate to frontend directory
cd campus/frontend

# 2. Install dependencies (if needed)
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
# Visit http://localhost:5173/analytics

# 5. Make changes and see live updates
```

---

## 📝 Making Your First Change

### Example: Add a New Ranking

**Step 1:** Open `src/data/analyticsData.js`

**Step 2:** Find `rankingsData` array

**Step 3:** Add new entry:
```javascript
rankingsData.push({
  id: "ranking-new-2024",
  organization: "New Ranking Body",
  category: "New Category",
  rank: 50,
  year: 2024,
  type: "national",
  link: "https://example.com",
  improvedFrom: 55,
  badge: "📍"
});
```

**Step 4:** Update stats:
```javascript
institutionalStatsData.totalRankings += 1;
```

**Step 5:** Save and refresh browser at `/analytics`

**Step 6:** Your new ranking appears!

---

## 💡 Tips for Developers

1. **Use `useMemo` for expensive computations**
   ```javascript
   const data = useMemo(() => getAllRankings(), []);
   ```

2. **Filter in useMemo to avoid re-renders**
   ```javascript
   const filtered = useMemo(() => {
     return data.filter(item => item.year === year);
   }, [year]);
   ```

3. **Always import components from `AnalyticsCard`**
   ```javascript
   import { RankingCard } from '../components/AnalyticsCard';
   ```

4. **Always import functions from `analyticsLogic`**
   ```javascript
   import { getAllRankings } from '../utils/analyticsLogic';
   ```

5. **Use classNames for conditional styles**
   ```javascript
   className={`p-6 ${featured ? 'border-festival-orange' : 'border-gray-200'}`}
   ```

---

## 🎓 Learning Path

If you're new to this module, follow this order:

1. **Day 1:**
   - Read `ANALYTICS_QUICK_REFERENCE.md`
   - Explore files in VS Code
   - View analytics dashboard in browser

2. **Day 2:**
   - Read `ANALYTICS_ACHIEVEMENTS_GUIDE.md` sections 1-3
   - Understand data structure
   - Try adding a small piece of data

3. **Day 3:**
   - Read `ANALYTICS_ACHIEVEMENTS_GUIDE.md` sections 4-6
   - Understand utility functions
   - Understand component architecture

4. **Day 4+:**
   - Make modifications
   - Add new features
   - Test thoroughly

---

## 📞 Quick Support

**Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Page not loading | Check route in App.jsx |
| Data not showing | Check data import path |
| Styling broken | Verify TailwindCSS classes |
| Search not working | Check searchRankings() function |
| Filter failing | Check filter logic in useMemo |
| Mobile broken | Check responsive grid classes |

---

## ✨ Next Steps

After understanding the basics:

1. **Customize the colors** - Edit color scheme
2. **Add more data** - Expand data arrays
3. **Modify cards** - Customize card components
4. **Create new filters** - Add advanced filtering
5. **Integrate API** - Replace static data with API calls

---

**Good luck! Happy coding! 🚀**

*Need more help? Refer to the full documentation files.*

Last Updated: January 2024

