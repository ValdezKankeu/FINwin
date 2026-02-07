'use client';

import type { LifePath } from '@/types';

const PATHS: { id: LifePath; name: string; icon: string; tagline: string; vibe: string; color: string }[] = [
  {
    id: 'american-dream',
    name: 'American Dream',
    icon: '🏡',
    tagline: 'Home, family, stability',
    vibe: 'Build something that lasts',
    color: 'from-green-50 to-emerald-50 hover:border-green-400',
  },
  {
    id: 'flashy-lifestyle',
    name: 'Flashy Lifestyle',
    icon: '✨',
    tagline: 'Travel, experiences, freedom',
    vibe: 'Live loud, spend smart',
    color: 'from-purple-50 to-pink-50 hover:border-purple-400',
  },
  {
    id: 'low-risk-investor',
    name: 'Low-Risk Investor',
    icon: '🛡️',
    tagline: 'Security, assets, peace of mind',
    vibe: 'Slow and steady wins the race',
    color: 'from-blue-50 to-cyan-50 hover:border-blue-400',
  },
  {
    id: 'foreign-life',
    name: 'Global Life',
    icon: '🌍',
    tagline: 'Money across borders',
    vibe: 'The world is your office',
    color: 'from-amber-50 to-orange-50 hover:border-amber-400',
  },
];

export default function LifePathSelect({ onSelect }: { onSelect: (path: LifePath) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold">What do you want your life to look like?</h2>
          <p className="text-lg text-gray-500">Pick a path. You can always change your mind.</p>
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
              <p className="text-gray-600 text-sm mb-3">{p.tagline}</p>
              <p className="text-gray-400 text-xs italic">{p.vibe}</p>

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
