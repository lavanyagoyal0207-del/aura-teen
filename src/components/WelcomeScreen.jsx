import React from 'react';
import { Sparkles, ArrowRight, Heart, Zap, Smile, ShieldCheck, BarChart2, Moon } from 'lucide-react';
import { GlowButton } from './StitchUI';

export default function WelcomeScreen({ onExplore }) {
  const previewPills = [
    { emoji: '⚡', label: 'Follicular Energy', color: 'bg-amber-100/90 text-amber-900 border-amber-300' },
    { emoji: '🌸', label: 'Rest & Glow', color: 'bg-rose-100/90 text-rose-900 border-rose-300' },
    { emoji: '📊', label: 'Mood Patterns', color: 'bg-indigo-100/90 text-indigo-900 border-indigo-300' },
    { emoji: '🌙', label: 'Cosmic Zen', color: 'bg-purple-100/90 text-purple-900 border-purple-300' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 relative overflow-hidden animate-fadeIn">
      {/* Ambient glowing backdrop meshes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pink-300/40 filter blur-3xl pointer-events-none animate-blob-1" />
      <div className="absolute top-1/2 -right-28 w-96 h-96 rounded-full bg-purple-300/40 filter blur-3xl pointer-events-none animate-blob-2" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-indigo-200/50 filter blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-3xl mx-auto w-full space-y-8 z-10 flex flex-col items-center">
        {/* Floating Tag Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-xl bg-white/80 border-2 border-white/90 shadow-lg text-xs sm:text-sm font-black uppercase tracking-widest text-pink-600 animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Welcome to Aura Teen ✨</span>
          <Sparkles className="w-4 h-4 text-pink-500" />
        </div>

        {/* Hero Title & Tagline */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-none drop-shadow-sm">
            Aura Teen <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">✨</span>
          </h1>
          <p className="text-xl sm:text-3xl font-extrabold text-slate-700 tracking-tight">
            "Your cycle, your mood, your vibe — mapped in sync."
          </p>
          <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed max-w-lg mx-auto">
            A quirky, ultra-aesthetic self-awareness app designed for teenagers to visualize phase patterns, track daily vibes, and tune into their natural rhythm.
          </p>
        </div>

        {/* Floating Preview Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-xl">
          {previewPills.map((pill, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded-2xl border-2 font-black text-xs sm:text-sm backdrop-blur-xl shadow-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 sticker-badge ${pill.color}`}
            >
              <span className="mr-1.5 text-base">{pill.emoji}</span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA: "Explore My Aura ✨" */}
        <div className="pt-4 w-full flex flex-col items-center">
          <GlowButton
            variant="glowPink"
            onClick={onExplore}
            className="text-lg sm:text-2xl px-10 sm:px-14 py-5 sm:py-6 shadow-2xl hover:scale-105 active:scale-95 group rounded-3xl"
          >
            <span>Explore My Aura ✨</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </GlowButton>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Private (No Login / In-Browser)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-pink-500" />
            <span>Pure Self-Awareness</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Gen-Z Aesthetic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
