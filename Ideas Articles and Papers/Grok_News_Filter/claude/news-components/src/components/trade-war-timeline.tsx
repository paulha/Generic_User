import React, { useState } from 'react';
import { Clock, AlertTriangle, TrendingDown, TrendingUp, Shield, ChevronDown, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimelineData {
  id: string;
  time: string;
  title: string;
  icon: any; // Or a more specific icon type
  evidence: string;
  timeline: string;
  readability: number;
  confidence: string; // For 'Very High', 'High', etc.
  details: string[];
}

interface TimelineCardProps {
  data: TimelineData;
}

const TradeWarTimeline = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  
  const toggleSection = (id : string ) => {
    setOpenSections((prev: Record<string, boolean>) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const timelineData = [
    {
      id: 'immediate',
      time: '0-3 months',
      title: 'Immediate Impacts',
      icon: AlertTriangle,
      evidence: 'Retailers reporting cost increases, margin pressures',
      timeline: 'May-July 2025',
      readability: 60,
      confidence: 'Medium-High',
      details: [
        'Retailers breaking out tariff costs separately on receipts',
        'Major retailers (Walmart, Target) announcing price adjustments',
        'Consumer confidence surveys showing awareness of tariff impacts',
        'Initial inventory drawdowns as businesses buy ahead of price increases'
      ]
    },
    {
      id: 'early',
      time: '3-6 months',
      title: 'Supply Chain Disruption',
      icon: TrendingDown,
      evidence: 'Supply chain shifts, contract renegotiations',
      timeline: 'July-October 2025',
      readability: 75,
      confidence: 'High',
      details: [
        'Companies report Q3 earnings with clear tariff impact statements',
        'Supply chain realignment announcements from major manufacturers',
        'Trade-exposed sectors (autos, electronics) show measurable impacts',
        'Small business surveys reveal operational cost pressures'
      ]
    },
    {
      id: 'medium',
      time: '6-9 months',
      title: 'Economic Ripple Effects',
      icon: Shield,
      evidence: 'Job market shifts, regional impacts clearly visible',
      timeline: 'October 2025 - January 2026',
      readability: 85,
      confidence: 'Very High',
      details: [
        'BLS reports show job creation/loss patterns in trade-exposed industries',
        'Regional economic impacts become clear (port cities, manufacturing hubs)',
        'Fed analysis incorporates tariff effects in monetary policy decisions',
        'Trade balance reports show shifting patterns with targeted countries'
      ]
    },
    {
      id: 'full',
      time: '9-12 months',
      title: 'Full Trade Realignment',
      icon: TrendingUp,
      evidence: 'Global trade pattern changes, policy responses',
      timeline: 'January-April 2026',
      readability: 95,
      confidence: 'High',
      details: [
        'International trade statistics reveal major flow shifts',
        'Other countries\' reciprocal measures show full impact',
        'Multi-industry effects crystallize in economic data',
        'Financial markets fully price in tariff regime'
      ]
    }
  ];

  const TimelineCard = ({ data } : TimelineCardProps ) => {
    const Icon = data.icon;
    const isOpen = openSections[data.id];
    
    const confidenceColor = data.confidence === 'Very High' ? 'green' : 
                           data.confidence === 'High' ? 'blue' : 'yellow';
    
    return (
      <div className="mb-4">
        <button 
          onClick={() => toggleSection(data.id)}
          className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-start gap-4">
            <Icon className="w-6 h-6 mt-1 text-blue-600 flex-shrink-0" />
            <div className="flex-1 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{data.time}</h3>
                  <h4 className="font-semibold text-blue-800">{data.title}</h4>
                </div>
                {isOpen ? <ChevronDown className="w-5 h-5 mt-1 text-gray-400" /> : <ChevronRight className="w-5 h-5 mt-1 text-gray-400" />}
              </div>
              <p className="text-sm text-gray-600 mt-2">{data.evidence}</p>
              <div className="flex gap-4 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {data.timeline}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${confidenceColor}-100 text-${confidenceColor}-800`}>
                  {data.confidence} Confidence
                </span>
              </div>
            </div>
          </div>
        </button>
        
        {isOpen && (
          <div className="mt-2 ml-10 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-900 mb-2">Expected Evidence</h5>
            <ul className="list-disc pl-5 space-y-1">
              {data.details.map((detail: string, idx: number) => (
                <li key={idx} className="text-sm text-gray-700">{detail}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Confidence level trend data
  const confidenceData = [
    { month: 0, confidence: 60 },
    { month: 3, confidence: 75 },
    { month: 6, confidence: 85 },
    { month: 9, confidence: 95 },
    { month: 12, confidence: 95 }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trade War Trade-offs: When Will We Know?</h1>
        <p className="text-lg text-gray-700">
          The economic jury isn't waiting for one verdict - they're collecting evidence across multiple timelines.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confidence in Economic Impact Assessment Over Time</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Months', position: 'bottom' }}
                tickFormatter={(tick) => tick === 0 ? 'Now' : `${tick}mo`}
              />
              <YAxis 
                label={{ value: 'Confidence Level (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Confidence Level']}
                labelFormatter={(label) => label === 0 ? 'Now' : `${label} months`}
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-0">
        {timelineData.map(item => (
          <TimelineCard key={item.id} data={item} />
        ))}
      </div>

      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-lg font-bold text-yellow-900 mb-3">🎯 The Bottom Line</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-yellow-800">
          <li><strong>For consumer costs:</strong> 0-3 months is when you'll see the immediate price impacts</li>
          <li><strong>For business decisions:</strong> 3-6 months when supply chain adaptations become visible</li>
          <li><strong>For policy assessment:</strong> 6-9 months when job market and regional impacts crystallize</li>
          <li><strong>For complete picture:</strong> 9-12 months when global trade pattern shifts are measurable</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800 font-semibold">
          ⚠️ Key Insight: Different stakeholders will "see" impacts at different times - consumers first, policymakers last.
        </p>
      </div>
    </div>
  );
};

export default TradeWarTimeline;