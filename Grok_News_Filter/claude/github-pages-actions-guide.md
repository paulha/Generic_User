# GitHub Pages + Actions Quick Start Guide

## What's New in GitHub Since You Last Used It

- **GitHub Actions**: CI/CD pipelines that run automated tasks
- **GitHub Pages**: Free static site hosting directly from repos
- **Serverless Functions**: Run code without managing servers
- **Automated builds**: Automatically build and deploy on commit

## Setting Up GitHub Pages

1. **Create/Open Your Repository**
   - Go to your repo on GitHub.com
   - Click "Settings" tab
   
2. **Enable GitHub Pages**
   - Scroll to "Pages" section in Settings
   - Source: Deploy from a branch
   - Branch: main (or your desired branch)
   - Folder: / (root) or /docs
   - Click "Save"

3. **Your Site Is Live**
   - URL: https://[your-username].github.io/[repo-name]
   - Can take 5-10 minutes to deploy initially

## Setting Up GitHub Actions

1. **Create Workflow File**
   ```
   your-repo/
   └── .github/
       └── workflows/
           └── daily-analysis.yml
   ```

2. **Example Daily Analysis Workflow**
   ```yaml
   name: Daily News Analysis
   
   on:
     schedule:
       - cron: '0 6 * * *'  # Run at 6 AM daily
     workflow_dispatch:      # Allow manual triggering
   
   jobs:
     analyze-news:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         
         - name: Install dependencies
           run: npm install
         
         - name: Run analysis script
           run: npm run analyze
           env:
             API_KEY: ${{ secrets.API_KEY }}
         
         - name: Commit results
           run: |
             git config --local user.email "action@github.com"
             git config --local user.name "GitHub Action"
             git add -A
             git commit -m "Daily analysis update"
             git push
   ```

3. **Adding Secrets**
   - Go to repo Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add API keys, tokens, etc.

## Project Structure for Static Analysis

```
your-repo/
├── src/                      # React app source
├── public/                   # Static files
├── data/                     # Analysis JSON files
│   ├── latest.json
│   └── archive/
│       ├── 2025-05-05.json
│       ├── 2025-05-04.json
│       └── ...
├── scripts/                  # Analysis scripts
│   └── analyze-news.js
└── .github/workflows/        # GitHub Actions
    └── daily-analysis.yml
```

## React App Data Loading

```javascript
// In your React app
const [newsData, setNewsData] = useState(null);

useEffect(() => {
  fetch('./data/latest.json')
    .then(res => res.json())
    .then(data => setNewsData(data));
}, []);
```

## Useful GitHub Commands

```bash
# Clone your repo
git clone https://github.com/your-username/repo-name.git

# Stage all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Desktop App](https://desktop.github.com/) - GUI alternative to command line
- [VS Code GitHub Extension](https://code.visualstudio.com/docs/editor/github) - GitHub integration in your editor

## Quick Setup Steps

1. Push your React app to a GitHub repo
2. Enable GitHub Pages in repo Settings
3. Create a workflow file for daily analysis
4. Test with a manual trigger first
5. Let it run automatically

That's it! You're now using modern GitHub for automated news analysis and hosting.