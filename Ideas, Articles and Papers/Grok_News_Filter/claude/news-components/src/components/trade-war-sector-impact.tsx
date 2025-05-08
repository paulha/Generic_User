import React, { useState } from 'react';
import { Car, ShoppingBag, Smartphone, Apple, Package, ChevronDown, ChevronRight, AlertTriangle, TrendingDown, TrendingUp, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Define interfaces for component props
interface Sector {
  id: string;
  name: string;
  icon: any; // Or a more specific type for the icon
  impact: {
    [key: string]: number; // For timeframes like 'current', '3mon', etc.
  };
  exposure: number;
  details: string[];
  color: string;
}

interface SectorCardProps {
  sector: Sector;
  timeframe: string;
}
const TradeSectorDashboard = () => {
  const [openSectors, setOpenSectors] = useState<{[key: string]: boolean}>({});
  const [timeframe, setTimeframe] = useState('current');
  
  const toggleSector = (id : string ) => {
    setOpenSectors((prev: Record<string, boolean>) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sectorData = [
    {
      id: 'retail',
      name: 'Retail',
      icon: ShoppingBag,
      color: 'red',
      impact: {
        current: -2.5,
        '3mon': -4.8,
        '6mon': -6.2,
        '12mon': -8.5
      },
      exposure: 75,
      details: [
        'Consumer-facing retailers seeing immediate margin pressure',
        'Big box stores reporting 3-5% cost increases',
        'Walmart warning on 15-20% of product portfolio affected',
        'Shift to alternative suppliers taking 3-6 months'
      ]
    },
    {
      id: 'auto',
      name: 'Automotive',
      icon: Car,
      color: 'orange',
      impact: {
        current: -3.2,
        '3mon': -5.7,
        '6mon': -8.3,
        '12mon': -12.0
      },
      exposure: 85,
      details: [
        'Supply chain highly integrated with affected countries',
        'Parts tariffs affecting 40% of component costs',
        'Longer-term threat to EV battery production',
        'Regional plant employment at risk in Midwest'
      ]
    },
    {
      id: 'tech',
      name: 'Electronics',
      icon: Smartphone,
      color: 'purple',
      impact: {
        current: -4.0,
        '3mon': -7.2,
        '6mon': -9.8,
        '12mon': -11.5
      },
      exposure: 90,
      details: [
        'Smartphone pricing pressure immediate',
        'Consumer electronics 25-30% tariff hit',
        'Apple flagged $4B quarterly impact',
        'Relocation costs estimated at $50B+ industry-wide'
      ]
    },
    {
      id: 'agri',
      name: 'Agriculture',
      icon: Apple,
      color: 'green',
      impact: {
        current: 1.5,
        '3mon': 3.2,
        '6mon': 5.0,
        '12mon': 8.0
      },
      exposure: 35,
      details: [
        'Reduced import competition benefiting domestic farmers',
        'Commodity prices rising 5-10% on supply constraints',
        'Midwest farming communities seeing unexpected gains',
        'Potential longer-term export market disruption concerns'
      ]
    }
  ];

  const timeframeTitles = {
    'current': 'Current Impact (May 2025)',
    '3mon': '3-Month Projection (Aug 2025)',
    '6mon': '6-Month Projection (Nov 2025)',
    '12mon': '12-Month Projection (May 2026)'
  };

  const getImpactColor = (value : number ) => {
    if (value > 2) return 'text-green-600';
    if (value > 0) return 'text-green-500';
    if (value > -2) return 'text-yellow-600';
    if (value > -5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getIcon = (value : number ) => {
    if (value > 0) return TrendingUp;
    if (value < -5) return AlertTriangle;
    return TrendingDown;
  };

  const SectorCard = ({ sector, timeframe } : SectorCardProps) => {
    const Icon = sector.icon;
    const ImpactIcon = getIcon(sector.impact[timeframe]);
    const isOpen = openSectors[sector.id];
    
    return (
      <div className="mb-4">
        <button 
          onClick={() => toggleSector(sector.id)}
          className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-start gap-4">
            <Icon className={`w-8 h-8 mt-1 text-${sector.color}-600`} />
            <div className="flex-1 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{sector.name}</h3>
                  <p className={`font-semibold text-xl ${getImpactColor(sector.impact[timeframe])}`}>
                    {sector.impact[timeframe] > 0 ? '+' : ''}{sector.impact[timeframe]}%
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <ImpactIcon className={`w-6 h-6 ${getImpactColor(sector.impact[timeframe])}`} />
                  {isOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`bg-${sector.color}-600 h-2 rounded-full`} 
                  style={{ width: `${sector.exposure}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">Tariff Exposure: {sector.exposure}%</span>
            </div>
          </div>
        </button>
        
        {isOpen && (
          <div className="mt-2 ml-12 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-900 mb-2">Key Impacts</h5>
            <ul className="list-disc pl-5 space-y-1">
              {sector.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-700">{detail}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const aggregateData = sectorData.map(sector => ({
    sector: sector.name,
    current: sector.impact.current,
    projected: sector.impact['12mon']
  }));

  const radarData = sectorData.map(sector => ({
    subject: sector.name,
    value: Math.abs(sector.impact['12mon']),
    fullMark: 15
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trade War Sector Impact Dashboard</h1>
        <p className="text-lg text-gray-700">
          Track economic impacts across key sectors of the economy
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Timeframe
        </label>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="current">Current Impact (May 2025)</option>
          <option value="3mon">3-Month Projection (Aug 2025)</option>
          <option value="6mon">6-Month Projection (Nov 2025)</option>
          <option value="12mon">12-Month Projection (May 2026)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sector Impact Comparison</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" />
                <YAxis label={{ value: 'Impact (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#3b82f6" name="Current Impact" />
                <Bar dataKey="projected" fill="#1e40af" name="12-Month Projection" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sector Impact Magnitude (12-Month)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={45} domain={[0, 15]} />
                <Radar name="Impact" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {sectorData.map(sector => (
          <SectorCard key={sector.id} sector={sector} timeframe={timeframe} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-2">Winners</h3>
          <p className="text-sm text-green-800">Agriculture benefiting from reduced import competition</p>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-2">Mixed Impact</h3>
          <p className="text-sm text-yellow-800">Manufacturing showing complex regional variations</p>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold text-red-900 mb-2">Significant Challenges</h3>
          <p className="text-sm text-red-800">Electronics and auto sectors face sustained pressure</p>
        </div>
      </div>
    </div>
  );
};

export default TradeSectorDashboard;