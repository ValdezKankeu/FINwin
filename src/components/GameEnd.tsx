'use client';

import type { GameResult } from './AmericanDreamGame';

interface Props {
  result: GameResult;
  onDashboard: () => void;
  onReplay: () => void;
}

export default function GameEnd({ result, onDashboard, onReplay }: Props) {
  const isFlashy = result.path === 'Flashy Lifestyle';
  const fmt = (n: number) => '$' + Math.abs(Math.round(n)).toLocaleString();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-8">
        {/* Personality badge */}
        <div className="text-center space-y-3">
          <div className="text-6xl">{isFlashy ? '💥' : '🏆'}</div>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Your Financial Personality</p>
          <h1 className="text-5xl font-bold">{result.personality}</h1>
          <p className="text-lg text-gray-500 italic">"{result.lesson}"</p>
        </div>

        {/* Final stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-2xl p-4 text-center ${result.finalNetWorth >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-xs text-gray-500">Net Worth</p>
            <p className={`text-2xl font-bold ${result.finalNetWorth >= 0 ? 'text-[#00D632]' : 'text-red-500'}`}>
              {result.finalNetWorth >= 0 ? fmt(result.finalNetWorth) : `-${fmt(result.finalNetWorth)}`}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500">Total Saved</p>
            <p className="text-2xl font-bold text-[#00D632]">{fmt(result.finalSavings)}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500">Remaining Debt</p>
            <p className={`text-2xl font-bold ${result.finalDebt > 0 ? 'text-red-500' : 'text-[#00D632]'}`}>
              {result.finalDebt > 0 ? fmt(result.finalDebt) : '$0'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500">Stress</p>
            <p className={`text-2xl font-bold ${result.finalStress > 50 ? 'text-red-500' : 'text-[#00D632]'}`}>
              {result.finalStress}/100
            </p>
          </div>
        </div>

        {/* Flashy path special end screen */}
        {isFlashy && (
          <div className="bg-gray-900 text-white rounded-2xl p-6 text-center space-y-2">
            <p className="text-sm text-white/60">The truth:</p>
            <p className="text-xl font-bold">You won attention. You lost time.</p>
            <p className="text-sm text-white/60">
              Retirement savings: $0 · Years to financial freedom: ∞
            </p>
          </div>
        )}

        {/* Decision review */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Your Decisions</h3>
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            {result.decisions.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-400 mt-0.5 w-12 flex-shrink-0">Mo {d.month}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{d.choice}</p>
                  <p className="text-xs text-gray-500">{d.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onDashboard}
            className="w-full h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            See My Full Dashboard
          </button>
          <button
            onClick={onReplay}
            className="w-full h-12 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-all active:scale-95"
          >
            Try a Different Path
          </button>
        </div>
      </div>
    </div>
  );
}
