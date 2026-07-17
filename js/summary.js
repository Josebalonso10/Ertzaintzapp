let summaryYear = new Date().getFullYear();
let summaryMonth = new Date().getMonth();

function initSummary() {
  const yearSelect = document.getElementById('summaryYearSelect');
  const monthSelect = document.getElementById('summaryMonthSelect');

  for (let y = 2021; y <= 2030; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === summaryYear) opt.selected = true;
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
    if (idx === summaryMonth) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  yearSelect.addEventListener('change', () => {
    summaryYear = parseInt(yearSelect.value, 10);
    renderSummary();
  });
  monthSelect.addEventListener('change', () => {
    summaryMonth = parseInt(monthSelect.value, 10);
    renderSummary();
  });

  document.getElementById('summaryPrevMonth').addEventListener('click', () => {
    summaryMonth--;
    if (summaryMonth < 0) {
      summaryMonth = 11;
      summaryYear--;
    }
    yearSelect.value = summaryYear;
    monthSelect.value = summaryMonth;
    renderSummary();
  });

  document.getElementById('summaryNextMonth').addEventListener('click', () => {
    summaryMonth++;
    if (summaryMonth > 11) {
      summaryMonth = 0;
      summaryYear++;
    }
    yearSelect.value = summaryYear;
    monthSelect.value = summaryMonth;
    renderSummary();
  });

  renderSummary();
}

function renderSummary() {
  const extrasCurrent = document.getElementById('summaryExtrasCurrent');
  const extrasTwoMonthsAgo = document.getElementById('summaryExtrasTwoMonthsAgo');

  const extras = loadUserData('extras', []);
  const monthStr = `${summaryYear}-${String(summaryMonth+1).padStart(2,'0')}`;

  const current = extras.filter(ex => ex.date.startsWith(monthStr) && ex.type !== 'ausencia');
  extrasCurrent.innerHTML = '';
  current.forEach(ex => {
    const row = document.createElement('div');
    row.className = 'user-row';
    row.textContent = `${ex.date} - ${ex.subtype || ex.type}`;
    extrasCurrent.appendChild(row);
  });

  // Mes dos meses antes
  let twoMonth = summaryMonth - 2;
  let twoYear = summaryYear;
  if (twoMonth < 0) {
    twoMonth += 12;
    twoYear--;
  }
  const twoMonthStr = `${twoYear}-${String(twoMonth+1).padStart(2,'0')}`;
  const prevExtras = extras.filter(ex => ex.date.startsWith(twoMonthStr) && ex.type !== 'ausencia');
  extrasTwoMonthsAgo.innerHTML = '';
  prevExtras.forEach(ex => {
    const row = document.createElement('div');
    row.className = 'user-row';
    row.textContent = `${ex.date} - ${ex.subtype || ex.type}`;
    extrasTwoMonthsAgo.appendChild(row);
  });

  // Sincronizar diferencia horaria y vacaciones/AP (datos globales)
  const saldo = loadUserData('balanceHours', 0);
  document.getElementById('summaryBalanceHours').textContent = saldo;
  document.getElementById('vacationHours').textContent = loadUserData('vacationHours', 176);
  document.getElementById('personalHours').textContent = loadUserData('personalHours', 60);
}
