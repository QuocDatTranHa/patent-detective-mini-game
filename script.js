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
    replay:  'Neu starten',
    close:   'Schließen',
    confirm: 'Bestätigen',
    error:   'Der Code ist nicht korrekt.',
    win:     'Glückwunsch!'
  },
  en: {
    start:   'Start',
    restart: 'Restart game',
    replay:  'Replay',
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
  { top: '44.2%', left: '10.4%', w:  '9%', h: '42%',              clue: 'assets/clues/game-instructor.png',  title: { de: 'Spielleiter',    en: 'Game Instructor' } },  // 1a. detective body
  { top: '26.4%', left: '16.3%', w: '12%', h: '18%', noIndicator: true, linkedTo: 0, clue: 'assets/clues/game-instructor.png', title: { de: 'Spielleiter',    en: 'Game Instructor' } },  // 1b. detective speech bubble
  { top: '58.8%', left: '27.8%', w: '10%', h: '18%',              clue: 'assets/clues/easter-egg.png',       title: { de: 'Osterei',        en: 'Easter Egg'      } },  // 2.  Q monitor (easter egg)
  { top: '32.5%', left: '33.5%', w:  '5%', h:  '9%',              clue: 'assets/clues/r-clue-keypad.png',    title: { de: 'Sicherheitspad', en: 'Security Keypad'  } },  // 3.  security keypad
  { top: '49.6%', left: '41.6%', w:  '7%', h: '13%',              clue: 'assets/clues/r-clue-energy.png',    title: { de: 'Energiemodul',   en: 'Energy Module'   } },  // 4.  energy module
  { top: '79.4%', left: '49.5%', w:  '8%', h: '18%',              clue: 'assets/clues/r-clue-chair.png',     title: { de: 'Stuhl',          en: 'Chair'           } },  // 5.  height-adjustable chair
  { top: '41.9%', left: '61.3%', w:  '7%', h: '20%',              clue: 'assets/clues/i-clue-microscope.png', title: { de: 'Mikroskop',     en: 'Microscope'      } },  // 6.  microscope
  { top: '81.4%', left: '69.6%', w: '11%', h: '16%',              clue: 'assets/clues/r-clue-wheel.png',     title: { de: 'Werkzeugwagen', en: 'Tool Wagon'       } },  // 7.  tool wagon wheel
  { top: '40.6%', left: '75.5%', w:  '8%', h: '19%',              clue: 'assets/clues/i-clue-3dprinter.png', title: { de: '3D-Drucker',    en: '3D Printer'      } },  // 8.  3D printer
  { top: '22.4%', left: '77.4%', w:  '9%', h: '13%',              clue: 'assets/clues/i-clue-measure.png',   title: { de: 'Messgerät',     en: 'Measuring Device'} },  // 9.  electric measuring device
  { top: '26.7%', left: '91.1%', w: '12%', h: '20%',              clue: 'assets/clues/i-clue-whiteboard.png', title: { de: 'Whiteboard',   en: 'Whiteboard'      } },  // 10. whiteboard
];

/* ─── Localization ───────────────────────── */
function renderText() {
  const strings = STRINGS[gameState.language];
  document.querySelectorAll('[data-text]').forEach(el => {
    el.textContent = strings[el.dataset.text];
  });
  const flagIcon = document.getElementById('flag-icon');
  const newSrc = gameState.language === 'de'
    ? 'assets/ui/flag-de.svg'
    : 'assets/ui/flag-en.svg';
  const newAlt = gameState.language === 'de' ? 'Deutsch' : 'English';
  if (flagIcon.getAttribute('src') === newSrc) return;
  flagIcon.src = newSrc;
  flagIcon.alt = newAlt;
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
  const divs = [];
  HOTSPOTS.forEach((spot, i) => {
    const div = document.createElement('div');
    div.className = 'hotspot';
    if (spot.noIndicator) div.classList.add('hotspot-no-indicator');
    div.style.top = spot.top;
    div.style.left = spot.left;
    if (spot.w) div.style.width  = spot.w;
    if (spot.h) div.style.height = spot.h;
    const modalIndex = (spot.linkedTo !== undefined) ? spot.linkedTo : i;
    div.addEventListener('click', () => openModal('item', modalIndex));
    layer.appendChild(div);
    divs.push(div);
  });
  // Bubble hotspots: hovering them shows the indicator on the linked main element
  HOTSPOTS.forEach((spot, i) => {
    if (spot.noIndicator && spot.linkedTo !== undefined) {
      const bubbleDiv = divs[i];
      const mainDiv   = divs[spot.linkedTo];
      bubbleDiv.addEventListener('mouseenter', () => mainDiv.classList.add('force-indicator'));
      bubbleDiv.addEventListener('mouseleave', () => mainDiv.classList.remove('force-indicator'));
    }
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

/* Safe hotspot — body and speech bubble both open the safe modal */
document.getElementById('hotspot-safe').addEventListener('click', () => openModal('safe'));
document.getElementById('hotspot-safe-bubble').addEventListener('click', () => openModal('safe'));
/* Safe bubble hover → show indicator on safe body */
(function () {
  const safeBody   = document.getElementById('hotspot-safe');
  const safeBubble = document.getElementById('hotspot-safe-bubble');
  safeBubble.addEventListener('mouseenter', () => safeBody.classList.add('force-indicator'));
  safeBubble.addEventListener('mouseleave', () => safeBody.classList.remove('force-indicator'));
}());

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
