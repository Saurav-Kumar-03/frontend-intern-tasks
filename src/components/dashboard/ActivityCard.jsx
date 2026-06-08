'use client';

import React, { useState } from 'react';
import { Clock, Plus, Trash2, Shield, CreditCard, Server, CheckCircle2 } from 'lucide-react';

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    type: 'billing',
    title: 'Payment Received',
    desc: 'Invoice #1024 paid by John Doe',
    time: '5 mins ago',
    icon: CreditCard,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
  },
  {
    id: 2,
    type: 'security',
    title: 'New API Key Created',
    desc: 'Created by administrator account',
    time: '1 hour ago',
    icon: Shield,
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
  },
  {
    id: 3,
    type: 'system',
    title: 'Deployment Successful',
    desc: 'v2.4.0 deployed to production server',
    time: '3 hours ago',
    icon: CheckCircle2,
    iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
  },
  {
    id: 4,
    type: 'system',
    title: 'CPU Usage Alert',
    desc: 'Database CPU spiked to 88%',
    time: '5 hours ago',
    icon: Server,
    iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
  }
];

export default function ActivityCard() {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState('system');

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let icon = CheckCircle2;
    let iconColor = 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40';

    if (newType === 'billing') {
      icon = CreditCard;
      iconColor = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40';
    } else if (newType === 'security') {
      icon = Shield;
      iconColor = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40';
    } else if (newType === 'system') {
      icon = Server;
      iconColor = 'text-rose-500 bg-rose-50 dark:bg-rose-950/40';
    }

    const newEvent = {
      id: Date.now(),
      type: newType,
      title: newTitle,
      desc: newDesc || 'No description provided',
      time: 'Just now',
      icon,
      iconColor
    };

    setActivities([newEvent, ...activities]);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const clearLogs = () => {
    setActivities([]);
  };

  const resetLogs = () => {
    setActivities(INITIAL_ACTIVITIES);
  };

  const filteredActivities = activities.filter(
    (act) => filter === 'all' || act.type === filter
  );

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Recent Activity
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-1 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition"
              title="Add mock activity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={activities.length === 0 ? resetLogs : clearLogs}
              className="p-1 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition"
              title={activities.length === 0 ? 'Reset Logs' : 'Clear Logs'}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        {!showAddForm && (
          <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 select-none scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {['all', 'billing', 'security', 'system'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                  filter === cat
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content timeline */}
      <div className="flex-grow relative overflow-y-auto max-h-[170px] pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {showAddForm ? (
          <form onSubmit={handleAddActivity} className="space-y-2.5 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Event Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Server Restarter"
                className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:border-amber-400 transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Description</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. Performed maintenance tasks"
                className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:border-amber-400 transition"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-grow">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none"
                >
                  <option value="system">System</option>
                  <option value="billing">Billing</option>
                  <option value="security">Security</option>
                </select>
              </div>
              <div className="flex items-end gap-1 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-2.5 py-1 rounded text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded text-xs bg-amber-500 hover:bg-amber-600 text-white font-medium transition"
                >
                  Log
                </button>
              </div>
            </div>
          </form>
        ) : filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <span className="text-xs text-slate-400 dark:text-slate-500">No recent activity found.</span>
            <button
              onClick={resetLogs}
              className="mt-2 text-xs font-semibold text-amber-500 hover:underline"
            >
              Reset activity logs
            </button>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 pl-4 space-y-4 py-1">
            {filteredActivities.map((act) => {
              const IconComponent = act.icon;
              return (
                <div key={act.id} className="relative group transition-all duration-350">
                  {/* Timeline dot circle icon */}
                  <span className={`absolute -left-[27px] top-0 p-1 rounded-full border border-white dark:border-slate-950 shadow-sm ${act.iconColor}`}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </span>

                  {/* Content details */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition duration-150">
                        {act.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">{act.desc}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap ml-2">
                      {act.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer statistics */}
      {!showAddForm && (
        <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-2.5 mt-2">
          <span className="font-medium">Total logs: {activities.length}</span>
          <span className="capitalize font-semibold text-slate-500 dark:text-slate-400">Filter: {filter}</span>
        </div>
      )}
    </div>
  );
}
