document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.auth-tab-btn');
  const forms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.authTab;
      forms.forEach(f => f.classList.toggle('active', f.id === `${tab}Form`));

      loginError.classList.add('hidden');
      registerError.classList.add('hidden');
    });
  });

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    loginError.classList.add('hidden');

    const formData = new FormData(loginForm);

    try {
      const res = await fetch('backend/login.php', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!data.success) {
        loginError.textContent = data.message || 'No se ha podido iniciar sesión.';
        loginError.classList.remove('hidden');
        return;
      }

      localStorage.setItem('ertzaintza_user', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } catch (err) {
      loginError.textContent = 'Error de conexión con el servidor.';
      loginError.classList.remove('hidden');
    }
  });

  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    registerError.classList.add('hidden');

    const pass = document.getElementById('registerPassword').value.trim();
    const pass2 = document.getElementById('registerPasswordConfirm').value.trim();

    if (pass !== pass2) {
      registerError.textContent = 'Las contraseñas no coinciden.';
      registerError.classList.remove('hidden');
      return;
    }

    const formData = new FormData(registerForm);

    try {
      const res = await fetch('backend/register.php', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!data.success) {
        registerError.textContent = data.message || 'No se ha podido registrar.';
        registerError.classList.remove('hidden');
        return;
      }

      registerError.textContent = 'Solicitud enviada. Un administrador deberá aprobar tu alta.';
      registerError.style.background = 'rgba(34,197,94,0.12)';
      registerError.style.borderColor = 'rgba(34,197,94,0.25)';
      registerError.style.color = '#bbf7d0';
      registerError.classList.remove('hidden');
      registerForm.reset();
    } catch (err) {
      registerError.textContent = 'Error de conexión con el servidor.';
      registerError.classList.remove('hidden');
    }
  });
});
