import { create } from 'zustand';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  }))
}));

export const triggerToast = (message: string, type: ToastItem['type'] = 'success') => {
  useToastStore.getState().showToast(message, type);
};
