const SHIFT_CYCLES = ['G1', 'G2', 'G3', 'G4', 'G5'];

// Referencia de inicio ciclo
const CYCLE_REFERENCE = {
  date: new Date(2026, 5, 22), // 22 junio 2026 (mes 5 porque 0-based)
  group: 'G1',
  weekIndex: 1
};

// Semana 1: mañana (L-V) + mañana12 (S-D) -> verde
// Semana 2: libre (L-D)
// Semana 3: tarde (L-V) + libre fin de semana -> azul
// Semana 4: noche (L-V) + noche12 (S-D) -> rojo
// Semana 5: libre (L-D)

function getShiftForDate(date, selectedGroup) {
  const ref = CYCLE_REFERENCE.date;
  const diffDays = Math.floor((date - ref) / (1000 * 60 * 60 * 24));

  // Calculamos desplazamiento de grupos: lo que hace G1 una semana, la sig la hace G2, etc.
  const weeksFromRef = Math.floor(diffDays / 7);
  const refGroupIndex = SHIFT_CYCLES.indexOf(CYCLE_REFERENCE.group);
  const groupIndex = SHIFT_CYCLES.indexOf(selectedGroup);
  const deltaGroup = (groupIndex - refGroupIndex + SHIFT_CYCLES.length) % SHIFT_CYCLES.length;

  const effectiveWeekIndex = (CYCLE_REFERENCE.weekIndex - 1 + weeksFromRef + deltaGroup) % 5 + 1;

  // Día de semana (0 domingo, 1 lunes...)
  const weekDay = date.getDay();

  let type = 'free';
  if (effectiveWeekIndex === 1) {
    type = 'morning';
  } else if (effectiveWeekIndex === 3) {
    type = 'afternoon';
  } else if (effectiveWeekIndex === 4) {
    type = 'night';
  }

  return { weekIndex: effectiveWeekIndex, shiftType: type, weekDay };
}
