'use client';

import { LifePath } from '@/types';
import { lifePaths } from '@/data/lifePathsData';

interface Props {
  currentPath: LifePath;
  onPathChange: (path: LifePath) => void;
}

export default function LifePathHeader({ currentPath, onPathChange }: Props) {
  const current = lifePaths[currentPath];

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <h1 className="text-xl font-bold">{current.name}</h1>
              <p className="text-blue-100 text-sm">{current.tagline}</p>
            </div>
          </div>
          
          <select
            value={currentPath}
            onChange={(e) => onPathChange(e.target.value as LifePath)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {Object.values(lifePaths).map((path) => (
              <option key={path.id} value={path.id} className="text-gray-900">
                {path.icon} {path.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}