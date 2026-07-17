function initSettings() {
  const useDefaults = document.getElementById('useAdminDefaults');
  const userIndexesForm = document.getElementById('userIndexesForm');
  const holidayList = document.getElementById('holidayList');
  const addHolidayButton = document.getElementById('addHolidayButton');

  useDefaults.addEventListener('change', () => {
    const value = useDefaults.checked;
    const config = loadUserData('indexesConfig', { useDefaults: true, values: {} });
    config.useDefaults = value;
    saveUserData('indexesConfig', config);
    renderUserIndexesForm(userIndexesForm, config);
  });

  const config = loadUserData('indexesConfig', { useDefaults: true, values: {} });
  useDefaults.checked = config.useDefaults;
  renderUserIndexesForm(userIndexesForm, config);

  // Festivos
  const holidays = loadUserData('holidays', getDefaultNationalHolidays());
  saveUserData('holidays', holidays);
  renderHolidayList(holidayList, holidays);

  addHolidayButton.addEventListener('click', () => {
    const date = document.getElementById('newHolidayDate').value;
    const type = parseInt(document.getElementById('newHolidayType').value, 10);
    if (!date) return;
    const holidays = loadUserData('holidays', []);
    holidays.push({ date, type });
    saveUserData('holidays', holidays);
    renderHolidayList(holidayList, holidays);
    renderCalendar();
  });
}

function renderUserIndexesForm(container, config) {
  container.innerHTML = '';
  const values = config.values || {};

  const fields = [
    { key: 'festivo8', label: 'Festivo 8h (L-V)' },
    { key: 'festivo12', label: 'Festivo 12h (S-D)' },
    { key: 'nocturnidad', label: 'Nocturnidad (por hora)' },
    { key: 'juicioEconomico', label: 'Importe juicio (económico)' },
    { key: 'juicioTramite', label: 'Importe trámite judicial' },
    { key: 'HO', label: 'HO (hora ordinaria)' },
    { key: 'HN', label: 'HN (hora nocturna)' },
    { key: 'HF', label: 'HF (hora festiva)' },
    { key: 'HX', label: 'HX (hora nocturno festiva)' },
    { key: 'WO', label: 'WO (compensación ordinaria)' },
    { key: 'WN', label: 'WN (compensación nocturna)' },
    { key: 'WF', label: 'WF (compensación festiva)' },
    { key: 'WX', label: 'WX (compensación festivo nocturna)' }
  ];

  fields.forEach(f => {
    const row = document.createElement('div');
    row.className = 'user-row';

    const label = document.createElement('span');
    label.textContent = f.label;

    const input = document.createElement('input');
    input.type = 'number';
    input.step = '0.01';
    input.value = values[f.key] ?? '';
    input.disabled = config.useDefaults;

    input.addEventListener('input', () => {
      const cfg = loadUserData('indexesConfig', { useDefaults: true, values: {} });
      cfg.values[f.key] = parseFloat(input.value || '0');
      saveUserData('indexesConfig', cfg);
    });

    row.appendChild(label);
    row.appendChild(input);
    container.appendChild(row);
  });
}

function getDefaultNationalHolidays() {
  // Ejemplo: festivos nacionales (deberías completar según calendario)
  return [
    { date: '2026-01-01', type: 8 },
    { date: '2026-12-25', type: 8 }
  ];
}

function renderHolidayList(container, holidays) {
  container.innerHTML = '';
  holidays.forEach((h, idx) => {
    const row = document.createElement('div');
    row.className = 'holiday-item';
    const label = document.createElement('span');
    label.textContent = `${h.date} - ${h.type}h`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'glass-btn danger';
    removeBtn.textContent = 'Eliminar';
    removeBtn.addEventListener('click', () => {
      const list = loadUserData('holidays', []);
      list.splice(idx, 1);
      saveUserData('holidays', list);
      renderHolidayList(container, list);
      renderCalendar();
    });

    row.appendChild(label);
    row.appendChild(removeBtn);
    container.appendChild(row);
  });
}
