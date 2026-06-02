'use client';

import React from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { Header } from '../components/Header';
import { Toast } from '../components/Toast';
import { VoiceController } from '../components/VoiceController';
import { useProfile } from '../hooks/useProfile';
import { ActiveTab, ActiveSubPage } from '../types/navigation';

// Tab Views
import { HomeView } from '../components/views/HomeView';
import { OtherInfoView } from '../components/views/OtherInfoView';
import { ProfileView } from '../components/views/ProfileView';

// Deep-link Subpage Views
import { IGKVRaipurView } from '../components/views/IGKVRaipurView';
import { AdvisoryView } from '../components/views/AdvisoryView';
import { IoTView } from '../components/views/IoTView';
import { AIView } from '../components/views/AIView';
import { AISelectCropView } from '../components/views/AISelectCropView';

export default function Home() {
  const { currentTab, activeSubPage } = useNavigationStore();
  const { profile } = useProfile();

  // Dynamic View Routing Portal
  const renderActiveView = () => {
    if (activeSubPage === 'igkv_raipur') {
      return <IGKVRaipurView />;
    }
    if (activeSubPage === 'advisory') {
      return <AdvisoryView />;
    }
    if (activeSubPage === 'iot_crop_doctor') {
      return <IoTView />;
    }
    if (activeSubPage === 'ai_crop_doctor') {
      return <AIView />;
    }
    if (activeSubPage === 'ai_select_crop') {
      return <AISelectCropView />;
    }

    switch (currentTab) {
      case 'other_info':
        return <OtherInfoView />;
      case 'profile':
        return <ProfileView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col font-sans overflow-x-hidden selection:bg-emerald-600/30 selection:text-accent-green transition-colors duration-200">

      {/* Dynamic Toast Notifications */}
      <Toast />

      {/* Sticky Header Top-bar with Tabs Navigation */}
      <Header />

      {/* SINGLE-COLUMN VERTICALLY FLOWING DASHBOARD CONTAINER */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-6">

        {/* MAIN SPACIOUS WORKSPACE PANEL */}
        <main className="w-full min-h-[600px] bg-card-dark border border-border rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col shadow-sm transition-colors duration-200">
          <div className="flex-1 flex flex-col justify-start">
            {renderActiveView()}
          </div>
        </main>

        {/* Compact Speech Voice Sandbox Sandbox (testing utility mounted unobtrusively at the bottom) */}
        <div className="w-full">
          <VoiceController />
        </div>

      </div>

    </div>
  );
}
