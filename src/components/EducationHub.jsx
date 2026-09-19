import React, { useState } from 'react';
import { BookOpen, ShieldAlert, Sparkles, Heart, CheckCircle2, AlertCircle, Info, Stethoscope, Compass } from 'lucide-react';
import { GlassCard } from './StitchUI';

export const pcosEducation = [
  { topic: "What is PCOS/PCOD?", content: "A hormonal condition where the ovaries produce higher-than-typical levels of certain hormones, which can affect ovulation and periods." },
  { topic: "Common signs", content: "Irregular or absent periods, excess hair growth, acne, and weight changes are commonly reported — but these vary widely and aren't diagnostic on their own." },
  { topic: "Why it's often missed in teens", content: "Irregular periods are common as bodies develop, so early PCOS/PCOD signs can look like normal puberty variation. There's no substitute for a doctor's evaluation." },
  { topic: "What to do if something feels off", content: "Track your cycle and symptoms, and bring the log to a doctor — that's the actual diagnostic step, not this app." }
];

export default function EducationHub() {
  const [activeCategory, setActiveCategory] = useState('pcos'); // 'pcos' | 'care' | 'hygiene'

  const generalPeriodCare = [
    {
      product: "Pads (Day & Night)",
      emoji: "🌸",
      howItWorks: "Worn inside underwear to absorb flow naturally without internal insertion.",
      bestFor: "Day-to-day school, sports, and overnight peace of mind.",
      proTip: "Swap every 4–6 hours to stay fresh and prevent leaks."
    },
    {
      product: "Panty Liners",
      emoji: "🩲",
      howItWorks: "Extra-thin mini pads for lighter spotting or everyday backup.",
      bestFor: "Beginning/end of cycle or paired with tampons/cups.",
      proTip: "Keep a couple in your backpack pouch for peace of mind."
    },
    {
      product: "Period Underwear",
      emoji: "✨",
      howItWorks: "Special multi-layer absorbent fabric built directly into washable undies.",
      bestFor: "Lounging, sleep, zero-waste eco comfort, and anxiety-free days.",
      proTip: "Rinse with cold water before tossing into regular laundry."
    },
    {
      product: "Tampons & Menstrual Cups",
      emoji: "💧",
      howItWorks: "Internal period care options for active movement, swimming, or dance.",
      bestFor: "Athletics, beach days, and invisible comfort.",
      proTip: "Never leave a tampon in for more than 8 hours; wash hands thoroughly."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto w-full animate-fadeIn space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-900/10 text-xs font-black uppercase tracking-widest text-emerald-600 mb-3 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" /> Scope-Safe Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Education & Hygiene Hub 📚
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base font-semibold">
          Clear, empowering, science-backed guidance designed for teen bodies.
        </p>
      </div>

      {/* Mandatory Scope-Safe Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm sticker-card">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm font-bold leading-snug">
          <span className="font-black uppercase tracking-wider block text-amber-900 text-[11px] mb-0.5">
            Scope Boundary Notice
          </span>
          Strictly educational — consult a doctor for evaluation. This app does not provide clinical diagnoses, medical tests, or treatment advice.
        </div>
      </div>

      {/* Category Switcher Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white/80 border-2 border-slate-900/10 shadow-sm gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('pcos')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'pcos'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🩺 PCOS / PCOD Awareness
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('care')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'care'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎀 Period Products Guide
          </button>
        </div>
      </div>

      {/* Tab 1: PCOS / PCOD Awareness Card */}
      {activeCategory === 'pcos' && (
        <GlassCard className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-900/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-xl shrink-0">
                🧬
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Understanding PCOS & PCOD
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Separating myths from realities for teen self-awareness
                </p>
              </div>
            </div>

            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase tracking-wider">
              Educational
            </span>
          </div>

          {/* Render exact array elements from pcosEducation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {pcosEducation.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border-2 border-slate-900/10 shadow-sm space-y-2 sticker-card"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {item.topic}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed pl-1">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Action guidance callout */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3 shadow-md">
            <Stethoscope className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-pink-300 block mb-0.5">Doctor Conversation Tip:</span>
              Take your cycle length patterns and mood notes from this app to your doctor’s appointment. It makes explaining your personal rhythm super easy and objective!
            </div>
          </div>
        </GlassCard>
      )}

      {/* Tab 2: Period Care Products Guide */}
      {activeCategory === 'care' && (
        <GlassCard className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-900/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-xl shrink-0">
                🎀
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Period Care & Products
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Options tailored to every lifestyle, comfort, and flow level
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {generalPeriodCare.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border-2 border-slate-900/10 shadow-sm space-y-2 sticker-card"
              >
                <div className="flex items-center gap-2 font-black text-base text-slate-900">
                  <span className="text-2xl">{item.emoji}</span>
                  <span>{item.product}</span>
                </div>

                <p className="text-xs font-medium text-slate-700">
                  {item.howItWorks}
                </p>

                <div className="pt-1 text-[11px] font-bold text-pink-700 bg-pink-50 p-2 rounded-xl border border-pink-200">
                  ✦ Best for: {item.bestFor}
                </div>

                <div className="text-[11px] font-semibold text-slate-500 italic">
                  💡 {item.proTip}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
