const SHIFT_CYCLES = ['G1', 'G2', 'G3', 'G4', 'G5'];

const CYCLE_REFERENCE = {
  date: new Date(2026, 5, 22),
  group: 'G1',
  weekIndex: 1
};

function getShiftForDate(date, selectedGroup) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const ref = new Date(CYCLE_REFERENCE.date.getFullYear(), CYCLE_REFERENCE.date.getMonth(), CYCLE_REFERENCE.date.getDate());
  const diffDays = Math.floor((d - ref) / 86400000);
  const weeksFromRef = Math.floor(diffDays / 7);

  const refGroupIndex = SHIFT_CYCLES.indexOf(CYCLE_REFERENCE.group);
  const groupIndex = SHIFT_CYCLES.indexOf(selectedGroup);
  const deltaGroup = (groupIndex - refGroupIndex + 5) % 5;

  let effectiveWeekIndex = (CYCLE_REFERENCE.weekIndex - 1 + weeksFromRef - deltaGroup + 500) % 5 + 1;

  let type = 'free';
  if (effectiveWeekIndex === 1) type = 'morning';
  else if (effectiveWeekIndex === 3) type = 'afternoon';
  else if (effectiveWeekIndex === 4) type = 'night';

  return { weekIndex: effectiveWeekIndex, shiftType: type };
}
