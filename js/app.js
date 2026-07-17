document.addEventListener('DOMContentLoaded', () => {
  const user = getStoredUser();

  if (!user && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
    return;
  }

  if (user && document.getElementById('userRoleBadge')) {
    document.getElementById('userRoleBadge').textContent = user.professional_id;
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
      if (btn.dataset.tab === 'summary' && typeof renderSummary === 'function') renderSummary();
    });
  });

  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    const theme = loadUserData('theme', 'dark');
    document.body.className = `theme-${theme}`;
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      const newTheme = isDark ? 'light' : 'dark';
      document.body.className = `theme-${newTheme}`;
      saveUserData('theme', newTheme);
    });
  }

  document.getElementById('logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('ertzaintza_user');
    window.location.href = 'login.html';
  });

  if (typeof initCalendar === 'function') initCalendar();
  if (typeof initNotes === 'function') initNotes();
  if (typeof initSummary === 'function') initSummary();
  if (typeof initSettings === 'function') initSettings();
});

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('ertzaintza_user'));
  } catch {
    return null;
  }
}
