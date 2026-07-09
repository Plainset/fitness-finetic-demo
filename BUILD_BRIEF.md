# Build Brief — Fitness Finetic

Keep this compact. Add only sourced facts and assets actually used or deliberately rejected.

## Contact
- Email: touchbase@fitnessfinetic.com
- Email source URL: https://fitnessfinetic.com/golders-green-nw11-studio (also appears site-wide, mailto link in header/footer of homepage)
- Rechecked date: 2026-07-09 (curl + WebFetch of live homepage and /golders-green-nw11-studio, both render the address before build)
- Phone: none found anywhere on fitnessfinetic.com (no tel: link, no phone text on any page checked)
- Address: 57 Woodlands, London NW11 9QS

## Page Plan
- Scope: 3-page default
- Pages: index.html (Home), training.html (Training & Pricing), contact.html (Contact)
- Reason for any extra page: none added — sparse site, 3 pages covers all verified content without padding

## Pitch Hook
- Verified observation: current site (GoDaddy Website Builder, not Wix as originally logged — corrected on inspection) shows broken/placeholder image icons on the homepage (three `data:image/gif` broken-image placeholders where photos should load) and otherwise leans on generic stock/Getty photography, despite the business having three genuine, unused action photos of real training sessions buried on the little-visited /success-stories page. No pricing is surfaced anywhere except a small on-page menu widget; no distinct visual identity.
- Source URL: https://fitnessfinetic.com/ (broken image placeholders, stock/Getty images), https://fitnessfinetic.com/success-stories (real unused photos)

## Allowed Facts
| Fact | Source URL | Used where |
|---|---|---|
| Trainer name: Jai | https://fitnessfinetic.com/about | Home, Training, Contact |
| Qualified Personal Trainer since 2012 | https://fitnessfinetic.com/about | Home hero strip, Training about-trainer box |
| Holds qualifications in Diet & Nutrition and Chromatic Yoga | https://fitnessfinetic.com/about | Training about-trainer box |
| Trains at health clubs, fitness studios, in the park, at clients' homes/workplace | https://fitnessfinetic.com/about | Training page |
| Services: Personal Training (studio/home/outdoor), Outdoor Personal Training, Yoga, online option mentioned | https://fitnessfinetic.com/personal-training, /outdoor-personal-training, /yoga | Home, Training |
| Yoga session structure: warm-up, breath/movement sequencing, cool-down progression | https://fitnessfinetic.com/yoga | Training page |
| Start Up package: from £120, 3 x 60-minute sessions, valid 21 days, includes health & lifestyle consultation | https://fitnessfinetic.com/ (on-page pricing widget, verified in raw HTML) | Training pricing table |
| Personal Training package: from £480, 12 x 60-minute sessions, indoor (home/workplace/studio) or outdoor (garden/park) | https://fitnessfinetic.com/ | Training pricing table |
| Yoga Pass: from £190, 10 sessions (30 or 60 minutes), valid 12 weeks | https://fitnessfinetic.com/ | Training pricing table |
| Opening hours: 06:00–20:00 | https://fitnessfinetic.com/ (contact hours block) | Home, Contact |
| Address: 57 Woodlands, London NW11 9QS | https://fitnessfinetic.com/, /golders-green-nw11-studio | Home, Contact, footer |
| Email: touchbase@fitnessfinetic.com | https://fitnessfinetic.com/ (mailto link), /golders-green-nw11-studio | Contact, footer |

## Do Not Claim
| Claim or uncertainty | Reason |
|---|---|
| Trainer's surname, exact age/credentials body (e.g. REPs/CIMSPA number) | Not stated anywhere on the site — first name "Jai" only |
| Specific park names near Golders Green used for outdoor sessions | Site only says "local parks" / "park areas", never names one |
| Any client testimonial quote text | /success-stories page text is client-side rendered and not extractable from static HTML; images used but no attributed quotes invented |
| Star ratings / review counts / "X clients trained" numbers | Not present anywhere on source site |
| Phone number | None listed on site; not fabricated |
| Social media links (Instagram/Facebook) | None found on any page checked; not fabricated, omitted from Contact page |
| "Wix" as the platform (per original lead note) | Inspection shows it's actually GoDaddy Website Builder (godaddy.com/websites/website-builder in footer link) — corrected, not a claim used on the demo site itself either way |

