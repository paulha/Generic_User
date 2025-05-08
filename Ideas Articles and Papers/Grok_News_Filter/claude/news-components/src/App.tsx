import React, { useState } from 'react';
import InteractiveNewsDigest from './components/interactive-news-digest';
import TradeWarTimeline from './components/trade-war-timeline';
import TradeSectorDashboard from './components/trade-war-sector-impact';

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