'use client';

import { useState } from 'react';

interface Props {
  leftover: number;
  onFinish: (xp: number) => void;
}

interface Scenario {
  text: string;
  choices: { label: string; savings: number; invest: number; xp: number; feedback: string }[];
}

function buildScenarios(leftover: number): Scenario[] {
  const L = leftover;
  return [
    {
      text: `You have $${L}/mo left over. A friend invites you on a $${Math.round(L * 0.4)} weekend trip.`,
      choices: [
        { label: 'Go for it!', savings: -Math.round(L * 0.4), invest: 0, xp: 5, feedback: 'Memories made. Budget took a hit though.' },
        { label: 'Go, but set a $' + Math.round(L * 0.15) + ' cap', savings: -Math.round(L * 0.15), invest: 0, xp: 15, feedback: 'Smart — you had fun AND kept your budget in check.' },
        { label: 'Rain check, save it', savings: Math.round(L * 0.4), invest: 0, xp: 10, feedback: 'Saved! But don\'t forget to live a little.' },
      ],
    },
    {
      text: 'A subscription you barely use auto-renewed — $50/mo. What do you do?',
      choices: [
        { label: 'Cancel & invest it', savings: 0, invest: 50, xp: 20, feedback: '$50/mo invested = $8,700 in 10 years at 7%. That\'s the power of small cuts.' },
        { label: 'Cancel & save it', savings: 50, invest: 0, xp: 15, feedback: 'Good move. $600/yr back in your pocket.' },
        { label: 'Keep it, might use it', savings: -50, invest: 0, xp: 0, feedback: '"Might" is expensive. $600/yr for something you barely touch.' },
      ],
    },
    {
      text: 'Surprise! You got a $500 bonus at work. 🎉',
      choices: [
        { label: 'Emergency fund (shield)', savings: 500, invest: 0, xp: 20, feedback: 'Your emergency shield just got stronger. Smart defense.' },
        { label: 'Invest it all', savings: 0, invest: 500, xp: 15, feedback: '$500 invested now = ~$983 in 10 years. Money cloning activated.' },
        { label: 'Treat yourself', savings: -500, invest: 0, xp: 5, feedback: 'You deserve it — but that $500 could\'ve been $983 in 10 years.' },
      ],
    },
    {
      text: 'Your car needs a $400 repair. You don\'t have an emergency fund yet.',
      choices: [
        { label: 'Credit card (pay later)', savings: -400, invest: 0, xp: 0, feedback: 'At 24% APR, that $400 becomes $500+ if you carry the balance. Ouch.' },
        { label: 'Dip into savings', savings: -400, invest: 0, xp: 10, feedback: 'This is exactly what savings are for. Rebuild next month.' },
        { label: 'Side hustle to cover it', savings: 0, invest: 0, xp: 25, feedback: 'Resourceful! You kept your savings AND avoided debt.' },
      ],
    },
    {
      text: 'Your employer offers 401k matching — 50% up to 6% of your salary. Free money?',
      choices: [
        { label: 'Max the match (free XP!)', savings: 0, invest: 200, xp: 30, feedback: '🎁 Free money from your employer! This is literally free XP for your future.' },
        { label: 'Contribute a little', savings: 0, invest: 50, xp: 15, feedback: 'Something is better than nothing, but you\'re leaving free money on the table.' },
        { label: 'Skip it, need cash now', savings: 0, invest: 0, xp: 0, feedback: 'You just said no to free money. Your future self is disappointed.' },
      ],
    },
    {
      text: 'Final round: How do you want to allocate your leftover $' + L + ' this month?',
      choices: [
        { label: '50% save, 30% invest, 20% fun', savings: Math.round(L * 0.5), invest: Math.round(L * 0.3), xp: 25, feedback: 'The balanced approach. This is how wealth gets built.' },
        { label: 'All into investments', savings: 0, invest: L, xp: 15, feedback: 'Aggressive! Great for growth, but keep an emergency fund too.' },
        { label: 'Yolo — spend it all', savings: -L, invest: 0, xp: 0, feedback: '$0 saved, $0 invested. Every month like this costs you years of freedom.' },
      ],
    },
  ];
}

export default function MoneyGame({ leftover, onFinish }: Props) {
  const scenarios = buildScenarios(leftover);
  const [round, setRound] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleChoice = (choice: typeof scenarios[0]['choices'][0]) => {
    setTotalXp(prev => prev + choice.xp);
    setTotalSaved(prev => prev + choice.savings);
    setTotalInvested(prev => prev + choice.invest);
    setFeedback(choice.feedback);

    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= scenarios.length) {
        setDone(true);
      } else {
        setRound(prev => prev + 1);
      }
    }, 2500);
  };

  if (done) {
    const level = totalXp >= 100 ? 'Money Master' : totalXp >= 60 ? 'Budget Pro' : totalXp >= 30 ? 'Getting There' : 'Rookie';
    const invested10yr = Math.round(totalInvested * Math.pow(1.07, 10));

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl">🏆</div>
          <h2 className="text-4xl font-bold">{level}</h2>
          <p className="text-lg text-gray-500">You earned {totalXp} XP</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Saved</p>
              <p className="text-2xl font-bold text-[#00D632]">${Math.max(totalSaved, 0).toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Invested</p>
              <p className="text-2xl font-bold text-blue-600">${totalInvested.toLocaleString()}</p>
            </div>
          </div>

          {totalInvested > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Your investments in 10 years</p>
              <p className="text-2xl font-bold text-gray-900">${invested10yr.toLocaleString()}</p>
              <p className="text-xs text-gray-400">at 7% annual return</p>
            </div>
          )}

          <button
            onClick={() => onFinish(totalXp)}
            className="w-full h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            See Your Full Dashboard →
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[round];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Round {round + 1}/{scenarios.length}</span>
          <span className="px-3 py-1 bg-[#00D632]/10 text-[#00D632] rounded-full text-sm font-semibold">{totalXp} XP</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#00D632] h-2 rounded-full transition-all duration-500"
            style={{ width: `${((round + 1) / scenarios.length) * 100}%` }}
          />
        </div>

        {/* Scenario */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <p className="text-lg font-medium text-gray-900 leading-relaxed">{scenario.text}</p>
        </div>

        {/* Feedback overlay */}
        {feedback ? (
          <div className="bg-gray-900 text-white rounded-2xl p-5 text-center">
            <p className="text-sm leading-relaxed">{feedback}</p>
          </div>
        ) : (
          /* Choices */
          <div className="space-y-3">
            {scenario.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => handleChoice(c)}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#00D632] hover:bg-green-50 transition-all active:scale-[0.98] group"
              >
                <p className="font-medium text-gray-900 group-hover:text-[#00D632] transition-colors">{c.label}</p>
              </button>
            ))}
          </div>
        )}

        {/* Running totals */}
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <span>Saved: ${Math.max(totalSaved, 0).toLocaleString()}</span>
          <span>Invested: ${totalInvested.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
