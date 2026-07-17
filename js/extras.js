function openExtraModal(isoDate) {
  const modal = document.getElementById('extraModal');
  const typeSelect = document.getElementById('extraType');
  const dynamicFields = document.getElementById('extraDynamicFields');

  document.getElementById('extraModalDate').textContent = `Día: ${isoDate}`;

  function renderFields() {
    const type = typeSelect.value;
    if (type === 'modificacion') {
      dynamicFields.innerHTML = `
        <label>Horas</label>
        <input type="number" id="extraHours" step="0.25" min="0" value="0">
        <label>Observaciones</label>
        <input type="text" id="extraNote" placeholder="Modificación jornada">
      `;
    } else if (type === 'refuerzo') {
      dynamicFields.innerHTML = `
        <label>Horas</label>
        <input type="number" id="extraHours" step="0.25" min="0" value="0">
        <label>Observaciones</label>
        <input type="text" id="extraNote" placeholder="Refuerzo">
      `;
    } else if (type === 'nocturnidad') {
      dynamicFields.innerHTML = `
        <label>Horas de nocturnidad</label>
        <input type="number" id="extraHours" step="0.25" min="0" value="0">
        <label>Observaciones</label>
        <input type="text" id="extraNote" placeholder="Nocturnidad">
      `;
    } else if (type === 'complemento' || type === 'compensacion') {
      dynamicFields.innerHTML = `
        <label>Importe / horas</label>
        <input type="number" id="extraAmount" step="0.01" min="0" value="0">
        <label>Observaciones</label>
        <input type="text" id="extraNote" placeholder="${type === 'complemento' ? 'Complemento' : 'Compensación económica'}">
      `;
    } else {
      dynamicFields.innerHTML = `
        <label>Horas</label>
        <input type="number" id="extraHours" step="0.25" min="0" value="0">
        <label>Observaciones</label>
        <input type="text" id="extraNote" placeholder="${type}">
      `;
    }
  }

  typeSelect.onchange = renderFields;
  renderFields();

  modal.classList.remove('hidden');

  document.getElementById('cancelExtra').onclick = () => modal.classList.add('hidden');
  document.getElementById('cancelExtraTop').onclick = () => modal.classList.add('hidden');

  document.getElementById('saveExtra').onclick = () => {
    const extras = loadUserData('extras', []);
    const type = typeSelect.value;

    const extra = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: isoDate,
      type,
      hours: parseFloat(document.getElementById('extraHours')?.value || '0') || 0,
      amount: parseFloat(document.getElementById('extraAmount')?.value || '0') || 0,
      note: document.getElementById('extraNote')?.value || ''
    };

    extras.push(extra);
    saveUserData('extras', extras);
    modal.classList.add('hidden');
    renderCalendar();
  };
}

function deleteExtra(extraId) {
  let extras = loadUserData('extras', []);
  extras = extras.filter(ex => ex.id !== extraId);
  saveUserData('extras', extras);
  renderCalendar();
  renderSummary();
}
