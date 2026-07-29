'use strict';

/* ─── State ──────────────────────────────── */
const gameState = {
  screen: 'start',        // 'start' | 'game' | 'win'
  language: 'de',         // 'de' | 'en'
  openModal: null,        // null | 'item' | 'safe' | 'menu'
  safeDigits: [0,0,0,0],  // current digit values
  safeErrorTimer: null,   // active setTimeout reference or null
  activeItemIndex: null,  // 0–9; which clue modal is shown
  modalPage: 0            // current page index for paginated modals
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
    win:     'Glückwunsch!',
  winText: 'Gratulation! Du hast einen neuheitsschädigenden Stand der Technik identifiziert.\n\nDie vermeintlich neue Idee lässt sich vollständig durch bekannten Stand der Technik erklären. Keine der zentralen Eigenschaften ist tatsächlich neu.\nDieses Beispiel zeigt: KI kann komplexe und überzeugende Beschreibungen erzeugen. Doch echte Innovation entsteht erst durch einen eigenen technischen Lösungsansatz, nicht durch die Neuformulierung bereits bekannter Inhalte.',
    startTitleIntro: 'DEIN AUFTRAG',
    startTitleDisclosure: 'DIE ERFINDUNG',
  startIntro: 'In diesem interaktiven Point-and-Click-Spiel untersuchst du eine scheinbar neue technische Idee.\nDeine Aufgabe ist es, relevante Hinweise im Raum zu finden und herauszufinden, ob die dargestellte Lösung wirklich neu ist, oder ob sich alles bereits an anderer Stelle wiederfindet.',
    startDisclosure: 'Die Erfindung umfasst ein intelligentes, mobilitätsoptimiertes Arbeitsplatzsystem, das die direkte, kontextnahe und bedarfsgerechte Bearbeitung digitaler Inhalte in hybriden Arbeitsumgebungen ermöglicht.'
  },
  en: {
    start:   'Start',
    restart: 'Restart game',
    replay:  'Replay',
    close:   'Close',
    confirm: 'Confirm',
    error:   'The code is incorrect.',
    win:     'Congratulations!',
  winText: 'Congratulations! You have identified novelty-destroying prior art.\n\nThe seemingly novel idea can be entirely explained by existing prior art. None of the key features are actually new.\nThis example demonstrates that AI can produce complex and convincing descriptions. However, true innovation only arises from a genuine technical solution, not from rephrasing what already exists.',
    startTitleIntro: 'YOUR MISSION',
    startTitleDisclosure: 'THE INVENTION',
  startIntro: 'In this interactive point-and-click game, you investigate a seemingly novel technical idea.\nYour task is to find relevant clues in the room and determine whether the solution is truly new, or already exists elsewhere.',
    startDisclosure: 'The invention comprises an intelligent, mobility-optimized workstation system that enables the direct, context-specific, and demand-oriented processing of digital information in hybrid work environments.'
  }
};

/* ─── Hotspot configuration ─────────────── */
/* Positions are percentage-based relative to the game screen.
   Clue paths and titles are placeholders — update with final
   assets and real background coordinates in Phase 8. */
