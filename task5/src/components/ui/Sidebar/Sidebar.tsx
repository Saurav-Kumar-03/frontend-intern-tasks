"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckSquare, Layers, MessageSquare, AlertCircle, Maximize } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
}

export function Sidebar({ isOpen, onClose, activeItem = 'buttons', className, ...props }: SidebarProps) {
  const navItems = [
    { name: 'Buttons', icon: <CheckSquare className="h-4 w-4" />, id: 'buttons' },
    { name: 'Inputs', icon: <MessageSquare className="h-4 w-4" />, id: 'inputs' },
    { name: 'Cards', icon: <Layers className="h-4 w-4" />, id: 'cards' },
    { name: 'Badges', icon: <AlertCircle className="h-4 w-4" />, id: 'badges' },
    { name: 'Alerts', icon: <AlertCircle className="h-4 w-4" />, id: 'alerts' },
    { name: 'Modals', icon: <Maximize className="h-4 w-4" />, id: 'modals' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 md:translate-x-0 md:static md:block",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:mt-0 pt-16 md:pt-0", 
          className
        )}
        {...props}
      >
        <div className="flex h-full flex-col py-6 px-3 overflow-y-auto">
          <div className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Components
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeItem === item.id 
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
