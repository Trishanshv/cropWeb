'use client';

import React from 'react';
import { useAdvisory } from '../../hooks/useAdvisory';
import { useToastStore } from '../../store/toastStore';
import { FileText, Calendar, RefreshCw, Download, Layers, ShieldCheck } from 'lucide-react';

export const AdvisoryView: React.FC = () => {
  const { bulletins, isLoading, error, refetch } = useAdvisory();
  const { showToast } = useToastStore();

  const handleDownload = (label: string) => {
    showToast(`Downloading bulletin PDF: ${label}`, 'success');
  };

  if (isLoading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center gap-3 bg-card-dark border border-border rounded-xl animate-pulse">
        <RefreshCw className="w-6 h-6 text-primary-green animate-spin" />
        <span className="text-xs text-text-secondary font-bold">Retrieving weather bulletins...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-5 bg-red-900/10 border border-red-900/30 rounded-xl text-center">
        <span className="text-xs font-bold text-red-500">Sync Offline</span>
        <p className="text-xs text-text-secondary mt-1">{error}</p>
        <button
          onClick={() => refetch()}
          className="mt-3 py-1.5 px-3 rounded-lg bg-background hover:bg-card-dark-hover text-xs font-bold text-foreground border border-border transition-colors focus:outline-none"
        >
          Retry Sync
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full mx-auto animate-fade-in select-none text-foreground text-left">
      
      {/* SECTION HEADER TITLE */}
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent-green" />
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider">
            Satellite Agro-Meteorological Advisories
          </h2>
        </div>
        <span className="text-[9px] text-text-secondary font-bold tracking-widest uppercase">
          Weather Feed
        </span>
      </div>

      {/* LIGHTWEIGHT BOARD CONTAINER PANEL */}
      <div className="bg-subpage-tan border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-4 text-foreground transition-colors duration-200">
        
        {/* Section Header inside */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/25 pb-3 gap-1.5">
          <div className="flex items-center gap-2 text-foreground/90">
            <ShieldCheck className="w-4 h-4 text-primary-green" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Active Regional Bulletins
            </h3>
          </div>
          <span className="text-[8px] font-bold bg-background/10 border border-foreground/10 px-2 py-0.5 rounded text-foreground/95 uppercase tracking-wider self-start sm:self-auto">
            Satellite Synced Feed
          </span>
        </div>

        {/* 
          SPACIOUS GRID SYSTEM
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bulletins.map((item) => (
            <div
              key={item.id}
              className="bg-card-dark border border-border hover:border-primary-green/45 rounded-lg p-4 flex flex-col justify-between transition-colors min-h-[140px]"
            >
              <div className="flex flex-col gap-2">
                {/* Title */}
                <h4 className="text-xs font-bold leading-normal text-foreground line-clamp-3">
                  {item.title}
                </h4>

                {/* Sub-row metadata */}
                <div className="flex items-center gap-3 text-[9px] text-text-secondary font-bold border-b border-border pb-2 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-text-secondary" />
                    <span>{item.publishDate}</span>
                  </div>
                  <span className="bg-background border border-border px-1.5 py-0.25 rounded text-[8px]">
                    {item.region}
                  </span>
                </div>
              </div>

              {/* PDF Clickable Link Row */}
              <div className="flex items-center justify-between mt-3 gap-2">
                <button
                  onClick={() => handleDownload(item.pdfLabel)}
                  className="flex items-center gap-1.5 text-xs text-foreground/90 hover:text-accent-green transition-colors focus:outline-none truncate"
                >
                  <FileText className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span className="underline truncate text-[10px]">{item.pdfLabel}</span>
                </button>
                
                <button
                  onClick={() => handleDownload(item.pdfLabel)}
                  className="w-7 h-7 rounded-md bg-background hover:bg-card-dark-hover border border-border flex items-center justify-center transition-colors flex-shrink-0 focus:outline-none"
                  aria-label="Download PDF"
                >
                  <Download className="w-3 h-3 text-text-secondary hover:text-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
