import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, RefreshCw, BookOpen, GraduationCap, BarChart2, Calendar, Compass, LifeBuoy, ShieldAlert } from 'lucide-react';
import { ScreenNav } from './components/StitchUI';
import WelcomeScreen from './components/WelcomeScreen';
import CycleSetupScreen from './components/CycleSetupScreen';
import DailyCheckInScreen from './components/DailyCheckInScreen';
import InsightScreen from './components/InsightScreen';
import JournalScreen from './components/JournalScreen';
import EducationHub from './components/EducationHub';
import NavigateItModule from './components/NavigateItModule';
import EmergencyHelpModal from './components/EmergencyHelpModal';
import { calculateCycleState, PHASES } from './utils/cycleCalculations';

// Initial seed entries for the standalone Journal
const INITIAL_JOURNAL_ENTRIES = [
  {
    id: 'journal-1',
    date: 'Sep 17, 2026',
    time: '08:30 PM',
    title: 'Rainy afternoon & lo-fi beats 🌧️',
    content: 'Wrapped myself like a cozy burrito with my heated blanket. Wrote down ideas for my school art project and drank hot cinnamon tea. Feeling tranquil and grounded.',
    emoji: '🍵',
    phaseId: 'luteal',
    phaseName: 'Luteal',
  },
  {
    id: 'journal-2',
    date: 'Sep 12, 2026',
    time: '04:15 PM',
    title: 'Creative spark alert! ✨',
    content: 'Came up with a really cool melody during band practice today! Everyone loved it. Felt so energized and excited about learning guitar chords.',
    emoji: '⚡',
    phaseId: 'follicular',
    phaseName: 'Follicular',
  },
  {
    id: 'journal-3',
    date: 'Sep 05, 2026',
    time: '09:00 PM',
    title: 'Warm bath & resting my body 🌸',
    content: 'Took a long lavender Epsom salt bath today. Giving myself permission to take things slow and not rush anything.',
    emoji: '🌸',
    phaseId: 'menstrual',
    phaseName: 'Menstrual',
  },
];

