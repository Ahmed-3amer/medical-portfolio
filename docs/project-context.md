# Project Context

# 1. Project Overview

## Purpose

This document is the official **Project Memory / Context Transfer
Document** for the Medical Portfolio project.

It records the final approved decisions extracted from the project
discussions. It is the permanent reference for future blueprint creation
and implementation.

This document is **NOT**: - A Blueprint - An Implementation Plan - A
Prompt

It is the project's Single Source of Truth.

---

# 2. Project Background

The project is a premium personal portfolio website for a medical
professional.

The primary goal is not simply presenting information, but creating
trust before the first patient interaction.

The website should communicate professionalism, credibility, expertise
and modern medical identity through thoughtful UI/UX rather than
excessive visual effects.

---

# 3. Project Vision

Build a premium medical portfolio that feels comparable to high-end
healthcare brands.

The experience should be:

- Clean
- Elegant
- Trustworthy
- Professional
- Fast
- Accessible
- Mobile-first

Every design decision must support these goals.

The website represents a healthcare industry executive rather than a clinical healthcare provider.

---

# 4. Project Goals

Primary goals:

- Build patient trust.
- Present qualifications professionally.
- Highlight expertise clearly.
- Encourage contact.
- Maintain excellent performance.
- Deliver a premium first impression.

Secondary goals:

- Easy future maintenance.
- Easy content updates.
- Strong SEO foundation.
- Excellent responsive experience.

---

# 5. Client Profile

The client is a senior healthcare industry professional specializing in multiple sectors across the medical and healthcare market.

Core areas of expertise include:

- Interventional Cardiology Supplies
- Interventional Radiology Solutions
- Neurointerventional (Brain & Nervous System) Products
- Diagnostic Imaging Solutions
- Modern Image-Guided Treatment Technologies
- Medical Devices Import & Export
- Medical Equipment
- Cosmetic Equipment & Products

The portfolio should present the client as a trusted business professional with deep industry knowledge, strong corporate relationships, and extensive experience across advanced healthcare technologies and international medical trade.

---

# 6. Target Audience

Primary audience:

- Pharmaceutical Companies
- Medical Device Manufacturers
- Healthcare Technology Companies
- Interventional Radiology Centers
- Cardiology Centers
- Hospitals
- Diagnostic Imaging Centers
- Import & Export Partners
- International Suppliers
- Corporate Recruiters
- Business Partners

Audience expectations:

- Fast information
- Easy navigation
- Trustworthy appearance
- Professional presentation
- Comfortable reading experience

---

# 7. Brand Personality

The brand identity should consistently communicate:

- Professionalism
- Trust
- Precision
- Care
- Simplicity
- Confidence
- Modernity

Avoid visual noise or unnecessary decoration.

---

# 8. Final Design Philosophy

Design principles:

- Minimalism over decoration.
- Clarity over complexity.
- Content first.
- Strong visual hierarchy.
- Generous whitespace.
- Consistent spacing system.
- Premium corporate appearance.
- Every UI element must serve a purpose.

The interface should never feel crowded or overly animated.

---

# 9. Final UI Identity

Visual direction:

- Clean medical aesthetic.
- Premium executive style.
- Soft modern appearance.
- Consistent spacing.
- Balanced typography.
- Elegant cards.
- Modern icons.
- Limited accent colors.
- Calm visual rhythm.

Avoid:

- Flashy gradients.
- Loud colors.
- Decorative illustrations without purpose.
- Trendy effects that reduce credibility.

---

# 10. Development Philosophy

The implementation should prioritize:

- Maintainability
- Scalability
- Component reusability
- Consistency
- Readability
- Simplicity

The project should remain easy to extend without architectural changes.

---

# 11. Global Decision Rules

These rules govern all future development.

- Always follow the latest approved project decisions.
- Do not reintroduce rejected ideas.
- Do not invent missing requirements.
- If information is unavailable, mark it as Pending.
- The project values quality over unnecessary complexity.

---

## 12. Final Technical Decisions

### Core Stack

- React
- Vite

### Supporting Libraries

- Framer Motion
- react-i18next
- Lucide React

### Why React + Vite

The project is a modern portfolio application that benefits from a
lightweight, fast and maintainable React ecosystem.

Reasons: - Excellent developer experience. - Fast development server. -
Optimized production builds. - Simple deployment. - Easy long-term
maintenance. - Large ecosystem.

### Why Framer Motion

Framer Motion is the official animation solution for this project.

Reasons: - Native React integration. - Declarative API. - Reusable
animation components. - Better maintainability than scroll-only
animation libraries. - Premium motion quality.

### Internationalization

The website supports:

- Arabic
- English

Requirements: - Easy language switching. - RTL/LTR support. - Consistent
layout in both languages. - Text must never break the layout.

---

## 13. Recommended Folder Structure

