'use client';

import React from 'react';
import { useToastStore } from '../store/toastStore';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-neutral-900/90 border-neutral-700 text-white';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          bgColor = 'bg-emerald-950/95 border-emerald-800/50 text-emerald-100';
          Icon = CheckCircle2;
          iconColor = 'text-accent-green';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-950/95 border-amber-800/50 text-amber-100';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          bgColor = 'bg-red-950/95 border-red-900/50 text-red-100';
          Icon = XCircle;
          iconColor = 'text-red-400';
        }

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl pointer-events-auto transition-all duration-300 animate-fade-in ${bgColor}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
            <div className="flex-1 text-sm font-medium leading-tight">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
