import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, X, Heart, Sparkles, AlertTriangle, LifeBuoy, ArrowRight, UserCheck } from 'lucide-react';
import { GlassCard } from './StitchUI';

export const emergencyOptions = [
  {
    id: 'overwhelmed',
    emoji: '🌊',
    label: "I'm overwhelmed",
    response: "That's a lot to carry. Try taking a few slow breaths, and consider talking to someone you trust — a parent, teacher, or counselor — about what's going on.",
    badge: 'Gentle Support',
    color: 'bg-purple-50 border-purple-200 text-purple-950',
  },
  {
    id: 'bullied',
    emoji: '🛡️',
    label: "I'm being bullied",
    response: "This isn't something you should have to handle alone. Please tell a trusted adult — a parent, teacher, or school counselor — what's happening.",
    badge: 'Protection Priority',
    color: 'bg-amber-50 border-amber-200 text-amber-950',
  },
  {
    id: 'uncomfortable',
    emoji: '✋',
    label: "Someone is making me uncomfortable",
    response: "Trust that feeling. Please talk to a trusted adult as soon as you can — this matters more than the app can help with directly.",
    badge: 'Trust Your Instincts',
    color: 'bg-orange-50 border-orange-200 text-orange-950',
  },
  {
    id: 'unsafe',
    emoji: '🚨',
    label: "I'm feeling unsafe",
    response: "Please reach out to a trusted adult or emergency contact right now. This app isn't equipped to help in an unsafe situation, but the people in your life are.",
    badge: 'Urgent Safety',
    color: 'bg-rose-50 border-rose-300 text-rose-950',
  },
  {
    id: 'medical',
    emoji: '🩺',
    label: "I need medical help",
    response: "Please contact a doctor, nurse, or trusted adult who can get you medical support.",
    badge: 'Medical Attention',
    color: 'bg-red-50 border-red-200 text-red-950',
  },
];

export default function EmergencyHelpModal({ isOpen, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen) return null;

  const currentDetail = emergencyOptions.find((opt) => opt.id === selectedOption);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="max-w-lg w-full bg-white/95 rounded-3xl border-2 border-white/90 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-2xl shrink-0">
            🆘
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">
                I Need Help
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white uppercase tracking-wider">
                Support
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Select what you're feeling for immediate, grounded guidance.
            </p>
          </div>
        </div>

        {/* Option list */}
        <div className="space-y-2.5">
          {emergencyOptions.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOption(opt.id)}
                className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]'
                    : 'bg-slate-50 hover:bg-white border-slate-200/80 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="font-extrabold text-sm">{opt.label}</span>
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {opt.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Static response card */}
        {currentDetail && (
          <div
            className={`p-4 rounded-2xl border-2 space-y-2 animate-fadeIn ${currentDetail.color}`}
          >
            <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Recommended Immediate Step:</span>
            </div>
            <p className="text-sm font-bold leading-relaxed">
              "{currentDetail.response}"
            </p>
          </div>
        )}

        {/* Universal Helpline Reminder */}
        <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-semibold space-y-1">
          <div className="font-black text-slate-800 flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-pink-500" />
            <span>Emergency & Crisis Resources</span>
          </div>
          <div>
            If you are in immediate danger, call your local emergency services (e.g. 911 / 112 / local helpline) or speak to a parent or school counselor.
          </div>
        </div>
      </div>
    </div>
  );
}
