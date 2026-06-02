'use client';

import React from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { LayoutGrid, Home, User } from 'lucide-react';
import { ActiveTab } from '../types/navigation';

export const BottomNav: React.FC = () => {
  const { currentTab, activeSubPage, navigateTo } = useNavigationStore();

  // If a subpage is active, we don't necessarily hide the bottom nav (it acts as a wrapper app),
  // but let's make sure it transitions smoothly.
  const handleTabClick = (tab: ActiveTab) => {
    navigateTo(tab, 'none');
  };

  const tabs = [
    {
      id: 'other_info' as ActiveTab,
      label: 'Other Information',
      Icon: LayoutGrid,
    },
    {
      id: 'home' as ActiveTab,
      label: 'Home',
      Icon: Home,
    },
    {
      id: 'profile' as ActiveTab,
      label: 'Profile',
      Icon: User,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-primary-green text-white py-2 flex items-center justify-around border-t border-emerald-800/40 shadow-[0_-2px_10px_rgba(0,0,0,0.15)] select-none">
      {tabs.map((tab) => {
        // Active condition: current subpage is none and this is the current tab
        // Or if in subpage, let it still highlight home if it is related (like igkv or advisory)
        const isActive = currentTab === tab.id && activeSubPage === 'none';
        const isCurrentlyActiveTab = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative focus:outline-none ${
              isCurrentlyActiveTab ? 'text-white' : 'text-emerald-300/70 hover:text-emerald-100'
            }`}
          >
            {/* Visual Active Aura Dot above active icon */}
            {isCurrentlyActiveTab && (
              <span className="absolute top-0 w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_#00FF87] animate-pulse" />
            )}

            <tab.Icon
              className={`w-6 h-6 transition-transform duration-200 ${
                isCurrentlyActiveTab ? 'scale-110 text-accent-green' : 'scale-100'
              }`}
            />
            
            <span
              className={`text-[10px] mt-1 transition-all duration-300 font-medium ${
                isCurrentlyActiveTab 
                  ? 'font-bold italic text-white' 
                  : 'font-normal text-emerald-300/70'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
