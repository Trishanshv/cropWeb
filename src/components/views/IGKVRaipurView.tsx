'use client';

import React, { useState } from 'react';
import { useIGKV } from '../../hooks/useIGKV';
import { useToastStore } from '../../store/toastStore';
import { 
  GraduationCap, BookOpen, ChevronLeft, ChevronRight, Play, Pause, ChevronDown, Check 
} from 'lucide-react';

export const IGKVRaipurView: React.FC = () => {
  const { data, isLoading, error, incrementVisitorCount } = useIGKV();
  const { showToast } = useToastStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ['All', 'Recruitment', 'Press Release', 'Notice', 'Event'];

  if (isLoading || !data) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center gap-3 bg-card-dark border border-border rounded-xl animate-pulse">
        <GraduationCap className="w-6 h-6 text-primary-green animate-bounce" />
        <span className="text-xs text-text-secondary font-bold">Synchronizing University Ledger...</span>
      </div>
    );
  }

  const handleLinkClick = (name: string, url: string) => {
    showToast(`Redirecting to target page: ${name}...`, 'info');
    incrementVisitorCount();
  };

  const handleDropdownSelect = (cat: string) => {
    setSelectedCategory(cat);
    setDropdownOpen(false);
    showToast(`Filtered latest updates: ${cat}`, 'success');
  };

  const slides = [
    {
      title: "Indira Gandhi Krishi Vishwavidyalaya",
      subject: "11th Convocation Ceremony",
      date: "Friday 15 May 2026 | Krishi Mandapam Campus",
      info: "Celebrating achievements in agricultural research and technology"
    },
    {
      title: "Smart Agriculture Exhibition",
      subject: "Precision Crop Inspection Forums",
      date: "16-18 May 2026 | Research Hall 2",
      info: "Pioneering AI-driven diagnostic leaf inspections in Central India"
    }
  ];

  // Simple category filtering logic
  const filteredNews = data.news.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto animate-fade-in select-none text-foreground text-left transition-colors duration-200">
      
      {/* TOP BRAND IDENTITY HEADER */}
      <div className="bg-primary-green text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-white" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            Indira Gandhi Krishi Vishwavidyalaya
          </h2>
        </div>
        <span className="text-[9px] font-bold text-white uppercase tracking-widest">
          Crop Doctor 2.0
        </span>
      </div>

      {/* 1. MOCK VIDEO PLAYER BLOCK */}
      <div className="w-full aspect-video bg-black flex items-center justify-center relative border border-border rounded-lg overflow-hidden group">
        <button
          onClick={() => {
            setIsVideoPlaying(!isVideoPlaying);
            showToast(isVideoPlaying ? 'Video paused.' : 'Streaming governor convocation speech...', 'info');
          }}
          className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 flex items-center justify-center text-white focus:outline-none transition-colors duration-150"
          aria-label="Play video"
        >
          {isVideoPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white pl-0.5" />}
        </button>
        <span className="absolute bottom-2.5 left-2.5 text-[9px] text-white font-bold bg-neutral-900/80 px-2 py-0.5 rounded border border-border">
          {isVideoPlaying ? '0:04 / 0:18' : 'VIDEO | 0:00 / 0:18'}
        </span>
      </div>

      {/* 2. PRESS RELEASE TEXT & SLIDES */}
      <div className="flex flex-col gap-3.5 p-4 bg-card-dark border border-border rounded-lg">
        <span className="text-[9px] text-accent-green font-bold uppercase tracking-wider">
          Press Release Excerpt
        </span>
        
        <div className="flex flex-col leading-relaxed border-b border-border/40 pb-3">
          <h3 className="text-xs font-bold text-foreground">
            नए कृषि अनुसंधानों और नवाचारों से कृषि स्नातक बन सकते हैं देश की तरक्की में भागीदार
          </h3>
          <p className="text-[10px] text-text-secondary mt-1.5 leading-normal">
            रायपुर, दिनांक 15 मई 2026। राज्यपाल श्री रमेन डेका ने कहा है कि देश के विकास में कृषि विश्वविद्यालयों की इसमें विशेष भूमिका है। राज्यपाल ने इंदिरा गांधी कृषि विश्वविद्यालय के 11वें दीक्षांत समारोह को संबोधित करते हुए कहा कि नए कृषि अनुसंधानों और नवाचारों से स्नातक कृषि विकास में तेजी लाएंगे...
          </p>
        </div>

        {/* Slide Banner Area */}
        <div className="bg-background border border-border rounded-lg p-3.5 flex flex-col justify-between min-h-[136px] relative">
          <div>
            <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider block">
              {slides[activeSlide].title}
            </span>
            <span className="text-xs font-bold text-foreground block mt-1">
              {slides[activeSlide].subject}
            </span>
            <span className="text-[9px] text-accent-green font-bold block mt-0.5">
              {slides[activeSlide].date}
            </span>
          </div>

          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-border/45">
            <span className="text-[10px] text-text-secondary italic truncate pr-4">
              {slides[activeSlide].info}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                className="p-1 rounded bg-card-dark border border-border hover:bg-card-dark-hover"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                className="p-1 rounded bg-card-dark border border-border hover:bg-card-dark-hover"
                aria-label="Next banner"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleLinkClick('Full Press Archives', 'https://igkv.ac.in')}
          className="py-1.5 px-3.5 bg-[#a37c4c]/20 hover:bg-[#a37c4c]/30 text-[#e5c158] border border-[#a37c4c]/35 text-[9px] font-bold uppercase tracking-wider self-center rounded transition-colors focus:outline-none"
        >
          ALL PRESS
        </button>
      </div>

      {/* 3. NEWS & NOTICES WITH FILTER */}
      <div className="flex flex-col gap-3 p-4 bg-card-dark border border-border rounded-lg">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-1">
          News & Notices
        </h3>

        {/* Dropdown selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-background border border-border rounded px-3 py-1.5 text-xs text-foreground flex items-center justify-between focus:outline-none"
          >
            <span>Category: {selectedCategory}</span>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-card-dark border border-border rounded mt-1 z-35 shadow-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleDropdownSelect(cat)}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-card-dark-hover text-foreground flex items-center justify-between border-b border-border/30 last:border-none focus:outline-none"
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-accent-green" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bullet News List Container */}
        <div className="bg-background border border-border rounded-lg p-3 flex flex-col gap-2">
          <span className="text-[9px] font-bold text-text-secondary uppercase">
            Latest Bulletin Feed
          </span>
          <ul className="flex flex-col gap-3 mt-1">
            {filteredNews.map((item) => (
              <li
                key={item.id}
                className="text-xs text-foreground border-b border-border pb-2.5 last:border-none last:pb-0 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between text-[8px] text-text-secondary font-bold">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <p className="font-semibold text-foreground/95">{item.contentHindi}</p>
                <button
                  onClick={() => handleLinkClick(`Bulletin details for: ${item.id}`, 'https://igkv.ac.in')}
                  className="text-[9px] text-accent-green hover:underline font-bold self-start mt-0.5"
                >
                  Read more &rarr;
                </button>
              </li>
            ))}
            {filteredNews.length === 0 && (
              <span className="text-[10px] text-text-secondary italic">No bulletins found in this category.</span>
            )}
          </ul>
        </div>

        <button
          onClick={() => handleLinkClick('Comprehensive news bulletin list', 'https://igkv.ac.in')}
          className="py-1.5 px-3.5 bg-[#e5c158] hover:bg-[#d4b049] text-black text-[9px] font-bold uppercase tracking-wider self-center rounded transition-colors focus:outline-none"
        >
          More News
        </button>
      </div>

      {/* 4. GOVERNOR/CHANCELLOR QUOTE SECTION */}
      <div className="flex flex-col items-center justify-center p-6 bg-card-dark border border-border rounded-lg gap-3 text-center">
        <p className="text-[11px] text-text-secondary italic max-w-lg leading-relaxed">
          "New developments and advancements will bring new opportunities for the state and the youth of Chhattisgarh."
        </p>
        
        {/* Simple circular avatar/placeholder */}
        <div className="w-14 h-14 rounded-full bg-background border border-primary-green flex items-center justify-center overflow-hidden">
          <svg className="w-8 h-8 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-xs font-bold text-foreground">Shri Ramen Deka</span>
          <span className="text-[9px] text-accent-green font-bold uppercase mt-1">
            Hon'ble Governor of Chhattisgarh and Chancellor
          </span>
        </div>
      </div>

      {/* 5. ACADEMIC STATS STRIP (VERTICALLY STACKED) */}
      <div className="flex flex-col gap-2.5 p-4 bg-card-dark border border-border rounded-lg text-left">
        <span className="text-[9px] text-text-secondary font-bold uppercase">
          Offering a comprehensive academic environment
        </span>
        
        <div className="flex flex-col gap-3 mt-1.5">
          <div className="flex flex-col border-b border-border/40 pb-2">
            <span className="text-xl font-bold text-foreground font-mono leading-none">
              {data.stats.facultyCount}
            </span>
            <span className="text-[9px] text-text-secondary font-bold uppercase mt-1">
              Faculty Members
            </span>
          </div>

          <div className="flex flex-col border-b border-border/40 pb-2">
            <span className="text-xl font-bold text-foreground font-mono leading-none">
              {data.stats.departmentCount}
            </span>
            <span className="text-[9px] text-text-secondary font-bold uppercase mt-1">
              Affiliated Colleges / Departments
            </span>
          </div>

          <div className="flex flex-col border-b border-border/40 pb-2">
            <span className="text-xl font-bold text-foreground font-mono leading-none">
              {data.stats.maleCount}
            </span>
            <span className="text-[9px] text-text-secondary font-bold uppercase mt-1">
              Male Students
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground font-mono leading-none">
              {data.stats.femaleCount}
            </span>
            <span className="text-[9px] text-text-secondary font-bold uppercase mt-1">
              Female Students
            </span>
          </div>
        </div>
      </div>

      {/* 6. LATEST EVENTS SEATING PLAN CARD */}
      <div className="flex flex-col gap-3 p-4 bg-card-dark border border-border rounded-lg">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-1">
          Latest Events
        </h3>
        
        {/* Seating blueprint frame layout */}
        <div className="bg-background border border-border rounded-lg p-3 text-foreground text-[10px]">
          <div className="flex items-center justify-between border-b border-border pb-2 font-bold text-accent-green uppercase tracking-wider text-[9px]">
            <span>University seating layout Blueprint</span>
            <span>11th Convocation Ceremony</span>
          </div>
          
          <div className="w-full py-3 px-2 bg-card-dark rounded-lg flex flex-col items-center gap-2.5 border border-border mt-3">
            <div className="w-1/2 py-1 bg-red-950/20 border border-red-900/40 rounded text-[9px] font-bold text-red-500 text-center uppercase tracking-widest">
              STAGE
            </div>

            <div className="grid grid-cols-3 gap-2 w-full text-center mt-1 text-[8px] font-bold">
              <div className="p-1.5 bg-emerald-950/20 border border-emerald-900/30 rounded text-accent-green truncate">
                Guests Seating
              </div>
              <div className="p-1.5 bg-amber-950/20 border border-amber-900/30 rounded text-amber-500 truncate">
                Medalists Seating
              </div>
              <div className="p-1.5 bg-blue-950/20 border border-blue-900/30 rounded text-blue-400 truncate">
                Faculty Seating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. DEPARTMENTS GRID (CLEAN & MINIMALIST) */}
      <div className="flex flex-col gap-3 p-4 bg-card-dark border border-border rounded-lg">
        <div className="border-b border-border pb-1">
          <span className="text-[9px] text-text-secondary uppercase font-bold">Our Departments</span>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mt-0.5">
            Unleashing the Power of Learning: Specialized Streams
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
          {data.departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleLinkClick(dept.name, 'https://igkv.ac.in')}
              className="bg-background hover:bg-card-dark-hover border border-border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors group"
            >
              <span className="text-xs font-bold text-foreground group-hover:text-accent-green transition-colors">
                {dept.name}
              </span>
              <BookOpen className="w-4 h-4 text-text-secondary flex-shrink-0" />
            </div>
          ))}
          {/* Static entries for completeness to mirror Figma image */}
          <div
            onClick={() => handleLinkClick('Agriculture Entomology', 'https://igkv.ac.in')}
            className="bg-background hover:bg-card-dark-hover border border-border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-foreground group-hover:text-accent-green transition-colors">
              Agriculture Entomology
            </span>
            <BookOpen className="w-4 h-4 text-text-secondary flex-shrink-0" />
          </div>
          <div
            onClick={() => handleLinkClick('Agricultural Extension Education', 'https://igkv.ac.in')}
            className="bg-background hover:bg-card-dark-hover border border-border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-foreground group-hover:text-accent-green transition-colors">
              Agricultural Extension Education
            </span>
            <BookOpen className="w-4 h-4 text-text-secondary flex-shrink-0" />
          </div>
          <div
            onClick={() => handleLinkClick('Plant Pathology', 'https://igkv.ac.in')}
            className="bg-background hover:bg-card-dark-hover border border-border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-foreground group-hover:text-accent-green transition-colors">
              Plant Pathology
            </span>
            <BookOpen className="w-4 h-4 text-text-secondary flex-shrink-0" />
          </div>
          <div
            onClick={() => handleLinkClick('Genetics and Plant Breeding', 'https://igkv.ac.in')}
            className="bg-background hover:bg-card-dark-hover border border-border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-foreground group-hover:text-accent-green transition-colors">
              Genetics and Plant Breeding
            </span>
            <BookOpen className="w-4 h-4 text-text-secondary flex-shrink-0" />
          </div>
        </div>
      </div>

    </div>
  );
};
