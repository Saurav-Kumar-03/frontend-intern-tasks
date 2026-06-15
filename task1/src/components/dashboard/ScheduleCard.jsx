'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Check, Clock, Trash2 } from 'lucide-react';

const INITIAL_SCHEDULE = [
  {
    id: 1,
    title: 'Daily Standup Sync',
    time: '10:00 AM - 10:30 AM',
    date: 'Today',
    category: 'Meetings',
    completed: false,
    attendees: ['SK', 'AS', 'DS']
  },
  {
    id: 2,
    title: 'UI/UX Design Review',
    time: '02:00 PM - 03:00 PM',
    date: 'Today',
    category: 'Meetings',
    completed: true,
    attendees: ['AS', 'RR']
  },
  {
    id: 3,
    title: 'Deploy Hotfix to Prod',
    time: '04:30 PM - 05:00 PM',
    date: 'Today',
    category: 'Tasks',
    completed: false,
    attendees: ['SK', 'DS']
  },
  {
    id: 4,
    title: 'Prepare Sprint Planning',
    time: '11:00 AM - 12:00 PM',
    date: 'Tomorrow',
    category: 'Tasks',
    completed: false,
    attendees: ['SK', 'AS']
  }
];

export default function ScheduleCard() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [filter, setFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newCategory, setNewCategory] = useState('Meetings');
  const [newDate, setNewDate] = useState('Today');

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      time: newTime,
      date: newDate,
      category: newCategory,
      completed: false,
      attendees: ['SK'] // Current user is SK
    };

    setSchedule([...schedule, newItem]);
    setNewTitle('');
    setNewTime('');
    setShowAddForm(false);
  };

  const toggleComplete = (id) => {
    setSchedule(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleRemove = (id) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  const filteredSchedule = schedule.filter(item => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  const getTagColors = (cat) => {
    switch (cat) {
      case 'Meetings':
        return 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-900/20';
      case 'Tasks':
      default:
        return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/20';
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
              <Calendar className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Upcoming Schedule
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-1 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition"
              title="Add schedule item"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter badging */}
        {!showAddForm && (
          <div className="flex gap-1.5 mb-3 select-none">
            {['All', 'Meetings', 'Tasks'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                  filter === cat
                    ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main List Schedule */}
      <div className="flex-grow overflow-y-auto max-h-[170px] pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {showAddForm ? (
          <form onSubmit={handleAddSchedule} className="space-y-2.5 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Event Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Client Feedback Session"
                className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:border-sky-400 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Time Slot</label>
                <input
                  type="text"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="e.g. 03:00 PM - 04:00 PM"
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:border-sky-400 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Day</label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none"
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-grow">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Type</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none"
                >
                  <option value="Meetings">Meetings</option>
                  <option value="Tasks">Tasks</option>
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
                  className="px-2.5 py-1 rounded text-xs bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
                >
                  Schedule
                </button>
              </div>
            </div>
          </form>
        ) : filteredSchedule.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-xs text-slate-400 dark:text-slate-500">No upcoming items.</span>
            <button
              onClick={() => setSchedule(INITIAL_SCHEDULE)}
              className="mt-2 text-xs font-semibold text-sky-500 hover:underline"
            >
              Restore full schedule
            </button>
          </div>
        ) : (
          filteredSchedule.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between p-2.5 rounded-xl border transition-all duration-200 group ${
                item.completed
                  ? 'bg-transparent border-slate-100 dark:border-slate-900 opacity-55'
                  : 'bg-slate-50/50 dark:bg-slate-900/35 border-slate-100/50 dark:border-slate-800/40 hover:-translate-y-0.5'
              }`}
            >
              {/* Checkbox item */}
              <div className="flex items-start gap-2.5 min-w-0">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-sky-500 border-sky-500 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 hover:border-sky-500'
                  }`}
                >
                  {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </button>

                {/* Details */}
                <div className="min-w-0">
                  <h4 className={`text-xs font-bold truncate transition-all ${
                    item.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {item.title}
                  </h4>
                  
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <span className="flex items-center gap-0.5 text-[9px] text-slate-400 dark:text-slate-500 font-semibold">
                      <Clock className="w-3 h-3" />
                      {item.time} ({item.date})
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold border uppercase tracking-wider ${getTagColors(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons (only show remove button on hover) */}
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-2">
                {/* Attendee bubble overlays */}
                {!item.completed && (
                  <div className="flex -space-x-1.5 mr-2">
                    {item.attendees.map((init, i) => (
                      <span
                        key={i}
                        className="w-5.5 h-5.5 rounded-full border border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-300 ring-1 ring-slate-100 dark:ring-slate-900"
                        title={init}
                      >
                        {init}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 rounded text-rose-400 hover:text-rose-600 dark:hover:text-rose-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Remove Schedule"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      {!showAddForm && (
        <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-2.5 mt-2">
          <span>Completed: {schedule.filter(i => i.completed).length} / {schedule.length}</span>
          <span className="font-semibold text-slate-500 dark:text-slate-400">{filter} Schedule</span>
        </div>
      )}
    </div>
  );
}
