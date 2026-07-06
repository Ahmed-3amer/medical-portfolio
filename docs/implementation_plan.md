# Implementation Plan: Dr. Salah Medical Portfolio

This Implementation Plan serves as the practical execution roadmap for AI Developers to build the Medical Portfolio website. It translates the project Blueprint into sequential, dependency-aware phases.

> [!IMPORTANT]
> This plan relies strictly on `project-context.md` (Single Source of Truth) and `project-blueprint.md` (Implementation Specification). No architectural deviations are permitted during execution.

---

## Phase 1: Foundation & Project Scaffold
**Goal:** Initialize the project, establish strict folder structures, and configure the core architectural environment.
**Dependencies:** None.

### Tasks
1. **Vite + React Initialization:**
   - Scaffold project using standard Vite React template.
   - Install approved stack only: `framer-motion`, `react-i18next`, `lucide-react`.
2. **Configuration:**
   - Configure `vite.config.js` (alias `@` to `./src`, set vendor chunking for `react` and `framer-motion`).
   - Create `jsconfig.json` for IDE intellisense mapping.
3. **Folder Architecture Creation:**
   - Generate directories: `src/assets`, `src/components`, `src/sections`, `src/layout`, `src/hooks`, `src/locales`, `src/styles`, `src/utils`, `src/data`.
4. **CSS Architecture:**
   - Implement `src/styles/tokens.css` (Colors, Spacing, Typography, Shadows, Radii).
   - Implement `src/styles/reset.css`, `src/styles/base.css` (apply `scroll-behavior: smooth` to `<html>`), and `src/styles/global.css` (including `.visually-hidden` and `prefers-reduced-motion` CSS failsafes).
5. **i18n & Data Scaffolding:**
   - Initialize `i18n.js` and structure `en/translation.json` and `ar/translation.json`.
   - Create empty skeleton arrays/objects in `src/data/` (`expertise.js`, `experience.js`, `certificates.js`, `contact.js`).

**Testing Checkpoint 1:**
- Dev server runs without errors.
- Path aliases resolve correctly.
- Language switching mechanism toggles RTL/LTR on `<html dir>`.
- Tokens are globally available.

---

## Phase 2: Core Utilities & Primitives
**Goal:** Build the isolated utility functions, custom hooks, and foundational UI components that the entire application will rely on.
**Dependencies:** Phase 1.

### Tasks
1. **Utilities:**
   - Implement `src/utils/cn.js` (pure JS classname joiner).
   - Implement `src/utils/animations.js` (export predefined Framer Motion variants: `fadeIn`, `fadeInUp`, `staggerContainer` with 4 speeds).
2. **Hooks:**
   - Implement `useScrollPosition.js`, `useActiveSection.js`, `useLanguageDirection.js`, and `useReducedMotion.js`.
3. **UI Components (Reusable):**
   - `Container` (Max-width layout wrapper).
   - `SectionHeader` (Props: `titleKey`, `subtitleKey`, `alignment`, `theme="dark"` support).
   - `Button` (Variants: `primary`, `secondary`, `ghost`. Include states: hover, disabled).
   - `Card` (Variants: `default`, `flat`. Include base CSS hover ownership).
   - `LanguageSwitcher` (Toggle logic and accessibility wrapper).

**Testing Checkpoint 2:**
- Utilities function in isolation.
- Components adhere strictly to `var(--*)` tokens (no hardcoded CSS values).
- Buttons and Cards display focus rings and handle hover states securely.

---

## Phase 3: Application Shell (Layout)
**Goal:** Construct the global layout wrapper, sticky navigation, and application entry composition.
**Dependencies:** Phase 2.

### Tasks
1. **Layout Components:**
   - Implement `Navbar`: Include `NavLogo`, Desktop `NavLinks`, and Mobile hamburger toggle.
   - Implement `MobileMenu`: Full-width dropdown pattern with Focus Trap, Escape key listener, and dynamic `aria-expanded`/`aria-controls` state management on the toggle button.
   - Implement `Footer`: Three-column desktop grid, two-column tablet grid, responsive stacking.
