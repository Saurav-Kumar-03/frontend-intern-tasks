'use client';

import React, { useState } from 'react';
import { Bell, X, Check, RefreshCw, AlertTriangle, AlertCircle, Info, Sparkles } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'High Server Load',
    desc: 'CPU exceeded 90% for 5 mins',
    time: '2m ago',
    type: 'danger',
    unread: true
  },
  {
    id: 2,
    title: 'New Customer Signup',
    desc: 'Sarah Jenkins created an account',
    time: '15m ago',
    type: 'success',
    unread: true
  },
  {
    id: 3,
    title: 'System Backup Complete',
    desc: 'Daily database backup successful',
    time: '1h ago',
    type: 'info',
    unread: false
  },
  {
    id: 4,
    title: 'API Rate Limit Warning',
    desc: 'Partner API reached 85% limit',
    time: '4h ago',
    type: 'warning',
    unread: true
  }
];

export default function NotificationsCard() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleRestore = () => {
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const getTypeStyle = (type) => {
    switch(type) {
      case 'danger':
        return {
          icon: AlertCircle,
          colors: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/30'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          colors: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/30'
        };
      case 'success':
        return {
          icon: Sparkles,
          colors: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/30'
        };
      case 'info':
      default:
        return {
          icon: Info,
          colors: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-900/30'
        };
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </span>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Notifications
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            {notifications.length > 0 ? (
              <>
                <button
                  onClick={handleMarkAllRead}
                  className="p-1 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition"
                  title="Mark all as read"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClearAll}
                  className="p-1 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition"
                  title="Clear all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={handleRestore}
                className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all duration-200"
                title="Restore notifications"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Alert List */}
      <div className="flex-grow overflow-y-auto max-h-[170px] pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">All caught up! No notifications.</span>
            <button
              onClick={handleRestore}
              className="mt-2 text-xs font-semibold text-rose-500 hover:underline"
            >
              Restore mock alerts
            </button>
          </div>
        ) : (
          notifications.map((n) => {
            const config = getTypeStyle(n.type);
            const Icon = config.icon;
            return (
              <div 
                key={n.id}
                className={`relative flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                  n.unread 
                    ? 'bg-slate-50/50 dark:bg-slate-900/35 border-indigo-100/40 dark:border-indigo-900/20' 
                    : 'bg-transparent border-slate-100/50 dark:border-slate-800/30 opacity-70'
                }`}
              >
                {/* Left side type status icon */}
                <span className={`p-1.5 rounded-lg border ${config.colors}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>

                {/* Right side details */}
                <div className="flex-grow min-w-0 pr-4">
                  <div className="flex items-baseline justify-between gap-1.5">
                    <h4 className={`text-xs truncate transition-all duration-300 ${
                      n.unread ? 'font-bold text-slate-800 dark:text-slate-200' : 'font-medium text-slate-600 dark:text-slate-400'
                    }`}>
                      {n.title}
                    </h4>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1 truncate">{n.desc}</p>
                </div>

                {/* Hover Dismiss Action Button */}
                <button
                  onClick={() => handleDismiss(n.id)}
                  className="absolute right-2 top-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  title="Dismiss notification"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Details */}
      {notifications.length > 0 && (
        <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-2.5 mt-2">
          <span>{unreadCount} unread / {notifications.length} total</span>
          {unreadCount > 0 && (
            <span className="font-semibold text-rose-500 dark:text-rose-400 animate-pulse">Action Required</span>
          )}
        </div>
      )}
    </div>
  );
}
