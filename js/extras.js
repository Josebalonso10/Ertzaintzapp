function openExtraModal(isoDate) {
  const modal = document.getElementById('extraModal');
  document.getElementById('extraModalDate').textContent = `Día: ${isoDate}`;
  
  const typeSelect = document.getElementById('extraType');
  const dynamicFields = document.getElementById('extraDynamicFields');

  typeSelect.onchange = () => renderExtraFields(typeSelect.value, dynamicFields);
  renderExtraFields(typeSelect.value, dynamicFields);

  modal.classList.remove('hidden');

  document.getElementById('cancelExtra').onclick = () => modal.classList.add('hidden');
  document.getElementById('cancelExtraTop').onclick = () => modal.classList.add('hidden');
  
  document.getElementById('saveExtra').onclick = () => {
    const extra = buildExtraFromFields(typeSelect.value, isoDate);
    const extras = loadUserData('extras', []);
    extras.push(extra);
    saveUserData('extras', extras);
    
    modal.classList.add('hidden');
    renderCalendar();
  };
}

function renderExtraFields(type, container) {
  if (type === 'modificacion') {
    container.innerHTML = `<label>Horas extra:</label> <input type="number" id="modHours" style="width:100%">`;
  } else if (type === 'refuerzo') {
    container.innerHTML = `<label>Claves (HO, HN...):</label> <input type="text" id="refClaves" placeholder="Ej: HO:4, HN:2" style="width:100%">`;
  } else {
    container.innerHTML = `<label>Horas consumidas / Detalles:</label> <input type="number" id="genHours" style="width:100%">`;
  }
}

function buildExtraFromFields(type, isoDate) {
  let val = document.getElementById('modHours')?.value || document.getElementById('genHours')?.value || 0;
  return { date: isoDate, type: type === 'vacaciones'||type==='asuntos'||type==='baja' ? 'ausencia' : 'extra', subtype: type, value: val };
}
