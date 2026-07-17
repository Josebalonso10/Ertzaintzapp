function initSummary() {
  const bindEdit = (btnId, displayId, storageKey, fallback = 0) => {
    document.getElementById(btnId)?.addEventListener('click', () => {
      const current = loadUserData(storageKey, fallback);
      const val = prompt('Introduce el nuevo valor:', current);
      if (val !== null && !isNaN(val)) {
        saveUserData(storageKey, parseFloat(val));
        document.getElementById(displayId).textContent = val;
        if (typeof updateBalanceHours === 'function') updateBalanceHours();
      }
    });
  };

  document.getElementById('summaryBalanceHours').textContent = loadUserData('balanceHours', 0);
  document.getElementById('vacationHours').textContent = loadUserData('vacationHours', 176);
  document.getElementById('personalHours').textContent = loadUserData('personalHours', 60);
  document.getElementById('economicCompHours').textContent = loadUserData('economicCompHours', 0);

  bindEdit('summaryEditBalance', 'summaryBalanceHours', 'balanceHours', 0);
  bindEdit('editVacationHours', 'vacationHours', 'vacationHours', 176);
  bindEdit('editPersonalHours', 'personalHours', 'personalHours', 60);
  bindEdit('editEconomicCompHours', 'economicCompHours', 'economicCompHours', 0);

  renderSummary();
}

function renderSummary() {
  const currentYear = parseInt(document.getElementById('summaryYearSelect')?.value || new Date().getFullYear(), 10);
  const currentMonth = parseInt(document.getElementById('summaryMonthSelect')?.value || new Date().getMonth(), 10);

  const extras = loadUserData('extras', []);
  const current = document.getElementById('summaryExtrasCurrent');
  const prev = document.getElementById('summaryExtrasTwoMonthsAgo');

  if (current) current.innerHTML = buildSummaryExtras(extras.filter(ex => isSameMonth(ex.date, currentYear, currentMonth)));
  if (prev) prev.innerHTML = buildSummaryExtras(extras.filter(ex => isSameMonth(ex.date, shiftMonth(currentYear, currentMonth, -2).year, shiftMonth(currentYear, currentMonth, -2).month)));
}

function buildSummaryExtras(list) {
  if (!list.length) return '<p>No hay complementos.</p>';
  return list.map(ex => `
    <div class="user-row">
      <div>
        <strong>${summaryTypeLabel(ex.type)}</strong><br>
        <small>${ex.date} ${ex.note ? '- ' + ex.note : ''}</small>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span>${ex.hours ? ex.hours + 'h' : (ex.amount ? ex.amount + '' : '')}</span>
        <button class="glass-btn danger" onclick="deleteExtra('${ex.id}')">Borrar</button>
      </div>
    </div>
  `).join('');
}

function summaryTypeLabel(type) {
  const map = {
    modificacion: 'Modificación jornada',
    refuerzo: 'Refuerzo',
    nocturnidad: 'Nocturnidad',
    complemento: 'Complemento',
    compensacion: 'Compensación económica',
    juicio: 'Juicio',
    vacaciones: 'Vacaciones',
    asuntos: 'Asuntos',
    baja: 'Baja'
  };
  return map[type] || type;
}

function isSameMonth(dateStr, year, month) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getFullYear() === year && d.getMonth() === month;
}

function shiftMonth(year, month, offset) {
  const d = new Date(year, month + offset, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

function updateBalanceHours() {
  const val = loadUserData('balanceHours', 0);
  const current = document.getElementById('balanceHours');
  const summary = document.getElementById('summaryBalanceHours');
  if (current) current.textContent = val;
  if (summary) summary.textContent = val;
}
