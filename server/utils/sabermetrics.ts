export function battingAverage(hits: number, atBats: number): number {
  return hits / atBats
}

export function earnedRunAverage(earnedRuns: number, inningsPitched: number): number {
  return (9 * earnedRuns) / inningsPitched
}

export function onBasePercentage(
  hits: number,
  baseOnBalls: number,
  hitsByPitch: number,
  atBats: number,
  sacrificeFly: number,
): number {
  return (hits + baseOnBalls + hitsByPitch) / (atBats + baseOnBalls + hitsByPitch + sacrificeFly)
}

export function sluggingPercentage(
  firstBases: number,
  secondBases: number,
  thirdBases: number,
  homeRuns: number,
  atBats: number,
): number {
  return (firstBases + secondBases * 2 + thirdBases * 3 + homeRuns * 4) / atBats
}

export function onBasePlusSlugging(onBasePercentage: number, sluggingPercentage: number): number {
  return onBasePercentage + sluggingPercentage
}
