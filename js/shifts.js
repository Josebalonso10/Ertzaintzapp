const SHIFT_CYCLES = ['G1', 'G2', 'G3', 'G4', 'G5'];

const CYCLE_REFERENCE = {
  date: new Date(2026, 5, 22), // 22 junio 2026, Mes 5
  group: 'G1',
  weekIndex: 1
};

function getShiftForDate(date, selectedGroup) {
  // Normalizamos a medianoche para evitar saltos
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const ref = new Date(CYCLE_REFERENCE.date.getFullYear(), CYCLE_REFERENCE.date.getMonth(), CYCLE_REFERENCE.date.getDate());
  
  const diffDays = Math.floor((d - ref) / (1000 * 60 * 60 * 24));
  const weeksFromRef = Math.floor(diffDays / 7);
  
  const refGroupIndex = SHIFT_CYCLES.indexOf(CYCLE_REFERENCE.group);
  const groupIndex = SHIFT_CYCLES.indexOf(selectedGroup);
  
  // CORRECCIÓN: Si G1 hace M esta semana, G2 lo hace la siguiente.
  // Esto significa que el ciclo avanza hacia atrás en el índice de grupos.
  const deltaGroup = (groupIndex - refGroupIndex + 5) % 5;
  
  // Restamos deltaGroup en lugar de sumarlo.
  let effectiveWeekIndex = (CYCLE_REFERENCE.weekIndex - 1 + weeksFromRef - deltaGroup + 500) % 5 + 1;

  let type = 'free';
  if (effectiveWeekIndex === 1) type = 'morning';
  else if (effectiveWeekIndex === 3) type = 'afternoon';
  else if (effectiveWeekIndex === 4) type = 'night';

  return { weekIndex: effectiveWeekIndex, shiftType: type };
}
