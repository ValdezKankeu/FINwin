import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight } from 'lucide-react';

interface NameInputProps {
  onNext: (name: string) => void;
}

export function NameInput({ onNext }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6">
      <div className="max-w-md w-full flex-1 flex flex-col justify-center space-y-8">
        <div className="text-white space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">What's your name?</h2>
            <p className="text-xl text-white/60">
              Let's personalize your journey
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-16 text-xl bg-white/10 border-0 text-white placeholder:text-white/40 rounded-2xl"
            autoFocus
          />
        </form>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim()}
          size="lg"
          className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30"
        >
          Continue
        </Button>
        
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-[#00D632] rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}