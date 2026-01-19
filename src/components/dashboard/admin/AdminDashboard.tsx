import React from 'react';
import { KPICards } from './KPICards';
import { ActivityTimeline } from './ActivityTimeline';
import { ChartsSection } from './ChartsSection';
import { QuickActions } from './QuickActions';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 mt-2">
          Oversee pilgrimage sites, manage users, and monitor system health
        </p>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ChartsSection />
        </div>

        {/* Activity Timeline - Takes 1 column */}
        <div className="lg:col-span-1">
          <ActivityTimeline />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};