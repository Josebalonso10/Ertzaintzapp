async function loadAdminPanelData() {
  // Carga desde backend
  const resp = await fetch('backend/admin.php?action=listUsers');
  const data = await resp.json();

  const list = document.getElementById('userAdminList');
  list.innerHTML = '';

  data.users.forEach(user => {
    const row = document.createElement('div');
    row.className = 'user-row';

    const label = document.createElement('span');
    label.textContent = `${user.professional_id} - ${user.approved ? 'Activo' : 'Pendiente'}`;

    const btnApprove = document.createElement('button');
    btnApprove.className = 'glass-btn';
    btnApprove.textContent = user.approved ? 'Desactivar' : 'Aprobar';
    btnApprove.addEventListener('click', async () => {
      await fetch('backend/admin.php', {
        method: 'POST',
        body: new URLSearchParams({
          action: user.approved ? 'deactivateUser' : 'approveUser',
          professional_id: user.professional_id
        })
      });
      loadAdminPanelData();
    });

    row.appendChild(label);
    row.appendChild(btnApprove);
    list.appendChild(row);
  });

  // Global indexes/festivos los puedes gestionar similarmente
}

function loadUserProfilePanel() {
  // Para usuario normal puedes mostrar su propio resumen simple
  const list = document.getElementById('userAdminList');
  list.innerHTML = '';
  const user = getCurrentUser();
  const row = document.createElement('div');
  row.className = 'user-row';
  row.textContent = `Profesional: ${user.professional_id}`;
  list.appendChild(row);
}
