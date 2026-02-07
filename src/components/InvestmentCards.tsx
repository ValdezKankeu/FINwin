'use client';

import { useState } from 'react';

const CONCEPTS = [
  {
    icon: '🛡️',
    title: 'Emergency Fund',
    metaphor: 'Your financial shield',
    short: '3-6 months of expenses in a savings account',
    detail: 'Before you invest a single dollar, build a shield. If life hits you (car breaks, job loss, medical bill), this keeps you from going into debt. High-yield savings account = 4.5%+ APY while it sits there.',
    color: 'from-green-50 to-emerald-50',
  },
  {
    icon: '🎁',
    title: '401k Match',
    metaphor: 'Free XP from your employer',
    short: 'Your employer gives you free money. Take it.',
    detail: 'If your employer matches 50% of your 401k up to 6%, and you make $4,500/mo — that\'s $135/mo of FREE money. Saying no is literally leaving cash on the table. Always max the match.',
    color: 'from-purple-50 to-pink-50',
  },
  {
    icon: '🧬',
    title: 'Compound Interest',
    metaphor: 'Money cloning',
    short: '$200/mo at 7% = $120K in 20 years',
    detail: 'Your money earns money. Then THAT money earns money. $200/mo invested at 7% becomes $120K in 20 years — you only put in $48K. The other $72K? Your money cloned itself. Start early = more clones.',
    color: 'from-blue-50 to-cyan-50',
  },
  {
    icon: '📈',
    title: 'Index Funds',
    metaphor: 'The steady path',
    short: 'Own a piece of everything, stress about nothing',
    detail: 'Instead of picking stocks (gambling), index funds like VTI or VOO own 500+ companies at once. Average 7-10% annual return. Warren Buffett recommends them. Low fees, low stress, high results.',
    color: 'from-amber-50 to-orange-50',
  },
  {
    icon: '⏰',
    title: 'Time',
    metaphor: 'Your most valuable asset',
    short: 'Starting at 20 vs 30 = 2x the money',
    detail: 'Someone who invests $200/mo from age 20-30 and STOPS will have MORE at 60 than someone who starts at 30 and invests until 60. 10 years of early investing beats 30 years of late investing. Start now.',
    color: 'from-red-50 to-pink-50',
  },
  {
    icon: '👻',
    title: 'Opportunity Cost',
    metaphor: 'Ghost money',
    short: 'What your money COULD have become',
    detail: 'That $150/mo in subscriptions you don\'t use? In 10 years, invested, it\'s $26,000. Every dollar you spend has a ghost — the future version of itself you\'ll never meet. Make spending intentional.',
    color: 'from-gray-50 to-gray-100',
  },
];

export default function InvestmentCards() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Up Your Money IQ</h2>
      <p className="text-gray-500 mb-6">Tap any card to learn more. No jargon, we promise.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONCEPTS.map((c, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={`text-left p-4 rounded-xl bg-gradient-to-br ${c.color} border-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${
              expanded === i ? 'border-[#00D632] shadow-md' : 'border-transparent'
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <h3 className="font-bold text-gray-900 mt-2">{c.title}</h3>
            <p className="text-xs text-gray-500 italic">{c.metaphor}</p>
            <p className="text-sm text-gray-600 mt-2">{c.short}</p>

            {expanded === i && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">{c.detail}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
