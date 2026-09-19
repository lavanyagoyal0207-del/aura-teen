import React, { useState } from 'react';
import { BookOpen, AlertCircle, Sparkles, HelpCircle, Search, ChevronDown, ChevronUp, GraduationCap, Clock, CheckCircle2, Stethoscope } from 'lucide-react';
import { GlassCard } from './StitchUI';

export const symptomFAQ = [
  {
    question: "Why do I get cramps?",
    answer: "Cramps happen when your uterus contracts to shed its lining — completely normal, though severity varies a lot person to person.",
    emoji: "🍵",
    tag: "Body Basics",
  },
  {
    question: "Why am I so hungry right now?",
    answer: "Hormone shifts (especially in luteal phase) commonly increase appetite and cravings — not a lack of willpower, it's biological.",
    emoji: "🍫",
    tag: "Cravings & Metabolism",
  },
  {
    question: "Is it normal for my period to be irregular?",
    answer: "Very common in teen years as your body's rhythm is still establishing — but tracking it (like you're doing here) helps you and a doctor spot if it's outside typical range.",
    emoji: "🗓️",
    tag: "Cycle Rhythm",
  },
  {
    question: "Why do I feel exhausted before my period?",
    answer: "Energy dips are common in the days before your period due to hormone drops — pairs with what you're already seeing on your Insight screen.",
    emoji: "🌙",
    tag: "Energy Flow",
  },
];

export const pcosEducation = [
  { topic: "What is PCOS/PCOD?", content: "A hormonal condition where the ovaries produce higher-than-typical levels of certain hormones, which can affect ovulation and periods." },
  { topic: "Common signs", content: "Irregular or absent periods, excess hair growth, acne, and weight changes are commonly reported — but these vary widely and aren't diagnostic on their own." },
  { topic: "Why it's often missed in teens", content: "Irregular periods are common as bodies develop, so early PCOS/PCOD signs can look like normal puberty variation. There's no substitute for a doctor's evaluation." },
  { topic: "What to do if something feels off", content: "Track your cycle and symptoms, and bring the log to a doctor — that's the actual diagnostic step, not this app." }
];

export const crampsReliefTips = [
  "Apply a heating pad or warm water bottle to your lower abdomen.",
  "Gentle stretching or light walking can ease cramping for some people.",
  "Staying hydrated may help reduce bloating and cramping intensity.",
  "A warm bath can help relax the muscles that cause cramping.",
  "Deep, slow breathing can help when cramps flare up suddenly.",
  "If pain is severe or doesn't improve, it's worth talking to a doctor — cramps that stop you from daily activities aren't something to just push through."
];

