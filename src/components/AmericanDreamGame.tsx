'use client';

import { useState } from 'react';

interface Props {
  income: number;
  debt: number;
  leftover: number;
  onFinish: (result: GameResult) => void;
}

export interface GameResult {
  path: string;
  months: number;
  finalNetWorth: number;
  finalDebt: number;
  finalSavings: number;
  finalStress: number;
  decisions: { month: number; choice: string; impact: string }[];
  personality: string;
  lesson: string;
}

interface State {
  month: number;
  debt: number;
  emergency: number;
  savings401k: number;
  stress: number;
  salary: number;
  netWorth: number;
  log: { month: number; choice: string; impact: string }[];
}

const EVENTS = [
  { text: '🔧 Car repair needed — $600', cost: 600, stressDelta: 10 },
  { text: '🎉 Annual raise — +3% salary', cost: 0, stressDelta: -5, salaryBump: 0.03 },
  { text: '🏥 Unexpected medical bill — $400', cost: 400, stressDelta: 8 },
  { text: '💼 Side gig opportunity! +$300/mo (only if stress < 40)', cost: 0, stressDelta: -3, sidegig: 300 },
  { text: '🎓 Tax refund — $800 bonus', cost: -800, stressDelta: -5 },
  null, null, null, // No event months
];

export default function AmericanDreamGame({ income, debt: initDebt, leftover, onFinish }: Props) {
  const startDebt = initDebt > 0 ? initDebt * 12 : 8000; // annualize or default
  const [state, setState] = useState<State>({
    month: 1,
    debt: startDebt,
    emergency: 0,
    savings401k: 0,
    stress: Math.min(80, Math.round(startDebt / 200)),
    salary: income,
    netWorth: -startDebt,
    log: [],
  });
  const [event, setEvent] = useState<typeof EVENTS[0]>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const monthlyFree = Math.max(leftover, Math.round(state.salary * 0.15));

  // Emergency fund stages
  const fundStage =
    state.emergency >= state.salary * 6 ? '6 months (MAX)' :
    state.emergency >= state.salary * 3 ? '3 months' :
    state.emergency >= 1000 ? '$1,000' :
    state.emergency >= 500 ? '$500' : 'Empty';

  const won = state.debt <= 0 && state.emergency >= state.salary * 3;

  const applyChoice = (label: string, debtPay: number, emergSave: number, k401: number, impact: string) => {
    setState(prev => {
      const newDebt = Math.max(0, prev.debt - debtPay);
      const newEmerg = prev.emergency + emergSave;
      const newK401 = prev.savings401k + k401 + k401 * 0.5; // employer match 50%
      const debtStress = newDebt > 0 ? Math.min(60, newDebt / 200) : 0;
      const emergRelief = newEmerg >= prev.salary * 3 ? 20 : newEmerg >= 1000 ? 10 : newEmerg >= 500 ? 5 : 0;
      const newStress = Math.max(0, Math.min(100, debtStress - emergRelief));
      const newNet = newEmerg + newK401 - newDebt;

      return {
        ...prev,
        debt: newDebt,
        emergency: newEmerg,
        savings401k: newK401,
        stress: Math.round(newStress),
        netWorth: Math.round(newNet),
        log: [...prev.log, { month: prev.month, choice: label, impact }],
      };
    });

    setFeedback(impact);
    setTimeout(() => {
      setFeedback(null);
      // Random event next month
      const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      if (ev && state.month < 12) {
        // Check if side gig requires low stress
        if (ev.sidegig && state.stress >= 40) {
          setEvent(null);
        } else {
          setEvent(ev);
        }
      } else {
        setEvent(null);
      }
      setState(prev => ({ ...prev, month: prev.month + 1 }));
    }, 1500);
  };

  const handleEvent = () => {
    if (!event) return;
    setState(prev => {
      let newDebt = prev.debt;
      let newEmerg = prev.emergency;
      let newSalary = prev.salary;

      if (event.cost > 0) {
        if (prev.emergency >= event.cost) {
          newEmerg -= event.cost;
        } else {
          newDebt += event.cost - prev.emergency;
          newEmerg = 0;
        }
      } else if (event.cost < 0) {
        newEmerg += Math.abs(event.cost);
      }

      if (event.salaryBump) newSalary = Math.round(prev.salary * (1 + event.salaryBump));
      if (event.sidegig) newSalary += event.sidegig;

      return {
        ...prev,
        debt: newDebt,
        emergency: newEmerg,
        salary: newSalary,
        stress: Math.max(0, Math.min(100, prev.stress + (event.stressDelta || 0))),
        netWorth: Math.round(newEmerg + prev.savings401k - newDebt),
      };
    });
    setEvent(null);
  };

  // End game after 12 months or win
  if (state.month > 12 || won) {
    const personality = won ? 'The Architect' : state.emergency > 1000 ? 'The Builder' : 'The Survivor';
    onFinish({
      path: 'American Dream',
      months: state.month - 1,
      finalNetWorth: state.netWorth,
      finalDebt: state.debt,
      finalSavings: state.emergency + state.savings401k,
      finalStress: state.stress,
      decisions: state.log,
      personality,
      lesson: 'Boring plans win. Safety creates freedom.',
    });
    return null;
  }

  const fmt = (n: number) => '$' + Math.abs(n).toLocaleString();
  const stressColor = state.stress > 60 ? 'bg-red-500' : state.stress > 30 ? 'bg-yellow-400' : 'bg-[#00D632]';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">🏡 American Dream</h2>
            <p className="text-sm text-gray-500">Month {state.month} of 12</p>
          </div>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
            Calm · Steady · Strategic
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-[#00D632] h-2 rounded-full transition-all" style={{ width: `${(state.month / 12) * 100}%` }} />
        </div>

        {/* Meters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Stress Level</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className={`${stressColor} h-3 rounded-full transition-all`} style={{ width: `${state.stress}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{state.stress}/100</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Emergency Fund</p>
            <p className="text-lg font-bold text-[#00D632]">{fmt(state.emergency)}</p>
            <p className="text-xs text-gray-400">{fundStage}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Remaining Debt</p>
            <p className={`text-lg font-bold ${state.debt > 0 ? 'text-red-500' : 'text-[#00D632]'}`}>
              {state.debt > 0 ? `-${fmt(state.debt)}` : 'DEBT FREE!'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">401k + Match</p>
            <p className="text-lg font-bold text-blue-600">{fmt(state.savings401k)}</p>
            <p className="text-xs text-gray-400">50% employer match</p>
          </div>
        </div>

        {/* Net worth */}
        <div className={`text-center p-3 rounded-xl ${state.netWorth >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="text-xs text-gray-500">Net Worth</p>
          <p className={`text-2xl font-bold ${state.netWorth >= 0 ? 'text-[#00D632]' : 'text-red-500'}`}>
            {state.netWorth >= 0 ? fmt(state.netWorth) : `-${fmt(state.netWorth)}`}
          </p>
        </div>

        {/* Event */}
        {event && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center space-y-3">
            <p className="font-medium">{event.text}</p>
            {event.cost > 0 && (
              <p className="text-sm text-gray-500">
                {state.emergency >= event.cost
                  ? `Covered by emergency fund (-${fmt(event.cost)})`
                  : `Emergency fund can't cover it — ${fmt(event.cost - state.emergency)} added to debt`}
              </p>
            )}
            <button onClick={handleEvent} className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:-translate-y-0.5 transition-all">
              Continue
            </button>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="bg-gray-900 text-white rounded-xl p-4 text-center text-sm">
            {feedback}
          </div>
        )}

        {/* Choices */}
        {!event && !feedback && (
          <div className="space-y-4">
            <p className="text-center text-gray-600 text-sm">
              You have <span className="font-semibold text-gray-900">{fmt(monthlyFree)}</span> to allocate this month.
            </p>
            <div className="space-y-2">
              {state.debt > 0 && (
                <button
                  onClick={() => applyChoice(
                    'Pay extra on debt',
                    monthlyFree,
                    0, 0,
                    `Paid ${fmt(monthlyFree)} toward debt. ${state.debt - monthlyFree <= 0 ? 'DEBT FREE! Stress plummets.' : `${fmt(state.debt - monthlyFree)} remaining.`}`
                  )}
                  className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all active:scale-[0.98] group"
                >
                  <p className="font-medium group-hover:text-red-600 transition-colors">Pay extra on debt</p>
                  <p className="text-xs text-gray-400">Reduces stress. Debt snowball strategy.</p>
                </button>
              )}
              <button
                onClick={() => applyChoice(
                  'Build emergency fund',
                  0, monthlyFree, 0,
                  `Added ${fmt(monthlyFree)} to emergency fund. Shield: ${fmt(state.emergency + monthlyFree)}.`
                )}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#00D632] hover:bg-green-50 transition-all active:scale-[0.98] group"
              >
                <p className="font-medium group-hover:text-[#00D632] transition-colors">Build emergency fund 🛡️</p>
                <p className="text-xs text-gray-400">Permanent stress reduction. Blocks surprises.</p>
              </button>
              <button
                onClick={() => {
                  const k = Math.round(monthlyFree * 0.6);
                  const e = monthlyFree - k;
                  applyChoice(
                    '401k + save',
                    0, e, k,
                    `${fmt(k)} to 401k (employer adds ${fmt(Math.round(k * 0.5))} free!). ${fmt(e)} saved.`
                  );
                }}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98] group"
              >
                <p className="font-medium group-hover:text-blue-600 transition-colors">401k + save (split 60/40)</p>
                <p className="text-xs text-gray-400">Free employer match = free money. Future you says thanks.</p>
              </button>
              {state.debt <= 0 && (
                <button
                  onClick={() => applyChoice(
                    'Balanced approach',
                    0, Math.round(monthlyFree * 0.5), Math.round(monthlyFree * 0.5),
                    `Split evenly: ${fmt(Math.round(monthlyFree * 0.5))} saved, ${fmt(Math.round(monthlyFree * 0.5))} invested. Balance is power.`
                  )}
                  className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98] group"
                >
                  <p className="font-medium group-hover:text-purple-600 transition-colors">Balanced: 50% save, 50% invest</p>
                  <p className="text-xs text-gray-400">The steady path. No drama, big results.</p>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
