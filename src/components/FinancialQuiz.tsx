'use client';

import { useState } from 'react';

interface QuizQuestion {
  question: string;
  book: string;
  answers: { text: string; correct: boolean }[];
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'What is an asset?',
    book: 'Rich Dad Poor Dad – Robert Kiyosaki',
    answers: [
      { text: 'Something that puts money in your pocket over time', correct: true },
      { text: 'Something that looks expensive', correct: false },
      { text: 'Anything you own', correct: false },
    ],
    explanation: 'An asset generates income or appreciates. Your car? Usually a liability. Rental property? That\'s an asset.',
  },
  {
    question: 'What is a liability?',
    book: 'Rich Dad Poor Dad',
    answers: [
      { text: 'Something that takes money out of your pocket', correct: true },
      { text: 'Anything you owe money on', correct: false },
      { text: 'Only bad purchases', correct: false },
    ],
    explanation: 'A liability costs you money over time. A financed car, subscriptions you don\'t use — they drain your wealth quietly.',
  },
  {
    question: 'Why is an emergency fund important?',
    book: 'The Total Money Makeover – Dave Ramsey',
    answers: [
      { text: 'It prevents debt when life happens', correct: true },
      { text: 'It helps you invest faster', correct: false },
      { text: 'It\'s only useful if you lose your job', correct: false },
    ],
    explanation: 'Without an emergency fund, one car repair or medical bill can spiral into credit card debt that takes years to pay off.',
  },
  {
    question: 'What is lifestyle inflation?',
    book: 'The Millionaire Next Door',
    answers: [
      { text: 'Spending more as income increases', correct: true },
      { text: 'Inflation raising prices', correct: false },
      { text: 'Buying luxury items', correct: false },
    ],
    explanation: 'When you get a raise and immediately upgrade your car, apartment, and wardrobe — that\'s lifestyle inflation eating your wealth.',
  },
  {
    question: 'Why is a 401(k) match powerful?',
    book: 'I Will Teach You to Be Rich',
    answers: [
      { text: 'It\'s free money', correct: true },
      { text: 'It lowers taxes only', correct: false },
      { text: 'It guarantees returns', correct: false },
    ],
    explanation: 'If your employer matches 50% up to 6%, that\'s an instant 50% return on your money. No investment beats free money.',
  },
  {
    question: 'What does compound interest do best?',
    book: 'The Simple Path to Wealth',
    answers: [
      { text: 'Rewards time', correct: true },
      { text: 'Works short-term', correct: false },
      { text: 'Requires high income', correct: false },
    ],
    explanation: '$100/month at 7% for 40 years = $264,000. Start 10 years later? Only $122,000. Time is the multiplier.',
  },
  {
    question: 'What matters more than income?',
    book: 'Your Money or Your Life',
    answers: [
      { text: 'How much you keep', correct: true },
      { text: 'Job title', correct: false },
      { text: 'Raises', correct: false },
    ],
    explanation: 'Someone earning $50K who saves 30% builds more wealth than someone earning $150K who saves 0%.',
  },
  {
    question: 'Why is high-interest debt dangerous?',
    book: 'The Psychology of Money',
    answers: [
      { text: 'It compounds against you', correct: true },
      { text: 'Hurts credit instantly', correct: false },
      { text: 'Only matters if large', correct: false },
    ],
    explanation: 'At 24% APR, a $5,000 balance becomes $6,200 in one year if you only make minimum payments. Debt compounds too.',
  },
  {
    question: 'Biggest financial risk for young adults?',
    book: 'The Psychology of Money',
    answers: [
      { text: 'Emotional decisions', correct: true },
      { text: 'Lack of rich parents', correct: false },
      { text: 'Not knowing investing', correct: false },
    ],
    explanation: 'FOMO purchases, panic selling investments, retail therapy — emotions destroy more wealth than bad markets ever will.',
  },
  {
    question: 'What is financial freedom?',
    book: 'The Simple Path to Wealth',
    answers: [
      { text: 'Money covers life expenses', correct: true },
      { text: 'Buying anything', correct: false },
      { text: 'High salary', correct: false },
    ],
    explanation: 'Financial freedom = passive income exceeds expenses. It\'s not about being rich. It\'s about not needing a paycheck.',
  },
  {
    question: 'What\'s the purpose of a budget?',
    book: 'Your Money or Your Life',
    answers: [
      { text: 'Control money direction', correct: true },
      { text: 'Limit fun', correct: false },
      { text: 'Track taxes', correct: false },
    ],
    explanation: 'A budget doesn\'t restrict you — it gives every dollar a job. You decide where money goes instead of wondering where it went.',
  },
  {
    question: 'Why do people stay broke even with raises?',
    book: 'The Psychology of Money',
    answers: [
      { text: 'Spending rises too', correct: true },
      { text: 'Taxes increase', correct: false },
      { text: 'No investing knowledge', correct: false },
    ],
    explanation: 'The #1 reason: lifestyle inflation. A $10K raise becomes a nicer car payment, not a bigger investment account.',
  },
  {
    question: 'What\'s the real cost of buying on credit?',
    book: 'Rich Dad Poor Dad',
    answers: [
      { text: 'Lost future money (opportunity cost)', correct: true },
      { text: 'Interest only', correct: false },
      { text: 'Monthly payment amount', correct: false },
    ],
    explanation: 'That $1,000 on credit at 20% APR could have been $7,600 invested over 20 years. You\'re not just paying interest — you\'re losing future wealth.',
  },
  {
    question: 'What does "pay yourself first" mean?',
    book: 'The Richest Man in Babylon',
    answers: [
      { text: 'Save before spending', correct: true },
      { text: 'Pay bills early', correct: false },
      { text: 'Buy what you want first', correct: false },
    ],
    explanation: 'When your paycheck hits, savings come out first — automatically. What\'s left is what you spend. Not the other way around.',
  },
  {
    question: 'Why is time more important than income for wealth?',
    book: 'The Simple Path to Wealth',
    answers: [
      { text: 'Time compounds returns', correct: true },
      { text: 'Income matters more', correct: false },
      { text: 'Time reduces risk only', correct: false },
    ],
    explanation: 'A 22-year-old investing $200/month beats a 35-year-old investing $500/month by retirement. Start early, even small.',
  },
  {
    question: 'What hurts investors most?',
    book: 'The Psychology of Money',
    answers: [
      { text: 'Panic selling', correct: true },
      { text: 'Poor diversification', correct: false },
      { text: 'Wrong fund choice', correct: false },
    ],
    explanation: 'The S&P 500 has recovered from every crash in history. The investors who lost money? They sold at the bottom.',
  },
  {
    question: 'What is opportunity cost?',
    book: 'Your Money or Your Life',
    answers: [
      { text: 'What you give up when choosing', correct: true },
      { text: 'Discounts you missed', correct: false },
      { text: 'Investment delays', correct: false },
    ],
    explanation: 'Every dollar spent on one thing is a dollar that can\'t work for you somewhere else. That daily $6 coffee? $2,190/year not invested.',
  },
  {
    question: 'Why are small subscriptions dangerous?',
    book: 'I Will Teach You to Be Rich',
    answers: [
      { text: 'Small costs compound over time', correct: true },
      { text: 'Frequent price hikes', correct: false },
      { text: 'Hidden taxes', correct: false },
    ],
    explanation: '$15/month seems harmless. But $15 x 6 subscriptions = $90/month = $1,080/year = $18,000+ over 10 years invested.',
  },
  {
    question: 'What\'s the safest first investment?',
    book: 'The Total Money Makeover',
    answers: [
      { text: 'Emergency fund', correct: true },
      { text: 'Stock market', correct: false },
      { text: 'Real estate', correct: false },
    ],
    explanation: 'Before investing a single dollar, build 3–6 months of expenses in savings. This is your financial foundation.',
  },
  {
    question: 'What\'s the fastest way to improve finances?',
    book: 'I Will Teach You to Be Rich',
    answers: [
      { text: 'Consistency over time', correct: true },
      { text: 'High salary', correct: false },
      { text: 'Advanced strategies', correct: false },
    ],
    explanation: 'No hack, no shortcut. Automate savings, avoid debt, invest consistently. The boring path is the winning path.',
  },
];

