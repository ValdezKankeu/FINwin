'use client';

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00D632] rounded-2xl">
          <span className="text-3xl">💰</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900">
          FIN<span className="text-[#00D632]">win</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-500 max-w-lg mx-auto leading-relaxed">
          Your money is already shaping your future.<br />
          <span className="text-gray-900 font-medium">Want to see how?</span>
        </p>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          Play Your Life
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {['Choose your life path', 'See where your money goes', 'Level up your future'].map(t => (
            <span key={t} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="absolute bottom-6 text-gray-400 text-sm">
        Built for CMU Hackathon 2026
      </p>
    </div>
  );
}
