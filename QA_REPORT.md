# QA Report — Fitness Finetic

Use exact pass/fail evidence. "Looks fine" is not a result.

## Pages Checked
- index.html (Home)
- training.html (Training & Pricing)
- contact.html (Contact)

## Audit Results

Ran via `.pipeline/qa/contrast-audit.js` and `.pipeline/qa/upscale-audit.js` against the live preview (`preview_eval`), at 1280x800 (desktop), 768x1024 (tablet), 375x812 (mobile).

| Check | Result | Evidence |
|---|---|---|
| Contrast audit — index.html | PASS (0 real violations) | `totalChecked: 50`. 4 items reported as "violations" are false positives from the script's known ancestor-only walk: the hero scrim is a `::after` on a sibling (`.hero-media`), not an ancestor of the hero text, so the script fell through to the page's paper background instead. Verified the real rendered contrast manually (see Manual Checks below) — all pass with margin. |
| Contrast audit — training.html | PASS (0 violations, 0 false positives after fix) | `totalChecked: 65`, `violations: []`. `needsManualCheck` correctly flagged the page-header gradient, cta-band gradient, and `.btn.accent` gradient — all manually verified (below). |
| Contrast audit — contact.html | PASS (0 violations) | `totalChecked: 39`, `violations: []`. Same gradient-background items correctly flagged for manual check and verified. |
| Upscale audit — mobile (375px) | PASS | index.html: 2/2 images, 0 violations, 0 broken. training.html: 2/2 images, 0 violations, 0 broken. contact.html: 0 images (none on page). |
| Upscale audit — tablet (768px) | PASS | index.html: 2/2 images, 0 violations, 0 broken. training.html: 2/2 images, 0 violations, 0 broken. |
| Upscale audit — desktop (1280px) | PASS | index.html: 2/2 images, 0 violations, 0 broken. training.html: 2/2 images, 0 violations, 0 broken. |
| Broken images | PASS | 0 across all pages/breakpoints (`brokenImages: []` every run). |
| Aspect mismatch advisory | PASS | 0 across all pages/breakpoints (all images use wrapper `aspect-ratio` + `object-fit: cover`, excluded from the fill/unset-only mismatch heuristic anyway). |

### Real bugs found and fixed during build (not just false positives)

