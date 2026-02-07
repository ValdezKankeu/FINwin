'use client';

import { useState, useRef, useEffect } from 'react';
import type { LifePath } from '@/types';

type Message = { from: 'fin' | 'user'; text: string };
type Step = 'age' | 'career-q' | 'career-select' | 'income' | 'expenses' | 'lifepath';

const CAREERS = [
  { id: 'nursing', label: 'Nursing', icon: '🏥' },
  { id: 'electrician', label: 'Electrician', icon: '⚡' },
  { id: 'plumber', label: 'Plumber', icon: '🔧' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️' },
  { id: 'stem', label: 'STEM (General)', icon: '🔬' },
];

const LIFE_PATHS: { id: LifePath; label: string; icon: string; desc: string }[] = [
  { id: 'american-dream', label: 'American Dream', icon: '🏡', desc: 'Home, family, stability' },
  { id: 'flashy-lifestyle', label: 'Flashy Lifestyle', icon: '✨', desc: 'Maximize experiences' },
  { id: 'low-risk-investor', label: 'Low-Risk Investor', icon: '🛡️', desc: 'Steady growth' },
  { id: 'foreign-life', label: 'Foreign Path', icon: '🌍', desc: 'Money across borders' },
];

export interface OnboardingResult {
  age: number;
  hasCareer: boolean;
  careerPath: string | null;
  income: number;
  expenses: number;
  lifePath: LifePath;
}

interface Props {
  onComplete: (result: OnboardingResult) => void;
}

export default function OnboardingFlow({ onComplete }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'fin', text: "Hey! I'm FINwin. Let's build your financial plan." },
    { from: 'fin', text: 'How old are you?' },
  ]);
  const [step, setStep] = useState<Step>('age');
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // stored values
  const [age, setAge] = useState(0);
  const [hasCareer, setHasCareer] = useState(true);
  const [careerPath, setCareerPath] = useState<string | null>(null);
  const [income, setIncome] = useState(0);
  const expensesRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  const push = (...msgs: Message[]) => setMessages(prev => [...prev, ...msgs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(input, 10);
    if (isNaN(val) || val <= 0) return;
    setInput('');

    if (step === 'age') {
      setAge(val);
      push({ from: 'user', text: String(val) });
      setTimeout(() => {
        if (val < 21) {
          push({ from: 'fin', text: `You're ${val} — great time to start planning! Do you have a reliable career path?` });
          setStep('career-q');
        } else {
          push({ from: 'fin', text: `Got it, you're ${val}. What's your monthly income? (USD)` });
          setStep('income');
        }
      }, 300);
    } else if (step === 'income') {
      setIncome(val);
      push({ from: 'user', text: `$${val.toLocaleString()}` });
      setTimeout(() => {
        push({ from: 'fin', text: 'And your total monthly expenses?' });
        setStep('expenses');
      }, 300);
    } else if (step === 'expenses') {
      push({ from: 'user', text: `$${val.toLocaleString()}` });
      const leftover = income - val;
      setTimeout(() => {
        push({
          from: 'fin',
          text: leftover > 0
            ? `Nice — $${leftover.toLocaleString()} left over each month. Now choose your life path:`
            : `You're spending more than you earn. Let's fix that. Choose your life path:`,
        });
        setStep('lifepath');
      }, 300);
      expensesRef.current = val;
    }
  };

  const handleCareerAnswer = (answer: boolean) => {
    setHasCareer(answer);
    push({ from: 'user', text: answer ? 'Yes, I do' : 'Not yet' });
    setTimeout(() => {
      if (answer) {
        push({ from: 'fin', text: "Great! What's your monthly income? (USD)" });
        setStep('income');
      } else {
        push({ from: 'fin', text: "No worries! Here are high-reliability career paths (4+ years to establish):" });
        setStep('career-select');
      }
    }, 300);
  };

  const handleCareerSelect = (id: string, label: string) => {
    setCareerPath(id);
    push(
      { from: 'user', text: label },
      { from: 'fin', text: `${label} is a solid path. What's your current monthly income? (USD)` },
    );
    setStep('income');
  };

  const handleLifePath = (id: LifePath) => {
    const lp = LIFE_PATHS.find(l => l.id === id)!;
    push({ from: 'user', text: `${lp.icon} ${lp.label}` });
    onComplete({ age, hasCareer, careerPath, income, expenses: expensesRef.current, lifePath: id });
  };

  const showInput = step === 'age' || step === 'income' || step === 'expenses';
  const placeholder =
    step === 'age' ? 'Enter your age...' :
    step === 'income' ? 'e.g. 4500' :
    'e.g. 3200';

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] ${
                  msg.from === 'user'
                    ? 'bg-[#00D632] text-black font-medium'
                    : 'bg-white/10 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Career question buttons */}
          {step === 'career-q' && (
            <div className="flex gap-3 justify-center pt-4">
              <button
                onClick={() => handleCareerAnswer(true)}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-[#00D632] hover:text-black transition-all font-medium"
              >
                Yes, I do
              </button>
              <button
                onClick={() => handleCareerAnswer(false)}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-[#00D632] hover:text-black transition-all font-medium"
              >
                Not yet
              </button>
            </div>
          )}

          {/* Career selection — full width cards */}
          {step === 'career-select' && (
            <div className="space-y-2 pt-4">
              {CAREERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleCareerSelect(c.id, c.label)}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#00D632]/20 hover:border-[#00D632] transition-all text-left group"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#00D632] transition-colors">{c.label}</p>
                    <p className="text-white/40 text-sm">~4+ years to establish</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Life path selection */}
          {step === 'lifepath' && (
            <div className="space-y-2 pt-4">
              {LIFE_PATHS.map(lp => (
                <button
                  key={lp.id}
                  onClick={() => handleLifePath(lp.id)}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#00D632]/20 hover:border-[#00D632] transition-all text-left group"
                >
                  <span className="text-2xl">{lp.icon}</span>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#00D632] transition-colors">{lp.label}</p>
                    <p className="text-white/40 text-sm">{lp.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      {showInput && (
        <div className="border-t border-white/10 p-4">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3">
            <input
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={placeholder}
              autoFocus
              className="flex-1 h-12 bg-white/10 text-white placeholder:text-white/30 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#00D632] border-0"
            />
            <button
              type="submit"
              disabled={!input}
              className="h-12 px-6 bg-[#00D632] text-black font-semibold rounded-xl hover:bg-[#00D632]/80 transition-all disabled:opacity-30"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
