'use client';

import React, { useEffect, useState } from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { ArrowLeft, Home as HomeIcon, LayoutGrid, User as UserIcon, Sun, Moon, Sparkles } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { ActiveTab } from '../types/navigation';

export const Header: React.FC = () => {
  const { 
    currentTab,
    activeSubPage, 
    navigateTo,
    goBack
  } = useNavigationStore();
  const { profile } = useProfile();
  
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isSubPage = activeSubPage !== 'none';

  // Load and apply persistent theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      const initialTheme = prefersLight ? 'light' : 'dark';
      setTheme(initialTheme);
      if (initialTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const navItems = [
    { id: 'home' as ActiveTab, label: 'Home', Icon: HomeIcon },
    { id: 'other_info' as ActiveTab, label: 'Other Info', Icon: LayoutGrid },
    { id: 'profile' as ActiveTab, label: 'Profile', Icon: UserIcon },
  ];

  return (
    <header className="sticky top-0 z-45 bg-card-dark text-foreground border-b border-border px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm select-none transition-colors duration-200">
      
      {/* Left side: Logo & Brand or Contextual Back Button */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        {isSubPage ? (
          <button 
            onClick={goBack}
            className="p-1.5 rounded-lg bg-background hover:bg-card-dark-hover border border-border flex items-center justify-center gap-1.5 text-xs font-bold text-foreground transition-all duration-200"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4 text-accent-green" />
            <span>Back</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            {/* Minimal vector logo */}
            <div className="w-8 h-8 rounded-lg bg-emerald-950/20 border border-primary-green/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 00-5 5c0 2.5 1.5 3 2.5 4.5S11 19 12 19s1.5-1 2.5-2.5 2.5-2 2.5-4.5a5 5 0 00-5-5z" />
              </svg>
            </div>
            
            <div className="flex flex-col leading-none">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight uppercase">
                Crop Doctor 2.0
              </h1>
              <span className="text-[8px] font-bold text-accent-green uppercase tracking-widest mt-0.5">
                University Research Web App
              </span>
            </div>
          </div>
        )}

        {/* Right tools side layout on narrow screens */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Muted user label */}
          {profile && (
            <span className="text-[10px] text-text-secondary font-medium">
              {profile.name.split(' ')[0]}
            </span>
          )}

          {/* Theme Switcher Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-border bg-background hover:bg-card-dark-hover transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-primary-green" />}
          </button>
        </div>
      </div>

      {/* Center: Simplified Main Navigation Tabs */}
      <nav className="flex items-center gap-1 sm:gap-2 bg-background border border-border rounded-xl p-1 w-full sm:w-auto justify-around sm:justify-start">
        {navItems.map((item) => {
          const isActive = currentTab === item.id && activeSubPage === 'none';
          
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id, 'none')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none ${
                isActive 
                  ? 'bg-primary-green text-white shadow-sm font-bold' 
                  : 'text-text-secondary hover:text-foreground hover:bg-card-dark-hover'
              }`}
            >
              <item.Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right side: persistent indicators & theme switch for desktops */}
      <div className="hidden sm:flex items-center gap-4">
        {/* User tag */}
        {profile && (
          <div className="text-xs text-text-secondary font-medium border-r border-border pr-4">
            User: <span className="text-foreground font-semibold">{profile.name}</span>
          </div>
        )}

        {/* Theme Switcher Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-1.5 rounded-lg border border-border bg-background hover:bg-card-dark-hover transition-colors flex items-center justify-center focus:outline-none"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-primary-green" />
          )}
        </button>

        {/* Small clean status tag */}
        <div className="bg-background text-accent-green px-2 py-1 rounded-lg border border-border flex items-center gap-1.5 text-[10px] font-bold">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span>SYSTEM ACTIVE</span>
        </div>
      </div>
    </header>
  );
};
