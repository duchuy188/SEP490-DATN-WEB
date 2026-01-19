import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  User,
  X,
  CheckCircle
} from 'lucide-react';

export const ManagerSOSPanel: React.FC = () => {
  const [sosAlerts] = useState([
    {
      id: 1,
      pilgrim: 'John Smith',
      location: 'Grotto Area - Section B',
      issue: 'Medical emergency - chest pain',
      time: '3 minutes ago',
      phone: '+1 234 567 8900',
      severity: 'high',
      status: 'active'
    }
  ]);

  const [dismissed, setDismissed] = useState<number[]>([]);

  const handleDismiss = (id: number) => {
    setDismissed([...dismissed, id]);
  };

  const activeAlerts = sosAlerts.filter(alert => !dismissed.includes(alert.id));

  if (activeAlerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-green-800">All Clear</h3>
            <p className="text-sm text-green-700">No active SOS alerts at your site</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 animate-pulse"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-800">
                  🚨 SOS EMERGENCY ALERT
                </h2>
                <p className="text-red-700 font-medium">
                  Immediate attention required
                </p>
              </div>
            </div>
            
            <button
              onClick={() => handleDismiss(alert.id)}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Pilgrim:</span>
                <span className="font-semibold text-red-800">{alert.pilgrim}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Location:</span>
                <span className="font-semibold text-red-800">{alert.location}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Phone:</span>
                <span className="font-semibold text-red-800">{alert.phone}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Issue:</span>
                <span className="font-semibold text-red-800">{alert.issue}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Reported:</span>
                <span className="font-semibold text-red-800">{alert.time}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">
              <Phone className="w-4 h-4" />
              Call Pilgrim
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 border border-red-300 rounded-xl hover:bg-red-200 transition-colors font-semibold">
              <User className="w-4 h-4" />
              Dispatch Guide
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-red-700 border border-red-300 rounded-xl hover:bg-red-50 transition-colors font-semibold">
              Emergency Services
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold">
              <CheckCircle className="w-4 h-4" />
              Mark Resolved
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};