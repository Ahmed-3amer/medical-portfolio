# Project Blueprint — Part 1
## Software Architecture & Frontend Engineering Specification

**Document Version:** 1.0.0
**Status:** Final — Approved for Implementation
**Source of Truth:** `docs/project-context.md`
**Scope:** Foundation, Architecture, Design System, Global Standards

---

## Table of Contents

1. [Document Scope & Purpose](#1-document-scope--purpose)
2. [Project Identity & Engineering Context](#2-project-identity--engineering-context)
3. [Architectural Principles](#3-architectural-principles)
4. [Technology Stack Specification](#4-technology-stack-specification)
5. [Project Folder Structure Specification](#5-project-folder-structure-specification)
6. [Design System Specification](#6-design-system-specification)
7. [Typography System Specification](#7-typography-system-specification)
8. [Spacing & Layout System Specification](#8-spacing--layout-system-specification)
9. [Animation System Specification](#9-animation-system-specification)
10. [Internationalization (i18n) Specification](#10-internationalization-i18n-specification)
11. [Responsive Design Specification](#11-responsive-design-specification)
12. [Accessibility Specification](#12-accessibility-specification)
13. [Performance Specification](#13-performance-specification)
14. [SEO Specification](#14-seo-specification)
15. [Component Architecture Specification](#15-component-architecture-specification)
16. [Global Engineering Rules](#16-global-engineering-rules)
17. [Global Design Rules](#17-global-design-rules)
18. [Prohibited Patterns](#18-prohibited-patterns)
19. [Acceptance Criteria](#19-acceptance-criteria)
20. [Future Scalability](#20-future-scalability)
21. [AI Implementation Notes](#21-ai-implementation-notes)

---

## 1. Document Scope & Purpose

### Scope

This document is **Part 1** of the Project Blueprint for the Dr. Salah Medical Portfolio website. It covers all foundational engineering and design system specifications that govern every subsequent implementation decision.

This document does **not** contain:
- Source code
- Prompts
- Implementation plans
- Task lists or roadmaps

This document **does** contain:
- Binding engineering specifications derived directly from `project-context.md`
- Architecture decisions, design rationale, and technical standards
- Rules and constraints that apply globally to all sections and components
- Acceptance criteria and best practices

### Purpose

This specification translates every approved project decision from `project-context.md` into a precise, unambiguous engineering reference. All engineers, AI assistants, and collaborators working on this project must read and follow this document before making any implementation decisions.

This document is the **second highest authority** in the project, subordinate only to `project-context.md`. Any decision in this document that conflicts with `project-context.md` must defer to `project-context.md`.

### Document Priority Chain

```
project-context.md                 (Highest authority — Single Source of Truth)
  ↓
project-blueprint-part-1.md        (This document — Foundation & Design System)
  ↓
project-blueprint-part-2.md        (Section specifications — components per page section)
  ↓
project-blueprint-part-3.md        (Implementation details — data, content, assets)
```

---

## 2. Project Identity & Engineering Context

### Project Classification

| Attribute              | Value                                                                 |
|------------------------|-----------------------------------------------------------------------|
| Project Type           | Premium personal portfolio website                                    |
| Client Identity        | Senior healthcare industry professional                               |
| Primary Purpose        | Build professional credibility and business trust                     |
| Industry Context       | Healthcare technology, medical devices, international medical trade   |
| Audience               | Corporate, B2B — pharmaceutical companies, hospitals, device manufacturers, business partners |
| Website Personality    | Executive corporate — not clinical, not a clinic or hospital website  |

### Design Identity Summary

The website communicates a **healthcare industry executive identity**, not a clinical practitioner identity. This distinction governs every design and content decision.

The experience must feel:
- **Clean** — No visual noise, no unnecessary decoration
- **Elegant** — Refined proportions, premium spacing, balanced hierarchy
- **Trustworthy** — Consistent identity, credible typography, measured animation
- **Professional** — Corporate-grade presentation throughout
- **Fast** — Optimized load times, lightweight assets
- **Accessible** — WCAG-compliant, keyboard navigable, screen-reader compatible
- **Mobile-first** — Fluid layout from the smallest screen up

### Brand Personality

The following attributes must be consistently communicated through visual and interaction design:

| Attribute     | Implementation Expression                                                   |
|---------------|-----------------------------------------------------------------------------|
| Professionalism | Dark navy primary palette, structured typography, ordered layouts          |
| Trust         | Consistent spacing, predictable navigation, clean visual hierarchy          |
| Precision     | Exact spacing system, controlled font scale, precise component alignment    |
| Care          | Accessible design, readable content, comfortable reading line lengths       |
| Simplicity    | Purposeful use of whitespace, minimal UI ornamentation                      |
| Confidence    | Strong headline typography, clear CTA hierarchy, decisive visual weight     |
| Modernity     | Contemporary font choices, subtle animations, current UI patterns           |

---

## 3. Architectural Principles

### 3.1 Single-Page Application (SPA) Architecture

The website is a **single-page application** built with React and Vite. All content is rendered within a single HTML document. Navigation between sections is handled via smooth scrolling, not page routing.

**Design Rationale:** A single-page layout preserves visual continuity, supports the editorial storytelling structure of the portfolio, and avoids page-load interruptions that would disrupt the premium experience.

### 3.2 Component-Based Architecture

Every visible piece of UI must be implemented as a React component. Components are classified into three tiers:

| Tier            | Description                                                                       | Location            |
|-----------------|-----------------------------------------------------------------------------------|---------------------|
| **Primitive**   | Lowest-level reusable elements (Button, Icon, Tag, Divider)                       | `src/components/`   |
| **Composite**   | Composed from primitives, representing a reusable UI pattern (Card, SectionHeader) | `src/components/`   |
| **Section**     | Full page section (Hero, About, Experience, Contact)                              | `src/sections/`     |

No section component should contain logic or styling that cannot be isolated. Sections orchestrate composites; composites orchestrate primitives.

### 3.3 Separation of Concerns

| Concern            | Handling Rule                                                                                   |
|--------------------|--------------------------------------------------------------------------------------------------|
| Visual structure   | CSS Modules or scoped CSS — no inline styles for structural or visual properties                |
| Content / data     | Isolated in `src/data/` — never hardcoded inside JSX components                                |
| Translations       | Isolated in `src/locales/` — never hardcoded strings inside JSX components                     |
| Animation logic    | Framer Motion variants defined as reusable objects, imported into components                    |
| Utilities          | Isolated in `src/utils/` — pure functions, no side effects                                     |
| Hooks              | Custom React hooks in `src/hooks/` — encapsulate behavior, not presentation                    |

### 3.4 Dependency Discipline

Every library introduced must have a documented justification from `project-context.md`. No new dependency may be added without explicit approval. The approved dependency set is fixed:

| Library          | Purpose                             | Justification                                                              |
|------------------|-------------------------------------|----------------------------------------------------------------------------|
| React            | UI component framework              | Core technology — approved                                                 |
| Vite             | Build tool and dev server           | Core technology — approved                                                 |
| Framer Motion    | Animation system                    | Official approved animation library                                        |
| react-i18next    | Internationalization                | Official approved i18n solution                                             |
| Lucide React     | Icon system                         | Official approved icon library                                             |

**No other library may be introduced without explicit documented approval.**

### 3.5 Scalability Principle

The architecture must allow sections to be added, removed, or reordered without structural refactoring. Each section is self-contained. Global state is minimal. Shared state (language, theme preferences) is managed at the application root level only.

---

## 4. Technology Stack Specification

### 4.1 Core Framework

**React** (latest stable LTS)

- All UI is built as functional React components
- Hooks are preferred over class components
- No class component may be used for new features
- Props must be typed descriptively (PropTypes or TypeScript if adopted in future)

**Vite** (latest stable)

- Used as development server and production bundler
- Configured for optimized builds: code splitting, tree shaking, asset optimization
- Environment variables managed via `.env` files — never hardcoded
- Build output targets modern evergreen browsers

### 4.2 Animation Library

**Framer Motion** (latest stable)

See Section 9 for the full Animation System Specification.

### 4.3 Internationalization Library

**react-i18next** (latest stable)

See Section 10 for the full i18n Specification.

### 4.4 Icon Library

**Lucide React** (latest stable)

- All icons must be sourced exclusively from Lucide React
- Icon size must follow the project's spacing scale: 16px, 20px, 24px, or 32px
- Icons are decorative aids — they must always accompany meaningful text labels in content contexts
- Standalone icon-only buttons must include `aria-label`

### 4.5 Styling Approach

**Vanilla CSS with CSS Custom Properties (CSS Variables)**

- **No CSS framework** is used (no Tailwind CSS, no Bootstrap, no Material UI)
- All design tokens (colors, spacing, typography, shadows, border-radius) are defined as CSS Custom Properties in a single global token file: `src/styles/tokens.css`
- Component-specific styles are written in co-located CSS files or CSS Modules
- Inline styles are prohibited for visual or structural properties
- Inline styles are permitted only for dynamic values that cannot be expressed via class toggling (e.g., programmatic animation values managed by Framer Motion)

### 4.6 Build & Deployment

- Production bundle is generated via `vite build`
- Assets are optimized: images compressed, fonts subset, JS tree-shaken
- Deployment target: (Pending Decision) — hosting platform not specified in `project-context.md`

> **(Pending Decision):** The deployment and hosting environment has not been specified in `project-context.md`. Implementation of CI/CD pipelines, environment variable configuration, and deployment scripts cannot safely proceed until this is defined. This does not block frontend development.

---

## 5. Project Folder Structure Specification

### 5.1 Canonical Folder Structure

```
/
├── public/
│   ├── favicon.ico
│   └── og-image.jpg              # Open Graph image for social sharing
│
├── src/
│   ├── assets/                   # Static assets: images, icons, fonts
│   │   ├── images/               # Section-specific images (portrait, hero bg, certificates)
│   │   └── fonts/                # Self-hosted font files (if not using Google Fonts CDN)
│   │
│   ├── components/               # Reusable primitive and composite UI components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── SectionHeader/
│   │   │   ├── SectionHeader.jsx
│   │   │   └── SectionHeader.module.css
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   └── Card.module.css
│   │   └── ...
│   │
│   ├── sections/                 # Full page section components (one per website section)
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.module.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Expertise/
│   │   │   ├── Expertise.jsx
│   │   │   └── Expertise.module.css
│   │   ├── Experience/
│   │   │   ├── Experience.jsx
│   │   │   └── Experience.module.css
│   │   ├── Certificates/
│   │   │   ├── Certificates.jsx
│   │   │   └── Certificates.module.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.module.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.module.css
│   │
│   ├── layout/                   # Layout-level wrappers (AppLayout, Container, Section wrapper)
│   │   ├── AppLayout.jsx
│   │   └── Container.jsx
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useScrollPosition.js
│   │   └── useLanguageDirection.js
│   │
│   ├── locales/                  # i18n translation files
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── ar/
│   │       └── translation.json
│   │
│   ├── styles/                   # Global CSS: tokens, reset, base styles
│   │   ├── tokens.css            # All CSS Custom Properties (design tokens)
│   │   ├── reset.css             # Normalized browser reset
│   │   ├── base.css              # Body, html, root typography defaults
│   │   └── global.css            # Utility classes, global helpers
│   │
│   ├── utils/                    # Pure utility functions
│   │   ├── cn.js                 # Class name utility (simple string concatenator)
│   │   └── animations.js         # Canonical Framer Motion variant definitions
│   │
│   ├── data/                     # Content data files (structured static data)
│   │   ├── expertise.js          # Areas of expertise array
│   │   ├── experience.js         # Experience timeline array
│   │   └── certificates.js       # Courses & certificates array
│   │
│   ├── App.jsx                   # Root application component
│   ├── main.jsx                  # React DOM entry point
│   └── i18n.js                   # i18next configuration
│
├── index.html                    # Vite HTML entry with SEO meta tags
├── vite.config.js
├── .env.example
└── package.json
```

### 5.2 Folder Naming Conventions

| Convention           | Rule                                                                             |
|----------------------|----------------------------------------------------------------------------------|
| Folders              | PascalCase for component folders; lowercase for utility folders                  |
| Component files      | PascalCase — `Button.jsx`, `SectionHeader.jsx`                                  |
| CSS Module files     | PascalCase matching component — `Button.module.css`                              |
| Hook files           | camelCase prefixed with `use` — `useScrollPosition.js`                          |
| Utility files        | camelCase — `cn.js`, `formatDate.js`                                            |
| Data files           | camelCase noun — `expertise.js`, `experience.js`                                |
| Translation files    | `translation.json` under language code folder (`en/`, `ar/`)                   |

### 5.3 Section Naming Convention

Each section folder name corresponds to its display section:

| Section Display Name       | Folder Name         | Component Name       |
|----------------------------|---------------------|----------------------|
| Navbar                     | `Navbar/`           | `Navbar`             |
| Hero                       | `Hero/`             | `Hero`               |
| About                      | `About/`            | `About`              |
| Areas of Expertise         | `Expertise/`        | `Expertise`          |
| Experience                 | `Experience/`       | `Experience`         |
| Courses & Certificates     | `Certificates/`     | `Certificates`       |
| Contact                    | `Contact/`          | `Contact`            |
| Footer                     | `Footer/`           | `Footer`             |

---

## 6. Design System Specification

### 6.1 Color Palette

All colors are defined as CSS Custom Properties in `src/styles/tokens.css`. No component may reference a raw hex color value directly. All color references must use the corresponding token variable.

```css
/* src/styles/tokens.css — Color Tokens */

:root {
  --color-primary:         #0F172A;   /* Dark navy — primary brand & header backgrounds */
  --color-accent:          #14B8A6;   /* Teal — CTAs, active states, accent marks       */
  --color-background:      #F8FAFC;   /* Off-white — page background                   */
  --color-surface:         #FFFFFF;   /* Pure white — cards, panels                    */
  --color-text-primary:    #1E293B;   /* Near-black — primary body text                */
  --color-text-secondary:  #64748B;   /* Slate — secondary labels, captions            */
  --color-border:          #E2E8F0;   /* Light border — card outlines, dividers        */
  --color-divider:         #CBD5E1;   /* Slightly darker divider — horizontal rules    */
  --color-hover:           #F1F5F9;   /* Hover state background — interactive elements */
}
```

### 6.2 Color Usage Rules

| Token                    | Permitted Usages                                                           |
|--------------------------|----------------------------------------------------------------------------|
| `--color-primary`        | Navbar background, hero overlay, dark section backgrounds, headings on light backgrounds |
| `--color-accent`         | Primary CTA button, interactive link highlights, active navigation states, decorative accent marks |
| `--color-background`     | Root page background, section backgrounds on light sections               |
| `--color-surface`        | Card backgrounds, modal panels, elevated content areas                    |
| `--color-text-primary`   | Headings, body copy, all primary readable content                          |
| `--color-text-secondary` | Subheadings, captions, metadata, supporting text                           |
| `--color-border`         | Card borders, input field borders, structural dividers                     |
| `--color-divider`        | Horizontal rule elements, section separators                               |
| `--color-hover`          | Background color on hover for interactive rows, navigation items, cards    |

### 6.3 Color Constraints

- **No additional colors** may be introduced without explicit project approval
- **No gradients** between non-adjacent colors in the palette
- **No bright, saturated, or warm colors** — the palette is intentionally cool and restrained
- Accent color (`--color-accent`) is a **limited resource** — it must not appear on more than one focal element per viewport
- Text on dark backgrounds must achieve **WCAG AA contrast ratio minimum** (4.5:1 for body text, 3:1 for large text)
- Text on light backgrounds must achieve **WCAG AA contrast ratio minimum**

### 6.4 Shadow System

Shadows must remain **soft and subtle**. No heavy drop shadows. All shadow values are defined as tokens:

```css
:root {
  --shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.05);
}
```

- `--shadow-sm`: Default card shadow in resting state
- `--shadow-md`: Card shadow on hover
- `--shadow-lg`: Navbar shadow on scroll, modal-level elements

**Prohibited:** Colored shadows, large spread shadows, shadows exceeding `--shadow-lg` in visual weight.

### 6.5 Border Radius System

```css
:root {
  --radius-sm:   4px;     /* Tags, small badges, micro elements    */
  --radius-md:   8px;     /* Cards, buttons, input fields          */
  --radius-lg:   12px;    /* Feature cards, section highlights     */
  --radius-xl:   16px;    /* Large panels — used sparingly         */
  --radius-full: 9999px;  /* Pills, fully rounded elements         */
}
```

Border radius must be applied **consistently**. A card style established in one section must use the same `--radius-md` or `--radius-lg` value everywhere a similar card appears.

---

## 7. Typography System Specification

### 7.1 Design Rationale

Typography communicates professionalism before personality. The selected typefaces establish a premium, legible reading experience that signals executive-level credibility.

### 7.2 Font Families

| Context          | Font Family    | Weight Range   | Source           |
|------------------|----------------|----------------|------------------|
| English Headings | Manrope        | 600, 700, 800  | Google Fonts     |
| English Body     | Inter          | 400, 500, 600  | Google Fonts     |
| Arabic (all)     | Alexandria     | 400, 500, 700  | Google Fonts     |

**Rules:**
- Only these three font families may be used in the project
- No decorative, script, or display fonts
- Font files must be loaded efficiently — use `font-display: swap`
- When Arabic is active, Alexandria is used for **all** text — headings and body alike

### 7.3 Type Scale

All font sizes are defined as CSS Custom Properties using a structured scale:

```css
:root {
  /* Display — Hero headline only */
  --text-display:  clamp(2.5rem, 5vw, 4rem);      /* ~40px–64px */

  /* Headings */
  --text-h1:       clamp(2rem, 4vw, 3rem);          /* ~32px–48px */
  --text-h2:       clamp(1.5rem, 3vw, 2.25rem);     /* ~24px–36px — Section headings */
  --text-h3:       clamp(1.25rem, 2vw, 1.5rem);     /* ~20px–24px — Card headings    */
  --text-h4:       1.125rem;                          /* 18px — Subheadings            */

  /* Body */
  --text-body-lg:  1.125rem;                          /* 18px — Lead paragraphs        */
  --text-body:     1rem;                              /* 16px — Default body copy      */
  --text-body-sm:  0.875rem;                          /* 14px — Captions, labels       */
  --text-caption:  0.75rem;                           /* 12px — Metadata, fine print   */
}
```

### 7.4 Line Height System

```css
:root {
  --leading-tight:   1.2;   /* Display headings                              */
  --leading-snug:    1.35;  /* Section headings, card headings               */
  --leading-normal:  1.6;   /* Default body text                             */
  --leading-relaxed: 1.75;  /* Arabic body text (increased for readability)  */
}
```

### 7.5 Font Weight Rules

| Usage                              | Weight      |
|------------------------------------|-------------|
| Display / Hero headline            | 800         |
| Section headings (h2)              | 700         |
| Card headings (h3)                 | 600 or 700  |
| Subheadings, emphasized labels     | 600         |
| Body copy                          | 400         |
| Secondary / caption text           | 400         |
| Navigation links                   | 500         |
| Buttons                            | 600         |

### 7.6 Typography Hierarchy Rules

- There must be exactly **one `<h1>`** per page — the hero headline
- Section headings use `<h2>`
- Card and sub-section headings use `<h3>`
- Subheadings within cards use `<h4>` or `<p>` with strong styling
- **No heading level may be skipped** — hierarchy must be sequential
- Text color must never conflict with background color at a contrast ratio below WCAG AA

### 7.7 Arabic Typography Adjustments

When the language is Arabic (`lang="ar"`):

- `direction: rtl` is applied to the root `<html>` element
- Font family switches to Alexandria for all text
- Line height increases to `--leading-relaxed` (1.75) for improved Arabic readability
- Letter spacing is set to 0 (Arabic script does not benefit from letter-spacing)
- Text alignment defaults to right
- All flexbox layouts with directional meaning must use logical CSS properties (`margin-inline-start` instead of `margin-left`, etc.)

---

## 8. Spacing & Layout System Specification

### 8.1 Spacing Scale

The project uses an **8px base spacing system**. All margin, padding, and gap values must be multiples of 8px. Exceptions at 4px increments are permitted only for micro-spacing within tight components.

```css
:root {
  --space-1:   4px;    /* Micro — icon-to-label gap, inline tight spacing   */
  --space-2:   8px;    /* XS — tight internal component padding             */
  --space-3:   12px;   /* SM — compact component padding                    */
  --space-4:   16px;   /* MD — standard component padding                   */
  --space-5:   20px;   /* Standard gap between related elements             */
  --space-6:   24px;   /* LG — card padding, section internal spacing       */
  --space-8:   32px;   /* XL — between components in a section              */
  --space-10:  40px;   /* 2XL — generous component separation               */
  --space-12:  48px;   /* Section padding top/bottom on mobile              */
  --space-16:  64px;   /* Section padding top/bottom on tablet              */
  --space-20:  80px;   /* Section padding top/bottom on desktop             */
  --space-24:  96px;   /* Section padding top/bottom on large desktop       */
}
```

### 8.2 Container Width

```css
:root {
  --container-max:     1200px;                      /* Maximum content width — approved project decision */
  --container-padding: clamp(1rem, 5vw, 2rem);      /* Responsive horizontal padding                    */
}
```

**Rules:**
- All page content must be constrained to `--container-max` (1200px maximum)
- The container centers horizontally with `margin-inline: auto`
- Container padding scales fluidly between 1rem and 2rem using `clamp`
- No section content may bleed outside the container except intentional full-bleed backgrounds (hero background image, section background fills)

### 8.3 Section Padding

All page sections must apply consistent vertical padding:

| Breakpoint       | Section Padding (top and bottom each) |
|------------------|---------------------------------------|
| Mobile (< 768px) | `--space-12` (48px)                   |
| Tablet (768px+)  | `--space-16` (64px)                   |
| Desktop (1024px+) | `--space-20` (80px)                  |
| Large (1280px+)  | `--space-24` (96px)                   |

### 8.4 Grid System

Layouts are built with **CSS Grid** and **Flexbox** — no third-party grid library.

**Grid rules:**
- Section grids use `grid-template-columns` with `repeat(auto-fit, minmax(..., 1fr))` for responsive columns
- Fixed column counts are specified per section and per breakpoint in Part 2 of this Blueprint
- Grid gaps follow the spacing scale: `--space-6` (24px) or `--space-8` (32px) for card grids

**Flexbox rules:**
- Use logical properties (`gap`, `flex-wrap`, `align-items`, `justify-content`) for RTL compatibility
- Do not use `margin-left` or `margin-right` for flex item separation — use `gap`

---

## 9. Animation System Specification

### 9.1 Design Rationale

Animations in this project exist exclusively to **support content comprehension and reinforce perceived quality**. Motion must never become the primary experience. Every animation is subordinate to the content it reveals.

### 9.2 Primary Library

**Framer Motion** is the only approved animation solution. No CSS `@keyframes` animations of equivalent complexity, no GSAP, no AOS, no ScrollReveal.

Minor CSS transitions (color, opacity, transform on hover) are permitted and preferred for micro-interactions that do not require scroll-triggered behavior.

### 9.3 Approved Animation Types

| Animation Type           | Use Case                                                     |
|--------------------------|--------------------------------------------------------------|
| Fade in                  | All scroll-triggered section reveals                         |
| Slide up (Y-axis, small) | Cards and content blocks entering view — max 24px movement   |
| Stagger children         | Lists of cards, timeline items — 0.1s delay between items    |
| Opacity transition       | Hover states, language switches, tab transitions             |
| Gentle scale             | Hover on cards — max scale(1.02), not exceeding scale(1.05)  |

### 9.4 Animation Timing Standards

```js
// Approved timing constants — use these values consistently

export const ANIMATION_DURATION = {
  fast:   0.3,   // Hover transitions, micro-interactions
  normal: 0.5,   // Scroll-triggered reveals, content entry
  slow:   0.6,   // Hero entrance, major section transitions
};

export const ANIMATION_EASING = {
  default: [0.25, 0.1, 0.25, 1.0],    // Standard ease — content reveals
  enter:   [0, 0, 0.2, 1.0],           // Ease out — elements entering
  exit:    [0.4, 0, 1, 1.0],           // Ease in — elements leaving
};
```

### 9.5 Reusable Animation Variants

All Framer Motion animation variants must be defined as shared, importable objects in `src/utils/animations.js`. Section components import and apply these variants — they do not define their own ad-hoc motion values.

```js
// src/utils/animations.js — Canonical animation variant definitions

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
};

export const staggerContainerMedium = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export const staggerContainerNormal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};
```

### 9.6 Scroll-Triggered Animation Rules

- Use Framer Motion's `whileInView` prop for all scroll-triggered animations
- Set `viewport={{ once: true }}` — elements animate in once and do not re-animate on scroll back
- Set `viewport={{ amount: 0.2 }}` — trigger when 20% of the element is visible
- Never trigger animation before any part of the element is in view

### 9.7 Reduced Motion Requirement

All animations must respect the `prefers-reduced-motion` media query.

**Implementation rule:** Use Framer Motion's built-in `useReducedMotion` hook sourced from `framer-motion`. When `useReducedMotion()` returns `true`, pass `reducedMotion="user"` to motion components or conditionally disable transition properties so elements render immediately at their final state with no transition.

```js
// src/hooks/useReducedMotion.js
// Re-export Framer Motion's built-in hook for consistent usage across the project
export { useReducedMotion } from 'framer-motion';
```

### 9.8 Prohibited Animations

The following motion patterns are explicitly prohibited by project decision and must never be implemented:

| Prohibited Pattern               | Reason                                                               |
|----------------------------------|----------------------------------------------------------------------|
| Bounce easing                    | Reduces professionalism, feels consumer-grade                        |
| Rotation animations              | Distracting, inappropriate for executive context                     |
| Heavy scaling (above scale 1.05) | Creates visual instability                                           |
| Infinite floating / looping      | Highly distracting, violates "calm visual rhythm" principle          |
| Heavy parallax                   | Performance cost, vestibular disturbance risk                        |
| Simultaneous full-page animation | Overwhelming, reduces perceived quality                              |
| Continuous pulsing               | Distracts from content focus                                         |

---

## 10. Internationalization (i18n) Specification

### 10.1 Supported Languages

| Language | Code | Direction | Font            |
|----------|------|-----------|-----------------|
| English  | `en` | LTR       | Manrope + Inter |
| Arabic   | `ar` | RTL       | Alexandria      |

### 10.2 i18n Library

**react-i18next** is the approved internationalization library.

Configuration file: `src/i18n.js`

### 10.3 Translation File Structure

```json
// src/locales/en/translation.json — structure example

{
  "nav": {
    "home":         "Home",
    "about":        "About",
    "expertise":    "Areas of Expertise",
    "experience":   "Experience",
    "certificates": "Courses & Certificates",
    "contact":      "Contact"
  },
  "hero": {
    "headline":    "",
    "subheadline": "",
    "cta_primary": "Contact Me"
  },
  "about":        {},
  "expertise":    {},
  "experience":   {},
  "certificates": {},
  "contact":      {},
  "footer":       {}
}
```

Translation files are namespaced by section. Each section has its own key namespace within the single `translation.json` file.

### 10.4 RTL/LTR Implementation Rules

- The `lang` attribute of the `<html>` element must be dynamically updated on language change (`lang="en"` or `lang="ar"`)
- The `dir` attribute of the `<html>` element must be dynamically updated (`dir="ltr"` or `dir="rtl"`)
- All layout components must use **CSS logical properties** (`padding-inline-start`, `margin-inline-end`, `border-inline-start`, etc.) to ensure correct RTL/LTR mirroring without duplicated CSS rules
- Flexbox layouts switch direction automatically via `direction: rtl` on the root element
- Icons that carry directional meaning (arrows, chevrons, back/forward indicators) must be mirrored in RTL via CSS `transform: scaleX(-1)` or via direction-aware conditional rendering
- Text alignment must not be hardcoded as `text-align: left` — use `text-align: start` for start-of-line alignment

### 10.5 Language Switching

- Language state is managed via react-i18next's `useTranslation` hook and `i18n.changeLanguage()` method
- Language preference is persisted in `localStorage` under the key `preferred_language`
- On first visit, default language is **English** (`en`) unless the browser's `navigator.language` begins with `ar`, in which case Arabic is pre-selected
- Language switching must not trigger a page reload — it is an in-place update
- All text must transition smoothly without layout breakage in either language

### 10.6 Content Parity Rule

Every text string displayed in English must have a corresponding Arabic translation. No section may be partially translated. If a translation is unavailable, the key must still exist in `ar/translation.json` with a placeholder value marked `"(Pending Translation)"`.

---

## 11. Responsive Design Specification

### 11.1 Strategy

**Mobile-first.** All base CSS is written for the smallest supported viewport. Larger breakpoints progressively enhance the layout.

### 11.2 Breakpoint System

```
xs:  < 480px   — Small mobile    (base — no media query needed)
sm:  >= 480px  — Large mobile
md:  >= 768px  — Tablet
lg:  >= 1024px — Laptop / small desktop
xl:  >= 1280px — Desktop
2xl: >= 1536px — Large desktop
```

All media queries in the project must reference only these breakpoint thresholds. Ad-hoc breakpoints at arbitrary pixel values are prohibited.

### 11.3 Layout Behavior Per Breakpoint

| Section         | Mobile (base)          | Tablet (md)           | Desktop (lg+)             |
|-----------------|------------------------|-----------------------|---------------------------|
| Navbar          | Collapsed hamburger    | Collapsed hamburger   | Full horizontal nav       |
| Hero            | Single column          | Single column         | Single column (full-screen)|
| About           | Single column          | Two columns           | Two columns               |
| Expertise       | 1 column               | 2 columns             | 3–4 columns (grid)        |
| Experience      | Single column timeline | Single column         | Two-column timeline       |
| Certificates    | 1 column               | 2 columns             | 3 columns (regular grid)  |
| Contact         | Single column          | Two columns           | Two columns               |
| Footer          | Stacked                | Multi-column          | Multi-column              |

Detailed column specifications per section are defined in Part 2 of this Blueprint.

### 11.4 Responsive Typography

All heading sizes use `clamp()` — see Section 7.3. Body text remains at a fixed `1rem` (16px) minimum to preserve readability. Body text must never be reduced below 16px at any viewport width.

### 11.5 Touch Target Rules

- All interactive elements (buttons, navigation links, icon buttons) must have a minimum touch target size of **44px × 44px**
- Spacing between tappable elements must be at minimum **8px** to prevent mis-taps
- Mobile navigation must use a hamburger menu icon with an adequate hit area

### 11.6 No Fixed Dimensions Rule

No layout component may use fixed pixel dimensions for its width or height in a way that prevents fluid scaling. Components must use `max-width`, `min-height`, and fluid units (`%`, `vw`, `vh`, `rem`, `em`, `clamp()`).

---

## 12. Accessibility Specification

### 12.1 Standard

The project must meet **WCAG 2.1 Level AA** as a minimum. This is a non-negotiable requirement.

### 12.2 Keyboard Navigation

- All interactive elements must be reachable via keyboard `Tab` navigation
- Logical tab order must follow the visual reading order
- Mobile menu (when open) must trap focus within the open menu and return focus to the trigger button on close
- Custom interactive components (language switcher, mobile nav toggle) must implement full keyboard support (`Enter`, `Space`, `Escape`, arrow keys where applicable)

### 12.3 Focus States

- **All focusable elements must have a visible focus indicator** — the default browser outline may not be removed without a clearly visible replacement
- The focus ring must be clearly visible against both light and dark backgrounds
- Recommended implementation: `outline: 2px solid var(--color-accent); outline-offset: 2px;`

### 12.4 Screen Reader Support

- All images must have descriptive `alt` attributes — never empty except for purely decorative images (which must include `alt=""` and `role="presentation"`)
- All icon-only interactive elements must include an `aria-label`
- Page sections must use semantic HTML landmark elements: `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`
- Each `<section>` must include an `aria-labelledby` attribute pointing to its section heading ID

### 12.5 Color Contrast Requirements

| Text Type                           | Minimum Contrast Ratio | Applies To                         |
|-------------------------------------|------------------------|------------------------------------|
| Body text (small, below 18px)       | 4.5:1                  | `--color-text-primary` on `--color-background` |
| Large text (18px+ regular, 14px+ bold) | 3:1                 | All heading colors on all backgrounds |
| UI components and focus indicators  | 3:1                    | `--color-accent` on all backgrounds |

### 12.6 Semantic HTML Requirements

| Element           | Required Usage                                                              |
|-------------------|-----------------------------------------------------------------------------|
| `<header>`        | Wrapping the Navbar section                                                 |
| `<nav>`           | The navigation link list within the Navbar                                  |
| `<main>`          | Wrapping all page sections from Hero to Contact                             |
| `<section>`       | Each individual page section (Hero, About, Expertise, Experience, etc.)    |
| `<footer>`        | The Footer section                                                          |
| `<h1>`            | Single instance — Hero headline only                                        |
| `<h2>`            | Each section's primary heading                                              |
| `<h3>`            | Card headings, subsection headings                                          |
| `<ul>` / `<ol>`   | Navigation link lists, expertise lists, certificate grids                  |
| `<address>`       | Contact information block in the Contact section                            |
| `<time>`          | Date values in the Experience timeline                                      |

---

## 13. Performance Specification

### 13.1 Performance Philosophy

Performance is a first-class feature. A fast-loading site directly supports user trust and the professional first impression that is central to the project's purpose. Performance optimizations are not optional enhancements — they are core requirements.

### 13.2 Core Web Vitals Targets

| Metric                                | Target          |
|---------------------------------------|-----------------|
| Largest Contentful Paint (LCP)        | ≤ 2.5 seconds   |
| Cumulative Layout Shift (CLS)         | ≤ 0.1           |
| Interaction to Next Paint (INP)       | ≤ 200ms         |
| First Contentful Paint (FCP)          | ≤ 1.8 seconds   |

### 13.3 Image Optimization Requirements

- All images must be provided in **WebP** format as the primary format, with JPEG/PNG as fallback via `<picture>` element
- Hero background image must be the largest asset — it must be compressed to below **200KB** without perceptible quality loss
- Portrait image in the About section must not exceed **100KB** in WebP format
- Certificate images must not exceed **150KB** each in WebP format
- All `<img>` elements must include explicit `width` and `height` attributes to prevent CLS
- Non-critical images (below the fold) must use `loading="lazy"`
- The hero background image must use `loading="eager"` and `fetchpriority="high"`

### 13.4 Font Loading Optimization

- Google Fonts are loaded via `<link rel="preconnect">` and `<link rel="preload">` in `index.html`
- `font-display: swap` is set for all custom font faces
- Only the required font weights are loaded — no full font family downloads
- Required weights per family: Manrope 600, 700, 800 — Inter 400, 500, 600 — Alexandria 400, 500, 700

### 13.5 JavaScript Bundle Rules

- No library may be introduced that is not in the approved stack
- All sections below the fold must be **lazy-loaded** using React's `React.lazy()` and `Suspense`
- Framer Motion is tree-shaken by only importing used named exports
- No analytics, tracking scripts, or third-party embeds may be added without explicit approval

### 13.6 CSS Performance Rules

- No CSS-in-JS solution — all styles are static CSS files, pre-built at compile time
- No unused CSS — component-scoped CSS Modules ensure style encapsulation and eliminate dead styles
- Critical CSS (tokens, reset, base) is imported at the top of `main.jsx` to ensure it loads first

---

## 14. SEO Specification

### 14.1 SEO Philosophy

SEO is built into the project from the start, not added as an afterthought. The SEO strategy focuses on **healthcare industry expertise** — not clinical medical services. The client is positioned as a healthcare business professional.

### 14.2 HTML Head Requirements

The `index.html` file must contain the following in the `<head>`:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="(Pending Decision)" />
<meta name="keywords" content="(Pending Decision)" />
<meta name="author" content="(Pending Decision — client full name)" />
<meta property="og:title" content="(Pending Decision — client name and title)" />
<meta property="og:description" content="(Pending Decision)" />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:url" content="(Pending Decision — domain not specified)" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="(Pending Decision — domain not specified)" />
```

> **(Pending Decision):** The client's full name, professional title as it should appear in SEO metadata, target domain URL, meta description content, and keyword targets are not specified in `project-context.md`. These must be provided before the `index.html` head is finalized. The structural placeholder above is complete and ready to receive content.

### 14.3 Heading Hierarchy for SEO

As specified in Section 7.6, only one `<h1>` exists per page. The `<h1>` is the hero headline — the most prominent, indexable statement of professional identity. All section headings are `<h2>`, making them discoverable as top-level content sections by search engines.

### 14.4 Structured Data

JSON-LD structured data is implemented as a static `<script type="application/ld+json">` tag in `index.html`, placed immediately before the closing `</head>`. A placeholder JSON-LD block using the `Person` schema is included during development; client data populates it before production deployment. No additional library is required.

### 14.5 Image Alt Text Standards

All images must have alt text that:
- Describes the content accurately and specifically
- Does not begin with "Image of" or "Photo of"
- For certificate images: includes the certificate title and issuing organization
- For the portrait image: states the client's name and professional context

### 14.6 URL & Anchor Structure

As a single-page application with section-based navigation:

- `https://[domain]/` — The single page root
- `https://[domain]/#about` — About section anchor
- `https://[domain]/#expertise` — Expertise section anchor
- `https://[domain]/#experience` — Experience section anchor
- `https://[domain]/#certificates` — Certificates section anchor
- `https://[domain]/#contact` — Contact section anchor

Section `id` attributes must match exactly: `hero`, `about`, `expertise`, `experience`, `certificates`, `contact`

---

## 15. Component Architecture Specification

### 15.1 Component Design Principles

Every component must satisfy the following principles:

| Principle            | Implementation Rule                                                             |
|----------------------|---------------------------------------------------------------------------------|
| Single Responsibility | Each component has one clear, documented purpose                               |
| Reusability          | Generic components accept props for customization — not hard-coded content     |
| Isolation            | Components do not reference or manipulate sibling or parent component state    |
| Composability        | Composite components are built by combining primitive components               |
| Translation-ready    | All text content comes from i18n hooks or props — never hardcoded strings      |
| Accessibility-first  | Semantic HTML structure and ARIA attributes are part of the initial implementation |

### 15.2 Required Global Components

The following components are required across the project and must be built as reusable primitives:

#### `SectionHeader` Component

- **Purpose:** Renders the standard heading block used at the top of each page section
- **Props:** `titleKey` (i18n key), `subtitleKey` (i18n key, optional), `alignment` (`center` | `start`), `theme` (`"light"` | `"dark"`, default `"light"`)
- **Contains:** Optional accent label text, `<h2>` heading with section `id`, optional subtitle paragraph
- **Constraints:** Must apply consistent spacing below the header before section body content (`margin-block-end: var(--space-10)` on desktop, `var(--space-8)` on mobile/tablet)

#### `Button` Component

- **Purpose:** Primary interactive CTA element
- **Variants:** `primary` (filled accent background, white text), `secondary` (transparent bg, `--color-accent` border+text), `ghost` (transparent bg, `--color-text-primary` text)
- **Props:** `variant`, `href` (for anchor link behavior), `onClick`, `children`, `icon` (optional Lucide icon component), `aria-label`
- **Constraints:** Minimum touch target height of 44px, keyboard focusable, focus indicator visible
- **States:** 
  - `primary`: Hover (10% darker accent bg), Disabled (50% opacity, `cursor: not-allowed`)
  - `secondary`: Hover (`--color-accent` bg at 10% opacity), Disabled (50% opacity, `cursor: not-allowed`)
  - `ghost`: Hover (`--color-hover` bg), Disabled (50% opacity, `cursor: not-allowed`)
- **Transitions:** `background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease`

#### `Card` Component

- **Purpose:** Standard elevated content container
- **Variants:** `default` (white surface, border, shadow-sm), `flat` (no shadow, border only)
- **Props:** `variant`, `children`, `className` (for extension without overriding base styles)
- **Constraints:** Must use `--radius-md`, `--shadow-sm`, `--color-surface`, and `--color-border` tokens
- **Hover State:** Base CSS Module includes hover transition `transition: box-shadow 0.25s ease, background-color 0.25s ease`. Resting shadow is `--shadow-sm`; on `:hover`, shadow elevates to `--shadow-md` and background shifts to `--color-hover`. Section-level CSS Modules do not re-declare this behavior.

#### `Container` Component

- **Purpose:** Content width constraint wrapper
- **Props:** `children`, `className`
- **Behavior:** `max-width: var(--container-max)`, `padding-inline: var(--container-padding)`, `margin-inline: auto`

#### `LanguageSwitcher` Component

- **Purpose:** Toggle between English and Arabic languages
- **Behavior:** Calls `i18n.changeLanguage()`, updates `<html lang>` and `<html dir>` attributes, persists selection to `localStorage`
- **Accessibility:** Must render as a `<button>` element with `aria-label` provided in both supported languages

### 15.3 Section Component Requirements

Every section component must:

1. Be wrapped in a `<section>` HTML element with a unique `id` attribute matching the nav anchor scheme
2. Include an `aria-labelledby` attribute referencing the `id` of its `<h2>` heading
3. Apply consistent section padding from the spacing system (see Section 8.3)
4. Import and use the `Container` component for content width constraint
5. Use translation strings exclusively via the `useTranslation()` hook — no hardcoded English text in JSX
6. Apply scroll-triggered entrance animations using Framer Motion `whileInView` with `viewport={{ once: true }}`
7. Import all animation variants from `src/utils/animations.js`

### 15.4 Data Layer Rules

Static content data (expertise areas, experience entries, certificate items) must live in `src/data/` as JavaScript modules that export arrays of typed objects.

**Expertise item structure:**

```js
{
  id:              string,   // Unique identifier
  iconName:        string,   // Lucide icon name (string for dynamic lookup)
  titleKey:        string,   // i18n key for the expertise title
  descriptionKey:  string    // i18n key for the expertise description
}
```

**Experience item structure:**

```js
{
  id:               string,  // Unique identifier
  period:           string,  // Human-readable date range — not translated (e.g., "2018–2022")
  startYear:        number,  // Numeric start year for programmatic sorting
  positionKey:      string,  // i18n key for job title / role
  organizationKey:  string,  // i18n key for organization name
  descriptionKey:   string   // i18n key for role description
}
```

**Certificate item structure:**

```js
{
  id:         string,  // Unique identifier
  imageFile:  string,  // Filename within src/assets/images/certificates/
  titleKey:   string,  // i18n key for certificate title
  issuerKey:  string,  // i18n key for issuing organization
  year:       number   // Numeric year of issue
}
```

---

## 16. Global Engineering Rules

These rules apply without exception to every file in the project:

1. **No inline styles for structural or visual properties.** Inline styles are only permitted for dynamic values managed programmatically by Framer Motion or JavaScript animation state.

2. **No hardcoded text strings in JSX.** All visible text must come from `useTranslation()` or be passed as a translated prop from a parent.

3. **No raw color hex values outside `tokens.css`.** All color references in component CSS files must use `var(--color-*)` tokens.

4. **No `margin-left` or `margin-right` for layout spacing.** Use `margin-inline-start`, `margin-inline-end`, or `gap` for RTL compatibility.

5. **No `text-align: left`.** Use `text-align: start` for start-of-line alignment.

6. **No library imports outside the approved stack.** CDN imports, npm installs, or dynamic `<script>` tags for unapproved libraries are prohibited.

7. **Every `<img>` must have `alt`, `width`, and `height` attributes.** No exceptions.

8. **Every interactive element must be keyboard accessible.** No exceptions.

9. **No `console.log` or debug statements in committed code.** Development logging must be removed before any code is finalized.

10. **Component files and folder names must follow the naming conventions** specified in Section 5.2.

11. **Each component must have exactly one co-located CSS file.** No component shares a CSS file with another component.

12. **CSS class names must be semantic and descriptive.** Generic names like `.wrapper`, `.box`, `.inner` are prohibited within component-specific CSS Modules.

---

## 17. Global Design Rules

These rules apply to every visible UI element in the project:

1. **Every UI element must serve a clear purpose.** Decorative-only elements without content or functional meaning are prohibited.

2. **Whitespace is intentional.** Generous spacing is a feature, not wasted space. Do not compress padding to fit more content.

3. **Visual hierarchy must be clear at a glance.** The most important element in any viewport must be visually dominant without requiring effort from the viewer.

4. **Accent color is a scarce resource.** `--color-accent` (`#14B8A6`) must appear at most once as the primary visual focus within any given viewport. It is not a general-purpose highlight color.

5. **Section alternation for readability.** Adjacent sections alternate between `--color-background` (`#F8FAFC`) and `--color-surface` (`#FFFFFF`) backgrounds to provide visual rhythm without color variation.

6. **Cards must be visually consistent within a section.** All cards in the same section use identical border-radius, shadow level, and internal padding. Card styles must not vary arbitrarily within a section.

7. **Icons are contextual aids, not decorations.** Every icon displayed alongside text must reinforce the meaning of that text. Icons without semantic purpose are prohibited.

8. **The client is not a practicing physician.** All content and visual decisions reflect a healthcare industry executive identity. No clinical or hospital-style visual language, no patient-care imagery.

9. **No glassmorphism panels.** The project explicitly prohibits large frosted-glass UI panels. Surface separation is achieved through shadow and border, not blur.

10. **Hover effects are minimal.** Hover state changes are limited to: background color shift to `--color-hover`, shadow elevation from `--shadow-sm` to `--shadow-md`, or subtle opacity change. No dramatic transforms on hover.

---

## 18. Prohibited Patterns

The following patterns are explicitly disallowed by project decision. Any implementation containing these patterns is non-compliant and must be revised:

### UI Prohibitions

| Prohibited Pattern                                     | Reason                                                    |
|--------------------------------------------------------|-----------------------------------------------------------|
| Generic portfolio layouts (skills bars, centered timelines) | Does not match premium executive identity             |
| Hospital or clinic website visual language             | Client is an industry executive, not a clinician          |
| Medical illustrations used as decoration               | Reduces professionalism, inappropriate for B2B context    |
| Heavy color gradients                                  | Conflicts with clean, minimal design philosophy           |
| Excessive box shadows                                  | Reduces premium feel, creates visual noise                |
| Large glassmorphism panels                             | Explicitly rejected by project decision                   |
| Unstructured or inconsistent spacing                   | Core design system violation                              |
| Random decorative elements without purpose             | Conflicts with minimalism principle                       |
| Presenting client as a practicing physician            | Incorrect client identity — violates brand guidelines     |

### Animation Prohibitions

| Prohibited Pattern                      | Reason                                              |
|-----------------------------------------|-----------------------------------------------------|
| Bounce easing on any element            | Consumer-grade feel, reduces credibility            |
| Continuous or infinite animations       | Distracts from content, violates calm rhythm        |
| Heavy parallax scrolling effects        | Performance cost, accessibility issues              |
| Rotation animations                     | Inappropriate, distracting                          |
| Scaling above `scale(1.05)` on hover   | Visually unstable                                   |
| Animating all elements simultaneously   | Overwhelming, reduces quality perception            |

### Development Prohibitions

| Prohibited Pattern                   | Reason                                                        |
|--------------------------------------|---------------------------------------------------------------|
| Inline styles for structural CSS     | Prevents theming, RTL support, and long-term maintainability  |
| Hardcoded English text in components | Breaks bilingual support requirement                          |
| Duplicate component definitions      | Maintenance burden, inconsistency risk                        |
| Over-engineered solutions            | Reduces readability, increases fragility                      |
| Unapproved npm dependencies          | Bundle bloat, security risk, maintenance burden               |
| Dead or unused code in production    | Maintenance burden, unnecessary bundle weight                 |
| Generic or non-semantic class names  | Makes CSS hard to trace and maintain                          |

---

## 19. Acceptance Criteria

The following criteria define a complete and correct implementation of the project's foundation (Part 1 scope):

### Design System Acceptance Criteria

- [ ] All 9 color tokens are defined in `src/styles/tokens.css` as CSS Custom Properties
- [ ] All shadow tokens (3 levels: sm, md, lg) are defined in `src/styles/tokens.css`
- [ ] All border-radius tokens (5 levels: sm, md, lg, xl, full) are defined in `src/styles/tokens.css`
- [ ] All spacing tokens (`--space-1` through `--space-24`) are defined in `src/styles/tokens.css`
- [ ] All typography tokens (font sizes, line heights) are defined in `src/styles/tokens.css`
- [ ] CSS reset is implemented in `src/styles/reset.css`
- [ ] Base typography defaults are applied in `src/styles/base.css`
- [ ] No raw color hex value exists in any component CSS file

### Typography Acceptance Criteria

- [ ] Manrope loaded for English headings at weights 600, 700, 800
- [ ] Inter loaded for English body at weights 400, 500, 600
- [ ] Alexandria loaded for Arabic at weights 400, 500, 700
- [ ] All heading font sizes use `clamp()` for responsive scaling
- [ ] `font-display: swap` applied to all font face declarations
- [ ] Exactly one `<h1>` element exists in the rendered page
- [ ] Heading hierarchy is sequential with no skipped levels

### i18n Acceptance Criteria

- [ ] Both `en/translation.json` and `ar/translation.json` exist with all section key namespaces
- [ ] Language switching updates `<html lang>` and `<html dir>` attributes synchronously
- [ ] Language preference is persisted to `localStorage` under key `preferred_language`
- [ ] No hardcoded text string exists in any JSX component file
- [ ] All layouts function correctly in both LTR (English) and RTL (Arabic) modes
- [ ] No CSS `margin-left`, `margin-right`, `text-align: left`, or `text-align: right` in layout-affecting rules

### Accessibility Acceptance Criteria

- [ ] All color combinations pass WCAG AA contrast ratio requirements (4.5:1 for body, 3:1 for large text)
- [ ] Keyboard-only navigation reaches every interactive element in logical tab order
- [ ] All images have appropriate `alt` attributes
- [ ] All icon-only buttons have descriptive `aria-label` attributes
- [ ] All sections use correct semantic HTML landmark elements
- [ ] Focus indicators are visible on all focusable elements
- [ ] All animations respect `prefers-reduced-motion`

### Performance Acceptance Criteria

- [ ] LCP ≤ 2.5 seconds on a simulated 4G connection
- [ ] CLS ≤ 0.1 (no layout shifts from late-loading assets)
- [ ] Hero background image ≤ 200KB (WebP format)
- [ ] Portrait image ≤ 100KB (WebP format)
- [ ] Certificate images ≤ 150KB each (WebP format)
- [ ] All below-fold images use `loading="lazy"`
- [ ] Google Fonts loaded with `preconnect` and limited to required weights only
- [ ] Production build passes Vite's tree-shaking with no unused CSS in component modules

### SEO Acceptance Criteria

- [ ] `index.html` contains all required meta tags (see Section 14.2) — pending client data filled in
- [ ] Open Graph image (`og-image.jpg`) exists in `/public`
- [ ] All page sections have valid `id` attributes matching the URL anchor scheme
- [ ] Heading hierarchy produces a valid document outline (one h1, sequential h2 per section)

### Component Architecture Acceptance Criteria

- [ ] `Container`, `Button`, `Card`, `SectionHeader`, and `LanguageSwitcher` components exist as reusable primitives
- [ ] No section component directly renders hardcoded content — all content sourced from data files or i18n
- [ ] All section components apply `whileInView` with `viewport={{ once: true }}` for scroll animations
- [ ] All Framer Motion animation variants are imported from `src/utils/animations.js`
- [ ] No ad-hoc animation values are defined inline within any component file

---

## 20. Future Scalability

The following considerations ensure the project remains extensible without architectural changes:

### Content Extensibility

The data layer in `src/data/` is structured as plain JavaScript arrays of objects. Adding a new expertise area, experience entry, or certificate requires only updating the relevant data file — no component modification is needed. The section components iterate over their data arrays generically.

### Visual Theme Extensibility

All design tokens are centralized in `src/styles/tokens.css`. A visual theme change (for example, a dark mode) requires only overriding token values within a CSS scope selector — no component-level CSS changes are needed. Dark mode, if added in the future, would be implemented by overriding all `--color-*` tokens under a `[data-theme="dark"]` attribute selector.

### Section Extensibility

New sections noted in `project-context.md` but not confirmed for initial implementation (Gallery, Testimonials) can be added to `src/sections/` and composed into `App.jsx` without modifying any other existing section. The section ordering is controlled by JSX composition order in `App.jsx` — reordering sections requires only reordering the component references.

### Language Extensibility

Adding a third language requires creating a new folder in `src/locales/` and updating the i18next configuration with the new language code. All component code remains unchanged. CSS logical properties ensure directional layout adapts automatically.

### Icon System Extensibility

Lucide React exports individual named icons — adding a new icon to any component has zero bundle cost impact for icons not already imported.

---

## 21. AI Implementation Notes

These notes are written specifically for AI assistants implementing this project. They enforce compliance with project decisions and prevent common failure patterns.

### Identity Enforcement

The client is a healthcare industry executive — not a doctor, not a clinician, not a hospital administrator. Every visual, textual, and interactive decision must reinforce an **executive corporate identity in the healthcare technology sector**.

- Do **not** generate hospital, clinic, or patient-care UI patterns
- Do **not** use medical cross symbols, EKG lines, stethoscopes, or hospital iconography as decorative elements
- Do **not** describe the client as "practicing" medicine — use "healthcare industry professional," "business partner," or "industry expert"
- Do **not** reference "patients" — use "partners," "clients," or "industry colleagues"

### Design System Compliance

- Every color reference in CSS **must** use a `var(--color-*)` token — never a raw hex value
- Every spacing value in CSS **must** use a `var(--space-*)` token — never a raw pixel value
- Every font size **must** use a `var(--text-*)` token — never a raw pixel or rem literal in component CSS
- Every shadow **must** use a `var(--shadow-*)` token
- Every border-radius **must** use a `var(--radius-*)` token

### Animation Compliance

- Every scroll-triggered animation **must** use `whileInView` with `viewport={{ once: true }}` — never `animate` without scroll context
- Animation variant objects **must** be imported from `src/utils/animations.js` — never defined inline within a component
- All animated components **must** include `prefers-reduced-motion` support via Framer Motion's built-in mechanisms

### i18n Compliance

- **Every visible text string in JSX must use `useTranslation()`** — no exceptions, no hardcoded English strings
- When creating new components, always reference text via `t('section.key')` — never render string literals directly
- RTL layout support **must** be verified in every component — all layouts must be tested in Arabic mode before completion

### Data Layer Compliance

- Content data **must** live in `src/data/` — never embedded within component JSX as literals
- Section components render from data arrays and i18n keys — they do not hard-code list items or descriptions

### React Hooks Compliance

- **Do NOT prematurely optimize** — explicitly prohibited from wrapping components in `React.memo` or wrapping callbacks/values in `useCallback` / `useMemo` unless specifically fixing a documented performance issue. The SPA is small enough that such optimizations create more overhead than value.

### Pre-Submission Compliance Checklist

Before any implementation is considered complete, verify:

1. No inline styles for visual properties
2. No hardcoded text strings in any JSX file
3. No raw hex color values outside `tokens.css`
4. No bounce, infinite, or heavy animations
5. No unapproved libraries imported
6. No hospital or clinical visual language
7. No decoration without semantic purpose
8. No glassmorphism panels
9. No heading level skipping
10. No `margin-left`, `margin-right`, `text-align: left`, or `text-align: right` in layout CSS
11. No fixed pixel widths or heights on layout containers
12. All images have `alt`, `width`, and `height` attributes

---

*End of Project Blueprint — Part 1*

---

**Document Metadata**

| Field                 | Value                                                                                    |
|-----------------------|------------------------------------------------------------------------------------------|
| Document              | project-blueprint-part-1.md                                                              |
| Version               | 1.0.0                                                                                    |
| Status                | Final — Approved for Implementation                                                      |
| Source Authority      | `docs/project-context.md` — Single Source of Truth                                      |
| Next Document         | `docs/blueprint/project-blueprint-part-2.md` — Section-by-Section Implementation Specifications |
| Pending Decisions     | Deployment/hosting platform, client full name for SEO, target domain URL, meta description and keywords content, JSON-LD structured data content |


# Project Blueprint — Part 2
## Section-by-Section Implementation Specification

**Document Version:** 1.0.0
**Status:** Final — Approved for Implementation
**Source of Truth:** `docs/project-context.md`
**Prerequisite:** `docs/blueprint/project-blueprint-part-1.md` must be read in full before this document
**Scope:** All page sections — structure, layout, content, interaction, animation, accessibility, and acceptance criteria

---

## Table of Contents

1. [Document Scope & Purpose](#1-document-scope--purpose)
2. [Page Architecture Overview](#2-page-architecture-overview)
3. [Section: Navbar](#3-section-navbar)
4. [Section: Hero](#4-section-hero)
5. [Section: About](#5-section-about)
6. [Section: Areas of Expertise](#6-section-areas-of-expertise)
7. [Section: Experience](#7-section-experience)
8. [Section: Courses & Certificates](#8-section-courses--certificates)
9. [Section: Contact](#9-section-contact)
10. [Section: Footer](#10-section-footer)
11. [Optional Future Sections](#11-optional-future-sections)
12. [Cross-Section Consistency Rules](#12-cross-section-consistency-rules)
13. [Section-Level Acceptance Criteria](#13-section-level-acceptance-criteria)

---

## 1. Document Scope & Purpose

### Scope

This document is **Part 2** of the Project Blueprint for the Dr. Salah Medical Portfolio website. It defines the complete implementation specification for every page section: structure, layout, component breakdown, content requirements, interaction behavior, animation rules, accessibility requirements, responsive behavior, and acceptance criteria.

This document does **not** contain:
- Source code
- Prompts or instructions directed at AI assistants without engineering context
- Repeated definitions of design tokens, typography scales, animation durations, or global rules already established in Part 1

This document **does** contain:
- Section-specific engineering decisions derived from `project-context.md`
- Layout and grid specifications per section and per breakpoint
- Component hierarchies for each section
- Content structure and data field requirements per section
- Interaction behavior and state specifications
- Section-level animation sequences
- Accessibility requirements specific to each section
- Acceptance criteria for each section individually

### Relationship to Part 1

Part 2 extends Part 1. All color tokens, spacing values, typography scales, animation variants, and global rules defined in Part 1 are binding in Part 2 without re-statement. When this document references `--color-accent`, `--space-8`, `fadeInUp`, or any other token or variant name, it is referencing the canonical definition in Part 1.

### Authority

This document is the third highest authority in the project:

```
project-context.md              → Highest authority (Single Source of Truth)
project-blueprint-part-1.md    → Foundation and design system
project-blueprint-part-2.md    → This document — section specifications
project-blueprint-part-3.md    → Content, data, and asset specifications
```

---

## 2. Page Architecture Overview

### 2.1 Confirmed Section Sequence

The approved website structure is a single vertical scroll with sections rendered in the following order:

| Order | Section Name           | Component        | HTML Element | Section ID        |
|-------|------------------------|------------------|--------------|-------------------|
| 1     | Navbar                 | `Navbar`         | `<header>`   | *(fixed, no id)*  |
| 2     | Hero                   | `Hero`           | `<section>`  | `hero`            |
| 3     | About                  | `About`          | `<section>`  | `about`           |
| 4     | Areas of Expertise     | `Expertise`      | `<section>`  | `expertise`       |
| 5     | Experience             | `Experience`     | `<section>`  | `experience`      |
| 6     | Courses & Certificates | `Certificates`   | `<section>`  | `certificates`    |
| 7     | Contact                | `Contact`        | `<section>`  | `contact`         |
| 8     | Footer                 | `Footer`         | `<footer>`   | *(no id needed)*  |

This sequence is approved and final. No section may be reordered without explicit project approval and a corresponding update to `project-context.md`.

### 2.2 Section Background Alternation

Adjacent sections alternate between the two approved neutral surface values to create visual rhythm without introducing new colors:

| Section                | Background              |
|------------------------|-------------------------|
| Hero                   | Full-bleed image (dark) |
| About                  | `--color-background`    |
| Areas of Expertise     | `--color-surface`       |
| Experience             | `--color-background`    |
| Courses & Certificates | `--color-surface`       |
| Contact                | `--color-primary`       |
| Footer                 | `--color-primary`       |

**Design Rationale:** The alternation between `#F8FAFC` and `#FFFFFF` creates a calm editorial rhythm. The Contact and Footer sections share `--color-primary` (dark navy) to create a deliberate visual terminus — a strong, confident close that anchors the page.

### 2.3 `<main>` Element Scope

The `<main>` landmark element wraps all sections from Hero through Contact (inclusive). The Navbar (`<header>`) and Footer (`<footer>`) are siblings of `<main>`, not children.

```
<body>
  <header>     ← Navbar
  <main>
    <section id="hero">
    <section id="about">
    <section id="expertise">
    <section id="experience">
    <section id="certificates">
    <section id="contact">
  </main>
  <footer>     ← Footer
</body>
```

### 2.4 Smooth Scroll Behavior

The `<html>` element must have `scroll-behavior: smooth` applied via CSS. Navigation links in the Navbar use `href="#section-id"` anchor targets to trigger smooth scrolling to the corresponding section. JavaScript-based scroll handling is not required unless a more controlled easing is needed for the mobile menu close behavior.

### 2.5 Gallery and Testimonials Status

The sections **Gallery** and **Testimonials** are referenced in `project-context.md` (Section 15) but are **not included** in the final approved website structure (Section 14 of `project-context.md`). Their implementation is not part of the current scope.

These sections are documented in Section 11 of this document as Optional Future Sections. They must not be built in the current phase.

---

## 3. Section: Navbar

### 3.1 Purpose

Provide simple, persistent, and intuitive navigation. The Navbar anchors the user's sense of position within the page and provides immediate access to the primary call-to-action.

### 3.2 Architecture Decision

The Navbar is a **sticky header** that remains fixed at the top of the viewport during scrolling. It uses `position: sticky; top: 0` with a `z-index` value that places it above all page content without conflicting with modals or overlays.

**Design Rationale:** Sticky navigation is approved by the project decision. It ensures the primary CTA (Contact Me) and language switcher are always accessible without requiring the user to scroll back to the top.

### 3.3 Layout Specification

The Navbar is a single horizontal bar spanning the full viewport width. Its internal content is constrained to the `Container` component (max 1200px).

**Desktop layout (min-width: 1024px):**

```
[ Logo / Name ]          [ Nav Links ]          [ Language Switch | CTA Button ]
  left-aligned            center or left          right-aligned
```

**Mobile layout (max-width: 1023px):**

```
[ Logo / Name ]                          [ Menu Icon ]
  left-aligned                            right-aligned
```

- The navigation links and action items collapse into a mobile menu triggered by the hamburger icon
- The mobile menu opens as a **full-width dropdown** below the Navbar. It must be fully keyboard accessible and focus-trapped while open.

### 3.4 Component Hierarchy

```
Navbar (section root — <header>)
  └── Container
        ├── NavLogo
        ├── NavLinks (desktop only — hidden on mobile)
        │     └── NavLink (× 6 — one per section)
        ├── NavActions (desktop only)
        │     ├── LanguageSwitcher
        │     └── Button (variant: primary — "Contact Me")
        └── MobileMenuToggle (mobile only)
              └── MobileMenu (rendered conditionally when open)
                    ├── NavLink (× 6)
                    ├── LanguageSwitcher
                    └── Button (variant: primary — "Contact Me")
```

### 3.5 Navigation Links

The approved navigation links correspond exactly to the confirmed sections:

| Display Text (English) | Display Text (Arabic)       | Anchor Target    |
|------------------------|-----------------------------|------------------|
| Home                   | (Pending Translation)       | `#hero`          |
| About                  | (Pending Translation)       | `#about`         |
| Areas of Expertise     | (Pending Translation)       | `#expertise`     |
| Experience             | (Pending Translation)       | `#experience`    |
| Courses & Certificates | (Pending Translation)       | `#certificates`  |
| Contact                | (Pending Translation)       | `#contact`       |

All link text must be sourced from `t('nav.*)` i18n keys. All anchor targets must match the `id` attributes on the corresponding section elements.

### 3.6 Active Link State

The active navigation link — the link corresponding to the section currently in view — must be visually distinguished from inactive links. The active state uses `--color-accent` as the text or underline color.

**Implementation rule:** Use an Intersection Observer to detect which section is currently in the viewport. The corresponding nav link receives the active class. This logic lives in a custom hook `useActiveSection.js` in `src/hooks/`.

### 3.7 Scroll State Behavior

The Navbar changes visual appearance when the user scrolls past the Hero section:

| State            | Background                                      | Shadow            |
|------------------|-------------------------------------------------|-------------------|
| At top of page   | Transparent or `--color-primary` with no shadow | None              |
| Scrolled down    | `--color-primary` (solid, fully opaque)         | `--shadow-lg`     |

The transition between states uses a CSS `transition` on `background-color` and `box-shadow` with a duration of `0.3s` ease.

**Implementation rule:** A boolean scroll state value (e.g., `isScrolled`) is managed in a custom hook `useScrollPosition.js`. The Navbar component applies a CSS class conditionally based on this value.

### 3.8 Primary CTA in Navbar

The Navbar contains a **Contact Me** button using the `Button` component at `variant="primary"`. This button scrolls to the `#contact` section.

On mobile, this button appears inside the mobile menu, not in the collapsed Navbar bar. The mobile Navbar bar contains only the logo and the hamburger toggle.

### 3.9 Navbar Height

| Breakpoint      | Navbar Height |
|-----------------|---------------|
| Mobile          | 64px          |
| Desktop         | 72px          |

All sections that require offset scroll positioning (e.g., when navigating to an anchor) must account for the Navbar height using a CSS `scroll-margin-top` value equal to the Navbar height.

```css
/* Applied to every section element */
section {
  scroll-margin-top: 72px; /* desktop */
}

@media (max-width: 1023px) {
  section {
    scroll-margin-top: 64px; /* mobile */
  }
}
```

### 3.10 Animation Behavior

- The Navbar itself **does not animate on initial page load** — it renders immediately in its final position
- The scroll state transition (background color and shadow) uses a CSS transition — not Framer Motion
- Mobile menu open/close uses a short opacity and vertical slide Framer Motion animation: `duration: 0.3`, easing: `enter` variant

### 3.11 Accessibility Requirements

- The `<header>` element contains a `<nav>` element wrapping all navigation links
- The `<nav>` element has `aria-label="Main navigation"`
- The mobile menu toggle button has `aria-expanded` attribute that reflects the menu open state
- The mobile menu toggle button has `aria-controls` pointing to the mobile menu element `id`
- The mobile menu has `aria-label="Mobile navigation"`
- When the mobile menu is open, focus is trapped within it — `Tab` and `Shift+Tab` cycle through focusable elements inside the menu only
- Pressing `Escape` closes the mobile menu and returns focus to the toggle button
- All nav links have descriptive accessible names matching their visible text

### 3.12 RTL Behavior

In RTL (Arabic) mode:
- The logo appears on the right
- The hamburger toggle appears on the left
- Nav links read right-to-left
- The CTA button appears on the left side of the desktop action group
- All directional spacing uses logical CSS properties

### 3.13 NavLogo Specification

- **Content:** Displays the client name as text (from `siteMetadata.clientName`), not an image logo
- **Styling:** Inherits Navbar typography but uses a distinct weight (e.g., semibold or bold) to stand out

---

## 4. Section: Hero

### 4.1 Purpose

Create immediate and lasting trust. The Hero is the first section seen by every visitor. It must communicate executive professionalism and healthcare industry identity within the first three seconds of viewing.

### 4.2 Architecture Decision

The Hero is a **full-screen section** — it occupies 100% of the viewport height (`min-height: 100vh`) with a full-bleed background image overlaid with a dark gradient. Content is vertically centered within the section.

**Design Rationale (from project-context.md):** The full-screen hero creates a premium first impression before scrolling. The dark gradient overlay ensures text readability against any background image. No portrait image is placed inside the hero — the visual focus is entirely on the headline and call-to-action.

### 4.3 Visual Layer Stack

The Hero renders as a layered composition. From bottom to top:

| Layer | Content                           | Visual Properties                                                  |
|-------|-----------------------------------|--------------------------------------------------------------------|
| 1     | Background image                  | `object-fit: cover`, full bleed, `fetchpriority="high"`, WebP      |
| 2     | Dark gradient overlay             | `background: linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)` (using `--color-primary` RGB values) — covers full section |
| 3     | Animated dot or grid pattern      | Subtle SVG or CSS pattern, very low opacity (5–10%), non-interactive |
| 4     | Text content and CTA              | Centered, high contrast against dark overlay                       |

**Note on gradient:** The dark overlay is defined as `linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)`. This ensures at minimum a 4.5:1 contrast ratio between the white headline text and the darkened background at the center and bottom, while allowing the image to show slightly at the top edge.

### 4.4 Background Image Specification

- **Content:** Professional healthcare technology scene — advanced medical devices, diagnostic imaging equipment, modern healthcare innovation environment
- **Format:** WebP (primary), JPEG (fallback via `<picture>`)
- **Size target:** Below 200KB (WebP compressed) — see Part 1, Section 13.3
- **Loading:** `loading="eager"`, `fetchpriority="high"` — this is above-the-fold content
- **Alt text:** Descriptive alt text describing the professional healthcare scene — never empty
- **Dimensions:** The image must have explicit `width` and `height` attributes to prevent CLS

> **(Pending Decision):** The actual hero background image has not been provided by the client and is not specified in `project-context.md`. A professionally sourced or AI-generated healthcare technology image must be approved before implementation. A placeholder must be used during development.

### 4.5 Animated Pattern Overlay

An animated subtle dot or grid pattern is rendered over the gradient overlay.

**Specification:**
- Pattern type: fine dot grid or subtle geometric line grid — (Pending Decision on exact pattern style)
- Opacity: 5% to 8% — barely perceptible, creates texture without distraction
- Animation: Very slow, gentle opacity pulse or minimal drift — maximum drift movement is 4px over 8 seconds, looping
- This is the **only** case where a slow looping animation is permitted — because it is extremely subtle background texture, not a content element
- The pattern must not interfere with text readability
- The pattern must be `aria-hidden="true"` and `role="presentation"` — it is purely decorative

> **(Pending Decision):** The exact visual pattern (dot grid, line grid, or similar) has not been specified in `project-context.md` beyond "Subtle animated dot/grid pattern overlay." Either a CSS-based pattern or a lightweight inline SVG pattern is acceptable. The pattern must remain imperceptible on low-contrast screens.

### 4.6 Content Specification

Hero content is centered horizontally and vertically within the section.

**Content elements (in DOM order):**

| Element           | Role                  | Typography Token        | Color                  |
|-------------------|-----------------------|-------------------------|------------------------|
| Eyebrow label     | Optional small label above headline — professional title or industry category | `--text-body-sm` — weight 500 | `--color-accent`       |
| Headline (`<h1>`) | Primary professional identity statement | `--text-display` — weight 800 | `#FFFFFF`              |
| Sub-headline      | Supporting professional context statement | `--text-body-lg` — weight 400 | `rgba(255,255,255,0.80)` |
| CTA Button        | Primary action — "Contact Me" | — | `Button` component, `variant="primary"` |

**Content rules:**
- The eyebrow label is optional — include it only if it adds meaningful context
- The headline is the only `<h1>` on the page — it identifies the client by name and professional identity
- The sub-headline provides a concise supporting statement about the client's expertise area
- No secondary CTA button — the project decision specifies a single primary CTA: "Contact Me"
- No scroll indicator — explicitly removed from project decisions
- No portrait photograph — explicitly excluded from the Hero section

> **(Pending Decision):** The headline text, sub-headline text, and eyebrow label text are content decisions that require client input. These cannot be specified in this Blueprint. They must be provided in `project-context.md` or Part 3 when client content is finalized.

### 4.7 Content Alignment

Hero text content is **centered horizontally** on all screen sizes. Text alignment is `text-align: center`. The CTA button is centered beneath the text block with `--space-8` (32px) top margin separating it from the sub-headline.

### 4.8 Layout Specification

```
Full viewport height section
  └── Centered content block (max-width: 800px, margin-inline: auto)
        ├── Eyebrow label (optional)
        ├── <h1> Headline
        ├── Sub-headline paragraph
        └── CTA Button (Contact Me)
```

The content block has `max-width: 800px` to prevent excessively wide line lengths on large desktop screens. This is separate from the global container `max-width: 1200px` — the hero text block is intentionally narrower for legibility and visual impact.

### 4.9 Animation Sequence

The hero content animates in on initial page load — not on scroll. Animations are staggered:

| Element        | Animation       | Delay   | Duration |
|----------------|-----------------|---------|----------|
| Eyebrow label  | `fadeIn`        | 0.2s    | 0.5s     |
| Headline       | `fadeInUp`      | 0.4s    | 0.6s     |
| Sub-headline   | `fadeInUp`      | 0.6s    | 0.5s     |
| CTA Button     | `fadeIn`        | 0.8s    | 0.5s     |
| Pattern overlay| CSS opacity transition | 0s | 1.2s (slow fade in) |

All animation variants are imported from `src/utils/animations.js`. The delay values are applied via the `transition.delay` property in Framer Motion — not via `setTimeout` or CSS animation delay.

When `prefers-reduced-motion` is active (detected via `useReducedMotion()`), all elements must render directly in their `visible` state, bypassing the `initial` state and transitions entirely.

### 4.10 Responsive Behavior

| Property               | Mobile               | Tablet (md)          | Desktop (lg+)         |
|------------------------|----------------------|----------------------|-----------------------|
| Section height         | `min-height: 100vh`  | `min-height: 100vh`  | `min-height: 100vh`   |
| Content max-width      | `100%` (padded)      | `640px`              | `800px`               |
| Headline size          | `--text-h1` (clamp)  | `--text-display` (clamp) | `--text-display` (clamp) |
| Vertical padding       | `--space-20` top + bottom (ensures clearance from sticky Navbar) | same | same |

### 4.11 Accessibility Requirements

- The `<section>` has `id="hero"` and `aria-labelledby` pointing to the `<h1>` element's ID
- Background image is in a CSS `background-image` property or an `<img>` with descriptive `alt` text
- If the background image is implemented via a CSS `background-image`, a visually hidden description of the image must be available to screen readers via an `aria-label` on the section or a hidden `<span>`
- The animated pattern overlay must have `aria-hidden="true"`
- White text on the dark overlay must meet WCAG AA 4.5:1 contrast — the gradient must be dark enough to ensure this at all viewport sizes

---

## 5. Section: About

### 5.1 Purpose

Introduce the client as a trusted, senior healthcare industry professional. Establish credibility through biography, professional mission, and core values. The narrative is industry-focused — not personal storytelling — and emphasizes years of experience, business partnerships, and contribution to advanced healthcare technologies.

### 5.2 Architecture Decision

The About section uses an **editorial two-column layout** on tablet and desktop. On mobile, it collapses to a single column with the portrait above the text content.

**Design Rationale:** The editorial two-column layout creates a professional, magazine-quality presentation that distinguishes this portfolio from standard resume-style designs. Portrait on one side, structured text narrative on the other — a pattern used by high-end executive and corporate biography pages.

### 5.3 Layout Specification

**Desktop and Tablet (md and above):**

```
┌──────────────────┬───────────────────────────────────┐
│                  │  Section heading (h2)              │
│  Portrait image  │  Biography paragraph(s)            │
│  (left column)   │  Mission statement                 │
│                  │  Core values list                  │
└──────────────────┴───────────────────────────────────┘
```

**Column proportions:**
- Portrait column: approximately 40% of container width
- Text column: approximately 60% of container width
- Gap between columns: `--space-8` (32px)

**RTL adjustment:** In Arabic mode, the portrait column switches to the right side and the text column to the left — handled automatically via CSS logical properties and `direction: rtl`.

**Mobile (below md):**

```
┌──────────────────────────────────────┐
│  Portrait image (full width block)   │
├──────────────────────────────────────┤
│  Section heading (h2)                │
│  Biography paragraph(s)             │
│  Mission statement                  │
│  Core values list                   │
└──────────────────────────────────────┘
```

### 5.4 Component Hierarchy

```
About (section root — <section id="about">)
  └── Container
        └── AboutGrid (two-column grid)
              ├── AboutPortraitColumn
              │     └── PortraitImage
              └── AboutContentColumn
                    ├── SectionHeader (titleKey: "about.title", alignment: "start")
                    ├── AboutBiography
                    │     └── Paragraph(s) — biography text
                    ├── AboutMission
                    │     ├── Label ("Mission" or equivalent)
                    │     └── Paragraph — mission statement
                    └── AboutValues
                          ├── Label ("Core Values" or equivalent)
                          └── ValuesList (unordered list of value items)
```

### 5.5 Portrait Image Specification

- **Format:** WebP (primary), JPEG (fallback)
- **Maximum file size:** 100KB (WebP compressed)
- **Alt text:** Client's name and professional title — e.g., "Dr. Salah — Senior Healthcare Industry Professional"
- **Display shape:** The portrait is displayed with `--radius-lg` (12px) border-radius — not circular, not square-cropped to a perfect circle
- **Shadow:** `--shadow-md` applied to the portrait container
- **Dimensions:** Must have explicit `width` and `height` attributes
- **Loading:** `loading="lazy"` — the portrait is below the fold

> **(Pending Decision):** The professional portrait photograph has not been provided by the client. A placeholder must be used during development. The portrait must be a professional photograph — not an AI-generated likeness — approved by the client before implementation.

### 5.6 Content Blocks

#### Biography

A professional narrative paragraph or set of short paragraphs introducing the client. Content must:
- Be written in an authoritative third-person voice (e.g., "Dr. Salah has led...")
- Emphasize **years of industry experience** — specific number of years if provided by client
- Reference **business partnerships** and corporate relationships
- Reference **contribution to advanced healthcare technologies**
- Be industry-focused — not personal life storytelling
- Not describe the client as a practicing physician

> **(Pending Decision):** The biography text content is not provided in `project-context.md`. This is a content decision requiring client input. Content must be provided in both English and Arabic.

#### Mission Statement

A concise statement of professional mission — typically one to two sentences. This is the client's articulated professional purpose and direction.

> **(Pending Decision):** The mission statement text is not provided in `project-context.md`. This requires client input in both languages.

#### Core Values

A structured short list of professional values. Each value is a word or short phrase — not a sentence.

- Rendered as an `<ul>` list with subtle visual styling
- Each value item may optionally include a Lucide icon decorating it — chosen contextually, not randomly
- Maximum 6 values displayed
- Values must reflect the brand personality attributes: Professionalism, Trust, Precision, Care, Simplicity, Confidence, Modernity

> **(Pending Decision):** The exact values list is not provided in `project-context.md`. This requires client input.

### 5.7 Section Header

The `SectionHeader` component is placed at the top of the text column (not centered above the two-column layout). The `alignment` prop is set to `"start"` — the heading is left-aligned (or right-aligned in Arabic) relative to the text column.

### 5.8 Animation Sequence

All About section animations are scroll-triggered (`whileInView`, `viewport={{ once: true, amount: 0.2 }}`):

| Element               | Animation         | Stagger Delay |
|-----------------------|-------------------|---------------|
| Portrait image        | `fadeIn`          | 0s            |
| Section heading       | `fadeInUp`        | 0.1s          |
| Biography             | `fadeInUp`        | 0.2s          |
| Mission block         | `fadeInUp`        | 0.3s          |
| Core values list      | `staggerContainer` (children `fadeInUp`) | 0.4s base, 0.08s per item |

All variants imported from `src/utils/animations.js`.

### 5.9 Responsive Behavior

| Property              | Mobile             | Tablet (md)         | Desktop (lg+)        |
|-----------------------|--------------------|---------------------|----------------------|
| Layout                | Single column      | Two columns         | Two columns          |
| Portrait width        | 80% (xs), 70% (sm), centered | 40% of column | 40% of column    |
| Column gap            | N/A (stacked)      | `--space-8`         | `--space-10`         |
| Section background    | `--color-background` | same             | same                 |

### 5.10 Accessibility Requirements

- Section `aria-labelledby` references the `<h2>` heading ID
- Portrait `<img>` has a descriptive `alt` attribute
- Core values `<ul>` has an accessible label (either via heading or `aria-label`)
- The Biography, Mission, and Values sections are semantically separated — consider `<article>` or `<div>` with meaningful role context

---

## 6. Section: Areas of Expertise

### 6.1 Purpose

Present the client's specialized healthcare industry sectors clearly and with easy visual scanning. The section communicates domain expertise across eight distinct healthcare and medical technology areas.

### 6.2 Architecture Decision

The Areas of Expertise section uses an **Editorial Grid** layout. This is explicitly different from traditional service card layouts (which are prohibited by project decision).

**Design Rationale:** An editorial grid presents expertise areas as structured, equal-weight items — conveying that each area is a genuine competency, not a listed service. The grid format allows fast visual scanning appropriate for the B2B corporate audience.

### 6.3 Editorial Grid Definition

An "Editorial Grid" in this context means:

- A CSS Grid with equal-width, equal-height cells
- Each cell contains an icon, a short title, and a very brief description
- No decorative accents or hover-heavy effects
- Clean, well-padded items with consistent internal spacing
- Items do NOT function as clickable links — they are informational
- Visual differentiation is achieved through typography weight, icon, and whitespace — not through color variation or decorative frames

This is **not** a traditional service card with heavy shadows, colored top borders, or CTA buttons. Items in this grid must feel like editorial category labels, not marketing tiles.

### 6.4 Expertise Areas

The eight confirmed expertise areas from `project-context.md`:

| ID | Expertise Area                               | Lucide Icon Suggestion |
|----|----------------------------------------------|------------------------|
| 1  | Interventional Cardiology Supplies           | (Pending Decision)     |
| 2  | Interventional Radiology Solutions           | (Pending Decision)     |
| 3  | Neurointerventional (Brain & Nervous System) Products | (Pending Decision) |
| 4  | Diagnostic Imaging Solutions                 | (Pending Decision)     |
| 5  | Modern Image-Guided Treatment Technologies   | (Pending Decision)     |
| 6  | Medical Devices Import & Export              | (Pending Decision)     |
| 7  | Medical Equipment                            | (Pending Decision)     |
| 8  | Cosmetic Equipment & Products                | (Pending Decision)     |

> **(Pending Decision):** The specific Lucide React icons to be used for each expertise area are not defined in `project-context.md`. Icon selections must be chosen for contextual relevance, not generic medical symbolism. No hospital cross, no EKG line, no stethoscope. Appropriate icons include those representing technology, precision, networks, imaging, and industry — selected from Lucide React's available set.

> **(Pending Decision):** The short description text for each expertise area (one to two sentences per item) is not provided in `project-context.md`. Content must be provided by the client in both English and Arabic before implementation.

### 6.5 Layout Specification

**Desktop (lg+):**

Four columns — eight items fill two rows of four.

```
[ Item 1 ] [ Item 2 ] [ Item 3 ] [ Item 4 ]
[ Item 5 ] [ Item 6 ] [ Item 7 ] [ Item 8 ]
```

**Tablet (md):**

Two columns — eight items fill four rows of two.

```
[ Item 1 ] [ Item 2 ]
[ Item 3 ] [ Item 4 ]
[ Item 5 ] [ Item 6 ]
[ Item 7 ] [ Item 8 ]
```

**Mobile (base/xs):**

Single column — eight items stack vertically.

**Small Mobile (sm, 480px+):**

Two columns — eight items fill four rows of two.

**Grid gap:** `--space-6` (24px) on all breakpoints.

**Grid implementation:** CSS Grid with `grid-template-columns`. Column count specified explicitly per breakpoint via media queries — not `auto-fit` — because the exact count is defined.

### 6.6 Expertise Item Structure

Each expertise grid item contains:

| Sub-element     | Element       | Visual Rule                                                          |
|-----------------|---------------|----------------------------------------------------------------------|
| Icon            | Lucide icon   | Size 32px; color `--color-accent`; rendered in a small accent-tinted square container |
| Title           | `<h3>`        | `--text-h3`, weight 600, `--color-text-primary`                     |
| Description     | `<p>`         | `--text-body-sm`, weight 400, `--color-text-secondary`              |

**Icon container:** A small square container (`--radius-sm`, 48px × 48px) with a very light tint of `--color-accent` at 10% opacity as background — making the accent icon stand out without making the container dominant.

**Item padding:** `--space-6` (24px) on all sides.

**Item background:** `--color-surface` (white) with `--radius-md` border-radius and `--shadow-sm` shadow.

**Item border:** 1px solid `--color-border`.

**Hover state:** Background shifts to `--color-hover`, shadow lifts from `--shadow-sm` to `--shadow-md`. No transform or scale. Transition duration: 0.25s ease.

**Items are not clickable links.** No `href`, no `cursor: pointer`. Hover effect is a subtle background lift only.

### 6.7 Section Header

The `SectionHeader` component is centered above the grid. The `alignment` prop is `"center"`.

The section heading identifies this as the expertise section. Above the `<h2>` heading, a small accent label in `--color-accent` may be used — e.g., "Specializations" or equivalent. The `<h2>` text must come from the i18n key.

### 6.8 Animation Sequence

All animations are scroll-triggered:

| Element         | Animation           | Notes                                            |
|-----------------|---------------------|--------------------------------------------------|
| Section heading | `fadeInUp`          | Triggers when heading enters view                |
| Grid container  | `staggerContainer`  | Triggers when grid enters view                   |
| Each grid item  | `fadeInUp` (child)  | Stagger 0.07s per item — 8 items over ~0.56s total |

### 6.9 Responsive Behavior

| Property        | Mobile           | Tablet (md)       | Desktop (lg+)     |
|-----------------|------------------|-------------------|-------------------|
| Columns         | 1                | 2                 | 4                 |
| Item padding    | `--space-5`      | `--space-6`       | `--space-6`       |
| Section bg      | `--color-surface` | same             | same              |

### 6.10 Component Hierarchy

```
Expertise (section root — <section id="expertise">)
  └── Container
        ├── SectionHeader (titleKey: "expertise.title", alignment: "center")
        └── ExpertiseGrid (CSS Grid)
              └── ExpertiseItem (× 8 — rendered from data/expertise.js)
                    ├── ExpertiseIcon (Lucide icon in accent container)
                    ├── <h3> title
                    └── <p> description
```

### 6.11 Accessibility Requirements

- Section `aria-labelledby` references the `<h2>` heading ID
- Grid items are `<li>` elements within a `<ul>` — the list is labeled with the section heading context
- Accent icon containers are `aria-hidden="true"` — the icon is decorative; the `<h3>` text carries the semantic meaning
- If any item has no description, the `<h3>` alone must be sufficient to understand the expertise area

---

## 7. Section: Experience

### 7.1 Purpose

Highlight the client's professional journey through a structured timeline. The emphasis is on the professional narrative arc — not a resume format. The focus is on growth, positions, and organizational affiliations across the healthcare industry.

### 7.2 Architecture Decision

The Experience section uses an **Editorial Timeline** layout. This is a structured, visually clear timeline that presents career progression in chronological or reverse-chronological order.

**Design Rationale:** An editorial timeline communicates professional growth as a continuous journey rather than a list of past jobs. It creates a sense of progression and establishes depth of experience — which is critical for the trust-building purpose of this portfolio.

> **(Pending Decision):** The chronological direction of the timeline (chronological from oldest to newest, or reverse-chronological from newest to oldest) is not specified in `project-context.md`. Reverse-chronological is conventional for professional portfolios (most recent first). This decision should be confirmed before implementation.

### 7.3 Timeline Layout Specification

**Desktop (lg+): Two-column alternating timeline**

```
[Year/Period]        │        [Position + Organization]
                     │        [Description]
                     │
     [Position]      │
     [Description]   │        [Year/Period]
```

A vertical center line runs between the two columns. Timeline entries alternate between the left and right columns, creating a visually interesting rhythm.

**Tablet (md): Single-column timeline with left-side connector**

```
│ [Year/Period]
│ [Position]
│ [Organization]
│ [Description]
│
│ [Year/Period]
│ [Position + Organization]
│ [Description]
```

A vertical line runs along the left side. All content is on the right of the connector line.

**Mobile (base): Single-column stacked, no visible center line**

```
[Year/Period badge]
[Position]
[Organization]
[Description]
─────────────────
[Year/Period badge]
[Position]
[Organization]
[Description]
```

Dividers between items replace the center line on mobile.

### 7.4 Timeline Entry Structure

Each experience entry contains:

| Sub-element         | Element         | Visual Rule                                                    |
|---------------------|-----------------|----------------------------------------------------------------|
| Period / Year range | `<time>`        | `--text-body-sm`, weight 600, `--color-accent`                 |
| Position / Role     | `<h3>`          | `--text-h3`, weight 700, `--color-text-primary`                |
| Organization        | `<p>`           | `--text-body-sm`, weight 600, `--color-text-secondary`         |
| Description         | `<p>`           | `--text-body`, weight 400, `--color-text-secondary`            |
| Timeline node dot   | Decorative      | Small circle on the center or left line, `--color-accent` fill |

**Entry card:** Each entry is contained in a subtle card with `--radius-md`, `--shadow-sm`, `--color-surface` background, and `--color-border` border. Padding: `--space-6`.

**Timeline connector line:** 1px to 2px wide, `--color-border` color, running vertically between entries.

**Timeline node:** A 10px–12px circle centered on the connector line, `--color-accent` fill, `--color-surface` background circle inside for a "ring" appearance.

### 7.5 Data Requirements

Each experience entry corresponds to one object in `src/data/experience.js`. The data structure is defined in Part 1, Section 15.4:

- `id` — unique identifier
- `period` — human-readable date range (e.g., "2018–2022"), not translated
- `startYear` — numeric year for sorting
- `positionKey` — i18n key for job title
- `organizationKey` — i18n key for organization name
- `descriptionKey` — i18n key for description

> **(Pending Decision):** The client's professional experience history — positions, organizations, date ranges, and descriptions — is not provided in `project-context.md`. This content requires client input in both English and Arabic. The number of timeline entries is not yet known.

### 7.6 Section Header

The `SectionHeader` component is centered above the timeline. `alignment` prop is `"center"`.

### 7.7 Animation Sequence

All animations are scroll-triggered:

| Element              | Animation            | Notes                                           |
|----------------------|----------------------|-------------------------------------------------|
| Section heading      | `fadeInUp`           | Triggers when heading enters view               |
| Timeline entries     | `staggerContainer`   | Each entry animates in sequentially             |
| Each entry card      | `fadeInUp` (child)   | Stagger 0.12s per entry — intentionally slower than expertise items to create a deliberate reading pace |
| Timeline connector   | Static element       | A static vertical line spanning the height of the container, drawn using a CSS `::after` pseudo-element with no animation. |

### 7.8 Responsive Behavior

| Property          | Mobile              | Tablet (md)           | Desktop (lg+)                |
|-------------------|---------------------|-----------------------|------------------------------|
| Layout            | Single column, stacked | Left-line timeline | Two-column alternating       |
| Center line       | None                | Left side line        | Center vertical line         |
| Entry card width  | Full width          | Full width            | ~45% of container width      |
| Section bg        | `--color-background` | same                 | same                         |

### 7.9 Component Hierarchy

```
Experience (section root — <section id="experience">)
  └── Container
        ├── SectionHeader (titleKey: "experience.title", alignment: "center")
        └── Timeline (relative position container for the connector line)
              └── TimelineEntry (× n — rendered from data/experience.js)
                    ├── TimelineNode (decorative dot on connector)
                    ├── TimePeriod (<time> element)
                    ├── <h3> position title
                    ├── Organization (<p>)
                    └── Description (<p>)
```

### 7.10 Accessibility Requirements

- Section `aria-labelledby` references the `<h2>` heading ID
- Each `<time>` element has a `dateTime` attribute in ISO format if a precise date is available — e.g., `dateTime="2018"` for year-only
- Timeline entries are wrapped in `<ol>` (ordered list) when rendered in chronological order — `<ol>` communicates sequence to screen readers
- Timeline node decorative dots are `aria-hidden="true"`
- The connector line decoration is `aria-hidden="true"`

---

## 8. Section: Courses & Certificates

### 8.1 Purpose

Present the client's professional development credentials — completed courses and earned certificates — in a visually organized, credibility-reinforcing grid. The section demonstrates ongoing professional investment and subject-matter expertise.

### 8.2 Architecture Decision

Courses and Certificates are **merged into a single section** by explicit project decision. The decision rationale from `project-context.md`: cleaner information architecture, less scrolling, better user experience.

The layout is a **Premium Regular Grid** — explicitly not a Masonry layout.

**Design Rationale:** A regular grid maintains visual consistency and alignment across all certificate cards. A Masonry layout creates visual irregularity that conflicts with the premium, ordered aesthetic. Actual certificate images from the client are used — not icons or illustrations.

### 8.3 Grid Specification

**Desktop (lg+):** Three columns.
**Tablet (md):** Two columns.
**Mobile (base):** One column.

**Grid gap:** `--space-6` (24px) on all breakpoints.

**Card alignment:** All cards in a row must maintain equal height. If cards have varying content length, `align-items: stretch` on the grid container ensures consistent card height within each row.

### 8.4 Certificate Card Structure

Each certificate card contains:

| Sub-element         | Element      | Visual Rule                                                             |
|---------------------|--------------|-------------------------------------------------------------------------|
| Certificate image   | `<img>`      | Full card width at top, `border-radius: var(--radius-md) var(--radius-md) 0 0` (rounded top corners only), aspect ratio approximately 4:3 or 3:2 |
| Certificate title   | `<h3>`       | `--text-h3`, weight 600, `--color-text-primary`                         |
| Issuing organization| `<p>`        | `--text-body-sm`, weight 500, `--color-text-secondary`                  |
| Year of issue       | `<span>`     | `--text-caption`, weight 400, `--color-text-secondary`                  |

**Card container:**
- Background: `--color-surface`
- Border: 1px solid `--color-border`
- Border-radius: `--radius-md` on the full card container
- Shadow: `--shadow-sm`
- Overflow: hidden (so the image fills the top edge flush with rounded corners)

**Text padding area (below image):** `--space-4` (16px) on all sides.

**Hover state:** Shadow lifts to `--shadow-md`. No transform, no scale. Transition 0.25s ease.

### 8.5 Certificate Image Specification

- **Source:** Actual certificate images provided by the client — not placeholder stock imagery
- **Format:** WebP (primary), JPEG/PNG (fallback)
- **Maximum file size:** 150KB per image (WebP compressed)
- **Alt text:** Certificate title and issuing organization — e.g., "Certificate in Interventional Radiology — University of [Name]"
- **Loading:** `loading="lazy"` — section is below the fold
- **Dimensions:** Explicit `width` and `height` attributes to prevent CLS
- **Aspect ratio:** Maintain consistent aspect ratio across all certificate images using CSS `aspect-ratio` property to prevent layout shifts when images load

> **(Pending Decision):** Certificate images have not been provided by the client. Placeholder images must be used during development. The actual images will replace placeholders before final implementation. The number of certificates is not specified in `project-context.md` — this affects grid row count.

### 8.6 Section Header

The `SectionHeader` component is centered above the grid. `alignment` prop is `"center"`.

The section title must reflect the merged nature of the section — covering both courses and certificates. The exact title text is determined by the i18n key.

### 8.7 Animation Sequence

All animations are scroll-triggered:

| Element              | Animation            | Notes                                         |
|----------------------|----------------------|-----------------------------------------------|
| Section heading      | `fadeInUp`           | Triggers when heading enters view             |
| Certificate grid     | `staggerContainer`   | Triggers when grid enters view                |
| Each certificate card | `fadeInUp` (child)  | Stagger 0.08s per card — fills in row by row  |

### 8.8 Responsive Behavior

| Property          | Mobile              | Tablet (md)         | Desktop (lg+)       |
|-------------------|---------------------|---------------------|---------------------|
| Columns           | 1                   | 2                   | 3                   |
| Card image ratio  | 4:3                 | 4:3                 | 4:3                 |
| Grid gap          | `--space-5`         | `--space-6`         | `--space-6`         |
| Section bg        | `--color-surface`   | same                | same                |

### 8.9 Component Hierarchy

```
Certificates (section root — <section id="certificates">)
  └── Container
        ├── SectionHeader (titleKey: "certificates.title", alignment: "center")
        └── CertificatesGrid (CSS Grid)
              └── CertificateCard (× n — rendered from data/certificates.js)
                    ├── CertificateImage (<img>)
                    └── CertificateInfo
                          ├── <h3> title
                          ├── <p> issuer
                          └── <span> year
```

### 8.10 Accessibility Requirements

- Section `aria-labelledby` references the `<h2>` heading ID
- Each certificate image has a descriptive `alt` attribute including title and issuer
- Grid renders as a `<ul>` list of `<li>` card items — not a raw `<div>` grid
- Each `<li>` has the card structure nested within it
- Year values wrapped in `<time>` elements with `dateTime` attribute — e.g., `<time dateTime="2022">2022</time>`

---

## 9. Section: Contact

### 9.1 Purpose

Make professional communication straightforward and friction-free. This section functions as a digital business card — providing all necessary contact information in a clean, scannable format without requiring a contact form.

### 9.2 Architecture Decision

The Contact section is implemented as a **Digital Business Card** — explicitly approved by project decision.

**No contact form.** This is a confirmed project decision. No email input, no message textarea, no submit button. The section displays static contact information only.

**Design Rationale:** A contact form introduces friction and maintenance overhead (spam handling, email delivery). A digital business card is faster, simpler, and more appropriate for a B2B audience who will email or call directly through their own tools. It also reinforces the executive identity — business cards are an executive-world touchpoint.

### 9.3 Approved Contact Information Fields

The following contact fields are approved by project decision:

| Field          | Icon (Lucide)       | Behavior                                           |
|----------------|---------------------|----------------------------------------------------|
| Phone          | `Phone`             | `href="tel:+..."` — opens phone dialer on mobile   |
| Email          | `Mail`              | `href="mailto:..."` — opens email client            |
| LinkedIn       | `Linkedin`          | `href="https://linkedin.com/..."` — opens in new tab |
| Location       | `MapPin`            | Static display — no map embed (map is not approved) |
| WhatsApp       | *(Lucide-compatible)* | `href="https://wa.me/..."` — opens WhatsApp      |

**WhatsApp field:** Displayed only if the WhatsApp contact number is available. The field is conditionally rendered based on whether the data value is provided.

> **(Pending Decision):** All actual contact information (phone number, email address, LinkedIn URL, location description, WhatsApp number) is not provided in `project-context.md`. These values must be provided by the client and stored in `src/data/contact.js` before implementation.

### 9.4 Layout Specification

The Contact section uses `--color-primary` (dark navy) as its background — creating a strong, dark terminal to the main content before the footer.

All text on the dark background uses:
- Primary text: `#FFFFFF` (pure white)
- Secondary text: `rgba(255, 255, 255, 0.70)` for labels

**Desktop and Tablet (md+): Two-column layout**

```
┌─────────────────────────────────┬─────────────────────────────────┐
│  Left column:                   │  Right column:                  │
│  Section heading (h2)           │  Contact items (list)           │
│  Brief invitation text          │  (5 items — phone, email,       │
│                                 │   LinkedIn, location, WhatsApp) │
└─────────────────────────────────┴─────────────────────────────────┘
```

**Mobile (below md): Single column**

```
┌─────────────────────────────────┐
│  Section heading (h2)           │
│  Brief invitation text          │
│  ─────────────────────────────  │
│  Phone                          │
│  Email                          │
│  LinkedIn                       │
│  Location                       │
│  WhatsApp                       │
└─────────────────────────────────┘
```

### 9.5 Contact Item Structure

Each contact item is a row containing:

| Sub-element     | Element     | Visual Rule                                                             |
|-----------------|-------------|-------------------------------------------------------------------------|
| Icon            | Lucide icon | Size 20px; color `--color-accent`                                       |
| Label           | `<span>`    | `--text-body-sm`, weight 500, `rgba(255,255,255,0.70)`                  |
| Value / Link    | `<a>` or `<p>` | `--text-body`, weight 400, `#FFFFFF`                               |

**Contact items that are links (`<a>`):** Phone, Email, LinkedIn, WhatsApp — all are anchor elements with appropriate `href` protocols.

**Location field:** Rendered as a static paragraph — not a link. No map embed.

**Hover state (link items only):** Text color shifts from `#FFFFFF` to `--color-accent`. Transition 0.2s ease.

**Item spacing:** `--space-5` (20px) vertical gap between contact items.

**Contact list container:** Wrapped in an `<address>` HTML element — semantically correct for contact information.

### 9.6 Section Header on Dark Background

The `SectionHeader` component renders on the dark `--color-primary` background. Text colors must adapt:

- `<h2>` heading: `#FFFFFF`
- Subtitle paragraph: `rgba(255, 255, 255, 0.70)`
- Accent label above heading (if used): `--color-accent`

The `SectionHeader` component must accept a `theme="dark"` prop to apply dark-background-appropriate text colors. This is the only section where the heading appears on a dark background.

### 9.7 Animation Sequence

All animations are scroll-triggered:

| Element                  | Animation     | Notes                                                |
|--------------------------|---------------|------------------------------------------------------|
| Section heading and intro | `fadeInUp`   | Triggers when content enters view                    |
| Contact items list       | `staggerContainer` | Each contact item fades in sequentially         |
| Each contact item        | `fadeInUp` (child) | Stagger 0.1s per item — 5 items over ~0.5s total |

### 9.8 Responsive Behavior

| Property          | Mobile                         | Tablet (md)             | Desktop (lg+)          |
|-------------------|--------------------------------|-------------------------|------------------------|
| Layout            | Single column                  | Two columns             | Two columns            |
| Column gap        | N/A (stacked)                  | `--space-8`             | `--space-10`           |
| Section bg        | `--color-primary`              | same                    | same                   |
| Heading color     | `#FFFFFF`                      | same                    | same                   |

### 9.9 Component Hierarchy

```
Contact (section root — <section id="contact">)
  └── Container
        └── ContactGrid (two-column grid)
              ├── ContactIntro
              │     ├── SectionHeader (titleKey: "contact.title", alignment: "start", theme: "dark")
              │     └── Paragraph — invitation text
              └── ContactDetails
                    └── <address>
                          └── ContactItem (× 5 — from data/contact.js)
                                ├── Lucide icon
                                ├── Label <span>
                                └── Value (<a> or <p>)
```

### 9.10 Data File: `src/data/contact.js`

A dedicated data file for contact information:

```
{
  phone:     string or null,   // Formatted display string
  phoneHref: string or null,   // tel: URI
  email:     string or null,   // Display email address
  emailHref: string or null,   // mailto: URI
  linkedin:  string or null,   // Full LinkedIn profile URL
  location:  string or null,   // Human-readable location (not an address for mapping)
  whatsapp:  string or null,   // WhatsApp number — null if unavailable (conditionally rendered)
  whatsappHref: string or null // https://wa.me/... URI
}
```

Fields with `null` values must not render. The component conditionally renders each field only when its data value is non-null.

### 9.11 Accessibility Requirements

- Section `aria-labelledby` references the `<h2>` heading ID
- Contact information is wrapped in `<address>` element
- All link items (`<a>` elements) have descriptive `aria-label` attributes — e.g., `aria-label="Call Dr. Salah: +xxx xxx xxxx"` — not just the number text
- External links (LinkedIn, WhatsApp) have `target="_blank"` and `rel="noopener noreferrer"`, plus `aria-label` indicating they open in a new tab
- The Location field is not a link and must not be styled or announced as one

---

## 10. Section: Footer

### 10.1 Purpose

Provide a clean, corporate closure to the page. The Footer contains essential navigational, legal, and social links. It must be minimal and free of decorative elements.

### 10.2 Architecture Decision

A **simple corporate footer** — approved by project decision. The footer shares the `--color-primary` (dark navy) background with the Contact section, creating a unified dark terminus to the page.

**Design Rationale:** Sharing the dark background between Contact and Footer creates a seamless visual anchoring block at the bottom of the page. The Footer does not visually interrupt — it extends the dark terminal zone and closes it with legal and navigation content.

### 10.3 Approved Content

The following content is confirmed for the Footer:

| Content Element    | Notes                                                                       |
|--------------------|-----------------------------------------------------------------------------|
| Copyright notice   | Year and client name — e.g., "© 2025 [Client Name]. All rights reserved." |
| Quick Links        | Anchor links to all page sections — same targets as the Navbar              |
| Language Switch    | `LanguageSwitcher` component — same as in the Navbar                       |
| Social Links       | LinkedIn (confirmed), other social profiles if provided by client            |

No decorative elements. No background patterns. No illustrations.

### 10.4 Layout Specification

**Desktop (lg+):** Multi-column horizontal layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Name / Logo]     [Quick Links]     [Social + Language]    │
├─────────────────────────────────────────────────────────────┤
│  Copyright notice — centered or left-aligned                │
└─────────────────────────────────────────────────────────────┘
```

Three column areas:
- Column 1: Client name or small logo wordmark + brief professional tagline (one line)
- Column 2: Quick Links — vertical list of section anchor links
- Column 3: Social link icons + `LanguageSwitcher`

Below the three columns: a horizontal `<hr>` divider (1px, `rgba(255,255,255,0.15)` color), followed by the copyright line.

**Mobile (below md): Stacked**

```
┌─────────────────────────────────┐
│  Client name / tagline          │
│  ─────────────────────────────  │
│  Quick Links (condensed)        │
│  ─────────────────────────────  │
│  Social Icons  |  Language      │
│  ─────────────────────────────  │
│  Copyright notice               │
└─────────────────────────────────┘
```

### 10.5 Quick Links

Quick Links in the Footer are the same six section anchors as the Navbar:

| Display Text (English) | Anchor Target    |
|------------------------|------------------|
| Home                   | `#hero`          |
| About                  | `#about`         |
| Areas of Expertise     | `#expertise`     |
| Experience             | `#experience`    |
| Courses & Certificates | `#certificates`  |
| Contact                | `#contact`       |

All link text sourced from `t('nav.*)` i18n keys — the same keys used in the Navbar. No new keys needed.

### 10.6 Social Links

Social links in the Footer render as icon-only buttons using Lucide React icons.

| Platform  | Icon               | Status                                |
|-----------|--------------------|---------------------------------------|
| LinkedIn  | `Linkedin`         | Confirmed — value from `data/contact.js` |
| Other     | (Pending Decision) | Additional social profiles not specified in `project-context.md` |

> **(Pending Decision):** Social platform URLs beyond LinkedIn are not specified in `project-context.md`. Only LinkedIn is confirmed. Additional platforms must be approved and provided by the client.

All social icon buttons:
- Size: 20px icon inside a 40px × 40px minimum touch target
- Color: `rgba(255,255,255,0.70)` at rest
- Hover: `#FFFFFF`
- `aria-label`: platform name and purpose — e.g., `aria-label="Visit LinkedIn profile (opens in new tab)"`
- `target="_blank"` with `rel="noopener noreferrer"`

### 10.7 Copyright Notice

Format: `© [YEAR] [Client Name]. All rights reserved.`

The year is dynamically generated from `new Date().getFullYear()` — never hardcoded. The copyright statement must be available in both English and Arabic via i18n keys, as the Footer renders in both languages.

> **(Pending Decision):** The client's name as it should appear in the copyright notice is not specified in `project-context.md`.

### 10.8 Text Colors in Footer

All Footer text on `--color-primary` background:

| Element              | Color                        |
|----------------------|------------------------------|
| Name / wordmark      | `#FFFFFF`                    |
| Tagline              | `rgba(255,255,255,0.70)`     |
| Quick link text      | `rgba(255,255,255,0.70)`     |
| Quick link hover     | `#FFFFFF`                    |
| Social icons rest    | `rgba(255,255,255,0.70)`     |
| Social icons hover   | `#FFFFFF`                    |
| Copyright text       | `rgba(255,255,255,0.50)`     |
| Divider `<hr>`       | `rgba(255,255,255,0.15)`     |

### 10.9 Animation Behavior

The Footer does **not** use scroll-triggered Framer Motion animations. It renders statically. Only CSS hover transitions apply to links and icons.

**Design Rationale:** The Footer is a utility element, not a content reveal area. Animating it adds no value and could interfere with the clean close of the page.

### 10.10 Responsive Behavior

| Property          | Mobile                         | Tablet (md)              | Desktop (lg+)            |
|-------------------|--------------------------------|--------------------------|--------------------------|
| Layout            | Single column, stacked         | Multi-column             | Multi-column             |
| Column count      | 1                              | 2                        | 3                        |
| Column gap        | N/A                            | `--space-8`              | `--space-10`             |
| Section bg        | `--color-primary`              | same                     | same                     |

### 10.11 Component Hierarchy

```
Footer (root — <footer>)
  └── Container
        ├── FooterColumns (three-column grid)
        │     ├── FooterBrand
        │     │     ├── Name / Wordmark
        │     │     └── Tagline paragraph
        │     ├── FooterLinks
        │     │     ├── Links heading (<h3> visually styled small) — optional
        │     │     └── <ul> of anchor links
        │     └── FooterActions
        │           ├── SocialLinks
        │           │     └── SocialIconButton (× n)
        │           └── LanguageSwitcher
        ├── <hr> divider
        └── FooterCopyright
              └── Copyright paragraph
```

### 10.12 Accessibility Requirements

- `<footer>` is a landmark element and does not require an `aria-label`
- Quick links `<ul>` has `aria-label="Footer navigation"` to distinguish it from the main Navbar
- Social icon buttons each have `aria-label` describing the platform and "opens in new tab"
- `LanguageSwitcher` in the footer has the same accessibility implementation as in the Navbar — same component, same ARIA attributes
- Copyright `<p>` contains a `<time dateTime="[YEAR]">` element wrapping the year value

---

## 11. Optional Future Sections

The following sections are referenced in `project-context.md` (Section 15) but are **not part of the approved final website structure** (Section 14 of `project-context.md`). They are documented here for future reference.

These sections must **not be built** in the current implementation phase. They may be added in a future phase with explicit project approval.

### 11.1 Gallery

**Purpose (from project-context.md):** Present approved professional images only.

**Constraints stated:**
- Avoid random stock photos
- Avoid low quality media

**Notes for future implementation:**
- All images must be client-approved professional photographs
- Layout is not specified — (Pending Decision) for future phase
- Must follow all image optimization rules from Part 1, Section 13.3
- Grid or masonry layout decision must be made in a future blueprint document

### 11.2 Testimonials

**Purpose (from project-context.md):** Increase credibility.

**Constraints stated:**
- Must be authentic
- Easy to read
- Professional presentation

**Notes for future implementation:**
- Testimonial content must be verified and client-approved
- Testimonials must name the professional relationship context — not anonymous
- Layout, card design, and carousel vs. grid format are not specified — (Pending Decision) for future phase

---

## 12. Cross-Section Consistency Rules

These rules apply across all sections and govern visual consistency between them.

### 12.1 Section Heading Consistency

Every section (except Hero) uses the `SectionHeader` component with the same internal structure:
- Optional small accent label above the `<h2>` — same styling across all sections
- `<h2>` heading with consistent font size, weight, and color
- Optional subtitle paragraph with consistent font size and color
- Consistent bottom margin before section content begins

The `SectionHeader` component must not be customized per section beyond the props it accepts (`titleKey`, `subtitleKey`, `alignment`, `theme`).

### 12.2 Section Padding Consistency

All sections apply consistent vertical padding per breakpoint as defined in Part 1, Section 8.3. No section may use a different padding value without explicit project approval. The Hero section is exempt — it uses `min-height: 100vh` instead of fixed padding.

### 12.3 Section Background Alternation Enforcement

The alternating background pattern defined in Section 2.2 of this document is strict. No two adjacent sections may share the same background value. The Contact and Footer sharing `--color-primary` is the single approved exception to this rule.

### 12.4 Icon Usage Consistency

Across all sections, Lucide icons must be used at consistent sizes:
- Navigation icons and contact field icons: 20px
- Expertise area feature icons: 32px
- Social media icons: 20px
- Footer social icons: 20px

All icons use consistent color rules per their context (accent in expertise, accent in contact fields, muted white in footer).

### 12.5 Animation Consistency

All scroll-triggered animations across all sections use `viewport={{ once: true, amount: 0.2 }}`. No section may use different viewport threshold values without explicit justification. All variants come from `src/utils/animations.js` — no ad-hoc motion values in any section component.

### 12.6 CTA Button Consistency

The "Contact Me" call-to-action appears in:
- The **Navbar** (desktop action area and mobile menu)
- The **Hero** section (primary CTA)

Both instances use the same `Button` component with `variant="primary"`. The text comes from the same i18n key `t('hero.cta_primary')` or `t('nav.cta')` as applicable. The buttons must be visually identical and must both anchor to `#contact`.

### 12.7 Card Consistency

Cards in the Expertise section and the Certificates section share the same base card style: `--color-surface` background, `--color-border` border, `--radius-md` border-radius, `--shadow-sm` resting shadow, `--shadow-md` on hover.

The difference between them:
- Expertise items: icon-led, text-only content
- Certificate cards: image at top, text content below image

Both follow the same `Card` component base styles defined in Part 1, Section 15.2.

---

## 13. Section-Level Acceptance Criteria

### 13.1 Navbar Acceptance Criteria

- [ ] Navbar is sticky — remains at top of viewport during scroll
- [ ] Navbar contains the Logo, navigation links, language switcher, and Contact CTA
- [ ] Navigation links correctly anchor to `#hero`, `#about`, `#expertise`, `#experience`, `#certificates`, `#contact`
- [ ] Active link state updates correctly based on which section is in view (Intersection Observer)
- [ ] Navbar background transitions to solid `--color-primary` with `--shadow-lg` when scrolled past Hero
- [ ] Mobile hamburger menu opens, traps focus, and closes on `Escape`
- [ ] Mobile menu trigger has `aria-expanded` updating correctly
- [ ] All nav links are reachable via keyboard
- [ ] All link text comes from i18n keys — no hardcoded text
- [ ] RTL layout is correct in Arabic mode — logo and toggle positions mirror

### 13.2 Hero Acceptance Criteria

- [ ] Section occupies `min-height: 100vh`
- [ ] Background image is served in WebP, below 200KB, with JPEG fallback
- [ ] Dark gradient overlay provides sufficient contrast (4.5:1 minimum) for white text
- [ ] Subtle animated pattern overlay is present, `aria-hidden="true"`, and does not affect text readability
- [ ] No portrait photograph appears in the Hero
- [ ] No scroll indicator appears
- [ ] Single `<h1>` element — the Hero headline
- [ ] Primary CTA "Contact Me" anchors to `#contact`
- [ ] No secondary CTA
- [ ] Content entrance animations stagger correctly in order: eyebrow → headline → subheadline → CTA
- [ ] All animations are disabled when `prefers-reduced-motion` is active
- [ ] Hero background image has `loading="eager"` and `fetchpriority="high"`

### 13.3 About Acceptance Criteria

- [ ] Editorial two-column layout on md+ breakpoints — single column on mobile
- [ ] Professional portrait uses WebP, below 100KB, with descriptive alt text
- [ ] Portrait has `--radius-lg` border-radius (not circular)
- [ ] Biography, Mission, and Core Values all render content from i18n keys
- [ ] No hardcoded text in any About component
- [ ] All scroll-triggered animations use `viewport={{ once: true }}`
- [ ] RTL layout correctly mirrors — portrait switches sides in Arabic mode
- [ ] `<section id="about" aria-labelledby="about-heading">` correctly applied

### 13.4 Expertise Acceptance Criteria

- [ ] Eight expertise items render from `data/expertise.js`
- [ ] Grid uses 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- [ ] Each item contains Lucide icon (32px, `--color-accent`), `<h3>` title, `<p>` description
- [ ] Items are informational — not links, no `href`, no `cursor: pointer`
- [ ] Icon containers are `aria-hidden="true"`
- [ ] Hover state applies `--color-hover` background and `--shadow-md` shadow — no transform
- [ ] Stagger animation correctly enters items with 0.07s per-item delay
- [ ] Section background is `--color-surface` (white)

### 13.5 Experience Acceptance Criteria

- [ ] Timeline entries render from `data/experience.js`
- [ ] Desktop layout: two-column alternating; Tablet: left-line single column; Mobile: stacked
- [ ] Each entry has `<time>` element with `dateTime` attribute
- [ ] Period label uses `--color-accent`
- [ ] Timeline connector line and nodes are `aria-hidden="true"`
- [ ] Timeline entries are wrapped in `<ol>` (ordered list)
- [ ] Stagger animation enters entries with 0.12s per-item delay
- [ ] Section background is `--color-background`

### 13.6 Certificates Acceptance Criteria

- [ ] Certificate cards render from `data/certificates.js`
- [ ] Grid uses 3 columns (desktop), 2 columns (tablet), 1 column (mobile) — regular grid, not Masonry
- [ ] All certificate images are actual client-provided images (or placeholders during development)
- [ ] All images are WebP, below 150KB, with `loading="lazy"` and descriptive alt text
- [ ] All cards maintain equal height within grid rows (`align-items: stretch`)
- [ ] Card image occupies full card width at top, with rounded top corners only
- [ ] Grid is implemented as `<ul>` of `<li>` elements
- [ ] Year values use `<time dateTime="...">` elements

### 13.7 Contact Acceptance Criteria

- [ ] No contact form — section is a digital business card only
- [ ] All five contact fields render conditionally from `data/contact.js` (null values not rendered)
- [ ] Phone link uses `href="tel:..."` protocol
- [ ] Email link uses `href="mailto:..."` protocol
- [ ] LinkedIn link uses `target="_blank"` and `rel="noopener noreferrer"`
- [ ] WhatsApp field is hidden if value is null
- [ ] Location field is a static `<p>` — not a link
- [ ] Contact information is wrapped in `<address>` element
- [ ] All link `<a>` elements have descriptive `aria-label` attributes
- [ ] Section background is `--color-primary` (dark navy)
- [ ] All text colors comply with WCAG AA on dark background
- [ ] `SectionHeader` renders correctly on dark background via `theme="dark"` prop

### 13.8 Footer Acceptance Criteria

- [ ] Footer contains: name/wordmark, quick links, social icons, language switcher, copyright
- [ ] No decorative elements
- [ ] Quick links use the same i18n keys as Navbar (`t('nav.*')`)
- [ ] Social icon buttons each have `aria-label` with "opens in new tab" indication
- [ ] Copyright year is dynamically generated via `new Date().getFullYear()`
- [ ] `LanguageSwitcher` in footer is the same reusable component used in Navbar
- [ ] Footer links `<ul>` has `aria-label="Footer navigation"` to distinguish from main nav
- [ ] Footer renders correctly in both LTR and RTL modes
- [ ] No Framer Motion animations — footer renders statically

---

*End of Project Blueprint — Part 2*

---

**Document Metadata**

| Field             | Value                                                                                    |
|-------------------|------------------------------------------------------------------------------------------|
| Document          | project-blueprint-part-2.md                                                              |
| Version           | 1.0.0                                                                                    |
| Status            | Final — Approved for Implementation                                                      |
| Source Authority  | `docs/project-context.md` — Single Source of Truth                                      |
| Prerequisite      | `docs/blueprint/project-blueprint-part-1.md`                                             |
| Next Document     | `docs/blueprint/project-blueprint-part-3.md` — Content, data structure, and asset specifications |
| Pending Decisions | Mobile menu open/close pattern; hero background image (client to provide); hero and about text content (client to provide); expertise area icons and descriptions; experience history; certificate images and count; contact information values; additional social platforms; mobile timeline connector animation; timeline sort direction |


# Project Blueprint - Part 3
## Content Architecture, Data Specifications, Asset Pipeline and Implementation Readiness

**Document Version:** 1.0.0
**Status:** Final - Approved for Implementation
**Source of Truth:** docs/project-context.md
**Prerequisites:** Parts 1 and 2 must be read in full before this document
**Scope:** Content architecture, data file specifications, i18n key scaffolding, asset pipeline, environment configuration, application entry point, deployment readiness, and consolidated pending decisions register

---

## Table of Contents

1. Document Scope and Purpose
2. Content Architecture Overview
3. Data File Specifications
4. i18n Content Scaffolding
5. Asset Pipeline Specification
6. Environment Configuration Specification
7. Application Entry Point Specification
8. CSS Foundation File Specifications
9. Utility Module Specifications
10. Custom Hook Specifications
11. Deployment Readiness Specification
12. Consolidated Pending Decisions Register
13. Project-Wide Implementation Readiness Checklist

---

## 1. Document Scope and Purpose

### 1.1 Scope

This document is Part 3 - the final document - of the Project Blueprint for the Dr. Salah Medical Portfolio website. It covers the specifications that govern how content is structured, stored, and delivered: the complete data layer, the full i18n key structure for both languages, the asset pipeline and delivery rules, environment configuration, and the application entry point composition.

This document also consolidates every Pending Decision recorded across Parts 1 and 2 into a single authoritative register, and provides the complete project-wide implementation readiness checklist.

This document does NOT contain:
- Source code
- Prompts or implementation instructions directed at AI assistants
- Repeated definitions of design tokens, spacing, animation variants, or section layouts already established in Parts 1 and 2

This document DOES contain:
- Complete field-by-field specification for every data module in src/data/
- Complete i18n key structure for en/translation.json and ar/translation.json
- Asset naming conventions, folder organization, file size budgets, and format requirements
- Environment variable definitions and .env file structure
- Application entry point (App.jsx and main.jsx) composition specification
- CSS foundation file structural requirements
- Utility and hook module contracts
- Deployment readiness requirements and pre-deployment checklist
- Consolidated register of all Pending Decisions across the entire blueprint
- Project-wide implementation readiness checklist

### 1.2 Authority Chain

This document is the fourth and final authority level:

    Level 1: project-context.md              (Single Source of Truth - highest authority)
    Level 2: project-blueprint-part-1.md    (Foundation and design system)
    Level 3: project-blueprint-part-2.md    (Section-by-section implementation)
    Level 4: project-blueprint-part-3.md    (This document - content, data, assets, deployment)

Any conflict with a higher authority document must defer to that higher authority.

---

## 2. Content Architecture Overview

### 2.1 Content Classification

All content falls into one of three classes:

| Class | Definition | Storage Location |
|---|---|---|
| Static Data | Structured content unchanged between language renders: identifiers, image filenames, year values, href values | src/data/ |
| Translated Text | All human-readable strings existing in both English and Arabic | src/locales/[lang]/translation.json |
| Media Assets | Images, fonts, and any binary asset referenced by the application | src/assets/ or public/ |

Cross-class contamination rules:
- Hardcoded text strings in JSX are prohibited - all text must reside in translation files
- Image filenames in data files must resolve to actual files in the asset folder defined in Section 5
- i18n keys in data files must resolve to entries in both en/translation.json and ar/translation.json

### 2.2 Data-to-Translation Key Convention

Data objects reference i18n keys, not raw text. The naming convention is:

    [section].[entity-id].[field]

Examples:
- expertise.interventional-cardiology.title
- experience.exp-01.position
- certificates.cert-01.title

Generic keys like expertise.item1.title are prohibited. Keys must be human-readable and meaningful to a future content editor.

### 2.3 Content Update Model

Content updates require zero component modifications:

| Scenario | Files to Modify | Components Modified |
|---|---|---|
| Update biography | en/translation.json, ar/translation.json | None |
| Add certificate | data/certificates.js, both translation files, add image to assets/images/certificates/ | None |
| Add experience entry | data/experience.js, both translation files | None |
| Update contact phone | data/contact.js | None |
| Update expertise description | Both translation files | None |
| Replace portrait | Replace file in assets/images/portrait/ | None |
| Replace hero background | Replace file in assets/images/hero/ | None |


## 3. Data File Specifications

### 3.1 src/data/expertise.js

**Purpose:** Provides the array of eight expertise area objects rendered by the Expertise section.
**Module contract:** Exports a single named array: `expertiseItems`

**Object structure (all fields required):**

| Field | Type | Description |
|---|---|---|
| id | string | Unique slug. Format: lowercase-hyphenated. Must be unique across the entire array. |
| iconName | string | Exact Lucide React export name as a string. Must match a valid Lucide named export exactly. Used for dynamic icon lookup. |
| titleKey | string | i18n key for the area title. Format: expertise.[id].title |
| descriptionKey | string | i18n key for the 1-2 sentence description. Format: expertise.[id].description |

**(Pending Decision):** The Lucide icon name for each of the eight expertise areas is not specified in project-context.md. All eight assignments require project approval before implementation. Icons must represent advanced medical technology, precision, and industry — not generic clinical symbolism. No EKG lines, stethoscopes, or hospital cross icons are appropriate.

| Expertise Area | Icon Assignment |
|---|---|
| Interventional Cardiology Supplies | (Pending Decision) |
| Interventional Radiology Solutions | (Pending Decision) |
| Neurointerventional Products | (Pending Decision) |
| Diagnostic Imaging Solutions | (Pending Decision) |
| Modern Image-Guided Treatment Technologies | (Pending Decision) |
| Medical Devices Import and Export | (Pending Decision) |
| Medical Equipment | (Pending Decision) |
| Cosmetic Equipment and Products | (Pending Decision) |

**Confirmed id values and i18n key roots (derived from project-context.md):**

| Index | id | i18n key root |
|---|---|---|
| 0 | interventional-cardiology | expertise.interventional-cardiology |
| 1 | interventional-radiology | expertise.interventional-radiology |
| 2 | neurointerventional | expertise.neurointerventional |
| 3 | diagnostic-imaging | expertise.diagnostic-imaging |
| 4 | image-guided-treatment | expertise.image-guided-treatment |
| 5 | medical-devices-trade | expertise.medical-devices-trade |
| 6 | medical-equipment | expertise.medical-equipment |
| 7 | cosmetic-equipment | expertise.cosmetic-equipment |

**Array ordering rule:** Display order in the 4-column x 2-row desktop grid is determined by array index order. Which area appears first is **(Pending Decision)** — the order above reflects project-context.md listing order and is a draft pending client confirmation.

---

### 3.2 src/data/experience.js

**Purpose:** Provides the array of professional experience entries for the Experience section timeline.
**Module contract:** Exports a single named array: `experienceItems`

**Object structure (all fields required):**

| Field | Type | Description |
|---|---|---|
| id | string | Unique slug. Format: exp-[zero-padded-index] e.g. exp-01, exp-02 |
| period | string | Human-readable date range. Not translated — universal format. En-dash required, not a hyphen. e.g. 2018–2024, 2012–Present |
| startYear | number | Numeric year the role began. Available for programmatic sorting if needed. |
| positionKey | string | i18n key for the job title. Format: experience.[id].position |
| organizationKey | string | i18n key for the organization name. Format: experience.[id].organization |
| descriptionKey | string | i18n key for the role description. Format: experience.[id].description. Translation value may be an empty string but the key must exist in both files. |

**Sorting rule:** Render order is controlled by the array order in experience.js, not by component logic. The array must be ordered according to the confirmed display direction before implementation.

**(Pending Decision):** All experience content — positions, organizations, date ranges, role descriptions, and total entry count — is not provided in project-context.md. Client input required in both English and Arabic. The array is empty pending content delivery. Development uses placeholder data matching the structure above.

**(Pending Decision):** Timeline display direction — reverse-chronological (newest first, recommended for portfolios) vs. chronological — is not specified in project-context.md. Must be confirmed before the array ordering in experience.js is finalized.

---

### 3.3 src/data/certificates.js

**Purpose:** Provides the array of courses and certificates for the Certificates section grid.
**Module contract:** Exports a single named array: `certificateItems`

**Object structure (all fields required):**

| Field | Type | Description |
|---|---|---|
| id | string | Unique slug. Format: cert-[zero-padded-index] e.g. cert-01 |
| imageFile | string | Filename of the primary WebP image in src/assets/images/certificates/. Includes extension. e.g. cert-01.webp |
| imageFallbackFile | string | Filename of the JPEG fallback in the same folder. e.g. cert-01.jpg. Used inside a picture element. |
| titleKey | string | i18n key for the certificate title. Format: certificates.[id].title |
| issuerKey | string | i18n key for the issuing organization. Format: certificates.[id].issuer |
| year | number | Numeric year of issue. Used in the time dateTime attribute. |

**Grid ordering rule:** Items display in array order. A partially filled final row is acceptable — CSS Grid handles this without visual issues.

**(Pending Decision):** Certificate images have not been provided by the client. Placeholder images are required during development. The number of entries is not specified in project-context.md — this determines the total row count.

**(Pending Decision):** Display ordering (newest first, grouped by topic, or other arrangement) requires client input.

---

### 3.4 src/data/contact.js

**Purpose:** Provides the client contact information for the Contact section and Footer.
**Module contract:** Exports a single named object: `contactInfo` (not an array — one object with named fields)

**Object structure:**

| Field | Type | Required | Description |
|---|---|---|---|
| phone | string or null | No | Display-formatted phone number. null means the Phone field is not rendered. |
| phoneHref | string or null | No | Full tel: URI. Must be non-null when phone is non-null. |
| email | string or null | No | Display email address. null means the Email field is not rendered. |
| emailHref | string or null | No | Full mailto: URI. Must be non-null when email is non-null. |
| socialLinks | array | No | Array of social link objects: `[{ platform, url, iconName, ariaLabelKey }]`. Empty array means not rendered. |
| locationKey | string or null | No | i18n key reference for location (e.g. `contact.location`). null means field is hidden. |
| whatsapp | string or null | No | Display-formatted WhatsApp number. null means field is hidden. |
| whatsappHref | string or null | No | Full WhatsApp deep link URI e.g. https://wa.me/201012345678. Must be non-null when whatsapp is non-null. |

**Null-rendering rule:** Fields with a null value produce no DOM output — no empty elements, no hidden elements, no placeholders.

**Data integrity rule:** Each display+href pair (phone/phoneHref, email/emailHref, whatsapp/whatsappHref) must both be non-null together or both be null. A display value without an href, or vice versa, is an invalid state that must not reach the component.

**(Pending Decision):** All actual contact values have not been provided by the client. All fields default to null in the placeholder data file. Placeholder values must not be committed to any public-facing deployment.

---

### 3.5 src/data/siteMetadata.js

**Purpose:** Provides site-wide identity and SEO metadata for index.html and footer components.
**Module contract:** Exports a single named object: `siteMetadata`

**Object structure (all fields required):**

| Field | Type | Description |
|---|---|---|
| clientName | string | Full professional name for copyright notice and footer wordmark. |
| clientTitle | string | One-line professional title for footer tagline and SEO metadata. |
| pageTitle | string | Full browser tab title — concise and keyword-relevant. |
| metaDescription | string | SEO meta description. Maximum 160 characters. Written for a B2B healthcare industry audience. |
| metaKeywords | string | Comma-separated keyword string. Focus on healthcare industry expertise terms, not clinical medical service terms. |
| ogTitle | string | Open Graph title for social platform sharing. |
| ogDescription | string | Open Graph description. Maximum 200 characters. |
| siteUrl | string | Canonical site URL without trailing slash e.g. https://www.dr-salah.com |
| ogImagePath | string | Path to the OG image within public/ e.g. /og-image.jpg |
| twitterCard | string | Twitter card type. Fixed value: summary_large_image |
| copyrightName | string | Name in the copyright notice. May match clientName or be a formal entity name. |

**(Pending Decision):** All siteMetadata values require client input — name, title, meta description, keyword strategy, domain URL, and copyright name. This file must be fully populated with approved data before the production build is generated. No placeholder values may appear in any public deployment.

**(Pending Decision):** The siteUrl value requires a confirmed registered domain. Cannot be finalized until the hosting platform decision (IN-1) is resolved.

---

## 4. i18n Content Scaffolding

### 4.1 Overview

Both src/locales/en/translation.json and src/locales/ar/translation.json must follow an identical key structure. Every key present in the English file must have a corresponding key in the Arabic file, even if the Arabic value is a placeholder marked "(Pending Translation)".

The key schema below is the complete canonical reference for the project. No additional top-level namespace may be added without updating this specification.

### 4.2 Complete Key Structure

The key hierarchy is identical in both translation files — only the string values differ by language. The experience and certificates namespaces show one example entry each; additional entries follow the same sub-key pattern with names matching the id values in the corresponding data files.

**Namespace: nav**
Keys: home, about, expertise, experience, certificates, contact, cta

- cta: CTA button text in the Navbar e.g. "Contact Me" in English and the Arabic equivalent.

**Namespace: hero**
Keys: eyebrow, headline, subheadline, cta_primary

- eyebrow: Optional label above the headline (e.g. a professional category label). Set to empty string if unused — key must still exist.
- headline: Primary h1 — client name and identity statement.
- subheadline: Supporting professional context below the headline.
- cta_primary: Hero CTA button text.

**Namespace: about**
Keys: title, subtitle, biography, mission_label, mission, values_label, value_01, value_02, value_03, value_04, value_05, value_06

- subtitle: Set to empty string if unused — key must still exist.
- biography: Full biography paragraph(s). Plain text only, no HTML.
- mission_label: Label above the mission statement e.g. "My Mission".
- mission: Mission statement text.
- values_label: Label above the values list e.g. "Core Values".
- value_01 through value_06: Individual core value items. Maximum 6. Unused slots set to empty string.

**Namespace: expertise**
Keys: title, subtitle, and one nested object per expertise area.

Each nested object is identified by its id value and contains two keys: title and description.

The eight required nested objects:
- interventional-cardiology: { title, description }
- interventional-radiology: { title, description }
- neurointerventional: { title, description }
- diagnostic-imaging: { title, description }
- image-guided-treatment: { title, description }
- medical-devices-trade: { title, description }
- medical-equipment: { title, description }
- cosmetic-equipment: { title, description }

**Namespace: experience**
Keys: title, subtitle, and one nested object per entry.

Each nested object is identified by its id value (e.g. exp-01) and contains: position, organization, description.

Number of entries is **(Pending Decision — client content required)**.

**Namespace: certificates**
Keys: title, subtitle, and one nested object per entry.

Each nested object is identified by its id value (e.g. cert-01) and contains: title, issuer.

Number of entries is **(Pending Decision — client content required)**.

**Namespace: contact**
Keys: title, subtitle, invitation_text, label_phone, label_email, label_linkedin, label_location, label_whatsapp, location

- invitation_text: Brief invitation paragraph in the contact form column (1-2 sentences).
- label_* keys: Field labels for each contact method.

**Namespace: footer**
Keys: tagline, nav_label, copyright, social_label

- tagline: One-line professional tagline below the client name in the footer brand column.
- nav_label: Optional visually small heading for the Quick Links column. If set to an empty string, the heading is not rendered.
- copyright: Copyright text excluding year and name e.g. "All rights reserved."
- social_label: Accessible aria-label for the social links group.

**Namespace: aria**
Keys: nav_main, nav_footer, nav_mobile, menu_open, menu_close, lang_switch, social_linkedin, contact_phone, contact_email, contact_whatsapp

This namespace is required. All ARIA labels must be translated — screen reader users in Arabic must hear interface labels in Arabic.

- nav_main: aria-label for the main nav element.
- nav_footer: aria-label for the footer navigation list.
- nav_mobile: aria-label for the mobile navigation menu.
- menu_open: aria-label for the hamburger button when menu is closed.
- menu_close: aria-label for the hamburger button when menu is open.
- lang_switch: aria-label for the language switcher button.
- social_linkedin: aria-label for the LinkedIn icon button. Must indicate "opens in new tab".
- contact_phone: aria-label template for the phone link. Uses `{{variable}}` syntax for interpolation (e.g., "Call {{clientName}} at {{number}}").
- contact_email: aria-label template for the email link. Uses interpolation syntax.
- contact_whatsapp: aria-label template for the WhatsApp link. Uses interpolation syntax.

### 4.3 Translation Content Rules

- All translation values must be plain text strings. No HTML tags may be embedded in any translation value.
- Line breaks within body text are managed in the component rendering layer, not in the translation string.
- Section title keys correspond to the h2 heading — must be concise and unambiguous in both languages.
- Every subtitle key and the hero eyebrow key must exist in both files. Set to empty string if unused — never omit the key.
- The nav.cta key and the hero.cta_primary key may carry identical values but are separate keys because the buttons are in different semantic contexts.

### 4.4 Placeholder Convention During Development

Before client content is received, all unknown translation values use this placeholder:

    (Pending — client content required)

This placeholder must never appear in a production build. Its presence is a blocking condition for deployment.

The Arabic-specific placeholder (Pending Translation) indicates the key exists but the Arabic value has not yet been provided. This also must not appear in any production build.

### 4.5 i18n Configuration Requirements (src/i18n.js)

The i18next configuration module must satisfy:

- Initialize react-i18next with both "en" and "ar" as supported languages.
- Determine the initial language using this priority order:
  1. localStorage.getItem("preferred_language") — use stored value if present and valid.
  2. navigator.language beginning with "ar" — initialize in Arabic.
  3. Default to "en" if neither condition is met.
- Use the initReactI18next plugin for React integration.
- Import translation files as static JSON imports — not via HTTP fetch — because this is a Vite-bundled SPA.
- Set interpolation.escapeValue to false — React handles XSS protection natively.
- Set fallbackLng to "en" — if an Arabic key is missing at runtime, fall back to English rather than showing a raw key string.
- Set returnNull to false — undefined keys return the key string rather than null, which aids debugging.

---

## 5. Asset Pipeline Specification

### 5.1 Asset Folder Structure

    src/assets/
      images/
        hero/
          hero-bg.webp       (primary WebP)
          hero-bg.jpg        (JPEG fallback)
        portrait/
          portrait.webp      (primary WebP)
          portrait.jpg       (JPEG fallback)
        certificates/
          cert-01.webp
          cert-01.jpg
          cert-02.webp
          cert-02.jpg
          [additional pairs...]
      fonts/
        [empty — fonts loaded via Google Fonts CDN, not self-hosted]

    public/
      favicon.ico
      og-image.jpg

**Bundling rule:** All images under src/assets/images/ are processed by Vite and receive content-hash filenames in the production build — ensures cache-busting on updates. Assets in public/ are served as-is with no hashing. This is intentional: og-image.jpg and favicon.ico paths are referenced externally by social platforms and browsers, which cache by path.

### 5.2 Image Naming Conventions

| Image | Primary Filename | Fallback Filename | Notes |
|---|---|---|---|
| Hero background | hero-bg.webp | hero-bg.jpg | Fixed filenames referenced directly in the Hero component |
| Portrait | portrait.webp | portrait.jpg | Fixed filenames referenced directly in the About component |
| Certificate n | cert-[NN].webp | cert-[NN].jpg | NN is a zero-padded index matching the id field in certificates.js |
| Open Graph image | og-image.jpg | — | JPEG only — social platforms have inconsistent WebP OG image support |

**Naming rule:** All image filenames must be all-lowercase and hyphenated. Spaces, uppercase letters, and underscores are prohibited.

### 5.3 Image Format and Delivery Rules

All images must be delivered via a picture element with WebP listed first and JPEG fallback second. No img element with a .jpg or .png src is permitted without a WebP alternative in a picture wrapper.

Required delivery pattern:

    <picture>
      <source srcSet="{webpSrc}" type="image/webp" />
      <img src="{fallbackSrc}" alt="..." width="..." height="..." loading="..." />
    </picture>

The sole exception is og-image.jpg in public/, which is referenced only in meta tags and requires no picture wrapper.

### 5.4 Image File Size Budgets (Hard Limits)

| Image | Maximum File Size | Format |
|---|---|---|
| Hero background | 200 KB | WebP |
| Portrait | 100 KB | WebP |
| Each certificate image | 150 KB | WebP |
| Open Graph image | 200 KB | JPEG |

Any image exceeding its budget must be further compressed before inclusion. WebP at quality 80-85 achieves these targets for photographic content. Certificate scans can use quality 75-80.

### 5.5 Image Dimension Requirements

All img elements must include explicit width and height attributes matching the intrinsic pixel dimensions of the file. This prevents Cumulative Layout Shift (CLS) during loading.

| Image | Recommended Intrinsic Dimensions | CSS Display Behavior |
|---|---|---|
| Hero background | 1920 x 1080 px minimum | object-fit: cover full bleed |
| Portrait | 600 x 800 px | width: 100%, height: auto in constrained column |
| Certificate image | 800 x 600 px (4:3 ratio) | width: 100%, aspect-ratio: 4/3 |

If the client provides images at different dimensions, the width and height attributes must match the actual intrinsic dimensions of the provided file. CSS handles visual scaling.

### 5.6 Hero Background Image Specification

**(Pending Decision):** The hero background image has not been provided or approved. A professionally appropriate placeholder must be used during development. Client approval is required before replacing the placeholder with the final image.

Visual requirements:
- Scene: Advanced medical technology environment — interventional imaging suite, diagnostic equipment room, or modern healthcare innovation facility.
- Tone: Professional and modern with adequate dark areas to support the dark gradient overlay.
- No patient imagery. No clinical or bedside scenes.
- No stock photography cliches: no stethoscopes on white backgrounds, no medical cross symbols, no generic posed-doctor images.
- Aspect ratio: landscape, minimum 16:9.
- Color temperature: cool or neutral — consistent with the dark navy and teal brand palette.

### 5.7 Portrait Image Specification

**(Pending Decision):** The client's professional portrait has not been provided. A placeholder must be used during development. The portrait must be a real professional photograph — not an AI-generated likeness — formally approved by the client before deployment to any public URL.

Visual requirements:
- Professional business or corporate attire — not clinical attire (no lab coat, no scrubs).
- Neutral or professional office-appropriate background.
- Headshot or half-body composition.
- Minimum 600px wide after cropping.
- The photograph communicates an executive corporate identity, consistent with the client's healthcare industry positioning.

### 5.8 Certificate Image Specification

**(Pending Decision):** Certificate images have not been provided. Placeholder documents must be used during development. Client must provide actual certificate scans or photographs before the Certificates section is complete.

Quality requirements:
- Text within the certificate must be legible at approximately 300px rendered card width.
- Landscape orientation is strongly preferred. All certificate images must be rendered with `object-fit: cover` within a fixed `aspect-ratio: 4/3` container to safely handle any portrait-oriented certificates and maintain grid height consistency.

### 5.9 Open Graph Image Specification

File: public/og-image.jpg
Dimensions: 1200 x 630 px (standard Open Graph size)
Format: JPEG (social platforms have inconsistent WebP OG support)
File size: Under 200 KB
Content: A designed asset — client name, professional title, and a visual element consistent with the site brand. Dark navy background with teal accent typography is consistent with the project identity.

**(Pending Decision):** The OG image has not been created. It must be designed once the client's name and title are confirmed and approved before any social sharing deployment.

### 5.10 Favicon Specification

File: public/favicon.ico
Requirements:
- A proper multi-size .ico file containing 16x16, 32x32, and optionally 48x48 pixel variants.
- A simple, recognizable mark consistent with the brand — not a medical cross, not a clinical symbol.
- Color: use --color-accent (#14B8A6) or --color-primary (#0F172A) as the dominant element.

**(Pending Decision):** The favicon has not been designed. Client approval required before any public deployment.

---

## 6. Environment Configuration Specification

### 6.1 .env.example File

The project root must contain a .env.example file documenting all environment variables. This file is committed to version control. The actual .env file is never committed.

Content:

    # Site configuration
    # Copy this file to .env and populate values for local development.
    # Production values are configured in the hosting platform environment settings.

    VITE_SITE_URL=https://www.example.com
    # VITE_GA_MEASUREMENT_ID=    # Analytics not approved in current scope — leave commented

Environment variable rules:
- All Vite environment variables consumed in the frontend must be prefixed with VITE_ — non-prefixed variables are not exposed to the client bundle.
- No secret credentials, private API keys, or passwords are used in this project's current scope. The portfolio is a fully static, client-side-only SPA with no backend.
- If analytics or a contact backend is added in a future phase, the corresponding variables must be added to .env.example with descriptive comments at that time.

### 6.2 vite.config.js Requirements

| Config Area | Required Value or Behavior |
|---|---|
| plugins | [react()] using @vitejs/plugin-react |
| build.target | "es2020" — modern evergreen browsers |
| build.minify | "esbuild" — fast and efficient minification |
| build.cssMinify | true |
| build.rollupOptions.output.manualChunks | Configured to separate React and Framer Motion into a vendor chunk — reduces main application bundle size |
| resolve.alias | @ aliased to ./src — enables clean absolute import paths throughout the project |

**Path alias rule:** The @ alias enables import statements such as import { fadeInUp } from '@/utils/animations' rather than relative path traversal. This alias must be configured in vite.config.js and reflected in any jsconfig.json paths configuration for IDE intellisense support.

### 6.3 jsconfig.json Requirements

A `jsconfig.json` must be present at the project root to configure the `@` path alias for IDE intellisense.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 7. Application Entry Point Specification

### 7.1 index.html Head Requirements

The index.html file is the Vite HTML entry point. Its head section must contain the following elements in the stated order:

**Charset and viewport (must appear first):**
- meta charset="UTF-8"
- meta name="viewport" content="width=device-width, initial-scale=1.0"

**SEO meta tags:**
- meta name="description" — value from siteMetadata.metaDescription
- meta name="keywords" — value from siteMetadata.metaKeywords
- meta name="author" — value from siteMetadata.clientName

**Open Graph meta tags:**
- meta property="og:type" content="website"
- meta property="og:url" — value from siteMetadata.siteUrl
- meta property="og:title" — value from siteMetadata.ogTitle
- meta property="og:description" — value from siteMetadata.ogDescription
- meta property="og:image" — value from siteMetadata.ogImagePath

**Twitter Card meta tags:**
- meta name="twitter:card" content="summary_large_image"
- meta name="twitter:title" — value from siteMetadata.ogTitle
- meta name="twitter:description" — value from siteMetadata.ogDescription
- meta name="twitter:image" — value from siteMetadata.ogImagePath

**Canonical link:**
- link rel="canonical" — value from siteMetadata.siteUrl

**Favicon:**
- link rel="icon" type="image/x-icon" href="/favicon.ico"

**Google Fonts preconnect (must appear before the stylesheet link):**
- link rel="preconnect" href="https://fonts.googleapis.com"
- link rel="preconnect" href="https://fonts.gstatic.com" crossorigin

**Google Fonts stylesheet:**
Single combined request loading Manrope at weights 600, 700, 800; Inter at weights 400, 500, 600; and Alexandria at weights 400, 500, 700. All three families in one request with display=swap appended.

**Page title:** title element — value from siteMetadata.pageTitle

**Root element and module script:**
- div id="root"
- script type="module" src="/src/main.jsx"

**HTML element rules:**
- The html element must have initial attributes lang="en" and dir="ltr". These are dynamically updated by the language direction hook on language change. The initial values must be present for correct first-paint rendering and SEO indexing.
- No script tags other than the Vite entry module may appear in index.html in the current scope.
- No analytics snippets, no third-party embeds, no inline JavaScript.

### 7.2 src/main.jsx Requirements

The React entry point must import CSS foundation files in this exact order before any other import:

1. src/styles/reset.css
2. src/styles/tokens.css
3. src/styles/base.css
4. src/styles/global.css

Import order is required for correct cascade behavior: reset normalizes browser defaults before tokens define custom properties; base applies visual defaults using tokens; global adds utilities and document-level helpers.

It must then:
- Import src/i18n.js to initialize the i18next instance before the React tree renders.
- Import App from src/App.jsx.
- Render App using ReactDOM.createRoot targeting the #root element.
- Wrap App in React.StrictMode.

### 7.3 src/App.jsx Composition Specification

**Section render order (confirmed by Part 2, Section 2.1):**

    header  -> Navbar       (eager import)
    main
      Hero          (eager — above-the-fold, must NOT be lazy)
      About         (lazy via React.lazy)
      Expertise     (lazy via React.lazy)
      Experience    (lazy via React.lazy)
      Certificates  (lazy via React.lazy)
      Contact       (lazy via React.lazy)
    footer  -> Footer       (eager import)

**Lazy loading rule:** All sections from About through Contact must be wrapped in Suspense. The Suspense fallback must be a blank element with the correct background color for that section and an approximate minimum height (`min-height: 400px`) — maintains layout stability during loading. A visible spinner is not appropriate.

**App-level state:** The App component manages no local state. Language state is fully owned by react-i18next. There is no global theme state in the current project scope.

**Language direction side effect:** A useEffect (or delegated to the useLanguageDirection hook in Section 10.3) must synchronize document.documentElement.lang and document.documentElement.dir whenever i18n.language changes. This effect must run once on initial mount and again on every subsequent language change.

---

## 8. CSS Foundation File Specifications

### 8.1 src/styles/reset.css

The reset file normalizes browser default styles. Must be the first CSS file imported in main.jsx.

Required reset behaviors:
- Box model: all elements set to box-sizing: border-box including pseudo-elements.
- Margin and padding zeroed on all elements.
- html: scroll-behavior: smooth.
- img, picture, video, canvas, svg: display: block; max-width: 100%.
- input, button, textarea, select: font: inherit.
- p, h1, h2, h3, h4, h5, h6: overflow-wrap: break-word.
- List styles removed from ul and ol where they appear as structural navigation or grid elements.

Rule: The reset applies no opinionated visual styling. No color, font-family, or spacing values are set here.

### 8.2 src/styles/tokens.css

The token file defines all CSS Custom Properties. It is the single source of all design token values. All tokens are defined under :root {}.

Required token groups (values per Part 1):

Color tokens (9):
- --color-primary, --color-accent, --color-background, --color-surface
- --color-text-primary, --color-text-secondary
- --color-border, --color-divider, --color-hover

Shadow tokens (3): --shadow-sm, --shadow-md, --shadow-lg

Border-radius tokens (5): --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full

Spacing tokens (14): --space-1 through --space-24
Values per Part 1 Section 8.1: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

Container tokens: --container-max: 1200px, --container-padding: clamp(1rem, 5vw, 2rem)

Typography size tokens (8): --text-display, --text-h1, --text-h2, --text-h3, --text-h4, --text-body-lg, --text-body, --text-body-sm, --text-caption

Line height tokens (4): --leading-tight, --leading-snug, --leading-normal, --leading-relaxed

Rule: No other selector may define token values in this file. Dark mode or alternative theme overrides, if added in a future phase, must go in a separate file scoped to an attribute selector — never by modifying tokens.css directly.

### 8.3 src/styles/base.css

The base file applies foundational visual defaults using token values from tokens.css.

Required base styles:
- html: font-size: 16px (establishes the 1rem baseline).
- body: background-color: var(--color-background), color: var(--color-text-primary), font-family: 'Inter', sans-serif, line-height: var(--leading-normal).
- Arabic override on [lang="ar"] body and [dir="rtl"] body: font-family: 'Alexandria', sans-serif, line-height: var(--leading-relaxed).
- h1, h2, h3, h4: font-family: 'Manrope', sans-serif, line-height: var(--leading-snug), color: var(--color-text-primary).
- Arabic heading override on [lang="ar"] h1, h2, h3, h4: font-family: 'Alexandria', sans-serif.
- a: color: inherit, text-decoration: none (component-level styles apply link colors).
- Focus ring: *:focus-visible — outline: 2px solid var(--color-accent), outline-offset: 2px.
- Text selection: ::selection — background: var(--color-accent), color: #FFFFFF.

### 8.4 src/styles/global.css

The global file contains utility classes and globally shared helpers not belonging to any specific component.

Required contents:

**Visually hidden utility (.visually-hidden):**
Hides content visually while keeping it accessible to screen readers. Uses the standard implementation: position: absolute, 1px dimensions, negative margin, overflow: hidden, clip, white-space: nowrap, border-width: 0.

**Section scroll margin:**
All section elements must have scroll-margin-top of 72px (desktop) and 64px (below 1023px) to prevent anchored navigation from hiding section headings behind the sticky Navbar.

**CSS reduced motion failsafe:**
A @media (prefers-reduced-motion: reduce) block that sets animation-duration, animation-iteration-count, and transition-duration to minimal values on all elements using !important.

This is a failsafe layer — the primary handling is via Framer Motion's useReducedMotion hook. Both layers must be present.

Rule: global.css must not contain component-specific styles. Styles specific to one component belong in that component's CSS Module.

---

## 9. Utility Module Specifications

### 9.1 src/utils/animations.js

This module is the canonical and sole source of Framer Motion animation variant objects. No animation variant may be defined inline in any component file. This rule is absolute — no exceptions.

**Required exports:**

| Export Name | Type | Description |
|---|---|---|
| fadeIn | Framer Motion variant | Fade from opacity 0 to 1. No directional movement. |
| fadeInUp | Framer Motion variant | Fade in with 20px upward slide. Primary content reveal variant. |
| staggerContainer | Framer Motion variant | Parent variant that staggers child animations by 0.1s. |
| ANIMATION_DURATION | Plain object of constants | Named duration values: fast (0.3s), normal (0.5s), slow (0.6s). |
| ANIMATION_EASING | Plain object of constants | Named easing cubic-bezier arrays: default, enter, exit. |

Exact values for these variants and constants are specified in Part 1, Sections 9.4 and 9.5. No additional variants may be added to this file without first updating the animation specification in Part 1 and then updating the required exports table above.

**Reduced motion guard:** The exported variant objects are pure configuration objects. Reduced motion handling is the responsibility of the consuming component via useReducedMotion(). The variants themselves contain no conditional motion logic.

### 9.2 src/utils/cn.js

A minimal utility function for conditionally joining CSS class name strings.

**Contract:**
- Accepts any number of arguments.
- Each argument may be a string, undefined, null, or false.
- Returns a single space-separated string of all truthy string arguments.
- Implemented as a pure function using only native JavaScript — no external dependency.

Example usage: className={cn(styles.card, isActive && styles.cardActive, className)}

This utility replaces the need for the clsx or classnames packages, both of which are unapproved dependencies.

---

## 10. Custom Hook Specifications

### 10.1 src/hooks/useScrollPosition.js

**Purpose:** Tracks whether the user has scrolled past a defined threshold, returning a boolean. Used by the Navbar to toggle the scrolled visual state.

**Contract:**
- Accepts one optional parameter: threshold — a number in pixels, default 80.
- Returns isScrolled — a boolean: true when window.scrollY > threshold, false otherwise.
- Attaches a scroll event listener to window on mount. Removes it on unmount.
- Uses passive event listener option { passive: true } for scroll performance.
- Throttles the scroll handler using requestAnimationFrame to avoid excessive re-renders.

### 10.2 src/hooks/useActiveSection.js

**Purpose:** Determines which page section is currently in the viewport. Returns the id string of the currently active section. Used by the Navbar to apply the active link highlight state.

**Contract:**
- Accepts an array of section id strings to observe.
- Returns activeSection — the id string of the currently visible section.
- Implemented via the IntersectionObserver API.
- Uses a rootMargin of "-72px 0px -60% 0px" — accounts for Navbar height; considers a section active when its top portion is below the Navbar and within the upper 40% of the viewport.
- When multiple sections are simultaneously observed (fast scrolling), the section with the smallest positive boundingClientRect.top value is considered active.
- Disconnects all observers on unmount.

### 10.3 src/hooks/useLanguageDirection.js

**Purpose:** Synchronizes the html element's lang and dir attributes with the currently active i18next language. Returns the current direction string for use in layout logic if needed.

**Contract:**
- Reads the current language from i18n.language using the useTranslation hook.
- Derives text direction: "rtl" if language is "ar", "ltr" for all other language codes.
- Applies document.documentElement.lang and document.documentElement.dir as a useEffect side effect.
- Returns an object with shape { language: string, direction: string }.
- The effect runs on initial mount and re-runs whenever i18n.language changes.

### 10.4 src/hooks/useReducedMotion.js

**Purpose:** Re-exports Framer Motion's built-in useReducedMotion hook under a consistent project-local import path.

**Contract:**
- Imports useReducedMotion from 'framer-motion'.
- Re-exports it as the named export useReducedMotion.
- No additional logic — this is a pure re-export for import path consistency.

**Import path rule:** All components that conditionally disable animations must import useReducedMotion from '@/hooks/useReducedMotion' — not directly from 'framer-motion'. This enforces a single import path that can be extended without modifying all consumer files.

---

## 11. Deployment Readiness Specification

### 11.1 Production Build Requirements

The production build is generated via npm run build (which executes vite build). Output directory: dist/.

**Build output verification checklist:**
- [ ] No build errors — the process completes without throwing.
- [ ] dist/index.html exists and contains all required meta tags with populated non-placeholder values.
- [ ] CSS output is minified and split between vendor styles and application styles.
- [ ] JavaScript output is minified, tree-shaken, and split into a vendor chunk (React, Framer Motion) and an application chunk.
- [ ] All image references in the built output resolve correctly — no 404 errors on asset paths.
- [ ] dist/favicon.ico exists and is valid.
- [ ] dist/og-image.jpg exists, is 1200x630px, and is under 200KB.
- [ ] Google Fonts stylesheet link requests only the required font weights.
- [ ] No console.log statements present in any JavaScript output file.

### 11.2 Pre-Deployment Content Gate

All of the following conditions must be true before deployment to any publicly accessible URL, including staging environments discoverable by search crawlers:

| Condition | Gate Level |
|---|---|
| All (Pending — client content required) placeholders replaced in both translation files | Blocking |
| All (Pending Translation) placeholders replaced in ar/translation.json | Blocking |
| Client portrait photograph provided, professional, and approved | Blocking |
| Hero background image provided or sourced and approved | Blocking |
| All certificate images provided by client | Blocking |
| Open Graph image designed, correctly sized, and approved | Blocking |
| Favicon designed, correctly sized, and approved | Blocking |
| All contact information confirmed and populated in contact.js | Blocking |
| siteMetadata.js fully populated with approved client data | Blocking |
| Target domain confirmed and siteUrl updated | Blocking |
| All Pending Decisions in Section 12 resolved or formally deferred with documented reason | Blocking |

### 11.3 Hosting Platform

**(Pending Decision):** The deployment and hosting platform has not been specified in project-context.md. This decision is required before CI/CD pipelines, environment variable injection, and deployment scripts can be configured.

The project build output is a fully static site requiring only static file hosting with no server-side processing. Compatible platforms include Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static hosting provider.

This decision does not block frontend development. It blocks only the deployment pipeline configuration.

### 11.4 Performance Validation

Core Web Vitals must be measured against the live production deployment with final client assets in place:

| Validation Method | Required Action |
|---|---|
| Google Lighthouse | Run in Chrome Incognito against the production URL. All four targets must be met: LCP <= 2.5s, CLS <= 0.1, INP <= 200ms, FCP <= 1.8s. |
| Chrome DevTools Network | Verify hero image loads in WebP format and meets the 200KB file size budget. |
| PageSpeed Insights | Run against the live production URL and record scores for documentation. |

Performance validation must be executed after all final client-provided images are in place. Development placeholder images may have different performance characteristics than final production assets.

---

## 12. Consolidated Pending Decisions Register

This section is the single authoritative register of all Pending Decisions recorded across Parts 1, 2, and 3. Every decision listed here must be resolved — or formally deferred with a documented reason — before the project is considered production-ready.

---

### 12.1 Client Content — Blocks Section Implementation

| ID | Decision Required | Sections Affected |
|---|---|---|
| CD-1 | Client's full professional name | Footer, Copyright notice, SEO metadata |
| CD-2 | Client's one-line professional title | Hero eyebrow, Footer tagline, SEO metadata |
| CD-3 | Hero headline text — English and Arabic | Hero |
| CD-4 | Hero sub-headline text — English and Arabic | Hero |
| CD-5 | Hero eyebrow label text — or decision to omit it entirely | Hero |
| CD-6 | About biography text — English and Arabic | About |
| CD-7 | About mission statement — English and Arabic | About |
| CD-8 | Core values list — up to 6 values, English and Arabic | About |
| CD-9 | Expertise area short descriptions — 1-2 sentences per area, English and Arabic | Expertise |
| CD-10 | Professional experience history — all positions, organizations, date ranges, descriptions in English and Arabic | Experience |
| CD-11 | Number of experience timeline entries | Experience |
| CD-12 | Certificate information — titles, issuing organizations, years, English and Arabic | Certificates |
| CD-13 | Number of certificate entries | Certificates |
| CD-14 | Contact phone number | Contact |
| CD-15 | Contact email address | Contact |
| CD-16 | LinkedIn profile URL | Contact, Footer |
| CD-17 | Location display string | Contact |
| CD-18 | WhatsApp number — or confirmation to omit the WhatsApp field | Contact |
| CD-19 | Additional social platform profiles beyond LinkedIn — or confirmation that LinkedIn is the only social link | Footer |

---

### 12.2 Visual Assets — Blocks Public Deployment

| ID | Decision Required | Sections Affected |
|---|---|---|
| VA-1 | Hero background image — professionally sourced or approved photography. Not an AI-generated likeness. | Hero |
| VA-2 | Professional portrait photograph — real photograph, client-approved, before any public URL deployment | About |
| VA-3 | All certificate images — actual scans or photographs of client credentials | Certificates |
| VA-4 | Open Graph image — designed brand asset at 1200x630px | SEO, Social Sharing |
| VA-5 | Favicon — designed brand mark in multi-size .ico format | Browser, SEO |

---

### 12.3 SEO and Metadata — Blocks Production Build

| ID | Decision Required | Implementation Context |
|---|---|---|
| SM-1 | Meta description content — max 160 characters, B2B healthcare audience | index.html |
| SM-2 | Meta keywords string — healthcare industry expertise focus, not clinical terms | index.html |
| SM-3 | Open Graph title and description text | index.html, social sharing |
| SM-4 | Target domain URL — siteUrl cannot be finalized without a confirmed registered domain | SEO, canonical link |
| SM-5 | JSON-LD structured data (Person schema) — requires client name, title, and organization affiliations | SEO |

---

### 12.4 Implementation Decisions — Blocks Specific Sections

| ID | Decision Required | Sections Affected |
|---|---|---|
| IM-1 | Mobile menu visual pattern — Resolved (full-width dropdown) | Navbar |
| IM-2 | Timeline display direction — reverse-chronological (newest first, recommended) vs. chronological | Experience |
| IM-3 | Timeline connector line animation — Resolved (static line without animation) | Experience |
| IM-4 | Expertise grid display order — which of the eight areas appears first in the 4x2 grid | Expertise |
| IM-5 | Certificate card display order — by year, by relevance, or by topic grouping | Certificates |
| IM-6 | Lucide icon assignments for all eight expertise areas | Expertise |
| IM-7 | Hero animated background pattern type (dot grid vs. line grid) and exact opacity value | Hero |
| IM-8 | Certificate image aspect ratio constraint — Resolved (object-fit: cover with 4/3 ratio) | Certificates |

---

### 12.5 Infrastructure — Blocks Deployment Pipeline

| ID | Decision Required | Blocking Phase |
|---|---|---|
| IN-1 | Hosting and deployment platform selection | CI/CD pipeline configuration, deployment scripts |

---

## 13. Project-Wide Implementation Readiness Checklist

The project is considered production-ready only when every item below is checked. Items are grouped by domain. This checklist consolidates all acceptance criteria from Parts 1, 2, and 3.

---

### 13.1 Architecture and Foundation

- [ ] Project folder structure matches the canonical structure in Part 1, Section 5.1
- [ ] All naming conventions follow Part 1, Section 5.2 — component folders, hook files, data files, translation files
- [ ] vite.config.js includes the @ path alias, es2020 build target, and manual vendor chunks
- [ ] .env.example exists in the project root with all environment variables documented
- [ ] No .env file is committed to version control

---

### 13.2 Design System

- [ ] All 9 color tokens defined in src/styles/tokens.css
- [ ] All 3 shadow tokens (sm, md, lg) defined
- [ ] All 5 border-radius tokens defined
- [ ] All 14 spacing tokens (--space-1 through --space-24) defined
- [ ] All 8 typography size tokens defined using clamp() for responsive scaling where specified in Part 1
- [ ] All 4 line height tokens defined
- [ ] Container max-width and padding tokens defined
- [ ] No raw hex color value in any component CSS file — all color via var(--color-*) tokens
- [ ] No raw pixel spacing value in any component CSS — all spacing via var(--space-*) tokens

---

### 13.3 Typography

- [ ] Manrope loaded via Google Fonts at weights 600, 700, 800
- [ ] Inter loaded at weights 400, 500, 600
- [ ] Alexandria loaded at weights 400, 500, 700
- [ ] display=swap parameter present in the Google Fonts stylesheet URL
- [ ] Google Fonts preconnect links present in index.html before the font stylesheet link
- [ ] base.css applies font families correctly — English: Manrope headings, Inter body; Arabic: Alexandria for all text
- [ ] Exactly one h1 element rendered in the page at any given time
- [ ] Heading hierarchy is sequential with no skipped levels in any section

---

### 13.4 Internationalization

- [ ] src/i18n.js initializes react-i18next with both "en" and "ar" language codes
- [ ] Language initialization priority order implemented: localStorage first, navigator.language second, default English third
- [ ] Both en/translation.json and ar/translation.json contain every key defined in Section 4.2 of this document
- [ ] No (Pending — client content required) or (Pending Translation) values remain in either translation file
- [ ] Language switching updates document.documentElement.lang and document.documentElement.dir synchronously
- [ ] Language preference persisted to localStorage under the key preferred_language
- [ ] No hardcoded text string exists in any JSX component file
- [ ] All layouts verified correct in both LTR (English) and RTL (Arabic) modes
- [ ] No margin-left, margin-right, text-align: left, or text-align: right in any layout-affecting CSS rules

---

### 13.5 Accessibility

- [ ] All color combinations pass WCAG AA contrast ratio — 4.5:1 for body text, 3:1 for large text
- [ ] White text on dark hero overlay achieves minimum 4.5:1 contrast at all viewport sizes
- [ ] Keyboard-only navigation reaches every interactive element in logical tab order
- [ ] All img elements have descriptive alt attributes, explicit width, and explicit height
- [ ] All icon-only interactive elements have aria-label attributes
- [ ] All page sections use correct semantic HTML landmark elements (header, nav, main, section, footer)
- [ ] Each section has aria-labelledby referencing its h2 heading id
- [ ] Focus indicators visible on all focusable elements in both light and dark background contexts
- [ ] Mobile menu traps focus when open; returns focus to toggle on close; closes on Escape key press
- [ ] All Framer Motion animations disabled via useReducedMotion() when prefers-reduced-motion: reduce is detected
- [ ] CSS prefers-reduced-motion failsafe block present in global.css
- [ ] Experience timeline entries wrapped in an ol (ordered list) element
- [ ] Certificate grid items wrapped in a ul of li elements
- [ ] Contact information block wrapped in an address element
- [ ] All external links (target="_blank") have rel="noopener noreferrer" and an aria-label indicating the link opens in a new tab

---

### 13.6 Performance

- [ ] LCP <= 2.5 seconds measured via Lighthouse on the production build with final assets
- [ ] CLS <= 0.1 — no layout shifts from late-loading assets
- [ ] FCP <= 1.8 seconds
- [ ] INP <= 200ms
- [ ] Hero background image <= 200KB WebP, delivered via picture element
- [ ] Portrait image <= 100KB WebP
- [ ] Each certificate image <= 150KB WebP
- [ ] Hero image uses loading="eager" and fetchpriority="high"
- [ ] All below-fold images use loading="lazy"
- [ ] All img elements have explicit width and height attributes
- [ ] All sections from About through Contact are lazy-loaded via React.lazy() and Suspense
- [ ] Production build has no unused CSS in component CSS Modules
- [ ] No console.log or debug statements in the committed codebase

---

### 13.7 SEO

- [ ] index.html contains all required meta tags: charset, viewport, description, keywords, author, all OG tags, Twitter card, canonical
- [ ] No placeholder values remain in any index.html meta tag
- [ ] og-image.jpg exists in /public/, is 1200x630px, and is under 200KB
- [ ] All page sections have valid id attributes matching the anchor scheme: hero, about, expertise, experience, certificates, contact
- [ ] html lang attribute is dynamically set to the correct language code
- [ ] time elements with dateTime attributes used for all date values in Experience and Certificates sections

---

### 13.8 Components

- [ ] Reusable primitives exist: Container, Button (3 variants), Card (2 variants), SectionHeader, LanguageSwitcher
- [ ] All section components exist in src/sections/: Navbar, Hero, About, Expertise, Experience, Certificates, Contact, Footer
- [ ] No section component renders hardcoded content — all content from data files or i18n keys
- [ ] All section components apply whileInView with viewport={{ once: true, amount: 0.2 }} for scroll-triggered animations
- [ ] All Framer Motion variants imported from src/utils/animations.js — no variant objects defined inline in any component file
- [ ] SectionHeader correctly handles titleKey, subtitleKey, alignment, and theme props
- [ ] Button component meets 44px minimum touch target height
- [ ] LanguageSwitcher is the same reusable component instance used in both Navbar and Footer
- [ ] Each component has exactly one co-located CSS Module file — no component shares a CSS file with another

---

### 13.9 Data Layer

- [ ] src/data/expertise.js exports expertiseItems — exactly 8 objects per the structure in Section 3.1
- [ ] src/data/experience.js exports experienceItems — all entries per the structure in Section 3.2
- [ ] src/data/certificates.js exports certificateItems — all entries per the structure in Section 3.3
- [ ] src/data/contact.js exports contactInfo — all fields populated with client data or explicitly set to null
- [ ] src/data/siteMetadata.js exports siteMetadata — all fields populated with approved client data
- [ ] Every i18n key referenced in data files (titleKey, descriptionKey, positionKey, organizationKey, issuerKey) resolves to a valid key in both translation files

---

### 13.10 Animation

- [ ] No bounce easing on any animated element
- [ ] No continuous or infinite animations — the sole approved exception is the hero pattern overlay's extremely subtle CSS animation
- [ ] No parallax scrolling effects
- [ ] No rotation animations
- [ ] No scale above scale(1.05) on any hover effect
- [ ] All scroll-triggered animations use viewport={{ once: true }}
- [ ] All animation variants imported from src/utils/animations.js — none defined inline
- [ ] useReducedMotion() used in all components with Framer Motion animations; elements render at final state when motion is reduced
- [ ] Footer section does not use any Framer Motion animations — renders statically

---

### 13.11 Prohibited Patterns Compliance

- [ ] No hospital, clinic, or patient-care visual language used anywhere in the project
- [ ] No medical illustration used as decoration
- [ ] Client not described as a practicing physician in any text content in either language
- [ ] No glassmorphism panels in any section
- [ ] No decorative elements without semantic purpose
- [ ] No npm dependencies added beyond the approved stack: React, Vite, Framer Motion, react-i18next, Lucide React
- [ ] No inline styles for structural or visual properties — only Framer Motion programmatic animation values may use inline styles
- [ ] No generic or non-semantic CSS class names (wrapper, box, inner) used in any component CSS Module

---

### 13.12 Pending Decisions Gate

- [ ] All decisions in Section 12.1 (Client Content — CD-1 through CD-19) are resolved
- [ ] All decisions in Section 12.2 (Visual Assets — VA-1 through VA-5) are resolved
- [ ] All decisions in Section 12.3 (SEO and Metadata — SM-1 through SM-5) are resolved
- [ ] All decisions in Section 12.4 (Implementation — IM-1 through IM-7) are resolved or formally deferred with documented reason
- [ ] Decision IN-1 (Hosting platform) in Section 12.5 is resolved

---

*End of Project Blueprint — Part 3*

---

## Document Metadata

| Field | Value |
|---|---|
| Document | project-blueprint-part-3.md |
| Version | 1.0.0 |
| Status | Final — Approved for Implementation |
| Source Authority | docs/project-context.md — Single Source of Truth |
| Prerequisites | docs/blueprint/project-blueprint-part-1.md, docs/blueprint/project-blueprint-part-2.md |
| Pending Decisions | See Section 12 — Consolidated Pending Decisions Register |
| Completion Note | This document completes the blueprint series. No further blueprint documents are required. Implementation may begin on all sections for which Pending Decisions are not blocking. |
