/* ============================================================
   figure.js — Mini figür: bölümler arası hareketli karakter
   main.js'in gönderdiği 'sectionchange' ve 'langchange'
   olaylarını dinler, figürü durum makinesiyle yönetir.
   ============================================================ */
(function () {
  'use strict';

  var figureWrap = document.getElementById('figureWrap');
  var figure     = document.getElementById('figure');
  var bubble     = document.getElementById('figureBubble');

  if (!figureWrap || !figure) { return; }

  var reducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bölüm → figür sınıfı + balon metinleri (TR/EN)
  var STATES = {
    hero: {
      cls: 'fig-hero',
      pos: 'pos-hero',
      tr: 'Selam! 👋',
      en: 'Hello! 👋'
    },
    about: {
      cls: 'fig-about',
      pos: 'pos-about',
      tr: 'Hmm, neler var burada? 🤔',
      en: 'Hmm, what do we have here? 🤔'
    },
    projects: {
      cls: 'fig-projects',
      pos: 'pos-projects',
      tr: 'Kod moduna geçtim! 💻',
      en: 'Code mode on! 💻'
    },
    contact: {
      cls: 'fig-contact',
      pos: 'pos-contact',
      tr: 'Bekliyorum, yaz bana! 💌',
      en: 'Waiting, write to me! 💌'
    }
  };

  var currentLang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'tr';
  var currentSection = 'hero';
  var walkTimer = null;

  function stateFor(section) {
    return STATES[section] || STATES.hero;
  }

  function setBubbleText(state) {
    bubble.textContent = state[currentLang] || state.tr;
  }

  function showBubble() {
    bubble.classList.add('show');
  }

  function hideBubble() {
    bubble.classList.remove('show');
  }

  function applyState(section) {
    var state = stateFor(section);

    // eski durum sınıflarını temizle
    figure.className = 'figure';
    figureWrap.className = 'figure-wrap';

    // yeni durum
    figure.classList.add(state.cls);
    figureWrap.classList.add(state.pos);
    setBubbleText(state);
    showBubble();
  }

  // Bölüm değişince: kısa yürüyüş → yeni duruma geç
  function transitionTo(section) {
    if (section === currentSection) { return; }
    currentSection = section;

    var state = stateFor(section);

    if (reducedMotion) {
      // animasyon isteği yoksa doğrudan geç
      applyState(section);
      return;
    }

    // 1) balonu gizle, yürüyüş animasyonunu başlat
    hideBubble();
    figure.classList.add('walking');

    if (walkTimer) { clearTimeout(walkTimer); }

    // 2) kısa yürüyüşten sonra yeni duruma geç
    walkTimer = setTimeout(function () {
      applyState(section);
    }, 700);
  }

  /* ---------- OLAY DİNLEYİCİLER ---------- */
  document.addEventListener('sectionchange', function (e) {
    transitionTo(e.detail.section);
  });

  document.addEventListener('langchange', function (e) {
    currentLang = e.detail.lang === 'en' ? 'en' : 'tr';
    setBubbleText(stateFor(currentSection));
  });

  /* ---------- BAŞLANGIÇ ---------- */
  applyState('hero');
})();
