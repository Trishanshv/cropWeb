import { create } from 'zustand';
import { NavigationState, NavigationActions, ActiveTab, ActiveSubPage } from '../types/navigation';

export const useNavigationStore = create<NavigationState & NavigationActions>((set, get) => ({
  // Core navigation state
  currentTab: 'home',
  activeSubPage: 'none',
  historyStack: [],
  sidebarOpen: false,

  // Voice assistant state
  voiceProcessing: false,
  voiceTranscript: '',
  voiceFeedbackMessage: null,

  // Standard route actions
  navigateTo: (tab: ActiveTab, subPage: ActiveSubPage = 'none') => {
    const currentTab = get().currentTab;
    const activeSubPage = get().activeSubPage;
    
    // Add current view to history if it is different
    const lastHistory = get().historyStack[get().historyStack.length - 1];
    const shouldPush = !lastHistory || lastHistory.tab !== currentTab || lastHistory.subPage !== activeSubPage;
    
    set((state) => ({
      currentTab: tab,
      activeSubPage: subPage,
      sidebarOpen: false,
      historyStack: shouldPush 
        ? [...state.historyStack, { tab: currentTab, subPage: activeSubPage }] 
        : state.historyStack
    }));
  },

  goBack: () => {
    const stack = get().historyStack;
    if (stack.length === 0) {
      // If stack is empty and we are in a subpage, return to current tab with subpage 'none'
      if (get().activeSubPage !== 'none') {
        set({ activeSubPage: 'none' });
      }
      return;
    }

    const newStack = [...stack];
    const prevView = newStack.pop();

    if (prevView) {
      set({
        currentTab: prevView.tab,
        activeSubPage: prevView.subPage,
        historyStack: newStack,
        sidebarOpen: false
      });
    }
  },

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Centralized Intent Processing (External/Voice Assist Injection ready)
  dispatchVoiceIntent: async (transcript: string) => {
    set({ voiceProcessing: true, voiceTranscript: transcript, voiceFeedbackMessage: null });
    
    // Artificial delay to simulate intent extraction
    await new Promise((resolve) => setTimeout(resolve, 800));

    const normalized = transcript.toLowerCase().trim();
    let targetTab: ActiveTab | null = null;
    let targetSubPage: ActiveSubPage | null = null;
    let message = '';

    // Simple robust keyword-based NLP matcher
    if (normalized.includes('other info') || normalized.includes('information') || normalized.includes('dashboard') || normalized.includes('menu')) {
      targetTab = 'other_info';
      message = 'Navigated to Other Information dashboard.';
    } else if (normalized.includes('home') || normalized.includes('main page') || normalized.includes('welcome')) {
      targetTab = 'home';
      targetSubPage = 'none';
      message = 'Returned to the Home screen.';
    } else if (normalized.includes('profile') || normalized.includes('tester') || normalized.includes('my info') || normalized.includes('user info')) {
      targetTab = 'profile';
      message = 'Opened your user profile.';
    } else if (normalized.includes('igkv') || normalized.includes('university') || normalized.includes('raipur') || normalized.includes('college info')) {
      targetTab = 'home';
      targetSubPage = 'igkv_raipur';
      message = 'Opening IGKV Raipur University Portal.';
    } else if (normalized.includes('advisory') || normalized.includes('bulletin') || normalized.includes('weather report') || normalized.includes('pdf')) {
      targetTab = 'home';
      targetSubPage = 'advisory';
      message = 'Displaying Weather Bulletins and Agro Advisory.';
    } else if (normalized.includes('back') || normalized.includes('return') || normalized.includes('previous')) {
      get().goBack();
      set({ 
        voiceProcessing: false, 
        voiceFeedbackMessage: 'Returned to the previous page.' 
      });
      return;
    } else {
      // Unrecognized intent
      set({
        voiceProcessing: false,
        voiceFeedbackMessage: 'Sorry, I couldn\'t understand that navigation request.'
      });
      return;
    }

    // Apply the navigation change programmatically
    if (targetTab) {
      get().navigateTo(targetTab, targetSubPage || 'none');
    }

    set({
      voiceProcessing: false,
      voiceFeedbackMessage: message
    });
  },

  clearVoiceFeedback: () => set({ voiceFeedbackMessage: null, voiceTranscript: '' })
}));

// Expose standard dispatch function that can be accessed by ANY external module / service
export const triggerExternalVoiceIntent = (transcript: string) => {
  useNavigationStore.getState().dispatchVoiceIntent(transcript);
};
