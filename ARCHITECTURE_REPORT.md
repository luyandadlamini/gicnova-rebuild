# Gicnova — Site Architecture Report
## Deliverable 1 of 7 — Full Analysis Package

---

## 1. Site Architecture Report

### Overview
Gicnova is a next-generation AI mobile-app marketing website built on Webflow.
Category: AI SaaS / Mobile App Landing Page
Primary purpose: Conversion-focused showcase for an AI toolset (Writer, Voiceover, Avatar).
Trusted by 6,650+ global users (social proof anchor).

---

### Page Structure Tree (Top → Bottom)

```
DOCUMENT
├── <nav>  Navigation / Header
│   ├── Logo (wordmark)
│   ├── Nav links (Features | How It Works | Pricing | Blog)
│   └── CTA button ("Get Started")
│
├── <section id="hero">  Hero
│   ├── Badge / eyebrow label  "Next-Gen AI App"
│   ├── H1 headline  (2-line, gradient text)
│   ├── Subheadline paragraph
│   ├── CTA button group  (App Store + Google Play)
│   ├── Trust strip  ("6,650+ global users · ★ 4.9")
│   └── Hero visual  (phone mockup + floating UI cards)
│
├── <section id="trusted">  Trusted-By / Logo Strip
│   └── Animated logo ticker (6–8 brand logos)
│
├── <section id="features">  Core Features (AI Tools)
│   ├── Section label + H2
│   ├── Feature card — AI Writer
│   ├── Feature card — AI Voiceover
│   └── Feature card — AI Avatar
│
├── <section id="showcase">  Product Showcase / Deep-Dive
│   ├── Two-column layout (text left | device right)
│   ├── Feature bullet list with icons
│   └── Alternating layout variation
│
├── <section id="how-it-works">  How It Works
│   ├── Section label + H2
│   └── 3-step numbered cards (horizontal on desktop)
│
├── <section id="pricing">  Plans & Pricing
│   ├── Toggle (Monthly / Annual)
│   └── Pricing card grid (Free | Pro | Enterprise)
│
├── <section id="testimonials">  Testimonials
│   ├── H2 + subheadline
│   └── Review card grid / horizontal scroll on mobile
│
├── <section id="faq">  FAQ
│   ├── H2
│   └── Accordion items (click to expand)
│
├── <section id="blog">  Blog / Latest Articles
│   ├── H2 + "View all" link
│   └── Blog card grid (3 columns desktop)
│
├── <section id="cta-banner">  Final CTA Banner
│   ├── H2 (full-width gradient)
│   └── Download buttons
│
└── <footer>  Footer
    ├── Logo + tagline
    ├── Link columns (Product | Company | Legal)
    ├── Social icons
    └── Copyright line
```

---

## 2. Design System Specification

### Colour Palette

| Role              | Hex        | Usage                              |
|-------------------|------------|------------------------------------|
| Background (base) | `#07070f`  | Page background                    |
| Surface-1         | `#0f0f1a`  | Section backgrounds                |
| Surface-2         | `#16162a`  | Card backgrounds                   |
| Surface-border    | `rgba(255,255,255,0.07)` | Card borders          |
| Primary-500       | `#7c3aed`  | Primary brand purple               |
| Primary-400       | `#9333ea`  | Hover states                       |
| Primary-300       | `#a855f7`  | Gradient end                       |
| Accent-pink       | `#ec4899`  | CTA gradients, highlights          |
| Accent-blue       | `#3b82f6`  | Info elements                      |
| Gradient-hero     | `linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)` | Hero H1 text |
| Gradient-card     | `linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.2) 100%)` | Card glows |
| Text-primary      | `#ffffff`  | Headings                           |
| Text-secondary    | `#9ca3af`  | Body copy                          |
| Text-muted        | `#6b7280`  | Labels, captions                   |

### Typography

| Level    | Size (desktop) | Size (mobile) | Weight | Line-height |
|----------|---------------|---------------|--------|-------------|
| H1       | 72px / 4.5rem  | 40px          | 700    | 1.1         |
| H2       | 48px / 3rem    | 32px          | 700    | 1.15        |
| H3       | 28px / 1.75rem | 22px          | 600    | 1.3         |
| H4       | 20px / 1.25rem | 18px          | 600    | 1.4         |
| Body-lg  | 18px / 1.125rem| 16px          | 400    | 1.7         |
| Body     | 16px / 1rem    | 15px          | 400    | 1.7         |
| Caption  | 13px / 0.8rem  | 12px          | 400    | 1.5         |
| Font     | Inter, system-ui, sans-serif |             |        |             |

### Spacing Scale (8px base grid)

```
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160px
```

### Border Radius

| Token    | Value  | Usage                     |
|----------|--------|---------------------------|
| sm       | 8px    | Buttons, badges           |
| md       | 12px   | Small cards               |
| lg       | 16px   | Feature cards             |
| xl       | 24px   | Pricing cards             |
| full     | 9999px | Pills, tags               |

### Shadow System

```css
--shadow-glow-purple: 0 0 40px rgba(124, 58, 237, 0.35);
--shadow-glow-pink:   0 0 40px rgba(236, 72, 153, 0.3);
--shadow-card:        0 4px 24px rgba(0, 0, 0, 0.4);
--shadow-card-hover:  0 8px 40px rgba(0, 0, 0, 0.5);
```

### Button Styles

| Variant   | Background          | Border   | Text    | Radius |
|-----------|---------------------|----------|---------|--------|
| Primary   | gradient purple→pink| none     | white   | 8px    |
| Secondary | transparent         | 1px #444 | white   | 8px    |
| Ghost     | transparent         | none     | gray    | 8px    |
| App-store | #000 / #1a1a2e      | 1px #333 | white   | 10px   |

