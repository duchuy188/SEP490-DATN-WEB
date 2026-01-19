import React from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  Star,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const MySiteCard: React.FC = () => {
  // Mock data for the manager's assigned site
  const siteData = {
    name: 'Sanctuary of Our Lady of Lourdes',
    location: 'Lourdes, France',
    image: 'https://images.pexels.com/photos/208748/pexels-photo-208748.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'active',
    todayVisitors: 127,
    rating: 4.8,
    openHours: '6:00 AM - 10:00 PM',
    nextMass: '6:00 PM',
    activeGuides: 8,
    pendingApprovals: 3
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Image */}
      <div className="relative h-48">
        <img
          src={siteData.image}
          alt={siteData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Active
          </span>
        </div>

        {/* Site Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-bold text-white mb-1">
            {siteData.name}
          </h2>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{siteData.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{siteData.todayVisitors}</div>
            <div className="text-sm text-slate-600">Today's Visitors</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="text-2xl font-bold text-slate-900">{siteData.rating}</span>
            </div>
            <div className="text-sm text-slate-600">Site Rating</div>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Open:</span>
            <span className="font-medium text-slate-900">{siteData.openHours}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Next Mass:</span>
            <span className="font-medium text-slate-900">{siteData.nextMass}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Active Guides:</span>
            <span className="font-medium text-slate-900">{siteData.activeGuides}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium">
            Manage Site
            <ExternalLink className="w-4 h-4" />
          </button>
          
          {siteData.pendingApprovals > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-700">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-sm font-medium">
                  {siteData.pendingApprovals} pending approval{siteData.pendingApprovals > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};