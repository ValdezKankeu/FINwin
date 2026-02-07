import { useState } from 'react';
import { Button } from './ui/button';
import { X, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { Lesson } from '../types';

interface LessonScreenProps {
  lesson: Lesson;
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

export function LessonScreen({ lesson, onComplete, onBack }: LessonScreenProps) {
  const [stage, setStage] = useState<'intro' | 'content' | 'quiz' | 'complete'>(
    'intro'
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const handleStartLesson = () => {
    setStage('content');
  };

  const handleTakeQuiz = () => {
    setStage('quiz');
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = lesson.content.scenario
      ? lesson.content.scenario.options[selectedAnswer].correct
      : lesson.content.quiz?.options[selectedAnswer].correct || false;

    setQuizCorrect(isCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setStage('complete');
    }, 2000);
  };

  const handleFinish = () => {
    const xpMultiplier = quizCorrect ? 1.5 : 1;
    onComplete(Math.floor(lesson.xpReward * xpMultiplier));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-center flex-1">
          <h2 className="font-bold">{lesson.title}</h2>
          <p className="text-sm text-white/60">{lesson.duration} min</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-md mx-auto px-6 py-8">
          {/* Intro Stage */}
          {stage === 'intro' && (
            <div className="space-y-8">
              <div className="text-center space-y-6 py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00D632]/20 rounded-3xl">
                  <BookOpen className="w-10 h-10 text-[#00D632]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-3">{lesson.title}</h1>
                  <p className="text-xl text-white/60">
                    {lesson.content.introduction}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl mb-1">⏱️</div>
                    <div className="text-sm text-white/60">{lesson.duration} min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-sm text-white/60">+{lesson.xpReward} XP</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartLesson}
                size="lg"
                className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full"
              >
                Start Lesson
              </Button>
            </div>
          )}

          {/* Content Stage */}
          {stage === 'content' && (
            <div className="space-y-6">
              <div className="space-y-4 py-4">
                <h3 className="text-2xl font-bold">Key Takeaways</h3>
                <div className="space-y-4">
                  {lesson.content.keyPoints.map((point, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-[#00D632] text-black rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <p className="text-white/90 flex-1 pt-1">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {lesson.content.scenario && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 space-y-3">
                  <div className="text-2xl">💭</div>
                  <h4 className="font-bold text-lg">Think About It</h4>
                  <p className="text-white/80">{lesson.content.scenario.question}</p>
                </div>
              )}

              <Button
                onClick={handleTakeQuiz}
                size="lg"
                className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full"
              >
                Continue to Quiz
              </Button>
            </div>
          )}

          {/* Quiz Stage */}
          {stage === 'quiz' && (
            <div className="space-y-6">
              <div className="py-4">
                <div className="text-3xl mb-4">🤔</div>
                <h3 className="text-2xl font-bold mb-4">Quiz Time!</h3>
                <p className="text-xl text-white/90">
                  {lesson.content.scenario?.question ||
                    lesson.content.quiz?.question}
                </p>
              </div>

              <div className="space-y-3">
                {(lesson.content.scenario?.options ||
                  lesson.content.quiz?.options ||
                  []).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-5 rounded-2xl transition-all ${
                      selectedAnswer === index
                        ? showFeedback
                          ? option.correct
                            ? 'bg-[#00D632]/20 border-2 border-[#00D632]'
                            : 'bg-red-500/20 border-2 border-red-500'
                          : 'bg-white/20 border-2 border-white/30'
                        : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAnswer === index
                            ? showFeedback
                              ? option.correct
                                ? 'border-[#00D632] bg-[#00D632]'
                                : 'border-red-500 bg-red-500'
                              : 'border-white bg-white'
                            : 'border-white/30'
                        }`}
                      >
                        {showFeedback && selectedAnswer === index && (
                          <>
                            {option.correct ? (
                              <CheckCircle className="w-4 h-4 text-black" />
                            ) : (
                              <XCircle className="w-4 h-4 text-black" />
                            )}
                          </>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-white">{option.text}</span>
                        {showFeedback &&
                          selectedAnswer === index &&
                          lesson.content.scenario && (
                            <p className="mt-2 text-sm text-white/60">
                              {option.feedback}
                            </p>
                          )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {!showFeedback && (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  size="lg"
                  className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30"
                >
                  Submit Answer
                </Button>
              )}
            </div>
          )}

          {/* Complete Stage */}
          {stage === 'complete' && (
            <div className="space-y-8">
              <div className="text-center space-y-6 py-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#00D632]/20 rounded-full">
                  <div className="w-16 h-16 bg-[#00D632] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-black" />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-3">Lesson Complete!</h2>
                  <p className="text-xl text-white/60">
                    {quizCorrect
                      ? 'Perfect! You nailed it.'
                      : 'Great effort!'}
                  </p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6">
                  <p className="text-white/60 mb-2">XP Earned</p>
                  <p className="text-5xl font-bold text-[#00D632]">
                    +{Math.floor(lesson.xpReward * (quizCorrect ? 1.5 : 1))}
                  </p>
                  {quizCorrect && (
                    <p className="text-[#00D632]/80 mt-2">Bonus for correct answer!</p>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 space-y-3">
                <h3 className="font-bold text-lg">What's Next?</h3>
                <ul className="space-y-2 text-white/60">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                    Make a deposit to earn 2x XP
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                    Complete challenges to level up
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00D632] rounded-full"></div>
                    Build your streak for bonus rewards
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleFinish}
                size="lg"
                className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