src/

- assets/
- components/
- sections/
- layout/
- hooks/
- locales/
- styles/
- utils/
- data/

Every section should be implemented as an independent React component.

---

## 14. Final Website Structure

Navbar

↓

Hero

↓

About

↓

Areas of Expertise

↓

Experience

↓

Courses & Certificates

↓

Contact

↓

Footer

---

## 15. Section Decisions

### Navbar

Purpose: Provide simple and intuitive navigation.

Guidelines: - Sticky navigation. - Minimal links. - Language switch. -
Clear CTA. - Responsive mobile menu.

---

### Hero

Purpose: Create trust immediately.

Guidelines: - Premium first impression. - Strong headline. -
Professional introduction. - Primary CTA. - Optional secondary CTA. -
Balanced layout. - Above-the-fold optimization.

Final Hero Decisions:

- Full-screen hero section.
- Professional healthcare technology cover image representing advanced medical devices, diagnostic imaging, and modern healthcare innovation.
- Dark gradient overlay for readability.
- Subtle animated dot/grid pattern overlay.
- No portrait image inside the hero.
- Primary CTA: Contact Me.
- No scroll indicator.
- Minimal, elegant motion only.

---

### About

Purpose: Introduce the doctor professionally.

Content: - Biography. - Mission. - Values. - Experience summary.

Final About Decisions:

- Professional portrait of the client.
- Editorial two-column layout.
- Biography.
- Mission.
- Core values.
- Industry-focused narrative instead of personal storytelling.

Highlight years of industry experience, business partnerships, and contribution to advanced healthcare technologies.

---

### Areas of Expertise / Services

Purpose: Present medical specialties clearly.

Guidelines: - Clean cards. - Clear icons. - Short descriptions. - Easy
scanning.

Final Layout:

Editorial Grid.

Avoid traditional service cards.

Content should emphasize specialized healthcare sectors rather than generic medical services.

---

### Experience

Purpose: Highlight professional journey.

Content: - Positions. - Organizations. - Milestones.

Layout:

Editorial Timeline.

Focus on professional journey rather than resume formatting.

---

### Courses & Certificates

Final Decision: Merged into one section.

Reason: Cleaner information architecture. Less scrolling. Better user
experience.

Layout:

Premium Regular Grid.

Avoid Masonry layout.

Use actual certificate images provided by the client.

Cards should remain aligned for visual consistency.

---

### Gallery

Purpose: Present approved professional images only.

Avoid: - Random stock photos. - Low quality media.

---

### Testimonials

Purpose: Increase credibility.

Guidelines: - Authentic. - Easy to read. - Professional presentation.

---

### Contact

Purpose: Make communication simple.

Content may include: - Phone - Email - Address - Working hours - Social
links - Map (if approved)

Final Decision:

Digital Business Card.

No contact form.

Display:

- Phone
- Email
- LinkedIn
- Location
- WhatsApp (if available)

---

### Footer

Simple corporate footer.

Contains:

- Copyright
- Quick Links
- Language Switch
- Social Links

Avoid decorative elements.

---

# 16. Final Color Palette

| Usage          | Color   |
| -------------- | ------- |
| Primary        | #0F172A |
| Accent         | #14B8A6 |
| Background     | #F8FAFC |
| Surface        | #FFFFFF |
| Primary Text   | #1E293B |
| Secondary Text | #64748B |
| Border         | #E2E8F0 |
| Divider        | #CBD5E1 |
| Hover          | #F1F5F9 |

The color palette reflects professionalism, trust, healthcare, and executive identity.

---

# 17. Final Typography

Typography should communicate professionalism before personality.

English Headings:

- Manrope

English Body:

- Inter

Arabic:

- Alexandria

Avoid: - Decorative fonts. - Script fonts. - Multiple font families. -
Inconsistent font sizes.

---

## 18. UI Consistency Rules

- Maximum container width: 1200px.
- Consistent border radius across components.
- 8px spacing system.
- Consistent icon size.
- Uniform section padding.
- Soft shadows only.
- Minimal hover effects.
- Strong typography hierarchy.

---

# 19. Animation Philosophy

## Primary Library

Framer Motion

### Core Principles

Animations exist to support the content.

They should never become the focus.

Motion must improve comprehension, hierarchy and perceived quality.

### Approved Animations

- Fade
- Slide
- Stagger
- Gentle opacity transitions
- Small directional movement

### Motion Rules

- Duration between 0.3 and 0.6 seconds.
- Natural easing.
- Trigger once when appropriate.
- Consistent timing.
- Respect prefers-reduced-motion.

Never animate every element simultaneously.

### Avoid

- Bounce
- Rotation
- Heavy scaling
- Infinite floating
- Heavy parallax
- Over-animated interfaces

Respect prefers-reduced-motion.

---

# 20. Performance Philosophy

