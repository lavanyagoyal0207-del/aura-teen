import React, { useState } from 'react';
import { Calendar, ArrowRight, Sparkles, Clock, AlertTriangle, CheckCircle2, HeartPulse } from 'lucide-react';
import { GlassCard, PhasePillBadge, GlowButton } from './StitchUI';
import { calculateCycleState, getCycleConsistency, PHASES } from '../utils/cycleCalculations';

export default function CycleSetupScreen({ cycleConfig, onSaveConfig, onProceed }) {
  const [startDate, setStartDate] = useState(cycleConfig.startDate);
  const [cycleLength, setCycleLength] = useState(cycleConfig.cycleLength || 28);

  const previewState = calculateCycleState(startDate, cycleLength);
  const consistency = getCycleConsistency(cycleLength);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig({
      startDate,
      cycleLength: Number(cycleLength),
    });
    onProceed();
  };

  return (
    <div className="max-w-xl mx-auto w-full animate-fadeIn space-y-6">
      {/* Screen Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/80 border border-white/90 text-xs font-black uppercase tracking-widest text-pink-600 mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5" /> Step 1: Your Rhythm
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Cycle Setup 🗓️
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base font-semibold">
          Tell us where you are in your natural cycle to personalize your active aura.
        </p>
      </div>

      <GlassCard className="relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/80 shadow-2xl rounded-3xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input 1: Last Period Start Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700 mb-2">
              <Calendar className="w-4 h-4 text-pink-500" />
              1. Last Period Start Date
            </label>
            <input
              type="date"
              value={startDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-white/90 border-2 border-slate-900/15 focus:border-slate-900 focus:outline-none font-bold text-slate-800 shadow-sm transition-all text-base"
            />
            <p className="text-xs text-slate-500 font-bold mt-1.5">
              The first day your last period began.
            </p>
          </div>

          {/* Input 2: Average Cycle Length */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                <Clock className="w-4 h-4 text-amber-500" />
                2. Average Cycle Length
              </label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
                  {consistency.label}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-pink-100 text-pink-800 font-black text-sm border border-pink-200 shadow-sm">
                  {cycleLength} Days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-slate-400">18d</span>
              <input
                type="range"
                min="18"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full h-3 bg-white/80 rounded-lg appearance-none cursor-pointer border border-slate-300"
              />
              <span className="text-xs font-black text-slate-400">45d</span>
            </div>
            <p className="text-xs text-slate-500 font-bold mt-1.5">
              Typical teen cycles range between 24 and 35 days (default: 28).
            </p>
          </div>

          {/* Red-Flag Detection Notification if Highly Variable */}
          {consistency.isRedFlag && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm animate-fadeIn">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs font-bold leading-relaxed">
                <span className="font-black block text-amber-900 uppercase tracking-wider text-[11px] mb-0.5">
                  Cycle Pattern Note:
                </span>
                {consistency.redFlagMessage}
              </div>
            </div>
          )}

          {/* Real-Time Phase Math Preview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border-2 border-white/90 shadow-sm space-y-3 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Calculated Active Status
              </span>
              <span className="text-xs font-black text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                Cycle Day {previewState.cycleDay} of {cycleLength}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <PhasePillBadge phase={previewState.phase} />
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 bg-white/80 p-3 rounded-xl border border-slate-900/5">
              {previewState.phase.description}
            </p>
          </div>

          {/* 4 Phases Timeline Cheat-Sheet */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {Object.values(PHASES).map((p) => {
              const isCurrent = previewState.phase.id === p.id;
              return (
                <div
                  key={p.id}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? `${p.badgeColor} ring-2 ring-slate-900 shadow-md font-bold scale-[1.03]`
                      : 'bg-white/50 border-white/80 opacity-75 text-slate-600'
                  }`}
                >
                  <div className="text-lg">{p.emoji}</div>
                  <div className="text-xs font-extrabold mt-0.5">{p.shortName}</div>
                  <div className="text-[10px] opacity-75">{p.daysLabel}</div>
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <GlowButton
              type="submit"
              variant="glowPink"
              className="w-full text-base sm:text-lg"
            >
              <span>Lock In My Cycle ✨</span>
              <ArrowRight className="w-5 h-5" />
            </GlowButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
