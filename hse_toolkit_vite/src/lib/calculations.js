export function trir(recordableCases, totalManHours, base=200000){
  if(totalManHours <= 0) return 0;
  return (recordableCases * base) / totalManHours;
}

export function frequencyRate(ltiCount, totalManHours, base=1000000){
  if(totalManHours <= 0) return 0;
  return (ltiCount * base) / totalManHours;
}

export function severityRate(totalDaysLost, totalManHours, base=1000000){
  if(totalManHours <= 0) return 0;
  return (totalDaysLost * base) / totalManHours;
}

export function manDaysWorked(skilled, unskilled, contract, days){
  const total = Number(skilled||0) + Number(unskilled||0) + Number(contract||0);
  return total * (Number(days)||0);
}
