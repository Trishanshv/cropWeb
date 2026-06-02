'use client';

import React, { useState } from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { useToastStore } from '../store/toastStore';
import { Mic, Send, CornerDownLeft, Sparkles } from 'lucide-react';

export const VoiceController: React.FC = () => {
  const { 
    voiceProcessing, 
    voiceTranscript, 
    voiceFeedbackMessage, 
    dispatchVoiceIntent, 
    clearVoiceFeedback 
  } = useNavigationStore();

  const { showToast } = useToastStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const sampleCommands = [
    "Go to the profile page",
    "Show me weather advisory bulletins",
    "Go back",
    "Take me to other information tab"
  ];

  const handleCommandTrigger = async (commandText: string) => {
    showToast(`Simulating spoken command: "${commandText}"`, 'info');
    await dispatchVoiceIntent(commandText);
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const commandText = inputText;
    setInputText('');
    await handleCommandTrigger(commandText);
  };

  return (
    <div className="w-full bg-card-dark border border-border rounded-xl p-4 select-none text-foreground transition-colors duration-200">
      
      {/* Mini Title bar with toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-accent-green" />
          <div className="flex flex-col">
            <h4 className="text-xs font-bold flex items-center gap-1.5 leading-none">
              Voice Intent Sandbox
              <Sparkles className="w-3 h-3 text-accent-green animate-pulse" />
            </h4>
            <span className="text-[9px] text-text-secondary mt-0.5">
              Phase 1 route-dispatch testing utility (spoken keywords simulation)
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition-colors duration-150 focus:outline-none ${
            isOpen 
              ? 'bg-background border-border text-text-secondary' 
              : 'bg-primary-green hover:bg-emerald-800 border-transparent text-white'
          }`}
        >
          {isOpen ? 'Close Utility' : 'Open Test Console'}
        </button>
      </div>

      {/* Simplified, flat expandable console */}
      {isOpen && (
        <div className="mt-4 pt-3 border-t border-border flex flex-col gap-3 animate-fade-in text-left">
          
          {/* Quick Click Chips */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
              Click a mock command to dispatch:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {sampleCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCommandTrigger(cmd)}
                  disabled={voiceProcessing}
                  className="px-2 py-1 text-[10px] rounded-lg bg-background border border-border hover:border-accent-green hover:text-accent-green transition-all duration-150 text-foreground disabled:opacity-50 text-left focus:outline-none"
                >
                  "{cmd}"
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Speech input form */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2 items-center">
            <div className="flex-1 relative flex items-center bg-background border border-border rounded-lg px-2.5 focus-within:border-primary-green transition-colors">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={voiceProcessing}
                placeholder="Type spoken text (e.g. 'open profile')..."
                className="w-full bg-transparent border-none text-[11px] text-foreground focus:outline-none py-1.5 pr-10 disabled:opacity-50"
              />
              <span className="absolute right-2.5 text-[8px] text-text-secondary flex items-center gap-0.5 pointer-events-none">
                <CornerDownLeft className="w-2.5 h-2.5" />
                Enter
              </span>
            </div>
            
            <button
              type="submit"
              disabled={voiceProcessing || !inputText.trim()}
              className="p-2 rounded-lg bg-background hover:bg-card-dark-hover border border-border text-foreground disabled:opacity-50 transition-colors flex items-center justify-center focus:outline-none"
              aria-label="Send command"
            >
              <Send className="w-3.5 h-3.5 text-accent-green" />
            </button>
          </form>

          {/* Clean Output logs section */}
          {(voiceProcessing || voiceFeedbackMessage || voiceTranscript) && (
            <div className="p-3 bg-background rounded-lg border border-border flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[9px] text-text-secondary border-b border-border pb-1">
                <span className="font-bold uppercase tracking-wider text-accent-green">
                  {voiceProcessing ? 'Parsing spoken keywords...' : 'Assistant Response'}
                </span>
                {voiceFeedbackMessage && (
                  <button 
                    onClick={clearVoiceFeedback}
                    className="hover:text-foreground font-semibold"
                  >
                    Clear Log
                  </button>
                )}
              </div>

              {/* Spoken transcript log */}
              {voiceTranscript && (
                <div className="text-[10px] text-foreground italic font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  <span>Transcript: "{voiceTranscript}"</span>
                </div>
              )}

              {/* Simple processing indicator */}
              {voiceProcessing && (
                <div className="flex items-center gap-1.5 py-0.5">
                  <span className="text-[9px] text-text-secondary animate-pulse italic">Thinking...</span>
                </div>
              )}

              {/* Feedback text */}
              {!voiceProcessing && voiceFeedbackMessage && (
                <div className="text-[10px] text-foreground font-medium pl-3 border-l border-primary-green leading-relaxed">
                  {voiceFeedbackMessage}
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
