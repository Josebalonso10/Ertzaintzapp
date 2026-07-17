function initSummary() {
  function bindEdit(btnId, displayId, storageKey) {
    document.getElementById(btnId)?.addEventListener('click', () => {
      const val = prompt('Introduce el nuevo valor:');
      if (val !== null && !isNaN(val)) {
        saveUserData(storageKey, parseFloat(val));
        document.getElementById(displayId).textContent = val;
      }
    });
  }

  document.getElementById('summaryBalanceHours').textContent = loadUserData('balanceHours', 0);
  document.getElementById('vacationHours').textContent = loadUserData('vacationHours', 176);
  document.getElementById('personalHours').textContent = loadUserData('personalHours', 60);

  bindEdit('summaryEditBalance', 'summaryBalanceHours', 'balanceHours');
  bindEdit('editVacationHours', 'vacationHours', 'vacationHours');
  bindEdit('editPersonalHours', 'personalHours', 'personalHours');
}
