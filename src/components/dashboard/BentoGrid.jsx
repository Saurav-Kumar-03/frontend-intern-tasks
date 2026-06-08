'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Sun, Moon, Sparkles, LayoutDashboard } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import RevenueCard from './RevenueCard';
import ActivityCard from './ActivityCard';
import NotificationsCard from './NotificationsCard';
import TeamCard from './TeamCard';
import ScheduleCard from './ScheduleCard';

export default function BentoGrid() {
  const [darkMode, setDarkMode] = useState(true);
  const [greeting, setGreeting] = useState('Welcome back');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Dynamic greeting based on time of day
    const hr = new Date().getHours();
    let activeGreeting = 'Welcome back';
    if (hr < 12) activeGreeting = 'Good morning';
    else if (hr < 17) activeGreeting = 'Good afternoon';
    else activeGreeting = 'Good evening';

    // Current formatted date
    const formatted = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const timer = setTimeout(() => {
      setGreeting(activeGreeting);
      setCurrentDate(formatted);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-all duration-300 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Controls Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                <LayoutDashboard className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {greeting}, Saurav
                  </h1>
                  <Sparkles className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                  {currentDate || 'Loading date...'} • SSC SmartVyapaar Consultant Overview
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all duration-200"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Analytics Overview - Span 2 col on tablet & desktop, Span 2 rows on desktop */}
            <Card className="md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[350px] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-indigo-950/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300">
              <AnalyticsCard />
            </Card>

            {/* Revenue Goal - Span 1 col on all screen sizes */}
            <Card className="col-span-1 min-h-[200px] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300">
              <RevenueCard />
            </Card>

            {/* Recent Activity - Span 2 col on tablet, Span 1 col on desktop, Span 2 rows on desktop */}
            <Card className="md:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[350px] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300">
              <ActivityCard />
            </Card>

            {/* Notifications - Span 1 col on all screen sizes */}
            <Card className="col-span-1 min-h-[200px] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-rose-500/30 dark:hover:border-rose-500/30 transition-all duration-300">
              <NotificationsCard />
            </Card>

            {/* Team Members - Span 2 col on tablet & desktop, Span 1 row */}
            <Card className="md:col-span-2 lg:col-span-2 min-h-[220px] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300">
              <TeamCard />
            </Card>

            {/* Upcoming Schedule - Span 2 col on tablet & desktop, Span 1 row */}
            <Card className="md:col-span-2 lg:col-span-2 min-h-[220px] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-sky-500/30 dark:hover:border-sky-500/30 transition-all duration-300">
              <ScheduleCard />
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
