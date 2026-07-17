function storeTheme(theme) {
  localStorage.setItem('ertzaintza_theme', theme);
}
function getStoredTheme() {
  return localStorage.getItem('ertzaintza_theme');
}

// Usuario actual (puedes sustituir por sesiones PHP)
function setCurrentUser(user) {
  localStorage.setItem('ertzaintza_user', JSON.stringify(user));
}
function getCurrentUser() {
  const raw = localStorage.getItem('ertzaintza_user');
  return raw ? JSON.parse(raw) : null;
}

// Datos calendario/resumen/índices se pueden guardar en localStorage
function saveUserData(key, data) {
  const user = getCurrentUser();
  if (!user) return;
  const storageKey = `ertzaintza_${user.professional_id}_${key}`;
  localStorage.setItem(storageKey, JSON.stringify(data));
}
function loadUserData(key, defaultValue = null) {
  const user = getCurrentUser();
  if (!user) return defaultValue;
  const storageKey = `ertzaintza_${user.professional_id}_${key}`;
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : defaultValue;
}
