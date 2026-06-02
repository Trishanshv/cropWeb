'use client';

import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useToastStore } from '../../store/toastStore';
import { Phone, Mail, User2, MapPin, Camera, Edit3, X, Loader2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, isLoading, error, updateProfileInfo } = useProfile();
  const { showToast } = useToastStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit fields state
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  const [selectedCrop, setSelectedCrop] = useState<any | null>(null);

  if (isLoading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center gap-3 bg-card-dark border border-border rounded-3xl animate-pulse w-full max-w-5xl mx-auto">
        <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
        <span className="text-xs text-text-secondary font-bold">Synchronizing Profile registry...</span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full p-6 bg-red-950/20 border border-red-900/40 rounded-3xl text-center w-full max-w-5xl mx-auto select-none">
        <span className="text-xs font-bold text-red-500">Profile Registry Offline</span>
        <p className="text-xs text-text-secondary mt-2">Failed to resolve account.</p>
      </div>
    );
  }

  const handleOpenEdit = () => {
    setPhone(profile.userInfo.phone);
    setEmail(profile.userInfo.email);
    setGender(profile.userInfo.gender);
    setAddress(profile.userInfo.address);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const success = await updateProfileInfo({
      phone,
      email,
      gender,
      address
    });

    if (success) {
      showToast('Profile registry updated successfully!', 'success');
      setModalOpen(false);
    } else {
      showToast('Failed to update profile registry.', 'error');
    }
    setIsSaving(false);
  };

  const handleProfileImageEdit = () => {
    showToast('Camera trigger initiated. Simulated image capture online.', 'info');
  };

  // Rendering Crops Inline Vector drawings
  const renderCropIcon = (svgPath: string) => {
    if (svgPath === 'wheat') {
      return (
        <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18M12 5l-3 2M12 7l3 2M12 9l-3 2M12 11l3 2M12 13l-3 2M12 15l3 2M12 17l-3 2" strokeLinecap="round" />
        </svg>
      );
    } else if (svgPath === 'legume') {
      return (
        <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2c5 0 8 4 8 8s-3 12-8 12-8-8-8-12 3-8 8-8z" strokeLinecap="round" />
          <circle cx="12" cy="10" r="2.5" />
          <circle cx="12" cy="16" r="2.5" />
        </svg>
      );
    } else if (svgPath === 'safflower') {
      return (
        <svg className="w-10 h-10 text-orange-505" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" strokeLinecap="round" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto animate-fade-in select-none text-foreground">

      {/* SECTION TITLE HEADER */}
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black uppercase text-accent-green tracking-wide">
          User Settings & dossiers
        </h2>
        <span className="text-[10px] text-text-secondary font-bold tracking-widest uppercase">
          Profile Dossier
        </span>
      </div>

      {/* 2-COLUMN SPACIOUS DUAL PANELS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-left">

        {/* LEFT COLUMN: MAIN PROFILE AVATAR CARD */}
        <div className="bg-card-dark border border-border rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center relative overflow-hidden lg:col-span-1 min-h-[320px] transition-colors duration-200">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Circular Avatar Container */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-background border border-primary-green flex items-center justify-center overflow-hidden">
              <svg className="w-12 h-12 text-accent-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 00-5 5c0 2.5 1.5 3 2.5 4.5S11 19 12 19s1.5-1 2.5-2.5 2.5-2 2.5-4.5a5 5 0 00-5-5z" />
              </svg>
            </div>

            <button
              onClick={handleProfileImageEdit}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-background hover:bg-card-dark-hover border border-border flex items-center justify-center transition-colors shadow-sm focus:outline-none"
              aria-label="Upload profile image"
            >
              <Camera className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          <h3 className="text-lg font-extrabold text-foreground mt-4 tracking-wide">
            {profile.name}
          </h3>
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mt-1">
            Registered Telemetry Operator
          </span>

          <button
            onClick={handleOpenEdit}
            className="mt-5 text-xs font-bold text-accent-green hover:text-foreground uppercase tracking-widest border-b border-dashed border-primary-green hover:border-foreground pb-0.5 transition-colors focus:outline-none flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Update Profile</span>
          </button>
        </div>

        {/* RIGHT COLUMN: DETAILED PARAMETERS BLOCK */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* USER INFORMATION DETAILS CARD */}
          <div className="flex flex-col gap-3">
            <div className="w-full bg-background border border-border py-3.5 px-6 rounded-2xl flex items-center shadow-inner transition-colors duration-200">
              <span className="text-xs font-black tracking-widest text-text-secondary uppercase">
                Account Information
              </span>
            </div>

            <div className="bg-card-dark border border-border rounded-3xl p-6 shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6 transition-colors duration-200">
              {/* Row 1: Phone */}
              <div className="flex items-center gap-4 py-1.5 sm:border-none">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0 text-text-secondary border border-border shadow-sm">
                  <Phone className="w-4.5 h-4.5 text-accent-green" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary font-extrabold uppercase tracking-wider">Mobile Number</span>
                  <span className="text-sm font-extrabold text-foreground mt-0.5">{profile.userInfo.phone}</span>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="flex items-center gap-4 py-1.5 sm:border-none">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0 text-text-secondary border border-border shadow-sm">
                  <Mail className="w-4.5 h-4.5 text-accent-green" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary font-extrabold uppercase tracking-wider">Email Address</span>
                  <span className="text-sm font-extrabold text-foreground mt-0.5">{profile.userInfo.email}</span>
                </div>
              </div>

              {/* Row 3: Gender */}
              <div className="flex items-center gap-4 py-1.5 sm:border-none">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0 text-text-secondary border border-border shadow-sm">
                  <User2 className="w-4.5 h-4.5 text-accent-green" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary font-extrabold uppercase tracking-wider">Gender</span>
                  <span className="text-sm font-extrabold text-foreground mt-0.5">{profile.userInfo.gender}</span>
                </div>
              </div>

              {/* Row 4: Address */}
              <div className="flex items-center gap-4 py-1.5 sm:border-none">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0 text-text-secondary border border-border shadow-sm">
                  <MapPin className="w-4.5 h-4.5 text-accent-green" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary font-extrabold uppercase tracking-wider">Registered Location</span>
                  <span className="text-sm font-extrabold text-foreground mt-0.5">{profile.userInfo.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CROP MONITORED COLLECTION CONTAINER */}
          <div className="flex flex-col gap-3">
            {/* Capsule Header */}
            <div className="w-full bg-background border border-border py-3.5 px-6 rounded-2xl flex items-center shadow-inner transition-colors duration-200">
              <span className="text-xs font-black tracking-widest text-text-secondary uppercase">
                Active Crop Dossiers
              </span>
            </div>

            {/* Crop Grid (Spacious card wrapper) */}
            <div className="bg-card-dark border border-border rounded-3xl p-6 flex flex-wrap sm:flex-nowrap items-center justify-around gap-6 shadow-md transition-colors duration-200">
              {profile.crops.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => {
                    setSelectedCrop(crop);
                    showToast(`Opening crop dossier for ${crop.name}...`, 'info');
                  }}
                  className="flex items-center gap-4 p-4 bg-background border border-border hover:border-accent-green rounded-2xl cursor-pointer hover:scale-[1.03] transition-all duration-200 flex-1 min-w-[200px]"
                >
                  {/* Circular border wrapper */}
                  <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center shadow-inner">
                    {renderCropIcon(crop.svgPath)}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-black text-text-secondary uppercase tracking-widest">
                      {crop.type}
                    </span>
                    <span className="text-sm font-black text-foreground mt-1">
                      {crop.name}
                    </span>
                    <span className="text-[10px] text-text-secondary font-bold mt-1 font-mono italic">
                      {crop.scientificName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MOCK UPDATE PROFILE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 select-none animate-fade-in">
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Form Modal Body */}
          <div className="relative bg-card-dark border border-border w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 z-10 text-foreground flex flex-col gap-4 transition-colors duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-sm font-extrabold text-accent-green uppercase tracking-widest">
                Update Account Dossier
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-card-dark-hover transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary hover:text-foreground" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-2 text-left">
              {/* Input: Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                  Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary-green"
                  placeholder="Enter phone..."
                />
              </div>

              {/* Input: Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                  Email Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary-green"
                  placeholder="Enter email..."
                />
              </div>

              {/* Input: Gender */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary-green"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Input: Address */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                  Registered Location
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary-green resize-none"
                  placeholder="Enter location address..."
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-background border border-border hover:bg-card-dark-hover text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-primary-green border border-emerald-700 hover:bg-emerald-850 text-white flex items-center gap-1.5 shadow-md"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MONITORED CROP DETAILS TELEMETRY MODAL */}
      {selectedCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 select-none animate-fade-in">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedCrop(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Body */}
          <div className="relative bg-card-dark border border-border w-full max-w-sm rounded-3xl p-6 z-10 text-foreground flex flex-col gap-4 text-left shadow-2xl">
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <div className="flex items-center gap-2 text-accent-green">
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                  {renderCropIcon(selectedCrop.svgPath)}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {selectedCrop.name} Telemetry
                </span>
              </div>
              <button 
                onClick={() => setSelectedCrop(null)}
                className="p-1.5 rounded-lg hover:bg-card-dark-hover transition-colors focus:outline-none"
              >
                <X className="w-4 h-4 text-text-secondary hover:text-foreground" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between border-b border-border/40 pb-1.5">
                <span className="text-text-secondary">Scientific Name</span>
                <span className="font-bold italic text-foreground">{selectedCrop.scientificName}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-1.5">
                <span className="text-text-secondary">Crop Classification</span>
                <span className="font-bold text-foreground">{selectedCrop.type}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-1.5">
                <span className="text-text-secondary">Soil Moisture Index</span>
                <span className="font-bold text-accent-green">42.8% (Optimal)</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-1.5">
                <span className="text-text-secondary">Health Index (AI Check)</span>
                <span className="font-bold text-accent-green">98.2% (Healthy)</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-1.5">
                <span className="text-text-secondary">Pest Density Threshold</span>
                <span className="font-bold text-foreground">0.03% (Below Alert Line)</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-text-secondary">Satellite Node Status</span>
                <span className="font-bold text-accent-green">Active Feed Sync</span>
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-green text-white hover:bg-emerald-800 focus:outline-none transition-colors border border-emerald-700 shadow-md"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
