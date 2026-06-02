export type ActiveTab = 'other_info' | 'home' | 'profile';

export type ActiveSubPage = 'none' | 'igkv_raipur' | 'advisory' | 'iot_crop_doctor' | 'ai_crop_doctor' | 'ai_select_crop';

export interface NavigationState {
  currentTab: ActiveTab;
  activeSubPage: ActiveSubPage;
  historyStack: { tab: ActiveTab; subPage: ActiveSubPage }[];
  sidebarOpen: boolean;

  // Simulated Voice Assistant State
  voiceProcessing: boolean;
  voiceTranscript: string;
  voiceFeedbackMessage: string | null;
}

export interface NavigationActions {
  navigateTo: (tab: ActiveTab, subPage?: ActiveSubPage) => void;
  goBack: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Voice/LLM Intent Injection Actions
  dispatchVoiceIntent: (transcript: string) => Promise<void>;
  clearVoiceFeedback: () => void;
}

export interface VoiceIntentPayload {
  intent: 'navigate_tab' | 'navigate_subpage' | 'go_back' | 'unknown';
  targetTab?: ActiveTab;
  targetSubPage?: ActiveSubPage;
  responseMessage: string;
}
