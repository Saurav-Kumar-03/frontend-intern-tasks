"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Menu, User, Settings, LogOut } from "lucide-react";
import { Button } from "../Button";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 flex w-full h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 transition-colors">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          SaaS Kit
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 dark:bg-slate-800" onClick={() => setProfileOpen(!profileOpen)}>
            <User className="h-5 w-5" />
          </Button>
          
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-md dark:border-slate-800 dark:bg-slate-950 transition-all animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-slate-500">john@example.com</p>
                </div>
                <a href="#profile" className="flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  <User className="mr-2 h-4 w-4" /> Profile
                </a>
                <a href="#settings" className="flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </a>
                <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
