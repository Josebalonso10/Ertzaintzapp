// holidays.js

// Devuelve todos los festivos del usuario actual
function getUserHolidays() {
  return loadUserData('holidays', getDefaultNationalHolidays());
}

// Comprueba si una fecha ISO (YYYY-MM-DD) es festivo y devuelve objeto o null
function getHolidayByIso(isoDate) {
  const holidays = getUserHolidays();
  return holidays.find(h => h.date === isoDate) || null;
}

// Atajo: devuelve tipo (8 o 12) o null
function getHolidayType(isoDate) {
  const h = getHolidayByIso(isoDate);
  return h ? h.type : null;
}

// Inicialización opcional si quieres sincronizar algo al arrancar
function initHolidaysModule() {
  // Por ahora no hace nada especial, pero lo dejamos para extender.
}

// Llamar desde app.js si lo ves útil:
document.addEventListener('DOMContentLoaded', () => {
  initHolidaysModule();
});
