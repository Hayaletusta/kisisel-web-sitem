# 🌈 kisisel-web-sitem — Kişisel Portfolyo

Modern, mobil uyumlu ve renkli kişisel portfolyo web sitesi.
Kurulum gerektirmez — saf HTML + CSS + JavaScript.

## ✨ Özellikler

- **3 tema:** Açık ☀️ / Koyu 🌙 / Mor 💜 (sağ üstteki 🎨 düğmesiyle geçiş, tercih hatırlanır)
- **TR / EN dil değiştirici:** Sağ üstteki TR/EN düğmesi tüm metinleri değiştirir
- **Mini figür:** Sağ alttaki karakter, sayfada gezindikçe bölüm bölüm hareket eder:
  - Ana sayfa: el sallar 👋
  - Hakkımda: düşünür 🤔
  - Projelerim: kod yazar 💻
  - İletişim: zıplar 💌
- **Mobil uyumlu:** Hamburger menü, tek kolonlu düzen, dokunmatik dostu
- **Erişilebilirlik:** `prefers-reduced-motion` ve `prefers-color-scheme` desteği, odak halkaları

## 🚀 Siteyi Açma

`index.html` dosyasına çift tıklayın — hepsi bu!

> Not: Site internet olmadığında da çalışır; sadece Poppins yazı tipi yüklenemezse
> sistem yazı tipine düşer.

## 🌍 Yayınlama

**GitHub Pages:**
1. github.com'da yeni bir repo oluştur (ör. `kisisel-web-sitem`)
2. Bu klasördeki tüm dosyaları yükle
3. Settings → Pages → Source: `main` dalı → Save
4. Birkaç dakika içinde `https://kullaniciadin.github.io/kisisel-web-sitem/` yayında

**Netlify (drag & drop):**
1. app.netlify.com/drop adresine git
2. Klasörü sayfaya sürükle — anında yayında

## ✏️ İçeriği Kendine Göre Değiştirme

| Ne değiştirmek istersin? | Nerede? |
|---|---|
| İsim ve unvan | `index.html` → `<h1 class="hero-title">` ve `hero-sub` satırları |
| Hakkımda metni | `index.html` → `#hakkimda` bölümündeki `<p>` etiketleri |
| Yetenek etiketleri | `index.html` → `.skill-chips` içindeki `<span>` etiketleri |
| Projeler | `index.html` → `.project-card` blokları (kopyala/yapıştır ile çoğaltabilirsin) |
| E-posta adresi | `index.html` → `mailto:` geçen yerler **ve** `js/main.js` → formun `mailto` satırı |
| Sosyal medya linkleri | `index.html` → `.contact-links` içindeki `href` değerleri (şimdilik Instagram @aks.ak_ var) |

### İki dil nasıl çalışır?

Her metin iki attribute taşıyor:
```html
<p data-tr="Merhaba" data-en="Hello">Merhaba</p>
```
Yeni metin eklerken her iki dildeki versiyonu da yazmayı unutma.

### Figürü kendi görselinle değiştirme

Sağ alttaki karakter `index.html` dosyasının sonundaki `<div class="figure">`
içindeki SVG'dir. Kendi bir görselin (PNG/SVG) varsa:

1. Görseli `img/` gibi bir klasöre koy
2. `<div class="figure" id="figure">` içindeki SVG'yi şöyle değiştir:
   ```html
   <img src="img/benim-figurum.png" alt="Mini figürüm">
   ```
3. Animasyonlar SVG parçalarına (`fig-arm`, `fig-head` vb.) bağlı olduğu için
   görselle birlikte bölüm animasyonları sadeleşir; figür yine konum değiştirir.

## 📁 Dosya Yapısı

```
kisisel-web-sitem/
├── index.html      # Tüm içerik (bölümler, iki dilli metinler, figür SVG'si)
├── css/
│   └── style.css   # 3 tema, responsive düzen, figür animasyonları
├── js/
│   ├── main.js     # Tema/dil geçişi, mobil menü, scroll animasyonları
│   └── figure.js   # Figürün bölüm takibi ve animasyon durumları
└── README.md       # Bu dosya
```

---
💜 Sevgiyle yapıldı
