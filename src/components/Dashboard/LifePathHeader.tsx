'use client';

import { LifePath } from '@/types';
import { lifePaths } from '@/data/lifePathsData';

interface Props {
  currentPath: LifePath;
  onPathChange: (path: LifePath) => void;
  xp?: number;
}

export default function LifePathHeader({ currentPath, onPathChange, xp = 0 }: Props) {
  const current = lifePaths[currentPath];
  const level = xp >= 100 ? 'Money Master' : xp >= 60 ? 'Budget Pro' : xp >= 30 ? 'Getting There' : 'Starter';

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                FIN<span className="text-[#00D632]">win</span>
                <span className="text-gray-400 font-normal text-sm ml-2">/ {current.name}</span>
              </h1>
              <p className="text-gray-500 text-sm">{current.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {xp > 0 && (
              <span className="px-3 py-1 bg-[#00D632]/10 text-[#00D632] rounded-full text-sm font-semibold">
                {xp} XP — {level}
              </span>
            )}
            <select
              value={currentPath}
              onChange={(e) => onPathChange(e.target.value as LifePath)}
              className="bg-gray-100 border-0 rounded-lg px-4 py-2 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00D632]"
            >
              {Object.values(lifePaths).map((path) => (
                <option key={path.id} value={path.id}>
                  {path.icon} {path.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
