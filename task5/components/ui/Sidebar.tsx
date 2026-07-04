"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose, className, ...props }: SidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-950 md:translate-x-0 md:static md:block",
          isOpen ? "translate-x-0 mt-[61px]" : "-translate-x-full mt-[61px]",
          "md:mt-0",
          className
        )}
        {...props}
      >
        <div className="flex h-full flex-col py-6 px-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {['Buttons', 'Cards', 'Inputs', 'Modals', 'Alerts', 'Badges'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="ml-3">{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
