import React from 'react';
import { Sparkles, Calendar, Heart, Zap, BarChart2, Info, BookOpen, GraduationCap, Compass } from 'lucide-react';

/**
 * Stitch UI - Ultra-Aesthetic Glassmorphism & Gen-Z Design System
 */

export function GlassCard({ children, className = '', glowColor = '' }) {
  const glowClasses = {
    rose: 'hover:shadow-glow-rose',
    amber: 'hover:shadow-glow-peach',
    emerald: 'hover:shadow-glow-emerald',
    purple: 'hover:shadow-glow-violet',
  }[glowColor] || 'hover:shadow-2xl';

  return (
    <div
      className={`backdrop-blur-xl bg-white/65 border-2 border-white/80 shadow-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 ${glowClasses} ${className}`}
    >
      {children}
    </div>
  );
}

export function PhasePillBadge({ phase, className = '' }) {
  if (!phase) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-xs sm:text-sm border-2 shadow-sm transition-all duration-300 backdrop-blur-md sticker-badge ${phase.badgeColor} ${className}`}
    >
      <span className="text-xl animate-bounce-subtle">{phase.emoji}</span>
      <span>{phase.name}</span>
      <span className="opacity-80 text-[11px] px-2 py-0.5 rounded-full bg-white/80 border border-slate-900/10">
        {phase.daysLabel}
      </span>
    </div>
  );
}

export function BouncyMoodSelector({ value, onChange }) {
  const moods = [
    { score: 1, emoji: '😫', label: 'Rough', color: 'hover:bg-rose-100 hover:border-rose-400' },
    { score: 2, emoji: '🙁', label: 'Low', color: 'hover:bg-amber-100 hover:border-amber-400' },
    { score: 3, emoji: '😐', label: 'Okay', color: 'hover:bg-yellow-100 hover:border-yellow-400' },
    { score: 4, emoji: '🙂', label: 'Good', color: 'hover:bg-teal-100 hover:border-teal-400' },
    { score: 5, emoji: '🤩', label: 'Super', color: 'hover:bg-emerald-100 hover:border-emerald-400' },
  ];

  return (
    <div className="w-full">
      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
        <span>✨ Mood Scale (1–5)</span>
      </label>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {moods.map((item) => {
          const isSelected = value === item.score;
          return (
            <button
              type="button"
              key={item.score}
              onClick={() => onChange(item.score)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 transform active:scale-90 cursor-pointer backdrop-blur-md ${
                isSelected
                  ? 'bg-white shadow-xl border-slate-900 scale-105 -translate-y-1.5 font-black ring-4 ring-pink-300 ring-offset-2'
                  : `bg-white/60 border-white/80 opacity-85 hover:opacity-100 ${item.color}`
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-sm select-none">
                {item.emoji}
              </span>
              <span className="text-xs font-black text-slate-800">{item.score}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SegmentedEnergyBar({ value, onChange }) {
  const levels = [
    { val: 1, label: 'Low Battery 🪫', desc: 'Rest mode' },
    { val: 2, label: 'Slow Drift 🔋', desc: 'Chill pacing' },
    { val: 3, label: 'Steady Pace ⚡', desc: 'Normal flow' },
    { val: 4, label: 'High Spark ⚡⚡', desc: 'Active & sharp' },
    { val: 5, label: 'Super Charged 🚀', desc: 'Peak power' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <span>⚡ Energy Level Battery (1–5)</span>
        </label>
        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-sm">
          Level {value}/5
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-2 rounded-2xl bg-white/50 border-2 border-white/80 backdrop-blur-md shadow-inner">
        {levels.map((item) => {
          const isFilled = item.val <= value;
          const isCurrent = item.val === value;

          const fillBg = item.val <= 2 
            ? 'bg-rose-400' 
            : item.val === 3 
            ? 'bg-amber-400' 
            : 'bg-emerald-400';

          return (
            <button
              type="button"
              key={item.val}
              onClick={() => onChange(item.val)}
              className={`h-12 sm:h-14 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-200 border cursor-pointer ${
                isFilled
                  ? `${fillBg} text-white shadow-md border-transparent ${isCurrent ? 'scale-[1.04] ring-2 ring-slate-900' : ''}`
                  : 'bg-white/40 text-slate-400 border-dashed border-slate-300 hover:bg-white/80'
              }`}
            >
              <Zap className={`w-4 h-4 sm:w-5 sm:h-5 ${isFilled ? 'fill-current' : 'opacity-30'}`} />
            </button>
          );
        })}
      </div>
      <div className="text-right mt-1.5 text-xs font-bold text-slate-500">
        {levels.find((l) => l.val === value)?.desc}
      </div>
    </div>
  );
}

export function GlowButton({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) {
  const base = "font-black text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-0.5 border-2 border-slate-900",
    glowPink: "bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 text-white hover:shadow-glow-rose hover:-translate-y-0.5 border-2 border-white/60",
    secondary: "bg-white/80 text-slate-800 hover:bg-white border-2 border-white/90 hover:shadow-md",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export function ScreenNav({ currentScreen, onSelectScreen, onOpenHelp }) {
  const tabs = [
    { id: 'welcome', label: 'Aura', icon: Compass, emoji: '✨' },
    { id: 'setup', label: 'Cycle Setup', icon: Calendar, emoji: '🗓️' },
    { id: 'checkin', label: 'Check-In', icon: Heart, emoji: '💫' },
    { id: 'guide', label: 'Navigate It', icon: Compass, emoji: '🧭' },
    { id: 'journal', label: 'Journal', icon: BookOpen, emoji: '📖' },
    { id: 'insights', label: 'Insights', icon: BarChart2, emoji: '📊' },
    { id: 'education', label: 'Edu Hub', icon: GraduationCap, emoji: '📚' },
  ];

  return (
    <nav className="backdrop-blur-xl bg-white/80 rounded-2xl p-2 flex flex-wrap gap-1.5 sm:gap-2 shadow-lg border-2 border-white/90 justify-center items-center z-30">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectScreen(tab.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-slate-900 text-white shadow-md scale-105 ring-2 ring-pink-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}

      {onOpenHelp && (
        <button
          type="button"
          onClick={onOpenHelp}
          title="Emergency Resources & Help"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-md border border-rose-300 transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95 animate-pulse-glow"
        >
          <span className="text-base">🆘</span>
          <span>I Need Help</span>
        </button>
      )}
    </nav>
  );
}

export function DisclaimerBanner({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-xl bg-white/75 border-2 border-dashed border-slate-900/15 text-slate-700 text-xs sm:text-sm font-black shadow-sm ${className}`}
    >
      <Info className="w-4 h-4 text-pink-500 shrink-0" />
      <span>"Your patterns, not a universal rule."</span>
    </div>
  );
}
