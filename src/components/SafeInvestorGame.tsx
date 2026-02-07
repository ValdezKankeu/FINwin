'use client';

import { useState, useEffect } from 'react';
import type { GameResult } from './AmericanDreamGame';

interface Props {
  income: number;
  debt: number;
  leftover: number;
  onFinish: (result: GameResult) => void;
}

interface State {
  phase: number; // 0-5 phases of the investor journey
  month: number;
  emergency: number;
  k401: number;
  indexFund: number;
  rentalIncome: number;
  debt: number;
  netWorth: number;
  salary: number;
  hasProperty: boolean;
  propertyEquity: number;
  yearSkip: number; // for time-skip compounding
  log: { month: number; choice: string; impact: string }[];
}

// Each phase teaches a principle with choices
const PHASES = [
  {
    title: 'Build Your Foundation',
    principle: 'Emergency Fund',
    book: 'The Total Money Makeover',
    question: 'You have leftover income. What\'s your first move?',
  },
  {
    title: 'Eliminate Drag',
    principle: 'Debt Payoff',
    book: 'Rich Dad Poor Dad',
    question: 'You have debt and an emergency fund started. Strategy?',
  },
  {
    title: 'Capture Free Money',
    principle: '401(k) Match',
    book: 'I Will Teach You to Be Rich',
    question: 'Your employer offers a 401(k) match. How much do you contribute?',
  },
  {
    title: 'Grow Passively',
    principle: 'Index Fund Investing',
    book: 'The Simple Path to Wealth',
    question: 'You\'re debt-free with an emergency fund. Where does your money go?',
  },
  {
    title: 'The FHA Hack',
    principle: 'House Hacking',
    book: 'Rich Dad Poor Dad',
    question: 'You qualify for an FHA loan (3.5% down) on a 4-unit property. Each unit rents for $1,200/mo. You\'d live in one.',
  },
  {
    title: 'Time Skip: 10 Years Later',
    principle: 'Compound Interest',
    book: 'The Psychology of Money',
    question: 'Let\'s fast-forward and see what your decisions built.',
  },
];

