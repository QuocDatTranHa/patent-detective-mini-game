'use strict';

/* ─── State ──────────────────────────────── */
const gameState = {
  screen: 'start',        // 'start' | 'game' | 'win'
  language: 'de',         // 'de' | 'en'
  openModal: null,        // null | 'item' | 'safe' | 'menu'
  safeDigits: [0,0,0,0],  // current digit values
  safeErrorTimer: null,   // active setTimeout reference or null
  activeItemIndex: null   // 0–9; which clue modal is shown
};

/* ─── Localization strings ───────────────── */
const STRINGS = {
  de: {
    start:   'Start',
    restart: 'Spiel neustarten',
    close:   'Schließen',
    confirm: 'Bestätigen',
    error:   'Der Code ist nicht korrekt.',
    win:     'Glückwunsch!'
  },
  en: {
    start:   'Start',
    restart: 'Restart game',
    close:   'Close',
    confirm: 'Confirm',
    error:   'The code is incorrect.',
    win:     'Congratulations!'
  }
};

/* ─── Hotspot configuration ─────────────── */
/* Positions are percentage-based relative to the game screen.
   Clue paths and titles are placeholders — update with final
   assets and real background coordinates in Phase 8. */
const HOTSPOTS = [
  { top: '20%', left: '10%', clue: 'assets/clues/clue-01.svg', title: { de: 'Hinweis 1',  en: 'Clue 1'  } },
  { top: '20%', left: '30%', clue: 'assets/clues/clue-02.svg', title: { de: 'Hinweis 2',  en: 'Clue 2'  } },
  { top: '20%', left: '55%', clue: 'assets/clues/clue-03.svg', title: { de: 'Hinweis 3',  en: 'Clue 3'  } },
  { top: '20%', left: '78%', clue: 'assets/clues/clue-04.svg', title: { de: 'Hinweis 4',  en: 'Clue 4'  } },
  { top: '48%', left: '10%', clue: 'assets/clues/clue-05.svg', title: { de: 'Hinweis 5',  en: 'Clue 5'  } },
  { top: '48%', left: '30%', clue: 'assets/clues/clue-06.svg', title: { de: 'Hinweis 6',  en: 'Clue 6'  } },
  { top: '48%', left: '55%', clue: 'assets/clues/clue-07.svg', title: { de: 'Hinweis 7',  en: 'Clue 7'  } },
  { top: '48%', left: '78%', clue: 'assets/clues/clue-08.svg', title: { de: 'Hinweis 8',  en: 'Clue 8'  } },
  { top: '75%', left: '20%', clue: 'assets/clues/clue-09.svg', title: { de: 'Hinweis 9',  en: 'Clue 9'  } },
  { top: '75%', left: '70%', clue: 'assets/clues/clue-10.svg', title: { de: 'Hinweis 10', en: 'Clue 10' } },
];

/* ─── Localization ───────────────────────── */
function renderText() {
  const strings = STRINGS[gameState.language];
  document.querySelectorAll('[data-text]').forEach(el => {
    el.textContent = strings[el.dataset.text];
  });
  const flagIcon = document.getElementById('flag-icon');
  if (gameState.language === 'de') {
    flagIcon.src = 'assets/ui/flag-de.svg';
    flagIcon.alt = 'Deutsch';
  } else {
    flagIcon.src = 'assets/ui/flag-en.svg';
    flagIcon.alt = 'English';
  }
  document.documentElement.lang = gameState.language;
}

/* ─── Modal control ─────────────────────── */
/* Only one modal may be open at a time. openModal() guards
   against double-opens; closeModal() hides all modals at once
   so it does not need updating as new modal types are added. */
function openModal(type, index) {
  if (gameState.openModal !== null) return;

  if (type === 'item') {
    const spot = HOTSPOTS[index];
    const img = document.getElementById('modal-item-image');
    img.src = spot.clue;
    img.alt = spot.title[gameState.language];
    document.getElementById('modal-item-title').textContent =
      spot.title[gameState.language];
    gameState.activeItemIndex = index;
    document.getElementById('modal-item').classList.remove('hidden');
  }

  if (type === 'safe') {
    document.getElementById('safe-error').classList.add('hidden');
    renderDigits();
    document.getElementById('modal-safe').classList.remove('hidden');
  }

  if (type === 'menu') {
    document.getElementById('modal-menu').classList.remove('hidden');
  }

  document.getElementById('overlay').classList.remove('hidden');
  gameState.openModal = type;
}