const HOTSPOTS = [
  // 1a. detective body
  { top: '44.2%', left: '10.4%', w: '9%', h: '42%',
    codeDigit: null,
    clue: 'assets/clues/game-instructor.png',
    pageImages: [
      'assets/clues/game-instructor.png',
      'assets/clues/invention-disclosure.png'
    ],
    pageTextBoxes: [
      null,
      { left: '46.0%', top: '15.7%', width: '45%', height: '69.4%' }
    ],
    title: { de: 'Game Master', en: 'Game Master' },
    pageTitles: [
      { de: 'Game Master', en: 'Game Master' },
      { de: 'ERFINDUNGSMELDUNG', en: 'INVENTION DISCLOSURE' }
    ],
    body:  { de: 'Vor dir liegt eine scheinbar neue technische Idee.\nIm Raum findest du verschiedene Hinweise, deine Aufgabe ist es, herauszufinden, ob diese Lösung wirklich neu ist oder sich bereits an anderer Stelle wiederfindet.',
             en: 'In front of you is a seemingly novel technical idea.\nAround the room, you will find various clues, your task is to determine whether this solution is truly new or already exists elsewhere.' },
    pages: [
      { de: 'Vor dir liegt eine scheinbar neue technische Idee.\nIm Raum findest du verschiedene Hinweise, deine Aufgabe ist es, herauszufinden, ob diese Lösung wirklich neu ist oder sich bereits an anderer Stelle wiederfindet.',
        en: 'In front of you is a seemingly novel technical idea.\nAround the room, you will find various clues, your task is to determine whether this solution is truly new or already exists elsewhere.' },
      { de: 'Die Erfindung umfasst ein intelligentes, mobilitätsoptimiertes Arbeitsplatzsystem, das die direkte, kontextnahe und bedarfsgerechte Bearbeitung digitaler Inhalte in hybriden Arbeitsumgebungen ermöglicht.\n\nM1  Ein rollendes Mobilitätsfundament mit arretierbaren Präzisionsrollen verlagert den kompletten Arbeitsplatz in Sekunden an jeden Einsatzort.\n\nM2  Eine linear ausfahrbare Komfortsäule transformiert die Arbeitsfläche dynamisch auf eine angenehme Nutzungsposition für sitzende oder stehende Personen.\n\nM3  Ein zugangsgesteuertes Bedienmodul autorisiert die Nutzung der Arbeitsstation und gibt ausgewählte Funktionen über eine direkt sichtbare Freigabeeinheit frei.\n\nM4  Ein integriertes Energiemodul im Unterbau sowie aufnehmbare Stauraumzonen für Rechner und Arbeitsmittel schaffen einen autarken, aufgeräumten Einsatzpunkt.',
        en: 'The invention comprises an intelligent, mobility-optimized workstation system that enables the direct, context-specific, and demand-oriented processing of digital information in hybrid work environments.\n\nM1  A rolling mobility base with lockable precision casters relocates the complete workstation to any place of use within seconds.\n\nM2  A linearly extendable comfort column dynamically transforms the work surface into an ergonomic usage position for seated or standing users.\n\nM3  An access-controlled operating module authorizes the use of the workstation and enables selected functions via a directly visible release unit.\n\nM4  An integrated energy module in the lower base structure, together with storage zones for computers and work equipment, creates an autonomous and well-organized point of operation.' }
    ] },
  // 1b. detective speech bubble (same modal as 1a)
  { top: '26.4%', left: '16.3%', w: '12%', h: '18%', noIndicator: true, linkedTo: 0,
    codeDigit: null,
    clue: 'assets/clues/game-instructor.png',
    pageImages: [
      'assets/clues/game-instructor.png',
      'assets/clues/invention-disclosure.png'
    ],
    pageTextBoxes: [
      null,
      { left: '46.0%', top: '15.7%', width: '45%', height: '69.4%' }
    ],
    title: { de: 'Game Master', en: 'Game Master' },
    pageTitles: [
      { de: 'Game Master', en: 'Game Master' },
      { de: 'ERFINDUNGSMELDUNG', en: 'INVENTION DISCLOSURE' }
    ],
    body:  { de: 'Vor dir liegt eine scheinbar neue technische Idee.\nIm Raum findest du verschiedene Hinweise, deine Aufgabe ist es, herauszufinden, ob diese Lösung wirklich neu ist oder sich bereits an anderer Stelle wiederfindet.',
             en: 'In front of you is a seemingly novel technical idea.\nAround the room, you will find various clues, your task is to determine whether this solution is truly new or already exists elsewhere.' },
    pages: [
      { de: 'Vor dir liegt eine scheinbar neue technische Idee.\nIm Raum findest du verschiedene Hinweise, deine Aufgabe ist es, herauszufinden, ob diese Lösung wirklich neu ist oder sich bereits an anderer Stelle wiederfindet.',
        en: 'In front of you is a seemingly novel technical idea.\nAround the room, you will find various clues, your task is to determine whether this solution is truly new or already exists elsewhere.' },
      { de: 'Die Erfindung umfasst ein intelligentes, mobilitätsoptimiertes Arbeitsplatzsystem, das die direkte, kontextnahe und bedarfsgerechte Bearbeitung digitaler Inhalte in hybriden Arbeitsumgebungen ermöglicht.\n\nM1  Ein rollendes Mobilitätsfundament mit arretierbaren Präzisionsrollen verlagert den kompletten Arbeitsplatz in Sekunden an jeden Einsatzort.\n\nM2  Eine linear ausfahrbare Komfortsäule transformiert die Arbeitsfläche dynamisch auf eine angenehme Nutzungsposition für sitzende oder stehende Personen.\n\nM3  Ein zugangsgesteuertes Bedienmodul autorisiert die Nutzung der Arbeitsstation und gibt ausgewählte Funktionen über eine direkt sichtbare Freigabeeinheit frei.\n\nM4  Ein integriertes Energiemodul im Unterbau sowie aufnehmbare Stauraumzonen für Rechner und Arbeitsmittel schaffen einen autarken, aufgeräumten Einsatzpunkt.',
        en: 'The invention comprises an intelligent, mobility-optimized workstation system that enables the direct, context-specific, and demand-oriented processing of digital information in hybrid work environments.\n\nM1  A rolling mobility base with lockable precision casters relocates the complete workstation to any place of use within seconds.\n\nM2  A linearly extendable comfort column dynamically transforms the work surface into an ergonomic usage position for seated or standing users.\n\nM3  An access-controlled operating module authorizes the use of the workstation and enables selected functions via a directly visible release unit.\n\nM4  An integrated energy module in the lower base structure, together with storage zones for computers and work equipment, creates an autonomous and well-organized point of operation.' }
    ] },
  // 2. Q monitor (easter egg)
  { top: '58.8%', left: '27.8%', w: '10%', h: '18%',
    codeDigit: null,
    clue: 'assets/clues/easter-egg.png',
    title: { de: 'Qthena – Digitaler Erfindungs Assistent', en: 'Qthena – Digital Invention Assistant' },
    body:  { de: 'Qthena ist ein KI-gestützter Assistent, der dabei hilft, Ideen zu verstehen, zu strukturieren und weiterzuentwickeln.\nDas Tool unterstützt dabei, Konzepte klar zu formulieren, relevante Vorveröffentlichungen zu identifizieren und erste Entwürfe zu erstellen.\nDu kannst Qthena direkt am Stand daneben selbst ausprobieren.',
             en: 'Qthena is an AI-powered assistant that helps to understand, structure, and refine ideas.\nIt supports users in clearly formulating concepts, identifying relevant prior art, and creating initial drafts.\nYou can try Qthena yourself at the booth next to this station.' } },
  // 3. security keypad
  { top: '32.5%', left: '33.5%', w: '5%', h: '9%',
    codeDigit: 2,
    clue: 'assets/clues/r-clue-keypad.png',
    title: { de: 'Zugangskontrollmodul', en: 'Access Control Module' },
    body:  { de: 'Dieses kompakte Bedienfeld ermöglicht den gesteuerten Zugriff auf ausgewählte Funktionen der Arbeitsstation.\nErst nach Freigabe werden bestimmte Komponenten aktiviert und stehen zur Nutzung bereit.',
             en: 'This compact interface enables controlled access to selected functions of the workstation.\nOnly after authorization are specific components activated and made available for use.' } },
  // 4. energy module
  { top: '49.6%', left: '41.6%', w: '7%', h: '13%',
    codeDigit: 6,
    clue: 'assets/clues/r-clue-energy.png',
    title: { de: 'Integriertes Energiemodul', en: 'Integrated Power Module' },
    body:  { de: 'Dieses Energiemodul ist platzsparend im Unterbau integriert und versorgt die angeschlossenen Komponenten zuverlässig mit Strom.\nDurch die kompakte Bauweise entsteht ein eigenständiger Arbeitsplatz, der ohne direkte externe Versorgung betrieben werden kann.',
             en: 'This power module is compactly integrated into the base and reliably supplies connected components with energy.\nIts self-contained design enables operation as an independent workstation without continuous external power.' } },
  // 5. height-adjustable chair
  { top: '79.4%', left: '49.5%', w: '8%', h: '18%',
    codeDigit: 1,
    textBox: { left: '52.5%', top: '11%', width: '40%', height: '79%' },
    clue: 'assets/clues/r-clue-chair.png',
    title: { de: 'Höhenverstellbares Sitzmodul', en: 'Height-Adjustable Seating Module' },
    body:  { de: 'Dieses Sitzmodul lässt sich flexibel an unterschiedliche Arbeitshöhen anpassen und unterstützt sowohl sitzende als auch erhöhte Arbeitspositionen.\nDurch die einfache Verstellmechanik kann die Position schnell an individuelle Anforderungen und wechselnde Einsatzsituationen angepasst werden.',
             en: 'This seating module can be flexibly adjusted to different working heights, supporting both seated and elevated working positions.\nIts simple adjustment mechanism allows quick adaptation to individual needs and changing work situations.' } },
  // 6. microscope
  { top: '41.9%', left: '61.3%', w: '7%', h: '20%',
    codeDigit: 0,
    textBox: { left: '52.5%', top: '11%', width: '40%', height: '79%' },
    clue: 'assets/clues/i-clue-microscope.png',
    title: { de: 'Labor-Mikroskop', en: 'Laboratory Microscope' },
    body:  { de: 'Dieses optische Präzisionsgerät dient zur detaillierten Untersuchung kleinster Strukturen und Proben.\nDurch die fein einstellbare Vergrößerung lassen sich auch komplexe Material- oder Oberflächenmerkmale sichtbar machen.',
             en: 'This optical precision device is used for the detailed examination of very small structures and samples.\nIts finely adjustable magnification allows even complex material or surface features to become visible.' } },
  // 7. tool wagon / mobile base
  { top: '81.4%', left: '69.6%', w: '11%', h: '16%',
    codeDigit: 9,
    clue: 'assets/clues/r-clue-wheel.png',
    title: { de: 'Mobiler Unterbau', en: 'Mobile Base Unit' },
    body:  { de: 'Dieser kompakte Unterbau ist mit leichtgängigen Rollen ausgestattet und lässt sich mühelos an unterschiedliche Einsatzorte bewegen.\nBei Bedarf kann die Position stabil fixiert werden, sodass auch bei wechselnden Arbeitsumgebungen ein sicherer Stand gewährleistet ist.',
             en: 'This compact base is equipped with smooth-running wheels, allowing it to be easily moved between different work locations.\nWhen needed, its position can be securely locked to ensure stability even in changing environments.' } },
  // 8. 3D printer
  { top: '40.6%', left: '75.5%', w: '8%', h: '19%',
    codeDigit: 4,
    textBox: { left: '52.5%', top: '11%', width: '40%', height: '79%' },
    clue: 'assets/clues/i-clue-3dprinter.png',
    title: { de: '3D-Drucksystem', en: '3D Printing System' },
    body:  { de: 'Dieses Gerät ermöglicht die schichtweise Fertigung von Prototypen und Bauteilen direkt aus digitalen Modellen.\nEs wird häufig eingesetzt, um Designideen schnell zu visualisieren und funktionale Muster zu erzeugen.',
             en: 'This device enables the layer-by-layer fabrication of prototypes and components directly from digital models.\nIt is commonly used to quickly visualize design concepts and produce functional samples.' } },
  // 9. oscilloscope / measuring device
  { top: '22.4%', left: '77.4%', w: '9%', h: '13%',
    codeDigit: 5,
    clue: 'assets/clues/i-clue-measure.png',
    title: { de: 'Digitales Oszilloskop', en: 'Digital Oscilloscope' },
    body:  { de: 'Dieses Messgerät dient zur Analyse elektrischer Signale und stellt Spannungsverläufe in Echtzeit grafisch dar.\nEs ermöglicht eine präzise Untersuchung von Frequenzen, Signalformen und zeitlichen Abläufen in elektronischen Systemen.',
             en: 'This measurement device is used to analyze electrical signals and visualizes voltage patterns in real time.\nIt enables precise examination of frequencies, signal shapes, and timing behavior within electronic systems.' } },
  // 10. whiteboard / platform concept
  { top: '26.7%', left: '91.1%', w: '12%', h: '20%',
    codeDigit: 3,
    textBox: { left: '54%', top: '12%', width: '39%', height: '77%' },
    clue: 'assets/clues/i-clue-whiteboard.png',
    title: { de: 'Plattformkonzept', en: 'Platform Concept' },
    body:  { de: 'Die dargestellten Skizzen zeigen verschiedene Entwürfe einer fahrbaren Plattform mit gelenkter Radanordnung und möglichen Antriebselementen.\nUntersucht werden dabei vor allem Bewegungsrichtungen und Steuerungsansätze für eine gezielte Navigation im Arbeitsumfeld.',
             en: 'The sketches illustrate different designs of a mobile platform with a controlled wheel arrangement and potential drive components.\nThe focus lies on movement directions and control approaches for targeted navigation within a workspace.' } },
  // 11. patent archive monitor (background screen with pink neon edge)
  { top: '34.03%', left: '44.88%', w: '8.48%', h: '15.65%',
    codeDigit: null,
    clue: 'assets/clues/research.png',
    title: { de: 'Recherche', en: 'Research' },
    body:  { de: 'Rechercheergebnisse sind ein zentraler Maßstab für die Bewertung einer möglichen Patentanmeldung.\nSie zeigen, ob eine technische Idee tatsächlich neu ist oder ob wesentliche Aspekte bereits zum Stand der Technik gehören. Eine frühzeitige Recherche hilft dabei, Entwicklungspotenziale realistisch einzuordnen und unnötigen Aufwand für nicht schutzfähige Lösungen zu vermeiden.',
             en: 'Search results are a key benchmark for evaluating a potential patent application.\nThey show whether a technical idea is truly novel or whether essential aspects already form part of the prior art. Conducting an early search helps to assess development potential realistically and avoid unnecessary effort for solutions that are not protectable.' },
    textBox: { left: '46%', top: '17.3%', width: '44.8%', height: '66.8%' } },
  // 12. start screen — invention disclosure hotspot (not rendered in #hotspot-layer)
  { startScreen: true,
    codeDigit: null,
    clue: 'assets/clues/invention-disclosure.png',
    title: { de: 'ERFINDUNGSMELDUNG', en: 'INVENTION DISCLOSURE' },
    body:  { de: 'Die Erfindung umfasst ein intelligentes, mobilitätsoptimiertes Arbeitsplatzsystem, das die direkte, kontextnahe und bedarfsgerechte Bearbeitung digitaler Inhalte in hybriden Arbeitsumgebungen ermöglicht.\n\nM1  Ein rollendes Mobilitätsfundament mit arretierbaren Präzisionsrollen verlagert den kompletten Arbeitsplatz in Sekunden an jeden Einsatzort.\n\nM2  Eine linear ausfahrbare Komfortsäule transformiert die Arbeitsfläche dynamisch auf eine angenehme Nutzungsposition für sitzende oder stehende Personen.\n\nM3  Ein zugangsgesteuertes Bedienmodul autorisiert die Nutzung der Arbeitsstation und gibt ausgewählte Funktionen über eine direkt sichtbare Freigabeeinheit frei.\n\nM4  Ein integriertes Energiemodul im Unterbau sowie aufnehmbare Stauraumzonen für Rechner und Arbeitsmittel schaffen einen autarken, aufgeräumten Einsatzpunkt.',
             en: 'The invention comprises an intelligent, mobility-optimized workstation system that enables the direct, context-specific, and demand-oriented processing of digital information in hybrid work environments.\n\nM1  A rolling mobility base with lockable precision casters relocates the complete workstation to any place of use within seconds.\n\nM2  A linearly extendable comfort column dynamically transforms the work surface into an ergonomic usage position for seated or standing users.\n\nM3  An access-controlled operating module authorizes the use of the workstation and enables selected functions via a directly visible release unit.\n\nM4  An integrated energy module in the lower base structure, together with storage zones for computers and work equipment, creates an autonomous and well-organized point of operation.' },
    textBox: { left: '46.0%', top: '13.4%', width: '45%', height: '69.4%' },
    fontSize: 'clamp(8px, 1.49vw, 12px)' }, // ← adjust font size for start screen invention disclosure popup here — patent document hotspot (not rendered in #hotspot-layer)
  { winScreen: true,
    hotspotId: 'hotspot-win-patent',
    codeDigit: null,
    clue: 'assets/clues/patent1.png',
    title: { de: 'Patentschrift', en: 'Patent Document' },
    body: { de: '', en: '' },
    hideText: true,
    dualImages: ['assets/clues/patent1.png', 'assets/clues/patent2.png'] },
  // 14. win screen — result text hotspot (not rendered in #hotspot-layer)
  { winScreen: true,
    hotspotId: 'hotspot-win-text',
    codeDigit: null,
    clue: '',
    title: { de: 'Ergebnis', en: 'Result' },
    body: { de: STRINGS.de.winText, en: STRINGS.en.winText },
    winTextModal: true },
];

