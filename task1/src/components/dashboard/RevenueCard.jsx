'use client';

import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Award, Plus, Minus } from 'lucide-react';

const VIEW_DATA = {
  Monthly: {
    revenue: 24500,
    target: 30000,
    change: '+12.5%',
    isPositive: true,
    sparkline: [21000, 22500, 21800, 23000, 24000, 24500]
  },
  Weekly: {
    revenue: 5800,
    target: 7000,
    change: '-2.4%',
    isPositive: false,
    sparkline: [6200, 6000, 5900, 6100, 5750, 5800]
  },
  Yearly: {
    revenue: 284000,
    target: 320000,
    change: '+18.9%',
    isPositive: true,
    sparkline: [240000, 255000, 260000, 275000, 280000, 284000]
  }
};

export default function RevenueCard() {
  const [timeframe, setTimeframe] = useState('Monthly');
  const data = VIEW_DATA[timeframe];
  
  // Local goal override to allow real-time adjustments
  const [goal, setGoal] = useState(data.target);
  
  // Track whenever timeframe changes, sync the goal state
  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
    setGoal(VIEW_DATA[tf].target);
  };

  const progress = Math.min(Math.round((data.revenue / goal) * 100), 100);
  
  // Circular progress math
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const adjustGoal = (amount) => {
    setGoal(prev => Math.max(prev + amount, data.revenue - 5000));
  };

  // Generate sparkline path
  const generateSparkline = (points) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 24;
    
    return points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Revenue Goal
            </h3>
          </div>

          {/* Timeframe selector */}
          <select 
            value={timeframe} 
            onChange={(e) => handleTimeframeChange(e.target.value)}
            className="text-xs font-medium bg-transparent border-none text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 outline-none cursor-pointer pr-1"
          >
            <option value="Weekly" className="dark:bg-slate-900">Weekly</option>
            <option value="Monthly" className="dark:bg-slate-900">Monthly</option>
            <option value="Yearly" className="dark:bg-slate-900">Yearly</option>
          </select>
        </div>

        {/* Amount & Change */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-300">
              ${data.revenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`flex items-center text-xs font-semibold ${data.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {data.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {data.change}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">vs target</span>
            </div>
          </div>

          {/* Sparkline trend */}
          <div className="flex flex-col items-end">
            <svg className="w-20 h-6 overflow-visible">
              <path
                d={generateSparkline(data.sparkline)}
                fill="none"
                stroke={data.isPositive ? '#10b981' : '#f43f5e'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider font-semibold">Trend</span>
          </div>
        </div>
      </div>

      {/* Middle Interactive Circular Progress */}
      <div className="flex items-center justify-around my-2 py-1 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl px-2">
        <div className="relative flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-indigo-600 dark:stroke-indigo-500 transition-all duration-500 ease-out"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          {/* Centered text */}
          <div className="absolute text-center">
            <span className="text-sm font-bold text-slate-800 dark:text-white transition-all duration-300">
              {progress}%
            </span>
          </div>
        </div>

        {/* Goal adjustment controls */}
        <div className="flex flex-col gap-1 items-center">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Target Goal</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">${goal.toLocaleString()}</span>
          
          <div className="flex gap-1 mt-1">
            <button
              onClick={() => adjustGoal(-1000)}
              className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition duration-150"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => adjustGoal(1000)}
              className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition duration-150"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
        <span className="flex items-center gap-1 font-medium">
          <Award className="w-3.5 h-3.5 text-indigo-500" /> 
          {progress >= 100 ? 'Goal Reached!' : `${(goal - data.revenue).toLocaleString()} left`}
        </span>
        <span className="font-semibold text-slate-500 dark:text-slate-400">Target ${goal.toLocaleString()}</span>
      </div>
    </div>
  );
}
