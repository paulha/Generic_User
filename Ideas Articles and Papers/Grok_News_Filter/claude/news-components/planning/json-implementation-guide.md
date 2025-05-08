# Implementation Guide: Loading JSON in React Components

This guide will help you implement JSON data loading in your React news analysis components.

## Step 1: Create Data Directory Structure

First, set up a directory structure for your data files:

```
news-components/
├── public/
│   ├── data/
│   │   ├── news-stories.json       # Current analysis
│   │   └── archive/
│   │       ├── 2025-05-01.json     # Archived analyses
│   │       └── 2025-04-28.json     # Archived analyses
```

Placing files in the `public/data` directory makes them accessible via relative URLs.

## Step 2: Update News Digest Component

Here's how to modify your `interactive-news-digest.tsx` component to load data from JSON:

```typescript
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Globe, DollarSign, Vote, Smartphone, Users, Briefcase, Shield } from 'lucide-react';

// Define interfaces for your data structure
interface NewsStory {
  id: string;
  title: string;
  icon: string; // Icon name as string
  summary: string;
  analysis: {
    truth?: string[];
    falsehoods?: string[];
    gaps?: string[];
    negativeEvidence?: string[];
    propaganda?: string[];
  }
}

interface NewsData {
  stories: NewsStory[];
  meta: {
    analysisDate: string;
    sources: {
      name: string;
      url: string;
    }[];
  }
}

const NewsDigest = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Function to get the appropriate icon component from its name
  const getIconByName = (iconName: string) => {
    const icons: {[key: string]: React.FC} = {
      'Globe': Globe,
      'Vote': Vote,
      'DollarSign': DollarSign,
      'AlertTriangle': AlertTriangle,
      'Smartphone': Smartphone,
      'Users': Users,
      'Briefcase': Briefcase,
      'Shield': Shield
    };
    
    return icons[iconName] || Globe; // Default to Globe if icon not found
  };
  
  useEffect(() => {
    // Fetch the JSON data
    fetch('./data/news-stories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load news data');
        }
        return response.json();
      })
      .then(data => {
        setNewsData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <p className="text-gray-700">Loading news analysis...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // No data state
  if (!newsData || !newsData.stories || newsData.stories.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <p className="text-gray-700">No news stories found.</p>
      </div>
    );
  }

  const NewsSection = ({ story }: { story: NewsStory }) => {
    const IconComponent = getIconByName(story.icon);
    const isOpen = openSections[story.id];
    
    return (
      <div className="border-b border-gray-200 last:border-0">
        <button 
          onClick={() => toggleSection(story.id)}
          className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
        >
          <IconComponent className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">{story.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{story.summary}</p>
          </div>
          {isOpen ? <ChevronDown className="w-5 h-5 mt-1 text-gray-400" /> : <ChevronRight className="w-5 h-5 mt-1 text-gray-400" />}
        </button>
        
        {isOpen && (
          <div className="px-12 pb-4 bg-gray-50">
            <div className="border-l-2 border-blue-200 pl-4">
              {story.analysis.truth && story.analysis.truth.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-green-800 mb-2">✓ Truth</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.truth.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.falsehoods && story.analysis.falsehoods.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-800 mb-2">⚠ Falsehoods/Propaganda</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.falsehoods.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.gaps && story.analysis.gaps.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">? Gaps</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.gaps.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.negativeEvidence && story.analysis.negativeEvidence.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-purple-800 mb-2">🔍 Negative Evidence</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.negativeEvidence.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.propaganda && story.analysis.propaganda.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-orange-800 mb-2">📣 Propaganda Analysis</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.propaganda.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Today's Top Stories - Interactive Digest</h1>
        <p className="text-gray-700">Analysis date: {new Date(newsData.meta.analysisDate).toLocaleDateString()}</p>
        <p className="text-gray-700">Click on any story to expand the analysis</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {newsData.stories.map(story => (
          <NewsSection key={story.id} story={story} />
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-lg font-bold text-red-900 mb-4">Notes on Sources</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-red-800">
          {newsData.meta.sources.map((source, idx) => (
            <li key={idx}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Last updated: {new Date(newsData.meta.analysisDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default NewsDigest;
```

