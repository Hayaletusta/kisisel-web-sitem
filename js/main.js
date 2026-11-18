/* ============================================================
   main.js — Tema, dil, mobil menü, scroll animasyonları
   ============================================================ */
(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';
  var LANG_KEY  = 'portfolio-lang';
  var THEMES    = ['light', 'dark', 'purple'];
  var THEME_ICONS = { light: '☀️', dark: '🌙', purple: '💜' };

  var body      = document.body;
  var nav       = document.getElementById('nav');
  var themeBtn  = document.getElementById('themeBtn');
  var themeIcon = document.getElementById('themeIcon');
  var langBtn   = document.getElementById('langBtn');
  var langLabel = document.getElementById('langLabel');
  var menuBtn   = document.getElementById('menuBtn');
  var navLinks  = document.getElementById('navLinks');
  var form      = document.getElementById('contactForm');

  /* ---------- TEMA ---------- */
  function setTheme(theme, save) {
    body.setAttribute('data-theme', theme);
    themeIcon.textContent = THEME_ICONS[theme] || '🎨';
    if (save) { try { localStorage.setItem(THEME_KEY, theme); } catch (e) {} }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved && THEMES.indexOf(saved) !== -1) {
      setTheme(saved, false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark', false);
    } else {
      setTheme('light', false);
    }
  }

  themeBtn.addEventListener('click', function () {
    var current = body.getAttribute('data-theme') || 'light';
    var next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    setTheme(next, true);
  });

  /* ---------- DİL (TR/EN) ---------- */
  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    langLabel.textContent = lang === 'tr' ? 'EN' : 'TR';

    // data-tr / data-en taşıyan tüm elemanlar
    document.querySelectorAll('[data-tr]').forEach(function (el) {
      var text = el.getAttribute(lang === 'tr' ? 'data-tr' : 'data-en');
      if (text !== null) { el.textContent = text; }
    });

    // placeholder'lar (data-tr-ph / data-en-ph)
    document.querySelectorAll('[data-tr-ph]').forEach(function (el) {
      var ph = el.getAttribute(lang === 'tr' ? 'data-tr-ph' : 'data-en-ph');
      if (ph !== null) { el.setAttribute('placeholder', ph); }
    });

    // sayfa başlığı
    document.title = lang === 'tr' ? 'Uygar Aksak — Portfolyo' : 'Uygar Aksak — Portfolio';

    // figür balonu dahil herkese bildir
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  langBtn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('lang') === 'tr' ? 'tr' : 'en';
    applyLanguage(current === 'tr' ? 'en' : 'tr');
  });

  /* ---------- MOBİL MENÜ ---------- */
  function closeMenu() {
    navLinks.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---------- SCROLL: nav gölgesi + reveal + aktif bölüm ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[data-section]'));
  var navAnchors = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
  var currentSection = null;

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('data-section');
        if (id !== currentSection) {
          currentSection = id;

          // nav'da aktif bağlantıyı güncelle
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });

          // figüre bildir (figure.js dinliyor)
          document.dispatchEvent(new CustomEvent('sectionchange', { detail: { section: id } }));
        }
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---------- İLETİŞİM FORMU (mailto) ---------- */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('fName').value.trim();
      var mail = document.getElementById('fMail').value.trim();
      var msg  = document.getElementById('fMsg').value.trim();
      var subject = encodeURIComponent('Portfolyo iletişim — ' + name);
      var bodyText = encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
      window.location.href = 'mailto:aksakuygar.65@gmail.com?subject=' + subject + '&body=' + bodyText;
    });
  }

  /* ---------- BAŞLAT ---------- */
  initTheme();

  var savedLang = null;
  try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) {}
  applyLanguage(savedLang === 'en' ? 'en' : 'tr');

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
