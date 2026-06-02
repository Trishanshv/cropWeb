'use client';

import React, { useState, useEffect } from 'react';
import { useNavigationStore } from '../../store/navigationStore';
import { useProfile } from '../../hooks/useProfile';
import { useIGKV } from '../../hooks/useIGKV';
import { Carousel } from '../Carousel';
import { WeatherWidget } from '../WeatherWidget';
import { Bot, MapPin, Cpu, ShieldCheck, GraduationCap, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

export const HomeView: React.FC = () => {
  const { navigateTo } = useNavigationStore();
  const { profile } = useProfile();
  const { data } = useIGKV();
  const { showToast } = useToastStore();

  const profileName = profile?.name || 'User';

  // TYPEWRITER CONTINUOUS WRITING EFFECT
  const [typedText, setTypedText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const messages = [
    `Hello ${profileName}!`,
    'Welcome to Crop Doctor Web Portal',
    'IoT Networks: Active & Connected',
    'AI Diagnostics: Online & Ready',
    'Weather Satellites: Synchronized'
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentMessage = messages[messageIndex];
    const typingSpeed = isDeleting ? 30 : 60;
    const pauseDelay = isDeleting ? 800 : 2000;

    const handleType = () => {
      if (!isDeleting) {
        setTypedText(currentMessage.substring(0, typedText.length + 1));
        
        if (typedText.length === currentMessage.length) {
          timer = setTimeout(() => setIsDeleting(true), pauseDelay);
          return;
        }
      } else {
        setTypedText(currentMessage.substring(0, typedText.length - 1));
        
        if (typedText.length === 0) {
          setIsDeleting(false);
          setMessageIndex((prev) => (prev + 1) % messages.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, messageIndex, profileName]);

  return (
    <div className="flex flex-col gap-8 w-full mx-auto animate-fade-in select-none text-foreground">
      
      {/* 1. BRAND HERO ROW: CLEAN, ZERO BOX GRADIENTS, HIGH CONTRAST TYPOGRAPHY */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Typewriter User greeting */}
        <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-accent-green font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Crop Analytics Engine Active</span>
          </div>
          
          <div className="min-h-[44px] flex items-center justify-center md:justify-start">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {typedText}
              <span className="inline-block w-1 h-5 ml-1 bg-accent-green animate-pulse" />
            </h2>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-lg">
            Real-time agro-informatics, satellite weather indexation, and computer vision plant disease telemetry. 
            Select an action card below to explore Crop Doctor services.
          </p>
        </div>

        {/* Right Side: Simple visual sliding carousel container */}
        <div className="w-full md:w-[320px] flex-shrink-0 bg-neutral-900 border border-neutral-800 rounded-2xl p-2">
          <Carousel />
        </div>
      </div>

      {/* 2. DIRECT DEEP-LINK CARD SECTIONS - CLEAN & FLAT */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Direct University Portal Deep-Links
          </h3>
          <span className="text-[9px] font-bold text-accent-green bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
            Phase 1 Certified
          </span>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Link 1: IGKV Raipur */}
          <button
            onClick={() => navigateTo('home', 'igkv_raipur')}
            className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between transition-colors group focus:outline-none text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5.5 h-5.5 text-accent-green" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-accent-green transition-colors">
                  IGKV Raipur Portal
                </span>
                <span className="text-[9px] text-neutral-400 mt-0.5">Indira Gandhi Krishi Vishwavidyalaya</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-accent-green transition-colors" />
          </button>

          {/* Link 2: Advisory */}
          <button
            onClick={() => navigateTo('home', 'advisory')}
            className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between transition-colors group focus:outline-none text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5.5 h-5.5 text-accent-green" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-accent-green transition-colors">
                  Weather Advisories
                </span>
                <span className="text-[9px] text-neutral-400 mt-0.5">Satellite weather index bulletins</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-accent-green transition-colors" />
          </button>
        </div>
      </div>

      {/* 3. SMART KISAN SERVICES - CLEAN & MINIMAL */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
          <div className="w-6 h-6 bg-neutral-950 rounded flex items-center justify-center border border-neutral-800">
            <Bot className="w-3.5 h-3.5 text-accent-green animate-pulse" />
          </div>
          <h3 className="text-xs font-bold text-accent-green uppercase tracking-wider">
            Smart Kisan Services
          </h3>
        </div>

        {/* 2-Column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: IoT based Crop Doctor */}
          <div 
            onClick={() => navigateTo('home', 'iot_crop_doctor')}
            className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-colors group text-left"
          >
            <div className="flex flex-col gap-1.5 max-w-[70%]">
              <span className="text-[9px] text-accent-green font-mono uppercase tracking-wider">
                IoT Crop Doctor
              </span>
              <span className="text-sm font-bold text-white leading-tight group-hover:underline">
                Crop Doctor 2.0 (Sensor Fields)
              </span>
              <p className="text-[10px] text-neutral-400 leading-normal mt-0.5">
                Connected smart fields telemetry sensor grid.
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center">
              <Cpu className="w-5.5 h-5.5 text-neutral-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>

          {/* Card 2: AI based Crop Doctor */}
          <div 
            onClick={() => navigateTo('home', 'ai_crop_doctor')}
            className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-colors group text-left"
          >
            <div className="flex flex-col gap-1.5 max-w-[70%]">
              <span className="text-[9px] text-accent-green font-mono uppercase tracking-wider">
                Computer Vision Crop Doctor
              </span>
              <span className="text-sm font-bold text-white leading-tight group-hover:underline">
                Crop Doctor 2.0 (AI Leaf Scanner)
              </span>
              <p className="text-[10px] text-neutral-400 leading-normal mt-0.5">
                Diagnostic models leaf scanning and reference matrix.
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center">
              <ShieldCheck className="w-5.5 h-5.5 text-neutral-400 group-hover:scale-105 transition-transform duration-200" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. TODAY'S WEATHER WIDGET SECTION - WRAPPED CLEANLY */}
      <div className="w-full">
        <WeatherWidget />
      </div>

      {/* 5. VISITOR COUNT STATISTICS FOOTER - MINIMAL TEXT */}
      <div className="flex items-center justify-center gap-1.5 py-3 text-[11px] text-neutral-500 font-semibold font-sans">
        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
        <span>Total Visitors Counted:</span>
        <span className="digital-lcd font-bold text-white">{data?.visitorCount || 1361337}</span>
      </div>

    </div>
  );
};
