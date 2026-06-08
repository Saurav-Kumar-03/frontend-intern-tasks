'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, Users, RefreshCw } from 'lucide-react';

const MOCK_DATA = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    'Page Views': [3200, 4100, 3800, 5200, 6100, 5900, 7500],
    'Conversions': [120, 150, 140, 210, 240, 220, 310]
  },
  '30D': {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    'Page Views': [15000, 18000, 16500, 22000, 21000, 27000],
    'Conversions': [450, 520, 490, 680, 610, 890]
  },
  '12M': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'Page Views': [85000, 92000, 89000, 105000, 120000, 115000, 130000, 145000, 140000, 155000, 170000, 195000],
    'Conversions': [2500, 2700, 2600, 3100, 3800, 3600, 4100, 4800, 4400, 5100, 5900, 6800]
  }
};

export default function AnalyticsCard() {
  const [period, setPeriod] = useState('7D');
  const [metric, setMetric] = useState('Page Views');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const svgRef = useRef(null);

  const activeData = MOCK_DATA[period][metric];
  const activeLabels = MOCK_DATA[period].labels;

  const maxVal = Math.max(...activeData) * 1.15; // 15% padding on top
  const minVal = Math.min(...activeData) * 0.85; // 15% padding on bottom
  
  // Dimensions for SVG rendering
  const width = 500;
  const height = 200;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Generate coordinates for chart
  const points = activeData.map((val, idx) => {
    const x = paddingLeft + (idx / (activeData.length - 1)) * chartWidth;
    // Normalize Y coordinates (flip since SVG (0,0) is top-left)
    const y = paddingTop + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, value: val, label: activeLabels[idx] };
  });

  // SVG Path generator (using bezier curve smoothing)
  const getBezierPath = (pointsArray) => {
    if (pointsArray.length === 0) return '';
    let path = `M ${pointsArray[0].x} ${pointsArray[0].y}`;
    
    for (let i = 0; i < pointsArray.length - 1; i++) {
      const p0 = pointsArray[i];
      const p1 = pointsArray[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const linePath = getBezierPath(points);
  // Path closed for area gradient
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : '';

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Scale factor to map client mouse to SVG coordinate space
    const scaleX = width / rect.width;
    const svgMouseX = mouseX * scaleX;

    // Find closest point
    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - svgMouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoveredIndex(closestIdx);

    // Position tooltip in SVG client space
    const pt = points[closestIdx];
    const tooltipX = (pt.x / width) * rect.width;
    const tooltipY = (pt.y / height) * rect.height - 45;
    setTooltipPos({ x: tooltipX, y: tooltipY });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Stats values
  const totalVal = activeData.reduce((a, b) => a + b, 0);
  const avgVal = Math.round(totalVal / activeData.length);
  const percentChange = period === '7D' ? '+14.2%' : period === '30D' ? '+8.7%' : '+21.5%';

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Analytics Overview
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-300">
              {metric === 'Page Views' ? totalVal.toLocaleString() : `$${totalVal.toLocaleString()}`}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
              {percentChange}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Action */}
          <button 
            onClick={refreshData}
            className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Metric Selector */}
          <div className="inline-flex rounded-lg border border-slate-100 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-900/60 text-xs">
            {['Page Views', 'Conversions'].map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all duration-200 ${
                  metric === m
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {m === 'Page Views' ? 'Views' : 'Sales'}
              </button>
            ))}
          </div>

          {/* Period Selector */}
          <div className="inline-flex rounded-lg border border-slate-100 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-900/60 text-xs">
            {['7D', '30D', '12M'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all duration-200 ${
                  period === p
                    ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div 
        className="relative flex-grow flex items-center justify-center min-h-[180px] w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full select-none"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="chartGradientSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + ratio * chartHeight;
            const gridVal = Math.round(maxVal - ratio * (maxVal - minVal));
            return (
              <g key={idx} className="opacity-40 dark:opacity-20">
                <line 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={width - paddingRight} 
                  y2={y} 
                  stroke="currentColor" 
                  className="text-slate-200 dark:text-slate-700" 
                  strokeDasharray="4 4"
                />
                <text 
                  x={paddingLeft - 8} 
                  y={y + 4} 
                  textAnchor="end" 
                  className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium"
                >
                  {gridVal >= 1000 ? `${(gridVal / 1000).toFixed(1)}k` : gridVal}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {points.map((pt, idx) => {
            // Only show labels depending on density
            const isLabelVisible = period === '12M' ? idx % 2 === 0 : true;
            if (!isLabelVisible) return null;
            return (
              <text
                key={idx}
                x={pt.x}
                y={height - paddingBottom / 3}
                textAnchor="middle"
                className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium"
              >
                {pt.label}
              </text>
            );
          })}

          {/* Area under the path */}
          <path 
            d={areaPath} 
            fill={metric === 'Page Views' ? 'url(#chartGradient)' : 'url(#chartGradientSales)'}
            className="transition-all duration-500 ease-in-out"
          />

          {/* Line Path */}
          <path 
            d={linePath} 
            fill="none" 
            stroke={metric === 'Page Views' ? '#6366f1' : '#10b981'} 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-in-out"
          />

          {/* Hover Guide Line */}
          {hoveredIndex !== null && (
            <line
              x1={points[hoveredIndex].x}
              y1={paddingTop}
              x2={points[hoveredIndex].x}
              y2={paddingTop + chartHeight}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700 opacity-80"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          {/* Data Nodes */}
          {points.map((pt, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 0}
                fill={metric === 'Page Views' ? '#6366f1' : '#10b981'}
                stroke="#fff"
                strokeWidth="2"
                className="transition-all duration-150 ease-out cursor-pointer shadow-sm"
              />
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay (HTML based overlay on SVG coordinate rect) */}
        {hoveredIndex !== null && (
          <div 
            style={{ 
              position: 'absolute', 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y}px`, 
              transform: 'translateX(-50%)' 
            }}
            className="bg-slate-900/95 dark:bg-slate-950/95 text-white px-2.5 py-1.5 rounded-lg shadow-xl text-xs font-semibold pointer-events-none border border-slate-800 z-10 transition-all duration-75 flex flex-col items-center whitespace-nowrap min-w-[70px]"
          >
            <span className="text-[10px] text-slate-400 font-normal">{points[hoveredIndex].label}</span>
            <span>
              {metric === 'Page Views' 
                ? points[hoveredIndex].value.toLocaleString() 
                : `$${points[hoveredIndex].value.toLocaleString()}`
              }
            </span>
          </div>
        )}
      </div>

      {/* Mini stats footer */}
      <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-1 text-xs">
        <div className="flex flex-col">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Daily Avg</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">
            {metric === 'Page Views' ? avgVal.toLocaleString() : `$${avgVal.toLocaleString()}`}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Highest Value</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">
            {metric === 'Page Views' 
              ? Math.max(...activeData).toLocaleString() 
              : `$${Math.max(...activeData).toLocaleString()}`
            }
          </span>
        </div>
      </div>
    </div>
  );
}
