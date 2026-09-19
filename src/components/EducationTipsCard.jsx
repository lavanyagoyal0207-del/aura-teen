import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Sparkles, Heart, ShieldCheck, Smile } from 'lucide-react';
import { GlassCard } from './StitchUI';

export default function EducationTipsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState('products');

  const tips = [
    {
      id: 'products',
      emoji: '🎀',
      title: 'Period Products 101',
      tag: 'Basics',
      summary: 'Finding what feels comfy for your lifestyle and flow.',
      details: [
        '🌸 Pads: Great for day & night, easy to stick onto underwear.',
        '🩲 Panty Liners: Ultra-thin; perfect for light spotting days or extra backup.',
        '✨ Period Underwear: Reusable, leak-resistant, super cozy for lounging or school.',
        '💧 Tampons / Cups: Internal options for sports & swimming; always change regularly.',
      ],
    },
    {
      id: 'hygiene',
      emoji: '🧼',
      title: 'Gentle Hygiene Habits',
      tag: 'Fresh Care',
      summary: 'Simple, non-irritating daily self-care.',
      details: [
        '🫧 Keep it gentle: Warm water is best; avoid harsh scented washes or douches.',
        '⏰ Fresh swap: Change pads or tampons every 4 to 6 hours for maximum freshness.',
        '🌿 Breathable fabrics: Cotton undies help keep skin cool and dry.',
        '🧻 Wipe front to back: A classic rule that prevents any unwanted bacteria.',
      ],
    },
    {
      id: 'cramps',
      emoji: '🍵',
      title: 'Cozy Cramp Soothers',
      tag: 'Comfort',
      summary: 'Natural comforting rituals when your body feels tender.',
      details: [
        '🔥 Heat buddy: A warm heating pad or hot water bottle placed gently on the lower belly.',
        '🫖 Warm sips: Chamomile, peppermint, or warm lemon honey water.',
        '🧘 Slow stretching: Cat-cow yoga poses or child’s pose relieve lower back tension.',
        '😴 Power naps: Curling up in a dark, quiet room does wonders for recovery.',
      ],
    },
    {
      id: 'mindset',
      emoji: '🌈',
      title: 'Listening to Your Rhythm',
      tag: 'Mindset',
      summary: 'Every body is unique—there is no one "perfect" cycle.',
      details: [
        '💖 No comparison: Cycles often fluctuate during teenage years as your body grows.',
        '🎨 Honor your mood: Feeling quiet or super energetic is completely natural.',
        '📝 Log without judgment: Observing patterns builds self-trust and awareness.',
      ],
    },
  ];

  return (
    <GlassCard className="transition-all duration-300">
      {/* Header / Accordion Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
            📚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Teen Hygiene & Care Tips
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-500 text-white uppercase tracking-wider">
                Guide
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Friendly basics on products, freshness, and cozy comfort
            </p>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="mt-5 pt-5 border-t border-slate-900/10 animate-fadeIn space-y-4">
          {/* Topic Pills */}
          <div className="flex flex-wrap gap-2">
            {tips.map((tip) => (
              <button
                key={tip.id}
                type="button"
                onClick={() => setActiveTopic(tip.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTopic === tip.id
                    ? 'bg-slate-900 text-white shadow-sm scale-[1.02]'
                    : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-900/10'
                }`}
              >
                <span>{tip.emoji}</span>
                <span>{tip.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tip Card */}
          {(() => {
            const current = tips.find((t) => t.id === activeTopic) || tips[0];
            return (
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-900/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-sm text-slate-900">
                    <span className="text-xl">{current.emoji}</span>
                    <span>{current.title}</span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    {current.tag}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600 italic">
                  {current.summary}
                </p>

                <ul className="space-y-2 pt-1 text-xs sm:text-sm font-medium text-slate-700">
                  {current.details.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-pink-500 font-bold shrink-0">✦</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      )}
    </GlassCard>
  );
}
