let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth(); // 0-11

function initCalendar() {
  const yearSelect = document.getElementById('calendarYearSelect');
  const monthSelect = document.getElementById('calendarMonthSelect');
  const cycleSelect = document.getElementById('shiftCycleSelect');

  // Rango de años: 2021–2030
  for (let y = 2021; y <= 2030; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === currentCalendarYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }

  const months = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];
  months.forEach((name, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = name;
    if (idx === currentCalendarMonth) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  yearSelect.addEventListener('change', () => {
    currentCalendarYear = parseInt(yearSelect.value, 10);
    renderCalendar();
  });
  monthSelect.addEventListener('change', () => {
    currentCalendarMonth = parseInt(monthSelect.value, 10);
    renderCalendar();
  });

  document.getElementById('calendarPrevMonth').addEventListener('click', () => {
    currentCalendarMonth--;
    if (currentCalendarMonth < 0) {
      currentCalendarMonth = 11;
      currentCalendarYear--;
    }
    yearSelect.value = currentCalendarYear;
    monthSelect.value = currentCalendarMonth;
    renderCalendar();
  });

  document.getElementById('calendarNextMonth').addEventListener('click', () => {
    currentCalendarMonth++;
    if (currentCalendarMonth > 11) {
      currentCalendarMonth = 0;
      currentCalendarYear++;
    }
    yearSelect.value = currentCalendarYear;
    monthSelect.value = currentCalendarMonth;
    renderCalendar();
  });

  cycleSelect.addEventListener('change', () => {
    renderCalendar();
  });

  // Notas y checklist
  initNotes();
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  const year = currentCalendarYear;
  const month = currentCalendarMonth;
  const selectedGroup = document.getElementById('shiftCycleSelect').value;

  // Cabeceras de días
  const dayNames = ['L','M','X','J','V','S','D'];
  dayNames.forEach(name => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = name;
    grid.appendChild(header);
  });

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calculamos offset (inicio en lunes)
  let startOffset = (firstOfMonth.getDay() + 6) % 7; // convertimos domingo=0 a final

  // Festivos y extras para el mes actual
  const holidays = loadUserData('holidays', []);
  const extras = loadUserData('extras', []);

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement('div');
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';

    const header = document.createElement('div');
    header.className = 'calendar-cell-header';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'calendar-cell-date';
    dateSpan.textContent = day;

    const tagContainer = document.createElement('div');

    header.appendChild(dateSpan);
    header.appendChild(tagContainer);
    cell.appendChild(header);

    // Turno
    const shiftInfo = getShiftForDate(date, selectedGroup);
    applyShiftClasses(cell, shiftInfo);

    // Festivo
    const isoDate = date.toISOString().slice(0,10);
    const holiday = holidays.find(h => h.date === isoDate);
    if (holiday) {
      cell.classList.add('holiday-border');
      const tag = document.createElement('span');
      tag.className = 'holiday-tag';
      tag.textContent = holiday.type === 8 ? 'F8' : 'F12';
      tagContainer.appendChild(tag);
    }

    // Extras (punto naranja + gestión)
    const dayExtras = extras.filter(ex => ex.date === isoDate && ex.type !== 'ausencia');
    if (dayExtras.length > 0) {
      const dot = document.createElement('div');
      dot.className = 'extra-dot';
      tagContainer.appendChild(dot);
    }

    // Ausencias (vacaciones, AP, permisos, baja)
    const absences = extras.filter(ex => ex.date === isoDate && ex.type === 'ausencia');
    if (absences.length > 0) {
      const abs = absences[0]; // de momento 1 por día
      applyAbsenceClass(cell, abs);
    }

    cell.addEventListener('click', () => {
      openExtraModal(isoDate);
    });

    grid.appendChild(cell);
  }

  renderExtrasListForMonth(year, month);
}

function applyShiftClasses(cell, info) {
  cell.classList.remove('shift-morning', 'shift-afternoon', 'shift-night', 'shift-free');
  if (info.shiftType === 'morning') {
    cell.classList.add('shift-morning');
  } else if (info.shiftType === 'afternoon') {
    cell.classList.add('shift-afternoon');
  } else if (info.shiftType === 'night') {
    cell.classList.add('shift-night');
  } else {
    cell.classList.add('shift-free');
  }
}

function applyAbsenceClass(cell, absence) {
  cell.classList.add('absence-keep-border');
  if (absence.subtype === 'vacaciones') {
    cell.classList.add('absence-vacation');
  } else if (absence.subtype === 'asuntos') {
    cell.classList.add('absence-personal');
  } else if (absence.subtype === 'permiso') {
    cell.classList.add('absence-permission');
  } else if (absence.subtype === 'baja') {
    cell.classList.add('absence-baja');
  }
}
