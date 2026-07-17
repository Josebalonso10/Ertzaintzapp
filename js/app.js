document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.toggle('active', view.id === `tab-${tab}`);
      });
    });
  });

  // Modo noche (persistente via storage.js)
  const darkToggle = document.getElementById('darkModeToggle');
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    document.body.classList.toggle('theme-dark', storedTheme === 'dark');
    document.body.classList.toggle('theme-light', storedTheme === 'light');
  }

  darkToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light', !isDark);
    storeTheme(isDark ? 'dark' : 'light');
  });

  // Perfil / panel admin
  const profileButton = document.getElementById('profileButton');
  const adminPanel = document.getElementById('adminPanel');
  const closeAdminPanel = document.getElementById('closeAdminPanel');

  profileButton?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;

    if (user.is_admin) {
      adminPanel.classList.remove('hidden');
      loadAdminPanelData();
    } else {
      // Para usuario normal, mostramos solo perfil simplificado
      adminPanel.classList.remove('hidden');
      loadUserProfilePanel();
    }
  });

  closeAdminPanel?.addEventListener('click', () => {
    adminPanel.classList.add('hidden');
  });

  // Logout
  const logoutButton = document.getElementById('logoutButton');
  logoutButton?.addEventListener('click', async () => {
    await logoutUser();
    window.location.href = 'login.html';
  });

  // Inicialización de módulos
  initCalendar();
  initSummary();
  initSettings();
});
