function loadUserData(key, fallback = null) {
  try {
    const raw = localStorage.getItem(`ertzaintza_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveUserData(key, value) {
  localStorage.setItem(`ertzaintza_${key}`, JSON.stringify(value));
}
