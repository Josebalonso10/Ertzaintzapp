function openExtraModal(isoDate) {
  const modal = document.getElementById('extraModal');
  const dateLabel = document.getElementById('extraModalDate');
  const typeSelect = document.getElementById('extraType');
  const dynamicFields = document.getElementById('extraDynamicFields');

  dateLabel.textContent = `Día: ${isoDate}`;
  dynamicFields.innerHTML = '';
  modal.classList.remove('hidden');

  // Al cambiar tipo, redibujar campos
  typeSelect.onchange = () => {
    renderExtraFields(typeSelect.value, dynamicFields);
  };
  renderExtraFields(typeSelect.value, dynamicFields);

  document.getElementById('cancelExtra').onclick = () => {
    modal.classList.add('hidden');
  };

  document.getElementById('saveExtra').onclick = () => {
    const extra = buildExtraFromFields(typeSelect.value, isoDate);
    saveExtra(extra);
    modal.classList.add('hidden');
    renderCalendar();
    updateBalanceHours();
  };
}

function renderExtraFields(type, container) {
  container.innerHTML = '';

  if (type === 'modificacion') {
    container.innerHTML = `
      <label>Horas extra trabajadas</label>
      <input type="number" id="modHours" min="0" step="0.5">
    `;
  } else if (type === 'refuerzo') {
    container.innerHTML = `
      <p>Refuerzo en día libre. Selecciona claves y horas:</p>
      <div>
        <label>HO (hora ordinaria)</label>
        <input type="number" id="refHO" min="0" step="0.5">
      </div>
      <div>
        <label>HN (hora nocturna)</label>
        <input type="number" id="refHN" min="0" step="0.5">
      </div>
      <div>
        <label>HF (hora festiva)</label>
        <input type="number" id="refHF" min="0" step="0.5">
      </div>
      <div>
        <label>HX (hora nocturno festiva)</label>
        <input type="number" id="refHX" min="0" step="0.5">
      </div>
      <div>
        <label>WO (compensación ordinaria)</label>
        <input type="number" id="refWO" min="0" step="0.5">
      </div>
      <div>
        <label>WN (compensación nocturna)</label>
        <input type="number" id="refWN" min="0" step="0.5">
      </div>
      <div>
        <label>WF (compensación festiva)</label>
        <input type="number" id="refWF" min="0" step="0.5">
      </div>
      <div>
        <label>WX (compensación festivo nocturna)</label>
        <input type="number" id="refWX" min="0" step="0.5">
      </div>
    `;
  } else if (type === 'juicio') {
    container.innerHTML = `
      <label>Tipo</label>
      <select id="juicioTipo">
        <option value="juicio">Juicio</option>
        <option value="tramite">Trámite judicial</option>
      </select>
      <label>Compensación</label>
      <select id="juicioCompensacion">
        <option value="economica">Económica</option>
        <option value="horaria6">Horaria 6h</option>
        <option value="horaria4">Horaria 4h</option>
        <option value="ninguna">Coincide con turno (sin compensación)</option>
      </select>
    `;
  } else if (['vacaciones','asuntos','permiso'].includes(type)) {
    container.innerHTML = `
      <label>Horas consumidas</label>
      <input type="number" id="absenceHours" min="0" step="0.5">
    `;
  } else if (type === 'baja') {
    container.innerHTML = `
      <label>Tipo de baja</label>
      <select id="bajaTipo">
        <option value="enfermedad">Enfermedad común</option>
        <option value="accidente">Accidente laboral</option>
      </select>
      <label>Horas consumidas</label>
      <input type="number" id="bajaHours" min="0" step="0.5">
    `;
  }
}

function buildExtraFromFields(type, isoDate) {
  const extra = { date: isoDate, type: null };

  if (type === 'modificacion') {
    extra.type = 'extra';
    extra.subtype = 'modificacion';
    extra.hours = parseFloat(document.getElementById('modHours').value || '0');
  } else if (type === 'refuerzo') {
    extra.type = 'extra';
    extra.subtype = 'refuerzo';
    extra.claves = {
      HO: parseFloat(document.getElementById('refHO').value || '0'),
      HN: parseFloat(document.getElementById('refHN').value || '0'),
      HF: parseFloat(document.getElementById('refHF').value || '0'),
      HX: parseFloat(document.getElementById('refHX').value || '0'),
      WO: parseFloat(document.getElementById('refWO').value || '0'),
      WN: parseFloat(document.getElementById('refWN').value || '0'),
      WF: parseFloat(document.getElementById('refWF').value || '0'),
      WX: parseFloat(document.getElementById('refWX').value || '0')
    };
  } else if (type === 'juicio') {
    extra.type = 'extra';
    extra.subtype = 'juicio';
    extra.juicioTipo = document.getElementById('juicioTipo').value;
    extra.compensacion = document.getElementById('juicioCompensacion').value;
  } else if (['vacaciones','asuntos','permiso'].includes(type)) {
    extra.type = 'ausencia';
    extra.subtype = type;
    extra.hours = parseFloat(document.getElementById('absenceHours').value || '0');
  } else if (type === 'baja') {
    extra.type = 'ausencia';
    extra.subtype = 'baja';
    extra.bajaTipo = document.getElementById('bajaTipo').value;
    extra.hours = parseFloat(document.getElementById('bajaHours').value || '0');
  }

  return extra;
}

function saveExtra(extra) {
  const extras = loadUserData('extras', []);
  extras.push(extra);
  saveUserData('extras', extras);
}

function renderExtrasListForMonth(year, month) {
  const list = document.getElementById('extrasList');
  list.innerHTML = '';

  const extras = loadUserData('extras', []);
  const monthStr = `${year}-${String(month+1).padStart(2,'0')}`;
  const filtered = extras.filter(ex => ex.date.startsWith(monthStr) && ex.type !== 'ausencia');

  if (filtered.length === 0) {
    list.textContent = 'No hay extras registrados este mes.';
    return;
  }

  filtered.forEach(ex => {
    const row = document.createElement('div');
    row.className = 'user-row';

    const left = document.createElement('span');
    left.textContent = `${ex.date} - ${ex.subtype || ex.type}`;

    const right = document.createElement('span');
    if (ex.subtype === 'modificacion') {
      right.textContent = `${ex.hours || 0} h`;
    } else if (ex.subtype === 'refuerzo') {
      right.textContent = 'Refuerzo (varias claves)';
    } else if (ex.subtype === 'juicio') {
      right.textContent = `${ex.juicioTipo} (${ex.compensacion})`;
    }

    row.appendChild(left);
    row.appendChild(right);
    list.appendChild(row);
  });
}

// Cómputo horario (saldo)
function updateBalanceHours() {
  const extras = loadUserData('extras', []);
  let saldo = loadUserData('balanceHours', 0);

  // Aquí podrías recalcular desde cero en función de configuración de índices,
  // por ahora lo dejamos como dato persistente editable manualmente.
  document.getElementById('balanceHours').textContent = saldo;

  // Sincronizar con resumen
  document.getElementById('summaryBalanceHours').textContent = saldo;
}
