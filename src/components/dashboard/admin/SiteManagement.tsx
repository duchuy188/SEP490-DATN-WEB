import React from 'react';
import { Plus, Search, Filter, MapPin, Users, Star, MoreHorizontal, CreditCard as Edit, Eye, Trash2 } from 'lucide-react';

export const SiteManagement: React.FC = () => {
  const sites = [
    {
      id: 1,
      name: 'Sanctuary of Our Lady of Lourdes',
      location: 'Lourdes, France',
      image: 'https://images.pexels.com/photos/208748/pexels-photo-208748.jpeg?auto=compress&cs=tinysrgb&w=200',
      status: 'active',
      visitors: 2847,
      rating: 4.8,
      manager: 'Sister Catherine',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sanctuary of Fatima',
      location: 'Fatima, Portugal',
      image: 'https://images.pexels.com/photos/4273454/pexels-photo-4273454.jpeg?auto=compress&cs=tinysrgb&w=200',
      status: 'active',
      visitors: 1923,
      rating: 4.9,
      manager: 'Father Miguel',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Medjugorje Parish',
      location: 'Medjugorje, Bosnia',
      image: 'https://images.pexels.com/photos/2080381/pexels-photo-2080381.jpeg?auto=compress&cs=tinysrgb&w=200',
      status: 'pending',
      visitors: 456,
      rating: 4.6,
      manager: 'Pending Assignment',
      lastUpdated: '3 days ago'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      inactive: 'bg-red-100 text-red-700 border-red-200'
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Site Management</h1>
          <p className="text-slate-600 mt-2">Manage pilgrimage sites and their content</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg">
          <Plus className="w-4 h-4" />
          Add New Site
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search sites by name or location..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                  ${getStatusBadge(site.status)}
                `}>
                  {site.status}
                </span>
              </div>
              
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {site.name}
              </h3>
              
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{site.location}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{site.visitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-sm text-slate-600">{site.rating}</span>
                </div>
              </div>

              {/* Manager */}
              <div className="text-sm text-slate-600 mb-4">
                <strong>Manager:</strong> {site.manager}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                  <Eye className="w-3 h-3" />
                  View
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};