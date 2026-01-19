import React from 'react';
import { 
  FileText, 
  Camera, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

export const PendingContent: React.FC = () => {
  const pendingItems = [
    {
      id: 1,
      type: 'prayer',
      title: 'Evening Prayer Update',
      submitter: 'Father Michael',
      time: '2 hours ago',
      priority: 'normal',
      icon: FileText
    },
    {
      id: 2,
      type: 'photo',
      title: 'New Sanctuary Photos',
      submitter: 'Brother Thomas',
      time: '4 hours ago',
      priority: 'low',
      icon: Camera
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Mass Schedule Changes',
      submitter: 'Sister Catherine',
      time: '6 hours ago',
      priority: 'high',
      icon: Clock
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'normal': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Pending Content Review
        </h2>
        <div className="text-sm text-slate-600">
          {pendingItems.length} item{pendingItems.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {pendingItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-slate-900 text-sm">
                      {item.title}
                    </h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium border
                      ${getPriorityColor(item.priority)}
                    `}>
                      {item.priority}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-600 mb-3">
                    By {item.submitter} • {item.time}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium">
                      <XCircle className="w-3 h-3" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
          View All Pending ({pendingItems.length + 9})
        </button>
      </div>
    </div>
  );
};