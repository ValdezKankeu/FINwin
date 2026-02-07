import { LifePathConfig } from '@/types';

export const lifePaths: Record<string, LifePathConfig> = {
  'american-dream': {
    id: 'american-dream',
    name: 'American Dream',
    tagline: 'Building wealth for home, family, and stability',
    icon: '🏡',
    insights: [
      'Your housing costs are 31% of income—ideal for homeownership goals',
      'You could save $18,000 for a down payment in 18 months',
      'Cut $100/mo in subscriptions to accelerate home savings by 4 months',
    ],
    actions: [
      'Open a high-yield savings account (4.5% APY) for down payment',
      'Cut $80/mo in unused subscriptions → redirect to housing fund',
      'Automate $400/mo transfer on payday to home savings',
    ],
  },
  'flashy-lifestyle': {
    id: 'flashy-lifestyle',
    name: 'Flashy Lifestyle',
    tagline: 'Maximize experiences, minimize regret',
    icon: '✨',
    insights: [
      'Your subscription spend is in the top 12% nationally',
      'You spend $1,464/year on subscriptions you use less than weekly',
      'Cutting 3 unused services = $1,800/year for travel',
    ],
    actions: [
      'Audit all subscriptions—keep only what you use 3+ times per week',
      'Set a "guilt-free spend" budget: $400/mo for experiences',
      'Redirect subscription savings to a "big trip" fund ($150/mo)',
    ],
  },
  'low-risk-investor': {
    id: 'low-risk-investor',
    name: 'Low-Risk Investor',
    tagline: 'Steady growth, zero surprises',
    icon: '🛡️',
    insights: [
      'Your emergency fund covers 3.8 months of expenses—close to goal',
      'Conservative index funds average 6-7% annual returns',
      'You could reach $100K net worth in 8 years at current pace',
    ],
    actions: [
      'Automate $300/mo to low-cost index funds (VTI/VOO)',
      'Build emergency fund to $13,500 (6 months expenses)',
      'Review asset allocation quarterly—70% stocks, 30% bonds',
    ],
  },
  'foreign-life': {
    id: 'foreign-life',
    name: 'Foreign / International Life',
    tagline: 'Managing money across borders',
    icon: '🌍',
    insights: [
      'FX fees are costing you $83/mo (2.1% of remittances)',
      'Switching to Wise could save $720/year on transfers',
      'Currency fluctuations cost you $340 in Q4 2024',
    ],
    actions: [
      'Switch to Wise or Revolut for remittances (save $60/mo)',
      'Keep 3 months expenses in USD, rest in local currency',
      'Set up automatic transfers when exchange rates are favorable',
    ],
  },
};