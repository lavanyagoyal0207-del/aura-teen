import { GoogleGenAI } from '@google/genai';

// Friendly, non-medical fallback quotes per cycle phase
const FALLBACK_REFLECTIONS = {
  menstrual: [
    "Honor your need for cozy blankets, extra naps, and warm sips today. 🧦☕",
    "Slow down and let your energy recharge like your favorite cozy playlist. 🌧️✨",
    "Resting is productive—give yourself permission to just chill and breathe. 🌸🛋️",
    "A cozy hoodie and low-key vibes are the ultimate power move today. 🍵💖",
  ],
  follicular: [
    "New spark alert! Your creative brain is buzzing with fresh ideas today. 🌱✨",
    "Energy is climbing up—great time to start that cute new project or sketch! 🎨🚀",
    "Curiosity is your superpower today; go explore something fun and new! ⚡🎧",
    "Bright vibes incoming—you're catching your natural creative wave! 💡🌟",
  ],
  ovulation: [
    "Radiating superstar glow today! Your energy and confidence are on point. 🤩✨",
    "Peak vitality mode unlocked—share your laugh and brighten the whole room! 🌟💖",
    "You're in your magnetic era today; embrace the bold, social energy! 💃🔥",
    "Supercharged focus and high spirits—you've got that natural sparkle! 🌈✨",
  ],
  luteal: [
    "Embrace the cozy introspective vibes; perfect time for journaling and snacks! 🍪🌙",
    "Trust your instincts and make time for the things that comfort your heart. 🕯️📖",
    "Winding down is natural—protect your peace and enjoy peaceful solo time. 🔮🕊️",
    "Snuggle into your comfort zone; your intuition is gentle and strong. 🍵💜",
  ],
};

function getRandomFallback(phaseId) {
  const list = FALLBACK_REFLECTIONS[phaseId] || FALLBACK_REFLECTIONS.menstrual;
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Generates an empathetic, strictly non-medical, 1-sentence teen reflection
 * using Gemini 2.5 Flash.
 */
export async function generateDailyReflection(phase, userNote = '') {
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '') || '';

  if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.trim() === '') {
    return getRandomFallback(phase.id);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are a supportive, quirky, big-sister vibe companion for a teen menstrual self-awareness app.
Current Cycle Phase: ${phase.name} (${phase.description}).
${userNote ? `User's log note today: "${userNote}"` : ''}

Generate exactly ONE short, warm, punchy sentence (maximum 20 words) with 1-2 fun emojis.
STRICT RULES:
1. Absolutely NO medical advice, clinical terms, hormone jargon, diagnosis, or treatment claims.
2. Focus purely on self-compassion, daily mood rhythm, cozy vibes, and teen self-awareness.
3. Keep the tone upbeat, relatable, and Gen-Z friendly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response?.text?.trim();
    if (text) {
      // Strip any accidental wrapping quotes
      return text.replace(/^["']|["']$/g, '');
    }
    return getRandomFallback(phase.id);
  } catch (error) {
    console.warn('Gemini 2.5 Flash reflection error (using curated fallback):', error.message || error);
    return getRandomFallback(phase.id);
  }
}
