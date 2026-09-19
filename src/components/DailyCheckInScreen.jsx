import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, RefreshCw, CheckCircle2, MessageSquareHeart, BookOpen, PenLine, Heart, Search, GraduationCap, Compass } from 'lucide-react';
import { GlassCard, PhasePillBadge, BouncyMoodSelector, SegmentedEnergyBar, GlowButton } from './StitchUI';
import { generateDailyReflection } from '../services/geminiService';
import { PHASES } from '../utils/cycleCalculations';
import { crampsReliefTips } from './EducationHub';

export default function DailyCheckInScreen({ cycleState, logs = [], onAddLog, onNavigateToInsights, onNavigateToGuide }) {
  const [activeTab, setActiveTab] = useState('checkin'); // 'checkin' | 'diary'
  const [mood, setMood] = useState(4);
  const [energy, setEnergy] = useState(3);
  const [cravings, setCravings] = useState(false);
  const [cravingNote, setCravingNote] = useState('');
  const [emotionalBreakdown, setEmotionalBreakdown] = useState(false);
  const [breakdownNote, setBreakdownNote] = useState('');
  const [examTomorrow, setExamTomorrow] = useState(false);
  const [note, setNote] = useState('');
  const [reflection, setReflection] = useState('');
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReflection = async (customNote = '') => {
    setIsLoadingReflection(true);
    try {
      const res = await generateDailyReflection(cycleState.phase, customNote);
      setReflection(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingReflection(false);
    }
  };

  useEffect(() => {
    fetchReflection();
  }, [cycleState.phase.id]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#ec4899', '#f97316', '#10b981', '#8b5cf6'],
      });
    } catch (e) {
      // Fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: 'log-' + Date.now(),
      day: cycleState.cycleDay,
      phaseId: cycleState.phase.id,
      phaseName: cycleState.phase.shortName,
      mood: Number(mood),
      energy: Number(energy),
      cravings: Boolean(cravings),
      cravingNote: cravings ? cravingNote.trim().split(' ')[0] : '',
      emotionalBreakdown: Boolean(emotionalBreakdown),
      breakdownNote: emotionalBreakdown ? breakdownNote.trim().split(' ')[0] : '',
      examTomorrow: Boolean(examTomorrow),
      note: note.trim() || 'Daily check-in vibes ✨',
      date: `Day ${cycleState.cycleDay} (Today)`,
      timestamp: new Date().toISOString(),
    };

    onAddLog(newEntry);
    triggerCelebration();

    // Show encouragement toast
    setToastMessage("Check-in logged! You're doing great ✨");
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);

    // Reset notes
    setNote('');
    setCravingNote('');
    setBreakdownNote('');
    setCravings(false);
    setEmotionalBreakdown(false);
    setExamTomorrow(false);
  };

  const filteredDiaryLogs = logs.filter((l) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      (l.note && l.note.toLowerCase().includes(query)) ||
      (l.cravingNote && l.cravingNote.toLowerCase().includes(query)) ||
      (l.breakdownNote && l.breakdownNote.toLowerCase().includes(query)) ||
      (l.phaseName && l.phaseName.toLowerCase().includes(query))
    );
  });

  const getMoodEmoji = (score) => {
    const emojis = { 1: '😫', 2: '🙁', 3: '😐', 4: '🙂', 5: '🤩' };
    return emojis[score] || '🙂';
  };

  // Check if note mentions exclusion keywords
  const isExclusionKeywordPresent =
    note.toLowerCase().includes('friend') ||
    note.toLowerCase().includes('alone') ||
    note.toLowerCase().includes('exclude') ||
    note.toLowerCase().includes('left out');

  return (
    <div className="max-w-xl mx-auto w-full animate-fadeIn space-y-6 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-bounceSubtle">
          <div className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-2xl border-2 border-pink-400 flex items-center gap-2.5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Dynamic Header & Phase Pill */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <PhasePillBadge phase={cycleState.phase} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Daily Check-In ✨
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base font-bold">
          Day {cycleState.cycleDay} of {cycleState.cycleLength} • {cycleState.phase.vibeTag}
        </p>

        {/* Sub-Tabs: Check-in Form vs Diary Feed */}
        <div className="mt-4 inline-flex p-1 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-md">
          <button
            type="button"
            onClick={() => setActiveTab('checkin')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'checkin'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Check-In Form</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('diary')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'diary'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Past Diary ({logs.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'checkin' ? (
        <>
          {/* AI Uplifting Reflection Box */}
          <div className="relative p-5 sm:p-6 rounded-3xl backdrop-blur-xl bg-white/75 border-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-pink-600">
                <Sparkles className="w-4 h-4 animate-spin-slow text-pink-500" />
                <span>Daily Reflection ✨</span>
              </div>
              <button
                type="button"
                onClick={() => fetchReflection(note)}
                disabled={isLoadingReflection}
                title="Generate new reflection"
                className="p-1.5 rounded-full hover:bg-white/80 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReflection ? 'animate-spin text-pink-500' : ''}`} />
              </button>
            </div>

            <p className="text-base sm:text-lg font-black text-slate-800 leading-snug">
              {isLoadingReflection ? (
                <span className="text-slate-400 italic font-medium animate-pulse">
                  Consulting the stars for your daily vibe... ✨
                </span>
              ) : (
                `“${reflection}”`
              )}
            </p>

            <div className="mt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <MessageSquareHeart className="w-3.5 h-3.5 text-pink-400" />
              <span>Empathetic, non-diagnostic reflection</span>
            </div>
          </div>

          {/* Contextual "Navigate It" Prompt Banner if Low Mood / Exclusion */}
          {mood <= 2 && isExclusionKeywordPresent && onNavigateToGuide && (
            <div className="p-4 rounded-2xl bg-indigo-50/95 border-2 border-indigo-200 text-indigo-950 flex items-center justify-between gap-3 shadow-md animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-xs font-bold">
                  <span>Feeling left out or having friend trouble today?</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onNavigateToGuide}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                Open Navigate It 🧭
              </button>
            </div>
          )}

          {/* Interactive Logging Card */}
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mood 1-5 Bouncy Emoji Buttons */}
              <BouncyMoodSelector value={mood} onChange={setMood} />

              {/* Energy Level 1-5 Segmented Battery */}
              <SegmentedEnergyBar value={energy} onChange={setEnergy} />

              {/* Cravings, Emotional Breakdowns & Student Mode Toggles */}
              <div className="space-y-4 pt-2 border-t border-slate-900/10">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Quick Vibe Checks 🔍
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Cravings Toggle */}
                  <div
                    className={`p-3.5 rounded-2xl border-2 transition-all ${
                      cravings
                        ? 'bg-amber-50/90 border-amber-300 shadow-md'
                        : 'bg-white/50 border-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🍫</span>
                        <span className="font-black text-sm text-slate-800">Cravings</span>
                      </div>

                      <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setCravings(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !cravings ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          onClick={() => setCravings(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            cravings ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>

                    {cravings && (
                      <div className="mt-2.5">
                        <input
                          type="text"
                          placeholder="1-word note (e.g. Chocolate)"
                          value={cravingNote}
                          onChange={(e) => setCravingNote(e.target.value.trim().split(' ')[0] || '')}
                          maxLength={20}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-amber-300 font-bold text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* Emotional Breakdown Toggle */}
                  <div
                    className={`p-3.5 rounded-2xl border-2 transition-all ${
                      emotionalBreakdown
                        ? 'bg-purple-50/90 border-purple-300 shadow-md'
                        : 'bg-white/50 border-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⛈️</span>
                        <span className="font-black text-sm text-slate-800">Breakdown</span>
                      </div>

                      <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setEmotionalBreakdown(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !emotionalBreakdown ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          onClick={() => setEmotionalBreakdown(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            emotionalBreakdown ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>

                    {emotionalBreakdown && (
                      <div className="mt-2.5">
                        <input
                          type="text"
                          placeholder="1-word note (e.g. Overwhelmed)"
                          value={breakdownNote}
                          onChange={(e) => setBreakdownNote(e.target.value.trim().split(' ')[0] || '')}
                          maxLength={20}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-purple-300 font-bold text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Student Mode: Exam / Big Test Tomorrow Toggle */}
                <div
                  className={`p-3.5 rounded-2xl border-2 transition-all ${
                    examTomorrow
                      ? 'bg-indigo-50/90 border-indigo-300 shadow-md'
                      : 'bg-white/50 border-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                      <div>
                        <span className="font-black text-sm text-slate-800 block">Exam / Big Test Tomorrow?</span>
                        <span className="text-[11px] font-semibold text-slate-500">Cycle-aware study guidance</span>
                      </div>
                    </div>

                    <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setExamTomorrow(false)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          !examTomorrow ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setExamTomorrow(true)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          examTomorrow ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>

                  {/* Contextual Study Suggestion Based on Reported Energy */}
                  {examTomorrow && (
                    <div className="mt-3 p-3 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-indigo-950 animate-fadeIn">
                      <span className="text-pink-600 font-black block mb-0.5">📚 Study Tip for Today:</span>
                      {energy <= 2
                        ? "You reported lower energy today. Prioritize sleep, do short 20-min focused review sessions, and avoid burnout."
                        : "Great window for focused study! Tackle key concepts now while your logged energy is high."}
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Full Context Note */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Context Note (Optional)
                </label>
                <input
                  type="text"
                  value={note}
                  placeholder="e.g. Studying for bio, hanging with friends, feeling calm..."
                  maxLength={120}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/90 border-2 border-slate-900/15 focus:border-slate-900 focus:outline-none font-bold text-slate-800 placeholder-slate-400 shadow-sm text-sm"
                />
              </div>

              {/* Gentle Cramp Comfort Banner during Menstrual Phase */}
              {cycleState.phase.id === 'menstrual' && (
                <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-950 flex items-start gap-2.5 text-xs font-bold shadow-xs">
                  <span className="text-base shrink-0">🍵</span>
                  <div>
                    <span className="font-black text-rose-900 block mb-0.5">Cramp Comfort Tip (Menstrual Phase):</span>
                    <span>{crampsReliefTips[0]}</span>
                  </div>
                </div>
              )}

              {/* Primary CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <GlowButton
                  type="submit"
                  variant="glowPink"
                  className="flex-1"
                >
                  <Send className="w-5 h-5" />
                  <span>Log Today's Vibe ✨</span>
                </GlowButton>

                <GlowButton
                  type="button"
                  variant="secondary"
                  onClick={onNavigateToInsights}
                  className="text-sm sm:text-base whitespace-nowrap"
                >
                  <span>View Insights 📊</span>
                </GlowButton>
              </div>
            </form>
          </GlassCard>
        </>
      ) : (
        /* Diary Vertical Feed View */
        <GlassCard className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-900/10">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-500" />
                <span>Your Cycle Diary</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                A simple vertical feed of your past thoughts and vibe logs
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-900/15 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {/* Diary Feed List */}
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredDiaryLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 font-bold text-sm">
                No diary entries found matching your search.
              </div>
            ) : (
              filteredDiaryLogs.map((entry) => {
                const phaseConfig = PHASES[entry.phaseId?.toUpperCase()] || PHASES.MENSTRUAL;
                return (
                  <div
                    key={entry.id}
                    className="p-4 rounded-2xl bg-white/90 border-2 border-white/80 shadow-md space-y-2 hover:border-slate-900/25 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span>{entry.date}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                              {phaseConfig.emoji} {phaseConfig.shortName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-black">
                        <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800">
                          ⚡ {entry.energy}/5
                        </span>
                      </div>
                    </div>

                    {/* Note text */}
                    <p className="text-xs sm:text-sm font-bold text-slate-800 pl-1 leading-relaxed">
                      {entry.note || 'Quiet day.'}
                    </p>

                    {/* Tags for cravings / breakdown / exam */}
                    {(entry.cravings || entry.emotionalBreakdown || entry.examTomorrow) && (
                      <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                        {entry.cravings && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-200">
                            🍫 Craving: {entry.cravingNote || 'Yes'}
                          </span>
                        )}
                        {entry.emotionalBreakdown && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 text-[10px] font-black border border-purple-200">
                            ⛈️ Breakdown: {entry.breakdownNote || 'Yes'}
                          </span>
                        )}
                        {entry.examTomorrow && (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 text-[10px] font-black border border-indigo-200">
                            📚 Exam Prep
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
