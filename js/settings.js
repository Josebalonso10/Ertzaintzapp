function initSettings() {
  const list = document.getElementById('holidayList');
  const addBtn = document.getElementById('addHolidayButton');
  
  function render() {
    const holidays = loadUserData('holidays', []);
    list.innerHTML = '';
    holidays.forEach((h, i) => {
      const div = document.createElement('div'); div.className = 'holiday-item';
      div.innerHTML = `<span>${h.date} (Festivo ${h.type}h)</span> <button class="glass-btn danger">Borrar</button>`;
      div.querySelector('button').onclick = () => { holidays.splice(i, 1); saveUserData('holidays', holidays); render(); renderCalendar(); };
      list.appendChild(div);
    });
  }

  addBtn?.addEventListener('click', () => {
    const date = document.getElementById('newHolidayDate').value;
    const type = document.getElementById('newHolidayType').value;
    if(!date) return;
    const holidays = loadUserData('holidays', []);
    holidays.push({ date, type: parseInt(type) });
    saveUserData('holidays', holidays);
    render(); renderCalendar();
  });

  render();
}