export default function EducationHub() {
  const [activeCategory, setActiveCategory] = useState('faq'); // 'faq' | 'cramps' | 'student' | 'pcos' | 'care'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

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

  const studentStudyTips = [
    {
      phase: "Follicular Phase (Days 6–13)",
      badge: "🌱 High Spark & Curiosity",
      bestTasks: "Tackling tough new topics, math problem sets, brainstorming essay ideas, starting projects.",
      strategy: "Your cognitive novelty and energy are climbing — great window to learn complex subjects from scratch."
    },
    {
      phase: "Ovulation Phase (Days 14–16)",
      badge: "✨ Superstar Glow & Confidence",
      bestTasks: "Class presentations, group study sessions, debate club, active memorization.",
      strategy: "Verbal confidence and social stamina peak. Perfect for collaborating or speaking up in class."
    },
    {
      phase: "Luteal Phase (Days 17–28+)",
      badge: "🌙 Detail & Focus",
      bestTasks: "Organizing notes, proofreading essays, formatting bibliography, flashcard drills.",
      strategy: "Your brain shifts towards detail orientation and solo quiet focus. Keep study blocks structured and take snack breaks."
    },
    {
      phase: "Menstrual Phase (Days 1–5)",
      badge: "🌸 Low Pressure & Review",
      bestTasks: "Light reading, listening to educational podcasts/audiobooks, reviewing summary sheets.",
      strategy: "Honor slower physical pacing. Don't pull all-nighters; prioritize quality sleep and low-stress review."
    }
  ];

  const filteredFAQ = symptomFAQ.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-3xl mx-auto w-full animate-fadeIn space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/80 border border-white/90 text-xs font-black uppercase tracking-widest text-emerald-600 mb-3 shadow-md">
          <BookOpen className="w-3.5 h-3.5" /> Scope-Safe Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Education & FAQ Hub 📚
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base font-semibold">
          Curated, medically-reviewed answers to common teen questions with zero hallucination risk.
        </p>
      </div>

      {/* Mandatory Scope-Safe Disclaimer Banner */}
      <div className="p-4 rounded-3xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm backdrop-blur-md">
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
        <div className="inline-flex flex-wrap p-1.5 rounded-2xl backdrop-blur-xl bg-white/80 border-2 border-white/90 shadow-md gap-1 sm:gap-2 justify-center">
          <button
            type="button"
            onClick={() => setActiveCategory('faq')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'faq'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ❓ Common Questions FAQ
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('cramps')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'cramps'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🍵 Cramps & Self-Care
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('student')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'student'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎓 Cycle-Aware Study Tips
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('pcos')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'pcos'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🩺 PCOS / PCOD
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('care')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'care'
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎀 Period Care
          </button>
        </div>
      </div>

      {/* Tab 1: Canned Symptom FAQ Explainer */}
      {activeCategory === 'faq' && (
        <GlassCard className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-900/10">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Teen Symptom & Body FAQ</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Pre-written, reviewed non-diagnostic explanations for everyday body questions
              </p>
            </div>

            {/* Live Search */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-900/15 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-3 pt-1">
            {filteredFAQ.length === 0 ? (
              <div className="text-center py-8 text-slate-400 font-bold text-sm">
                No matching questions found. Try searching another keyword.
              </div>
            ) : (
              filteredFAQ.map((item, idx) => {
                const isExpanded = expandedFAQ === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border-2 border-white/90 bg-white/90 shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFAQ(isExpanded ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                            {item.question}
                          </h3>
                          <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-1 rounded-xl bg-slate-100 text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed bg-pink-50/30 border-t border-slate-100">
                        <div className="p-3 rounded-xl bg-white border border-pink-100/80">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>
      )}

      {/* Tab: Cramps Relief & General Self-Care */}
      {activeCategory === 'cramps' && (
        <GlassCard className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-900/10">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-xl shrink-0">
              🍵
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Cramps Relief & Comfort Tips
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Gentle, research-backed everyday strategies for soothing abdominal tension
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {crampsReliefTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border-2 border-white/80 shadow-sm flex items-start gap-3.5 hover:bg-rose-50/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-xl bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {idx + 1}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  {tip}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Reminder: Severe pain that interferes with school or daily life warrants a checkup with a pediatrician or doctor.</span>
          </div>
        </GlassCard>
      )}

      {/* Tab 2: Cycle-Aware Student Mode / Study Tips */}
      {activeCategory === 'student' && (
        <GlassCard className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-900/10">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xl shrink-0">
              🎓
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Cycle-Aware Student Mode
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Aligning your study schedule with natural energy & focus patterns
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {studentStudyTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border-2 border-white/80 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-slate-900">
                    {tip.phase}
                  </h3>
                </div>

                <span className="inline-block text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                  {tip.badge}
                </span>

                <div className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <span className="text-pink-600 block mb-0.5">Best Study Window:</span>
                  {tip.bestTasks}
                </div>

                <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                  💡 {tip.strategy}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Tab 3: PCOS / PCOD Awareness Card */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {pcosEducation.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border-2 border-white/80 shadow-sm space-y-2"
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

          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3 shadow-md">
            <Stethoscope className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-pink-300 block mb-0.5">Doctor Conversation Tip:</span>
              Take your cycle length patterns and mood notes from this app to your doctor’s appointment. It makes explaining your personal rhythm super easy and objective!
            </div>
          </div>
        </GlassCard>
      )}

      {/* Tab 4: Period Care Products Guide */}
      {activeCategory === 'care' && (
        <GlassCard className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-900/10">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {generalPeriodCare.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border-2 border-white/80 shadow-sm space-y-2"
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
