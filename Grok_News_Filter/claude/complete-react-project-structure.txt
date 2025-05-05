Project Directory Structure:
-----------------------------
news-components/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── InteractiveNewsDigest.tsx  # Your first component
│   │   ├── TradeWarTimeline.tsx        # Your second component
│   │   └── TradeSectorDashboard.tsx    # Your third component
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

File Contents:
--------------

1. public/index.html:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Interactive News Analysis" />
    <title>Interactive News Analysis</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

2. package.json:
```json
{
  "name": "news-components",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.7.2",
    "typescript": "^5.0.2",
    "web-vitals": "^3.4.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3"
  }
}
```

3. tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

4. tailwind.config.js:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'text-red-600',
    'text-orange-600',
    'text-yellow-600',
    'text-green-600',
    'text-blue-600',
    'text-purple-600',
    'bg-red-600',
    'bg-orange-600',
    'bg-yellow-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-purple-600',
    'bg-green-100',
    'bg-yellow-100',
    'bg-orange-100',
    'bg-red-100',
    'text-green-800',
    'text-yellow-800',
    'text-orange-800',
    'text-red-800',
    'bg-green-50',
    'bg-yellow-50',
    'bg-orange-50',
    'bg-red-50',
    'border-green-200',
    'border-yellow-200',
    'border-orange-200',
    'border-red-200',
    'text-green-900',
    'text-yellow-900',
    'text-orange-900',
    'text-red-900'
  ]
}
```

5. postcss.config.js:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

6. src/index.tsx:
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

7. src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

8. src/App.tsx (with navigation):
```typescript
import React, { useState } from 'react';
import InteractiveNewsDigest from './components/InteractiveNewsDigest';
import TradeWarTimeline from './components/TradeWarTimeline';
import TradeSectorDashboard from './components/TradeSectorDashboard';

function App() {
  const [currentView, setCurrentView] = useState<string>('news');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <button 
            onClick={() => setCurrentView('news')}
            className={`px-4 py-2 rounded ${currentView === 'news' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            News Digest
          </button>
          <button 
            onClick={() => setCurrentView('timeline')}
            className={`px-4 py-2 rounded ${currentView === 'timeline' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Trade War Timeline
          </button>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded ${currentView === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Sector Dashboard
          </button>
        </div>
      </nav>
      
      <main className="container mx-auto py-8">
        {currentView === 'news' && <InteractiveNewsDigest />}
        {currentView === 'timeline' && <TradeWarTimeline />}
        {currentView === 'dashboard' && <TradeSectorDashboard />}
      </main>
    </div>
  );
}

export default App;
```

9. README.md:
```markdown
# Interactive News Analysis Components

This project contains interactive React components for news analysis, featuring:

- Interactive News Digest with expandable sections
- Trade War Timeline with interactive projections
- Trade War Sector Impact Dashboard

## Getting Started

1. Clone or download this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

- `/src/components/`: Contains the three main interactive components
- `/src/App.tsx`: Main application with navigation between components
- `/public/`: Static files including index.html

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## Dependencies

- React 18
- TypeScript
- Tailwind CSS
- Recharts (for data visualization)
- Lucide React (for icons)
```

Setup Instructions:
------------------
1. Create the directory structure shown above
2. Create each file with the content provided
3. Copy your TSX files into the src/components/ folder
4. Run `npm install` to install dependencies
5. Run `npm start` to start the development server
