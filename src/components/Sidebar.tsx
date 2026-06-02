'use client';

import React from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { LayoutGrid, Home, User, GraduationCap, FileText, X, Mic, HeartHandshake } from 'lucide-react';
import { ActiveTab, ActiveSubPage } from '../types/navigation';

export const Sidebar: React.FC = () => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    currentTab, 
    activeSubPage, 
    navigateTo 
  } = useNavigationStore();

  if (!sidebarOpen) return null;

  const menuItems = [
    {
      type: 'tab' as const,
      id: 'home' as ActiveTab,
      label: 'Home Dashboard',
      Icon: Home,
    },
    {
      type: 'subpage' as const,
      tabId: 'home' as ActiveTab,
      id: 'igkv_raipur' as ActiveSubPage,
      label: 'IGKV Raipur Portal',
      Icon: GraduationCap,
    },
    {
      type: 'subpage' as const,
      tabId: 'home' as ActiveTab,
      id: 'advisory' as ActiveSubPage,
      label: 'Agro Advisory Bulletins',
      Icon: FileText,
    },
    {
      type: 'tab' as const,
      id: 'other_info' as ActiveTab,
      label: 'Other Information',
      Icon: LayoutGrid,
    },
    {
      type: 'tab' as const,
      id: 'profile' as ActiveTab,
      label: 'User Profile & Crops',
      Icon: User,
    },
  ];

  const handleSelect = (item: typeof menuItems[number]) => {
    if (item.type === 'tab') {
      navigateTo(item.id, 'none');
    } else {
      navigateTo(item.tabId, item.id);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none animate-fade-in">
      {/* Backdrop overlay */}
      <div 
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative w-80 max-w-[85vw] bg-neutral-900 border-r border-neutral-800 text-white h-full flex flex-col z-10 shadow-2xl animate-fade-in">
        
        {/* Drawer Header */}
        <div className="p-5 bg-primary-green flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-accent-green" />
            <span className="font-bold text-lg tracking-tight">Crop Doctor Menu</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg hover:bg-emerald-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Drawer Menu List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold px-3 py-1">
            Navigation
          </span>
          
          {menuItems.map((item) => {
            const isTabActive = item.type === 'tab' && currentTab === item.id && activeSubPage === 'none';
            const isSubPageActive = item.type === 'subpage' && activeSubPage === item.id;
            const isActive = isTabActive || isSubPageActive;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary-green/20 border border-primary-green/30 text-accent-green font-semibold' 
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white border border-transparent'
                }`}
              >
                <item.Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-accent-green' : 'text-neutral-400 group-hover:text-white'}`} />
                <span className="text-sm flex-1">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_#00FF87]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Voice Assistant shortcut */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-neutral-400 px-1">
            <Mic className="w-3.5 h-3.5 text-accent-green" />
            <span>Voice Command deep-link ready</span>
          </div>
          <p className="text-[10px] text-neutral-500 px-1 leading-relaxed">
            Centralized Zustand stores support audio streaming & LLMintent injections out-of-lifecycle.
          </p>
        </div>
      </div>
    </div>
  );
};
