import { Level, Lesson, Reward } from '../types';

export const levels: Level[] = [
  {
    id: 1,
    title: 'Money Basics',
    requiredSavings: 10,
    requiredXP: 50,
    lessonId: 'needs-vs-wants',
    challengeDescription: 'Save for 3 days in a row',
    unlocked: true,
    completed: false,
    reward: {
      id: 'badge-starter',
      type: 'badge',
      name: 'Starter Saver',
      description: 'Completed your first level!',
      unlocked: false,
    },
  },
  {
    id: 2,
    title: 'Budget Builder',
    requiredSavings: 25,
    requiredXP: 120,
    lessonId: 'budgeting-101',
    challengeDescription: 'Track expenses for 1 week',
    unlocked: false,
    completed: false,
    reward: {
      id: 'badge-budget',
      type: 'badge',
      name: 'Budget Master',
      description: 'You know how to plan!',
      unlocked: false,
    },
  },
  {
    id: 3,
    title: 'Smart Spender',
    requiredSavings: 50,
    requiredXP: 250,
    lessonId: 'saving-vs-spending',
    challengeDescription: 'Complete 2 no-spend days',
    unlocked: false,
    completed: false,
    reward: {
      id: 'badge-smart',
      type: 'badge',
      name: 'Smart Spender',
      description: 'You make wise choices!',
      unlocked: false,
    },
  },
  {
    id: 4,
    title: 'Emergency Ready',
    requiredSavings: 100,
    requiredXP: 400,
    lessonId: 'emergency-fund',
    challengeDescription: 'Maintain streak for 2 weeks',
    unlocked: false,
    completed: false,
    reward: {
      id: 'badge-prepared',
      type: 'badge',
      name: 'Always Prepared',
      description: 'Safety net established!',
      unlocked: false,
    },
  },
  {
    id: 5,
    title: 'Patience Pays',
    requiredSavings: 200,
    requiredXP: 600,
    lessonId: 'delayed-gratification',
    challengeDescription: 'Save for 30 days straight',
    unlocked: false,
    completed: false,
    reward: {
      id: 'badge-patient',
      type: 'badge',
      name: 'Patient Pro',
      description: 'Good things come to those who wait!',
      unlocked: false,
    },
  },
  {
    id: 6,
    title: 'Future Investor',
    requiredSavings: 500,
    requiredXP: 1000,
    lessonId: 'intro-investing',
    challengeDescription: 'Complete all previous levels',
    unlocked: false,
    completed: false,
    reward: {
      id: 'badge-investor',
      type: 'badge',
      name: 'Future Investor',
      description: 'Ready to grow your money!',
      unlocked: false,
    },
  },
];