function closeModal() {
  if (gameState.safeErrorTimer) {
    clearTimeout(gameState.safeErrorTimer);
    gameState.safeErrorTimer = null;
  }
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  document.getElementById('overlay').classList.add('hidden');
  gameState.openModal = null;
  gameState.activeItemIndex = null;
}

/* ─── Safe digit display ───────────────────── */
function renderDigits() {
  gameState.safeDigits.forEach((val, i) => {
    document.querySelector(`.digit-display[data-index="${i}"]`).textContent = val;
  });
}

/* ─── Hotspot rendering ──────────────────── */
/* Called once on init. Injects one .hotspot div per HOTSPOTS entry
   into #hotspot-layer and wires click → openModal. */
function renderHotspots() {
  const layer = document.getElementById('hotspot-layer');
  HOTSPOTS.forEach((spot, i) => {
    const div = document.createElement('div');
    div.className = 'hotspot';
    div.style.top = spot.top;
    div.style.left = spot.left;
    div.addEventListener('click', () => openModal('item', i));
    layer.appendChild(div);
  });
}

/* ─── Screen transitions ─────────────────── */
const SCREENS = ['start', 'game', 'win'];

function showScreen(name) {
  SCREENS.forEach(id => {
    document.getElementById('screen-' + id).classList.add('hidden');
  });
  document.getElementById('screen-' + name).classList.remove('hidden');
  gameState.screen = name;
}

/* ─── Event wiring ───────────────────────── */
document.getElementById('btn-start').addEventListener('click', () => {
  showScreen('game');
});

document.getElementById('btn-language').addEventListener('click', () => {
  gameState.language = gameState.language === 'de' ? 'en' : 'de';
  renderText();
});

document.querySelector('#modal-item .btn-close').addEventListener('click', closeModal);

/* Safe hotspot */
document.getElementById('hotspot-safe').addEventListener('click', () => openModal('safe'));

/* Safe digit arrows — event delegation on the digit container */
document.getElementById('safe-digits').addEventListener('click', e => {
  const up   = e.target.closest('.arrow-up');
  const down = e.target.closest('.arrow-down');
  if (!up && !down) return;
  const i = parseInt((up || down).dataset.index, 10);
  if (up) {
    gameState.safeDigits[i] = (gameState.safeDigits[i] + 1) % 10;
  } else {
    gameState.safeDigits[i] = (gameState.safeDigits[i] + 9) % 10;
  }
  renderDigits();
});

/* Confirm button — validate code; correct → win; wrong → 1.5 s error */
document.getElementById('btn-confirm').addEventListener('click', () => {
  const CORRECT = [9, 1, 2, 6];
  if (gameState.safeDigits.every((d, i) => d === CORRECT[i])) {
    showScreen('win');
    closeModal();
    return;
  }
  const errorEl = document.getElementById('safe-error');
  errorEl.classList.remove('hidden');
  if (gameState.safeErrorTimer) clearTimeout(gameState.safeErrorTimer);
  gameState.safeErrorTimer = setTimeout(() => {
    errorEl.classList.add('hidden');
    gameState.safeErrorTimer = null;
  }, 1500);
});

/* Safe modal close button */
document.querySelector('#modal-safe .btn-close').addEventListener('click', closeModal);

/* Menu button */
document.getElementById('btn-menu').addEventListener('click', () => openModal('menu'));

/* Overlay click — closes any open modal */
document.getElementById('overlay').addEventListener('click', () => {
  closeModal();
});

/* Menu modal close button */
document.querySelector('#modal-menu .btn-close').addEventListener('click', closeModal);

/* ─── Reset ──────────────────────────────── */
function reset() {
  closeModal();
  gameState.safeDigits = [0, 0, 0, 0];
  showScreen('start');
  renderText();
}

/* Restart buttons */
document.getElementById('btn-restart-menu').addEventListener('click', reset);
document.getElementById('btn-restart-win').addEventListener('click', reset);

/* ─── Init ───────────────────────────────── */
renderHotspots();
renderText();