Performance is a feature.

Priority order:

1.  Fast loading.
2.  Smooth scrolling.
3.  Lightweight assets.
4.  Optimized images.
5.  Lazy loading where appropriate.
6.  Minimal JavaScript.
7.  Minimal third-party libraries.

Every new dependency must have a clear justification.

---

# 21. SEO Philosophy

The project should follow modern SEO best practices.

Requirements:

- Semantic HTML.
- Logical heading hierarchy.
- Descriptive page titles.
- Meta description.
- Optimized image alt text.
- Clean URL structure.
- Structured content.
- Strong Core Web Vitals.

SEO should be built into the project from the beginning.

Focus SEO on healthcare industry expertise rather than clinical medical services.

---

# 22. Accessibility Philosophy

Accessibility is mandatory.

Support:

- Keyboard navigation.
- Visible focus states.
- Screen readers.
- Semantic landmarks.
- Proper color contrast.
- Reduced motion preference.

Interfaces should remain usable without animations.

---

# 23. Responsive Philosophy

Responsive behavior is a core design requirement.

Strategy:

- Mobile First.
- Fluid layouts.
- Flexible grids.
- Responsive typography.
- Consistent spacing.
- Touch-friendly controls.

Supported devices:

- Mobile
- Tablet
- Laptop
- Desktop

No layout should rely on fixed dimensions.

---

# 24. Development Philosophy

The project should be developed with long-term maintainability in mind.

## Core Principles

- Clean architecture.
- Reusable components.
- Separation of concerns.
- Readable code.
- Predictable folder structure.
- Consistent naming conventions.
- Scalable project organization.

Every implementation decision should prioritize clarity over cleverness.

---

# 25. Global Project Rules

These rules apply to the entire project.

## Design Rules

- Every section must have a clear purpose.
- Maintain a consistent visual language.
- Use whitespace intentionally.
- Preserve a premium medical identity.
- Keep interfaces calm and focused.

## Development Rules

- Build reusable UI components.
- Avoid duplicated logic.
- Keep components modular.
- Follow React best practices.
- Write maintainable code rather than overly complex solutions.

## Content Rules

- Content should be easy to scan.
- Headings should be concise.
- Medical credibility should always come before marketing language.
- Avoid unnecessary text.

---

# 26. Things To Avoid

The following should not be introduced into the project unless
explicitly approved.

## UI

- Visual clutter.
- Inconsistent spacing.
- Random colors.
- Excessive shadows.
- Decorative icons without meaning.
- Generic stock imagery.
- Trend-driven layouts that reduce professionalism.

## UX

- Hidden navigation.
- Confusing interactions.
- Long scrolling without hierarchy.
- Unclear calls to action.

## Development

- Unnecessary dependencies.
- Dead code.
- Inline styles where reusable styling is more appropriate.
- Duplicate components.
- Over-engineered solutions.
- Poor file organization.

## Motion

- Flashy transitions.
- Continuous animations.
- Motion that distracts from content.
- Inconsistent animation timing.

---

## 27. Things AI Must Never Generate

- Generic portfolio layouts.
- Hospital-style UI.
- Medical illustrations everywhere.
- Heavy gradients.
- Excessive shadows.
- Over-animated interfaces.
- Bounce animations.
- Random decorative elements.
- Large glassmorphism panels.
- Unstructured spacing.
- Do not present the client as a practicing physician.
- Do not create a clinic or hospital website layout.

---

# 28. AI Instructions

This document is the official project reference.

Every AI assistant working on this project must follow these rules.

## Source of Truth

Treat `project-context.md` as the Single Source of Truth.

Do not override its decisions unless explicitly instructed.

## Decision Making

- Never invent missing requirements.
- Never change the project's philosophy.
- Never introduce a new library without justification.
- Never replace approved technologies.

If information is missing:

- Mark it as Pending.
- Ask for clarification before implementation.

## Documentation Priority

When multiple documentation files exist, use the following order:

1.  project-context.md
2.  project-blueprint.md

---

# 29. Current Project Status

## Completed

- Project discussions.
- Design direction.
- UI philosophy.
- UX philosophy.
- Technology selection.
- Section planning.
- Animation strategy.
- Performance strategy.
- SEO strategy.
- Accessibility strategy.
- Responsive strategy.
- Context documentation.

## Next Phase

The next phase is to create the Blueprint documentation.

Blueprint files will define implementation details only.

No implementation should begin before the Blueprint documents are
reviewed and approved.

---

# 30. Final Notes

This document intentionally records the project's final approved
decisions.

Historical discussions, abandoned ideas and intermediate iterations are
not considered authoritative.

Whenever a conflict exists between an older discussion and a newer
approved decision, the newest approved decision always takes precedence.

This document should remain stable throughout development and should
only be updated when a new project decision is explicitly approved.
