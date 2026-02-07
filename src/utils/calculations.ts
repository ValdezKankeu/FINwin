export function calculateCompoundGrowth(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  // Future value of principal
  const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);
  
  // Future value of monthly contributions
  const fvContributions = monthlyContribution * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  return fvPrincipal + fvContributions;
}

export function calculateSubscriptionImpact(
  monthlyCost: number,
  years: number,
  investmentReturn: number = 7
): number {
  return calculateCompoundGrowth(0, monthlyCost, investmentReturn, years);
}

export function calculateTotalSpend(budget: any): number {
  const subscriptionTotal = budget.subscriptions.reduce(
    (sum: number, sub: any) => sum + sub.cost, 
    0
  );
  const recurringTotal = budget.recurring.reduce(
    (sum: number, exp: any) => sum + exp.cost, 
    0
  );
  return subscriptionTotal + recurringTotal + budget.dailyExpenses;
}