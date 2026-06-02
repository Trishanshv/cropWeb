'use client';

import React from 'react';
import { useNavigationStore } from '../../store/navigationStore';
import { useToastStore } from '../../store/toastStore';
import { 
  Eye, Bug, Sprout, UserCheck, CloudRain, ShoppingBag, 
  Settings, Calendar, Users, Home, HelpCircle, Video, Newspaper 
} from 'lucide-react';

interface GridCard {
  id: string;
  title: string;
  subtext?: string;
  views: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  hasNewBanner: boolean;
  hasYellowDot: boolean;
  actionMessage: string;
}

export const OtherInfoView: React.FC = () => {
  const { navigateTo } = useNavigationStore();
  const { showToast } = useToastStore();

  const cards: GridCard[] = [
    {
      id: 'ai-problem-id',
      title: 'AI Enabled Problem Identification',
      views: '966.3k',
      Icon: Bug,
      iconColor: 'text-red-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Opening AI Diagnostic Computer Vision Scanner...'
    },
    {
      id: 'problem-id',
      title: 'Crop Identification',
      views: '2.6M',
      Icon: Sprout,
      iconColor: 'text-amber-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Opening Crop-Based Insect & Disease Selector...'
    },
    {
      id: 'agri-advisory',
      title: 'Agriculture Advisory',
      subtext: 'Advisory',
      views: '1.9M',
      Icon: UserCheck,
      iconColor: 'text-indigo-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Redirecting to University advisory page...'
    },
    {
      id: 'weather-news',
      title: 'Weather News',
      subtext: 'Weather related',
      views: '1.8M',
      Icon: CloudRain,
      iconColor: 'text-sky-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Fetching satellite weather bulletins...'
    },
    {
      id: 'e-haat',
      title: 'e-Haat',
      subtext: '609+ Products',
      views: '1.1M',
      Icon: ShoppingBag,
      iconColor: 'text-amber-600',
      hasNewBanner: false,
      hasYellowDot: false,
      actionMessage: 'Opening live farmer wholesale Mandi trading terminal...'
    },
    {
      id: 'ekrishi-yantra',
      title: 'eKrishi yantra',
      subtext: '274+ Machines',
      views: '1.3M',
      Icon: Settings,
      iconColor: 'text-slate-500',
      hasNewBanner: false,
      hasYellowDot: false,
      actionMessage: 'Loading heavy equipment rental catalogs...'
    },
    {
      id: 'ekrishi-panchang',
      title: 'e-Krishi Panchang',
      subtext: 'approx details of one',
      views: '163.0k',
      Icon: Calendar,
      iconColor: 'text-blue-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Loading lunar agro calendar (Panchang)...'
    },
    {
      id: 'expert-advice',
      title: 'Expert Advice',
      subtext: '200+ Experts',
      views: '253.6k',
      Icon: Users,
      iconColor: 'text-purple-500',
      hasNewBanner: false,
      hasYellowDot: false,
      actionMessage: 'Connecting live video consultation room...'
    },
    {
      id: 'model-farming',
      title: 'Model Farming',
      views: '94.4k',
      Icon: Home,
      iconColor: 'text-emerald-500',
      hasNewBanner: false,
      hasYellowDot: false,
      actionMessage: 'Loading digital farming 3D layout modules...'
    },
    {
      id: 'send-query',
      title: 'Send Query',
      views: '42.0k',
      Icon: HelpCircle,
      iconColor: 'text-yellow-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Opening agricultural support ticketer...'
    },
    {
      id: 'videos',
      title: 'Videos',
      subtext: '200+ Videos',
      views: '73.7k',
      Icon: Video,
      iconColor: 'text-rose-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Opening video training course playlists...'
    },
    {
      id: 'news',
      title: 'News',
      views: '6.6k',
      Icon: Newspaper,
      iconColor: 'text-red-500',
      hasNewBanner: true,
      hasYellowDot: true,
      actionMessage: 'Fetching latest agricultural headlines...'
    }
  ];

  const handleCardClick = (card: GridCard) => {
    showToast(card.actionMessage, 'info');
    
    // Deep-links mapping
    if (card.id === 'agri-advisory' || card.id === 'weather-news') {
      navigateTo('home', 'advisory');
    } else if (card.id === 'ai-problem-id') {
      navigateTo('home', 'ai_crop_doctor');
    } else if (card.id === 'problem-id') {
      navigateTo('home', 'ai_select_crop');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto animate-fade-in select-none text-foreground">
      
      {/* 1. HEADER SECTION */}
      <div className="border-b border-border pb-4 text-left">
        <span className="text-accent-green font-bold text-xs uppercase tracking-wider">
          Crop Doctor 2.0 Directories
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
          Information Resources & Diagnostic Portals
        </h2>
        <p className="text-xs text-text-secondary mt-1.5 leading-relaxed max-w-3xl">
          Quickly access real-time crop disease scanners, manual reference matrices, weather bulletins, equipment rentals, expert consulting rooms, and regional Mandi databases.
        </p>
      </div>

      {/* 2. DYNAMIC RESPONSIVE PORTAL GRID LAYOUT */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="flex flex-col rounded-xl overflow-hidden border border-border bg-card-dark cursor-pointer hover:bg-card-dark-hover hover:border-primary-green/50 transition-colors relative group min-h-[140px] text-left"
          >
            {/* Red "NEW" Banner Tag (top-left) */}
            {card.hasNewBanner && (
              <span className="absolute top-0 left-0 bg-red-600 text-white text-[7.5px] font-bold tracking-wider px-1.5 py-0.5 rounded-br-md shadow-sm z-20">
                NEW
              </span>
            )}

            {/* Yellow Dot Marker (top-right) */}
            {card.hasYellowDot && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)] z-20" />
            )}

            {/* TOP HALF: Illustration panel */}
            <div className="bg-background/20 p-4 flex items-center justify-center flex-1 border-b border-border">
              <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                <card.Icon className={`w-5.5 h-5.5 ${card.iconColor}`} />
              </div>
            </div>

            {/* BOTTOM HALF: Slate Green Title & stats panel */}
            <div className="p-3 flex flex-col justify-between min-h-[76px]">
              <h4 className="text-[10px] sm:text-[11px] font-bold text-foreground leading-[1.3] line-clamp-2 tracking-tight group-hover:text-accent-green transition-colors">
                {card.title}
              </h4>
              
              {/* Eye stats and extra subtitle */}
              <div className="flex items-center justify-between mt-2 text-[8.5px] text-text-secondary font-bold leading-none">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-accent-green" />
                  <span>{card.views}</span>
                </div>
                {card.subtext && (
                  <span className="truncate italic max-w-[60%] block">
                    {card.subtext}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
