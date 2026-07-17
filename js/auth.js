document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (!loginForm && !registerForm) return;

  const tabs = document.querySelectorAll('.auth-tab-btn');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.authTab;
      forms.forEach(f => f.classList.toggle('active', f.id === `${tab}Form`));
    });
  });

  loginForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const form = new FormData(loginForm);
    const res = await fetch('backend/login.php', {
      method: 'POST',
      body: form
    });
    const data = await res.json();

    const err = document.getElementById('loginError');
    if (!data.success) {
      err.textContent = data.message || 'Error de login';
      err.classList.remove('hidden');
      return;
    }

    localStorage.setItem('ertzaintza_user', JSON.stringify(data.user));
    window.location.href = 'index.html';
  });

  registerForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const pass = registerForm.querySelector('[name="password"]').value;
    const pass2 = registerForm.querySelector('[name="password_confirm"]').value;
    const err = document.getElementById('registerError');

    if (pass !== pass2) {
      err.textContent = 'Las contraseñas no coinciden';
      err.classList.remove('hidden');
      return;
    }

    const form = new FormData(registerForm);
    const res = await fetch('backend/register.php', {
      method: 'POST',
      body: form
    });
    const data = await res.json();

    if (!data.success) {
      err.textContent = data.message || 'Error en el registro';
      err.classList.remove('hidden');
      return;
    }

    err.textContent = 'Registro enviado. Pendiente de aprobación.';
    err.classList.remove('hidden');
  });
});

async function logoutUser() {
  localStorage.removeItem('ertzaintza_user');
  await fetch('backend/login.php?action=logout', { method: 'GET' }).catch(() => {});
}
