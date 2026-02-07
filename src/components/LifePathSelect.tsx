'use client';

import type { LifePath } from '@/types';

const PATHS: { id: LifePath; name: string; icon: string; tagline: string; strategy: string; timeline: string; color: string }[] = [
  {
    id: 'low-risk-investor',
    name: 'Safe Investor',
    icon: '🛡️',
    tagline: 'Consistent growth, low risk',
    strategy: 'Index funds, 401(k), emergency fund first. FHA loan on a 4-unit property — live in one, rent three.',
    timeline: '20–30 years to retirement',
    color: 'from-blue-50 to-cyan-50 hover:border-blue-400',
  },
  {
    id: 'american-dream',
    name: 'American Dream',
    icon: '🏡',
    tagline: 'Homeownership, stability, family security',
    strategy: 'Down payment savings, debt payoff, 15-year mortgage. Build equity and generational wealth.',
    timeline: '5–10 years to homeownership',
    color: 'from-green-50 to-emerald-50 hover:border-green-400',
  },
  {
    id: 'flashy-lifestyle',
    name: 'Flashy Lifestyle',
    icon: '✨',
    tagline: 'High income, high spending, high risk',
    strategy: 'See what happens when lifestyle inflation goes unchecked. A cautionary simulation.',
    timeline: 'Warning: this path teaches through failure',
    color: 'from-purple-50 to-pink-50 hover:border-purple-400',
  },
  {
    id: 'foreign-life',
    name: 'Global Life',
    icon: '🌍',
    tagline: 'Money across borders',
    strategy: 'Remote work, geo-arbitrage, international investing. The world is your office.',
    timeline: '1–3 years to location independence',
    color: 'from-amber-50 to-orange-50 hover:border-amber-400',
  },
];

export default function LifePathSelect({ onSelect }: { onSelect: (path: LifePath) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-[#00D632]">Phase 4: Your Life Path</p>
          <h2 className="text-4xl font-bold">What do you want your life to look like?</h2>
          <p className="text-lg text-gray-500">Each path generates a personalized financial roadmap.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATHS.map(p => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`group relative text-left p-6 rounded-2xl border-2 border-transparent bg-gradient-to-br ${p.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]`}
            >
              <span className="text-4xl block mb-3">{p.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{p.tagline}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-2">{p.strategy}</p>
              <p className="text-gray-400 text-xs italic">{p.timeline}</p>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
