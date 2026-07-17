function initSettings() {
  const list = document.getElementById('holidayList');
  const addBtn = document.getElementById('addHolidayButton');
  const adminBtn = document.getElementById('profileButton');
  const panel = document.getElementById('adminPanel');
  const usersList = document.getElementById('adminUsersList');

  const indexFields = [
    'valorHoraBase',
    'valorHoraExtra',
    'indiceNocturnidad',
    'indiceFestivo8',
    'indiceFestivo12',
    'indiceRefuerzo',
    'indiceJuicio',
    'indiceModificacion',
    'indiceCompensacion',
    'indiceBaja'
  ];

  function renderIndexes() {
    const container = document.getElementById('userIndexesForm');
    if (!container) return;
    container.innerHTML = '';
    indexFields.forEach(key => {
      const current = loadUserData(key, 0);
      const row = document.createElement('div');
      row.className = 'index-item';
      row.innerHTML = `
        <span>${key}</span>
        <input type="number" step="0.01" value="${current}" style="width:110px;">
      `;
      const input = row.querySelector('input');
      input.addEventListener('change', () => {
        saveUserData(key, parseFloat(input.value) || 0);
      });
      container.appendChild(row);
    });
  }

  function renderHolidays() {
    const holidays = loadUserData('holidays', []);
    if (!list) return;
    list.innerHTML = '';
    holidays.forEach((h, i) => {
      const div = document.createElement('div');
      div.className = 'holiday-item';
      div.innerHTML = `<span>${h.date} (${h.type}h)</span><button class="glass-btn danger">Borrar</button>`;
      div.querySelector('button').onclick = () => {
        holidays.splice(i, 1);
        saveUserData('holidays', holidays);
        renderHolidays();
        renderCalendar();
      };
      list.appendChild(div);
    });
  }

  addBtn?.addEventListener('click', () => {
    const date = document.getElementById('newHolidayDate').value;
    const type = document.getElementById('newHolidayType').value;
    if (!date) return;
    const holidays = loadUserData('holidays', []);
    holidays.push({ date, type: parseInt(type, 10) });
    saveUserData('holidays', holidays);
    renderHolidays();
    renderCalendar();
  });

  function renderAdminPanel() {
    if (!usersList) return;
    const user = getStoredUser();
    if (!user || !user.is_admin) {
      panel.innerHTML = '<p>No tienes permisos de administrador.</p>';
      return;
    }

    const users = loadUserData('adminUsers', []);
    if (!users.length) {
      panel.innerHTML = '<p>No hay usuarios locales para gestionar.</p>';
      return;
    }

    usersList.innerHTML = users.map(u => `
      <div class="admin-user-item">
        <div>
          <strong>${u.professional_id}</strong><br>
          <small>${u.is_admin ? 'Admin' : 'Usuario'} · ${u.approved ? 'Aprobado' : 'Pendiente'}</small>
        </div>
        <button class="glass-btn" onclick="toggleUserApproval('${u.professional_id}')">Cambiar estado</button>
      </div>
    `).join('');
  }

  window.toggleUserApproval = (pid) => {
    const users = loadUserData('adminUsers', []);
    const idx = users.findIndex(u => u.professional_id === pid);
    if (idx >= 0) {
      users[idx].approved = !users[idx].approved;
      saveUserData('adminUsers', users);
      renderAdminPanel();
    }
  };

  adminBtn?.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="settings"]')?.classList.add('active');
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
    document.getElementById('tab-settings')?.classList.add('active');
    renderAdminPanel();
  });

  renderIndexes();
  renderHolidays();
  renderAdminPanel();
}
