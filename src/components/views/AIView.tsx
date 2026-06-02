'use client';

import React, { useState } from 'react';
import { useToastStore } from '../../store/toastStore';
import { useNavigationStore } from '../../store/navigationStore';
import { Camera, Image as ImageIcon, Sparkles, Bug, Cpu } from 'lucide-react';

export const AIView: React.FC = () => {
  const { showToast } = useToastStore();
  const { navigateTo } = useNavigationStore();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleAction = (type: 'camera' | 'gallery') => {
    showToast(`Triggered device ${type}...`, 'info');
  };

  const handleScan = () => {
    setScanning(true);
    setScanResult(null);
    showToast('AI Diagnostic scanner initiated...', 'info');

    setTimeout(() => {
      setScanning(false);
      setScanResult('Diagnostic: Ladybug (Coccinellidae) detected. Condition: Healthy / Beneficial Insect.');
      showToast('AI Leaf Scan Completed!', 'success');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto animate-fade-in select-none text-foreground text-left transition-colors duration-200">
      
      {/* 1. TOP BRAND HEADER */}
      <div className="bg-primary-green text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-white" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            Identify Insects and Disease Through AI
          </h2>
        </div>
        <span className="text-[9px] font-bold text-white uppercase tracking-widest">
          AI Diagnostic Portal
        </span>
      </div>

      {/* 2. CHIPS PANEL - CAMERA & GALLERY (CIRCULAR STYLE) */}
      <div className="flex items-center justify-center gap-8 py-3 bg-card-dark border border-border rounded-lg transition-colors duration-200">
        {/* Camera */}
        <button
          onClick={() => handleAction('camera')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-full bg-background border border-border group-hover:border-accent-green hover:bg-card-dark-hover flex items-center justify-center transition-colors">
            <Camera className="w-5 h-5 text-text-secondary group-hover:text-accent-green transition-colors" />
          </div>
          <span className="text-[10px] font-bold text-text-secondary group-hover:text-foreground">CAMERA</span>
        </button>

        {/* Gallery */}
        <button
          onClick={() => handleAction('gallery')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-full bg-background border border-border group-hover:border-accent-green hover:bg-card-dark-hover flex items-center justify-center transition-colors">
            <ImageIcon className="w-5 h-5 text-text-secondary group-hover:text-accent-green transition-colors" />
          </div>
          <span className="text-[10px] font-bold text-text-secondary group-hover:text-foreground">GALLERY</span>
        </button>
      </div>

      {/* 3. SIMPLIFIED MOCK SCANNER PORTABLE FRAME */}
      <div className="bg-card-dark border border-border rounded-lg p-5 flex flex-col items-center justify-center relative overflow-hidden min-h-[220px] transition-colors duration-200">
        
        {/* Target Box */}
        <div className="w-32 h-32 rounded-full bg-background border border-border flex items-center justify-center relative overflow-hidden">
          <Bug className={`w-14 h-14 ${scanning ? 'text-accent-green animate-pulse' : 'text-amber-600'}`} />
          
          {/* Flat scanline separator (only when scanning) */}
          {scanning && (
            <div className="absolute left-0 right-0 h-0.5 bg-accent-green top-1/2 animate-bounce" />
          )}
        </div>

        {/* Result log */}
        {scanResult && (
          <div className="mt-4 p-3 bg-background border border-border rounded-lg text-[10px] text-text-secondary leading-relaxed w-full">
            <span className="text-accent-green font-bold block mb-0.5">AI Scan Results:</span>
            {scanResult}
          </div>
        )}
      </div>

      {/* 4. IDENTIFY INSECT FROM CROP CARD */}
      <div className="bg-card-dark border border-border rounded-xl p-4 flex flex-col gap-2 transition-colors duration-200">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-accent-green animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            Identify Insect from Crop
          </span>
        </div>
        <p className="text-[10px] text-text-secondary leading-relaxed">
          Perform a diagnostic check tailored to a specific crop type to quickly catalog pests and diseases.
        </p>
        <button
          onClick={() => navigateTo('home', 'ai_select_crop')}
          className="w-full py-1.5 bg-background hover:bg-card-dark-hover border border-border hover:border-accent-green text-[10px] font-bold uppercase tracking-wider text-foreground rounded transition-all focus:outline-none"
        >
          Select Crop
        </button>
      </div>

      {/* 5. SCAN INSECT ACTION TRIGGER */}
      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full py-2 bg-primary-green hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded transition-colors focus:outline-none disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span>{scanning ? 'SCANNING...' : 'SCAN INSECT'}</span>
      </button>

    </div>
  );
};
