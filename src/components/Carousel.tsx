'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Sprout, ShieldAlert, Cpu } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  desc: string;
}

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "11th Convocation Ceremony",
      subtitle: "Indira Gandhi Krishi Vishwavidyalaya",
      Icon: Award,
      accentColor: "from-blue-600 to-indigo-900",
      desc: "Celebrating excellence and scientific breakthroughs in smart agricultural leadership."
    },
    {
      id: 2,
      title: "Sustainable Agriculture & IoT",
      subtitle: "Internet of Things in Crop Health",
      Icon: Sprout,
      accentColor: "from-emerald-600 to-teal-900",
      desc: "Deploying micro-sensors to track real-time moisture, soil pH, and NPK indices."
    },
    {
      id: 3,
      title: "AI-Powered Disease Diagnosis",
      subtitle: "Computer Vision Model Diagnostics",
      Icon: ShieldAlert,
      accentColor: "from-rose-600 to-red-950",
      desc: "Instantly scanning leaf lesions and pest vectors using high-accuracy neural layers."
    },
    {
      id: 4,
      title: "Integrated Mandi Trading",
      subtitle: "Real-time Wholesale Pricing",
      Icon: Cpu,
      accentColor: "from-amber-600 to-amber-950",
      desc: "Unlocking direct farmer-to-buyer crop sales and live market bidding tables."
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto play carousel slides
  useEffect(() => {
    const timer = setInterval(handleNext, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg select-none group border border-neutral-800 bg-neutral-900">
      {/* Slide Content wrapper */}
      <div 
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full h-full flex-shrink-0 bg-gradient-to-br ${slide.accentColor} p-6 flex flex-col justify-between relative overflow-hidden`}
          >
            {/* Background Vector Matrix graphics */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="flex justify-between items-start z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                  Exhibition Showcase
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl text-white leading-tight mt-1">
                  {slide.title}
                </h3>
                <span className="text-xs text-neutral-200/90 italic font-medium mt-0.5">
                  {slide.subtitle}
                </span>
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <slide.Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            <p className="text-xs text-white/80 max-w-md mt-2 z-10 leading-relaxed font-sans line-clamp-2">
              {slide.desc}
            </p>

            {/* Bottom space for indicators */}
            <div className="h-2" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'w-4 bg-accent-green' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
