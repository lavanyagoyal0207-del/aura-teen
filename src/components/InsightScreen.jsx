import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Sparkles, TrendingUp, Zap, Smile, RotateCcw, BookOpen, UserCheck, PlusCircle } from 'lucide-react';
import { GlassCard, DisclaimerBanner } from './StitchUI';
import { getInsightData, calculateTallySummary } from '../data/seedData';
import { PHASES } from '../utils/cycleCalculations';

// Custom Tooltip for Recharts
const CustomChartTooltip = ({ active, payload, label, isBaseline }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[170px] backdrop-blur-md">
        <div className="font-extrabold text-sm text-pink-300 border-b border-slate-700 pb-1">
          {label}
        </div>
        <div className="flex items-center justify-between text-rose-300 font-bold">
          <span>😊 Avg Mood:</span>
          <span>{payload[0]?.value} / 5</span>
        </div>
        <div className="flex items-center justify-between text-amber-300 font-bold">
          <span>⚡ Avg Energy:</span>
          <span>{payload[1]?.value} / 5</span>
        </div>
        <div className="text-[10px] text-slate-400 pt-1 font-medium">
          {isBaseline ? '📚 Published Research Baseline' : `Personal logs: ${payload[0]?.payload?.count}`}
        </div>
      </div>
    );
  }
  return null;
};