export default function App() {
  // STRICT: Initial state always defaults to 'welcome'
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Cycle Configuration state (persisted in localStorage)
  const [cycleConfig, setCycleConfig] = useState(() => {
    const saved = localStorage.getItem('aura_cycle_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 7);
    return {
      startDate: defaultDate.toISOString().split('T')[0],
      cycleLength: 28,
    };
  });

  // Real User Check-In Logs state (persisted in localStorage)
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('aura_logs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Standalone Journal Entries state (persisted in localStorage)
  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('aura_journal');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_JOURNAL_ENTRIES;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('aura_cycle_config', JSON.stringify(cycleConfig));
  }, [cycleConfig]);

  useEffect(() => {
    localStorage.setItem('aura_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('aura_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Compute active cycle state
  const cycleState = calculateCycleState(cycleConfig.startDate, cycleConfig.cycleLength);

  // Dynamic "Aura" Color System & Transition Specs
  const auraGradients = {
    welcome: {
      bg: 'bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100',
      blob1: 'bg-pink-300/40',
      blob2: 'bg-purple-300/40',
      blob3: 'bg-indigo-200/50',
    },
    menstrual: {
      bg: 'bg-gradient-to-br from-rose-200 via-pink-100 to-red-100',
      blob1: 'bg-rose-300/45',
      blob2: 'bg-pink-400/35',
      blob3: 'bg-red-200/40',
    },
    follicular: {
      bg: 'bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200',
      blob1: 'bg-amber-300/45',
      blob2: 'bg-orange-300/40',
      blob3: 'bg-yellow-200/50',
    },
    ovulation: {
      bg: 'bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100',
      blob1: 'bg-emerald-300/45',
      blob2: 'bg-teal-300/40',
      blob3: 'bg-cyan-200/50',
    },
    luteal: {
      bg: 'bg-gradient-to-br from-purple-200 via-indigo-100 to-slate-200',
      blob1: 'bg-purple-300/45',
      blob2: 'bg-indigo-300/40',
      blob3: 'bg-violet-200/50',
    },
  };

  const activeAura = currentScreen === 'welcome' 
    ? auraGradients.welcome 
    : auraGradients[cycleState.phase.id] || auraGradients.menstrual;

  const handleAddLog = (newLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleAddJournalEntry = (entry) => {
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleDeleteJournalEntry = (id) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const setSimulatedPhaseOffset = (phaseDays) => {
    const d = new Date();
    d.setDate(d.getDate() - (phaseDays - 1));
    setCycleConfig((prev) => ({
      ...prev,
      startDate: d.toISOString().split('T')[0],
    }));
  };

  // STRICT: If on Welcome screen, render ONLY the full-screen Welcome view
  if (currentScreen === 'welcome') {
    return (
      <div className={`min-h-screen ${auraGradients.welcome.bg} transition-all duration-1000 ease-in-out`}>
        <WelcomeScreen onExplore={() => setCurrentScreen('setup')} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${activeAura.bg} transition-all duration-1000 ease-in-out flex flex-col justify-between py-5 px-4 sm:px-6 relative overflow-hidden animate-fadeIn`}
    >
      {/* Emergency / I Need Help Modal */}
      <EmergencyHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Floating Persistent Emergency Button (Never hidden) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsHelpModalOpen(true)}
          className="px-4 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs sm:text-sm shadow-2xl border-2 border-white/80 transition-all flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95 animate-bounce-subtle"
        >
          <span>🆘 I Need Help</span>
        </button>
      </div>

      {/* Dynamic Animated Ambient Blobs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full ${activeAura.blob1} filter blur-3xl pointer-events-none animate-blob-1 transition-all duration-1000`}
      />
      <div
        className={`absolute top-1/2 -right-36 w-96 h-96 rounded-full ${activeAura.blob2} filter blur-3xl pointer-events-none animate-blob-2 transition-all duration-1000`}
      />
      <div
        className={`absolute -bottom-32 left-1/3 w-80 h-80 rounded-full ${activeAura.blob3} filter blur-3xl pointer-events-none animate-pulse-glow transition-all duration-1000`}
      />

      {/* Top App Header & Utility Bar */}
      <header className="max-w-4xl mx-auto w-full flex flex-col gap-3.5 mb-3 z-30">
        {/* Row 1: Brand & Top Emergency Button */}
        <div className="flex items-center justify-between gap-3 w-full">
          <button
            type="button"
            onClick={() => setCurrentScreen('welcome')}
            title="Return to Welcome Landing"
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-2xl border-2 border-white/90 transform group-hover:scale-110 group-hover:rotate-6 transition-all sticker-badge">
              {cycleState.phase.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  Aura Teen
                </span>
                <span className="text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white tracking-wide shadow-sm">
                  AESTHETIC ✨
                </span>
              </div>
              <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <span>Aura:</span>
                <span className="font-black underline decoration-pink-400">
                  {cycleState.phase.name}
                </span>
                <span>(Day {cycleState.cycleDay})</span>
              </div>
            </div>
          </button>

          {/* Top Quick Emergency Button */}
          <button
            type="button"
            onClick={() => setIsHelpModalOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs shadow-md border-2 border-rose-300 transition-all flex items-center gap-1.5 cursor-pointer transform hover:scale-105 active:scale-95 shrink-0"
          >
            <span>🆘 I Need Help</span>
          </button>
        </div>

        {/* Row 2: Main Navigation Bar with Integrated I Need Help Action */}
        <div className="w-full flex justify-center">
          <ScreenNav
            currentScreen={currentScreen}
            onSelectScreen={(screen) => setCurrentScreen(screen)}
            onOpenHelp={() => setIsHelpModalOpen(true)}
          />
        </div>

        {/* Row 3: Quick Phase Live Preview Bar */}
        <div className="w-full flex items-center justify-center gap-2 pt-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 hidden sm:inline">
            Aura Shift Preview:
          </span>
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
            <button
              type="button"
              onClick={() => setSimulatedPhaseOffset(2)}
              title="Rest Aura (Velvet Rose)"
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                cycleState.phase.id === 'menstrual'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'hover:bg-rose-100 text-slate-600'
              }`}
            >
              🌸 Menstrual
            </button>
            <button
              type="button"
              onClick={() => setSimulatedPhaseOffset(8)}
              title="Energy Aura (Peach Sunset)"
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                cycleState.phase.id === 'follicular'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'hover:bg-orange-100 text-slate-600'
              }`}
            >
              🌱 Follicular
            </button>
            <button
              type="button"
              onClick={() => setSimulatedPhaseOffset(15)}
              title="Glow Aura (Mint & Emerald)"
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                cycleState.phase.id === 'ovulation'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'hover:bg-emerald-100 text-slate-600'
              }`}
            >
              ✨ Ovulation
            </button>
            <button
              type="button"
              onClick={() => setSimulatedPhaseOffset(22)}
              title="Reflection Aura (Cosmic Violet)"
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                cycleState.phase.id === 'luteal'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'hover:bg-purple-100 text-slate-600'
              }`}
            >
              🌙 Luteal
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center z-10 py-3">
        {currentScreen === 'setup' && (
          <CycleSetupScreen
            cycleConfig={cycleConfig}
            onSaveConfig={setCycleConfig}
            onProceed={() => setCurrentScreen('checkin')}
          />
        )}

        {currentScreen === 'checkin' && (
          <DailyCheckInScreen
            cycleState={cycleState}
            logs={logs}
            onAddLog={handleAddLog}
            onNavigateToInsights={() => setCurrentScreen('insights')}
            onNavigateToGuide={() => setCurrentScreen('guide')}
          />
        )}

        {currentScreen === 'guide' && (
          <NavigateItModule
            onOpenJournal={() => setCurrentScreen('journal')}
            onBack={() => setCurrentScreen('checkin')}
          />
        )}

        {currentScreen === 'journal' && (
          <JournalScreen
            currentPhase={cycleState.phase}
            journalEntries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
          />
        )}

        {currentScreen === 'insights' && (
          <InsightScreen
            logs={logs}
            currentPhase={cycleState.phase}
            onNavigateToCheckIn={() => setCurrentScreen('checkin')}
          />
        )}

        {currentScreen === 'education' && (
          <EducationHub />
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center mt-6 z-10 space-y-1.5">
        <div className="text-xs font-bold text-slate-600 flex flex-wrap items-center justify-center gap-2">
          <span>Aura Teen ✨ • Menstrual & Mood Pattern Companion</span>
          <span>•</span>
          <span className="text-pink-600 font-black">Empowering Teen Self-Awareness</span>
          <span>•</span>
          <span className="text-slate-500">Non-Diagnostic</span>
        </div>
      </footer>
    </div>
  );
}
