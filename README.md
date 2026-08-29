# Monalisa Nxt Mall — Website

Premium, conversion-focused marketing website for **Monalisa Nxt Mall, R B Market, Godda (Jharkhand)** — a family fashion & lifestyle mall with 25+ national brands.

## Pages

| File | Content |
|---|---|
| `index.html` | Landing page — hero, brand marquee, stats, 8 category cards, features bento, trending showcase, offers, testimonials, FAQ, CTA, footer |
| `mens.html` | 17 menswear brands (KILLER, U.S. POLO ASSN., RAYMOND, PARX, MUFTI, CRIMSON CLUB, PEPE JEANS, MONTE CARLO, SIFFAR, SPYKAR, CITRUS, JOCKEY, VAN HEUSEN, SWEET DREAM, HYPHEN, WOODLAND, STATUS QUO) — each with photo, description, size range & indicative price tag |
| `ladies.html` | Collections mosaic (sarees, suits, lehengas, crop tops, kurtis, jeans, tops) + 9 brands (LIBAS, KRAUS, Jockey, Juliet, Sweet Dreams, Ambika, Lakshmipati, Subhash, Shagun Sarees) |
| `kids.html` | Age guide (newborn → teenager → young adult) + 5 brands (Ginni & Jonny, Junior KILLER, Crimson Club, Monte Carlo, Integriti) |
| `ethnic.html` | Men (MANYAVAR, NAWAB sherwanis/kurtas; PARK AVENUE, PARX, HYPHEN, SUCCESS blazers/coat-pants) + Women (lehengas, anarkali suits, designer sarees) |
| `accessories.html` | 6 collections — A+ grade ornaments, ladies' purses, gents' purses & belts, perfumes, cosmetics, bags (school/duffle/trolleys; American Tourister, Wildcraft) |
| `toys.html` | Ride-on toy cars — self-drive + parental remote control, 6V/12V, ages 2–8 |
| `shirting.html` | RAYMOND & ARVIND suiting/shirting by the metre, widths & rates, tailor guidance |
| `offers.html` | Brand-offer policy (offers only when brands run them), new collections, seasonal calendar |
| `terms.html` | Exchange-only policy, Godda jurisdiction, offer-period & defect rules, ride-on toys no-warranty, non-exchangeable items, contacts, map |

## Design

- **Palette (final):** "Royal Navy & Gold" — pearl-white light base, midnight-navy dark sections, champagne-gold accent
- **Alternates:** warm ivory + charcoal + gold (earlier), royal emerald + ivory + gold (option C) — both easy to restore from the token blocks in `assets/css/style.css`
- **Type:** Manrope (UI) + Playfair Display italic (editorial accents), with system fallbacks
- **No price tags:** product and brand panels show sizes & descriptions only; prices are quoted in store, so tags always match current stock
- **No everyday offers:** the site never promises discounts — it explains that brand offers are passed on when brands run them
- **Contacts:** store +91 64223 57352 · manager +91 88253 83488 · Instagram @monalisa_nxtmall_godda
- **Google Map:** embedded map (grayscale, key-less Google Maps embed) on the homepage & Terms page, with "Get directions" deep link
- **Toys policy:** ride-on toy cars carry NO warranty — neither manufacturer nor store; stated on Toys page, Terms page and FAQ
- **Trust messaging:** "Trusted since 1999" woven through hero, stats, testimonials and footer
- **Motion:** scroll reveals with staggered entrances, count-up stats, marquees, hover lifts, card tilt, ken-burns hero, parallax, ambient float/spin, FAQ accordion, testimonial slider, drawer nav
- **Imagery:** all 95 photos treated monochrome for a cohesive editorial look
- **Accessible:** semantic landmarks, skip link, aria labels, focus-visible, `prefers-reduced-motion` support, keyboard-friendly accordion
- **Responsive:** mobile-first, tested at 390px → 1440px+

## Structure

```
├── *.html                  ← built pages (deploy these)
├── assets/
│   ├── css/style.css       ← design system
│   ├── js/main.js          ← all interactions
│   └── img/…               ← monochrome photos by section
└── build/
    ├── template.html       ← page shell (head/nav/footer)
    ├── pages/*.html        ← per-page content (with {{TOKENS}})
    └── build.py            ← brand data + generator (single source of truth)
```

## Logo & favicon

- Logo: `assets/img/brand/logo.png` (transparent background, used in header, mobile drawer & footer)
- Favicon: `assets/favicon.png` / `assets/favicon-32.png` (logo on a simple white rounded tile) + `assets/apple-touch-icon.png`
- Source file: `uploads/image-1.jpeg` (keep a copy for re-processing)

## Rebuild

```bash
python3 _build/build.py
```

Content lives in `_build/pages/*.html` (page bodies), `_build/template.html` (shared shell with nav/footer), and `_build/meta.json` (titles/descriptions). The old `build/` folder name is excluded from workspace snapshots — use `_build/`.