interface Props {
  onFinish: (score: number) => void;
}

export default function FinancialQuiz({ onFinish }: Props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = QUESTIONS[current];
  const progress = ((current + (showResult ? 1 : 0)) / QUESTIONS.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (q.answers[index].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      onFinish(score);
      return;
    }
    setCurrent(prev => prev + 1);
    setSelected(null);
    setShowResult(false);
  };

  const isCorrect = selected !== null && q.answers[selected].correct;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#00D632]">Phase 2: Financial Enlightenment</p>
            <p className="text-sm text-gray-400">{current + 1} / {QUESTIONS.length}</p>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#00D632] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Book citation */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>📘</span>
          <span className="italic">{q.book}</span>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-900">{q.question}</h2>

        {/* Answers */}
        <div className="space-y-3">
          {q.answers.map((a, i) => {
            let borderClass = 'border-gray-200 hover:border-gray-400';
            let bgClass = 'bg-white';
            let textClass = 'text-gray-900';

            if (showResult) {
              if (a.correct) {
                borderClass = 'border-[#00D632]';
                bgClass = 'bg-green-50';
                textClass = 'text-[#00D632]';
              } else if (i === selected && !a.correct) {
                borderClass = 'border-red-400';
                bgClass = 'bg-red-50';
                textClass = 'text-red-500';
              } else {
                borderClass = 'border-gray-200';
                bgClass = 'bg-gray-50';
                textClass = 'text-gray-400';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showResult}
                className={`w-full text-left p-4 border-2 rounded-xl transition-all ${borderClass} ${bgClass} ${showResult ? '' : 'active:scale-[0.98]'}`}
              >
                <p className={`font-medium ${textClass} transition-colors`}>{a.text}</p>
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {showResult && (
          <div className="space-y-4">
            <div className={`rounded-xl p-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{isCorrect ? '✅' : '💡'}</span>
                <div>
                  <p className={`text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite — here\'s why:'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{q.explanation}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full h-14 bg-gray-900 text-white font-semibold text-lg rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {current + 1 >= QUESTIONS.length ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}

        {/* Score ticker */}
        <div className="text-center">
          <p className="text-xs text-gray-300">Score: {score}/{current + (showResult ? 1 : 0)}</p>
        </div>
      </div>
    </div>
  );
}
