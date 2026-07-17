let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth();

function initCalendar() {
  const yearSelect = document.getElementById('calendarYearSelect');
  const monthSelect = document.getElementById('calendarMonthSelect');
  const cycleSelect = document.getElementById('shiftCycleSelect');

  for (let y = 2021; y <= 2030; y++) {
    const opt = document.createElement('option'); opt.value = y; opt.textContent = y;
    if (y === currentCalendarYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }

  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  months.forEach((m, i) => {
    const opt = document.createElement('option'); opt.value = i; opt.textContent = m;
    if (i === currentCalendarMonth) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  yearSelect.addEventListener('change', () => { currentCalendarYear = parseInt(yearSelect.value); renderCalendar(); });
  monthSelect.addEventListener('change', () => { currentCalendarMonth = parseInt(monthSelect.value); renderCalendar(); });
  cycleSelect.addEventListener('change', renderCalendar);

  document.getElementById('calendarPrevMonth').addEventListener('click', () => {
    currentCalendarMonth--; if(currentCalendarMonth < 0){ currentCalendarMonth = 11; currentCalendarYear--; }
    yearSelect.value = currentCalendarYear; monthSelect.value = currentCalendarMonth; renderCalendar();
  });
  document.getElementById('calendarNextMonth').addEventListener('click', () => {
    currentCalendarMonth++; if(currentCalendarMonth > 11){ currentCalendarMonth = 0; currentCalendarYear++; }
    yearSelect.value = currentCalendarYear; monthSelect.value = currentCalendarMonth; renderCalendar();
  });

  document.getElementById('closeDayModal').addEventListener('click', () => document.getElementById('dayModal').classList.add('hidden'));

  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';
  const selectedGroup = document.getElementById('shiftCycleSelect').value;
  
  const dayNames = ['L','M','X','J','V','S','D'];
  dayNames.forEach(d => { const h = document.createElement('div'); h.className = 'calendar-day-header'; h.textContent = d; grid.appendChild(h); });

  const firstOfMonth = new Date(currentCalendarYear, currentCalendarMonth, 1);
  const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
  const offset = (firstOfMonth.getDay() + 6) % 7;

  const holidays = loadUserData('holidays', []);
  const extras = loadUserData('extras', []);

  for (let i = 0; i < offset; i++) grid.appendChild(document.createElement('div'));

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentCalendarYear, currentCalendarMonth, day);
    // CORRECCIÓN ISO DATE LOCAL (Evita que el 16 sea el 15)
    const mStr = String(currentCalendarMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const isoDate = `${currentCalendarYear}-${mStr}-${dStr}`;

    const cell = document.createElement('div'); cell.className = 'calendar-cell';
    const header = document.createElement('div'); header.className = 'calendar-cell-header';
    const dateSpan = document.createElement('span'); dateSpan.className = 'calendar-cell-date'; dateSpan.textContent = day;
    const tagContainer = document.createElement('div');

    header.appendChild(dateSpan); header.appendChild(tagContainer); cell.appendChild(header);

    const shiftInfo = getShiftForDate(date, selectedGroup);
    applyShiftClasses(cell, shiftInfo);

    const holiday = holidays.find(h => h.date === isoDate);
    if (holiday) {
      cell.classList.add('holiday-border');
      const tag = document.createElement('span'); tag.className = 'holiday-tag'; tag.textContent = holiday.type === 8 ? 'F8' : 'F12';
      tagContainer.appendChild(tag);
    }

    const dayExtras = extras.filter(ex => ex.date === isoDate && ex.type !== 'ausencia');
    if (dayExtras.length) {
      const dot = document.createElement('div'); dot.className = 'extra-dot'; tagContainer.appendChild(dot);
    }

    const absences = extras.filter(ex => ex.date === isoDate && ex.type === 'ausencia');
    if (absences.length) applyAbsenceClass(cell, absences[0]);

    cell.addEventListener('click', () => {
      openDayModal(isoDate, shiftInfo, holiday, dayExtras, absences);
    });

    grid.appendChild(cell);
  }
}

function applyShiftClasses(cell, info) {
  cell.classList.remove('shift-morning', 'shift-afternoon', 'shift-night', 'shift-free');
  if (info.shiftType === 'morning') cell.classList.add('shift-morning');
  else if (info.shiftType === 'afternoon') cell.classList.add('shift-afternoon');
  else if (info.shiftType === 'night') cell.classList.add('shift-night');
  else cell.classList.add('shift-free');
}

function applyAbsenceClass(cell, absence) {
  cell.classList.add('absence-keep-border', 'absence-vacation');
}

function openDayModal(isoDate, shiftInfo, holiday, dayExtras, absences) {
  document.getElementById('dayModalTitle').textContent = isoDate;
  document.getElementById('dayModalBody').innerHTML = `
    <div class="user-row"><span>Turno:</span> <strong>${shiftInfo.shiftType.toUpperCase()}</strong></div>
    <div class="user-row"><span>Festivo:</span> <strong>${holiday ? holiday.type+'h' : 'No'}</strong></div>
    <div class="user-row"><span>Extras regs:</span> <strong>${dayExtras.length}</strong></div>
    <div style="margin-top:20px; display:flex; gap:10px;">
      <button class="glass-btn" id="openExtraEditorBtn" style="background:var(--blue); color:white; flex:1;">Añadir Extra</button>
    </div>
  `;
  document.getElementById('dayModal').classList.remove('hidden');

  document.getElementById('openExtraEditorBtn').onclick = () => {
    document.getElementById('dayModal').classList.add('hidden');
    openExtraModal(isoDate); // Salta a extras.js
  };
}
