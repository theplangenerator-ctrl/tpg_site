# TPG Fitness — Marketing Site

> The Gym That Knows You.

This repository hosts the TPG Fitness marketing and product-catalogue website — a Next.js 14 (App Router) build that introduces TPG's flagship intelligent gym equipment, **The Smart Kiosk**, and serves as the public storefront for an expanding catalogue of hardware + software products engineered for serious facilities.

---

## 1. Product Description

TPG Fitness builds **intelligent gym equipment** — physical hardware fused with on-device AI, biometric identity, and live member analytics. The first product, **The Smart Kiosk**, is a dual-monitor on-floor kiosk that:

- **Authenticates** members in under a second via R307 fingerprint, falling back to face recognition on return visits.
- **Plans** personalised workouts using goal, training history, and *aukat* (capacity) — re-tuning week over week so no two members ever get the same routine.
- **Tracks** muscle activation, fatigue, and peak effort in real time through a GLSL-driven front/back/side body map that updates per set.
- **Reports** progress directly to each member's Telegram seconds after the final set — composite cards with action shots, streaks, and stats designed to be shared.
- **Empowers owners** with a live cloud dashboard for retention, peak-hour load, and plan adherence.

The catalogue is engineered to grow: the kiosk is product 01, with products 02 and 03 already in development. Every new piece of equipment ships into the same software ecosystem so a gym never has to re-platform.

**Who it's for:** independent gyms, premium studios, and 40-location chains that want the same hardware, same software, and the same SLA across every site.

**Privacy posture:** sensitive data stays on-site by default. Cloud sync is opt-in, encrypted, and auditable.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router, RSC) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + custom CSS variables in `app/globals.css` |
| Fonts | `Barlow Condensed` (display), `Inter` (body), `Space Grotesk` (accents) via `next/font/google` |
| Animation | GSAP 3.15 (+ `@gsap/react`, ScrollTrigger) and Framer Motion 11 |
| Icons | `lucide-react` |
| Forms | `react-hook-form` + `zod` validation (`@hookform/resolvers`) |
| API runtime | Next.js Route Handlers (Node) |

---

## 3. Site Architecture

```
app/
  layout.tsx          # Root layout: fonts, <Navbar>, <Footer>, ScrollProgress, MotionProvider
  page.tsx            # Home (Hero → Catalogue → Capabilities → Case Study → Stats → Testimonials → CTA)
  contact/page.tsx    # Contact page (form + details + map + FAQ)
  team/page.tsx       # Team page
  api/contact/route.ts# POST endpoint: zod-validated submission handler
  globals.css         # Design tokens + Tailwind layers
  icon.jpg            # Favicon
components/
  nav/Navbar.tsx
  Footer.tsx
  MotionProvider.tsx              # Framer Motion lazy-motion provider
  shared/
    ScrollProgress.tsx            # Top-of-page scroll progress bar
    AnimatedCounter.tsx           # Count-up numbers
    DiagonalDivider.tsx           # Section breaks
    RedAccentLine.tsx             # Brand accent
    SectionLabel.tsx              # Eyebrow label
  home/
    Hero.tsx                      # Word-mask reveal headline + scroll cue
    Catalogue.tsx                 # Product grid (kiosk + coming-soon slots)
    Capabilities.tsx              # 6-card capability matrix
    CaseStudyShowcase.tsx         # The 4-step kiosk story
    ProductCaseStudy.tsx          # Per-product case-study renderer
    StatsBanner.tsx               # Animated stat counters
    Testimonials.tsx              # Operator quotes
    HomeCTA.tsx                   # Demo-request closer
  team/
    TeamGrid.tsx
    TeamCard.tsx
  contact/
    ContactForm.tsx               # RHF + zod
    ContactDetails.tsx
    ContactMap.tsx
lib/
  products.ts                     # Product, Capability, CaseStudy data model + content
public/images/                    # hero.avif, cta.jpg
```

Routing summary:

| Route | Description |
|---|---|
| `/` | Home — the full product story, end-to-end. |
| `/team` | Founder + operator bios. |
| `/contact` | Demo request form, contact details, map, and FAQ. |
| `POST /api/contact` | Zod-validated submission endpoint (logs to console; wired for Resend/SendGrid). |