---

## 3. Layout System Documentation

### Container

```css
max-width: 1200px;
margin: 0 auto;
padding: 0 24px; /* mobile: 16px */
```

### Section Vertical Rhythm

```
Section padding: 96px top + bottom (desktop)
                64px (tablet)
                48px (mobile)
Section gap to next section: no extra margin (padding handles it)
```

### Grid Patterns Used

| Section         | Grid                         |
|-----------------|------------------------------|
| Features        | 3-col (1fr 1fr 1fr)          |
| Showcase        | 2-col (1fr 1fr)              |
| How It Works    | 3-col (1fr 1fr 1fr)          |
| Pricing         | 3-col (1fr 1fr 1fr)          |
| Testimonials    | 3-col / scroll on mobile     |
| Blog            | 3-col                        |
| Footer          | 5-col (2fr 1fr 1fr 1fr 1fr)  |

### Flexbox Patterns

- Navigation: `display:flex; justify-content:space-between; align-items:center`
- CTA button group: `display:flex; gap:12px; flex-wrap:wrap`
- Trust strip: `display:flex; gap:24px; align-items:center`

---

## 4. Interaction & Animation Map

| Element              | Trigger    | Type          | Duration | Delay   | Easing         |
|----------------------|------------|---------------|----------|---------|----------------|
| Nav                  | page load  | fade-down     | 600ms    | 0ms     | ease-out       |
| Hero badge           | page load  | fade-up       | 600ms    | 100ms   | ease-out       |
| Hero H1              | page load  | fade-up       | 700ms    | 200ms   | ease-out       |
| Hero subheadline     | page load  | fade-up       | 700ms    | 350ms   | ease-out       |
| Hero CTA buttons     | page load  | fade-up       | 600ms    | 500ms   | ease-out       |
| Hero phone mockup    | page load  | fade-up+scale | 900ms    | 300ms   | cubic-bezier   |
| Floating UI cards    | page load  | float loop    | 3s       | varies  | ease-in-out    |
| Logo ticker          | auto       | scroll-left   | 30s      | 0ms     | linear infinite|
| Section headings     | scroll     | fade-up       | 700ms    | 0ms     | ease-out       |
| Feature cards        | scroll     | fade-up stagger| 600ms   | 100ms/card | ease-out   |
| Showcase image       | scroll     | slide-right   | 800ms    | 0ms     | ease-out       |
| How-it-works steps   | scroll     | fade-up stagger| 600ms   | 150ms/step | ease-out  |
| Pricing cards        | scroll     | scale-up      | 600ms    | 100ms/card | ease-out  |
| FAQ items            | click      | slide-down    | 300ms    | 0ms     | ease-in-out    |
| Blog cards           | scroll     | fade-up stagger| 600ms   | 100ms/card | ease-out  |
| CTA banner           | scroll     | fade-up       | 700ms    | 0ms     | ease-out       |
| Buttons              | hover      | scale(1.03)   | 200ms    | 0ms     | ease           |
| Feature cards        | hover      | translateY(-4px) + glow | 300ms | 0ms | ease      |
| Nav background       | scroll     | backdrop-blur fade-in | 300ms | 0ms | ease        |

### Parallax
- Hero phone mockup: subtle vertical parallax on scroll (translateY 0 → -30px over viewport)
- Background gradient orbs: slow drift on scroll

---

## 5. Responsive Behaviour Map

### 1440px (Large Desktop)
- Container: 1200px centred
- All grids: full columns active
- Hero: 2-col (text left, phone right), H1 72px
- Nav: horizontal, all links visible

### 1280px (Desktop)
- Container: 1140px
- No layout changes, slight spacing reduction
- H1: 64px

### 1024px (Tablet)
- Container: 100% - 48px padding
- Features grid: 2-col (3rd card full-width)
- Showcase: stack vertically (text top, image bottom)
- Pricing: 1-col stack
- Blog: 2-col
- Footer: 2-col

### 768px (Large Mobile)
- Container: 100% - 32px padding
- All grids: 1-col
- Hero: 1-col (centred), phone mockup below text
- Nav: hamburger menu, off-canvas drawer
- Feature cards: full-width
- Testimonials: horizontal scroll (snap)
- H1: 40px, H2: 28px

### 375px (Small Mobile)
- Container: 100% - 24px padding
- All content single column
- H1: 34px
- Section padding: 48px

---

## 6. Rebuild Architecture

### File Structure
```
gicnova-rebuild/
├── index.html          # Semantic HTML (single page)
├── styles.css          # Design tokens + layout + components + responsive
├── main.js             # GSAP animations + interactions
└── assets/
    └── (placeholder for images/icons)
```

### Component Hierarchy
```
<App>
  <Navigation />
  <Hero />
  <LogoStrip />
  <Features />
  <Showcase />
  <HowItWorks />
  <Pricing />
  <Testimonials />
  <FAQ />
  <Blog />
  <CTABanner />
  <Footer />
</App>
```

### CSS Architecture Strategy
- CSS custom properties (design tokens) defined on :root
- BEM-inspired class naming
- Utility classes for spacing, text alignment
- Media-query breakpoints: 1280px, 1024px, 768px, 480px
- Animations isolated in animation declarations

### JavaScript Architecture Strategy
- GSAP + ScrollTrigger for all scroll-based animations
- IntersectionObserver fallback for elements
- Vanilla JS for FAQ accordion, pricing toggle, nav hamburger
- requestAnimationFrame for performance-sensitive effects
```
