import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight } from 'lucide-react';

interface AgeInputProps {
  name: string;
  onNext: (age: number) => void;
}

export function AgeInput({ name, onNext }: AgeInputProps) {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    
    if (!ageNum || ageNum < 13 || ageNum > 18) {
      setError('Age must be between 13 and 18');
      return;
    }
    
    setError('');
    onNext(ageNum);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6">
      <div className="max-w-md w-full flex-1 flex flex-col justify-center space-y-8">
        <div className="text-white space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Nice to meet you, {name}!</h2>
            <p className="text-xl text-white/60">
              How old are you?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            placeholder="Your age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setError('');
            }}
            min="13"
            max="18"
            className="h-16 text-xl bg-white/10 border-0 text-white placeholder:text-white/40 rounded-2xl"
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3">
              {error}
            </p>
          )}
        </form>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={!age}
          size="lg"
          className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30"
        >
          Continue
        </Button>

        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-[#00D632] rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}