## Step 3: Create a Sample JSON File

Save this as `public/data/news-stories.json`:

```json
{
  "stories": [
    {
      "id": "vatican",
      "title": "What's next for the Vatican?",
      "icon": "Globe",
      "summary": "Following Pope Francis's death at 88 on April 21, the largest papal conclave in Catholic Church history begins May 7, with 135 cardinal electors set to choose the 267th Pope - more than the traditional limit of 120. As Trump jokes about becoming Pope, the Vatican has already prepared for the election, installing the iconic chimney on the Sistine Chapel as traditional preparations continue.",
      "analysis": {
        "truth": [
          "Pope Francis died April 21, conclave begins May 7 with historic 135 electors",
          "Vatican officially announced conclave date, with preparations ongoing including chimney installation",
          "Trump joked about succeeding Pope Francis during comments"
        ],
        "falsehoods": [
          "Claims that cardinals are divided along political lines are overblown"
        ],
        "gaps": [
          "No clear frontrunner has emerged",
          "The influence of geopolitics on the selection process remains unclear",
          "Coverage lacks details on how pope's death during Trump's second term might affect US-Vatican relations"
        ],
        "negativeEvidence": [
          "Despite previous conclaves featuring factional campaigning, no public divides have emerged"
        ],
        "propaganda": [
          "Vatican coverage shows genuine uncertainty about papal direction, unlike typical election speculation"
        ]
      }
    },
    {
      "id": "australia",
      "title": "Will Albanese's anti-Trump stance help Australia?",
      "icon": "Vote",
      "summary": "Australian Prime Minister Anthony Albanese secured re-election on May 3, becoming the first Australian leader in 21 years to win consecutive terms. His campaign deliberately distanced itself from Trump's administration rhetoric, suggesting his government \"boosted its majority by not modeling itself on the Trump administration,\" following a Trump-influenced Canadian election last week.",
      "analysis": {
        "truth": [
          "Albanese won re-election May 3, first consecutive win since 2004",
          "Albanese positioned himself against Trump's policies, with campaign occurring while Vatican papal transition was underway"
        ],
        "falsehoods": [
          "Reuters headline claiming Albanese \"rode anti-Trump wave\" embellishes the margin - while he won, the language assumes singular causation from Trump opposition"
        ],
        "gaps": [
          "No polling data comparing different factors in Albanese's victory",
          "Missing analysis of how much Trump's policies influenced Australian voters"
        ]
      }
    }
  ],
  "meta": {
    "analysisDate": "2025-05-05T14:30:00Z",
    "sources": [
      {
        "name": "Reuters",
        "url": "https://www.reuters.com/world/asia-pacific/albanese-claims-australia-election-victory-riding-anti-trump-wave-2025-05-03/"
      },
      {
        "name": "AP News",
        "url": "https://apnews.com/article/vatican-pope-conclave-electors-17091445fa0670cb1bd741b3af31365e"
      }
    ]
  }
}
```

## Step 4: Testing the Implementation

1. Create the directory structure in your project
2. Save the sample JSON file
3. Update your React component with the new code
4. Run `npm start` to test

You should see your news digest component loading data from the JSON file instead of using hardcoded data. The UI should look the same, but now the data source is external and can be easily updated or changed.

## Additional Features

Once basic JSON loading is working, you can enhance your application:

1. **Date selector**: Allow users to view archived analyses
2. **Search functionality**: Let users search within analyses
3. **Source filtering**: Show stories only from selected sources
4. **Refresh button**: Manually reload the latest analysis

## Troubleshooting

If you encounter issues:

1. **JSON not loading**: Make sure the file path is correct - it should be in the public directory
2. **Type errors**: Ensure your TypeScript interfaces match the JSON structure
3. **Icon mapping errors**: Verify that all icon names in your JSON match available Lucide icons
4. **Data structure mismatch**: Check that your component expects the same structure as the JSON provides

With these steps, your news analysis application will be fully data-driven and ready to receive updates via AI-generated JSON files.
