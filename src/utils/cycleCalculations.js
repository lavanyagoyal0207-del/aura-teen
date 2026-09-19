export const PHASES = {
  MENSTRUAL: {
    id: 'menstrual',
    name: 'Menstrual Phase',
    shortName: 'Menstrual',
    daysLabel: 'Days 1–5',
    emoji: '🌸',
    accentColor: '#f43f5e',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    chartFill: '#f43f5e',
    bgGradient: 'from-rose-100 via-pink-100 to-rose-200',
    description: 'Time to rest, hydrate, and nurture your energy quietly.',
    vibeTag: 'Cozy & Reset',
    colorKey: 'rose',
  },
  FOLLICULAR: {
    id: 'follicular',
    name: 'Follicular Phase',
    shortName: 'Follicular',
    daysLabel: 'Days 6–13',
    emoji: '🌱',
    accentColor: '#f97316',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    chartFill: '#f97316',
    bgGradient: 'from-amber-100 via-orange-100 to-orange-200',
    description: 'Fresh energy is rising! Great for creativity and new ideas.',
    vibeTag: 'Spark & Curiosity',
    colorKey: 'amber',
  },
  OVULATION: {
    id: 'ovulation',
    name: 'Ovulation Phase',
    shortName: 'Ovulation',
    daysLabel: 'Days 14–16',
    emoji: '✨',
    accentColor: '#10b981',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    chartFill: '#10b981',
    bgGradient: 'from-emerald-100 via-teal-100 to-teal-200',
    description: 'High energy and natural glow! Peak social confidence.',
    vibeTag: 'Glow & Vitality',
    colorKey: 'emerald',
  },
  LUTEAL: {
    id: 'luteal',
    name: 'Luteal Phase',
    shortName: 'Luteal',
    daysLabel: 'Days 17–28+',
    emoji: '🌙',
    accentColor: '#8b5cf6',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    chartFill: '#8b5cf6',
    bgGradient: 'from-purple-100 via-indigo-100 to-indigo-200',
    description: 'Winding down, nestling into comfort foods and quiet focus.',
    vibeTag: 'Intuition & Zen',
    colorKey: 'purple',
  },
};

/**
 * Calculates current cycle day and phase based on last period start date and cycle length
 */
export function calculateCycleState(startDateStr, cycleLength = 28) {
  if (!startDateStr) {
    return {
      cycleDay: 1,
      phase: PHASES.MENSTRUAL,
      daysRemainingInPhase: 4,
      normalizedDay: 1,
    };
  }

  const start = new Date(startDateStr);
  const today = new Date();
  
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const validCycleLength = Math.max(18, Math.min(50, Number(cycleLength) || 28));

  let normalizedDay = ((diffDays % validCycleLength) + validCycleLength) % validCycleLength + 1;

  let phase;
  let daysRemainingInPhase = 1;

  if (normalizedDay <= 5) {
    phase = PHASES.MENSTRUAL;
    daysRemainingInPhase = 5 - normalizedDay + 1;
  } else if (normalizedDay <= 13) {
    phase = PHASES.FOLLICULAR;
    daysRemainingInPhase = 13 - normalizedDay + 1;
  } else if (normalizedDay <= 16) {
    phase = PHASES.OVULATION;
    daysRemainingInPhase = 16 - normalizedDay + 1;
  } else {
    phase = PHASES.LUTEAL;
    daysRemainingInPhase = validCycleLength - normalizedDay + 1;
  }

  return {
    cycleDay: normalizedDay,
    phase,
    daysRemainingInPhase,
    cycleLength: validCycleLength,
    totalElapsedDays: diffDays,
  };
}

/**
 * Red-Flag Detection and Cycle Consistency Logic
 */
export function getRedFlagMessage(consistencyLabel) {
  if (consistencyLabel === "Highly Variable") {
    return "Your cycle pattern has been unusually irregular over recent months. There can be many reasons for this — consider discussing your pattern with a healthcare professional.";
  }
  return null;
}

export function getCycleConsistency(cycleLength, variabilityOverride = null) {
  const length = Number(cycleLength) || 28;
  let label = "Typical Rhythm";

  if (variabilityOverride === "Highly Variable" || length < 21 || length > 40) {
    label = "Highly Variable";
  } else if (length < 24 || length > 35) {
    label = "Mildly Variable";
  }

  return {
    label,
    redFlagMessage: getRedFlagMessage(label),
    isRedFlag: label === "Highly Variable",
  };
}
