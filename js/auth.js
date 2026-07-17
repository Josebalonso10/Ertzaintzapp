document.addEventListener('DOMContentLoaded', () => {
  // Tabs login/registro
  const tabBtns = document.querySelectorAll('.auth-tab-btn');
  const forms = {
    login: document.getElementById('loginForm'),
    register: document.getElementById('registerForm')
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.authTab;
      Object.values(forms).forEach(f => f.classList.remove('active'));
      forms[tab].classList.add('active');
    });
  });

  // LOGIN
  forms.login?.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.professional_id.value.trim();
    const password = form.password.value;

    const resp = await fetch('backend/login.php', {
      method: 'POST',
      body: new URLSearchParams({ professional_id: id, password })
    });
    const data = await resp.json();

    if (!data.success) {
      const err = document.getElementById('loginError');
      err.textContent = data.message || 'Error de inicio de sesión';
      err.classList.remove('hidden');
      return;
    }

    setCurrentUser(data.user);
    window.location.href = 'index.html';
  });

  // REGISTRO
  forms.register?.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.professional_id.value.trim();
    const pass = form.password.value;
    const pass2 = form.password_confirm.value;

    const err = document.getElementById('registerError');

    if (pass !== pass2) {
      err.textContent = 'Las contraseñas no coinciden.';
      err.classList.remove('hidden');
      return;
    }

    const resp = await fetch('backend/register.php', {
      method: 'POST',
      body: new URLSearchParams({ professional_id: id, password: pass })
    });
    const data = await resp.json();

    if (!data.success) {
      err.textContent = data.message || 'Error al registrar.';
      err.classList.remove('hidden');
      return;
    }

    err.textContent = 'Registro enviado. Pendiente de aprobación.';
    err.classList.remove('hidden');
  });
});

// Logout simple si más adelante quieres usarlo desde JS
async function logoutUser() {
  await fetch('backend/login.php?action=logout', { method: 'GET' });
  localStorage.removeItem('ertzaintza_user');
}
