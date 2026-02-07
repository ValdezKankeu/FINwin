export function calculateLevel(xp: number): number {
  if (xp >= 1000) return 6;
  if (xp >= 600) return 5;
  if (xp >= 400) return 4;
  if (xp >= 250) return 3;
  if (xp >= 120) return 2;
  return 1;
}
