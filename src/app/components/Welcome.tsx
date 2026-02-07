import { Sparkles, TrendingUp, Trophy } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6 text-white">
      <div className="max-w-md w-full flex-1 flex flex-col justify-center space-y-12">
        {/* Logo */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00D632] rounded-3xl">
            <span className="text-4xl">💰</span>
          </div>
          <div>
            <h1 className="text-6xl font-bold tracking-tight mb-4">FINwin</h1>
            <p className="text-2xl text-white/70 font-medium">
              Turn Saving Into a Game You Can Win
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 text-left">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <TrendingUp className="w-5 h-5 text-[#00D632]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Level Up Your Savings</h3>
              <p className="text-base text-white/60">
                Progress through challenges and unlock rewards
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 text-left">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-5 h-5 text-[#00D632]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Learn While You Save</h3>
              <p className="text-base text-white/60">
                Master financial skills through bite-sized lessons
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 text-left">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <Trophy className="w-5 h-5 text-[#00D632]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Earn Badges & Streaks</h3>
              <p className="text-base text-white/60">
                Build habits that last with gamified rewards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-md space-y-4">
        <Button
          onClick={onGetStarted}
          size="lg"
          className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full"
        >
          Get Started
        </Button>
        <p className="text-sm text-white/40 text-center">
          Join thousands of teens building better money habits
        </p>
      </div>
    </div>
  );
}