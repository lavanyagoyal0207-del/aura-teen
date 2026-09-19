import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Search, Sparkles, Heart, Pin, Calendar } from 'lucide-react';
import { GlassCard, GlowButton } from './StitchUI';
import { PHASES } from '../utils/cycleCalculations';

export default function JournalScreen({ currentPhase, journalEntries = [], onAddEntry, onDeleteEntry }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💭');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(true);

  const emojiOptions = ['💭', '✨', '🌸', '🍵', '🎨', '🌧️', '⚡', '🌙', '💜'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry = {
      id: 'journal-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: title.trim() || 'Untitled Musings',
      content: content.trim(),
      emoji: selectedEmoji,
      phaseId: currentPhase.id,
      phaseName: currentPhase.shortName,
    };

    onAddEntry(newEntry);
    setTitle('');
    setContent('');
  };

  const filteredEntries = journalEntries.filter((entry) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.content.toLowerCase().includes(q) ||
      (entry.phaseName && entry.phaseName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-2xl mx-auto w-full animate-fadeIn space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-900/10 text-xs font-black uppercase tracking-widest text-purple-600 mb-3 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" /> Standalone Space
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Cycle Journal 📖
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base font-semibold">
          Your private, unconstrained diary to express thoughts, doodles of the mind, and mood reflections.
        </p>
      </div>

      {/* Free-Text Writing Form */}
      <GlassCard className="relative">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-900/10">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <h2 className="text-lg font-black text-slate-900">New Journal Entry</h2>
          </div>
          <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-900 text-white">
            {currentPhase.emoji} {currentPhase.name}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Emoji Selector */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedEmoji}
                onChange={(e) => setSelectedEmoji(e.target.value)}
                className="h-12 px-3 rounded-2xl bg-white border-2 border-slate-900/15 font-bold text-xl cursor-pointer focus:outline-none focus:border-slate-900"
              >
                {emojiOptions.map((em) => (
                  <option key={em} value={em}>
                    {em}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Entry Title (e.g., Cozy tea vibes, Midweek thoughts...)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white border-2 border-slate-900/15 font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm text-sm"
            />
          </div>

          {/* Free-Text Content */}
          <div>
            <textarea
              rows={4}
              placeholder="Pour your heart out, write your thoughts, or describe how your body feels today..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-slate-900/15 font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm text-sm leading-relaxed"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <GlowButton
              type="submit"
              variant="glowPink"
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span>Save Journal Entry ✨</span>
            </GlowButton>
          </div>
        </form>
      </GlassCard>

      {/* Past Journal Entries Feed */}
      <GlassCard className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-900/10">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Past Journal Logs</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {journalEntries.length}
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Scroll through your personal reflections over time
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reflections..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-900/15 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-bold text-sm">
              No journal entries found. Write your first thought above! ✨
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const pConfig = PHASES[entry.phaseId?.toUpperCase()] || PHASES.MENSTRUAL;
              return (
                <div
                  key={entry.id}
                  className="p-5 rounded-2xl bg-white/90 border-2 border-slate-900/10 shadow-sm space-y-2.5 hover:border-slate-900/25 transition-all sticker-card"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{entry.emoji || '💭'}</span>
                      <div>
                        <h3 className="font-black text-base text-slate-900">
                          {entry.title}
                        </h3>
                        <div className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                          <span>{entry.date} {entry.time ? `• ${entry.time}` : ''}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {pConfig.emoji} {pConfig.shortName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteEntry(entry.id)}
                      title="Delete entry"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap pl-1">
                    {entry.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </GlassCard>
    </div>
  );
}
