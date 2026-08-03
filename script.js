/* ==========================================================================
   Configuración — cambia aquí lo que quieras personalizar
   ========================================================================== */
const CONFIG = {
  // Palabra clave para entrar a la página. Déjala en null para desactivar
  // la puerta de entrada por completo (la página se ve directamente).
  passphrase: "ORDINO26", // no distingue mayúsculas/minúsculas

  // Mensaje que aparece al completar las 3 fotos del quest.
  rewardTitle: "Ya casi lo tienes…",
  rewardText: "Cuando termines, pídeme el regalo — ya sabes dónde encontrarme."
};

/* ==========================================================================
   Puerta de entrada
   ========================================================================== */
(function initGate(){
  const gate = document.getElementById('gate');
  if (!gate) return;

  if (!CONFIG.passphrase) {
    gate.classList.add('hidden');
    return;
  }

  const already = sessionStorage.getItem('andorra-gate-ok');
  if (already === '1') {
    gate.classList.add('hidden');
    return;
  }

  const form = document.getElementById('gate-form');
  const input = document.getElementById('gate-input');
  const error = document.getElementById('gate-error');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const value = (input.value || '').trim().toUpperCase();
    if (value === CONFIG.passphrase.toUpperCase()) {
      sessionStorage.setItem('andorra-gate-ok', '1');
      gate.classList.add('hidden');
    } else {
      error.textContent = 'Esa no es la palabra correcta. Prueba otra vez.';
      input.value = '';
      input.focus();
    }
  });
})();

/* ==========================================================================
   Quest de fotos
   ========================================================================== */
(function initQuest(){
  const slots = document.querySelectorAll('.quest-slot');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');
  const reward = document.getElementById('reward');
  const total = slots.length;

  if (!slots.length) return;

  // Aplica el texto configurable del premio
  const rewardH3 = reward.querySelector('h3');
  const rewardP = reward.querySelector('p');
  if (rewardH3) rewardH3.textContent = CONFIG.rewardTitle;
  if (rewardP) rewardP.innerHTML = CONFIG.rewardText;

  function storageKey(n){ return 'andorra-quest-photo-' + n; }

  function updateProgress(){
    let done = 0;
    slots.forEach(function(slot){
      if (slot.classList.contains('done')) done++;
    });
    const pct = Math.round((done / total) * 100);
    progressFill.style.width = pct + '%';
    progressLabel.textContent = done + ' / ' + total + ' encontrados';

    if (done === total) {
      reward.classList.add('visible');
    } else {
      reward.classList.remove('visible');
    }
  }

  function markDone(slot, dataUrl){
    slot.classList.add('done');
    const preview = slot.querySelector('.quest-preview');
    preview.innerHTML = '';
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = 'Foto subida';
    preview.appendChild(img);
    const label = slot.querySelector('label');
    if (label && !label.querySelector('.check')) {
      label.textContent = 'Cambiar foto';
      const check = document.createElement('span');
      check.className = 'check';
      check.textContent = '✓';
      label.appendChild(check);
    }
  }

  // Restaurar progreso guardado (mismo dispositivo/navegador)
  slots.forEach(function(slot){
    const n = slot.getAttribute('data-slot');
    try {
      const saved = localStorage.getItem(storageKey(n));
      if (saved) markDone(slot, saved);
    } catch (e) { /* localStorage no disponible, se ignora */ }
  });
  updateProgress();

  // Escuchar subidas nuevas
  slots.forEach(function(slot){
    const n = slot.getAttribute('data-slot');
    const input = slot.querySelector('input[type=file]');
    input.addEventListener('change', function(){
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e){
        const dataUrl = e.target.result;
        markDone(slot, dataUrl);
        try { localStorage.setItem(storageKey(n), dataUrl); } catch (e) { /* cuota superada, se ignora */ }
        updateProgress();
      };
      reader.readAsDataURL(file);
    });
  });
})();
