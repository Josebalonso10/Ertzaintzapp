document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.auth-tab-btn');
  const forms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  const loginId = document.getElementById('loginProfessionalId');
  const registerId = document.getElementById('registerProfessionalId');
  if (loginId) loginId.value = '';
  if (registerId) registerId.value = '';

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

    try {
      const res = await fetch('backend/login.php', {
        method: 'POST',
        body: new FormData(loginForm)
      });

      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(raw || 'Respuesta inválida del servidor');
      }

      if (!data.success) {
        loginError.textContent = data.message || 'No se ha podido iniciar sesión.';
        loginError.classList.remove('hidden');
        return;
      }

      localStorage.setItem('ertzaintza_user', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } catch (err) {
      loginError.textContent = err.message || 'Error de conexión con el servidor.';
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

    try {
      const res = await fetch('backend/register.php', {
        method: 'POST',
        body: new FormData(registerForm)
      });

      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(raw || 'Respuesta inválida del servidor');
      }

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
      registerError.textContent = err.message || 'Error de conexión con el servidor.';
      registerError.classList.remove('hidden');
    }
  });
});
