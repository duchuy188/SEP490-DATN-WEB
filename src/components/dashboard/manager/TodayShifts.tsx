import React from 'react';
import { 
  Clock, 
  User, 
  MapPin, 
  Phone,
  CheckCircle 
} from 'lucide-react';

export const TodayShifts: React.FC = () => {
  const shifts = [
    {
      id: 1,
      guide: 'Brother Thomas',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '6:00 AM - 2:00 PM',
      zone: 'Main Sanctuary',
      status: 'active',
      phone: '+33 1 234 5678'
    },
    {
      id: 2,
      guide: 'Sister Maria',
      avatar: 'https://images.pexels.com/photos/2080381/pexels-photo-2080381.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '2:00 PM - 10:00 PM',
      zone: 'Grotto Area',
      status: 'starting-soon',
      phone: '+33 1 234 5679'
    },
    {
      id: 3,
      guide: 'Guide François',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '10:00 AM - 6:00 PM',
      zone: 'Basilica Tours',
      status: 'active',
      phone: '+33 1 234 5680'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'green', label: 'On Duty', icon: CheckCircle };
      case 'starting-soon':
        return { color: 'amber', label: 'Starting Soon', icon: Clock };
      default:
        return { color: 'gray', label: 'Scheduled', icon: Clock };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Today's Guide Shifts
        </h2>
        <span className="text-sm text-slate-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      <div className="space-y-4">
        {shifts.map((shift) => {
          const statusInfo = getStatusInfo(shift.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div
              key={shift.id}
              className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={shift.avatar}
                  alt={shift.guide}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {shift.guide}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {shift.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {shift.zone}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`
                      inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                      ${statusInfo.color === 'green' ? 'bg-green-100 text-green-700' : ''}
                      ${statusInfo.color === 'amber' ? 'bg-amber-100 text-amber-700' : ''}
                      ${statusInfo.color === 'gray' ? 'bg-gray-100 text-gray-700' : ''}
                    `}>
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Phone className="w-3 h-3" />
                      {shift.phone}
                    </div>
                    
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Contact
                    </button>
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