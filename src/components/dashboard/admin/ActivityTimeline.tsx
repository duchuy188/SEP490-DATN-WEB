import React from 'react';
import { 
  UserPlus, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  UserCheck 
} from 'lucide-react';

export const ActivityTimeline: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'sos',
      title: 'SOS Alert Resolved',
      description: 'Emergency at Fatima Sanctuary resolved by Guide Maria',
      time: '2 minutes ago',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 2,
      type: 'user',
      title: 'New Pilgrim Registered',
      description: 'John Smith joined the Santiago de Compostela journey',
      time: '15 minutes ago',
      icon: UserPlus,
      color: 'green'
    },
    {
      id: 3,
      type: 'site',
      title: 'Site Content Updated',
      description: 'Lourdes sanctuary prayer times updated by Manager Anne',
      time: '1 hour ago',
      icon: MapPin,
      color: 'blue'
    },
    {
      id: 4,
      type: 'guide',
      title: 'Guide Verification',
      description: 'Guide Thomas approved for Vatican City tours',
      time: '2 hours ago',
      icon: UserCheck,
      color: 'purple'
    },
    {
      id: 5,
      type: 'checkin',
      title: 'Mass Check-in Event',
      description: '45 pilgrims checked in at Medjugorje during morning prayer',
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'amber'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Maintenance',
      description: 'Scheduled backup completed successfully',
      time: '4 hours ago',
      icon: Clock,
      color: 'gray'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-600 border-red-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      amber: 'bg-amber-100 text-amber-600 border-amber-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Activity
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-4 group">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`
                  p-2 rounded-lg border-2 ${getColorClasses(activity.color)}
                  group-hover:scale-110 transition-transform duration-200
                `}>
                  <Icon className="w-4 h-4" />
                </div>
                {index < activities.length - 1 && (
                  <div className="w-px h-6 bg-slate-200 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};