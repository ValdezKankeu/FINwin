'use client';

import { useState, useRef, useEffect } from 'react';
import type { LifePath } from '@/types';

interface ChatProfile {
  age: number;
  hasCareer: boolean;
  careerPath: string | null;
  income: number;
  expenses: number;
  lifePath: LifePath;
}

type Msg = { from: 'user' | 'fin'; text: string };

export default function ChatPanel({ profile }: { profile: ChatProfile }) {
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'fin', text: `Based on your ${profile.lifePath.replace(/-/g, ' ')} path with $${profile.income.toLocaleString()}/mo income — ask me anything about your finances.` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, profile }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { from: 'fin', text: data.reply || data.error || 'Something went wrong.' }]);
    } catch {
      setMessages(prev => [...prev, { from: 'fin', text: 'Network error — try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl flex flex-col h-[400px] shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">FINwin AI Advisor</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                msg.from === 'user'
                  ? 'bg-[#00D632] text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-400 px-3 py-2 rounded-xl text-sm">Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="p-3 border-t border-gray-100 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about your budget..."
          className="flex-1 h-10 bg-gray-100 text-gray-900 text-sm placeholder:text-gray-400 rounded-lg px-3 outline-none focus:ring-1 focus:ring-[#00D632] border-0"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="h-10 px-4 bg-[#00D632] text-white text-sm font-semibold rounded-lg hover:bg-[#00D632]/80 transition-all disabled:opacity-30"
        >
          Send
        </button>
      </form>
    </div>
  );
}
