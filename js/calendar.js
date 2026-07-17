let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth();

function initCalendar() {
  const yearSelect = document.getElementById('calendarYearSelect');
  const monthSelect = document.getElementById('calendarMonthSelect');
  const cycleSelect = document.getElementById('shiftCycleSelect');

  if (!yearSelect || !monthSelect || !cycleSelect) return;

  for (let y = 2021; y <= 2030; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === currentCalendarYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }

  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  months.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = m;
    if (i === currentCalendarMonth) opt.selected = true;
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

  cycleSelect.addEventListener('change', renderCalendar);

  const closeModalBtn = document.getElementById('closeDayModal');
  const modal = document.getElementById('dayModal');
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', closeDayModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeDayModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDayModal();
    });
  }

  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const year = currentCalendarYear;
  const month = currentCalendarMonth;
  const selectedGroup = document.getElementById('shiftCycleSelect')?.value || 'G1';

  const dayNames = ['L','M','X','J','V','S','D'];
  dayNames.forEach(d => {
    const h = document.createElement('div');
    h.className = 'calendar-day-header';
    h.textContent = d;
    grid.appendChild(h);
  });

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstOfMonth.getDay() + 6) % 7;

  const holidays = loadUserData('holidays', []);
  const extras = loadUserData('extras', []);

  for (let i = 0; i < offset; i++) grid.appendChild(document.createElement('div'));

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

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

    const shiftInfo = getShiftForDate(date, selectedGroup);
    applyShiftClasses(cell, shiftInfo);

    const holiday = holidays.find(h => h.date === isoDate) || null;
    if (holiday) {
      cell.classList.add('holiday-border');
      const tag = document.createElement('span');
      tag.className = 'holiday-tag';
      tag.textContent = holiday.type === 8 ? 'F8' : 'F12';
      tagContainer.appendChild(tag);
    }

    const dayExtras = extras.filter(ex => ex.date === isoDate && ex.type !== 'ausencia');
    if (dayExtras.length) {
      const dot = document.createElement('div');
      dot.className = 'extra-dot';
      tagContainer.appendChild(dot);
    }

    const absences = extras.filter(ex => ex.date === isoDate && ex.type === 'ausencia');
    if (absences.length) applyAbsenceClass(cell, absences[0]);

    cell.addEventListener('click', () => {
      openDayModal(isoDate, shiftInfo, holiday, dayExtras, absences);
    });

    grid.appendChild(cell);
  }

  renderExtrasListForMonth(year, month);
  updateBalanceHours();
}

function applyShiftClasses(cell, info) {
  cell.classList.remove('shift-morning', 'shift-afternoon', 'shift-night', 'shift-free');
  if (info.shiftType === 'morning') cell.classList.add('shift-morning');
  else if (info.shiftType === 'afternoon') cell.classList.add('shift-afternoon');
  else if (info.shiftType === 'night') cell.classList.add('shift-night');
  else cell.classList.add('shift-free');
}

function applyAbsenceClass(cell, absence) {
  cell.classList.add('absence-keep-border');
  if (absence.subtype === 'vacaciones') cell.classList.add('absence-vacation');
  else if (absence.subtype === 'asuntos') cell.classList.add('absence-personal');
  else if (absence.subtype === 'compensacion') cell.classList.add('absence-personal');
  else if (absence.subtype === 'baja') cell.classList.add('absence-baja');
  else if (absence.subtype === 'permiso') cell.classList.add('absence-personal');
}

function openDayModal(isoDate, shiftInfo, holiday, dayExtras, absences) {
  document.getElementById('dayModalTitle').textContent = isoDate;
  document.getElementById('dayModalBody').innerHTML = `
    <div class="user-row"><span>Turno:</span> <strong>${shiftLabel(shiftInfo.shiftType)}</strong></div>
    <div class="user-row"><span>Festivo:</span> <strong>${holiday ? holiday.type + 'h' : 'No'}</strong></div>
    <div class="user-row"><span>Extras:</span> <strong>${dayExtras.length}</strong></div>
    <div class="user-row"><span>Ausencias:</span> <strong>${absences.length}</strong></div>
    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
      <button class="glass-btn" id="openExtraEditorBtn" style="background:var(--blue); color:white;">Añadir Extra</button>
      <button class="glass-btn danger" id="deleteDayExtrasBtn">Eliminar extras del día</button>
    </div>
  `;
  document.getElementById('dayModal').classList.remove('hidden');

  document.getElementById('openExtraEditorBtn').onclick = () => {
    document.getElementById('dayModal').classList.add('hidden');
    openExtraModal(isoDate);
  };

  document.getElementById('deleteDayExtrasBtn').onclick = () => {
    let extras = loadUserData('extras', []);
    extras = extras.filter(ex => ex.date !== isoDate);
    saveUserData('extras', extras);
    document.getElementById('dayModal').classList.add('hidden');
    renderCalendar();
  };
}

function closeDayModal() {
  document.getElementById('dayModal')?.classList.add('hidden');
}

function shiftLabel(type) {
  if (type === 'morning') return 'Mañana';
  if (type === 'afternoon') return 'Tarde';
  if (type === 'night') return 'Noche';
  return 'Libre';
}
