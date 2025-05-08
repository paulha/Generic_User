import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Globe, DollarSign, Vote } from 'lucide-react';

const NewsDigest = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  
  const toggleSection = (id : string ) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const newsStories = [
    {
      id: 'vatican',
      title: "What's next for the Vatican?",
      icon: Globe,
      summary: "Following Pope Francis's death at 88 on April 21, the largest papal conclave in Catholic Church history begins May 7, with 135 cardinal electors set to choose the 267th Pope - more than the traditional limit of 120. As Trump jokes about becoming Pope, the Vatican has already prepared for the election, installing the iconic chimney on the Sistine Chapel as traditional preparations continue.",
      analysis: {
        truth: [
          "Pope Francis died April 21, conclave begins May 7 with historic 135 electors",
          "Vatican officially announced conclave date, with preparations ongoing including chimney installation",
          "Trump joked about succeeding Pope Francis during comments"
        ],
        gaps: [
          "No clear frontrunner has emerged",
          "The influence of geopolitics on the selection process remains unclear",
          "Coverage lacks details on how pope's death during Trump's second term might affect US-Vatican relations"
        ],
        propaganda: [
          "Vatican coverage shows genuine uncertainty about papal direction, unlike typical election speculation"
        ]
      }
    },
    {
      id: 'australia',
      title: "Will Albanese's anti-Trump stance help Australia?",
      icon: Vote,
      summary: "Australian Prime Minister Anthony Albanese secured re-election on May 3, becoming the first Australian leader in 21 years to win consecutive terms. His campaign deliberately distanced itself from Trump's administration rhetoric, suggesting his government \"boosted its majority by not modeling itself on the Trump administration,\" following a Trump-influenced Canadian election last week.",
      analysis: {
        truth: [
          "Albanese won re-election May 3, first consecutive win since 2004",
          "Albanese positioned himself against Trump's policies, with campaign occurring while Vatican papal transition was underway"
        ],
        falsehoods: [
          "Reuters headline claiming Albanese \"rode anti-Trump wave\" embellishes the margin - while he won, the language assumes singular causation from Trump opposition"
        ],
        gaps: [
          "No polling data comparing different factors in Albanese's victory",
          "Missing analysis of how much Trump's policies influenced Australian voters"
        ]
      }
    },
    {
      id: 'buffett',
      title: "Is the Oracle of Omaha finally setting sun?",
      icon: DollarSign,
      summary: "At Berkshire Hathaway's 60th annual meeting on May 3, Warren Buffett, 94, surprised shareholders by announcing he'll step down as CEO at year's end, recommending Vice Chairman Greg Abel as his successor. Buffett pledged to retain all his shares and remain available for advice, while praising Apple CEO Tim Cook's contribution to Berkshire's success.",
      analysis: {
        truth: [
          "Buffett announced retirement at May 3 annual meeting, having led company 60 years",
          "Greg Abel confirmed as successor, board meeting scheduled for May 4",
          "Berkshire's cash reserves reached $347 billion by March 2025, with market cap over $1 trillion"
        ],
        gaps: [
          "Coverage lacks analysis of whether Buffett's close friendship with Gates influenced timing",
          "No detailed reporting on Abel's strategic differences from Buffett"
        ],
        negativeEvidence: [
          "Despite previous succession planning, most board members appeared surprised by announcement timing"
        ]
      }
    },
    {
      id: 'trade',
      title: "Could trade wars reshape global alliances?",
      icon: AlertTriangle,
      summary: "At Berkshire Hathaway's meeting, Buffett criticized Trump's tariffs as \"a big mistake,\" stating \"trade should not be a weapon.\" This joins growing business concerns about economic impacts, as retailer reports show tariffs weighing on consumer confidence. Meanwhile, reports indicate Zelenskyy discussed sanctions with Trump, suggesting trade policies becoming central to geopolitical relationships.",
      analysis: {
        truth: [
          "Buffett criticized tariffs at shareholders meeting",
          "Retailers report tariff impact on consumer behavior, with some breaking out costs separately"
        ],
        gaps: [
          "Limited reporting on how tariffs specifically affect different sectors",
          "Missing detailed analysis of Zelenskyy-Trump trade discussions"
        ],
        negativeEvidence: [
          "Despite warnings, major economic downturn hasn't materialized yet"
        ]
      }
    }
  ];

  interface Story {
  id: string;
  title: string;
  icon: any; // Or the specific icon type
  summary: string;
  analysis: {
    truth?: string[];
    falsehoods?: string[];
    gaps?: string[];
    negativeEvidence?: string[];
    propaganda?: string[];
  }
}


  const NewsSection = ({ story } : { story : Story} ) => {
    const Icon = story.icon;
    const isOpen = openSections[story.id];
    
    return (
      <div className="border-b border-gray-200 last:border-0">
        <button 
          onClick={() => toggleSection(story.id)}
          className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
        >
          <Icon className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">{story.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{story.summary}</p>
          </div>
          {isOpen ? <ChevronDown className="w-5 h-5 mt-1 text-gray-400" /> : <ChevronRight className="w-5 h-5 mt-1 text-gray-400" />}
        </button>
        
        {isOpen && (
          <div className="px-12 pb-4 bg-gray-50">
            <div className="border-l-2 border-blue-200 pl-4">
              {story.analysis.truth && (
                <div className="mb-4">
                  <h4 className="font-medium text-green-800 mb-2">✓ Truth</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.truth.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.falsehoods && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-800 mb-2">⚠ Falsehoods/Propaganda</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.falsehoods.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.gaps && (
                <div className="mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">? Gaps</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.gaps.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.negativeEvidence && (
                <div className="mb-4">
                  <h4 className="font-medium text-purple-800 mb-2">🔍 Negative Evidence</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {story.analysis.negativeEvidence.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {story.analysis.propaganda && (
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
        <p className="text-gray-700">Click on any story to expand the analysis</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {newsStories.map(story => (
          <NewsSection key={story.id} story={story} />
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-lg font-bold text-red-900 mb-4">Notes on Hoaxes and Propaganda</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-red-800">
          <li><strong>Succession Speculation:</strong> Vatican coverage shows genuine uncertainty about papal direction, contrasting with typical news cycle predictions</li>
          <li><strong>Trump Effect Overstatement:</strong> Multiple stories risk overstating Trump's influence as singular causation (Australian election, trade concerns)</li>
          <li><strong>Economic Anxiety Exploitation:</strong> Reports emphasize business concerns about tariffs while downplaying current economic stability</li>
          <li><strong>Age and Legacy Framing:</strong> Buffett coverage emphasizes age repeatedly, potentially priming readers for succession anxieties</li>
        </ul>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default NewsDigest;