export default function InsightScreen({ logs = [], currentPhase, onNavigateToCheckIn }) {
  const [activeTab, setActiveTab] = useState('chart'); // 'chart' | 'logs'
  const insightResult = getInsightData(logs);
  const isBaseline = insightResult.source === 'baseline';
  const tally = calculateTallySummary(logs, insightResult.source);

  return (
    <div className="max-w-3xl mx-auto w-full animate-fadeIn space-y-6">
      {/* Screen Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/80 border border-white/90 text-xs font-black uppercase tracking-widest text-indigo-600 mb-3 shadow-md">
          <TrendingUp className="w-3.5 h-3.5" /> Pattern Discovery
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Phase-Based Insights 📊
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base font-semibold">
          Understand how natural mood and energy flow across all 4 cycle phases.
        </p>
      </div>

      {/* Smart Source Badge & Personalization Progress */}
      <div className="p-4 rounded-3xl backdrop-blur-xl bg-white/80 border-2 border-white/90 shadow-lg space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isBaseline ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-black text-xs border border-blue-200">
                <BookOpen className="w-3.5 h-3.5" /> Research Baseline Mode
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs border border-emerald-200">
                <UserCheck className="w-3.5 h-3.5" /> Personalized Rhythm Active ✨
              </span>
            )}
            <span className="text-xs font-bold text-slate-600">
              {logs.length} check-in{logs.length === 1 ? '' : 's'} logged
            </span>
          </div>

          <div className="text-xs font-black text-slate-500">
            {isBaseline
              ? `${insightResult.remainingLogs} more log${insightResult.remainingLogs === 1 ? '' : 's'} to unlock personal curve`
              : 'Personal dataset fully active! 🎉'}
          </div>
        </div>

        {/* Progress Bar towards 5 logs */}
        {isBaseline && (
          <div className="space-y-1.5 pt-1">
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden border border-slate-300 shadow-inner">
              <div
                className="bg-gradient-to-r from-pink-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (logs.length / 5) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] font-semibold text-slate-500 leading-snug">
              Showing published peer-reviewed adolescent averages as a baseline until you log 5+ entries. No fake data!
            </p>
          </div>
        )}
      </div>

      {/* 4 Phase Summary Cards Grid (with Active Phase Accentuation) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {insightResult.data.map((m) => {
          const isCurrentPhase = currentPhase.id === m.phaseId;
          const phaseConfig = PHASES[m.phaseId.toUpperCase()];

          return (
            <div
              key={m.phaseId}
              className={`relative p-4 rounded-3xl transition-all duration-300 border-2 backdrop-blur-xl ${
                isCurrentPhase
                  ? 'bg-white shadow-xl border-slate-900 ring-4 ring-pink-300/60 scale-[1.03] z-10'
                  : 'bg-white/65 border-white/80 hover:bg-white/85 shadow-md'
              }`}
            >
              {isCurrentPhase && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-2.5 h-2.5 text-pink-400" /> Active Phase
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{phaseConfig?.emoji}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-slate-600 border border-slate-200">
                  {phaseConfig?.daysLabel}
                </span>
              </div>

              <div className="font-extrabold text-slate-900 text-sm mb-2">
                {m.name}
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1">
                    <Smile className="w-3 h-3 text-rose-500" /> Mood:
                  </span>
                  <span className="font-black text-slate-800">{m.avgMood} / 5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> Energy:
                  </span>
                  <span className="font-black text-slate-800">{m.avgEnergy} / 5</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Visual Chart Card */}
      <GlassCard className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Mood & Energy Across Phases</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {isBaseline ? 'Comparing published research baseline ratings' : 'Comparing your personalized phase ratings'} (1 = lowest, 5 = highest)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chart'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white/70 text-slate-600 hover:bg-white'
              }`}
            >
              Chart View
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white/70 text-slate-600 hover:bg-white'
              }`}
            >
              Your Real Logs ({logs.length})
            </button>
          </div>
        </div>

        {activeTab === 'chart' ? (
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={insightResult.data}
                margin={{ top: 20, right: 15, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15, 23, 42, 0.08)" />
                <XAxis
                  dataKey="displayName"
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(15, 23, 42, 0.15)' }}
                  tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(15, 23, 42, 0.15)' }}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip content={<CustomChartTooltip isBaseline={isBaseline} />} />
                <Legend
                  wrapperStyle={{ paddingTop: '16px', fontSize: '13px', fontWeight: 'bold' }}
                />
                <Bar
                  dataKey="avgMood"
                  name="Avg Mood (1-5)"
                  fill="#f43f5e"
                  radius={[8, 8, 0, 0]}
                  barSize={24}
                />
                <Bar
                  dataKey="avgEnergy"
                  name="Avg Energy (1-5)"
                  fill="#f59e0b"
                  radius={[8, 8, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          /* Real User Logs Feed */
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-bold text-sm space-y-2">
                <div>No check-in entries logged yet.</div>
                <button
                  type="button"
                  onClick={onNavigateToCheckIn}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-all cursor-pointer"
                >
                  + Log Your First Check-In
                </button>
              </div>
            ) : (
              logs.slice().reverse().map((log) => {
                const pConfig = PHASES[log.phaseId?.toUpperCase()] || PHASES.MENSTRUAL;
                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl bg-white/80 border border-slate-900/10 flex items-center justify-between text-xs sm:text-sm shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{pConfig.emoji}</span>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          <span>{log.note || 'Logged check-in'}</span>
                          {log.cravings && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black">
                              🍫 {log.cravingNote || 'Craving'}
                            </span>
                          )}
                          {log.emotionalBreakdown && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black">
                              ⛈️ {log.breakdownNote || 'Breakdown'}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {log.date} • {pConfig.shortName} Phase
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 font-extrabold shrink-0">
                      <span className="px-2 py-1 rounded-lg bg-rose-100 text-rose-800">
                        Mood {log.mood}
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-800">
                        ⚡ {log.energy}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Text Tally Summary Box */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/90 border-2 border-white/80 shadow-md space-y-2.5">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Pattern Summary
            </div>
            {isBaseline && (
              <span className="text-[10px] text-slate-400 font-semibold">
                (Based on research averages)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-slate-800">
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5 shadow-xs">
              <span className="text-xl">🍫</span>
              <div>
                <span>Cravings logged: <strong>{tally.totalCravings}</strong></span>
                <div className="text-[11px] text-amber-900/70 font-semibold">
                  mostly during <span className="underline decoration-amber-400 font-bold">{tally.cravingsDominantPhase}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 flex items-center gap-2.5 shadow-xs">
              <span className="text-xl">⛈️</span>
              <div>
                <span>Emotional breakdowns logged: <strong>{tally.totalBreakdowns}</strong></span>
                <div className="text-[11px] text-purple-900/70 font-semibold">
                  mostly during <span className="underline decoration-purple-400 font-bold">{tally.breakdownsDominantPhase}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Highlight Note & Log Trigger */}
        <div className="mt-4 p-3 rounded-2xl bg-white/70 border border-white/80 text-xs font-semibold text-slate-700 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">{currentPhase.emoji}</span>
            <span>You are currently in the <strong>{currentPhase.name}</strong>.</span>
          </div>
          <button
            onClick={onNavigateToCheckIn}
            className="text-pink-600 hover:text-pink-700 font-black underline text-xs cursor-pointer"
          >
            + Log Check-In
          </button>
        </div>
      </GlassCard>

      {/* Mandatory Disclaimer Copy */}
      <DisclaimerBanner />
    </div>
  );
}