2. **Application Composition (`App.jsx`):**
   - Establish DOM order: `<Navbar />` → `<main>` → `<Footer />`.
   - Setup React `Suspense` boundaries for all sections except `Hero` (min-height: 400px fallback).

**Testing Checkpoint 3:**
- Sticky Navbar transitions on scroll.
- Mobile Menu opens/closes gracefully, traps `Tab` focus, and dismisses on `Escape`.
- Active section highlighting responds to scroll position.
- Footer columns collapse correctly across breakpoints.

---

## Phase 4: Static & Functional Sections
**Goal:** Build visually complex but data-independent sections.
**Dependencies:** Phase 3.

### Tasks
1. **Hero Section:**
   - Layer 1: Background WebP Image (with `fetchpriority="high"`).
   - Layer 2: Specific linear-gradient overlay from `--color-primary`.
   - Layer 3: Text content and CTA.
   - **Animation Order:** Load-time `fadeInUp` sequence (bypassing initial state if `useReducedMotion()` is true).
2. **About Section:**
   - Implement two-column editorial layout (Responsive: single stack to columns).
   - Implement Portrait Image (`xs: 80%, sm: 70%, md+: 40%`).
   - Implement Biography, Mission, and staggered Core Values list.
3. **Contact Section:**
   - Implement semantic `<address>` wrapper.
   - Handle null-rendering rules for missing client contact data.
   - Apply hover states for specific link items.

**Testing Checkpoint 4:**
- Hero contrast ratio validates > 4.5:1.
- `whileInView` animations trigger only once when scrolling.
- Layout mirrors flawlessly in RTL mode (Arabic).

---

## Phase 5: Data-Driven Sections
**Goal:** Implement sections dependent on iterative rendering of complex arrays.
**Dependencies:** Phase 3.

### Tasks
1. **Areas of Expertise:**
   - Build Grid (Desktop: 4 columns → md: 2 columns → sm: 2 columns → xs: 1 column).
   - Map dynamic Lucide icons using string keys from data layer.
2. **Experience (Timeline):**
   - Construct vertical timeline pattern.
   - Implement static `::after` vertical connector line.
   - Map staggered timeline entries with explicit slower timing (`0.12s`).
3. **Certificates:**
   - Implement 4:3 `object-fit: cover` image cards to normalize mixed orientations.
   - Handle Suspense/lazy-loading for image assets.

**Testing Checkpoint 5:**
- Grids resize gracefully without breaking breakpoints.
- Empty arrays do not break the page.
- Staggered animations trigger systematically.

---

## Phase 6: Accessibility, SEO & Polish
**Goal:** Finalize enterprise-grade standards, meta data, and optimizations prior to deployment.
**Dependencies:** Phase 4, Phase 5.

### Tasks
1. **SEO Implementation:**
   - Inject static JSON-LD (`Person` schema) into `index.html`.
   - Update `<meta>` tags, `<title>`, and Open Graph markup.
   - Ensure singular `<h1>` (Hero) and correct `<h2>` hierarchy for sections.
2. **Accessibility Audit:**
   - Validate `aria-labelledby` linkages between `<section>` tags and `SectionHeader` IDs.
   - Enforce aria templates with `{{variable}}` interpolation in i18n for social links and contact methods.
   - Confirm screen reader invisible text (`.visually-hidden`) on non-semantic visual cues.
3. **Performance Optimization:**
   - Configure Font Loading in `index.html` (`preconnect`, `preload`, exact weights for Manrope, Inter, Alexandria, and `font-display: swap`).
   - Ensure images use `loading="lazy"` (except Hero).
   - Run Vite production build and verify bundle splitting effectiveness.

**Final Testing Checkpoint:**
- Zero React console warnings.
- 100% Keyboard navigability from top to bottom.
- Lighthouse scores > 95 in Performance, Accessibility, and SEO.

---

> [!TIP]
> **To the User:** Please review this Implementation Plan. If the phases and dependencies align with your expectations, simply click "Proceed" or reply with your approval, and I will begin executing Phase 1.
