'use client';

import React, { useState } from 'react';
import { Users, Plus, Mail, MessageSquare, Trash2 } from 'lucide-react';

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Saurav Kumar',
    email: 'saurav@smartvyapaar.com',
    role: 'Frontend Architect',
    status: 'online', // online, idle, offline
    initials: 'SK',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 2,
    name: 'Ayush Sharma',
    email: 'ayush@smartvyapaar.com',
    role: 'UI/UX Lead',
    status: 'idle',
    initials: 'AS',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 3,
    name: 'Deepika Sen',
    email: 'deepika@smartvyapaar.com',
    role: 'Backend Dev',
    status: 'online',
    initials: 'DS',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    name: 'Rishu Raj',
    email: 'rishu@smartvyapaar.com',
    role: 'QA Automation',
    status: 'offline',
    initials: 'RR',
    gradient: 'from-amber-500 to-orange-500'
  }
];

export default function TeamCard() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Developer');

  const handleInvite = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    // Get initials from name
    const initials = newName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'TM';

    const gradients = [
      'from-blue-500 to-indigo-500',
      'from-violet-500 to-purple-500',
      'from-emerald-500 to-cyan-500',
      'from-rose-500 to-red-500',
      'from-amber-500 to-yellow-500'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newMember = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
      status: 'online', // Default status for new invites
      initials,
      gradient: randomGradient
    };

    setMembers([...members, newMember]);
    setNewName('');
    setNewEmail('');
    setShowInviteForm(false);
  };

  const handleRemove = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleStatusChange = (id) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const statuses = ['online', 'idle', 'offline'];
        const nextStatus = statuses[(statuses.indexOf(m.status) + 1) % statuses.length];
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500 ring-emerald-100 dark:ring-emerald-950';
      case 'idle':
        return 'bg-amber-500 ring-amber-100 dark:ring-amber-950';
      case 'offline':
      default:
        return 'bg-slate-400 ring-slate-100 dark:ring-slate-900';
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              <Users className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Team Members
            </h3>
          </div>

          <button
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="p-1 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition"
            title="Invite Member"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto max-h-[170px] pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {showInviteForm ? (
          <form onSubmit={handleInvite} className="space-y-2.5 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Jane Miller"
                className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:border-violet-400 transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Email</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="e.g. jane@smartvyapaar.com"
                className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:border-violet-400 transition"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-grow">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white outline-none"
                >
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Product Owner">Product Owner</option>
                  <option value="QA Lead">QA Lead</option>
                </select>
              </div>
              <div className="flex items-end gap-1 mt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="px-2.5 py-1 rounded text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded text-xs bg-violet-500 hover:bg-violet-600 text-white font-medium transition"
                >
                  Invite
                </button>
              </div>
            </div>
          </form>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-xs text-slate-400 dark:text-slate-500">No team members.</span>
            <button
              onClick={() => setMembers(INITIAL_MEMBERS)}
              className="mt-2 text-xs font-semibold text-violet-500 hover:underline"
            >
              Restore default team
            </button>
          </div>
        ) : (
          members.map((member) => (
            <div 
              key={member.id}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50/50 dark:bg-slate-900/35 border border-slate-100/50 dark:border-slate-800/40 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              {/* Member Profile Avatar Circle */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative flex-shrink-0">
                  <div 
                    onClick={() => handleStatusChange(member.id)}
                    className={`w-9.5 h-9.5 rounded-full bg-gradient-to-tr ${member.gradient} flex items-center justify-center text-white text-xs font-bold shadow-sm select-none cursor-pointer hover:opacity-90 transition`}
                    title="Change status"
                  >
                    {member.initials}
                  </div>
                  {/* Status Ring Badge */}
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ${getStatusColor(member.status)}`} />
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{member.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{member.role}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a 
                  href={`mailto:${member.email}`}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title={`Email ${member.name}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleRemove(member.id)}
                  className="p-1 rounded text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Remove member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      {!showInviteForm && (
        <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-2.5 mt-2">
          <span>Active members: {members.filter(m => m.status === 'online').length}</span>
          <span className="font-semibold text-slate-500 dark:text-slate-400">Total: {members.length}</span>
        </div>
      )}
    </div>
  );
}
