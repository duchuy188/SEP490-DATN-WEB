import React from 'react';
import { 
  MapPin, 
  Users, 
  UserCheck, 
  AlertTriangle, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

export const KPICards: React.FC = () => {
  const kpiData = [
    {
      title: 'Active Sites',
      value: '47',
      change: '+3',
      changeType: 'positive' as const,
      icon: MapPin,
      color: 'blue',
      description: 'Pilgrimage locations'
    },
    {
      title: 'Registered Pilgrims',
      value: '2,847',
      change: '+127',
      changeType: 'positive' as const,
      icon: Users,
      color: 'green',
      description: 'Total active users'
    },
    {
      title: 'Active Guides',
      value: '84',
      change: '+5',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'purple',
      description: 'Certified guides'
    },
    {
      title: 'SOS Alerts',
      value: '3',
      change: '-2',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'red',
      description: 'Pending emergencies',
      pulse: true
    },
    {
      title: 'Check-ins Today',
      value: '156',
      change: '+24',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'amber',
      description: 'Site visits'
    },
    {
      title: 'Avg. Response Time',
      value: '4.2m',
      change: '-0.8m',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'indigo',
      description: 'Emergency response'
    }
  ];

  const getColorClasses = (color: string, pulse: boolean = false) => {
    const colors = {
      blue: 'from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200',
      green: 'from-green-500/10 to-green-600/10 text-green-700 border-green-200',
      purple: 'from-purple-500/10 to-violet-600/10 text-purple-700 border-purple-200',
      red: `from-red-500/10 to-red-600/10 text-red-700 border-red-200 ${pulse ? 'animate-pulse' : ''}`,
      amber: 'from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-200',
      indigo: 'from-indigo-500/10 to-indigo-600/10 text-indigo-700 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.title}
            className={`
              bg-gradient-to-br ${getColorClasses(kpi.color, kpi.pulse)}
              rounded-2xl p-6 border backdrop-blur-sm
              hover:shadow-lg transition-all duration-300
              ${kpi.pulse ? 'ring-2 ring-red-200 ring-opacity-50' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`
                p-3 rounded-xl bg-white/50 backdrop-blur-sm
                ${kpi.color === 'red' ? 'bg-red-50/80' : ''}
              `}>
                <Icon className={`w-6 h-6 ${
                  kpi.color === 'red' ? 'text-red-600' : 'text-current'
                }`} />
              </div>
              
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${kpi.changeType === 'positive' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
                }
              `}>
                {kpi.change}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {kpi.value}
              </h3>
              <p className="text-slate-600 font-medium mb-1">
                {kpi.title}
              </p>
              <p className="text-sm text-slate-500">
                {kpi.description}
              </p>
            </div>

            {kpi.pulse && (
              <div className="mt-4 pt-4 border-t border-red-200">
                <div className="flex items-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Requires Attention</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};