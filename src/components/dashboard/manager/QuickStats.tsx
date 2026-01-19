import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Star, 
  Clock 
} from 'lucide-react';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      id: 1,
      label: 'Today Visitors',
      value: '127',
      change: '+8',
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      label: 'This Week',
      value: '892',
      change: '+15%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 3,
      label: 'Avg. Rating',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'amber'
    },
    {
      id: 4,
      label: 'Response Time',
      value: '2.1m',
      change: '-0.5m',
      icon: Clock,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      amber: 'text-amber-600 bg-amber-50',
      purple: 'text-purple-600 bg-purple-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Quick Stats
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="text-center">
              <div className={`
                inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3
                ${getColorClasses(stat.color)}
              `}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="text-xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              
              <div className="text-xs text-slate-600 mb-1">
                {stat.label}
              </div>
              
              <div className="text-xs text-green-600 font-medium">
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};