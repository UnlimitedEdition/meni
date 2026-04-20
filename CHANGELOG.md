# Changelog

Sve značajne izmene projekta beleže se u ovom fajlu. Format prati [Keep a Changelog](https://keepachangelog.com/), verzije nisu formalno označene — dokumentuje se po datumu merge-a na `master`.

---

## 2026-04-20

### Dodato
- **4 teme** sa switcher-om na vrhu stranice: Klasik, Moderno, Noir, Trattoria. Izbor se pamti u `localStorage`.
- Hero banner na svim temama sa istom background slikom ali različitim overlay-ima po identitetu teme.
- Sticky horizontalna kategorijska navigacija (chips) sa automatskim označavanjem aktivne sekcije (IntersectionObserver + rAF throttled scroll).
- Klasičan "dotted leader" stil menija između naziva i cene.
- Popup sa sastojcima i alergenima, `role="dialog"`, `aria-modal`, Escape/overlay-klik za zatvaranje.
- Scroll-reveal animacije za sekcije.
- `tel:` linkovi za direktan poziv u hero CTA dugmetu i footer-u.
- Google Fonts: Playfair Display, Poppins, Fraunces, Inter, Cormorant Garamond, DM Serif Display, Work Sans (sa `font-display: swap`).

### Izmenjeno
- **Kompletan redizajn** u duhu italijanske picerije.
- Semantički HTML — `<section>` sa id-jevima, `<main>`, `<header>`, `<footer>`, `<nav>`.
- Uklonjen Tailwind CDN — stilovi drže semantičke klase (`.section-title`, `.section-body`, `.menu-item`, `.price`, `.subcat`) bez ijednog `!important`.
- GDPR: Google Analytics se više ne učitava bezuslovno u `<head>`; čeka eksplicitnu saglasnost preko kolačić bannera.
- Meta tagovi: dodati `description`, `robots`, `theme-color`, Open Graph, Twitter Card.
- Cache-bust query za CSS i JS (`?v=...`).

### Uklonjeno
- Tailwind CDN (`cdn.tailwindcss.com`) — zamenjen semantičkim CSS-om
- Neupotrebljivane fajlove: `input.css`, `tailwind.config.js`, `package.json`, `package-lock.json`, `node_modules/` (čist statički projekat bez build koraka)

### Ispravljeno
- **Skrol oscilacija** — prethodna `scrollIntoView` logika na chip-u je pomerala glavni viewport u nekim browserima; sada samo horizontalni scroll nav-a.
- **Tipografske greške** u nazivima jela: `Margaritta → Margherita`, `Proscciutto → Prosciutto`, `Mashroom ology → Mushroom-ology`, `crvenluk → crveni luk`.
- **Duplirani "Ti Amo burger" (300g)** preimenovan u "Triple Ti Amo burger".
- **Gramatika**: `dvoje osobe → dve osobe`.
- **Sastojci i alergeni** (validacija po stavci):
  - `Omlet po izboru`: duplikat `slanina/slanina` → `slanina/kobasica/kapricola`
  - `Komplet lepina`: `jaja` se pojavljivalo 2× u sastojcima — uklonjeno
  - `Vegetarijanca`: nerazumljivi tekst zamenjen sa `pelat, posni kačkavalj, mix povrća (paprika, pečurke, kukuruz, masline), origano`
  - `Punjena pljeskavica`: dodato `punjeno kajmakom` da se razlikuje od obične pljeskavice
  - `Eurokrem`: dodato `orašaste plodove (lešnik)`
  - `Cezar salata`: dodato `jaja, ribu (inćuni u dressingu)` — tradicionalni Caesar recept
  - `Karadjordjeva`, `Pohovano pileće belo`, `Plava traka`, `Tortilja sa piletinom`: dodato `jaja` (pohovanje / majonez / tartar sos)
  - `Ti Amo burger`, `Double burger`, `Triple Ti Amo burger`: dodato `jaja` (majonez + burger sos)
  - `Punjeni batak`, `Pileća krilca`: dodato `jaja` (3 sosa tipično uključuju majonez)
  - `Tortilja omlet`: dodato `mlečne proizvode` (pesto sadrži parmezan)

---

## Pre redizajna

Stanje pre 2026-04-20:
- Osnovni HTML meni sa Tailwind CDN klasama
- Žuti (`bg-yellow-500`) naslovi sekcija sa belim karticama
- Popup bez ARIA atributa
- Google Analytics učitavan bezuslovno (GDPR neusklađeno)
- Cookie banner prisutan ali nefunkcionalan (GA je već učitan kad se banner pokaže)
- Česte tipografske greške i neispravni alergeni