export default function SafeInvestorGame({ income, debt: initDebt, leftover, onFinish }: Props) {
  const startDebt = initDebt > 0 ? initDebt * 12 : 0;
  const monthlyFree = Math.max(leftover, Math.round(income * 0.15));

  const [state, setState] = useState<State>({
    phase: 0,
    month: 1,
    emergency: 0,
    k401: 0,
    indexFund: 0,
    rentalIncome: 0,
    debt: startDebt,
    netWorth: -startDebt,
    salary: income,
    hasProperty: false,
    propertyEquity: 0,
    yearSkip: 0,
    log: [],
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const fmt = (n: number) => '$' + Math.abs(Math.round(n)).toLocaleString();

  const applyChoice = (label: string, impact: string, apply: (prev: State) => Partial<State>) => {
    setState(prev => {
      const changes = apply(prev);
      const next = { ...prev, ...changes };
      next.netWorth = next.emergency + next.k401 + next.indexFund + next.propertyEquity - next.debt;
      next.log = [...prev.log, { month: prev.month, choice: label, impact }];
      next.month = prev.month + 1;
      return next;
    });
    setFeedback(impact);
    setTimeout(() => {
      setFeedback(null);
      setState(prev => ({ ...prev, phase: prev.phase + 1 }));
    }, 2000);
  };

  // Phase 5: Time skip — auto-calculate and finish (via useEffect to avoid side effects during render)
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (state.phase < 5 || finished) return;
    setFinished(true);

    const years = 10;
    const monthlyK401 = Math.round(monthlyFree * 0.15);
    const monthlyIndex = Math.round(monthlyFree * 0.4);
    const monthlyRate = 0.07 / 12;
    const months = years * 12;

    const fvFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    const future401k = state.k401 * Math.pow(1 + monthlyRate, months) + monthlyK401 * fvFactor;
    const futureIndex = state.indexFund * Math.pow(1 + monthlyRate, months) + monthlyIndex * fvFactor;

    const rentalTotal = state.hasProperty ? 3 * 1200 * 12 * years : 0;
    const propertyAppreciation = state.hasProperty ? 280000 * 0.03 * years : 0;

    const finalNetWorth = Math.round(future401k + futureIndex + state.emergency + rentalTotal + propertyAppreciation - state.debt);
    const finalSavings = Math.round(future401k + futureIndex + state.emergency);

    const personality = state.hasProperty
      ? 'The Architect'
      : state.k401 > 0 && state.indexFund > 0
      ? 'The Compound Machine'
      : 'The Steady Builder';

    onFinish({
      path: 'Safe Investor',
      months: state.month,
      finalNetWorth,
      finalDebt: state.debt,
      finalSavings,
      finalStress: 15,
      decisions: [
        ...state.log,
        {
          month: state.month,
          choice: `10-Year Time Skip`,
          impact: `401k grew to ${fmt(future401k)}. Index funds: ${fmt(futureIndex)}.${state.hasProperty ? ` Rental income: ${fmt(rentalTotal)}. Property appreciated ${fmt(propertyAppreciation)}.` : ''} Total net worth: ${fmt(finalNetWorth)}.`,
        },
      ],
      personality,
      lesson: 'Boring wins. Time is the cheat code. Consistency is the strategy.',
    });
  }, [state.phase, finished]);

  if (state.phase >= 5) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Calculating your 10-year results...</p>
      </div>
    );
  }

  const phase = PHASES[state.phase];

  // Build choices per phase
  const renderChoices = () => {
    if (feedback) {
      return (
        <div className="bg-blue-900 text-white rounded-xl p-4 text-center text-sm">
          {feedback}
        </div>
      );
    }

    switch (state.phase) {
      case 0: // Emergency Fund
        return (
          <div className="space-y-2">
            <button
              onClick={() => applyChoice(
                'Build $1,000 starter emergency fund',
                `Saved ${fmt(Math.min(monthlyFree, 1000))} to emergency fund. This shields you from debt spirals when life happens.`,
                () => ({ emergency: Math.min(monthlyFree, 1000) })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-blue-600 transition-colors">Build $1,000 starter emergency fund</p>
              <p className="text-xs text-gray-400">Dave Ramsey's Baby Step 1. Protection before growth.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Save 3 months of expenses',
                `Saved ${fmt(monthlyFree * 3)} to emergency fund. 3-month runway = real financial security.`,
                () => ({ emergency: monthlyFree * 3 })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-blue-600 transition-colors">Save 3 months of expenses ({fmt(monthlyFree * 3)})</p>
              <p className="text-xs text-gray-400">Full safety net. Takes longer but covers real emergencies.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Skip emergency fund, start investing',
                `No emergency fund. If your car breaks down or you lose your job, you'll go into debt. Risky move.`,
                () => ({ emergency: 0 })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 opacity-60 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium text-gray-500">Skip it — start investing immediately</p>
              <p className="text-xs text-gray-400">No safety net. One emergency = debt spiral.</p>
            </button>
          </div>
        );

      case 1: // Debt Payoff
        if (state.debt <= 0) {
          // Auto-skip if no debt
          setTimeout(() => {
            setState(prev => ({
              ...prev,
              phase: prev.phase + 1,
              month: prev.month + 1,
              log: [...prev.log, { month: prev.month, choice: 'No debt to pay off', impact: 'Debt-free already. Moving to wealth building.' }],
            }));
          }, 100);
          return <p className="text-center text-gray-500">No debt detected. Moving on...</p>;
        }
        return (
          <div className="space-y-2">
            <button
              onClick={() => applyChoice(
                'Avalanche method (highest interest first)',
                `Attacking debt at ${fmt(monthlyFree)}/mo. Saves the most money long-term by targeting high-interest debt first.`,
                () => ({ debt: Math.max(0, state.debt - monthlyFree * 6) })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-red-600 transition-colors">Avalanche: highest interest first</p>
              <p className="text-xs text-gray-400">Mathematically optimal. Saves the most in interest.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Snowball method (smallest balance first)',
                `Knocking out small debts for momentum. Psychologically powerful — each win fuels the next.`,
                () => ({ debt: Math.max(0, state.debt - monthlyFree * 5) })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-orange-600 transition-colors">Snowball: smallest balance first</p>
              <p className="text-xs text-gray-400">Quick wins build momentum. Slightly more interest paid.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Minimum payments only',
                `Only paying minimums. Interest keeps compounding against you. Debt payoff: years longer.`,
                () => ({ debt: Math.max(0, state.debt - monthlyFree * 2) })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 opacity-60 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium text-gray-500">Minimum payments only</p>
              <p className="text-xs text-gray-400">Interest compounds against you. Slowest path.</p>
            </button>
          </div>
        );

      case 2: // 401k
        return (
          <div className="space-y-2">
            <button
              onClick={() => {
                const contrib = Math.round(state.salary * 0.06);
                const match = Math.round(contrib * 0.5);
                applyChoice(
                  'Contribute 6% (full employer match)',
                  `Contributing ${fmt(contrib)}/mo. Employer adds ${fmt(match)} FREE. That's a 50% instant return. No investment beats this.`,
                  () => ({ k401: contrib * 6 + match * 6 })
                );
              }}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-blue-600 transition-colors">Contribute 6% — capture full employer match</p>
              <p className="text-xs text-gray-400">50% match = 50% instant return. Free money.</p>
            </button>
            <button
              onClick={() => {
                const contrib = Math.round(state.salary * 0.15);
                const match = Math.round(state.salary * 0.06 * 0.5);
                applyChoice(
                  'Max out at 15%',
                  `Contributing ${fmt(contrib)}/mo. Match adds ${fmt(match)}. Aggressive saving = early retirement potential.`,
                  () => ({ k401: contrib * 6 + match * 6 })
                );
              }}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-[#00D632] transition-colors">Contribute 15% — aggressive retirement savings</p>
              <p className="text-xs text-gray-400">Captures match + builds serious wealth. Less cash now, more later.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Skip 401k entirely',
                `No 401k contributions. You're leaving free money on the table. Every year you skip costs you thousands in future wealth.`,
                () => ({ k401: 0 })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 opacity-60 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium text-gray-500">Skip 401k — I need the cash now</p>
              <p className="text-xs text-gray-400">Missing free employer money. Costly long-term.</p>
            </button>
          </div>
        );

      case 3: // Index Funds
        return (
          <div className="space-y-2">
            <button
              onClick={() => {
                const monthly = Math.round(monthlyFree * 0.5);
                applyChoice(
                  'Total market index fund (VTI/VTSAX)',
                  `Investing ${fmt(monthly)}/mo in total market index. At 7% avg return, this could be ${fmt(monthly * 12 * 15)} in 15 years (before compounding).`,
                  () => ({ indexFund: monthly * 6 })
                );
              }}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-blue-600 transition-colors">Total market index fund (VTI / VTSAX)</p>
              <p className="text-xs text-gray-400">Own a piece of every US company. Low fees. JL Collins' recommended path.</p>
            </button>
            <button
              onClick={() => {
                const monthly = Math.round(monthlyFree * 0.5);
                applyChoice(
                  'Target-date retirement fund',
                  `Investing ${fmt(monthly)}/mo in target-date fund. Auto-rebalances as you age. Set it and forget it.`,
                  () => ({ indexFund: monthly * 6 })
                );
              }}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-[#00D632] transition-colors">Target-date retirement fund</p>
              <p className="text-xs text-gray-400">Automatic rebalancing. Gets more conservative as you age.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Individual stocks / crypto',
                `Picking individual stocks. 85% of active fund managers underperform index funds over 15 years. High risk, low probability.`,
                () => ({ indexFund: Math.round(monthlyFree * 0.3 * 6) })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-purple-600 transition-colors">Pick individual stocks / crypto</p>
              <p className="text-xs text-gray-400">85% of pros can't beat the index. Can you?</p>
            </button>
          </div>
        );

      case 4: // FHA 4-Unit Hack
        return (
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">The FHA House Hack:</span> Buy a 4-unit property with just 3.5% down (~$9,800 on a $280K property).
                Live in one unit, rent the other 3 at $1,200/mo each. Rental income: $3,600/mo covers your mortgage and then some.
              </p>
            </div>
            <button
              onClick={() => applyChoice(
                'Buy 4-unit with FHA loan — house hack',
                `FHA 4-unit acquired! Down payment: ${fmt(9800)}. 3 units renting at $1,200 = $3,600/mo income. Your housing cost: effectively $0. This is how wealth is built.`,
                prev => ({
                  hasProperty: true,
                  rentalIncome: 3600,
                  propertyEquity: 9800,
                  emergency: Math.max(0, prev.emergency - 9800),
                  indexFund: prev.indexFund,
                })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-blue-600 transition-colors">Buy the 4-unit — house hack with FHA</p>
              <p className="text-xs text-gray-400">3.5% down. Live in one, rent three. Housing cost → $0.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Save for a single-family home instead',
                `Going traditional. You'll need 10-20% down and your housing won't generate income. Safer but slower wealth building.`,
                () => ({ hasProperty: false })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-[#00D632] transition-colors">Save for a single-family home</p>
              <p className="text-xs text-gray-400">Traditional path. No rental income but lower management burden.</p>
            </button>
            <button
              onClick={() => applyChoice(
                'Keep renting — invest the difference',
                `Staying a renter. Investing the difference can work if you actually invest it consistently. Most people don't.`,
                () => ({ hasProperty: false, indexFund: state.indexFund + monthlyFree * 3 })
              )}
              className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-gray-600 transition-colors">Keep renting — invest the difference</p>
              <p className="text-xs text-gray-400">Can work mathematically. Requires iron discipline.</p>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Progress
  const progress = ((state.phase) / PHASES.length) * 100;
  const emergStage =
    state.emergency >= state.salary * 6 ? '6 months (MAX)' :
    state.emergency >= state.salary * 3 ? '3 months' :
    state.emergency >= 1000 ? '$1,000' :
    state.emergency > 0 ? 'Started' : 'Empty';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">🛡️ Safe Investor Path</h2>
            <p className="text-sm text-gray-500">Phase {state.phase + 1} of {PHASES.length}</p>
          </div>
          <span className="text-xs bg-blue-100 px-3 py-1 rounded-full text-blue-600">
            Slow · Steady · Proven
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Current phase info */}
        <div className="space-y-1">
          <p className="text-xs text-blue-500 font-medium">{phase.principle}</p>
          <h3 className="text-2xl font-bold text-gray-900">{phase.title}</h3>
          <p className="text-xs text-gray-400 italic">📘 {phase.book}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Emergency Fund</p>
            <p className="text-lg font-bold text-blue-600">{fmt(state.emergency)}</p>
            <p className="text-xs text-gray-400">{emergStage}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">401(k) + Match</p>
            <p className="text-lg font-bold text-blue-600">{fmt(state.k401)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Index Funds</p>
            <p className="text-lg font-bold text-blue-600">{fmt(state.indexFund)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">{state.hasProperty ? 'Rental Income' : 'Remaining Debt'}</p>
            <p className={`text-lg font-bold ${state.hasProperty ? 'text-[#00D632]' : state.debt > 0 ? 'text-red-500' : 'text-[#00D632]'}`}>
              {state.hasProperty ? `${fmt(state.rentalIncome)}/mo` : state.debt > 0 ? `-${fmt(state.debt)}` : 'DEBT FREE'}
            </p>
          </div>
        </div>

        {/* Net worth */}
        <div className={`text-center p-3 rounded-xl ${state.netWorth >= 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
          <p className="text-xs text-gray-500">Net Worth</p>
          <p className={`text-2xl font-bold ${state.netWorth >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
            {state.netWorth >= 0 ? fmt(state.netWorth) : `-${fmt(state.netWorth)}`}
          </p>
        </div>

        {/* Question */}
        <p className="text-center text-gray-600 text-sm">{phase.question}</p>

        {/* Choices */}
        {renderChoices()}
      </div>
    </div>
  );
}
