import React, { useState } from 'react';
import { Compass, ShieldAlert, Sparkles, MessageCircle, Heart, ArrowRight, RotateCcw, AlertTriangle, BookOpen, UserCheck } from 'lucide-react';
import { GlassCard, GlowButton } from './StitchUI';

export default function NavigateItModule({ onOpenJournal, onBack }) {
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const options = [
    {
      id: 'once',
      label: 'Just once',
      emoji: '🕊️',
      advice: 'Give it space today. Miscommunications happen—reach out tomorrow for a simple 1-on-1 chat.',
      badge: 'Gentle Pacing',
      color: 'bg-blue-50 border-blue-200 text-blue-900',
    },
    {
      id: 'repeatedly',
      label: 'Repeatedly',
      emoji: '🛡️',
      advice: 'Set gentle boundaries. Focus on friends who make you feel included and value your presence.',
      badge: 'Self-Protection',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
    },
    {
      id: 'unsafe',
      label: 'Unsafe or Harassed',
      emoji: '🚨',
      advice: 'Your safety comes first. Please talk to a trusted adult, school counselor, or parent right away.',
      isSafetyOverride: true,
      badge: 'Safety Priority',
      color: 'bg-rose-50 border-rose-300 text-rose-950',
    },
    {
      id: 'unsure',
      label: 'Not sure',
      emoji: '💭',
      advice: 'Take a breath and write down what happened in your Journal. Revisit when you feel calmer.',
      badge: 'Pause & Reflect',
      hasJournalCTA: true,
      color: 'bg-purple-50 border-purple-200 text-purple-900',
    },
  ];

  const currentResult = options.find((opt) => opt.id === selectedFrequency);

  return (
    <div className="max-w-2xl mx-auto w-full animate-fadeIn space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/80 border border-white/90 text-xs font-black uppercase tracking-widest text-indigo-600 mb-3 shadow-md">
          <Compass className="w-3.5 h-3.5" /> Social Wellness Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Navigate It 🧭
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base font-semibold">
          Feeling left out or experiencing social tension? Walk through this calm, grounded guide.
        </p>
      </div>

      <GlassCard className="space-y-6">
        {/* Step 1 Question */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-pink-600 block mb-1">
            Question
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            How often has this situation happened?
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Choose what best describes what you are experiencing right now.
          </p>
        </div>

        {/* 4 Fixed Decision Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const isSelected = selectedFrequency === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedFrequency(opt.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-white shadow-xl border-slate-900 ring-4 ring-pink-300 scale-[1.02]'
                    : 'bg-white/60 border-white/80 hover:bg-white/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {opt.badge}
                  </span>
                </div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900">
                  {opt.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Guidance Output */}
        {currentResult && (
          <div
            className={`p-5 rounded-2xl border-2 space-y-3 animate-fadeIn backdrop-blur-md ${currentResult.color}`}
          >
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
              {currentResult.isSafetyOverride ? (
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              ) : (
                <Sparkles className="w-4 h-4 text-pink-600" />
              )}
              <span>Recommended Path</span>
            </div>

            <p className="text-sm sm:text-base font-bold leading-relaxed">
              "{currentResult.advice}"
            </p>

            {/* Safety Override Alert */}
            {currentResult.isSafetyOverride && (
              <div className="p-3.5 rounded-xl bg-rose-100 border border-rose-300 text-xs font-bold text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-800 font-black">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Important Safety Reminder:</span>
                </div>
                <div>
                  Bullying, exclusion harassment, or unsafe behavior is never your fault. Reach out to a school counselor, trusted teacher, or family member for immediate support.
                </div>
              </div>
            )}

            {/* Journal CTA if Unsure */}
            {currentResult.hasJournalCTA && onOpenJournal && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenJournal}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Your Private Journal to Write It Out 📖</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Reset / Actions */}
        {selectedFrequency && (
          <div className="flex justify-end pt-2 border-t border-slate-900/10">
            <button
              type="button"
              onClick={() => setSelectedFrequency(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another Option</span>
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
