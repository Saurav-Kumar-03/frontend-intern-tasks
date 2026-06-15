import React from 'react';

export function Card({ children, className = "" }) {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