## Asset Manifest
| File | Source URL | Native size | License/credit | Watermark checked | Intended section | Copy match |
|---|---|---|---|---|---|---|
| assets/images/outdoor-battle-ropes.jpg (orig "Nick Cap.jpg") | https://fitnessfinetic.com/success-stories | 1600x1198 | Business's own uploaded client photo, own site asset bucket | yes — none found | Home hero / Training "Outdoor" section | Outdoor training in a park/garden setting — matches |
| assets/images/outdoor-pullups-sunset.jpg (orig "CL Pull Ups.jpg") | https://fitnessfinetic.com/success-stories | 1600x2133 | Business's own uploaded client photo, own site asset bucket | yes — none found | Training "Outdoor" / gallery strip | Outdoor calisthenics at sunset — matches |
| assets/images/home-studio-mobility.jpg (orig "RC sideplank-b2db749.jpg") | https://fitnessfinetic.com/success-stories | 1600x1260 | Business's own uploaded client photo, own site asset bucket | yes — none found | Training "Home/Studio" section | Home-based mobility/stability-ball session — matches |

Rejected assets (checked, not used):
- Homepage "stock" image (`img1.wsimg.com/isteam/stock/98177`) — generic flat-lay stock photo (shoes/towel/water bottle), not this business's own imagery. Rejected.
- Homepage "Battlerope.webp" hero tile (`img1.wsimg.com/isteam/ip/.../Battlerope.webp`) — visually near-duplicate crop of the same stock-styled battle-rope scene used site-wide as a generic menu thumbnail, distinct from the genuine success-stories photo; kept ambiguous, not used since the success-stories original is confirmed genuine and higher quality.
- Homepage Getty image (`img1.wsimg.com/isteam/getty/2189219660`) — confirmed via embedded IPTC/EXIF description "Strength and Balance in Downward Dog Pose, Yoga workout in outdoor." as licensed Getty stock. Rejected — third-party stock, not this business's own photography.
- "Half Inverted colours logo" (the site's current PNG wordmark/running-figure icon) — dated chrome-text clip-art style; deliberately not reused. This demo uses a fresh custom text wordmark as part of the distinct visual identity, not a factual claim, so no sourcing gate applies.
- No Google Business Profile / social photos were needed as fallback — three genuine, on-site, unused photos were sufficient for the 3-page scope.

## Design Notes
- Palette: deep pine/forest green (`oklch(28% 0.05 155)`) as primary, warm terracotta/amber accent (`oklch(68% 0.16 45)`), warm off-white paper background (`oklch(97% 0.01 90)`), charcoal ink for body text. Distinct from a generic "gym red/black" look to suit a private, personal, boutique studio.
- Typography: serif display face (system-stack "Georgia"/"Iowan Old Style" fallback via a bundled-free web font — see stylesheet) for headings to read boutique/personal rather than big-box-gym; clean grotesk sans for body/UI.
- Image layout pattern: wrapper cover-fill (aspect-ratio on wrapper, img `object-fit:cover`) for the 3 real photos, used sparingly (one per major section) rather than forced into every panel, since only 3 genuine photos exist. Remaining sections are text/CSS-forward (cards, numbered lists, a pricing table) by design, consistent with the "image-light, text-forward" plan in the lead notes.
- Risk notes: only 3 real photos exist; do not stretch or reuse the same photo twice in a way that looks padded. Home uses 1 (hero), Training uses 2 (outdoor + home/studio sections). Contact page intentionally has no forced photo.
- Contact page originally used a live Google Maps `output=embed` iframe; dropped it after the QA browser reported `net::ERR_ABORTED` on that request and its success in the actual review/deploy environment couldn't be confirmed from here. Replaced with a static "Get directions" card linking out to Google Maps in a new tab (`maps/search/?api=1&query=...`) — no embedding dependency, same visual weight in the contact-grid layout.

## Builder QA
- Contrast: fail-clean on final pass, after fixing 3 real bugs found during build (see QA_REPORT.md): footer `<p>` text inheriting the wrong color, the `.btn.accent` gradient/dark-text pairing failing across part of its gradient, and the hero/page-header eyebrow color failing against its actual background. Full detail in QA_REPORT.md.
- Upscale mobile/tablet/desktop: clean, 0 violations, 0 broken images — see QA_REPORT.md
- Manual checks: see QA_REPORT.md