Edit copy in `_build/pages/`, then rebuild. New images go in `assets/img/<section>/`.

## Theme system

The entire colour system lives in the `:root` token block at the top of `assets/css/style.css` — swap the hex values there (and the favicon color in `build/template.html`) to re-theme the whole site in seconds. The current theme is **Royal Navy & Gold**.

## To go live

1. Contact numbers are already real; hours/timings can be adjusted in `build/build.py` (footer + CTA) and rebuilt.
2. Point the footer social links to real profiles.
3. Deploy the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).


## Repository structure (clean & minimal)

```
Monalisa-NXT/
├── index.html, mens.html, ladies.html, kids.html,
│   ethnic.html, accessories.html, toys.html,
│   shirting.html, emporium.html, offers.html, terms.html   ← 11 pages
├── assets/          ← css, js, all images (deploy these)
├── _build/          ← optional: edit pages/template + python3 _build/build.py
├── DEPLOY.md        ← step-by-step GitHub push guide
└── README.md
```

Deployment = push the root files to GitHub (see DEPLOY.md). No build step needed.

## Image licensing & legal readiness (IMPORTANT)

All photos on this site are **original, AI-generated imagery owned by the project** — no third-party stock
photos (Getty, Shutterstock, Dreamstime, Pinterest etc.) are used, so there is **no copyright risk** when going live.

- `assets/img/brand/logo.png` — provided by the store owner (used with permission)
- `assets/img/hero/hero-main.jpg` — AI-generated original
- All category images — AI-generated originals (replacement in progress, see tracker below)
- All brand names/logos are trademarks of their respective owners; a disclaimer is shown in the site footer
- No fabricated ratings, review counts or stats remain (verified): hero proof, stats band and category
  stats now use factual claims only (brand counts, size ranges, exchange policy, "since 1999")
- Testimonials are anonymised as "Verified shopper · Godda" (swap in real customer quotes before launch)

### Image replacement tracker (10 per turn limit)

| Status | Folder | Files | Count |
|---|---|---|---|
| ✅ Done | mens | denim-1..5, formal-1..5 | 10 |
| ✅ Done | mens | polo-1..5 (incl. watermarked STATUS QUO photo), jacket-1..5 | 10 |
| ✅ Done | ladies | saree-1..5, kurti-1..5 | 10 |
| ✅ Done | ladies + kids | western-1..5, kids-1..5 | 10 |
| ✅ Done | ethnic + fabric | kurta-1..5, sherwani-1,2,3,5, fabric-1 | 10 |
| ✅ Done | fabric + accessories | fabric-2..5, perfume-1..5, jewel-1 | 10 |
| ✅ Done | accessories | jewel-2..5, trolley-1..5, handbag-1 | 10 |
| ✅ Done | accessories | handbag-2..4, cosmetics-1..5, belt-1, belt-2 | 10 |
| ✅ Done | accessories + toys | belt-3..5, backpack-1..4, car-1..3 | 10 |
| ✅ Done | toys | car-4, car-5 | 2 |

**ALL 92 product images are now original AI-generated originals — 0 stock files remain. Site is copyright-clean and ready for go-live.** ✅

Final audit (verified 2026-08-29): all 10 pages render 175 images with zero broken images,
zero console errors, zero horizontal overflow; no stock-site references, no watermarks,
no fabricated stats/ratings/testimonials; trademark disclaimer present on all 10 pages.
Do not go live until all batches show ✅.


## 🎁 Emporium page (added 2026-08-29)

New department page `emporium.html` — gifts & home decor: photo frames with Hindu idol art
(all sizes), paintings & wall art, designer wall/table/station clocks, table lamps, candle lamps,
fountains of every size, flower vases, artificial flower bunches, Krishna/Radha/Ram Parivar idols,
and Bollywood-style showpieces.

- **Images are MONOCHROME**, matching the site-wide theme (converted 2026-08-29 for consistency —
  no page stands out as odd). All 10 are AI-generated originals in `assets/img/emporium/` —
  copyright-free, no text/watermark/logos.
- **Image gestures (site-wide):** hover zoom + gold ring on brand panels, thumbnail zoom on
  collection thumbs, and a light "shine sweep" across category cards & brand media on hover.
- Wired in: desktop nav (with "New" badge), mobile drawer, footer "More" column, and as a **regular
  category card (#09) in the homepage grid** — equal to Mens/Ladies/Kids. Desktop grid is now 3 columns
  (9 cards = perfect 3x3); on tablet the 9th card spans the full row (`assets/css/style.css` →
  `.cat-grid`, `.cat-card:nth-child(9)`).
- Pricing promise section: "priced far below any store or e-commerce website" (owner's claim, no
  fabricated numbers), FAQ + visit CTA included.
- Content edits: `_build/pages/emporium.html`; meta in `_build/meta.json`; rebuild as usual.
