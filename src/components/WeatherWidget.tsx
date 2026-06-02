'use client';

import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { CloudRain, Sun, CloudLightning, RefreshCw, Navigation, Umbrella, Droplet, Wind } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { data, isLoading, error, requestBrowserLocation } = useWeather();

  if (isLoading) {
    return (
      <div className="w-full py-8 flex flex-col items-center justify-center gap-3 bg-card-dark border border-border rounded-2xl animate-pulse">
        <RefreshCw className="w-6 h-6 text-primary-green animate-spin" />
        <span className="text-xs text-text-secondary font-bold">Synchronizing Weather telemetry...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full p-4 bg-red-950/15 border border-red-900/30 rounded-2xl flex flex-col gap-2 select-none text-left">
        <span className="text-xs font-bold text-red-500">Weather Sync Offline</span>
        <p className="text-[11px] text-text-secondary leading-tight">
          {error || 'Could not fetch remote satellite meteorology.'}
        </p>
        <button
          onClick={() => requestBrowserLocation()}
          className="mt-2 py-1.5 px-3 rounded-lg bg-background hover:bg-card-dark-hover border border-border text-xs font-bold text-foreground transition-colors focus:outline-none"
        >
          Retry with GPS Location
        </button>
      </div>
    );
  }

  const { summary, details } = data;

  return (
    <div className="w-full flex flex-col gap-5 select-none animate-fade-in text-left text-foreground">
      
      {/* ----------------- SECTION 1: TODAY'S WEATHER ----------------- */}
      <div className="flex flex-col gap-2.5">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-background rounded flex items-center justify-center border border-border">
              <CloudRain className="w-3.5 h-3.5 text-accent-green" />
            </div>
            <h3 className="text-xs font-bold text-accent-green uppercase tracking-wider">
              Today's Weather
            </h3>
          </div>
          
          <button
            onClick={requestBrowserLocation}
            className="flex items-center gap-1.5 px-2 py-1 text-[9px] bg-background hover:bg-card-dark-hover border border-border rounded text-text-secondary hover:text-foreground font-bold transition-colors focus:outline-none"
            aria-label="Refresh GPS location"
          >
            <Navigation className="w-2.5 h-2.5 text-primary-green" />
            <span>Use GPS</span>
          </button>
        </div>

        {/* Dynamic Theme Weather Card */}
        <div className="bg-card-dark border border-border rounded-2xl p-5 flex items-center justify-between relative overflow-hidden transition-colors duration-200">
          {/* Left Text */}
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider italic">
              Current Location :
            </span>
            <span className="text-xs text-text-secondary font-semibold mt-1">
              {summary.date}
            </span>
            <span className="text-sm text-foreground font-extrabold tracking-wide">
              {summary.location}
            </span>
            {/* Large Temperature Display */}
            <div className="flex items-start mt-2 text-foreground">
              <span className="text-5xl font-black font-sans leading-none tracking-tighter">
                {Math.floor(summary.temperature)}
              </span>
              <span className="text-2xl font-extrabold leading-none">.</span>
              <span className="text-2xl font-extrabold leading-none mt-1">
                {(summary.temperature % 1).toFixed(2).substring(2)}
              </span>
              <span className="text-xl font-light ml-0.5 mt-0.5">°</span>
            </div>
          </div>

          {/* Right Weather Sky Graphics */}
          <div className="flex flex-col items-center justify-center gap-1 z-10">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border border-border animate-pulse">
              <Sun className="w-10 h-10 text-amber-500 animate-spin" style={{ animationDuration: '25s' }} />
            </div>
            <span className="text-[10px] font-bold tracking-wider text-text-secondary mt-2 uppercase italic text-center">
              {summary.skyCondition}
            </span>
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 2: REGISTERED ADDRESS WEATHER ----------------- */}
      <div className="bg-card-dark border border-border rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden transition-colors duration-200">
        
        {/* Title Address Row */}
        <div className="flex flex-col gap-0.5 z-10">
          <span className="text-xs font-bold text-foreground tracking-wide font-sans leading-tight">
            Registered Address: {details.registeredAddress}
          </span>
          <span className="text-[9px] text-text-secondary font-semibold tracking-wider">
            {details.date}
          </span>
        </div>

        {/* Center Main Temp Row */}
        <div className="flex items-center justify-between py-2 border-y border-border z-10">
          <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center border border-border">
            <CloudLightning className="w-7 h-7 text-text-secondary" />
          </div>

          <div className="flex flex-col items-end leading-none">
            <div className="flex items-start text-foreground">
              <span className="text-4xl font-black font-sans leading-none tracking-tight">
                {details.temperature}
              </span>
              <span className="text-base font-bold mt-0.5">°C</span>
            </div>
            <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider mt-1.5 italic">
              Max Temp
            </span>
          </div>
        </div>

        {/* Detailed Grid Telemetry */}
        <div className="grid grid-cols-2 gap-3 z-10 text-foreground">
          
          {/* Item 1: Rainfall */}
          <div className="bg-background border border-border rounded-lg p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-card-dark border border-border flex items-center justify-center">
              <Umbrella className="w-4 h-4 text-accent-green" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] text-text-secondary font-bold">RainFall</span>
              <span className="text-xs text-foreground font-extrabold mt-1 flex items-center gap-1">
                {details.rainfall}
              </span>
            </div>
          </div>

          {/* Item 2: Humidity */}
          <div className="bg-background border border-border rounded-lg p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-card-dark border border-border flex items-center justify-center">
              <Droplet className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] text-text-secondary font-bold">Humidity</span>
              <span className="text-xs text-foreground font-extrabold mt-1 flex items-center gap-1">
                {details.humidity}
              </span>
            </div>
          </div>

          {/* Item 3: Max Temp */}
          <div className="bg-background border border-border rounded-lg p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-card-dark border border-border flex items-center justify-center">
              <Umbrella className="w-4 h-4 text-accent-green" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] text-text-secondary font-bold">Max Temp</span>
              <span className="text-xs text-foreground font-extrabold mt-1">
                {details.maxTemperature} °C
              </span>
            </div>
          </div>

          {/* Item 4: Min Temp */}
          <div className="bg-background border border-border rounded-lg p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-card-dark border border-border flex items-center justify-center">
              <Umbrella className="w-4 h-4 text-accent-green" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] text-text-secondary font-bold">Min Temp</span>
              <span className="text-xs text-foreground font-extrabold mt-1">
                {details.minTemperature} °C
              </span>
            </div>
          </div>

        </div>

        {/* Full width Wind telemetry span */}
        <div className="bg-background border border-border rounded-lg p-2.5 flex items-center justify-between z-10 text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-card-dark border border-border flex items-center justify-center">
              <Wind className="w-4 h-4 text-accent-green" />
            </div>
            <span className="text-[9px] text-text-secondary font-bold">Wind Speed & Direction</span>
          </div>
          <span className="text-xs text-foreground font-extrabold flex items-center gap-1.5">
            {details.windSpeed} / {details.windDirection}
          </span>
        </div>

        {/* View More indicator */}
        <div className="flex justify-end z-10">
          <span className="text-[9px] text-text-secondary hover:text-foreground font-bold tracking-wider uppercase italic cursor-pointer transition-colors">
            View More details &rarr;
          </span>
        </div>
      </div>

    </div>
  );
};
