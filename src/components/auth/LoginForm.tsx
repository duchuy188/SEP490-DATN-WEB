import React, { useState } from 'react';
import { ChevronRight, Cross, Users } from 'lucide-react';
import { User } from '../../App';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (email === 'admin@pilgrimage.com') {
      onLogin({
        id: '1',
        name: 'Father Michael',
        email: 'admin@pilgrimage.com',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      });
    } else if (email === 'manager@pilgrimage.com') {
      onLogin({
        id: '2',
        name: 'Sister Catherine',
        email: 'manager@pilgrimage.com',
        role: 'manager',
        avatar: 'https://images.pexels.com/photos/2080381/pexels-photo-2080381.jpeg?auto=compress&cs=tinysrgb&w=150'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-violet-900 rounded-2xl mb-4">
              <Cross className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
              Pilgrimage Guide
            </h1>
            <p className="text-slate-600 mt-2">Dashboard Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              Sign In
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600 mb-4">Quick Login</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setEmail('admin@pilgrimage.com');
                  setPassword('admin123');
                }}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                Admin
              </button>
              <button
                onClick={() => {
                  setEmail('manager@pilgrimage.com');
                  setPassword('manager123');
                }}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                <Cross className="w-4 h-4 mx-auto mb-1 text-violet-600" />
                Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};