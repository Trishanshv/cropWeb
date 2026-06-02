'use client';

import React, { useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useToastStore } from '../../store/toastStore';
import { useNavigationStore } from '../../store/navigationStore';
import { Cpu, AlertTriangle, Bell, Cloud, Wind, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface IoTData {
  earlierGrownCrop: string;
  farmArea: string;
  areaUnderCrop: string;
  season: string;
  lastUpdated: string;
}

export const IoTView: React.FC = () => {
  const { profile, isLoading } = useProfile();
  const { navigateTo } = useNavigationStore();
  const { showToast } = useToastStore();
  
  const [currentTime, setCurrentTime] = useState('04:26 pm');

  // Update current time indicator dynamically
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${hours}:${minStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mock service telemetry data
  const iotMetadata: IoTData = {
    earlierGrownCrop: 'Paddy',
    farmArea: '1 acre',
    areaUnderCrop: '1 acre',
    season: 'Rabi',
    lastUpdated: '04:26 pm'
  };

  const handleTabTrigger = (tabName: string) => {
    showToast(`Loading: ${tabName} telemetry matrix...`, 'info');
  };

  const handleNextTrigger = () => {
    showToast('Navigating back to main dashboard...', 'success');
    navigateTo('home', 'none');
  };

  if (isLoading || !profile) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center gap-3 bg-card-dark border border-border rounded-xl animate-pulse">
        <Cpu className="w-6 h-6 text-primary-green animate-spin" />
        <span className="text-xs text-text-secondary font-bold">Connecting to IoT Field Nodes...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto animate-fade-in select-none text-foreground text-left transition-colors duration-200">
      
      {/* 1. TOP BRAND HEADER BANNER */}
      <div className="bg-primary-green text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-white" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            IOT - FinTech from A to Z Current Report
          </h2>
        </div>
        <span className="text-[9px] font-bold text-white uppercase tracking-widest">
          Node Connected
        </span>
      </div>

      {/* 2. WARNING ALERT CALLOUT */}
      <div className="bg-amber-950/15 border border-amber-900/30 rounded-lg p-4 flex items-start gap-3.5">
        <AlertTriangle className="w-5.5 h-5.5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">
            Device Connection Alert
          </span>
          <p className="text-[10px] text-text-secondary mt-1 leading-normal">
            No Data Found! Your field telemetry device is not connected. Please check node power or contact your Crop Doctor Device Provider.
          </p>
        </div>
      </div>

      {/* 3. FARMER DEMOGRAPHICS TABLE */}
      <div className="bg-card-dark border border-border rounded-lg p-4 flex flex-col gap-2">
        <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider mb-1">
          Farmer Dossier & Location Metadata
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2">
            <span className="text-text-secondary">Farmer Name</span>
            <span className="font-bold text-foreground">{profile.name}</span>
          </div>

          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2">
            <span className="text-text-secondary">Grown Crop</span>
            <span className="font-bold text-accent-green">{profile.crops[0]?.name || 'Chickpea'}</span>
          </div>

          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2">
            <span className="text-text-secondary">Earlier Grown Crop</span>
            <span className="font-bold text-foreground">{iotMetadata.earlierGrownCrop}</span>
          </div>

          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2">
            <span className="text-text-secondary">Farm Area Size</span>
            <span className="font-bold text-foreground">{iotMetadata.farmArea}</span>
          </div>

          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2">
            <span className="text-text-secondary">Area Under Crop</span>
            <span className="font-bold text-foreground">{iotMetadata.areaUnderCrop}</span>
          </div>

          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2">
            <span className="text-text-secondary">Season Type</span>
            <span className="font-bold text-foreground">{iotMetadata.season}</span>
          </div>

          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 pr-2 sm:col-span-2">
            <span className="text-text-secondary">Location address</span>
            <span className="font-bold text-foreground truncate max-w-[240px]" title={profile.userInfo.address}>
              {profile.userInfo.address}
            </span>
          </div>
        </div>
      </div>

      {/* 4. ABOVE GROUND PARAMETERS BOX */}
      <div className="flex flex-col gap-2.5 p-4 bg-card-dark border border-border rounded-lg">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-1">
          Above Ground Parameter
        </h3>

        <div className="flex flex-col gap-3 mt-1.5">
          {/* Row 1: Temp */}
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-text-secondary" />
              <span className="text-xs font-medium text-text-secondary">Temperature (AVG)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-foreground">- °C</span>
              <Bell className="w-3.5 h-3.5 text-text-secondary cursor-pointer hover:text-accent-green" onClick={() => handleTabTrigger('Temperature alerts')} />
            </div>
          </div>

          {/* Row 2: Relative Humidity */}
          <div className="flex flex-col gap-1 border-b border-border/40 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-text-secondary" />
                <span className="text-xs font-medium text-text-secondary">Relative humidity (AVG)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-foreground">- %</span>
                <Bell className="w-3.5 h-3.5 text-text-secondary cursor-pointer hover:text-accent-green" onClick={() => handleTabTrigger('Humidity alerts')} />
              </div>
            </div>
            {/* Embedded relative alert warning */}
            <div className="flex items-center gap-1.5 mt-1 text-[9px] text-text-secondary">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>We didn't get any notification alert for any of the sensors.</span>
            </div>
          </div>

          {/* Row 3: Wind Velocity */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-text-secondary" />
              <span className="text-xs font-medium text-text-secondary">Wind Velocity (AVG)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-foreground">- %</span>
              <Bell className="w-3.5 h-3.5 text-text-secondary cursor-pointer hover:text-accent-green" onClick={() => handleTabTrigger('Wind alerts')} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. BELOW GROUND PARAMETERS BOX */}
      <div className="flex flex-col gap-2.5 p-4 bg-card-dark border border-border rounded-lg">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-1">
          Below Ground Parameter
        </h3>
        
        {/* Simple placeholder */}
        <div className="text-center py-4 bg-background border border-border rounded-lg">
          <span className="text-[10px] text-text-secondary italic">
            Connecting node sensors to retrieve Soil NPK, pH, and Moisture values...
          </span>
        </div>
      </div>

      {/* 6. BOTTOM ACTIONS TABS */}
      <div className="grid grid-cols-4 gap-2 bg-background p-2 border border-border rounded-lg text-center font-bold text-[10px]">
        <button 
          onClick={() => handleTabTrigger('Parameters Details')}
          className="py-1.5 bg-card-dark hover:bg-card-dark-hover text-foreground border border-border rounded transition-colors focus:outline-none"
        >
          Parameters
        </button>
        <div className="py-1.5 bg-card-dark text-text-secondary border border-border rounded select-none truncate">
          {currentTime}
        </div>
        <button 
          onClick={() => handleTabTrigger('Active System Alerts')}
          className="py-1.5 bg-card-dark hover:bg-card-dark-hover text-foreground border border-border rounded transition-colors focus:outline-none"
        >
          Alert
        </button>
        <button 
          onClick={() => handleTabTrigger('System Advisory Bulletins')}
          className="py-1.5 bg-card-dark hover:bg-card-dark-hover text-foreground border border-border rounded transition-colors focus:outline-none"
        >
          Advisory
        </button>
      </div>

      {/* 7. NEXT >> ACTION BUTTON */}
      <button
        onClick={handleNextTrigger}
        className="w-full sm:w-48 py-2 bg-primary-green hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded transition-colors focus:outline-none self-center shadow"
      >
        <span>NEXT &gt;&gt;</span>
        <ArrowRight className="w-3.5 h-3.5 text-white" />
      </button>

    </div>
  );
};
