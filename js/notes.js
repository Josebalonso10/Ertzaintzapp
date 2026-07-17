function initNotes() {
  const notes = document.getElementById('monthlyNotes');
  const checklistContainer = document.getElementById('checklistItems');
  const addBtn = document.getElementById('addChecklistItem');
  const newText = document.getElementById('newChecklistItemText');

  const year = currentCalendarYear;
  const month = currentCalendarMonth;

  // Cargar notas y checklist
  const key = `notes_${year}_${month}`;
  const stored = loadUserData(key, { text: '', checklist: [] });
  notes.value = stored.text;
  renderChecklist(stored.checklist, checklistContainer);

  notes.addEventListener('input', () => {
    const data = loadUserData(key, { text: '', checklist: [] });
    data.text = notes.value;
    saveUserData(key, data);
  });

  addBtn.addEventListener('click', () => {
    const t = newText.value.trim();
    if (!t) return;
    const data = loadUserData(key, { text: notes.value, checklist: [] });
    data.checklist.push({ text: t, done: false });
    saveUserData(key, data);
    newText.value = '';
    renderChecklist(data.checklist, checklistContainer);
  });
}

function renderChecklist(items, container) {
  container.innerHTML = '';
  items.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'user-row';

    const label = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = item.done;
    cb.addEventListener('change', () => {
      const year = currentCalendarYear;
      const month = currentCalendarMonth;
      const key = `notes_${year}_${month}`;
      const data = loadUserData(key, { text: '', checklist: [] });
      data.checklist[idx].done = cb.checked;
      saveUserData(key, data);
    });

    label.appendChild(cb);
    label.appendChild(document.createTextNode(' ' + item.text));
    row.appendChild(label);
    container.appendChild(row);
  });
}