export const lessons: Record<string, Lesson> = {
  'needs-vs-wants': {
    id: 'needs-vs-wants',
    title: 'Needs vs Wants',
    topic: 'Financial Basics',
    duration: 2,
    completed: false,
    xpReward: 30,
    content: {
      introduction:
        'Understanding the difference between needs and wants is the foundation of smart money management.',
      keyPoints: [
        'Needs are essentials: food, shelter, basic clothing',
        'Wants are things you desire but can live without',
        'Ask yourself: "Do I need this, or do I want this?"',
        'Prioritize needs, then save for wants',
      ],
      scenario: {
        question:
          'You have $50. Your phone screen is cracked (works fine), and you want new sneakers. Which should you buy?',
        options: [
          {
            text: 'New sneakers - I deserve them!',
            correct: false,
            feedback:
              "While you might want them, if your current shoes work, this is a want, not a need. Save for it!",
          },
          {
            text: 'Fix the phone - it might get worse',
            correct: false,
            feedback:
              'The phone still works! This is a want disguised as a need. Wait until it truly affects functionality.',
          },
          {
            text: 'Save it for actual emergencies',
            correct: true,
            feedback:
              'Correct! Neither is urgent. Building savings for true needs is the smart choice.',
          },
        ],
      },
    },
  },
  'budgeting-101': {
    id: 'budgeting-101',
    title: 'Budgeting Basics',
    topic: 'Planning Your Money',
    duration: 3,
    completed: false,
    xpReward: 40,
    content: {
      introduction:
        'A budget is your money roadmap. It tells every dollar where to go before you spend it.',
      keyPoints: [
        'Track all income (allowance, gifts, jobs)',
        'List all expenses (subscriptions, snacks, activities)',
        'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
        'Review and adjust monthly',
      ],
      quiz: {
        question:
          'You get $100 monthly allowance. Using 50/30/20, how much should you save?',
        options: [
          { text: '$10', correct: false },
          { text: '$20', correct: true },
          { text: '$30', correct: false },
          { text: '$50', correct: false },
        ],
      },
    },
  },
  'saving-vs-spending': {
    id: 'saving-vs-spending',
    title: 'Saving vs Spending',
    topic: 'Money Decisions',
    duration: 2,
    completed: false,
    xpReward: 35,
    content: {
      introduction:
        'Every dollar can only be spent once. Learning to save means learning to say "yes" to your future.',
      keyPoints: [
        'Pay yourself first: save before spending',
        'Use the 24-hour rule for impulse purchases',
        'Calculate cost in "hours worked"',
        'Saving is spending on your future self',
      ],
      scenario: {
        question:
          'Your friend invites you to a concert ($60 ticket). You have $80 saved for a bike ($200 total). What do you do?',
        options: [
          {
            text: 'Go to the concert - YOLO!',
            correct: false,
            feedback:
              'This sets back your bike goal significantly. Consider the trade-off carefully.',
          },
          {
            text: 'Skip it and keep saving',
            correct: true,
            feedback:
              'Great choice! Staying focused on your goal builds discipline and gets you the bike faster.',
          },
          {
            text: 'Ask parents for money',
            correct: false,
            feedback:
              'This avoids the real decision. Learning to prioritize your own money is the lesson here.',
          },
        ],
      },
    },
  },
  'emergency-fund': {
    id: 'emergency-fund',
    title: 'Emergency Funds',
    topic: 'Financial Safety',
    duration: 3,
    completed: false,
    xpReward: 50,
    content: {
      introduction:
        "An emergency fund is your financial safety net. It's money set aside for the unexpected.",
      keyPoints: [
        'Start with $50-100 for teens',
        'Only use for true emergencies',
        'Keep it separate from spending money',
        'Rebuild it immediately after use',
      ],
      quiz: {
        question: 'Which of these is a true emergency?',
        options: [
          { text: 'Your favorite game goes on sale', correct: false },
          { text: 'Your bike tire goes flat before work', correct: true },
          { text: 'New iPhone just launched', correct: false },
          { text: 'Concert tickets available', correct: false },
        ],
      },
    },
  },
  'delayed-gratification': {
    id: 'delayed-gratification',
    title: 'Delayed Gratification',
    topic: 'Self-Control',
    duration: 3,
    completed: false,
    xpReward: 45,
    content: {
      introduction:
        'The ability to wait for better rewards is a superpower. The marshmallow test proves it pays off!',
      keyPoints: [
        'Waiting often leads to better outcomes',
        'Impulse purchases bring short-term joy',
        'Planned purchases bring lasting satisfaction',
        'Practice saying "not now" instead of "no"',
      ],
      scenario: {
        question:
          'A limited edition item you want costs $150. You have $100 saved. Do you:',
        options: [
          {
            text: 'Buy it immediately with a loan from parents',
            correct: false,
            feedback:
              'Borrowing for wants creates bad habits. Wait and save.',
          },
          {
            text: 'Wait and save the remaining $50',
            correct: true,
            feedback:
              "Perfect! You'll appreciate it more knowing you earned it completely.",
          },
          {
            text: 'Buy something cheaper now instead',
            correct: false,
            feedback:
              "You'll regret settling. Save for what you really want.",
          },
        ],
      },
    },
  },
  'intro-investing': {
    id: 'intro-investing',
    title: 'Introduction to Investing',
    topic: 'Growing Money',
    duration: 4,
    completed: false,
    xpReward: 60,
    content: {
      introduction:
        'Investing is how you make your money work for you. Even small amounts can grow over time.',
      keyPoints: [
        'Investing = putting money to work to earn more',
        'Start early to benefit from compound interest',
        'Common options: savings accounts, index funds, bonds',
        'Never invest money you might need soon',
      ],
      quiz: {
        question: 'If you invest $100 at 7% annual return, how much in 10 years?',
        options: [
          { text: '$107', correct: false },
          { text: '$170', correct: false },
          { text: '$197', correct: true },
          { text: '$1,000', correct: false },
        ],
      },
    },
  },
};

export const presetGoals = [
  {
    id: 'phone',
    name: 'New Phone',
    amount: 800,
    icon: '📱',
    category: 'phone' as const,
  },
  {
    id: 'shoes',
    name: 'Fresh Sneakers',
    amount: 150,
    icon: '👟',
    category: 'shoes' as const,
  },
  {
    id: 'college',
    name: 'College Fund',
    amount: 5000,
    icon: '🎓',
    category: 'college' as const,
  },
  {
    id: 'emergency',
    name: 'Emergency Fund',
    amount: 500,
    icon: '🛡️',
    category: 'emergency' as const,
  },
];

export const badges: Reward[] = [
  {
    id: 'first-save',
    type: 'badge',
    name: 'First Save',
    description: 'Made your first deposit!',
    unlocked: false,
  },
  {
    id: 'streak-7',
    type: 'badge',
    name: 'Week Warrior',
    description: '7-day saving streak!',
    unlocked: false,
  },
  {
    id: 'streak-30',
    type: 'badge',
    name: 'Monthly Master',
    description: '30-day saving streak!',
    unlocked: false,
  },
  {
    id: 'lesson-complete',
    type: 'badge',
    name: 'Quick Learner',
    description: 'Completed first lesson!',
    unlocked: false,
  },
  {
    id: 'all-lessons',
    type: 'badge',
    name: 'Knowledge King',
    description: 'Completed all lessons!',
    unlocked: false,
  },
];
