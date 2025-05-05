# News Analysis Architecture: Static vs Dynamic Approaches

## The Core Question
Should news analysis be dynamically generated per request or pre-generated as static artifacts?

## Three Architecture Approaches Discussed

### 1. Static Archive Model
**How it works:** Generate separate analysis artifacts for each timeframe
- Each analysis becomes a permanent static file
- React apps contain hardcoded data
- Multiple instances of app for different dates

**Pros:**
- Perfect historical record for reputation building
- Can showcase past prescience for marketing
- Zero API costs once generated
- Unique URLs make sharing/citing specific analyses easy

**Cons:**
- Maintenance of many static files
- Need to create separate app for each analysis
- Storage grows linearly with time
- No way to update past analyses if needed

### 2. Dynamic Single App Model
**How it works:** One React app that fetches current analysis data
- Analysis runs on schedule (daily, hourly)
- App loads latest JSON data file
- Same codebase serves all requests

**Pros:**
- Always fresh content
- Perfect for subscription service
- One codebase to maintain
- Natural subscription gating point
- Can show "Last updated 2 hours ago" for transparency

**Cons:**
- Need caching infrastructure
- No historic "proof" of past analyses
- API costs mount with scale
- Can't retreat to old versions

### 3. Hybrid Approach (Recommended)
**How it works:** Combines best of both worlds
- Main app dynamically updates every 4-6 hours
- Selected analyses get "preserved" as static versions
- Archive page shows milestone analyses
- Subscribers see current day, non-subscribers see archive

**Implementation:**
```javascript
// React app structure
{
  currentAnalysis: fetch('./data/latest.json'),
  archiveAnalyses: [
    { date: '2025-05-05', url: './data/archive/2025-05-05.json' },
    { date: '2025-05-04', url: './data/archive/2025-05-04.json' }
  ]
}
```

## Hosting Constraints Consideration

**Key Insight:** Traditional web hosting has significant limitations:
- No server-side file writing
- No database access
- No scheduled tasks/cron jobs
- Limited or no backend processing

**Solution:** GitHub Pages + GitHub Actions
- React app hosted on GitHub Pages (free static hosting)
- GitHub Actions run daily to generate new analysis JSON
- Commit the updated data back to repo
- App automatically pulls latest data file
- All within GitHub's free tier

## Recommended MVP Implementation

1. **Start Simple:**
   - Single React app that loads JSON data files
   - Generate analysis daily, save output as JSON + timestamp
   - Keep last 7 days live, archive notable ones

2. **Data Structure:**
   ```
   data/
   ├── latest.json      # Current analysis
   └── archive/
       ├── 2025-05-05.json
       ├── 2025-05-04.json
       └── ...selected analyses
   ```

3. **Scaling Path:**
   - Test which model resonates with users
   - Gradually transition to subscription model
   - Use GitHub's infrastructure for automation

## Future Considerations

1. **Subscription Monetization:**
   - Current: Free archive access
   - Premium: Real-time updates + full history
   - Enterprise: Custom analysis frequency

2. **Cost Management:**
   - Cache AI responses
   - Bundle multiple news stories per analysis run
   - Use GitHub's free tier limits intelligently

3. **Marketing Assets:**
   - Select "greatest hits" for permanent archive
   - Create showcase page for demo purposes
   - Track which analyses get the most engagement