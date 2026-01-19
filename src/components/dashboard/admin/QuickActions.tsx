import React from 'react';
import { 
  Plus, 
  UserPlus, 
  MapPin, 
  Settings, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 'add-site',
      title: 'Add New Site',
      description: 'Register a new pilgrimage location',
      icon: MapPin,
      color: 'blue',
      urgent: false
    },
    {
      id: 'verify-guide',
      title: 'Verify Guide',
      description: 'Review pending guide applications',
      icon: UserPlus,
      color: 'green',
      urgent: false
    },
    {
      id: 'review-sos',
      title: 'Review SOS',
      description: '3 pending emergency reports',
      icon: AlertTriangle,
      color: 'red',
      urgent: true
    },
    {
      id: 'content-approval',
      title: 'Approve Content',
      description: '12 submissions awaiting review',
      icon: FileText,
      color: 'amber',
      urgent: false
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure app preferences',
      icon: Settings,
      color: 'gray',
      urgent: false
    },
    {
      id: 'create-manager',
      title: 'Create Manager',
      description: 'Add new site manager',
      icon: Plus,
      color: 'purple',
      urgent: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
      green: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
      red: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
      amber: 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100',
      gray: 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`
                p-4 rounded-xl border-2 text-left transition-all duration-200
                hover:shadow-md hover:-translate-y-0.5
                ${getColorClasses(action.color)}
                ${action.urgent ? 'ring-2 ring-red-200 ring-opacity-50 animate-pulse' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg bg-white/80 backdrop-blur-sm
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {action.description}
                  </p>
                  
                  {action.urgent && (
                    <div className="mt-2 flex items-center gap-1 text-red-600">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-medium">Urgent</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};