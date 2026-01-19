import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  UserCheck, 
  Crown,
  MoreHorizontal,
  Mail,
  Phone
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const users = [
    {
      id: 1,
      name: 'Father Michael',
      email: 'father.michael@pilgrimage.com',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      lastLogin: '2 hours ago',
      sitesManaged: 0,
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sister Catherine',
      email: 'sister.catherine@pilgrimage.com',
      role: 'manager',
      avatar: 'https://images.pexels.com/photos/2080381/pexels-photo-2080381.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      lastLogin: '1 hour ago',
      sitesManaged: 2,
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Guide Thomas',
      email: 'thomas.guide@pilgrimage.com',
      role: 'guide',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      lastLogin: '30 minutes ago',
      sitesManaged: 0,
      joinDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      role: 'pilgrim',
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      lastLogin: '1 day ago',
      sitesManaged: 0,
      joinDate: '2023-11-05'
    }
  ];

  const getRoleInfo = (role: string) => {
    const roles = {
      admin: { label: 'Admin', icon: Crown, color: 'red' },
      manager: { label: 'Manager', icon: UserCheck, color: 'blue' },
      guide: { label: 'Guide', icon: UserCheck, color: 'purple' },
      pilgrim: { label: 'Pilgrim', icon: User, color: 'green' }
    };
    return roles[role as keyof typeof roles] || roles.pilgrim;
  };

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
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-600 mt-2">Manage users, guides, and administrators</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Guide</option>
              <option>Pilgrim</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-900">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-900">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-900">Last Login</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-900">Sites</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                const RoleIcon = roleInfo.icon;
                
                return (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-sm text-slate-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className={`
                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                        ${roleInfo.color === 'red' ? 'bg-red-100 text-red-700' : ''}
                        ${roleInfo.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                        ${roleInfo.color === 'purple' ? 'bg-purple-100 text-purple-700' : ''}
                        ${roleInfo.color === 'green' ? 'bg-green-100 text-green-700' : ''}
                      `}>
                        <RoleIcon className="w-3 h-3" />
                        {roleInfo.label}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                        ${getStatusBadge(user.status)}
                      `}>
                        {user.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">{user.lastLogin}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {user.sitesManaged > 0 ? user.sitesManaged : '—'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};