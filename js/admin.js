function renderAdminUsers() {
  const users = loadUserData('adminUsers', []);
  const container = document.getElementById('adminUsersList');
  if (!container) return;
  container.innerHTML = users.length ? users.map(u => `
    <div class="admin-user-item">
      <div>
        <strong>${u.professional_id}</strong><br>
        <small>${u.is_admin ? 'Admin' : 'Usuario'} · ${u.approved ? 'Aprobado' : 'Pendiente'}</small>
      </div>
    </div>
  `).join('') : '<p>No hay usuarios cargados.</p>';
}