---

## 4. Feature-by-Feature Walkthrough

### 4.1 Global chrome

- **Root layout (`app/layout.tsx`)** loads three Google fonts as CSS variables (`--font-barlow`, `--font-inter`, `--font-space`) and wraps the app in `MotionProvider` so Framer Motion's animation features are loaded once and shared.
- **`<ScrollProgress />`** renders a thin top-of-viewport progress bar that fills as the user scrolls — a single fixed element driven by `useScroll`.
- **`<Navbar />`** sits above the fold with site-wide nav and a primary CTA pointing to `/contact`.
- **`<Footer />`** organises four columns: brand, products (`Catalogue`, `Capabilities`, `Request Demo`), company (`About`, `Team`), and socials (Instagram, WhatsApp, Telegram, GitHub). WhatsApp uses a custom inline SVG since `lucide-react` does not ship one.
- **SEO/metadata** is centralised: the root metadata provides default + template titles, OpenGraph image (`/og-image.png`), Twitter card, and a fitness-focused description. Each page (home, team, contact) overrides as needed.

### 4.2 Home — `/`

The home page is a top-to-bottom narrative built from seven sections:

#### Hero (`components/home/Hero.tsx`)
- **Headline:** three lines — *The Gym / That Knows / You.* — animated in with a **GSAP word-mask reveal** (`yPercent: 110` → `0`, `expo.out`) so each word slides up out of its mask container.
- **Cascading details:** eyebrow tag, sub-copy, and CTAs animate in on a timeline behind the headline.
- **Background:** `public/images/hero.avif` via `next/image` with `priority` for LCP.
- **CTAs:** *Request Demo* → `/contact` and a *Watch the Kiosk* play button.
- **Scroll cue:** chevron-down indicator at the bottom of the viewport.
- Animation is scoped via `useGSAP` + `gsap.context()` so timelines clean up on unmount.

#### Catalogue (`components/home/Catalogue.tsx`)
- Renders the array from `lib/products.ts` as a numbered product grid.
- Each card shows status (`available` / `in-development`), category, name, tagline, and (for available products) highlight bullets.
- Coming-soon slots (`product-02`, `product-03`) are intentionally visible — they signal the catalogue is expanding and capture intent for the next release.

#### Capabilities (`components/home/Capabilities.tsx`)
- Six-card matrix. When no product is "selected," it shows `overviewCapabilities` (company-level value props: *Personalised Workout Tracking, Real-Time Member Intelligence, Friction-Free Authentication, Engineered for Scale, Member-First Privacy, Built to Evolve*).
- When a product is in focus, it renders that product's capability list — e.g. the kiosk's six: *Sub-Second Biometrics, AI-Generated Plans, Live Muscle Tracking, Telegram Auto-Reports, Buddy Plan Sharing, Owner Cloud Dashboard*.
- Each capability has a numbered tag, a Lucide icon (`fingerprint`, `brain`, `activity`, `send`, `users`, `cloud`, `sparkles`, `gauge`, `lock`, `zap`, `shield`, `eye`), and a one-line description.

#### Case Study Showcase (`components/home/CaseStudyShowcase.tsx` + `ProductCaseStudy.tsx`)
- Four-panel narrative — **Authenticate → Plan → Track → Report** — that walks a member through a single session.
- Each panel has its own `visual` key (`auth | plan | track | report`) for distinct artwork, plus an eyebrow label, title, body, and caption.
- Drives the kiosk's "four steps, zero friction" promise.

#### Stats Banner (`components/home/StatsBanner.tsx`)
- Four animated counters: **10+ Muscle Groups Tracked**, **6 Days Per Week Planned**, **< 1s Fingerprint Recognition**, **100% Personalised**.
- Numbers tween from 0 → target with GSAP, gated by a ScrollTrigger so they only count when in view.

#### Testimonials (`components/home/Testimonials.tsx`)
- Operator-voice quotes positioning the kiosk as gym-floor-tested, not a demo prop.

#### Home CTA (`components/home/HomeCTA.tsx`)
- Closer panel with `public/images/cta.jpg`, a punchy headline, and a primary action into `/contact`.

### 4.3 Team — `/team`

