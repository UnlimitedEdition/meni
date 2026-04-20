# Ti Amo Picerija — Meni

Zvaničan digitalni meni picerije **Ti Amo** iz Kačareva. Potpuno statički sajt napravljen bez framework-a, sa 4 profesionalno dizajnirane teme, potpuno responsive, GDPR usklađen i pristupačan.

**Live:** https://unlimitededition.github.io/meni/

---

## Sadržaj

- [Karakteristike](#karakteristike)
- [Teme](#teme)
- [Tehnički stack](#tehnički-stack)
- [Struktura projekta](#struktura-projekta)
- [Pokretanje lokalno](#pokretanje-lokalno)
- [Uređivanje menija](#uređivanje-menija)
- [Dodavanje nove teme](#dodavanje-nove-teme)
- [Deploy](#deploy)
- [Pristupačnost i performanse](#pristupačnost-i-performanse)
- [GDPR / kolačići](#gdpr--kolačići)
- [Kontakt](#kontakt)

---

## Karakteristike

- **4 profesionalne teme** — Klasik (italijanska tradicija), Moderno (editorijalni minimalizam), Noir (fine dining), Trattoria (pop italijanski). Izbor teme se pamti u `localStorage`.
- **Kompletan meni** — doručak, pasta, salate, predjela, posna jela, pizza, glavna jela (piletina / juneće / svinjetina), mix mesa, burgeri, slatki i slani dodatci.
- **Sastojci i alergeni** — klik na stavku otvara popup sa sastojcima i alergenima (gluten, mleko, jaja, orašaste plodove, ribu, mekušce).
- **Sticky kategorijska navigacija** — chips koji se automatski aktiviraju dok skrolujete kroz sekcije (bez oscilacija, rAF throttled).
- **Scroll-reveal animacije** (IntersectionObserver) sa `prefers-reduced-motion` podrškom.
- **Klasičan "dotted leader"** meni stil između naziva i cene (u temama gde je primeren).
- **SEO / Social** — Open Graph, Twitter Card, `description`, `theme-color`.
- **GDPR kolačić banner** sa pravom saglasnosti pre učitavanja Google Analytics-a.
- **Klikabilni `tel:` linkovi** za direktan poziv sa mobilnog.
- **Pristupačnost** — `aria-modal` / `aria-labelledby` na popup-u, Escape/overlay-klik zatvara, fokus upravljanje, semantički HTML.
- **Responsive** — prilagođeno od 320px pa naviše.

---

## Teme

Gornji chip bar omogućava trenutnu promenu teme. Izbor se čuva u `localStorage` pod ključem `meni_theme`.

| Tema | Identitet | Boje | Fontovi |
|---|---|---|---|
| **Klasik** | italijanska tradicija, topla i romantična | burgundy `#6e1020`, zlato `#c9a24c`, krem `#fbf5e7` | Playfair Display italic + Poppins |
| **Moderno** | editorijalni minimalizam | dark overlay sa sand akcentom `#b98a47` | Fraunces (bold italic) + Inter |
| **Noir** | dark fine dining | charcoal `#0f0d0a`, zlato `#d4af37` | Cormorant Garamond italic + Inter |
| **Trattoria** | pop italijanski | maslina `#4a6a2f`, paradajz `#d94a3e`, krem | DM Serif Display italic + Work Sans |

Svaka tema ima istu background sliku u hero delu, ali prilagođen color overlay, tipografiju, stil naslova, kartica, cena i navigacije.

---

## Tehnički stack

- **HTML** — semantički (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS** — čist CSS3 bez framework-a, CSS custom properties (`:root` + `[data-theme="..."]`)
- **JavaScript** — vanilla ES2020, bez build koraka
- **Google Fonts** — Playfair Display, Poppins, Fraunces, Inter, Cormorant Garamond, DM Serif Display, Work Sans
- **Deploy** — GitHub Pages (statički hosting)

Bez framework-a, bez build pipeline-a, bez transpilera. Jedna HTML stranica, jedan CSS fajl, jedan JS fajl.

---

## Struktura projekta

```
meni/
├── index.html              # Ceo meni + hero + kategorijska navigacija
├── styles.css              # Svi stilovi (baza + 4 teme, ~1500 linija)
├── script.js               # Popup, scroll-reveal, theme switcher, cookie consent, tel: CTA
├── logo.png                # Logo picerije (favicon i hero)
├── background.jpg          # Hero background slika
├── ti_amo_meni_qr.png      # QR kod za sajt
├── ti_amo_facebook_qr.png  # QR kod za Facebook
├── ti_amo_instagram_qr.png # QR kod za Instagram
├── README.md               # Dokumentacija
├── CHANGELOG.md            # Istorija izmena
└── .gitignore              # Git ignore lista
```

Bez `package.json`, `node_modules` ili `tailwind.config.js` — projekat je čist statički HTML/CSS/JS bez build koraka i bez runtime zavisnosti osim Google Fonts-a koji se učitava sa CDN-a.

---

## Pokretanje lokalno

Projekat je statički — dovoljan je bilo koji HTTP server u root folderu:

```bash
# Python 3
python3 -m http.server 8000

# Node (ako imate npx)
npx serve .

# PHP
php -S localhost:8000
```

Pa otvorite `http://localhost:8000` u browseru.

**Napomena:** otvaranje `index.html` direktno (`file://`) radi većinom, ali neke karakteristike (npr. `fetch` ako ga kasnije dodate) zahtevaju HTTP server.

---

## Uređivanje menija

Sve stavke menija su direktno u `index.html`. Svaka stavka ima ovu strukturu:

```html
<div class="menu-item" onclick="showPopup('Naziv', 'sastojci', 'Sadrži alergeni')">
  <span>Naziv<span class="info-icon">i</span></span>
  <span class="price">990 RSD</span>
</div>
```

Za stavke sa dve veličine (npr. pizza Mala/Velika):

```html
<div class="menu-item menu-item--split" onclick="showPopup('...', '...', '...')">
  <div class="flex justify-between flex-wrap">
    <span>Naziv<span class="info-icon">i</span></span>
    <div class="prices">
      <span>Mala: 890 RSD</span>
      <span>Velika: 1190 RSD</span>
    </div>
  </div>
</div>
```

Sekcije su omotane u `<section id="c-nesto" class="mb-6">` sa `id` koji odgovara `href`-u u `.catnav` linkovima.

### Alergeni — preporučene kategorije

- `gluten` — žitarice (hleb, pasta, brašno, panirane stvari)
- `mlečne proizvode` — sir, kajmak, pavlaka, buter
- `jaja` — omleti, pohovano, majonez, cezar dressing, burger sos
- `orašaste plodove` — pesto, nutela, eurokrem, rafaelo, pistachio
- `ribu` — tunjevina, inćuni u cezar dressingu
- `mekušce` — lignje, dagnje

---

## Dodavanje nove teme

1. U `index.html` dodati dugme u `.theme-switcher`:
   ```html
   <button type="button" class="theme-btn" data-theme="nova" aria-label="Nova tema">
     <span class="theme-swatch" style="background: ..."></span>
     <span class="theme-label">Nova</span>
   </button>
   ```

2. U `styles.css`, na kraju, dodati blok:
   ```css
   [data-theme="nova"] body { ... }
   [data-theme="nova"] .hero { ... }
   [data-theme="nova"] .section-title { ... }
   /* itd. za sve elemente koje želite da razlikujete */
   ```

3. Ukoliko tema zahteva nov font, dodati ga u `<link>` na Google Fonts u `<head>`.

Šta god da ne redefinišete u `[data-theme="nova"]`, preuzima se iz **Klasik** teme (osnovni stil).

---

## Deploy

Sajt je hostovan na GitHub Pages, source branch: `master`.

- Svaki push na `master` automatski trigeruje deploy (obično 1–2 minuta)
- URL: `https://unlimitededition.github.io/meni/`
- Pages Settings → Source: "Deploy from a branch" → `master` / `/` (root)

### Cache

CSS i JS linkovi imaju `?v=...` cache-bust query da browser učita svežu verziju posle deploy-a. Pri svakom većem update-u bump-ujte verziju u `index.html`:
```html
<link rel="stylesheet" href="styles.css?v=2026042012">
<script src="script.js?v=2026042005" defer></script>
```

---

## Pristupačnost i performanse

- Popup je `role="dialog"` sa `aria-modal="true"`, `aria-labelledby` i `aria-describedby`
- Escape taster i klik na overlay zatvaraju popup
- `prefers-reduced-motion: reduce` isključuje animacije za korisnike koji to traže
- `font-display: swap` za sve fontove
- Slike imaju `alt` atribute
- Semantičke HTML etikete za screen reader-e
- `tel:` linkovi za direktan poziv sa telefona
- Kontrastni odnos teksta i pozadine testiran u svim temama

---

## GDPR / kolačići

Google Analytics se **ne učitava** dok korisnik eksplicitno ne prihvati kolačiće preko bannera koji se prikazuje u donjem delu ekrana. Odgovor se pamti u `localStorage` (`cookie_consent`: `accepted` ili `rejected`).

Measurement ID se drži u `script.js` kao konstanta:
```js
const GA_MEASUREMENT_ID = 'G-SBTBNFZN7E';
```

Promenu pravite tamo (bez HTML izmene).

---

## Kontakt

**Ti Amo Caffe & Pizzeria**
Kačarevo, Srbija
Telefon: [065 27 63 500](tel:+381652763500)
Instagram: [@ti_amo_picerija.rs](https://www.instagram.com/ti_amo_picerija.rs)
Facebook: [TI AMO PICERIJA](https://www.facebook.com/p/TI-AMO-PICERIJArs-100090231156927/)

Since 2023.
