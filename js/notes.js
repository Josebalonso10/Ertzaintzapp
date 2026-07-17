function initNotes() {
  const notesArea = document.getElementById('monthlyNotes');
  const addBtn = document.getElementById('addChecklistItem');
  const input = document.getElementById('newChecklistItemText');
  const list = document.getElementById('checklistItems');

  const data = loadUserData('monthlyNotes', { text: '', checklist: [] });
  notesArea.value = data.text || '';

  notesArea.addEventListener('input', () => {
    data.text = notesArea.value;
    saveUserData('monthlyNotes', data);
  });

  function renderList() {
    list.innerHTML = '';
    data.checklist.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'user-row';
      div.innerHTML = `<label style="display:flex;align-items:center;gap:8px;"><input type="checkbox" ${item.done ? 'checked' : ''}> ${item.text}</label><button class="glass-btn danger" style="padding:4px 10px;">✕</button>`;

      div.querySelector('input').addEventListener('change', e => {
        item.done = e.target.checked;
        saveUserData('monthlyNotes', data);
      });

      div.querySelector('button').addEventListener('click', () => {
        data.checklist.splice(idx, 1);
        saveUserData('monthlyNotes', data);
        renderList();
      });

      list.appendChild(div);
    });
  }

  addBtn.addEventListener('click', () => {
    if (!input.value.trim()) return;
    data.checklist.push({ text: input.value.trim(), done: false });
    saveUserData('monthlyNotes', data);
    input.value = '';
    renderList();
  });

  renderList();
}