- Page-hero strip with a metadata-rich `<head>` (own title, description, OG).
- **`TeamGrid`** staggers `<TeamCard>` reveals with Framer Motion (`useInView`, 7% stagger, `cubic-bezier(0.16, 1, 0.3, 1)` ease).
- Three cards seed the page today:
  - **Ankit Khamitkar** — Founder & CEO
  - **Atharva Dharmadhikari** — Chief of Logistics, Finance & Onboarding
  - **Atharva Supe** — Chief Technical Officer
- Each card carries initials, name, role, and a bio written in operator voice.

### 4.4 Contact — `/contact`

Three components compose the page plus an FAQ accordion:

#### `ContactForm.tsx`
- Built on `react-hook-form` + `zod`.
- Fields: `name`, `email`, `phone (optional)`, `gym`, `members` (bucketed: `under-100 | 100-500 | 500-1000 | 1000+`), `message`.
- Submits JSON to `POST /api/contact`.

#### `ContactDetails.tsx`
- General Enquiries — `theplangerator@gmail.com`
- Demo Requests — `demo@tpgfitness.com`
- Phone — `+91 8149888054` (Mon–Fri, 9am–6pm)
- HQ — `4 Chetan Nagar, Nanded City, Maharashtra, India`
- Telegram — `@TPGFitnessSupport` (typical reply < 1 hour)
- Social row: Instagram, LinkedIn, GitHub, WhatsApp (custom SVG).

#### `ContactMap.tsx`
- Embedded map of the HQ location.

#### FAQ
An expanding accordion of operator-level questions: installation timeline, GMS integration posture, fingerprint failure fallbacks, etc. State is local (`useState`), animated open/close with Framer Motion `<AnimatePresence>`.

### 4.5 Contact API — `POST /api/contact`

`app/api/contact/route.ts`:
- Validates the body against a Zod schema (the same shape as the form).
- On success, logs a timestamped record to the server console and returns `{ success: true }`. The integration point for Resend/SendGrid is marked in the file.
- On Zod failure, returns `400` with the issues array.
- On unexpected error, returns `500`.

### 4.6 Shared primitives (`components/shared/`)

- **`AnimatedCounter`** — count-up component used inside the stats banner.
- **`DiagonalDivider`** — geometric section separator that reinforces the brand's hard-edge aesthetic.
- **`RedAccentLine`** — thin red bar used as a recurring brand mark on page heros.
- **`SectionLabel`** — numbered eyebrow ("01 — Capabilities") used across the home page.
- **`ScrollProgress`** — fixed top progress indicator.

### 4.7 Content model — `lib/products.ts`

Strongly typed product catalogue (`Product`, `Capability`, `CaseStudy`, `CaseStudyPanel`). Driving the catalogue, capabilities grid, and case-study showcase from a single source means new products only need a new entry — the UI follows.

Currently seeded:
- **01 — The Smart Kiosk** (`status: 'available'`): full capability set + four-panel case study.
- **02 — In Development** (`status: 'in-development'`).
- **03 — In Development** (`status: 'in-development'`).

### 4.8 Design system

- **Tone:** matte black surfaces, condensed display type, red accent.
- **Type scale:** Barlow Condensed for display weight, Inter for body, Space Grotesk for callouts and numerics.
- **Motion language:** GSAP for choreographed entrances (hero, stats), Framer Motion for interaction-driven reveals (team grid, FAQ).
- **Accessibility:** semantic landmarks (`<main>`, `<footer>`), aria-hidden on decorative SVGs, focus-visible states preserved on interactive elements.

---

## 5. Running Locally

```bash
# Install
pnpm install   # or: bun install / npm install

# Dev
pnpm dev       # http://localhost:3000

# Production build
pnpm build && pnpm start

# Lint
pnpm lint
```

No environment variables are required for the public site. To wire real email delivery for `/api/contact`, plug Resend or SendGrid into `app/api/contact/route.ts` at the marked line and add the corresponding key to `.env.local`.

---

## 6. Roadmap

- Wire the contact endpoint to a transactional email provider (Resend recommended).
- Ship product detail pages for catalogue items 02 and 03 once specs are public.
- Add a press / case-study hub once first-customer numbers are signed off.
- Open up a public changelog for kiosk firmware releases.