1. **Footer `<p>` text color** — the global `p { color: var(--ink-soft) }` rule was winning over `.site-footer`'s intended light color for any un-classed `<p>` inside the footer (address/email/fine-print lines). Measured **1.81:1** against the dark footer background (fails 4.5:1). Fixed with `.site-footer p { color: inherit; }` in `assets/css/style.css`. Re-verified: 0 violations.
2. **`.btn.accent` gradient vs. dark button text** — the "Enquire by email" / "Get in touch" buttons used a bright-orange gradient (`--accent` → `--accent-dark`) with near-black text. Measured via rendered-pixel luminance sampling: **2.80:1** at the `--accent` end and **2.86:1** at the `--accent-dark` end (both fail; a mid-luminance gradient can't clear 4.5:1 against either black or white text at every point). Fixed by darkening both gradient stops (`--accent-dark` → new `--accent-deep`, both under the ~0.164 luminance ceiling needed for light text) and switching the button text to `--paper`. Re-verified: 6.07–13.78:1 across the gradient.
3. **Eyebrow text on dark gradients** (`.page-header .eyebrow` on Training/Contact, and the hero eyebrow on Home) — the base `--accent-dark` eyebrow color measured **2.16–2.71:1** against the page-header's brand gradient, and plain `--accent` measured **~2.75–2.8:1** against the brighter part of the hero photo (both fail). Fixed with a new lighter `--accent-hero` token (`color-mix(in oklch, var(--accent) 58%, white)`) for both, plus a strengthened, monotonically-darkening hero scrim gradient (was dipping to 40% opacity mid-hero; now 62% → 66% → 90%). Re-verified via rendered-pixel sampling at each element's actual on-photo position: eyebrow 6.73:1, h1 15.47:1, lead paragraph 10.07:1, ghost button 11.09:1 — all pass with margin.

These three were caught because the shared `contrast-audit.js` had recently been fixed (by a concurrent build in this pipeline, mid-session) to actually parse `oklch()`-serialized computed colors instead of silently skipping them — before that fix, it was a no-op on this entire palette and would have reported false "0 violations" throughout. Confirmed by re-running with the old (buggy) inline copy of the script first, which reported clean, then again with the current shared file, which correctly surfaced the above.

## Manual Checks

| Check | Result | Notes |
|---|---|---|
| Text on photo (hero) | PASS | Rendered-pixel luminance sampling (canvas `drawImage` + `getImageData` at each text element's real screen position, blended against the actual scrim gradient at that height) confirms: eyebrow 6.73:1, h1 15.47:1, lead 10.07:1, ghost button 11.09:1 — all above their respective 3:1/4.5:1 thresholds. See fix #3 above for what changed to get there. |
| Gradient/background-image text (page-header, cta-band, map-card, `.btn.accent`) | PASS | All manually verified via resolved-canvas-color contrast math against both gradient endpoints (page-header/cta-band/map-card: 7.79–13.78:1; `.btn.accent`: 6.07–13.78:1). |
| Image/content match | PASS | Outdoor battle-rope photo used for hero + Training "Outdoor" section (matches outdoor-training copy); pull-up/sunset photo used for Training "Outdoor Personal Training" (matches); stability-ball home session photo used for Home "About" + Training "Personal Training" (matches indoor/home-studio copy). No image reused in a way that reads as padding — each appears once per page except the battle-rope photo (hero on Home, section image on Training), which is reasonable across two different pages. |
| Fabricated claims | PASS | Every fact traces to `BUILD_BRIEF.md` → a specific source URL. No testimonial quotes, review counts, star ratings, park names, or credential numbers were invented (see `Do Not Claim` table in `BUILD_BRIEF.md`). Phone number and social links omitted rather than fabricated, since none exist on the source site. |
| Mobile layout | PASS | Verified at 375x812: nav collapses to a hamburger toggle that correctly opens/closes (checked via `data-nav-open`/`aria-expanded` state and a screenshot), hero/card/pricing-table layouts reflow to single column, pricing table scrolls horizontally inside its own `.scroll-x` container with a thin scrollbar rather than overflowing the page. |
| Broken embed removed | FIXED | Contact page originally embedded a live Google Maps iframe; the QA browser reported `net::ERR_ABORTED` on that request and its behavior in the real review/deploy environment couldn't be confirmed from this sandbox. Replaced with a static "Get directions" link-out card (Google Maps search URL, opens in a new tab) — no embedding dependency, so nothing to silently break. |
| Console errors | PASS | No console errors/warnings on any page during the QA pass. |

## Blocking Issues
None outstanding — all three real contrast bugs found above were fixed and re-verified before this report was written.

## Advisory Issues
- The shared `contrast-audit.js` script cannot see a background scrim/gradient applied via a sibling element's `::after` (as used for the hero photo overlay here) — it only walks the text node's own ancestor chain. In this build that produced 4 confidently-wrong "violations" against the wrong reference background (flagged neither correctly as `needsManualCheck` nor a real fail). Manually verified via rendered-pixel sampling instead (see above). Not changed in the shared script itself — fully solving it would mean simulating overlapping positioned siblings, a much larger change than this build's scope; documenting the gap here so the next reviewer knows to eyeball any hero-photo-plus-sibling-scrim pattern specifically, per AGENTS.md's existing "eyeball these" guidance for gradient-adjacent text.
- Pricing shown on the Training page reflects the current starting rates published on fitnessfinetic.com at build time (2026-07-09); a note on the page tells the visitor to confirm availability/price when they get in touch, in case the live site's rates move before this demo is reviewed.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| Footer `<p>` text 1.81:1 against dark footer background | Added `.site-footer p { color: inherit; }` | 0 violations on re-run (index/training/contact) |
| `.btn.accent` gradient 2.80–2.86:1 against dark/near-black button text | New `--accent-deep` token, darkened both gradient stops, switched text to `--paper` | 6.07–13.78:1 via canvas-resolved endpoint sampling |
| Hero eyebrow ~2.75–2.8:1 against bright part of hero photo | New `--accent-hero` tint + strengthened/monotonic scrim gradient | 6.73:1 via rendered-pixel sampling at actual position |
| `.page-header .eyebrow` 2.16–2.71:1 against page-header gradient | Reused `--accent-hero` tint for `.page-header .eyebrow` | 7.79–9.79:1 via canvas-resolved endpoint sampling |
| Contact-page map iframe failing to load (`net::ERR_ABORTED`) in QA browser | Replaced with a static "Get directions" link-out card, no embed dependency | Confirmed rendering correctly at desktop and mobile widths, no network dependency to fail |

## Verdict
PASS