/* ─── Localization ───────────────────────── */
function renderText() {
  const strings = STRINGS[gameState.language];
  document.querySelectorAll('[data-text]').forEach(el => {
    el.textContent = strings[el.dataset.text];
  });
  // Re-populate open item modal text when language is toggled
  if (gameState.openModal === 'item' && gameState.activeItemIndex !== null) {
    const spot = HOTSPOTS[gameState.activeItemIndex];
    const titleText = spot.pageTitles ? spot.pageTitles[gameState.modalPage][gameState.language] : spot.title[gameState.language];
    document.getElementById('modal-item-title').textContent = titleText;
    if (spot.pages) {
      document.getElementById('modal-item-body').textContent = spot.pages[gameState.modalPage][gameState.language];
    } else {
      document.getElementById('modal-item-body').textContent = spot.body[gameState.language];
    }
  }
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
    img.src = spot.pageImages ? spot.pageImages[0] : spot.clue;
    img.alt = spot.title[gameState.language];
    const openTitle = spot.pageTitles ? spot.pageTitles[0][gameState.language] : spot.title[gameState.language];
    document.getElementById('modal-item-title').textContent = openTitle;

    // Reset page and populate body text
    gameState.modalPage = 0;
    const bodyText = spot.pages ? spot.pages[0][gameState.language] : spot.body[gameState.language];
    document.getElementById('modal-item-body').textContent = bodyText;

    // Show/hide pagination nav
    const navEl = document.getElementById('modal-item-nav');
    const textEl2 = document.getElementById('modal-item-text');
    if (spot.pages && spot.pages.length > 1) {
      navEl.classList.remove('hidden');
      textEl2.classList.add('paginated');
      textEl2.classList.add('page1');
      updateNavArrows(spot);
    } else {
      navEl.classList.add('hidden');
      textEl2.classList.remove('paginated', 'page1');
    }

    // Apply per-hotspot text box position if specified, otherwise clear overrides
    const textEl = document.getElementById('modal-item-text');
    const activeBox = spot.pageTextBoxes ? spot.pageTextBoxes[0] : spot.textBox;
    if (activeBox) {
      textEl.style.left   = activeBox.left;
      textEl.style.top    = activeBox.top;
      textEl.style.width  = activeBox.width;
      textEl.style.height = activeBox.height;
    } else {
      textEl.style.left = textEl.style.top = textEl.style.width = textEl.style.height = '';
    }

    // Apply per-hotspot font size override if specified
    const bodyEl = document.getElementById('modal-item-body');
    bodyEl.style.fontSize = spot.fontSize || '';

    // Show code digit if defined
    const digitEl = document.getElementById('modal-item-digit');
    if (spot.codeDigit !== null && spot.codeDigit !== undefined) {
      digitEl.textContent = spot.codeDigit;
      digitEl.classList.remove('hidden');
    } else {
      digitEl.textContent = '';
      digitEl.classList.add('hidden');
    }

    // Dual-page mode: hide single image and text panel, show two-image container
    if (spot.hideText) {
      document.getElementById('modal-item-image').style.display = 'none';
      document.getElementById('modal-item-text').style.display = 'none';
      document.getElementById('modal-item-dual').classList.remove('hidden');
      document.getElementById('modal-item').classList.add('dual-page');
    }

    // Win result text mode: portrait popup, no image, text fills panel
    if (spot.winTextModal) {
      document.getElementById('modal-item-image').style.display = 'none';
      document.getElementById('modal-item').classList.add('win-text-modal');
    }

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
  // Reset dual-page mode
  document.getElementById('modal-item').classList.remove('dual-page');
  document.getElementById('modal-item').classList.remove('win-text-modal');
  document.getElementById('modal-item-dual').classList.add('hidden');
  document.getElementById('modal-item-image').style.display = '';
  document.getElementById('modal-item-text').style.display = '';
  // Reset per-hotspot text box inline overrides
  const textEl = document.getElementById('modal-item-text');
  textEl.style.left = textEl.style.top = textEl.style.width = textEl.style.height = '';
  // Reset font size override
  document.getElementById('modal-item-body').style.fontSize = '';
  // Reset digit
  const digitEl = document.getElementById('modal-item-digit');
  digitEl.textContent = '';
  digitEl.classList.add('hidden');
  // Reset pagination
  gameState.modalPage = 0;
  document.getElementById('modal-item-nav').classList.add('hidden');
  document.getElementById('modal-item-text').classList.remove('paginated', 'page1');
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
    if (spot.startScreen || spot.winScreen) return;
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

/* ─── Start screen hotspot wiring ──────────── */
/* Wires each HOTSPOT with startScreen: true to its pre-existing DOM element. */
function renderStartHotspots() {
  HOTSPOTS.forEach((spot, i) => {
    if (!spot.startScreen) return;
    const el = document.getElementById('hotspot-start-disclosure');
    if (!el) return;
    el.addEventListener('click', () => openModal('item', i));
  });
}

/* ─── Win screen hotspot wiring ───────────── */
/* Wires each HOTSPOT with winScreen: true to its DOM element via spot.hotspotId. */
function renderWinHotspots() {
  HOTSPOTS.forEach((spot, i) => {
    if (!spot.winScreen) return;
    const el = document.getElementById(spot.hotspotId);
    if (!el) return;
    el.addEventListener('click', () => openModal('item', i));
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

/* ─── Nav arrow helper ──────────────────── */
function updateNavArrows(spot) {
  document.getElementById('modal-prev').disabled = gameState.modalPage === 0;
  document.getElementById('modal-next').disabled = gameState.modalPage === spot.pages.length - 1;
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

/* Detective modal — pagination prev/next */
document.getElementById('modal-prev').addEventListener('click', () => {
  if (gameState.activeItemIndex === null) return;
  const spot = HOTSPOTS[gameState.activeItemIndex];
  if (!spot.pages || gameState.modalPage === 0) return;
  gameState.modalPage--;
  document.getElementById('modal-item-body').textContent = spot.pages[gameState.modalPage][gameState.language];
  if (spot.pageTitles) {
    document.getElementById('modal-item-title').textContent = spot.pageTitles[gameState.modalPage][gameState.language];
  }
  if (spot.pageImages) {
    document.getElementById('modal-item-image').src = spot.pageImages[gameState.modalPage];
  }
  if (spot.pageTextBoxes) {
    const box = spot.pageTextBoxes[gameState.modalPage];
    const textEl = document.getElementById('modal-item-text');
    if (box) {
      textEl.style.left = box.left; textEl.style.top = box.top;
      textEl.style.width = box.width; textEl.style.height = box.height;
    } else {
      textEl.style.left = textEl.style.top = textEl.style.width = textEl.style.height = '';
    }
  }
  document.getElementById('modal-item-text').classList.toggle('page1', gameState.modalPage === 0);
  updateNavArrows(spot);
});

document.getElementById('modal-next').addEventListener('click', () => {
  if (gameState.activeItemIndex === null) return;
  const spot = HOTSPOTS[gameState.activeItemIndex];
  if (!spot.pages || gameState.modalPage === spot.pages.length - 1) return;
  gameState.modalPage++;
  document.getElementById('modal-item-body').textContent = spot.pages[gameState.modalPage][gameState.language];
  if (spot.pageTitles) {
    document.getElementById('modal-item-title').textContent = spot.pageTitles[gameState.modalPage][gameState.language];
  }
  if (spot.pageImages) {
    document.getElementById('modal-item-image').src = spot.pageImages[gameState.modalPage];
  }
  if (spot.pageTextBoxes) {
    const box = spot.pageTextBoxes[gameState.modalPage];
    const textEl = document.getElementById('modal-item-text');
    if (box) {
      textEl.style.left = box.left; textEl.style.top = box.top;
      textEl.style.width = box.width; textEl.style.height = box.height;
    } else {
      textEl.style.left = textEl.style.top = textEl.style.width = textEl.style.height = '';
    }
  }
  document.getElementById('modal-item-text').classList.toggle('page1', gameState.modalPage === 0);
  updateNavArrows(spot);
});

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

/* Escape key — closes any open modal */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && gameState.openModal !== null) {
    closeModal();
  }
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
renderStartHotspots();
renderWinHotspots();
renderText();
