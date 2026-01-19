import React from 'react';
import { MySiteCard } from './MySiteCard';
import { TodayShifts } from './TodayShifts';
import { PendingContent } from './PendingContent';
import { ManagerSOSPanel } from './ManagerSOSPanel';
import { QuickStats } from './QuickStats';

export const ManagerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Site Manager Dashboard
        </h1>
        <p className="text-slate-600 mt-2">
          Manage your assigned sites and guide operations
        </p>
      </div>

      {/* SOS Alert Panel - Always visible at top */}
      <ManagerSOSPanel />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - My Site */}
        <div className="lg:col-span-1">
          <MySiteCard />
        </div>

        {/* Middle Column - Today's Operations */}
        <div className="lg:col-span-1 space-y-6">
          <TodayShifts />
          <QuickStats />
        </div>

        {/* Right Column - Content & Actions */}
        <div className="lg:col-span-1">
          <PendingContent />
        </div>
      </div>
    </div>
  );
};