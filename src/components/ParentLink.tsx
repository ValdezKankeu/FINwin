'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ParentLinkProps {
  onNext: (parentEmail?: string) => void;
}

export function ParentLink({ onNext }: ParentLinkProps) {
  const [parentEmail, setParentEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleInvite = () => {
    if (parentEmail.trim()) {
      setSent(true);
      setTimeout(() => {
        onNext(parentEmail);
      }, 1500);
    }
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6">
      <div className="max-w-md w-full flex-1 flex flex-col justify-center space-y-8">
        <div className="text-white space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Connect with a parent</h2>
            <p className="text-xl text-white/60">
              Give them visibility into your progress
            </p>
          </div>
        </div>

        {!sent ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="text-white font-bold text-lg">Parents Can:</h3>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                  View your progress and achievements
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                  Approve and fund deposits
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                  Set monthly allowances
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                  Celebrate your milestones
                </li>
              </ul>
            </div>

            <Input
              type="email"
              placeholder="Parent's email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="h-14 bg-white/10 border-0 text-white placeholder:text-white/40 rounded-2xl"
            />
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00D632]/20 rounded-full mb-4">
              <div className="w-10 h-10 bg-[#00D632] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">Invite Sent!</h3>
            <p className="text-white/60">
              Your parent will receive an email to connect with you
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-md space-y-4">
        {!sent && (
          <>
            <Button
              onClick={handleInvite}
              disabled={!parentEmail.trim()}
              size="lg"
              className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30"
            >
              Send Invite
            </Button>

            <Button
              onClick={handleSkip}
              variant="ghost"
              className="w-full text-white/60 hover:text-white hover:bg-white/5 h-12 rounded-full"
            >
              Skip for now
            </Button>
          </>
        )}

        <div className="flex justify-center gap-2 pt-2">
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-[#00D632] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
