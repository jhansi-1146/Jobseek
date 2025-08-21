import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatItem {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  color?: string;
}

interface StatsProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

const Stats: React.FC<StatsProps> = ({ stats, columns = 4 }) => {
  const getChangeIcon = (changeType?: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = (changeType?: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 mb-8`}>
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.change !== undefined && (
                <div className="flex items-center mt-2">
                  {getChangeIcon(stat.changeType)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(stat.changeType)}`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              )}
            </div>
            {stat.icon && (
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                stat.color || 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}>
                {stat.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats; 