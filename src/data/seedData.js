import { PHASES } from '../utils/cycleCalculations';

/**
 * Research-based baseline (general, not user-specific)
 * Used as the baseline model until the user logs at least 5 real daily entries.
 */
export const baselinePhaseData = {
  menstrual: { avgMood: 2.5, avgEnergy: 2.0, count: 'Research' },
  follicular: { avgMood: 3.8, avgEnergy: 4.0, count: 'Research' },
  ovulation: { avgMood: 4.3, avgEnergy: 4.2, count: 'Research' },
  luteal: { avgMood: 2.8, avgEnergy: 2.6, count: 'Research' },
};

/**
 * Aggregate user logs by cycle phase
 */
export function aggregateByPhase(userLogs) {
  const phaseMap = {
    menstrual: { phaseId: 'menstrual', name: 'Menstrual', emoji: '🌸', totalMood: 0, totalEnergy: 0, count: 0, color: '#f43f5e' },
    follicular: { phaseId: 'follicular', name: 'Follicular', emoji: '🌱', totalMood: 0, totalEnergy: 0, count: 0, color: '#f97316' },
    ovulation: { phaseId: 'ovulation', name: 'Ovulation', emoji: '✨', totalMood: 0, totalEnergy: 0, count: 0, color: '#10b981' },
    luteal: { phaseId: 'luteal', name: 'Luteal', emoji: '🌙', totalMood: 0, totalEnergy: 0, count: 0, color: '#8b5cf6' },
  };

  userLogs.forEach((log) => {
    const p = phaseMap[log.phaseId?.toLowerCase()];
    if (p) {
      p.totalMood += Number(log.mood) || 0;
      p.totalEnergy += Number(log.energy) || 0;
      p.count += 1;
    }
  });

  return Object.values(phaseMap).map((p) => ({
    phaseId: p.phaseId,
    name: p.name,
    displayName: `${p.emoji} ${p.name}`,
    avgMood: p.count > 0 ? Number((p.totalMood / p.count).toFixed(1)) : 0,
    avgEnergy: p.count > 0 ? Number((p.totalEnergy / p.count).toFixed(1)) : 0,
    count: p.count,
    color: p.color,
  }));
}

/**
 * Smart insight data resolution:
 * Uses published research averages until user logs >= 5 entries,
 * then seamlessly switches to personalized real user logs.
 */
export function getInsightData(userLogs = []) {
  const MIN_REQUIRED_LOGS = 5;
  const isBaseline = !userLogs || userLogs.length < MIN_REQUIRED_LOGS;

  if (isBaseline) {
    const formattedBaseline = [
      {
        phaseId: 'menstrual',
        name: 'Menstrual',
        displayName: '🌸 Menstrual',
        avgMood: baselinePhaseData.menstrual.avgMood,
        avgEnergy: baselinePhaseData.menstrual.avgEnergy,
        count: userLogs.filter(l => l.phaseId === 'menstrual').length,
        color: '#f43f5e',
      },
      {
        phaseId: 'follicular',
        name: 'Follicular',
        displayName: '🌱 Follicular',
        avgMood: baselinePhaseData.follicular.avgMood,
        avgEnergy: baselinePhaseData.follicular.avgEnergy,
        count: userLogs.filter(l => l.phaseId === 'follicular').length,
        color: '#f97316',
      },
      {
        phaseId: 'ovulation',
        name: 'Ovulation',
        displayName: '✨ Ovulation',
        avgMood: baselinePhaseData.ovulation.avgMood,
        avgEnergy: baselinePhaseData.ovulation.avgEnergy,
        count: userLogs.filter(l => l.phaseId === 'ovulation').length,
        color: '#10b981',
      },
      {
        phaseId: 'luteal',
        name: 'Luteal',
        displayName: '🌙 Luteal',
        avgMood: baselinePhaseData.luteal.avgMood,
        avgEnergy: baselinePhaseData.luteal.avgEnergy,
        count: userLogs.filter(l => l.phaseId === 'luteal').length,
        color: '#8b5cf6',
      },
    ];

    return {
      source: 'baseline',
      data: formattedBaseline,
      userLogCount: userLogs.length,
      minRequired: MIN_REQUIRED_LOGS,
      remainingLogs: Math.max(0, MIN_REQUIRED_LOGS - userLogs.length),
    };
  }

  return {
    source: 'personal',
    data: aggregateByPhase(userLogs),
    userLogCount: userLogs.length,
    minRequired: MIN_REQUIRED_LOGS,
    remainingLogs: 0,
  };
}

/**
 * Calculates text tally summary for cravings & emotional breakdowns
 */
export function calculateTallySummary(userLogs = [], source = 'baseline') {
  const phaseNames = {
    menstrual: 'Menstrual Phase',
    follicular: 'Follicular Phase',
    ovulation: 'Ovulation Phase',
    luteal: 'Luteal Phase',
  };

  if (source === 'baseline' && userLogs.length === 0) {
    return {
      source: 'baseline',
      totalCravings: 'Commonly noted in research',
      cravingsDominantPhase: 'Luteal Phase',
      totalBreakdowns: 'Occasional puberty rhythm',
      breakdownsDominantPhase: 'Late Luteal & Menstrual',
      isDefaultResearch: true,
    };
  }

  const cravingsByPhase = { menstrual: 0, follicular: 0, ovulation: 0, luteal: 0 };
  const breakdownsByPhase = { menstrual: 0, follicular: 0, ovulation: 0, luteal: 0 };

  let totalCravings = 0;
  let totalBreakdowns = 0;

  userLogs.forEach((log) => {
    const p = log.phaseId?.toLowerCase();
    if (log.cravings) {
      totalCravings += 1;
      if (cravingsByPhase[p] !== undefined) cravingsByPhase[p] += 1;
    }
    if (log.emotionalBreakdown) {
      totalBreakdowns += 1;
      if (breakdownsByPhase[p] !== undefined) breakdownsByPhase[p] += 1;
    }
  });

  let maxCravingPhase = 'luteal';
  let maxCravingCount = -1;
  Object.entries(cravingsByPhase).forEach(([p, count]) => {
    if (count > maxCravingCount) {
      maxCravingCount = count;
      maxCravingPhase = p;
    }
  });

  let maxBreakdownPhase = 'luteal';
  let maxBreakdownCount = -1;
  Object.entries(breakdownsByPhase).forEach(([p, count]) => {
    if (count > maxBreakdownCount) {
      maxBreakdownCount = count;
      maxBreakdownPhase = p;
    }
  });

  return {
    source,
    totalCravings: `${totalCravings} times`,
    cravingsDominantPhase: totalCravings > 0 ? (phaseNames[maxCravingPhase] || 'Luteal Phase') : 'Not yet logged',
    totalBreakdowns: `${totalBreakdowns} times`,
    breakdownsDominantPhase: totalBreakdowns > 0 ? (phaseNames[maxBreakdownPhase] || 'Luteal Phase') : 'Not yet logged',
    isDefaultResearch: false,
  };
}
